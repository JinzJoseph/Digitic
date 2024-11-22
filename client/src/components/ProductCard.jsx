import React from "react";
import watch from "../assets/watch.jpg";
import ReactStars from "react-rating-stars-component";
import addToCart from "../assets/add-cart.svg";
import wishlist from "../assets/wish.svg";
import view from "../assets/view.svg";
import compare from "../assets/prodcompare.svg";
import { AddtoWishList } from "../features/product/productSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headphone from "../assets/headphone.jpg";
import { useDispatch, useSelector } from "react-redux";
const ProductCard = ({ grid, data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const addToWishList = (id) => {
    console.log(id);
    dispatch(AddtoWishList(id));
  };
  const naviage = useNavigate();
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname == "/store" ? `gr-${grid}` : "col-3"
            }`}
          >
            <Link to="" className="product-card position-relative">
              <div className="wishlist-icons position-absolute">
                <button
                  className="bg-transparent border-0"
                  onClick={(e) => addToWishList(item?._id)}
                >
                  <img src={wishlist} alt="wishlist" className=" " />
                </button>
              </div>
              <div className="product-image justify-content-center">
                <img
                  src={item?.images[0]?.url}
                  alt=" product-image"
                  className="img-fluid "
                />
                <img src={watch} alt=" product-image" className="img-fluid " />
              </div>
              <div className="product-details">
                <h6 className="brand">{item.brand}</h6>
                <h5 className="product-title">{item.title}</h5>
                {location.pathname !== "/store" ? (
                  ""
                ) : (
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                )}

                <ReactStars
                  count={5}
                  edit={false}
                  value={item.totalrating}
                  size={24}
                  activeColor="#ffd700"
                />
                <p className="price">${item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link>
                    <img src={addToCart} alt=" addToCart" />
                  </Link>
                  <Link to={`/product/${item._id}`}>
                    <img src={view} alt=" view" />
                  </Link>
                  <Link>
                    <img src={compare} alt=" compare" />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
