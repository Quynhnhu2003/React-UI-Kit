// ** Components Imports
import { AuthenRoutePaths } from '../utils/enum/home';
import LayoutAuthen from '../utils/components/layout';

// ** Another Imports
import { RouteObject } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';

const authenticationRoutes: RouteObject[] = [
  {
    path: '',
    element: <LayoutAuthen />,
    children: [
      {
        path: AuthenRoutePaths.SIGN_IN,
        element: <LoginForm />,
      },
      {
        path: AuthenRoutePaths.REGISTER,
        element: <RegisterForm />,
      },
    ],
  },
];

export default authenticationRoutes;
