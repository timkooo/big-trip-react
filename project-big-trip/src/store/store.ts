import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { redirect } from './middlewares/redirect';
import { localStorage } from './middlewares/localstorage';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redirect).concat(localStorage)
});
