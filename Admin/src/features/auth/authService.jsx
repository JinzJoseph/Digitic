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

const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/user/admin-login",
      userData
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Login failed";
  }
};
const getOrders = async () => {
  const response = await axios.get(
    "http://localhost:2000/api/user/getallorders",
    config
  );
  return response;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `http://localhost:2000/api/user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};
const getMonthlyOrders = async () => {
  const response = await axios.get(
    `http://localhost:2000/api/user/getmonthwise`,

    config
  );
  console.log(response.data);
  return response.data;
};
const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
};

export default authService;
