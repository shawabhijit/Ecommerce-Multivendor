import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";


interface LoginRequest {
    email: string;
    otp: string;
}

export const sellerLogin = createAsyncThunk("/sellers/sellerLogin", async (loginRequest: LoginRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/sellers/login", loginRequest);
        console.log('response: ', response.data)
    }
    catch (error) {
        console.log('sign in error :', error)
    }
})


