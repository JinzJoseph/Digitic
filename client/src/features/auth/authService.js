import axios from "axios";
import { base_url, config } from "../../utils/base_url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const forgotPassToken = async (data) => {
  try {
    const response = await axios.post(`${base_url}user/forgotpassword-token`,data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const ResetPassword = async (data) => {
  try {
    const response = await axios.put(`${base_url}user//reset-password/${data.token}`,data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const RegisterUser = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data.success) {
      toast.success("user created successfully");
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Sign up  failed";
  }
};
const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    console.log(response);
    if (response.data) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("customer", JSON.stringify(response.data));
      toast.success("user login successfully");

      return response.data;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || "Login failed";
  }
};
const getUserWishListById = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const addToCart = async (data) => {
  try {
    const response = await axios.post(`${base_url}user/cart`, data, config);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const getCart = async () => {
  try {
    const response = await axios.get(`${base_url}user/cart`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const deleteProductFromCart = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}user/delete-cart-product/${id}`,

      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const updateProductQty = async (cartDeatils) => {
  console.log(cartDeatils);

  try {
    const response = await axios.put(
      `${base_url}user/update-product-qty/${cartDeatils.cartItemId}/${cartDeatils.quantity}`,
      "",

      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const createOrder = async (orderDetails) => {
  console.log(orderDetails);
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      orderDetails,
      config
    );
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};
const userServices = async () => {
  try {
    const response = await axios.get(`${base_url}user/getmyorder`, config);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};
const updateUser = async (data) => {
  try {
    const response = await axios.put(`${base_url}user/edit-User`, data, config);
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
const authService = {
  RegisterUser,
  login,
  getUserWishListById,
  addToCart,
  getCart,
  deleteProductFromCart,
  updateProductQty,
  createOrder,
  userServices,
  updateUser,
  forgotPassToken,ResetPassword
};

export default authService;
