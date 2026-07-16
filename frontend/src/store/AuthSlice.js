import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (_e, userData) => {
  try {
    const res = await axios.post("http://localhost:8000/auth/register", userData);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.res.data)
  }
});

export const loginUser = createAsyncThunk("auth/login", async () => {
  const res = await axios.post("http://localhost:8000/auth/login");
});
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
