import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  isLoading: false,
  productList: [],
  favorites: loadFavorites(),
  openMenu: false,
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "admin/fetchAll",
  async ({ filterParams, sortParams } = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      // ex: filterParams = { category: ["Tajine", "Vase"] }
      Object.keys(filterParams || {}).forEach((key) => {
        if (filterParams[key]?.length > 0) {
          query.append(key, filterParams[key].join(","));
        }
      });

      if (sortParams) {
        query.append("sortBy", sortParams);
      }

      const response = await axios.get(
        `http://localhost:8000/api/shop/products/get?${query.toString()}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "shop/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/shop/products/get/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const ShopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    toggleFavorites: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);

      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      state.openMenu = true;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })

      
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })

      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { toggleFavorites, setOpenMenu } = ShopProductSlice.actions;
export default ShopProductSlice.reducer;
