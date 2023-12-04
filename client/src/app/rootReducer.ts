import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { apiSlice } from "./api/apiSlice"
import userReducer from './features/users/userSlice'
import itemReducer from './features/items/itemSlice'
import cartReducer from './features/cart/cartSlice'
import uploadReducer from './features/upload/uploadSlice'
import authReducer from './features/auth/authSlice'
import placeOrderReducer from "./features/placeOrder/placeOrderSlice";
// You can choose different storage options
import storageSession from 'redux-persist/lib/storage/session'
//import storage from 'redux-persist/lib/storage'

// Combine reducers
export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
    userState: userReducer,
    item: itemReducer,
    upload: uploadReducer,
    placeOrder: placeOrderReducer
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    //with whitelist, you specify an array of reducers that should be persisted. 
    //All other reducers not listed in the whitelist will be not persisted.
    whitelist: ['userState', 'item', 'cart', 'placeOrder']
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)