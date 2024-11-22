import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./Components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquires from "./pages/Enquires";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorsList from "./pages/ColorsList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddProductCategory from "./pages/AddProductCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import Couponlist from "./pages/CouponList";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquires" element={<Enquires />} />
            <Route path="enquires/:id" element={<ViewEnq />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog-category-list" element={<BlogCategoryList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<ViewOrder />} />
            <Route path="Customers" element={<Customers />} />
            <Route path="list-color" element={<ColorsList />} />
            <Route path="list-category" element={<CategoryList />} />
            <Route path="list-brand" element={<BrandList />} />
            <Route path="list-product" element={<ProductList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />

            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category/:id" element={<AddBlogCategory />} />
            <Route path="category" element={<AddProductCategory />} />
            <Route path="category/:id" element={<AddProductCategory />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="coupon" element={<AddCoupon/>}/>
            <Route path="coupon/:id" element={<AddCoupon/>}/>
            <Route path="coupon-list" element={<Couponlist/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
