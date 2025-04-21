import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";


interface LoginRequest {
    email: string;
    otp: string;
}

interface SigninRequest {
    fullName: string; //
    email: string; //
    phone: string; //
    password: string; //
    confirmPassword: string;  // dont need 
    businessName: string; //
    logo:string; //
    banner:string; //
    businessEmail: string; //
    businessPhone: string; //
    address: string; //
    city: string; //
    state: string; //
    zipCode: string; //
    businessType: string; //
    gstin: string; //
    accountNumber: string; //
    ifscCode: string; //
    accountHolderName: string; //
    pickupBusinessName: string; //
    locality: string; //
    pickupPhone: string;
    pickupAddress: string; //
    pickupCity: string; //
    pickupState: string; //
    pickupZipCode:string; //
}

export const sellerLogin = createAsyncThunk("/sellers/sellerLogin", async (loginRequest: LoginRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/sellers/login", loginRequest, {
            withCredentials: true
        });
        console.log('response: ', response.data)
        return response.data
    }
    catch (error: any) {
        console.log('sign in error :', error)
        return rejectWithValue(error.response?.data?.message || "Login failed")
    }
})


export const sellerSignin = createAsyncThunk("/sellers/sellerSignin", async (signinRequest:SigninRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/sellers/create", signinRequest);
        console.log('response: ', response.data)
    }
    catch (error) {
        console.log('sign in error :', error)
    }
})



interface SellerState {
    sellers: any[]; 
    selectedSeller: any | null;
    isLoggedIn: boolean;
    report: any | null;
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: SellerState = {
    sellers: [],
    selectedSeller: null,
    isLoggedIn: false,
    report: null,
    loading: false,
    error: null,
};

const sellerLoginSlice = createSlice({
    name: "sellers",
    initialState,
    reducers: {
        // Add a logout reducer
        logout: (state) => {
            state.isLoggedIn = false;
            state.selectedSeller = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(sellerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;
                state.selectedSeller = action.payload; // Save the seller data
            })
            .addCase(sellerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false;
            })

            // Sign in cases
            .addCase(sellerSignin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // You might want to auto-login after signup or not
                // state.isLoggedIn = true;
                // state.selectedSeller = action.payload;
            })
            .addCase(sellerSignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Export the logout action
export const { logout } = sellerLoginSlice.actions;

export default sellerLoginSlice.reducer 

