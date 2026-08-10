import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice";
import AdminProductSlice from "./AdminProductSlice";
import ShopProductSlice from "./ShopProductSlice";
import ShopCartSlice from "./ShopCartSlice";
import AddressSlice from "./AddressSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        adminProduct: AdminProductSlice,
        shopProduct: ShopProductSlice,
        shopCart: ShopCartSlice,
        shopAddress: AddressSlice
    }
})

export default store;