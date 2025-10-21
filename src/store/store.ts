import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import pinsReducer from './pinsSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    pins: pinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
