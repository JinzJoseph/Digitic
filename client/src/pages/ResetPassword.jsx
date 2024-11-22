import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { ResetUserPassword } from "../features/auth/authSlice";

const PasswordSchema = yup.object().shape({
  password: yup.string().required("Password is Required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      const data = {
        token: getToken,
        password: values?.password,
      };
      dispatch(ResetUserPassword(data));
      setTimeout(() => {
        navigate("/login");
      }, 300);
    },
  });

  return (
    <>
      <Meta title="Reset Password" />
      <BrreadCrumb title="Reset Password" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="form-control w-100"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login" className="button button-secondary">
                      Cancel
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

export default ResetPassword;
