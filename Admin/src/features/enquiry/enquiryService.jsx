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


const getAllEnquiries = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/enquiry/",config);
    console.log(response)
    return response;
  } catch (error) {
    throw error.response;
  }
};

const deleteAEnquiries = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:2000/api/enquiry/${id}`,config);
    console.log(response)
    return response;
  } catch (error) {
    throw error.response;
  }
};
const getAEnquiries = async (id) => {
  try {
    const response = await axios.get(`http://localhost:2000/api/enquiry/${id}`,config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateAEnquiries = async (data) => {
  console.log(data)
  try {
    const response = await axios.put(`http://localhost:2000/api/enquiry/${data.id}`,{status:data.enqData},config);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const enquiryService = {
    getAllEnquiries,deleteAEnquiries,getAEnquiries,updateAEnquiries
};

export default enquiryService;
