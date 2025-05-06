import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

interface LoginRequest {
    email: string;
    otp: string;
}

export const CustomerAuthLogin = createAsyncThunk("/customers/CustomerLogin", async (loginRequest: LoginRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/signing", loginRequest, {
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

type CustomerSignupRequest = {
    username: string;
    email: string;
    phone: string;
    password: string;
    otp: string;
}

export const CustomerSignin = createAsyncThunk("/customers/CustomerSignin", async (signupRequest: CustomerSignupRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/signup", signupRequest);
        console.log('response: ', response.data)
        return response.data;
    }
    catch (error : any) {
        console.log('sign in error :', error)
        return rejectWithValue(error.response?.data?.message || "Login failed")
    }
})

interface CustomerState {
    customers: any[];
    selectedCustomer: any | null;
    isLoggedIn: boolean;
    report: any | null;
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: CustomerState = {
    customers: [],
    selectedCustomer: null,
    isLoggedIn: false,
    report: null,
    loading: false,
    error: null,
};

const CustomerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        // Add a logout reducer
        logout: (state) => {
            state.isLoggedIn = false;
            state.selectedCustomer = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(CustomerAuthLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerAuthLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;
                state.selectedCustomer = action.payload; // Save the seller data
            })
            .addCase(CustomerAuthLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false;
            })

            // Sign in cases
            .addCase(CustomerSignin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.isLoggedIn = true;
                state.selectedCustomer = action.payload;
            })
            .addCase(CustomerSignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { logout } = CustomerSlice.actions;

export default CustomerSlice.reducer 
