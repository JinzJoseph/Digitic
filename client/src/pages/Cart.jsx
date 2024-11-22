import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateproductQuantity,
} from "../features/auth/authSlice";
const Cart = () => {
  const [updateProductquantity, setupdateProductquantity] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  const cartData = useSelector((state) => state?.auth?.cartproducts);

  const deleteAcartProducts = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  console.log(updateProductquantity);
  useEffect(() => {
    if (updateProductquantity !== null) {
      dispatch(updateproductQuantity(updateProductquantity));
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [updateProductquantity]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartData?.length; index++) {
      sum = sum + Number(cartData[index].qauntity * cartData[index].price);
      settotalAmount(sum);
    }
  }, [cartData]);

  return (
    <>
      <Meta title={" our Cart"} />
      <BrreadCrumb title="Our Cart" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {cartData?.length === 0 && (
                <h5 className="text-center mt-5">No Data</h5>
              )}
              {cartData?.map((item, index) => {
                return (
                  <div
                    className="cart-data d-flex  justify-content-between align-items-center mt-3"
                    key={index}
                  >
                    <div className="cart-col-1 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0].url}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75 ps-3">
                        <p
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: item?.productId?.description,
                          }}
                        ></p>
                        <p className="color d-flex gap-3 align-items-center">
                          color:
                          <li
                            className="rounded "
                            style={{ backgroundColor: item?.color?.title }}
                          ></li>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">${item?.productId?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex gap-15 align-items-center">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          min={1}
                          max={10}
                          value={
                            updateProductquantity &&
                            updateProductquantity?.cartItemId === item?._id
                              ? updateProductquantity?.quantity
                              : item?.qauntity
                          }
                          onChange={(e) =>
                            setupdateProductquantity({
                              cartItemId: item?._id,
                              quantity: Number(e.target?.value),
                            })
                          }
                        />
                      </div>
                      <div>
                        <MdDelete
                          className="text-danger fs-5"
                          onClick={(e) => deleteAcartProducts(item?._id)}
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">${item?.price * item?.qauntity}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                {(totalAmount !== null ||
                  totalAmount !== 0 )&& (
                    <div className="d-flex flex-column align-items-end">
                      <h4>SubTotal:${totalAmount}</h4>
                      <p>Taxes and shipping calculated ate checkout</p>
                      <Link to="/checkout" className="button">
                        Checkout
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
