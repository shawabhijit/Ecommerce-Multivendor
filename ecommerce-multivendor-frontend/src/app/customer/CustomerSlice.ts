import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchAllCustomers = createAsyncThunk("/customersProfile/fetchAllCustomers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/user");
        console.log("All Customers fetch successfully ,  Response:", response.data);
        return response.data;
    }
    catch (error : any) {
        console.error("fetch All Customers failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

export const fetchCustomerProfile = createAsyncThunk(
    "/customersProfile/fetchCustomerProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/user/profile", {
                withCredentials: true,
            });
            console.log("Customer Profile fetch suucessfully ,  Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("fetch Customer Profile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

export const fetchCustomerByEmail = createAsyncThunk(
    "/customerProfile/fetchCustomerByEmail",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/${email}`, {
                withCredentials: true,
            });
            console.log("Customer Profile fetch suucessfully ,  Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("fetch Customer Profile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
)

export const fetchCustomerById = createAsyncThunk(
    "/customerProfile/fetchCustomerById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/id/${id}`, {
                withCredentials: true,
            });
            console.log("Customer Profile fetch suucessfully ,  Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("fetch Customer Profile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
)

export const updateCustomerProfileInfo = createAsyncThunk(
    "/customerProfile/updateCustomerProfileInfo",
    async (data: any , { rejectWithValue }) => {
        try {
            const respose = await api.put("/user/profile/update", data , {
                withCredentials: true,
            })
            console.log("Customer Profile update suucessfully ,  Response:", respose.data);
            return respose.data
        }
        catch (error: any) {
            console.error("fetch Customer Profile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
)

export const updateCustomerProfileAddress = createAsyncThunk(
    "/customerProfile/updateCustomerProfileAddress",
    async (data: any , { rejectWithValue }) => {
        try {
            const respose = await api.patch("/user/profile/update/address", data , {
                withCredentials: true,
            })
            console.log("Customer Profile update suucessfully ,  Response:", respose.data);
            return respose.data
        }
        catch (error: any) {
            console.error("fetch Customer Profile failed:", error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
)


interface CustomerState {
    customer: any[],
    selectedCustomer: any;
    profile: any,
    report: any,
    loading: boolean;
    error: string | null;
}

// Define the initial state for the seller slice
const initialState: CustomerState = {
    customer: [],
    selectedCustomer: null,
    profile: null,
    report: null,
    loading: false,
    error: null,
};

const customerProfileSlice = createSlice({
    name: "customersProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerProfile.pending, (state) => {
                state.loading = true;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchCustomerByEmail.pending, (state) => {
                state.loading = true;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchCustomerByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(fetchCustomerByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // console.log('isLoggedIn', state.isLoggedIn)
            })
            .addCase(updateCustomerProfileInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomerProfileInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
            })
            .addCase(updateCustomerProfileInfo.rejected, (state, action) => {   
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCustomerProfileAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomerProfileAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload
                state.error = null;
            })
            .addCase(updateCustomerProfileAddress.rejected, (state, action) => {   
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCustomerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCustomer = action.payload
                state.error = null;
            })
            .addCase(fetchCustomerById.rejected, (state, action) => {   
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default customerProfileSlice.reducer 