import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/Blog/blogSlice";
import enqReducer from "../features/enquiry/enquirySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    blog:blogReducer,
    enquiry:enqReducer
  },
});
