import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice"
import ProductReducer from "../store/ProductSlices"

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart:cartReducer 
  },
});

export default store;