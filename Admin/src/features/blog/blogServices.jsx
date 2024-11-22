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

const getAllBlogs = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/blog/", config);
    console.log(response);
    return response;
  } catch (error) {
    throw error.response;
  }
};
const createBlog = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/blog/",
      data,
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const getABlog = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/blog/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateBlog = async (data) => {
  const { id, BlogData } = data;
  console.log(data)
  try {
    const response = await axios.put(
      `http://localhost:2000/api/blog/${id}`,
      {
        title: BlogData.title,
        category: BlogData.category,
        description: BlogData.description,
        images: BlogData.images,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/blog/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const blogService = {
  getAllBlogs,
  createBlog,
  getABlog,
  deleteBlog,updateBlog
};

export default blogService;
