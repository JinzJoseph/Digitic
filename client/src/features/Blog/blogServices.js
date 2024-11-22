import axios from "axios";
import { base_url, config } from "../../utils/base_url";

const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${base_url}blog/`);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${base_url}blog/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

const BlogServices = {
  getAllBlogs,
  getBlogById,
};

export default BlogServices;
