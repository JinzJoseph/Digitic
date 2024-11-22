import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEnquiry,
  deleteEnquiries,
  resetState,
  updataAEnquiry,
  getAEnquiry,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../Components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquires = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };



  const setEnquiryStatus = (e,i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updataAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(enqId));
    }, 100);
  };



  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiry());
  }, []);
  const EnquiryData = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < EnquiryData?.length; i++) {
    data1.push({
      key: i + 1,
      name: EnquiryData[i].name,
      email: EnquiryData[i].email,
      mobile: EnquiryData[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              EnquiryData[i].status ? EnquiryData[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, EnquiryData[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquires/${EnquiryData[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(EnquiryData[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteEnq = (e) => {
    console.log(e);
    dispatch(deleteEnquiries(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllEnquiry());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquires</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquires;

deleteEnquiries;
