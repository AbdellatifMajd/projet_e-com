import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
  error: "",
};

export const fetchAddress = createAsyncThunk(
  "/shop/address/fetch",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/shop/address/${userId}`
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.error || "Failed to fetch addresses"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "/shop/address/add",
  async ({formData}, { rejectWithValue }) => {
    try {
         console.log("formData: ", formData);
        const response = await axios.post(
            "http://localhost:8000/api/shop/address/add",
            formData
        );

      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message 
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/shop/address/update",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/shop/address/update/${userId}/${addressId}`,
        formData
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/shop/address/delete",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/shop/address/delete/${userId}/${addressId}`
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message
      );
    }
  }
);

const AddressSlice = createSlice({
  name: "shopAddress",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })

      .addCase(fetchAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.addressList = [];
      })

      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default AddressSlice.reducer;
