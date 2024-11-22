import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const getAllBlogCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:2000/api/blogcategory/",
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error.response;
  }
};
const createBlogCategory = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/blogCategory/",
      data,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const getABlogCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/blogCategory/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateBlogCategory = async (data) => {
  const { id, bcatData } = data;
  try {
    const response = await axios.put(
      `http://localhost:2000/api/blogCategory/${id}`,
      {
        title: bcatData.title,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteBlogCategory = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/blogCategory/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const blogCategoriesService = {
  getAllBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
  getABlogCategory,
};

export default blogCategoriesService;
