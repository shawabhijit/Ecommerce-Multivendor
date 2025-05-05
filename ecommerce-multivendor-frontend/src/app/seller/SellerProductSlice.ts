import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Products } from "../../types/ProductTupe";
import { ProductFormValues } from "../../Seller/products/AddEditProducts/SellerAddProduct";



export const fetchSellerProducts = createAsyncThunk("/sellerProduct/fetchSellerProducts", async ( _  , { rejectWithValue }) => {
    try {
        const respnse = await api.get("/api/sellers/products", {
            withCredentials: true,
        })
        // console.log("Seller Products fetch successfully ,  Response:", respnse.data);
        return respnse.data
    }
    catch (error: any) {
        console.error("fetchSellerProducts failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

export const createProduct = createAsyncThunk("/sellerProduct/createProduct", async (request : ProductFormValues , { rejectWithValue }) => {
    try {
        const response = await api.post("/api/sellers/products/create", request,{
            withCredentials: true
        });
        console.log("Product created successfully, Response:", response.data);
        return response.data;
    }
    catch(error: any) {
        console.error("createProduct failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})
export const updateProduct = createAsyncThunk("/sellerProduct/updateProduct", async ({ request, id }: { request: ProductFormValues; id: string }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/sellers/products/update/${id}`, request, {
            withCredentials: true,
        });
        console.log("Product updated successfully, Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("updateProduct failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
});



interface SellerProductState {
    products: Products[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
};

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchSellerProducts cases
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // createProduct cases
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default sellerProductSlice.reducer;
export const { clearError } = sellerProductSlice.actions;