const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asynHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg=require("../utils/cloudinary")
const createBlog = asynHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asynHandler(async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.json(getAllBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const liketheBlog = asynHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  const blog = await Blog.findById(blogId);

  const loginUserId = req.user._id;
  //find the user liked the post
  const isliked = blog?.isLiked;
  //find the user has disliked the blog
  const alreadyDisliked = blog?.dislikes.find(
    (userId) => userId.toString === loginUserId.toString()
  );
  //change the dislike into false and pull the dislike user id
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
  if (isliked) {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    //blog is not liked
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          likes: loginUserId,
        },
        likes: true,
      },
      {
        new: true,
      }
    );
  }
  res.json(true);
});

const disliketheBlog = asynHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = req.user._id;
  const isdliked = blog?.isDisliked;
  const alreadyDisliked = blog?.dislikes(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
  if (isdliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          dislikes: loginUserId,
        },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
const uploadImages = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
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
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages
};
