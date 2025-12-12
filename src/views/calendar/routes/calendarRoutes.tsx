import TestCalendar from '../pages/Test';
import { RouteObject } from 'react-router-dom';
import { CalendarRoutePaths } from '../utils/enum/calendar';
import LayoutCalendar from '../utils/components/layout';

const calendarRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LayoutCalendar />,
    children: [
      {
        path: CalendarRoutePaths.Calendar,
        element: <TestCalendar />,
      },
    ],
  },
];

export default calendarRoutes;
