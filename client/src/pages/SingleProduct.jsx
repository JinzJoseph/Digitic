import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import ProductCard from "../components/ProductCard";
import { GoGitCompare } from "react-icons/go";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import headphone from "../assets/headphone.jpg";

import { CiHeart } from "react-icons/ci";
import Color from "../components/Color";
import { useLocation, useNavigate } from "react-router-dom";
import { addtoCart, getUserCart } from "../features/auth/authSlice";
import {
  getAProducts,
  AddtoWishList,
  getAllProducts,
  addRating,
} from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAProducts(getProductId));
    dispatch(getAllProducts());
    dispatch(getUserCart());
  }, [getProductId]);
  const popularProductData = useSelector((state) => state?.products?.products);
  const cartData = useSelector((state) => state?.auth?.cartproducts);

  useEffect(() => {
    for (let index = 0; index < cartData?.length; index++) {
      if (getProductId === cartData[index]?.productId?._id)
        setAlreadyAdded(true);
    }
  }, []);
  const productData = useSelector((state) => state?.products?.singleProduct);
  console.log(productData);
  const [ordedProduct, setOrderedProduct] = useState(true);
  const props = {
    width: 500,
    height: 500,
    zoomWidth: 500,
    img: productData?.images[0]?.url,
  };
  const [star, setstar] = useState(0); // Initialize to 0 to match ReactStars default
  const [comment, setcomment] = useState("");

  const addRatings = (e) => {
    e.preventDefault();
    if (star === 0) {
      toast.error("Please add a star rating");
      return false;
    } else if (comment.trim() === "") {
      toast.error("Please write a review about the product");
      return false;
    } else {
      dispatch(
        addRating({
          star: star,
          comment: comment.trim(), // Trim extra spaces
          productId: getProductId,
        })
      );
      setTimeout(() => {
        dispatch(getAProducts());
      }, 100);
      // Optional success message
    }
  };
  const [color, setColor] = useState(null);
  const [quantity, setquantity] = useState(1);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const addToWishList = (id) => {
    console.log(id);
    dispatch(AddtoWishList(id));
  };

  const uploadCart = (e) => {
    e.preventDefault();
    if (color === null) {
      toast.error("color is required");
      return false;
    } else {
      dispatch(
        addtoCart({
          productId: productData?._id,
          qauntity: quantity,
          color: color,
          price: productData?.price,
        })
      );
    }
  };
  const [popularproduct, setpopularproduct] = useState("");
  const navigate = useNavigate();
  const productsState = useSelector((state) => state?.products?.products);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setpopularproduct(data);
    }
  }, []);
  console.log(popularproduct);

  return (
    <>
      <Meta title={productData?.title} />
      <BrreadCrumb title={productData?.title} />

      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-image d-flex gap-15 flex-wrap">
                {productData?.images.map((item, index) => {
                  return (
                    <div>
                      <img src={item?.url} className="img-fluid" alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productData?.title}</h3>
                </div>
                <div className="border-bottom ">
                  <p className="price">$ {productData?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      edit={false}
                      value={productData?.totalrating?.toString()}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0"> ( 2 Reviews)</p>
                  </div>
                  <a className=" py-3 writereview" href="#review">
                    Write a review
                  </a>
                </div>
                <div className="border-bottom py-2">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type:</h3>
                    <p className="product-data">{productData?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>
                    <p className="product-data">Havels</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category:</h3>
                    <p className="product-data">{productData?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags:</h3>
                    <p className="product-data">{productData?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availbilty:</h3>
                    <p className="product-data">Instock</p>
                  </div>
                  <div className="d-flex flex-column gap-10 align-items-start my-2">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Colors:</h3>
                        <Color
                          colorData={productData?.color}
                          setColor={setColor}
                        />
                      </>
                    )}
                  </div>
                  <div className="d-flex gap-10  align-items-center my-2">
                    <h3 className="product-heading">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border-1 bg-white text-dark  border border-secondary">
                        M
                      </span>
                      <span className="badge border-1 bg-white text-dark  border border-secondary">
                        L
                      </span>
                      <span className="badge border-1 bg-white text-dark  border border-secondary">
                        S
                      </span>
                      <span className="badge border-1 bg-white text-dark  border border-secondary">
                        XL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10  align-items-center flex-row  my-5">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Quantity:</h3>
                        <div>
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            value={quantity}
                            style={{ width: "50px" }}
                            id=""
                            className="form-control"
                            onChange={(e) => setquantity(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div className="d-flex align-items-center gap-30 ms-5">
                      {alreadyAdded ? (
                        <button
                          className="button border-0"
                          onClick={() => navigate("/cart")}
                        >
                          Go to cart
                        </button>
                      ) : (
                        <button
                          className="button border-0"
                          onClick={() => uploadCart(productData?._id)}
                        >
                          Add to cart
                        </button>
                      )}

                      <button to="" className="button buynow">
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div className="gap-5 d-flex">
                      <a
                        href=""
                        onClick={(e) => addToWishList(productData?._id)}
                      >
                        {" "}
                        <CiHeart className="fs-5 mx-2" /> Add to WishList
                      </a>
                    </div>
                    <div className="gap-5 d-flex ">
                      <a href="">
                        {" "}
                        <GoGitCompare className="fs-5 mx-2" /> Add to compare
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-5">
                    <h3 className="product-heading">Shipping & Returns::</h3>
                    <p className="product-data">
                      Free Shipping and return availble on all orders .we ship
                      all US dometistic orders within{" "}
                      <span className="text-black ">5-10 business days !</span>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading"> Product Link:</h3>
                    <a
                      href="javascript:void(0)"
                      className="mx-3"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="bg-white p-3">
                <h4>Desription</h4>
                <p
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: productData?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="review" className="reviews-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        edit={false}
                        value="3"
                        size={24}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>

                  {ordedProduct && (
                    <div>
                      <a
                        href=""
                        className="text-dark text-decoration-underline"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4 ">
                  <h4 className="mb-2">Write a Review</h4>
                  <form
                    action="
                  "
                    className="d-flex flex-column gap-20"
                  >
                    <div>
                      <ReactStars
                        count={5}
                        edit={true}
                        value="3"
                        size={24}
                        activeColor="#ffd700"
                        onChange={(e) => setstar(e)}
                      />
                    </div>
                    <div>
                      <textarea
                        type="text"
                        className="form-control w-100"
                        rows={4}
                        placeholder="Comment"
                        onChange={(e) => setcomment(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="button"
                        type="submit"
                        onClick={addRatings}
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews py-2 mt-3">
                  {productData &&
                    productData?.ratings?.map((item, index) => {
                      return (
                        <div className="review" key={index}>
                          <div className="d-flex align-items-center gap-10">
                            <ReactStars
                              count={5}
                              edit={false}
                              value={item?.star}
                              size={24}
                              activeColor="#ffd700"
                            />
                          </div>

                          <p className="mt-3">{item?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popularproduct.length <= 0 ? (
        ""
      ) : (
        <section className="popular-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h3 className="blog-section">Our Popular products</h3>
              </div>
              <div className="row">
                <ProductCard data={popularproduct} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProduct;
