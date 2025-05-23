import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import sellerLoginReducer from "./authSlice/sellerAuthSlice"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import sellerSlice from "./seller/SellerSlice"
import sellerProductReducer from "./seller/SellerProductSlice"
import CustomerSlice from "./authSlice/CustomerAuthSlice"
import CustomerProfileSlice from "./customer/CustomerSlice"
import wishlistSlice from "./customer/WhishlistSlice"
import cartSlice from "./customer/CartSlice"
import orderSlice from "./customer/OrderSlice"
import productSlice from "./customer/ProductSlice"
import sellerOrderSlice from "./seller/SellerOrderSlice"
import adminSlice from "./Admin/AdminSlice"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['sellers', 'customers' , 'admin'],
}

const rootReducer = combineReducers({
    sellers: sellerLoginReducer,
    fetchSeller: sellerSlice,
    sellerProducs: sellerProductReducer,
    customers: CustomerSlice,
    customerProfile: CustomerProfileSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    orders:orderSlice,
    products:productSlice,
    sellerOrders:sellerOrderSlice,
    admin:adminSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
    })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;