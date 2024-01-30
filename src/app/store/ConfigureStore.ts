import { configureStore } from '@reduxjs/toolkit'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../../features/basket/basketSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import { accountSlice } from '../../features/account/accountSlice';
import { commentSlice } from '../../features/comment/commentSlice';

// Configure the Redux store with reducers
export const store = configureStore({
    reducer: { 
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
        comments: commentSlice.reducer, 
    }
})

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;