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

const getAllBrands = async () => {
  try {
    const response = await axios.get(
      "http://localhost:2000/api/brand/",
      config
    );

    return response;
  } catch (error) {
    throw error.response;
  }
};
const createBrand = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/brand/",
      data,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const getBrand = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/brand/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateBrand = async (data) => {
  const { id, brand } = data;
  try {
    const response = await axios.put(
      `http://localhost:2000/api/brand/${id}`,
      {
        title: brand.title,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/brand/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const brandService = {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
