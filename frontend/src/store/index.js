import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice";
import AdminProductSlice from "./AdminProductSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        adminProduct: AdminProductSlice,
    }
})

export default store;