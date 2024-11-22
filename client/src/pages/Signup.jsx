import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { createUser } from "../features/auth/authSlice";
let Userschema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("lastName is Required"),
  mobile: yup.number().required("Phone Number is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    },
    validationSchema: Userschema,
    onSubmit: (values) => {
      dispatch(createUser(values));
    },
  });
  return (
    <>
      <Meta title={" Signup"} />
      <BrreadCrumb title="Sign up" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <CustomInput
                    type="text"
                    label="First Name"
                    id="firstname"
                    name="firstname"
                    onChng={formik.handleChange("firstname")}
                    onBlr={formik.handleBlur("firstname")}
                    val={formik.values.firstname}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <div>
                  <CustomInput
                    type="text"
                    label="last Name"
                    id="lastname"
                    name="lastname"
                    onChng={formik.handleChange("lastname")}
                    onBlr={formik.handleBlur("lastname")}
                    val={formik.values.lastname}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <div>
                  <CustomInput
                    type="email"
                    label="Email Address"
                    id="email"
                    name="email"
                    onChng={formik.handleChange("email")}
                    onBlr={formik.handleBlur("email")}
                    val={formik.values.email}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <CustomInput
                    type="tel"
                    label="Phone Number"
                    id="mobile"
                    name="mobile"
                    onChng={formik.handleChange("mobile")}
                    onBlr={formik.handleBlur("mobile")}
                    val={formik.values.mobile}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <div className="mt-3">
                  <CustomInput
                    type="password"
                    label="Password"
                    id="Password"
                    name="password"
                    onChng={formik.handleChange("password")}
                    onBlr={formik.handleBlur("password")}
                    val={formik.values.password}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Sign up
                    </button>
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

export default Signup;
