const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute"); 
const productRoute = require("./routes/productRoute");
const BlogRoute = require("./routes/blogRoute"); 
const ProductCategoryRoute=require("./routes/productCategoryRoute")
const blogCategoryRoute=require("./routes/blogCategoryRoute")
const couponRoute=require("./routes/couponRoute")
const colorRoute=require("./routes/colorRoute")
const brandRoute=require("./routes/brandRoute")
const enquiryRoute=require("./routes/enqRoute")
const uploadRoute=require("./routes/uploadRoute")
const morgan=require("morgan")
// Ensure the file path is correct
const cors = require("cors");
const bodyparser=require("body-parser")
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect"); // Ensure the file path is correct
const { notFound, errorHandler } = require("./middlewares/errorhandler");
const cookieParser=require("cookie-parser")
dotenv.config();

// Middleware
app.use(bodyparser.json())
app.use(express.json()); // Express now has a built-in body parser, so no need for body-parser
app.use(cors());
app.use(cookieParser())
app.use(morgan())
// Port setup
const PORT = process.env.PORT || 8000;

// Database connection
dbConnect();

// Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/blog",BlogRoute)
app.use("/api/ProductCategory",ProductCategoryRoute)
app.use("/api/blogCategory",blogCategoryRoute)
app.use("/api/coupon",couponRoute)
app.use("/api/color",colorRoute)
app.use("/api/enquiry",enquiryRoute)
app.use("/api/brand",brandRoute)
app.use("/api/upload",uploadRoute)
//middleware

app.use(notFound)
app.use(errorHandler)
// Server start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
