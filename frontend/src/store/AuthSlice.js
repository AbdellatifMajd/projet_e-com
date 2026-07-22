import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (userData, {rejectWithValue}) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth/register", userData, {withCredentials: true,});
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data || "an error occured while calling register api")
  }
});

export const loginUser = createAsyncThunk("auth/login", async (formData, {rejectWithValue}) => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  try{
    const res = await axios.post("http://localhost:8000/api/auth/login", formData, {withCredentials: true,});
  return res.data;
  }
  catch(e){
    return rejectWithValue(e.response?.data || "An error occured while calling login api")
  }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async(_, {rejectWithValue}) => {
  try{
    // Le navigateur va AUTOMATIQUEMENT joindre le cookie de session à cette requête
    const response = await axios.get("http://localhost:8000/api/auth/checkAuth", {withCredentials: true})
    return response.data;
  }
  catch(e){
    return rejectWithValue(e.response?.data || "Expired session!" );
  }
})

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: ""
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
    addCase(registerUser.pending, (state) => {state.isAuthenticated = false; state.isLoading=true})
    .addCase(registerUser.fulfilled, (state, action) => {state.isAuthenticated = true; state.isLoading=false; state.user=action.payload.user})
    .addCase(registerUser.rejected, (state, action) => {state.isAuthenticated = false; state.isLoading=false; state.user=null; state.error =action.payload})

    .addCase(loginUser.pending, (state) => {state.isAuthenticated=false; state.isLoading=true})
    .addCase(loginUser.fulfilled, (state, action) => {state.isAuthenticated=true; state.isLoading=false; state.user=action.payload.user})
    .addCase(loginUser.rejected, (state, action) => {state.isAuthenticated=false; state.isLoading=false; state.error=action.payload; state.user=null})

    .addCase(checkAuth.pending, (state) => {state.isLoading = true})
    .addCase(checkAuth.fulfilled, (state, action) => {state.isAuthenticated = true; state.isLoading=false; state.user=action.payload.user})
    .addCase(checkAuth.rejected, (state, action) => {state.isAuthenticated=false; state.isLoading = false; state.user=null; state.error=action.payload} )
  },
});

export default authSlice.reducer;