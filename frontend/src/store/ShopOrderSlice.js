import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  error: null,
};

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/create",
        orderData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  },
);

// CAPTURE PAYMENT
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/capture",
        {
          paymentId,
          payerId,
          orderId,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to capture payment",
      );
    }
  },
);

// GET ORDER DETAILS
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/details/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.message);
    }
  },
);

export const getOrderDetails = createAsyncThunk(`/order`, async(orderId, {rejectWithValue}) =>{
  console.log("thunk lancé avec orderId:", orderId); // celui-ci, précisément
  try{
    const response = await axios.get(`http://localhost:8000/api/order/${orderId}`);
    return response.data;
  }
  catch(e){
    console.log("erreur catch:", e)
    return rejectWithValue(e.response.data.message)
  }
})

const ShopOrderSlice = createSlice({
  name: "shopOrder",

  initialState,

  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // CREATE ORDER
      // =========================

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.approvalURL = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId),
        );
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.error = action.payload;
      })

      // =========================
      // CAPTURE PAYMENT
      // =========================

      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })

      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.error = action.payload;
      })

      // =========================
      // GET ALL ORDERS
      // =========================

      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderDetails = null;
      })

      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderList = action.payload.data;
      })

      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      })

      // =========================
      // GET ORDER Details
      // =========================
      .addCase(getOrderDetails.pending, (state) => {state.isLoading = true})
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = ShopOrderSlice.actions;
export default ShopOrderSlice.reducer;
