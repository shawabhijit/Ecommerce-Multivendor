import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";


export const fetchAllSellerOrders = createAsyncThunk("sellerOrders/fetchAllSellerOrders" , async (_ , {rejectWithValue}) => {
    try {
        const response = await api.get("/api/seller/orders" , {
            withCredentials: true,
        })
        console.log("fetch seller order successfull with ," , response.data);
        return response.data
    }
    catch (error : any) {
        console.log("fetching order of seller failed ," , error);
        return rejectWithValue(error.response?.data || "unknown error")
    }
})


interface OrderHistory {
    orders: any[] | null,
    loading: boolean,
    error : string | null,
}

const initialState : OrderHistory = {
    orders : null,
    loading : false,
    error: null,
}

const sellerOrderSlice = createSlice({
    name:"sellerOrders",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchAllSellerOrders.pending , (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSellerOrders.fulfilled , (state , action) => {
                state.loading = false;
                state.error = null;
                state.orders = action.payload;
            })
            .addCase(fetchAllSellerOrders.rejected , (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export default sellerOrderSlice.reducer;
export const {clearError} = sellerOrderSlice.actions;