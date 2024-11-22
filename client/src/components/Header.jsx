import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../assets/compare.svg";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import wishlist from "../assets/wishlist.svg";
import user from "../assets/user.svg";
import cart from "../assets/cart.svg";
import menu from "../assets/menu.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const [totalAmount, settotalAmount] = useState("");
  const [productOpt, setproductOpt] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);
  const cartData = useSelector((state) => state?.auth?.cartproducts);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartData?.length; index++) {
      sum = sum + Number(cartData[index].qauntity * cartData[index].price);
      settotalAmount(sum);
    }
  }, []);
  const productstate = useSelector((state) => state.products.products);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [paginate, setPaginate] = useState(true);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productstate.length; index++) {
      const element = productstate[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setproductOpt(data);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <header className="header top-strip py-3 ">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping over $100 & Free Returns
              </p>
            </div>
            <div className="col-6 d-flex justify-content-between ">
              <p className=" text-white mb-0">
                Hotline:
                <a href="tel:+91 5678908765434567" />
                {888} 4344 6000-{888} 1338 8193
              </p>
              <p className="text-white d-flex gap-2 align-items-center">
                {" "}
                English <IoMdArrowDropdown />
              </p>
              <p className="text-white d-flex gap-2 align-items-center">
                {" "}
                India <IoMdArrowDropdown />
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header haeder-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2 text-end gap-6">
              <h3>
                <Link to="/ " className="text-white ">
                  Digitic.
                </Link>
              </h3>
            </div>
            <div className="col-5">
              <div className="input-group  ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  options={productOpt}
                  paginate={paginate}
                  placeholder="Search Product Here..."
                  labelKey={"name"}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                  }}
                  minLength={2}
                />
                {/* <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here...."
                  aria-label="Search Product Here...."
                  aria-describedby="basic-addon2"
                /> */}
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link
                    to="/compare-product"
                    className="text-white  d-flex align-items-center gap-10"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishList"
                    className="text-white  d-flex align-items-center gap-10"
                  >
                    <img src={wishlist} alt="wishList" />
                    <p className="mb-0">
                      Favourite <br />
                      wishList
                    </p>
                  </Link>
                </div>

                <Link
                  to={authState?.user === null ? "/login" : "/my-profile"}
                  className="text-white  d-flex  align-items-center gap-10"
                >
                  {" "}
                  <img src={user} alt="my-account" />
                  {authState.user === null ? (
                    <p className="mb-0">
                      Login <br />
                      My Acoount
                    </p>
                  ) : (
                    <p className="mb-0">Welcome {authState?.user?.firstname}</p>
                  )}
                </Link>

                {/* <div>
                  <Link
                    to="/login"
                    className="text-white  d-flex align-items-center gap-10"
                  >
                    <img src={user} alt="my-account" />
                    <p className="mb-0">
                      Login <br />
                      My Acoount
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">
                        {cartData?.length ? cartData.length : "0"}
                      </span>
                      <p className="mb-0">${totalAmount}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent  border-0 gap-15 d-flex align-items-center  "
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 inline-block">Show Categories</span>
                    </button>
                    <ul
                      className="dropdown-menu "
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links ">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/" className="text-white">
                      Home
                    </NavLink>
                    <NavLink to="/store" className="text-white">
                      Our store
                    </NavLink>
                    <NavLink to="/blog" className="text-white">
                      Blogs
                    </NavLink>
                    <NavLink to="/my-orders" className="text-white">
                      My orders
                    </NavLink>
                    <NavLink to="/contact" className="text-white">
                      contact
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="border border-0 bg-transparent text-white text-uppercase"
                      type="button"
                    >
                      Logout
                    </button>
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

export default Header;
