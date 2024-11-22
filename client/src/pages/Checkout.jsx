import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import * as yup from "yup";
import Watch from "../assets/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../utils/base_url";
import { createAOrder } from "../features/auth/authSlice";
let Shippingschema = yup.object().shape({
  firstname: yup.string().required("firstname is Required"),
  lastname: yup.string().required("lastname is Required"),
  address: yup.string().required("Address Details is Required"),
  state: yup.string().required("state is Required"),
  country: yup.string().required("country is Required"),
  city: yup.string().required("city is Required"),
  pincode: yup.string().required("pincode is Required"),
  other: yup.string().required("other Details is Required"),
});
const Checkout = () => {
  const [shippingInfo, setshippingInfo] = useState({});
  console.log(shippingInfo);

  const [totalAmount, settotalAmount] = useState(" ");
  const dispatch = useDispatch();
  const [cartproductstate, setCartProductState] = useState([]);
  const cartData = useSelector((state) => state?.auth?.cartproducts);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartData?.length; index++) {
      sum = sum + Number(cartData[index].qauntity * cartData[index]?.price);
      settotalAmount(sum);
    }
  }, [cartData]);

  useEffect(() => {
    const items = cartData?.map((item) => ({
      product: item.productId._id,
      quantity: item.qauntity,
      color: item.color._id,
      price: item.price,
    }));
    setCartProductState(items || []);
  }, [cartData]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      country: "",
      city: "",
      pincode: "",
      other: "",
    },

    validationSchema: Shippingschema,
    onSubmit: (values) => {
      console.log(values);
      setshippingInfo(values);
      setTimeout(() => {
        checkoutHandler();
      }, 100);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const checkoutHandler = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Please try again later.");
        return;
      }

      const results = await axios.post(
        "http://localhost:2000/api/user/order/checkout",
        { amount: totalAmount },
        config
      );

      if (!results || !results.data.order) {
        alert("Something went wrong with the checkout. Please try again.");
        return;
      }
      console.log("result geting in order.checkout reequest" + results);
      const { amount, id: order_id, currency } = results.data.order;

      const options = {
        key: "rzp_test_SfzQaEEcWgXT3Z", // Use environment variable in production
        amount: amount,
        currency: currency,
        name: "Digitic Corp.",
        description: "Digitic Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };

          try {
            const result = await axios.post(
              "http://localhost:2000/api/user/order/paymentVerification",
              data,
              config
            );
            console.log("Order created successfully", result);
            dispatch(
              createAOrder({
                totalPrice: totalAmount,
                totalPriceAfterDiscount: totalAmount,
                cartproductstate,
                paymentinfo: {
                  razorpayPaymentId: result?.data?.razorpayPaymentId,
                  razorpayOrderId: result?.data?.razorpayOrderId,
                },
                shippingInfo,
              })
            );
          } catch (error) {
            console.error("Payment verification failed", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Digitic Ecom",
          email: "digiticcorp@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Kunnummel(h) marika p.o koothattukulam ernakulam",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in checkoutHandler", error);
      alert("An error occurred during the checkout process. Please try again.");
    }
  };

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Digitic</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" className="text-dark">
                        Cart
                      </a>
                    </li>
                    &nbsp;/
                    <li className="breadcrumb-item active" aria-current="page">
                      Information
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      &nbsp;/ Shipping
                    </li>
                    &nbsp; /{" "}
                    <li className="breadcrumb-item active" aria-current="page">
                      Payments
                    </li>
                  </ol>
                </nav>

                <h4 className="title"> Contact Information</h4>
                <p className="user-details total">
                  jins Joseph ( jinsjosephkunnumme000@gmail.com)
                </p>
                <h5 className="mb-3 title">Shipping Information</h5>
                <form
                  className="d-flex align-items-center flex-wrap gap-15 justify-content-between"
                  action=""
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-100  ">
                    <select
                      name=""
                      className="form-control form-select "
                      id="country"
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      value={formik.values.country}
                    >
                      <option value="" selected disabled>
                        {" "}
                        select country
                      </option>
                      <option value="india">India</option>
                      <option value="america">America</option>
                      <option value="brazil">Brazil</option>
                    </select>
                    <div className="error mt-2">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      className="form-control"
                      placeholder="First Name"
                      type="text"
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                      value={formik.values.firstname}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      className="form-control"
                      placeholder="Last Name"
                      type="text"
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                      value={formik.values.lastname}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      className="form-control"
                      placeholder="Address"
                      type="text"
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      value={formik.values.address}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      className="form-control"
                      placeholder="Apartment,suite,etc"
                      type="text"
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                      value={formik.values.other}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      className="form-control"
                      placeholder="City Info..."
                      type="text"
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      value={formik.values.city}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name=""
                      className="form-control form-select"
                      id="state"
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                    >
                      <option value="" selected disabled>
                        select state
                      </option>
                      <option value="kerala">Kerala</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                    </select>
                    <div className="error mt-2">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      className="form-control"
                      placeholder="Zipcode"
                      type="text"
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                      value={formik.values.pincode}
                    ></input>
                    <div className="error mt-2">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex  gap-10 align-items-center justify-content-between">
                      <Link to="/cart" className="text-dark  ">
                        {" "}
                        <FaArrowLeftLong className="me-2" />
                        Rerurn to cart
                      </Link>
                      <button className="button" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartData &&
                  cartData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-5 align-items-center"
                      >
                        <div className="d-flex gap-10 w-75">
                          <div className="w-25 position-relative ">
                            <span
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              style={{ top: "-20px", right: "2px" }}
                            >
                              {item?.qauntity}
                            </span>
                            <img
                              src={item?.productId?.images[0]?.url}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <h5 className="total">{item?.productId?.title}</h5>
                            <p className="total-price">{item?.color?.title}</p>
                          </div>
                        </div>

                        <div className="flex-grow-1">
                          <h5 className="total">
                            ${item?.price * item?.qauntity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">SubTotal</p>
                  <p className="total-price">$ {totalAmount}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 5</p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">$ {totalAmount + 5}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
