// ** Components Imports
import InputContainer from '../pages/InputContainer';
import LayoutInput from '../utils/components/layout';

// ** Another Imports
import { RouteObject } from 'react-router-dom';
import { InputRoutePaths } from '../utils/enum/input';

const inputRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutInput />,
    children: [
      {
        path: InputRoutePaths.INPUT,
        element: <InputContainer />,
      },
    ],
  },
];

export default inputRoutes;
