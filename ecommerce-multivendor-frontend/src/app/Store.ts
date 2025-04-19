import { combineReducers, configureStore  } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"


const rootReducer = combineReducers({

})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDisparch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDisparch>();
export const useAppSelecter: TypedUseSelectorHook<RootState>=useSelector;

export default store;