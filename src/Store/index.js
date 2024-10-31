import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/ProductSlice"

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export default store;
