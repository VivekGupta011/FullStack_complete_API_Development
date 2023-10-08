import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { configHeader } from "../header/header";
import { getMonthlyData, getYearlyData } from '../features/auth/authSlice';
import { getOrders } from '../features/orders/orderSlice';

const Dashboard = () => {
  const[dataMonthly, setDataMonthly] = useState([])
  const[dataMonthlySales, setDataMonthlySales] = useState([])
  const[dataYearly, setDataYearly] = useState([])
  const[orderData, setOrderData] =useState([])
  const monthlySatate = useSelector((state) => state?.auth?.monthlyData)
  const yearlyState = useSelector((state) => state?.auth?.yearlyData)
  const ordersState = useSelector((state) => state?.order?.orders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMonthlyData(configHeader))
  },[dispatch])
  useEffect(() => {
    dispatch(getYearlyData(configHeader))
  },[dispatch])
  useEffect(() => {
    dispatch(getOrders(configHeader))
  },[dispatch])
  useEffect(() => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = []
    let monthlyOrderCount = []
    for (let index = 0; index < monthlySatate?.length; index++) {
      const element = monthlySatate[index];
      data.push({type: months[element?._id?.month], income: element?.amount})
      monthlyOrderCount.push({type: months[element?._id?.month], sales: element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)
  },[monthlySatate])

  useEffect(() => {
    let data = []
    for (let index = 0; index < yearlyState?.length; index++) {
      const element = yearlyState[index];
      data.push(element)
    }
    setDataYearly(data)
  },[yearlyState])

  useEffect(() => {
    const data1 = []
    for (let i = 0; i < ordersState?.length; i++) {
      data1.push({
        key: i + 1,
        name: ordersState[i]?.user?.firstname + " " + ordersState[i]?.user?.lastname,
        product: ordersState[i]?.orderItems?.length,
        price: "$"+ordersState[i]?.totalPrice,
        dprice: "$"+ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus
      })
    }
    setOrderData(data1)
  },[ordersState])
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product Count',
      dataIndex: 'product',
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
    },
    {
      title: 'Total Price After Discount',
      dataIndex: 'dprice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

 

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
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
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
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
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };
  return (
    <>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        {
          dataYearly && dataYearly.map((yearly, index) => (
            <div key={index} className='d-flex p-3 flex-grow-1 justify-content-between align-align-items-end bg-white p-3 rounded-2'>
            <div>
              <p className='desc'>Total Income</p>
              <h4 className='mb-0 sub-title'>${yearly?.amount}</h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
              <p className='mb-0 desc'>Income in this Year from Today</p>
            </div>
          </div>
          ))
        }
       
       {
        dataYearly && dataYearly.map((yearly, index) => (
          <div key={index} className='d-flex p-3 flex-grow-1 justify-content-between align-align-items-end bg-white p-3 rounded-2'>
          <div>
              <p className='desc'>Total Sales</p>
              <h4 className='mb-0 sub-title'>{yearly?.count}</h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
              <p className='mb-0 desc'>Sales in this Year from Today</p>
            </div>
          </div>
        ))
       }
      </div>
      <div className='d-flex justify-content-between gap-3'>
      <div className="mt-4 flex-grow-1">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
        <Column {...config} /> 
        </div>
      </div>
      <div className="mt-4 flex-grow-1">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div>
        <Column {...config2} />
        </div>
      </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">
          Recent Orders
        </h3>
        <div>
        <Table  columns={columns} dataSource={orderData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
