import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sendLoginOtp = createAsyncThunk("/auth/sendLoginOtp", async ({email} : {email:string}, { rejectWithValue }) => {
    try {
        const response = await api.get("/auth/signup/sent-otp")
        console.log("login otp response :", response)
    }
    catch (error) {
        console.log('error', error) 
    }
})
