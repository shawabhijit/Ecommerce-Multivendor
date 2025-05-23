import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Products } from "../../types/ProductTupe";

export const fetchWishlistData = createAsyncThunk ("wishlist/fetchwishlistData", async (_ , { rejectWithValue }) => {
    try {
        const response = await api.get("/api/wishlist", {
            withCredentials: true,
        })

        console.log("Wishlist fetch successfully, Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("fetch wishlist data failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

export const addProductToWishlist = createAsyncThunk("wishlist/addProductToWishlist", async (product: any , { rejectWithValue }) => {
    try {
        const productId = product?.id;
        const response = await api.post(`/api/wishlist/add/${productId}` , product , {
            withCredentials: true,
        })
        console.log("Product added to wishlist successfully, Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("add product to wishlist failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

export const getWishlistProduct = createAsyncThunk("wishlist/getWishlistProduct", async (product: any , { rejectWithValue }) => {
    try {
        const productId = product?.id;
        const response = await api.get(`/api/wishlist/${productId}`, {
            withCredentials: true,
        })
        console.log("get product of wishlist with Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("get product of wishlist failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})




interface wishlistState {
    wishlist: any[],
    product: Products | null,
    report: any,
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: wishlistState = {
    wishlist: [],
    product: null,
    report: null,
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlistData.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchWishlistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addProductToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.wishlist)) {
                    state.wishlist = [...state.wishlist, action.payload];
                } else {
                    state.wishlist = [action.payload];
                }
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getWishlistProduct.pending , (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlistProduct.fulfilled , (state , action) => {
                state.loading = false;
                state.error = null;
                state.product = action.payload;
            })
            .addCase(getWishlistProduct.rejected , (state , action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})


export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;