import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchCartData = createAsyncThunk("cart/fetchCartData", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/cart", {
            withCredentials: true,
        })
        console.log("Cart fetch successfully, Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("fetch cart data failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

export const addProductToCart = createAsyncThunk("cart/addProductToCart", async (product: any, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/cart/add", product , {
            withCredentials: true,
        })
        console.log("Product added to cart successfully, Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("add product to cart failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

type cartState = {
    cart: any[],
    report: any,
    loading: boolean;
    error: string | null;
}

const initialState: cartState = {
    cart: [],
    report: null,
    loading: false,
    error: null,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.products || [];
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart.push(action.payload);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;