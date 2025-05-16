import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const loginAdmin = createAsyncThunk("admin/loginAdmin",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/login", {
                params: {
                    email: credentials.email,
                    password: credentials.password,
                }
            });
            return response.data;
        }
        catch (error: any) {
            console.log("Admin login error: ", error);
            return rejectWithValue(error.response.data);
        }
    })


interface AdminState {
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: AdminState = {
    isLoggedIn: false,
    loading: false,
    error: null,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;