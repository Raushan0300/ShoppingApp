import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from './slices/ProductSlice';

export const Store=configureStore({
    reducer:{
        product:ProductReducer
    }
})