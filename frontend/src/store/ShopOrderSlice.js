import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL: null, 
    isLoading: false, 
    orderId: null, 
    orderList: [], 
    orderDetails: null 
}

export const createOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/create",
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const capturePayment = createAsyncThunk("/order/capturePayment", async({ paymentId, payerId, orderId })=>{
    const response = await axios.post("http://localhost:8000/api/order/capture", {paymentId, payerId, orderId});
    return response.data;
})

const ShopOrderSlice = createSlice({
    name: "shopOrder", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {state.isLoading=true})
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalURL = action.payload.approvalUrl;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem(
            "currentOrderId",
            JSON.stringify(action.payload.orderId)
        );
        })
        .addCase(createOrder.rejected, (state) => {state.isLoading=false; state.approvalURL = null; state.orderId = null;})
    }
})


export default ShopOrderSlice.reducer; 