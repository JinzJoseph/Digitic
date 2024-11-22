import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import watch from "../assets/watch.jpg";
import cross from "../assets/cross.svg";
import Color from "../components/Color";
const CompareProduct = () => {
  return (
    <>
      <Meta title={" Compare-product"} />
      <BrreadCrumb title="Compare Product" />
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src={cross}
                  alt="product-image"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src={watch} alt="product-image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Honor T1 7.0.1 GB RAm</h5>
                  <h6 className="price mt-3">$100</h6>
                  <div>
                    <div className="product-detail ">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Availbility:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Color:</h5>

                      <Color />
                    </div>
                    <div className="product-detail ">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src={cross}
                  alt="product-image"
                  className="position-absolute cross"
                />
                <div className="product-card-image">
                  <img src={watch} alt="product-image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Honor T1 7.0.1 GB RAm</h5>
                  <h6 className="price mt-3">$100</h6>
                  <div>
                    <div className="product-detail ">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Availbility:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Color:</h5>

                      <Color />
                    </div>
                    <div className="product-detail ">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src={cross}
                  alt="product-image"
                  className="position-absolute cross"
                />
                <div className="product-card-image">
                  <img src={watch} alt="product-image" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Honor T1 7.0.1 GB RAm</h5>
                  <h6 className="price mt-3">$100</h6>
                  <div>
                    <div className="product-detail ">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Availbility:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail ">
                      <h5>Color:</h5>

                      <Color />
                    </div>
                    <div className="product-detail ">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
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

export default CompareProduct;
