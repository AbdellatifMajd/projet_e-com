import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: [], 
    error: "" 
}

export const addToCart = createAsyncThunk("shop/cart/add", async({userId, productId}, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:8000/api/shop/cart/add", {userId, productId})
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data)
        }
}) 

export const fetchCartItems = createAsyncThunk("shop/cart/get", async(userId, {rejectWithValue}) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/shop/cart/items/${userId}`);
    return response.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data);
    }
});

export const removeFromCart = createAsyncThunk("shop/cart/remove", async({userId, productId}, {rejectWithValue})=>{
    try{
        const response = await axios.delete("http://localhost:8000/api/shop/cart/delete", {data: {userId, productId}})
        return response.data;
    }
    catch(e){
        rejectWithValue(e.response.data)
    }
});

const ShopCartSlice = createSlice({
    name: "shopCart", 
    initialState, 
    reducers: {
        increaseQuantity: (state, action) => {
            const item = state.cartItems.items.find((item) => item.id === action.payload); 
            if(item) item.quantity +=1;  
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.items.find((x) => x.id === action.payload );
            if(item) item.quantity -= 1;
        },

    }, 
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {state.isLoading=true})
        .addCase(addToCart.fulfilled, (state, action) => {state.isLoading=false, state.cartItems=action.payload?.data})
        .addCase(addToCart.rejected, (state, action) => {state.error=action.payload})
        
        
        .addCase(fetchCartItems.pending, (state) => {state.isLoading=true})
        .addCase(fetchCartItems.fulfilled, (state, action) => {state.isLoading=false, state.cartItems=action.payload?.data})
        .addCase(fetchCartItems.rejected, (state, action) => {state.error=action.payload})


        .addCase(removeFromCart.pending, (state) => {state.isLoading=true})
        .addCase(removeFromCart.fulfilled, (state, action) => {state.isLoading=false, state.cartItems=action.payload?.data})
        .addCase(removeFromCart.rejected, (state, action) => {state.error=action.payload})
    }
})

export const {increaseQuantity, decreaseQuantity} = ShopCartSlice.actions;
export default ShopCartSlice.reducer;