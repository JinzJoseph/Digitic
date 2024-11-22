import axios from "axios";
import { base_url, config } from "../../utils/base_url";

const getProducts = async (data) => {
  console.log(data);
  try {
    // Construct query string
    const queryParams = new URLSearchParams();

    if (data?.brand) queryParams.append("brand", data.brand);
    if (data?.tags) queryParams.append("tags", data.tags);
    if (data?.category) queryParams.append("category", data.category);
    if (data?.minPrice) queryParams.append("price[gte]", data.minPrice);
    if (data?.maxPrice) queryParams.append("price[lte]", data.maxPrice);
    if (data?.sort) queryParams.append("sort", data.sort);

    // Send request with constructed query string
    const response = await axios.get(`${base_url}product?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred while fetching products.";
  }
};

const getAProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/${id}`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
const AddToWishListProducts = async (id) => {
  try {
    const response = await axios.post(
      `${base_url}product/add-to-wishlist`,
      { productId: id },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
const rateproduct = async (data) => {
  console.log(data);
  try {
    const response = await axios.put(`${base_url}product/rating`, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
const productService = {
  getProducts,
  AddToWishListProducts,
  getAProduct,
  rateproduct,
};

export default productService;
