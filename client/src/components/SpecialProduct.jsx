import React from "react";
import ReactStars from "react-rating-stars-component";
import watch from "../assets/watch.jpg";
import { Link, useNavigate } from "react-router-dom";

const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, quantity, sold,id } = props;
  const navigate=useNavigate()
  return (
    <div className="col-4 mb-2" onClick={()=>navigate(`/product/${_id}`)}>
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src={watch} alt="watch" className="img-fluid" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6>{title}</h6>
            <ReactStars
              count={5}
              edit={false}
              value={totalrating}
              size={24}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">${price}</span>
              {/* <strike> </strike>1200 */}
            </p>
            <div className="discount-til d-flex align-items-center gap-15">
              <p className="mb-0">
                <b>5 </b>Days
              </p>
              <div className="d-flex gap-15 align-items-center">
                <span className="badge rounded-circle p-2 bg-danger">1</span>
                <span className="badge rounded-circle p-2 bg-danger">1</span>
                <span className="badge rounded-circle p-2 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count mt-3 mb-3">
              <p>product:{quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: (quantity / quantity) * sold * 100 + "%" }}
                  aria-valuenow={(quantity / quantity) * sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
            <Link  to={`/product/${id}`} className="button mt-2 mb-3">View Product</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
