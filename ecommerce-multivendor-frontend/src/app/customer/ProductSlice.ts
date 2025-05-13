import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../config/api';
import { Products } from '../../types/ProductTupe';

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (filters: {
        categories?: string[];
        brand?: string;
        colors?: string;
        size?: string;
        minPrice?: number;
        maxPrice?: number;
        minDiscount?: number;
        sort?: string;
        stock?: string;
        pageNumber?: number;
    }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });

            const response = await api.get(`/products?${params.toString()}`);
            console.log("fetch all products successfully with , " , response)
            return response.data;
        } catch (error: any) {
            console.error('Fetching all products failed with:', error);
            return rejectWithValue(error.response?.data || 'Unknown error');
        }
    }
);

export const fetchProductById = createAsyncThunk("products/fetchProductById" , async (id : number , {rejectWithValue}) => {
    try {
        const response = await api.get(`/products/${id}`);
        console.log("Product fetch Successfully with id , response " , response)
        return response.data;
    }
    catch (error : any) {
        console.log("Fetching product with id failes with ," , error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

interface ProductsState {
    products: any[];
    product: Products | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductById.pending , (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled , (state , action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = null;
            })
            .addCase(fetchProductById.rejected , (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default productsSlice.reducer;
