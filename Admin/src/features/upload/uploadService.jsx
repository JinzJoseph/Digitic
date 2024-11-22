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

const uploadImg = async (data) => {
  const response = await axios.post(
    "http://localhost:2000/api/upload/",
    data,
    config
  );

  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `http://localhost:2000/api/upload/delete-img/${id}`,
    config
  );
  return response;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
