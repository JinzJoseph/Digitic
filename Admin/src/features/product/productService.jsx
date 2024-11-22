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
const getAllProducts = async () => {

  try {
    const response = await axios.get("http://localhost:2000/api/product/",config);
    console.log(response)
    return response;
  } catch (error) {
    throw error.response;
  }
};
const createProduct=async(data)=>{
  try {
    const response = await axios.post("http://localhost:2000/api/product/",data,config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
const productService = {
    getAllProducts,createProduct
};

export default productService;
