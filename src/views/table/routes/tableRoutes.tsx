// ** Components Imports
import UserTable from '../pages/table';
import LayoutTable from '../utils/components/layout';

// ** Another Imports
import { RouteObject } from 'react-router-dom';
import { TableRoutePaths } from '../utils/enum/table';

const tableRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutTable />,
    children: [
      {
        path: TableRoutePaths.Table,
        element: <UserTable />,
      },
    ],
  },
];

export default tableRoutes;
