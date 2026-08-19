import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: null, 
    isLoading: false, 
    error: "" 
}

export const fetchDashboardStats = createAsyncThunk("/adminDashboard/fetch", async(_, {rejectWithValue})=>{
        try{
            const response = await axios.get('http://localhost:8000/api/auth/admin/dashboard', {withCredentials: true});
            return response.data;
        }   
        catch(e){
            return rejectWithValue(e.response.data)
        }
})

const adminDashboardSlice = createSlice({
    name: "adminDashboard", 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })

            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default adminDashboardSlice.reducer; 