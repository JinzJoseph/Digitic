const express = require("express");
const {
  createProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
  deleteProductImage,
  DeleteProduct,
  addToWishList,
  rating,
  uploadImages,
} = require("../controller/productController");
const { productImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", authMiddleware, getAProduct);
router.get("/",   getAllProduct);
router.post("/add-to-wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleware, isAdmin, DeleteProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  productImgResize,
  uploadImages
);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteProductImage);
module.exports = router;
