import React, { useEffect } from "react";
import Meta from "../components/Meta";
import { FaLongArrowAltLeft } from "react-icons/fa";
import BrreadCrumb from "../components/BrreadCrumb";

import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/Blog/blogSlice";
const SingleBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const BlogId = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getABlog(BlogId));
  }, [BlogId]);
  const BlogData = useSelector((state) => state.blog.BlogData);

  return (
    <>
      <Meta title={" Dynamic Blog Name"} />
      <BrreadCrumb title="Dynamic Blog Name" />
      <div className="blog-wrapper home-wrapper-2 py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link
                  to="/blog"
                  className="d-flex align-items-center  mb-5    gap-10"
                >
                  {" "}
                  <FaLongArrowAltLeft />
                  Go to Blogs
                </Link>
                <h3 className="title  mb-4">{BlogData?.title}</h3>
                <img
                  src={BlogData?.images[0]?.url}
                  className="img-fluid w-100 "
                  alt=""
                />
                <p
                  className="mt-5"
                  dangerouslySetInnerHTML={{ __html: BlogData?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
