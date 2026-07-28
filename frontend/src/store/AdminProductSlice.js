import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
  error: "",
  imageLoading: false, 
  uploadedImageUrl: "",
};

export const fetchAllAdminProducts = createAsyncThunk(
  "admin/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/products/fetchAll",
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addNewProduct = createAsyncThunk(
  "admin/products",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/products/add",
        formData,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("addNewProduct error:", error.response?.data); 
      return rejectWithValue(error.response?.data);
    }
  }
);

export const uploadImageToCloudinary = createAsyncThunk(
  "admin/product/uploadImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:8000/api/admin/products/upload-image",
        data,
        { withCredentials: true }
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdminProducts.pending, (state) => {
        state.productList = null;
      })
      .addCase(fetchAllAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = null;
        state.error = action.payload;
      })

      .addCase(addNewProduct.pending, (state) => {
        state.productList = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = null;
        state.error = action.payload;
      })

        .addCase(uploadImageToCloudinary.pending, (state) => {
        state.imageLoading = true;
      })
      .addCase(uploadImageToCloudinary.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.uploadedImageUrl = action.payload?.imageUrl || "";
      })
      .addCase(uploadImageToCloudinary.rejected, (state, action) => {
        state.imageLoading = false;
        state.error = action.payload;
      });
    }
});



export default AdminProductSlice.reducer;
