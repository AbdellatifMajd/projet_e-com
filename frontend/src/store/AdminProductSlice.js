import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    productList: [],
    error: ""
}

export const fetchAllAdminProducts = createAsyncThunk("admin/fetchAll", async()=>{
    const response = await axios.get("http://localhost:8000/api/admin/products/fetchAll")
    return response?.data;
});

export const addNewProduct = createAsyncThunk("admin/products", async(formData)=>{
    const response = await axios.post("http://localhost:8000/api/admin/products/add", {formData}, {withCredentials: true});
    return response?.data;
})

const AdminProductSlice = createSlice({
    name: "adminProduct", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllAdminProducts.pending, (state) => {state.productList=null})
        .addCase(fetchAllAdminProducts.fulfilled, (state, action) => {state.isLoading=false; state.productList=action.payload})
        .addCase(fetchAllAdminProducts.rejected, (state,action) => {state.isLoading=false; state.productList=null; state.error=action.payload})
        
        .addCase(addNewProduct.pending, (state) => {state.productList=null})
        .addCase(addNewProduct.fulfilled, (state, action) => {state.isLoading=false; state.productList=action.payload})
        .addCase(addNewProduct.rejected, (state, action) => {state.isLoading=false; state.productList=null; state.error=action.payload})
    }
});

export default AdminProductSlice.reducer; 