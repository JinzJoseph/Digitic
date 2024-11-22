import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, deleteBlog } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../Components/CustomModal";
const Tablecolumns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Blog Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [BlogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog());
  }, []);
  const blogData = useSelector((state) => state.blog.blogs);
  console.log(blogData);
  const data1 = [];
  for (let i = 0; i < blogData.length; i++) {
    data1.push({
      key: i + 1,
      name: blogData[i].title,
      category: blogData[i].category,

      action: (
        <>
          <Link
            to={`/admin/blog/${blogData[i].id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogData[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogs = (e) => {
    dispatch(deleteBlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllBlog());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={Tablecolumns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogs(BlogId);
        }}
        title="Are you sure you want to delete this Blog?"
      />
    </div>
  );
};

export default BlogList;
