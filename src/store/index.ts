import { configureStore } from '@reduxjs/toolkit';

import dialogReducer from './dialogStore';
import homeReducer from '../views/home/store';

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    home: homeReducer,
  },
  devTools: {
    name: 'ui-example Redux Store',
    trace: true,
    traceLimit: 25,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
