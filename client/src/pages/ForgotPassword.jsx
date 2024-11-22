import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getForgetPasswordRToken } from "../features/auth/authSlice";
let forgotPasswordschema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is Required"),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordschema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(getForgetPasswordRToken(values));
    },
  });
  return (
    <>
      <Meta title={" ForgotPassword"} />
      <BrreadCrumb title="Forgot Password" />
      <div className="login-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Reset your Password</h3>
              <p className="text-center my-3 mb-3">
                We will send you an email to reset your password
              </p>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-column gap-15"
              >
                <div>
                  <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control w-100"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <div className="d-flex  flex-column justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Submit
                    </button>
                    <Link to="/login" className=" ">
                      cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
