import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false, 
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "admin/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/shop/products/get",
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const ShopProductSlice = createSlice({
    name: "shopProduct",
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending, (state) => {state.isLoading=true;})
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {state.isLoading=false; state.productList=action.payload.data})
        .addCase(fetchAllFilteredProducts.rejected, (state) => {state.isLoading=false; state.productList=[]})
    }
})

export default ShopProductSlice.reducer; 