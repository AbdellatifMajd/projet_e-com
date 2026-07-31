import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice";
import AdminProductSlice from "./AdminProductSlice";
import ShopProductSlice from "./ShopProductSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        adminProduct: AdminProductSlice,
        shopProduct: ShopProductSlice,
    }
})

export default store;