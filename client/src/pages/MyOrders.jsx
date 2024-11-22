import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getuserOrders } from "../features/auth/authSlice";
const MyOrders = () => {
  const dispatch = useDispatch();
  const orderedState = useSelector((state) => state?.auth?.getOrderedProduct);
  console.log(orderedState);
  useEffect(() => {
    dispatch(getuserOrders());
  }, []);
  return (
    <>
      <Meta title={" My-Orders"} />
      <BrreadCrumb title="My-Orders" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <h5>order ID</h5>
                </div>
                <div className="col-3">
                  <h5>Total Amount</h5>
                </div>
                <div className="col-3">
                  <h5>Total Amount After discount</h5>
                </div>
                <div className="col-3">
                  <h5>status</h5>
                </div>
              </div>
            </div>
            {orderedState?.map((item, index) => {
              return (
                <div className="col-12 mt-3 my-2 bg-warning" key={index}>
                  <div className="row ">
                    <div className="col-3">
                      <h5>{item?._id}</h5>
                    </div>
                    <div className="col-3">
                      <h5>{item?.totalPrice}</h5>
                    </div>
                    <div className="col-3">
                      <h5>{item?.totalPriceAfterDiscount}</h5>
                    </div>
                    <div className="col-3">
                      <h5>{item?.orderStatus}</h5>
                    </div>
                    <div className="col-12">
                      <div className="row bg-secondary p-3">
                        <div className="col-3 ">
                          <h6>product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6>Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h5>price</h5>
                        </div>
                        <div className="col-3">
                          <h5>color</h5>
                        </div>
                        {item.orderItems.map((i, index) => {
                          return (
                            <div className="col-12">
                              <div className="row bg-secondary p-3">
                                <div className="col-3 ">
                                  <h6>{i?.product?.title}</h6>
                                </div>
                                <div className="col-3">
                                  <h6>{i?.product?.quantity}</h6>
                                </div>
                                <div className="col-3">
                                  <h6>{i?.product?.price}</h6>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li
                                      className=""
                                      style={{ backgroundColor: i?.color }}
                                    ></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
