import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/user/getAllUsers");
    console.log(response)
    return response;
  } catch (error) {
    throw error.response;
  }
};
const customerService = {
  getUsers,
};

export default customerService;
