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
        console.log('Login response: ', response.data);
        return response.data;
    }
    catch (error: any) {
        console.log('sign in error :', error);
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

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
        console.log('Signup response: ', response.data);
        return response.data;
    }
    catch (error: any) {
        console.log('sign up error :', error);
        return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
});

// Enhanced auth check thunk
export const checkAuthStatus = createAsyncThunk("/customers/checkAuthStatus", async (_, { rejectWithValue }) => {
    try {
        console.log('Checking auth status...');
        const response = await api.get("/customers/me", {
            withCredentials: true // Ensure cookies are sent with the request
        });
        console.log('Auth check successful:', response.data);
        return response.data;
    } catch (error: any) {
        console.log('Auth check failed:', error.response?.status, error.response?.data);
        return rejectWithValue("Authentication failed");
    }
});

export const logoutUser = createAsyncThunk("/customers/logout", async (_, { rejectWithValue }) => {
    try {
        await api.get("/auth/logout", { withCredentials: true });
        return true;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
});

interface CustomerState {
    customers: any[];
    selectedCustomer: any | null;
    isLoggedIn: boolean;
    report: any | null;
    loading: boolean;
    error: string | null;
    authChecked: boolean; 
}

const initialState: CustomerState = {
    customers: [],
    selectedCustomer: null,
    isLoggedIn: false,
    report: null,
    loading: false,
    error: null,
    authChecked: false
};

const CustomerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        // Logout reducer
        logout: (state) => {
            state.isLoggedIn = false;
            state.selectedCustomer = null;
        },
        // Set auth checked
        setAuthChecked: (state) => {
            state.authChecked = true;
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
                state.selectedCustomer = action.payload;
                state.authChecked = true;
            })
            .addCase(CustomerAuthLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false;
                state.authChecked = true;
            })

            // Sign in cases
            .addCase(CustomerSignin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CustomerSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedCustomer = action.payload;
            })
            .addCase(CustomerSignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Auth status check cases
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.selectedCustomer = action.payload;
                state.authChecked = true;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.selectedCustomer = null;
                state.authChecked = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.selectedCustomer = null;
            });
    }
});

export const { logout, setAuthChecked } = CustomerSlice.actions;

export default CustomerSlice.reducer;