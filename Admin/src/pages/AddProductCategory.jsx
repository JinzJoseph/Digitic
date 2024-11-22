import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductCategory,
  getAProductCategory,
  resetState,
  updateProductCategory,
} from "../features/productCategory/productCategorySlice";
let schema = yup.object().shape({
  title: yup.string().required(" product category is Required"),
});
const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpcatId = location.pathname.split("/")[3];
  const newProductCategory = useSelector((state) => state.productCategory);
  const {
    issuccess,
    isError,
    isLoading,
    productcategorys,
    createdProductCategory,
    getCategory,
    updatedCategory,deleteCategory
  } = newProductCategory;
  console.log(productcategorys);

  useEffect(() => {
    if (getpcatId !== undefined) {
      dispatch(getAProductCategory(getpcatId));
    } else {
      dispatch(resetState());
    }
  }, [getpcatId]);
  useEffect(() => {
    if (issuccess && createdProductCategory) {
      toast.success("category is  added Successfullly!");
    }
    if (issuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getCategory || "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (getpcatId !== undefined) {
        const data = { id: getpcatId, pcatdata: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
        // toast.success("successfully updated");
        // navigate("/admin/list-category");
      } else {
        dispatch(createProductCategory(values));

        formik.resetForm();

        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getpcatId !== undefined ? "Edit" : "Add"} Product Category
      </h3>
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
            {getpcatId !== undefined ? "Edit" : "Add"} Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
