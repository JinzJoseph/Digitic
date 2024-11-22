import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductCategory } from "../features/productCategory/productCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../Components/CustomModal";
import { deleteProductCategory } from "../features/productCategory/productCategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [catId, setcatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductCategory());
  }, []);
  const productCategoryData = useSelector(
    (state) => state.productCategory.productcategorys
  );
  const data1 = [];
  for (let i = 0; i < productCategoryData?.length; i++) {
    data1.push({
      key: i + 1,
      name: productCategoryData[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryData[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(productCategoryData[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProductCategorys = (e) => {
    dispatch(deleteProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllProductCategory());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={Tablecolumns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProductCategorys(catId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default CategoryList;
