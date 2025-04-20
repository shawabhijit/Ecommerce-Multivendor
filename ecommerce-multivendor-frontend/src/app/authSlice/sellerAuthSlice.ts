import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";


interface LoginRequest {
    email: string;
    otp: string;
}

interface SigninRequest {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    businessType: string;
    gstin: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    pickupBusinessName: string;
    locality: string;
    pickupPhone: string;
    pickupAddress: string;
    pickupCity: string;
    pickupState: string;
    pickupZipCode:string;
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


export const sellerSignin = createAsyncThunk("/sellers/sellerSignin", async (signinRequest:SigninRequest, { rejectWithValue }) => {
    try {
        const response = await api.post("/sellers/create", signinRequest);
        console.log('response: ', response.data)
    }
    catch (error) {
        console.log('sign in error :', error)
    }
})

