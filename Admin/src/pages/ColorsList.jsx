import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllColor,
  deleteColor,
  resetState,
} from "../features/color/colorSlice";
import CustomModal from "../Components/CustomModal";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
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

const ColorsList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllColor());
  }, []);
  const colorData = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < colorData.length; i++) {
    data1.push({
      key: i,
      name: colorData[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colorData[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorData[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColors = (e) => {
    dispatch(deleteColor(e));
    toast.success("color deleted successfully");
    dispatch(resetState());

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllColor());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Colors List</h3>
      <div>
        <Table columns={Tablecolumns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColors(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorsList;
