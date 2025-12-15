// ** Components Imports
import Home from '../pages/HomeContainer';
import LayoutHome from '../utils/components/layout';

// ** Another Imports
import { RouteObject } from 'react-router-dom';

const homeRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutHome />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
];

export default homeRoutes;
