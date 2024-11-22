import React, { useState } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { updateUserProfile } from "../features/auth/authSlice";
let profileSchema = yup.object().shape({
  Firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("last Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  mobile: yup.number().required("Mobile Number is Required"),
});
const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userState?.email || "",
      Firstname: userState?.firstname || "",
      mobile: userState?.mobile || "",
      lastname: userState?.lastname || "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(updateUserProfile(values));
      setedit(true)
    },
  });
  const [edit, setedit] = useState(true);
  return (
    <>
      <Meta title={" My-profile"} />
      <BrreadCrumb title="My-profile" />

      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="col-12">
            <div className="justify-content-between align-items-center d-flex">
              <h5 className="">Update Profile </h5>
              <FaRegEdit onClick={(e) => setedit(!edit)}  className="fs-5"/>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    First Name
                  </label>
                  <input
                    onChange={formik.handleChange("Firstname")}
                    onBlur={formik.handleBlur("Firstname")}
                    value={formik.values.Firstname}
                    type="text"
                    className="form-control"
                    id="firstname"
                    disabled={edit}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.Firstname && formik.errors.Firstname}
                </div>
                <div className="mb-3">
                  <label for="lastname1" className="form-label">
                    Last Name
                  </label>
                  <input
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                    type="text"
                    className="form-control"
                    id="lastname"
                    disabled={edit}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    disabled={edit}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                    disabled={edit}
                  />
                </div>
                <div className="error mt-2">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={edit}
                >
                  {edit == false ? "Save" : "Edit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
