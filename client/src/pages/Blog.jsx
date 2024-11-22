import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/Blog/blogSlice";
const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  const BlogData = useSelector((state) => state?.blog?.blogs);
  console.log(BlogData);
  return (
    <>
      <Meta title={"Blog"} />
      <BrreadCrumb title="Blog" />
      <div className="blog-wrapper home-wrapper-2 py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <div className="filter-card  mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Home</li>
                    <li>Our Store</li>
                    <li>Blogs</li>
                    <li>contact</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div className="row d-flex flex-wrap gap-5">
                {BlogData?.map((item, index) => {
                  return <BlogCard key={index} item={item}  />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
