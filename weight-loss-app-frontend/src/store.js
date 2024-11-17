import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './api/MainApi';
import loaderReducer from './slices/loaderSlice';

export const store = configureStore({
    reducer: {
        loader: loaderReducer,
        [mainApi.reducerPath]: mainApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
});
