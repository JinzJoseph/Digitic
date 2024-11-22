import React, { useState, useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllBlogCategory } from "../features/blogCategory/blogCategorySlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { Stepper } from "react-form-stepper";
import Dropzone from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createBlog,
  resetState,
  getBlog,
  updatedBlog,
  deleteBlog,
} from "../features/blog/blogSlice";
// Form validation schema
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const BlogId = location.pathname.split("/")[3];

  const newBlogData = useSelector((state) => state.blog);
  const {
    issuccess,
    isError,
    isLoading,
    createdBlog,
    BlogName,
    Blogcategory,
    BlogDescription,
    BlogImages,
    updateBlog,
  } = newBlogData;
  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);
  useEffect(() => {
    if (BlogId !== undefined) {
      dispatch(getBlog(BlogId));
    } else {
      dispatch(resetState());
    }
  }, [BlogId]);
  const blogCategoryData = useSelector(
    (state) => state.blogCategory.blogcategories
  );
  const imgState = useSelector((state) => state.upload.images);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogName || "",
      description: BlogDescription || "",
      category: Blogcategory || "",
      images: BlogImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      if (BlogId !== undefined) {
        const data = { id: BlogId, BlogData: values };
        dispatch(updatedBlog(data));
      } else {
        dispatch(createBlog(values));
        formik.resetForm();

        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue(
      "images",
      imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      }))
    );
  }, [imgState]);

  useEffect(() => {
    if (issuccess && createdBlog) {
      toast.success("Product Added Successfullly!");
      dispatch(resetState());
    }
    if (issuccess && updateBlog) {
      toast.success("Product updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);
  return (
    <div className="">
      <h4 className="mb-4 title">Add Blog</h4>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Image" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            name="category"
            className="form-control w-100 py-3 mt-3 mb-3"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option value="">Select Category</option>
            {blogCategoryData.map((cat, index) => (
              <option key={index} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
            className="mb-4"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white border-1 p-5 mt-6 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3 mt-4">
            {imgState.map((img, index) => (
              <div className="position-relative" key={index}>
                <button
                  type="button"
                  onClick={() => dispatch(delImg(img.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img
                  src={img.url}
                  alt="Uploaded Preview"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>

          <button
            className="btn w-100 btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
