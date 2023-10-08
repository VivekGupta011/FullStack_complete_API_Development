import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSingleOrderData } from '../features/orders/orderSlice';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { configHeader } from '../header/header';
import { GetColorName } from 'hex-color-to-color-name';

const ViewOrder = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const getUserId = location.pathname.split("/")[3]
    // console.log(getUserId)
 
    useEffect(() => {
      const data = {id: getUserId, configHeader: configHeader}
        dispatch(getSingleOrderData(data))
    },[dispatch, getUserId])
    const orderState = useSelector((state) => state?.order?.orderByUser)
    console.log(orderState)
    const columns = [
        {
          title: 'SNo',
          dataIndex: 'key',
        },
        {
          title: 'Product Name',
          dataIndex: 'name',
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
        },
        {
            title: 'Color',
            dataIndex: 'color',
          },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
      ];
      const data1 = [];
      for (let i = 0; i < orderState?.length; i++) {
        data1.push({
          key: i + 1,
          name: orderState[i]?.product?.title,
          brand: orderState[i]?.product?.brand,
          amount: orderState[i]?.product?.price,
          color: GetColorName(orderState[i]?.color?.title),
          quantity: orderState[i]?.product?.quantity,
        });
      }
  return (
    <div>
    <h3 className="mb-4 title">View Order</h3>
    <div>
    <Table  columns={columns} dataSource={data1} />
    </div>
</div>
  );
}

export default ViewOrder;
