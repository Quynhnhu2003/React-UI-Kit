// ** Components Imports
import QRCode from '../pages/QRCode';
import { QrCodeRoutePaths } from '../utils/enum/qrCode';
import LayoutQrCode from '../utils/components/layout';

// ** Another Imports
import { RouteObject } from 'react-router-dom';
import QRHasImage from '../pages/QRHasImage';

const qrCodeRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutQrCode />,
    children: [
      {
        path: QrCodeRoutePaths.QR_CODE,
        element: <QRCode />,
      },
      {
        path: QrCodeRoutePaths.QR_CODE_HAS_IMAGE,
        element: <QRHasImage />,
      },
    ],
  },
];

export default qrCodeRoutes;
