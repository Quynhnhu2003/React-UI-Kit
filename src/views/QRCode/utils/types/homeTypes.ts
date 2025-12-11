import { ActionType } from '../../../../enum';
import { Action } from '../../../../types/views/actionType';
import { TemplateEnum } from '../enum/qrCode';

export type HeaderHomeProps = {
  onClickSideBar?: () => void;
  onClickShopBag?: () => void;
};

// Props for the HomeTemplate component
export type HomeTemplateProps = {
  /**
   * (Optional) Type of the template to render.
   * Can be used to conditionally display different layouts or styles.
   */
  typeTemplate?: string;

  onClick: OnClickHandler;
};

export type BlockCommonProps = {
  /**
   * Function to handle user actions such as button clicks.
   *
   * @param actionType - One of the predefined action types (see ActionType enum).
   * @param dataAction - A string that represents associated data (e.g., ID, name).
   * @param data - (Optional) Additional payload that can be passed (object, array, etc.).
   */
  onClick: OnClickHandler;
};

export type BlockNeedType = BlockCommonProps & {
  typeTemplate: TemplateEnum;
};
export type OnClickHandler = (
  actionType: ActionType,
  dataAction: string,
  data?: any
) => void;

export type ReportTypes = {
  titleBlock: {
    title: string;
    action: Action;
  };
  items: Process[];
  action: Action;
  infoEmployee: InfoEmployee | null;
};

export type Process = {
  icon: string;
  isActive: boolean;
  text: string;
  time: string;
  date: string;
};

export type TextType = {
  text: string;
  textColor: string;
};
export type InfoEmployee = {
  name: string;
  avatar: string;
  group: string;
  position: string;
  phone: string;
  code: string;
  call: Call;
  chat: any;
};
export type Call = {
  action: Action;
  iconUrl: string;
};
export type Banner = {
  id: number;
  imageUrl: string;
  action: Action | null;
};
export type Category = {
  title: string;
  iconUrl: string;
  lock: boolean;
  action: Action;
};
export type RecommendationTypes = {
  titleBlock: {
    title: string;
    action: Action;
  };
  items: ProductItemType[];
};
// export type ProductItemType = {
//   id: number;
//   image: string;
//   content: {
//     text: string;
//   };
//   price: string;
//   isNew: boolean;
//   action: Action;
// };
export type ProductItemType = {
  id: number;
  image: string;
  content: {
    text: string;
  };
  price: string;
  isNew: boolean;
  action: Action;
};
export type ProductItemProps = {
  product: ProductItemType;
  /**
   * Function to handle user actions such as button clicks.
   *
   * @param actionType - One of the predefined action types (see ActionType enum).
   * @param dataAction - A string that represents associated data (e.g., ID, name).
   * @param data - (Optional) Additional payload that can be passed (object, array, etc.).
   */
  onClick: OnClickHandler;
};
export type DiscountTypes = {
  titleBlock: {
    title: string;
    action: Action;
  };
  items: RewardItemType[];
};
export type RewardItemType = {
  action: Action;
  discountPercent: string;
  id: number;
  image: string;
  originalPrice: string;
  programId: string;
  title: string;
};
export type RewardItemProps = {
  reward: Voucher;
  /**
   * Function to handle user actions such as button clicks.
   *
   * @param actionType - One of the predefined action types (see ActionType enum).
   * @param dataAction - A string that represents associated data (e.g., ID, name).
   * @param data - (Optional) Additional payload that can be passed (object, array, etc.).
   */
  onClick: OnClickHandler;
};
export type GetConfigResponse = {
  homeMasterRaw: HomeMasterRaw[];
  customerInfo: CustomerInfo;
  customerTrackingInfo: CustomerTrackingInfo;
  guestFeatureData: GuestFeatureData;
  configs: Configs;
  operationTracking: OperationTracking;
  timeResponse: number;
};
export type CommonRequest = {
  contractNo: string;
};
export interface HomeMasterRaw {
  id: number;
  template: string;
  url: string;
}

export interface CustomerInfo {
  name: string;
  customerId: number;
  phone: string;
  provider: string;
  avatar: string;
  isUser: number;
  lang: string;
  isChat: number;
  firstLogin: number;
  foxpayStatus: number;
  loyaltyStatus: number;
  inviteUpdateProfile: boolean;
  isCanhTo: number;
}

export interface CustomerTrackingInfo {
  appKey: string;
  host: string;
}

export interface GuestFeatureData {
  title: string;
  content: string;
  hotLineNo: string;
  registerButtonLabel: string;
  loginButtonLabel: string;
}

export interface Configs {
  searchUrl: string;
  searchPlaceholderText: string[];
  eventTimeCountdown: number;
  productAndServiceTVUrl: string;
  productAndServiceUrl: string;
  provinceVersion: number;
  districtVersion: number;
  wardsVersion: number;
  urlTracking: string;
  urlHiChat: string;
  registerLink: string;
  ftelPageId: string;
  cameraPoliciesUrl: string;
  urlRegisterCamera: string;
  imageChatMaxSizeUpload: number;
  isShowMessagesApi: number;
  aboutFSecureLink: string;
  policy: Policy[];
  popupDetail: any;
  canhtoRegisterAction: string;
  dkhoRegisterAction: string;
  messageUpdateByFunction: string;
  footerReportConfigs: FooterReportConfigs;
  ssoResetPasswordUrl: string;
  registerCTVInfo: RegisterCtvinfo;
  googleMapApiKey: GoogleMapApiKey;
  urlImageFPay: string;
  urlHiFPTDeepLinkArr: string[];
  enablePaymentQR: boolean;
}

export interface Policy {
  title: string;
  url: string;
}

export interface FooterReportConfigs {
  reportCurrent: boolean;
  reportHistory: boolean;
  survey: boolean;
  chat: boolean;
}

export interface RegisterCtvinfo {
  dataAction: string;
  actionType: string;
  data: any;
}

export interface GoogleMapApiKey {
  android: string;
  ios: string;
}

export type Contract = {
  Id: string;
  Contract: string;
  CustomerSetContractName: string;
  IsFsafe: number;
  CustomerIsActive: number;
  Address: string;
  LocationID: string;
  Email: string;
  LocalType: string;
  Passport: string;
  Phone: string;
  FullName: string;
  IsOwnerPhone: number;
  IsBill: number;
  lastTimeServiceFeedback: string;
  Traffics: { Download: string; Upload: string };
  hiFPTCustomerType: string;
  checkEContractConfirmed: number;
  LocalTypeFormat: string;
  isInternet: number;
  isFptPlay: number;
  isCamera: number;
  typeVip: string;
};

export interface OperationTracking {
  tracking_error_url: string;
  tracking_token: string;
  tracking_error_on: boolean;
}
export interface ListContractProps {
  contract: Contract;
  isCheck: boolean;
  onClick: () => void;
}
export interface DataPayment {
  textFormat: TextFormat[];
  textReplace: string[];
  action: Action;
  service: {
    isNeedReload: boolean;
  };
}
export type GetListBillByContractResponse = {
  billings: Invoice[];
  function?: string;
  transId?: string;
};
export type Invoice = {
  title: string;
  content: string;
  total: number;
  totalText: string;
  currency: 'đ';
  billNumber: string;
  type: 'BILLING' | 'RECEIPT';
  allowDelete: boolean;
  allowUpdated: boolean;
  checkedGroup: boolean;
  evcCode: string;
  evcTitle: string;
  evcAmount: number;
  evcType: 'select' | 'hidden' | 'text';
  evcAmountText: string;
  receiptType: number;
  state?: boolean;
};
export interface TextFormat {
  text: string;
}
export type GetListBannerRequest = {
  type: string;
  isGuest: boolean;
  contractNo: string;
};
export type GetListBannerResponse = {
  service: {
    isNeedReload: boolean;
  };
  uiCode: Banner[];
};
export type ProductItemRecommendationType = {
  action_zalo: Action;
  id: number;
  img: string;
  subtitle: string;
  tag: string;
  title: string;
};
export type ProductItemInternetType = {
  id: number;
  action: Action;
  dataShowDetail: {
    showDetailBackgroundColor: string;
    titleShowDetail: string;
    iconShowDetail: string;
    titleShowDetailColor: string;
    action: Action;
  };
  imageUrl: string;
  titleText: string;
  description: string;
  price: string;
  originalPrice: string;
  discountPercent: string;
  titlePrice: string;
  unit: string;
  isNew: boolean;
  serviceKey: string;
};
export type ProductInternetItemProps = {
  product: ProductItemInternetType;
  /**
   * Function to handle user actions such as button clicks.
   *
   * @param actionType - One of the predefined action types (see ActionType enum).
   * @param dataAction - A string that represents associated data (e.g., ID, name).
   * @param data - (Optional) Additional payload that can be passed (object, array, etc.).
   */
  onClick: OnClickHandler;
};
export type ProductRecommendItemProps = {
  product: ProductItemRecommendationType;
  /**
   * Function to handle user actions such as button clicks.
   *
   * @param actionType - One of the predefined action types (see ActionType enum).
   * @param dataAction - A string that represents associated data (e.g., ID, name).
   * @param data - (Optional) Additional payload that can be passed (object, array, etc.).
   */
  onClick: OnClickHandler;
};
export type GetListRecommendationRequest = {
  book_address_id: null;
  category_id: number;
  category_key: string;
  contract_no: string | null;
};
export type GetListProductRequest = CommonRequest & {
  serviceKey: string;
};
export type GetInfoLoyResponse = {
  fid: string;
  full_name: string;
  rank_img: string;
  rank_name: string;
  point: number;
  target_rank: string;
  rank_valid_to: string;
};
export type GetBlockVoucherResponse = {
  list_voucher: { block_name: string; block_id: number; vouchers: Voucher[] }[];
};
export type Voucher = {
  voucher_name: string;
  voucher_id: number;
  campaign_code: string;
  voucher_type: string;
  description: string;
  remain: number;
  exchange_coins: number;
  coins: number;
  price: number;
  img_banner_url: string;
  img_detail_url: string;
  supplier: any;
  supplier_avatar_url: any;
  min_coins: number;
  max_coins: number;
  desc_on_image_detail: any;
  flow_type: string;
  thumbnail_url: string;
};
export type TrackingInfoType = {
  appKey: string;
  host: string;
  trackingErrorUrl: string;
  trackingToken: string;
};
export type DataReferralType = {
  content: {
    text: string;
    textReplace: string[];
  };
  inviteCode: string;
  actionButtonShare: Action;
  action: Action;
};
export type GetReferralInfoResponse = {
  inviteIcon: string;
  inviteLabel: string;
  inviteCode: string;
  inviteLink: string;
  qrCode: string;
  logoQr: string;
  templates: {
    sms: string;
    mail: string;
    other: string;
    android: string;
    headerImgs: string[];
    gifts: GiftReferral[];
    giftDetailAction: Action;

    actionButtonShare: Action;
  };
};
export type GiftReferral = {
  icon: string;
  text: string;
  textReplace: [
    {
      key: string;
      value: string;
      action: Action;
    }
  ];
};
