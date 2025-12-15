import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHook';
import { handleDialogContent, resetDialogContent } from '../../../store/dialogStore';

function isFirstDeepLinkVisit(): boolean {
  const alreadyRedirected = sessionStorage.getItem('FIRST_TIME') === 'YES';
  if (!alreadyRedirected) {
    sessionStorage.setItem('FIRST_TIME', 'YES');
    return true;
  }
  return false;
}

const useDeepLinkHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { listContracts, currentContract } = useAppSelector(
    (store:any) => store.auth.contractStore
  );

  const checkOwnerContract = useCallback(
    (contractNo?: string | null): boolean => {
      if (!contractNo) return false;
      const normalized = contractNo.trim().toUpperCase();
      return listContracts.some(
        (item:any) => item.Contract.toUpperCase() === normalized
      );
    },
    [listContracts]
  );

  const handleRedirectByParams = useCallback(
    (rawParams: string) => {
      const params = new URLSearchParams(rawParams);

      const screen = params.get('screen');

      if (!screen) return;
      dispatch(resetDialogContent());
      const requiredContract = params.get('requiredContract') === 'true';
      const requireOwner = params.get('requireOwner') === 'true';
      const contractNo =
        params.get('contractNo') || currentContract?.Contract || null;
      const isOwner = checkOwnerContract(contractNo);

      if (requiredContract) {
        if (!contractNo) {
          if (screen === 'payment/list-invoices') {
            // Navigate to Payment home page with current params
            navigate(`/payment/home`, {
              state: { ...Object.fromEntries(params.entries()) },
            });
          } else {
            dispatch(
              handleDialogContent({
                isOpen: true,
                title: 'Thông báo',
                contentPopup:
                  'Tính năng hiện chưa khả dụng cho tài khoản của Quý khách. Vui lòng nhấn Liên hệ CSKH để được hỗ trợ. Xin cảm ơn.',
                buttonLeft: 'Đóng',
                buttonRight: 'Liên hệ CSKH',
              })
            );
          }
          return;
        }

        if (requireOwner && !isOwner) {
          dispatch(
            handleDialogContent({
              isOpen: true,
              title: 'Thông báo',
              contentPopup:
                'Không tìm thấy số hợp đồng tương ứng. Vui lòng kiểm tra lại.',
              buttonLeft: 'Đóng',
              buttonRight: '',
            })
          );
          return;
        }
      }

      navigate(screen, {
        state: {
          ...Object.fromEntries(params.entries()),
          contractNo,
        },
      });
    },
    [navigate, currentContract, dispatch, checkOwnerContract]
  );

  const redirectDeepLink = useCallback(() => {
    if (!isFirstDeepLinkVisit()) return;
    const rawParams = location.search.slice(1); // remove the `?`
    handleRedirectByParams(rawParams);
  }, [handleRedirectByParams]);

  const getAllParams = (): Record<string, string> => {
    return Object.fromEntries(new URLSearchParams(location.search).entries());
  };

  return {
    redirectDeepLink,
    getAllParams,
  };
};

export default useDeepLinkHook;
