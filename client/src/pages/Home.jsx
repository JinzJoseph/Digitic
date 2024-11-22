import React, { useEffect } from "react";
import mainbanner from "./../assets/main-banner-1.jpg";
// import mainbanner2 from "./../assets/main-banner.jpg";
import cartbanner from "../assets/catbanner-01.jpg";
import cartbanner2 from "../assets/catbanner-02.jpg";
import ReactStars from "react-rating-stars-component";
import cartbanner3 from "../assets/catbanner-03.jpg";
import cartbanner4 from "../assets/catbanner-04.jpg";
import Marquee from "react-fast-marquee";
import view from "../assets/view.svg";
import services1 from "../assets/service-02.png";
import services2 from "../assets/service-03.png";
import wishlist from "../assets/wish.svg";
import services3 from "../assets/service-04.png";
import services4 from "../assets/service.png";
import addToCart from "../assets/add-cart.svg";
import services5 from "../assets/service-05.png";
import compare from "../assets/prodcompare.svg";
import { Link, useNavigate } from "react-router-dom";
import camera from "./../assets/camera.jpg";
import tv from "../assets/tv.jpg";
import headphone from "../assets/headphone.jpg";
import headset from "../assets/camera.png";
import speaker from "../assets/speaker.jpg";
import camera1 from "../assets/camera1.png";
import watch2 from "../assets/images1.png";

import brand1 from "../assets/brand-01.png";
import brand2 from "../assets/brand-02.png";
import brand3 from "../assets/brand-03.png";
import brand4 from "../assets/brand-04.png";
import brand5 from "../assets/brand-05.png";
import brand6 from "../assets/brand-06.png";
import brand7 from "../assets/brand-07.png";
import brand8 from "../assets/brand-08.png";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/Blog/blogSlice";
import {
  AddtoWishList,
  getAllProducts,
} from "../features/product/productSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, []);
  const BlogData = useSelector((state) => state?.blog?.blogs);

  const productData = useSelector((state) => state.products.products);

  const addToWishList = (id) => {
    console.log(id);
    dispatch(AddtoWishList(id));
  };
  const navigate = useNavigate();

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative p-3">
                <img src={mainbanner} alt="" className="img-fluid rounded-3" />

                <div className="main-banner-content position-absolute">
                  <h4>SuperCHARGED FOR PROS.</h4>
                  <h5>ipad S13+ pro.</h5>
                  <p>From $999.00 or $41.62/no.</p>
                  <Link className="button">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div
                  className="small-banner position-relative p-3"
                  style={{ flex: "1 1 45%", marginBottom: "10px" }}
                >
                  <img
                    src={cartbanner}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sale.</h4>
                    <h5>Laptop Max.</h5>
                    <p>
                      From $999.00 or <br /> $41.62/mo.
                    </p>
                  </div>
                </div>
                <div
                  className="small-banner position-relative p-3"
                  style={{ flex: "1 1 45%", marginBottom: "15px" }}
                >
                  <img
                    src={cartbanner3}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>New Arrival.</h4>
                    <h5>Buy IPad Air.</h5>
                    <p>
                      From $999.00 or <br /> $41.62/mo.
                    </p>
                  </div>
                </div>
                <div
                  className="small-banner position-relative p-3"
                  style={{
                    flex: "1 1 45%",
                    marginBottom: "10px",
                    marginTop: "-20px",
                  }}
                >
                  <img
                    src={cartbanner2}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% OFF.</h4>
                    <h5>Smartwatch 7.</h5>
                    <p>
                      Shop the latest brand <br /> styles and colors
                    </p>
                  </div>
                </div>
                <div
                  className="small-banner position-relative p-3"
                  style={{
                    flex: "1 1 45%",
                    marginBottom: "10px",
                    marginTop: "-20px",
                  }}
                >
                  <img
                    src={cartbanner4}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>FREE ENGRAVING.</h4>
                    <h5>AirPods Max.</h5>
                    <p>
                      Hign-fidelity playback & <br /> ultra-low distraction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex gap-15 align-items-center ">
                  <img src={services1} alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over $100</p>
                  </div>
                </div>
                <div className="d-flex gap-15 align-items-center ">
                  <img src={services2} alt="services" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex gap-15 align-items-center ">
                  <img src={services3} alt="services" />
                  <div>
                    <h6>Support 24*7</h6>
                    <p className="mb-0">Shop with an export</p>
                  </div>
                </div>
                <div className="d-flex gap-15 align-items-center ">
                  <img src={services4} alt="services" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className="mb-0">100% Protected Payment</p>
                  </div>
                </div>
                <div className="d-flex gap-15 align-items-center ">
                  <img src={services5} alt="services" />
                  <div>
                    <h6>Affordable Price</h6>
                    <p className="mb-0">Get Factory direct order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-3 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={camera} alt="camera" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Music and Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={headphone} alt="camera" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={tv} alt="tv" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={speaker} alt="camera" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Mobile & Tablted</h6>
                    <p>15 Items</p>
                  </div>
                  <img src={camera} alt="camera" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Accessories</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={headphone} alt="camera" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>portable Speaker</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={tv} alt="tv" className="" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Home appliance</h6>
                    <p>10 Items</p>
                  </div>
                  <img src={speaker} alt="camera" className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="blog-section">Featured Collection</h3>
            </div>
            {productData &&
              productData.map((item, index) => {
                if (item.tags === "featured") {
                  return <ProductCard key={index} data={item} />;
                }
              })}
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2 mb-5">
        <div className="container-xxl">
          <div className="row">
            <div className=" d-flex flex-wrap gap-10">
              {/* <div className="famous-card position-relative">
                <img src={home} alt="famous-card" className=" " />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Samrt Watch Series 7</h6>
                  <p className="">
                    {" "}
                    <b>
                      From $699 or $116.56 <br />
                      for 12 mon
                    </b>
                  </p>
                </div>
              </div> */}
              <div class="card">
                <div class="imgBox">
                  <img src={headset} alt="mouse corsair" class="mouse" />
                </div>

                <div class="contentBox mt-5">
                  <h3>Smart Camera series</h3>
                  <h2 class="price">
                    61.<small>98</small> €
                  </h2>
                </div>
              </div>

              <div class="card">
                <div class="imgBox">
                  <img src={headset} alt="mouse corsair" class="mouse" />
                </div>

                <div class="contentBox mt-5">
                  <h3>Mouse Corsair M65</h3>
                  <h2 class="price">
                    61.<small>98</small> €
                  </h2>
                </div>
              </div>
              <div class="card">
                <div class="imgBox">
                  <img src={watch2} alt="mouse corsair" class="mouse" />
                </div>

                <div class="contentBox mt-5">
                  <h3>Mouse Corsair M65</h3>
                  <h2 class="price">
                    61.<small>98</small> €
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="blog-section">Special Products</h3>
            </div>
            <div className=" row ">
              {productData &&
                productData.map((item, index) => {
                  if (item.tags === "special") {
                    return (
                      <SpecialProduct
                        key={index}
                        title={item.brand}
                        brand={item.brand}
                        totalrating={item.totalrating.toString()}
                        price={item.price}
                        quantity={item.quantity}
                        sold={item.sold}
                        id={item._id}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="blog-section">Our Popular products</h3>
            </div>
            <div className="row">
              {/* {productData &&
                productData.map((item, index) => {
                  if (item.tags ==="popular") {
                    return <ProductCard key={index} data={productData} />;
                  }
                })} */}
              {productData &&
                productData.map((item, index) => {
                  if (item.tags == "popular") {
                    return (
                      <div key={index} className="col-3 ">
                        <Link to="" className="product-card position-relative">
                          <div className="wishlist-icons position-absolute">
                            <button
                              className="bg-transparent border-0"
                              onClick={(e) => addToWishList(item?._id)}
                            >
                              <img
                                src={wishlist}
                                alt="wishlist"
                                className=" "
                              />
                            </button>
                          </div>
                          <div className="product-image justify-content-center">
                            <img
                              src={item?.images[0]?.url}
                              alt=" product-image"
                              className="img-fluid "
                            />
                            <img
                              src={watch2}
                              alt=" product-image"
                              className="img-fluid "
                            />
                          </div>
                          <div className="product-details">
                            <h6 className="brand">{item.brand}</h6>
                            <h5 className="product-title">{item.title}</h5>
                            {location.pathname !== "/store" ? (
                              ""
                            ) : (
                              <p
                                className="description"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
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
                              <Link
                                to={`/product/${item._id}`}
                              >
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
                  }
                })}

             
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper bg-white p-3 card-wrapper">
                <Marquee className="d-flex">
                  <div className="d-flex ">
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand1} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand2} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand3} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand4} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand5} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand6} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25  ">
                      <img src={brand7} alt="" />
                    </div>
                    <div className="gap-15 mx-5 w-25 ">
                      <img src={brand8} alt="" />
                    </div>
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="blog-section">Our Latest Blogs</h3>
            </div>

            <div className="row d-flex flex-wrap gap-5">
              {BlogData?.map((item, index) => {
                return <BlogCard key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
