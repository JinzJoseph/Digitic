const Product = require("../models/productModel");
const User = require("../models/userModel");
const asynHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const slugify=require("slugify")
const {cloudinaryUploadImg,cloudinaryDeleteImg}=require("../utils/cloudinary");
const { default: mongoose } = require("mongoose");
const createProduct = asynHandler(async (req, res) => {
  console.log(req.body)
  try {
    if(req.body.title){
        req.body.slug=slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body);
    console.log("new product"+newProduct)
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAProduct = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id)
  try {
    const findProduct = await Product.findById(id).populate( {path:"color"})
    console.log(findProduct)
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProduct = asynHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct=asynHandler(async(req,res)=>{
    const {id} =req.params
    validateMongodbId(id)
    try {
      if(req.body.title){
        req.body.slug=slugify(req.body.title)
      }  
      const updatedProduct=await Product.findOneAndUpdate(id,req.body,{
        new:true
      })
      res.json(updatedProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const DeleteProduct=asynHandler(async(req,res)=>{
    const {id} =req.params
    validateMongodbId(id)
    try {
       
      const deleteProduct=await Product.findOneAndDelete(id)
      res.json(deleteProduct)
    } catch (error) {
        throw new Error(error)
    }
})


//Add to wishlist
const addToWishList = asynHandler(async (req, res) => {
  const { _id } = req.user; // User ID
  const { productId } = req.body; // Extract productId from request body
  validateMongodbId(_id); // Validate the user ID
  
  try {
    // Find the user by ID
    const user = await User.findById(_id);

    // Check if product is already in wishlist
    const alreadyAdded = user.wishlist.includes(productId);

    if (alreadyAdded) {
      // Remove product from wishlist if it's already added
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: productId } },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      // Add product to wishlist if not already added
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: productId } },
        { new: true }
      );
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// rating
const rating = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id); // Validate the user ID
  const { productId, comment, star } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user has already rated the product
    const alreadyRated = product.ratings.find(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Update the existing rating
      await Product.updateOne(
        {
          _id: productId,
          "ratings.postedby": _id,
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
          },
        }
      );
    } else {
      // Add a new rating
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }

    // Recalculate the product's total rating
    const updatedProduct = await Product.findById(productId);
    const totalRating = updatedProduct.ratings.length;
    const ratingSum = updatedProduct.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    const actualRating = Math.round(ratingSum / totalRating);

    // Update the product with the new total rating
    const finalProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );

    res.json(finalProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const uploadImages = asynHandler(async (req, res) => {
  // const { id } = req.params;

  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    // const findProduct = await Product.findByIdAndUpdate(
    //   id,
    //   {
    //     images: urls.map((file) => {
    //       return file;
    //     }),
    //   },
    //   {
    //     new: true,
    //   }
    // );

    const images=urls.map((file)=>{
      return file
    })
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteProductImage=asynHandler(async(req,res)=>{
  const {id}=req.params
try {
  const deletedImage=await cloudinaryDeleteImg(id,"images");
  res.json({
    message:"Deleted"
  })
} catch (error) {
  throw new Error(error)
}
})
module.exports = { createProduct,getAProduct ,addToWishList,getAllProduct,rating,updateProduct,DeleteProduct,uploadImages,deleteProductImage};
