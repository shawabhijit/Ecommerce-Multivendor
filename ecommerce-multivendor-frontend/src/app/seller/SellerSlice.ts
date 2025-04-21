import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk(
    "/seller/fetchSellerProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/seller/profile", {
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


// interface sellerState {
//     sellers: any[],
//     selectedSeller: any;
//     profile: any,
//     isLoggedIn: boolean;
//     report: any,
//     loading: boolean;
//     error: string | null;
// }

// // Define the initial state for the seller slice
// const initialState: sellerState = {
//     sellers: [],
//     selectedSeller: null,
//     profile: null,
//     isLoggedIn: false,
//     report: null,
//     loading: false,
//     error: null,
// };

// const sellerLoginSlice = createSlice({
//     name: "sellers",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(sellerLogin.pending, (state) => {
//                 state.loading = true;
//                 state.isLoggedIn = false;
//                 // console.log('isLoggedIn', state.isLoggedIn)
//             })
//             .addCase(sellerLogin.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.profile = action.payload
//                 state.error = null;
//                 state.isLoggedIn = true;
//                 // console.log('isLoggedIn', state.isLoggedIn)
//             })
//             .addCase(sellerLogin.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.isLoggedIn = false;
//                 // console.log('isLoggedIn', state.isLoggedIn)
//             })
//     }
// });

// export default sellerLoginSlice.reducer 