import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/api"

type OrderState = {
    orders: any[],
    orderItem:any,
    currentOrder: any,
    paymentOrder: any,
    loading: boolean,
    error: string | null,
    orderCanceled: boolean
}

const initialState : OrderState = {
    orders:[],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCanceled: false
}

const API_URL = "/api/orders"

export const fetchUserOrderHistory = createAsyncThunk("orders/fetchUserOrderHistory" , async ( _ , {rejectWithValue}) => {
    try {
        const response = await api.get(`${API_URL}/user`, {
            withCredentials:true,
        })
        console.log("order history fetched : -" , response.data)
        return response.data
    }
    catch (error : any) {
        console.error("fetch Order failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

// Fetch Order by ID
export const fetchOrderById = createAsyncThunk("orders/fetchOrderById" , async (orderId , {rejectWithValue}) => {
    try {
        const response = await api.get(`${API_URL}/${orderId}`, {
            withCredentials: true,
        })
        console.log("order fetched by ID : -", response.data)
        return response.data
    }
    catch (error: any) {
        console.error("fetch Order by ID failed:", error);
        return rejectWithValue(error.response?.data || "Unknown error");
    }
})

// Create a New Order
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (
        { address, paymenyMethod }: { address: any; paymenyMethod: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(API_URL, address, {
                withCredentials: true,
                params: { paymenyMethod: paymenyMethod }
            });
            console.log("Order created :" , response.data);
            if (response.data.payment_link_url) {
                window.location.href=response.data.payment_link_url
            }
            return response.data;
        } catch (error: any) {
            console.log("creating order failed , ", error);
            return rejectWithValue(error.response?.data || "unknown error");
        }
    }
)

export const fetchOrderItemById = createAsyncThunk("orders/fetchOrderItemById" , async (orderItemId : number , {rejectWithValue}) => {
    try {
        const response = await api.get(`${API_URL}/order/${orderItemId}` , {
            withCredentials: true
        });
        console.log("Order item fetched :" , response.data);
        return response.data;
    }
    catch (error : any) {
        console.log("fetching order item by id failed ," , error);
        return rejectWithValue(error.response?.data || "Unknown error")
    }
})

// Payment success handler 
export const paymentSuccess = createAsyncThunk("orders/paymentSuccess" , 
    async (
        {paymentId , paymentLinkId} : {paymentId:string , paymentLinkId:string},
        {rejectWithValue}
    ) => {
        try {
            const response = await api.get(`/api/payment/${paymentId}` , {
                withCredentials:true,
                params:{paymentLinkId}
            });
            console.log("payment Successfull with , " , response.data);
            return response.data;
        }
        catch (error : any) {
            console.log("Payment failed with ," , error);
            return rejectWithValue(error.response?.data || "Unknown error");
        }
})

// cancle order 
export const cancleOrder = createAsyncThunk("orders/cancleOrder" , async (orderId , {rejectWithValue}) => {
    try {
        const responce = await api.put(`${API_URL}/${orderId}/cancel` , {
            withCredentials: true,
        });
        console.log("Order cancel successfully with " , responce.data);
        return responce.data;
    }
    catch ( error : any) {
        console.log("Cancelign order failed with , " , error );
        return rejectWithValue(error.response?.data || "Unknown error")
    }
})

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
            // fetch user order history 
            .addCase(fetchUserOrderHistory.pending ,  (state) => {
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })
            .addCase(fetchUserOrderHistory.fulfilled , (state , action : any)=>{
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserOrderHistory.rejected , (state , action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // fetch order by id
            .addCase(fetchOrderById.pending , (state) => {
                state.loading= true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action: any) => {
                state.currentOrder = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // create a new order 
            .addCase(createOrder.pending , (state) => {
                state.loading= true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: any) => {
                state.paymentOrder = action.payload;
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // fetch order item by id  
            .addCase(fetchOrderItemById.pending , (state) => {
                state.loading= true;
                state.error = null;
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action: any) => {
                state.orderItem = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrderItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // payment success handler 
            .addCase(paymentSuccess.pending , (state) => {
                state.loading= true;
                state.error = null;
            })
            .addCase(paymentSuccess.fulfilled, (state, action: any) => {
                state.loading = false;
                console.log("payment success with ," , action.payload)
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // cancel order handler 
            .addCase(cancleOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCanceled= false;
            })
            .addCase(cancleOrder.fulfilled, (state, action: any) => {
                state.loading = false;
                state.orders = state.orders.map((order) => {
                    order.id === action.payload.id ? action.payload : order
                });
                state.orderCanceled = true;
                state.currentOrder = action.payload;
            })
            .addCase(cancleOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})


export default orderSlice.reducer