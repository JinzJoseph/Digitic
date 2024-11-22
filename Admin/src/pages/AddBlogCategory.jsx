import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogCategory,
  resetState,
  getBlogCategory,
  updateBlogCategory,
} from "../features/blogCategory/blogCategorySlice";
let schema = yup.object().shape({
  title: yup.string().required(" Blog Category is Required"),
});
const AddBlogCategory = () => {
  const location = useLocation();
  const BlogcatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    issuccess,
    isError,
    isLoading,
    getblogcategory,updatedblogcategory,
    createdblogcategory,
  } = newBlogCategory;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (BlogcatId !== undefined) {
      dispatch(getBlogCategory(BlogcatId));
    } else {
      dispatch(resetState());
    }
  }, [BlogcatId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getblogcategory || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (BlogcatId !== undefined) {
        const data = { id: BlogcatId, bcatData: values };
        dispatch(updateBlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));

        formik.resetForm();

        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (issuccess && createdblogcategory) {
      dispatch(resetState());
      toast.success("Blog Category is  Added Successfullly!");
    }
    if(issuccess && updatedblogcategory ){
      toast.success("Blog Category is  updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">{BlogcatId ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-3"
          >
            {BlogcatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
