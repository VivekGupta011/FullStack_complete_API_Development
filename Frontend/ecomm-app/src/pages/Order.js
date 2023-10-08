import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getUserOrders } from "../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.userOrders);
  console.log(orderState);
  return (
    <>
      <Meta title="Orders" />
      <BreadCrumb title="My Orders" />
      <Container class1="order-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order ID</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState.map((order) => (
                <div style={{backgroundColor: "#febd69"}} className="row my-3 pt-3" key={order?._id}>
                  <div className="col-3">
                    <p>{order?._id}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.totalPrice}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.totalPriceAfterDiscount}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.orderStatus}</p>
                  </div>
                  <div className="col-12">
                    <div style={{backgroundColor: "#232f36"}} className="row  py-3">
                      <div className="col-3">
                        <h6 className="text-white">Product Name</h6>
                      </div>
                      <div className="col-3">
                        <h6 className="text-white">Quantity</h6>
                      </div>
                      <div className="col-3">
                        <h6 className="text-white">Price</h6>
                      </div>
                      <div className="col-3">
                        <h6 className="text-white">Color</h6>
                      </div>
                    </div>
                  </div>
                  {order &&
                    order.orderItems.map((product) => (
                      <div className="col-12" key={product?.product?._id}>
                        <div style={{backgroundColor: "#232f36"}} className="row p-3">
                          <div className="col-3">
                            <p className="text-white">{product?.product?.title}</p>
                          </div>
                          <div className="col-3">
                            <p className="text-white">{product?.quantity}</p>
                          </div>
                          <div className="col-3">
                            <p className="text-white">{product?.price}</p>
                          </div>
                          <div className="col-3">
                            <p>
                              <ul className="colors ps-0">
                                <li
                                  style={{ backgroundColor: `${product?.color?.title}` }}
                                ></li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
