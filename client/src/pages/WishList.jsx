import React, { useEffect } from "react";
import Meta from "../components/Meta";
import cross from "../assets/cross.svg";
import BreadCrumb from "../components/BrreadCrumb"; // Ensure this component is correctly named
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../features/auth/authSlice";
import { AddtoWishList } from "../features/product/productSlice"; // Renamed for clarity

const WishList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishList();
  }, []);

  const handleRemoveFromWishList = (id) => {
    dispatch(AddtoWishList(id)).then(() => {
      dispatch(getUserWishList()); // Refresh the wishlist after removing an item
    });
  };
  const getWishList = () => {
    dispatch(getUserWishList());
  };
  const wishListData = useSelector((state) => state?.auth?.wishList);
  console.log(wishListData);

  return (
    <>
      <Meta title="WishList" />
      <BreadCrumb title="WishList" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          {wishListData?.length === 0 && (
            <h5 className="text-black text-center"> No Data</h5>
          )}
          <div className="row d-flex flex-wrap gap-4">
            {wishListData &&
              wishListData?.map((item) => (
                <div className="col-md-3 col-sm-6 " key={item._id}>
                  <div className="wishlist-card position-relative">
                    <img
                      src={cross}
                      alt="remove from wishlist"
                      className="cross-btn position-absolute img-fluid"
                      onClick={() => handleRemoveFromWishList(item._id)}
                    />
                    <div className="wishlist-card-image">
                      {/* <img
                        src={item?.images[0]?.url}
                        alt=" product-image"
                        className="img-fluid "
                      /> */}
                      <img
                        src={
                          item?.images[0]?.url ||
                          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        }
                        alt="product"
                        className="product-img  "
                      />
                    </div>
                    <div className="wishlist-card-details py-3 px-3">
                      <h5 className="product-title">{item.title}</h5>
                      <h6 className="product-price">${item.price}</h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
