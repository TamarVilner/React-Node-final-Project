import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './slices/orderSlice'
import productSlice from './slices/productSlice'
import userSlice from './slices/userSlice'


export const store= configureStore({
    reducer:{
        user : userSlice,
        product : productSlice,
        order: orderSlice
    }
})