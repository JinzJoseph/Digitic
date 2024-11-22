import React, { useEffect } from "react";
import { Table } from "antd";
import { getUsers } from "../features/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerData = useSelector((state) => state.customer.customers);
  console.log(customerData);
  const data1 = [];
  for (let i = 0; i < customerData.length; i++) {
    if (customerData[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerData[i].firstname + " " + customerData[i].lastname,
        email: customerData[i].email,
        mobile:`${customerData[i]?.mobile}`,
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Customers List</h3>
      <div>
        <Table columns={Tablecolumns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
