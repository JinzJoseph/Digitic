import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";
let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
const AddBrand = () => {
  const newBrand = useSelector((state) => state.brand);
  const { issuccess, isError, isLoading, createdBrands, brandName } = newBrand;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
      // formik.values.title = brandName;
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        console.log(values);
        const data = { id: getBrandId, brand: values };
        dispatch(updateBrand(data));
        dispatch(resetState());
        toast.success("Successfully updated");
        navigate("/admin/list-brand");
      } else {
        dispatch(createBrand(values));
        formik.resetForm();

        setTimeout(() => {
          navigate("/admin/list-brand");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (issuccess && createdBrands) {
      toast.success("Brand Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);

  return (
    <div>
      <h3 className="mb-4 title">
        {" "}
        {getBrandId !== undefined ? "Edit" : "Add"} Brand{" "}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand "
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
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
