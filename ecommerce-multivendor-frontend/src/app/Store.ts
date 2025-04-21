import { combineReducers, configureStore  } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import sellerLoginReducer from "./authSlice/sellerAuthSlice"


const rootReducer = combineReducers({
    sellers : sellerLoginReducer
}) 

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecter: TypedUseSelectorHook<RootState>=useSelector;

export default store;