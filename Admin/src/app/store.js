import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/blog/blogSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogCategoryReducer from "../features/blogCategory/blogCategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import couponReducer from "../features/coupon/couponSlice";
import uploadReducer from "../features/upload/uploadSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    blog: blogReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    blogCategory: blogCategoryReducer,
    enquiry: enquiryReducer,
    coupon: couponReducer,
    upload:uploadReducer
  },
});
