import Toast from '../pages/Toast';
import { RouteObject } from 'react-router-dom';
import { ToastRoutePaths } from '../utils/enum/toast';
import LayoutToast from '../utils/components/layout';

const toastRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutToast />,
    children: [
      {
        path: ToastRoutePaths.Toast,
        element: <Toast />,
      },
    ],
  },
];

export default toastRoutes;
