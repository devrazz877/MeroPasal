import {configureStore} from "@reduxjs/toolkit"
import productSlice from "../features/productSlice"
import authSlice from "../features/authSlice"
import adminSlice from "../features/adminSlice"

 const store = configureStore({
    reducer:{
        product: productSlice,
        auth:authSlice,
        admin: adminSlice,
    },
})

export default store;