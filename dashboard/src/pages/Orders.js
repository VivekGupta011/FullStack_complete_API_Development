import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderData } from '../features/orders/orderSlice';
import { configHeader } from '../header/header';


const Orders = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders(configHeader))
  },[dispatch])
  const orderState = useSelector((state) => state.order.orders)
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
          title: 'Product',
          dataIndex: 'product',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
        },
        {
          title: 'Date',
          dataIndex: 'date',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ];
      const data1 = [];
      for (let i = 0; i < orderState.length; i++) {
        data1.push({
          key: i + 1,
          name: orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
          product: <Link to={`/admin/orders/${orderState[i]?._id}`}>View Orders</Link>,
          amount: orderState[i]?.totalPrice,
          date: new Date(orderState[i].createdAt).toLocaleDateString(),
          action: (<>
          <select defaultValue={orderState[i]?.orderStatus} onChange={(e) =>updateOrderSatus(e.target.value, orderState[i]?._id) } name="" id='' className='form-control form-select'>
          <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          </>) 
        });
      }

      const updateOrderSatus = (e, i) => {
        const data = {id: i,  status: e, configHeader: configHeader}
        dispatch(updateOrderData(data))
        console.log(e, i)
      }
  return (
    <div>
    <h3 className="mb-4 title">Orders</h3>
    <div>
    <Table  columns={columns} dataSource={data1} />
    </div>
</div>
  );
}

export default Orders;
