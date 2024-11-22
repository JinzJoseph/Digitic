import React from "react";
import newLetter from "../assets/newsletter.png";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top-data d-flex align-items-center">
                <img src={newLetter} alt="" />
                <h2 className="text-white mb-0">Sign up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group  ">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Your Email Address....."
                  aria-label="Your Email Address....."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h5 className="text-white mb-3">Contact us</h5>
              <div>
                <address className="text-white fs-7">
                  Hno:277 Near vill chopal,
                  <br />
                  Sonipat,Harayana <br />
                  Pincode:131103
                </address>
                <a
                  href="tel:+91 3456987654"
                  className="text-white mt-4 d-block "
                >
                  +91 6478674645
                </a>
                <a
                  href="mailto:jinsjosephkunnummel000@gmail.com"
                  className="text-white mt-4 d-block mb-3"
                >
                  jinsjosephkunnummel000@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 ">
                  <a href="" alt="social-icons">
                    <BsLinkedin className="text-white fs-5" />
                  </a>
                  <a href="" alt="social-icons">
                    <BsGithub className="text-white fs-5" />
                  </a>
                  <a href="" alt="social-icons">
                    <BsYoutube className="text-white fs-5" />
                  </a>
                  <a href="" alt="social-icons">
                    <BsInstagram className="text-white fs-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h5 className="text-white mb-3">Information</h5>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  shipping policy
                </Link>
                <Link to="/term-service" className="text-white py-2 mb-1">
                  Terms of services{" "}
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Blogs{" "}
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h5 className=" text-white mb-3">Account</h5>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Search</Link>
                <Link className="text-white py-2 mb-1">Abount us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">contact </Link>
                <Link className="text-white py-2 mb-1">size chart </Link>
              </div>
            </div>
            <div className="col-2">
              <h5 className="text-white mb-3">Quick Links</h5>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">HeadPhones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watch </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy:{new Date().getFullYear()}powered by JK
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
