import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../Components/CustomModal";
import {
  getAllBlogCategory,
  deleteBlogCategory,
  resetState,
} from "../features/blogCategory/blogCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
const Tablecolumns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [bcatId, setbcatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbcatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, []);
  const BlogCategoryData = useSelector(
    (state) => state.blogCategory.blogcategories
  );
  const data1 = [];
  for (let i = 0; i < BlogCategoryData?.length; i++) {
    data1.push({
      key: i + 1,
      name: BlogCategoryData[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${BlogCategoryData[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(BlogCategoryData[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCat = (e) => {

    dispatch(deleteBlogCategory(e));
    toast.success("Blog Category is  deleted successfully");
    dispatch(resetState());

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllBlogCategory());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={Tablecolumns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCat(bcatId);
        }}
        title="Are you sure you want to delete this blog categories?"
      />
    </div>
  );
};

export default BlogCategoryList;
