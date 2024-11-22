import axios from "axios";
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

const getAllCoupons = async () => {
  try {
    const response = await axios.get(
      "http://localhost:2000/api/coupon/",
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error.response;
  }
};
const createCoupon = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/coupon/",
      data,
      config
    );
    console.log(data);

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const getACoupon = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:2000/api/coupon/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const updateCoupon = async (data) => {
  const { id, couponData } = data;
  try {
    const response = await axios.put(
      `http://localhost:2000/api/coupon/${id}`,
      {
        name: couponData.name,
        expiry: couponData.expiry,
        discount: couponData.discount,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const deleteCoupon = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:2000/api/coupon/${id}`,

      config
    );

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
const couponService = {
  getAllCoupons,
  getACoupon,
  createCoupon,updateCoupon,deleteCoupon
};

export default couponService;
