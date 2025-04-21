import { combineReducers, configureStore  } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import sellerLoginReducer from "./authSlice/sellerAuthSlice"
import storage from "redux-persist/lib/storage"
import { persistStore , persistReducer } from "redux-persist"
import sellerSlice from "./seller/SellerSlice"


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['sellers'],
}

const rootReducer = combineReducers({
    sellers : sellerLoginReducer,
    fetchSeller : sellerSlice
}) 

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions : ['persist/PERSIST', 'persist/REHYDRATE']
        }
    })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecter: TypedUseSelectorHook<RootState>=useSelector;

export const persistor = persistStore(store);

export default store;