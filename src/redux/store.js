import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

//root
const rootReducer = {
     products: productReducer,
}

//store
const store = configureStore({
     reducer: rootReducer,
});

export default store;