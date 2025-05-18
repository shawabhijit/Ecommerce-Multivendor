import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk(
    "/seller/fetchSellerProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/sellers/profile", {
                withCredentials: true,
            });
            console.log("Seller Profile fetch suucessfully ,  Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ fetchSellerProfile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const updateSellerProfile = createAsyncThunk("/seller/updateSellerProfile", async (data: any, { rejectWithValue }) => {
    try {
        const response = await api.patch("sellers/update", data, {
            withCredentials: true,
        })
        console.log("Seller Profile updated successfully ,  Response:", response.data);
        return response.data;
    }
    catch (error: any) {
        console.error("❌ updateSellerProfile failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
});

export const fetchAllSellers = createAsyncThunk("/seller/fetchAllSellers", async ( status : string | null, { rejectWithValue }) => {
    try {
        const response = await api.get("sellers" , {
            params:{status: status}
        })
        console.log("All Sellers fetch successfully ,  Response:", response.data);
        return response.data;
    }
    catch (error : any) {
        console.error("❌ fetchAllSellers failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})


interface sellerState {
    sellers: any[],
    selectedSeller: any;
    profile: any,
    report: any,
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: sellerState = {
    sellers: [],
    selectedSeller: null,
    profile: null,
    report: null,
    loading: false,
    error: null,
};

const sellerSlice = createSlice({
    name: "sellers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProfile.pending, (state) => {
                state.loading = true;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchSellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(updateSellerProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
            })
            .addCase(updateSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllSellers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllSellers.fulfilled, (state, action) => {
                state.loading = false;
                state.sellers = action.payload
                state.error = null;
            })
            .addCase(fetchAllSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default sellerSlice.reducer 