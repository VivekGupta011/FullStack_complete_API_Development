import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {
  deleteCartProduct,
  getUserCart,
  updateQuantity,
} from "../features/user/userSlice";
import { GetColorName } from "hex-color-to-color-name";

const Cart = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);
  useEffect(() => {
    if (productDetail !== null) {
      dispatch(
        updateQuantity({
          cartItemId: productDetail?.cartItemId,
          quantity: productDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productDetail]);
  const cartState = useSelector((state) => state?.auth?.cart);
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">PRODUCT</h4>
              <h4 className="cart-col-2">PRICE</h4>
              <h4 className="cart-col-3">QUANTITY</h4>
              <h4 className="cart-col-4">TOTAL</h4>
            </div>

            {cartState &&
              cartState.map((cartproduct) => (
                <div
                  key={cartproduct?._id}
                  className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                >
                  <div className="cart-col-1 d-flex align-items-center gap-15">
                    <div className="w-25">
                      <img
                        src={cartproduct?.productId?.images[0]?.url}
                        className="img-fluid"
                        alt={cartproduct?.productId?.title}
                      />
                    </div>
                    <div className="w-75">
                      <p>{cartproduct?.productId?.title}</p>
                      <p>Size: M</p>
                      <p>Color: {GetColorName(cartproduct?.color?.title)}</p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">${cartproduct?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        type="number"
                        value={cartproduct?.quantity}
                        onChange={(e) =>{
                          setProductDetail({
                            cartItemId: cartproduct?._id,
                            quantity: e.target.value,
                          });
                          e.stopPropagation();
                        }
                        }
                        className="form-control w-70 py-1"
                        min={1}
                        max={10}
                        name=""
                        id={`cart${cartproduct?._id}`}
                      />
                    </div>
                    <div>
                      <AiFillDelete
                        className="fs-5 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          deleteACartProduct(cartproduct?._id);
                        }}
                      />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">
                      {cartproduct?.price * cartproduct?.quantity}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: ${totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
