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
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/create",
        orderData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to create order",
      );
    }
  },
);

// CAPTURE PAYMENT
export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/capture",
        { paymentId, payerId, orderId },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to capture payment",
      );
    }
  },
);

// GET ALL USER ORDERS
export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/details/${id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// GET CLIENT ORDER DETAILS
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/${orderId}`,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  },
);

// GET ALL ADMIN ORDERS
export const getAllOrdersOfAllUsers = createAsyncThunk(
  "order/getAllOrdersOfAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/order/details",
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  },
);

// GET ADMIN ORDER DETAILS
export const getAdminOrderDetails = createAsyncThunk(
  "order/getAdminOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/admin/${orderId}`,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  },
);

// updateOrderStatus
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/order/admin/update/${orderId}`,
        { order_status: status } 
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Une erreur est survenue");
    }
  }
);

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
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.approvalURL =
          action.payload.approvalUrl || action.payload.approvalURL;
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

      // CAPTURE PAYMENT
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.approvalURL =
          action.payload.approvalURL || action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
      })
      .addCase(capturePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.error = action.payload;
      })

      // GET ALL CLIENT ORDERS
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET CLIENT ORDER DETAILS
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      })

      // GET ALL ADMIN ORDERS
      .addCase(getAllOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET ADMIN ORDER DETAILS
      .addCase(getAdminOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getAdminOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = ShopOrderSlice.actions;
export default ShopOrderSlice.reducer;
