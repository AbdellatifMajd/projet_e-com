import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import AdminProductSlice from "./AdminProductSlice";
import ShopProductSlice from "./ShopProductSlice";
import ShopCartSlice from "./ShopCartSlice";
import AddressSlice from "./ShopAddressSlice";
import ShopOrderSlice from "./ShopOrderSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    adminProduct: AdminProductSlice,
    shopProduct: ShopProductSlice,
    shopCart: ShopCartSlice,
    shopAddress: AddressSlice,
    shopOrder: ShopOrderSlice,
  },
});

export default store;
