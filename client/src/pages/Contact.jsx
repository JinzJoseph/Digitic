import React from "react";
import BrreadCrumb from "../components/BrreadCrumb";
import Meta from "../components/Meta";
import { FaMessage } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useFormik } from "formik";
import { BsInfo } from "react-icons/bs";
import * as yup from "yup";
import { createQuery } from "../features/enquiry/enquirySlice";
import { useDispatch, useSelector } from "react-redux";
let Contactschema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  mobile: yup.number().required("Mobile Number is Required"),
  comment: yup.string().required("Comment is Required"),
});
const Contact = () => {
  const dispatch = useDispatch();
  const enqData = useSelector((state) => state.enquiry);
  const { issuccess, isError, isLoading } = enqData;

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      mobile: "",
      comment: "",
    },
    validationSchema: Contactschema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <Meta title={" Contact"} />
      <BrreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7861.1129317083705!2d76.62206221261869!3d9.887527780198525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1730176330924!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between ">
                <div>
                  <h3 className="contact-title">Contact Us</h3>
                  <form
                    action="
                  "
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-20"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                    </div>
                    <div className="error mt-2">
                      {formik.touched.name && formik.errors.name}
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                    </div>
                    <div className="error mt-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                        name="mobile"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                    </div>
                    <div className="error mt-2">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                    <div>
                      <textarea
                        type="text"
                        className="form-control w-100"
                        rows={4}
                        placeholder="Comment"
                        name="comment"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      />
                    </div>
                    <div className="error mt-2">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                    <div className="">
                      <button type="submit" className="button">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title">Get in touch with us</h3>
                  <div>
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex gap-3 align-items-center">
                        <MdHome className="fs-5" />
                        <address className="mb-0">
                          Hno: 277, Near Village Chopal, Amandura, Sonipat,
                          Haryana
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-3 align-items-center">
                        <FaPhone className="fs-5" />
                        <a href="tel:+917025024468">+91 7025024468</a>
                      </li>
                      <li className="mb-3 d-flex gap-3 align-items-center">
                        <FaMessage className="fs-5" />
                        <a href="mailto:jinsjosephkunnummel000@gmail.com">
                          jinsjosephkunnummel000@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-3 align-items-center">
                        <BsInfo className="fs-5" />
                        <p className="mb-0">Monday-Friday 10 AM to 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
