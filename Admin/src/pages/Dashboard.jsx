import React, { useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getMonthlyData } from "../features/auth/authSlice";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Feb",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "Apr",
    sales: 145,
  },
  {
    type: "May",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 38,
  },
  {
    type: "July",
    sales: 38,
  },
  {
    type: "Aug",
    sales: 38,
  },
  {
    type: "Sept",
    sales: 38,
  },
  {
    type: "Oct",
    sales: 90,
  },
  {
    type: "Nov",
    sales: 38,
  },
  {
    type: "Dec",
    sales: 38,
  },
];
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state?.auth?.getMonthlyData);
  useEffect(() => {
    dispatch(getMonthlyData());
  }, []);
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-3">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 border border-1 p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 border border-1 p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 border border-1 p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="d-flex  gap-5 justify-content-between ">
        <div className=" mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 w-50">
          <h3 className="mb-5 title ">Recent Orders</h3>
          <div>
            <Table columns={Tablecolumns} dataSource={data1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
