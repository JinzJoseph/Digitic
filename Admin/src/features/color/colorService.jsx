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


const getAllColors = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/color/",config);

    return response;
  } catch (error) {
    throw error.response;
  }
};
const createColor=async(data)=>{
  try {
    const response = await axios.post("http://localhost:2000/api/color/",data,config);

    return response.data;
  } catch (error) {
    throw error.response;
  }
}
const updateColor = async (data) => {
  const { id, color } = data;
  try {
    const response = await axios.put(
      `http://localhost:2000/api/color/${id}`,
      {
        title: color.title,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const getColor = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/color/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteColor = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/color/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const colorService = {
    getAllColors,createColor,getColor,updateColor,deleteColor
};

export default colorService;
