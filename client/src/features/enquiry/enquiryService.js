import axios from "axios";
import { base_url, config } from "../../utils/base_url";
import { toast } from "react-toastify";

const createQuery = async (data) => {
  try {
    const response = await axios.post(
      `${base_url}enquiry/`,
      {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        comment: data.comment,
      },
      config
    );

    toast.success("Enquiry is Suucessfully posted..");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

const enquiryServices = {
  createQuery,
};

export default enquiryServices;
