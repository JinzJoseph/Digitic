const { default: mongoose } = require("mongoose");

const dbConnect = async (req, res) => {
  try {
    const con = mongoose.connect("mongodb://localhost:27017/Ecomm");
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports=dbConnect