import { configureStore} from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux'

import logger from 'redux-logger';
import AuthReducer from './auth/AuthReducer';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch
export const userAppDispatch : ()=> AppDispatch = useDispatch