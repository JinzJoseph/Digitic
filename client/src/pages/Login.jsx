import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";

import { useFormik } from "formik";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
let Loginschema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const navigate = useNavigate();
  const loginUserData = useSelector((state) => state.auth);
  const { issuccess, isError, isLoading, user } = loginUserData;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Loginschema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (issuccess && user) {
      navigate("/");
    }
  }, [issuccess, user, navigate]);

  return (
    <>
      <Meta title={" Login"} />
      <BrreadCrumb title="Login" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
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
                <div className="mt-3">
                  <CustomInput
                    type="password"
                    label="Password"
                    id="pass"
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
                  <Link to="/forgot-password">Forgot Password.?</Link>
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      Sign up
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

export default Login;
