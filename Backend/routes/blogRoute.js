const express = require("express");
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    liketheBlog,
    disliketheBlog,uploadImages
  } = require("../controller/blogController");

const router = express.Router();
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/",authMiddleware,isAdmin,createBlog);
router.put("/:id",authMiddleware,isAdmin,updateBlog)
router.get("/",getAllBlogs)
router.get("/:id",getBlog);
router.delete("/:id",authMiddleware,isAdmin,deleteBlog);
router.put("/",authMiddleware,isAdmin,liketheBlog);
router.put("/",authMiddleware,isAdmin,disliketheBlog)
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);


module.exports = router;