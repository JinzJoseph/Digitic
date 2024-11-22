import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  resetState,
  getAColor,
  updateColor,
  deleteColor,
} from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("color Name is Required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const colorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    issuccess,
    isError,
    isLoading,
    createdcolors,
    getcolor,
    updatedcolor,
    deletedcolor,
  } = newColor;
  useEffect(() => {
    if (colorId !== undefined) {
      dispatch(getAColor(colorId));
    } else {
      dispatch(resetState());
    }
  }, [colorId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: getcolor || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (colorId !== undefined) {
        const data = { id: colorId, color: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));

        formik.resetForm();

        setTimeout(() => {
          navigate("/admin/list-color");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (issuccess && createdcolors) {
      dispatch(resetState());
      toast.success("color is added Successfullly!");
    }
    if (issuccess && updatedcolor) {
      toast.success("color is updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">
        {" "}
        {colorId !== undefined ? "Edit" : "Add"} Color{" "}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter color "
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
            {colorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
