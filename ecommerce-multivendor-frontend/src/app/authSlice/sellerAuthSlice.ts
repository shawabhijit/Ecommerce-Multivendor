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
        const response = await api.post("/sellers/login", loginRequest , {
            withCredentials: true
        });
        console.log('response: ', response.data)
    }
    catch (error) {
        console.log('sign in error :', error)
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



interface sellerState {
    sellers: any[],
    selectedSeller: any;
    isLoggedIn: boolean;
    report: any,
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: sellerState = {
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sellerLogin.pending, (state) => {
                state.loading = true;
                state.isLoggedIn = false;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(sellerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(sellerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
    }
});

export default sellerLoginSlice.reducer 

