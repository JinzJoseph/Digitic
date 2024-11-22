import React from "react";

import { Link, useLocation } from "react-router-dom";
import moment from "moment";
const BlogCard = ({ item }) => {
  const location = useLocation();

  return (
    <div className={location.pathname === "/blog" ? "col-5" : "col-3"}>
      <div className="blog-card">
        <div className="card-image">
          <img
            src={item?.images[0]?.url}
            className="img-fluid w-100"
            alt="blog"
          />
        </div>
        <div className="blog-content">
          <p className="date">
            {moment(item?.createAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <h5 className="title">{item?.title}</h5>
          <p
            className="description"
            dangerouslySetInnerHTML={{
              __html: item?.description.substring(0, 15) + ".........",
            }}
          ></p>
          <Link to={`/blog/${item?._id} `} className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
