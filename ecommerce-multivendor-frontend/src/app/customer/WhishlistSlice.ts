import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

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



interface wishlistState {
    wishlist: any[],
    report: any,
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: wishlistState = {
    wishlist: [],
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
                state.wishlist = action.payload;
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
                state.wishlist = [...state.wishlist, action.payload];
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})


export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;