import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sendLoginOtp = createAsyncThunk("/auth/sendLoginOtp", async ({email } : {email:string}, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/signup/sent-otp", {email } )
        console.log("login otp response :", response)
    }
    catch (error) {
        console.log('error', error) 
        return rejectWithValue("Failed to send OTP");
    }
})

interface LoginRequest {
    email: string;
    otp: string;
}

export const signIn = createAsyncThunk("/auth/sigIn", async(loginRequest: LoginRequest , {rejectWithValue}) => {
    try {
        const response = await api.post("/auth/sigin" , loginRequest);
        console.log('response: ', response.data )
    }
    catch (error) {
        console.log('sign in error :', error)
        return rejectWithValue("Failed to sign in");
    }
})
