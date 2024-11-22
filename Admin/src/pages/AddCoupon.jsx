import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupons,
  getACoupon,
  updateCoupon,
  resetState,
} from "../features/coupon/couponSlice";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("expiry Date  is Required"),
  discount: yup.number().required("discount is Required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const couponId = location.pathname.split("/")[3];
  const couponData = useSelector((state) => state.coupon);
  const {
    issuccess,
    isError,
    isLoading,
    createdCoupon,
    getCouponName,
    getCouponExpiry,
    getCoupondiscount,
    updatedCoupon,
  } = couponData;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };
  useEffect(() => {
    if (couponId !== undefined) {
      dispatch(getACoupon(couponId));
    } else {
      dispatch(resetState());
    }
  }, [couponId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: getCouponName || "",
      expiry: changeDateFormat(getCouponExpiry) || "",
      discount: getCoupondiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (couponId !== undefined) {
        const data = { id: couponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
        navigate("/admin/coupon-list");
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/coupon-list");
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (issuccess && createdCoupon) {
      toast.success("Coupons Added Successfullly!");
    }
    if (issuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully..");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [issuccess, isError, isLoading]);
  return (
    <div>
      <h4 className="mb-4 title">{couponId !== undefined ? "Edit" : "Add"} Coupon</h4>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn w-100  btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {couponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
