import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk("/seller/fetchSellerProfile" , async(jwt:string , {rejectWithValue}) => {
    try {
        const response = await api.get("/seller/profile", {
            headers : {
                Authorization: `Bearer ${jwt}`
            },
        }) 
        console.log("fetch seller profile :", response)
        return response.data;
    }
    catch (error) {
        console.log('error', error)
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
    name: "seller",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProfile.pending , (state) => {
                state.loading = true;
            })
            .addCase(fetchSellerProfile.fulfilled, (state , action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
            })
            .addCase(fetchSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
});

export default sellerSlice.reducer 