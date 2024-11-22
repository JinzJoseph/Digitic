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
}

const getAllProductCategorys = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/ProductCategory/",config);
  
    return response;
  } catch (error) {
    throw error.response;
  }
};
const creatreProductCategory=async(data)=>{
  try {
    const response = await axios.post("http://localhost:2000/api/ProductCategory/",data,config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
const getAProductCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/ProductCategory/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateProductCategory = async (data) => {
  const { id, pcatdata } = data;
  console.log(data)
  try {
    const response = await axios.put(
      `http://localhost:2000/api/ProductCategory/${id}`,
      {
        title: pcatdata.title,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteProductCategory = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/ProductCategory/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const productCategoryService = {
    getAllProductCategorys,creatreProductCategory,getAProductCategory,updateProductCategory,deleteProductCategory
};

export default productCategoryService;
