import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { GetColorName } from "hex-color-to-color-name";
import axios from "axios";
import { createUserOrder, emptyUserCart, getUserCart } from "../features/user/userSlice";

const Checkout = () => {
  const authState = useSelector((state) => state?.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [totalAmount, setTotalAmount] = useState(null);
  const[shoppingInfo, setShoppingInfo] = useState(null);
  //const[paymentInfo, setPaymentInfo] = useState({razorpayPaymentId: "", razorpayOrderId: ""})
  const[cartProductState, setCartProductState] = useState([])
  const cartState = useSelector((state) => state?.auth?.cart);
  useEffect(() => {
    dispatch(getUserCart())
  },[])
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
      setTotalAmount(sum);
    }
  }, [cartState]);
  useEffect(() => {
    if(authState.createdOrder?.userOrders !== undefined && authState?.createdOrder?.isSuccess === true){
      navigate("/my-orders")
    }
    
  },[authState])

  const formik = useFormik({
    initialValues: {
      country: "",
      firstname: "",
      lastname: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is Required"),
      firstname: Yup.string().required("First Name is Required"),
      lastname: Yup.string().required("Last Name is Required"),
      address: Yup.string().required("Address is Required"),
      apartment: Yup.string().required("Apartment is Required"),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      pincode: Yup.string().required("Pincode is Required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem('address', JSON.stringify(values))
      setShoppingInfo(JSON.parse(localStorage.getItem("address")))
    setTimeout( async () => {
    await checkoutHandler()
    }, 300)
    },
  });
 console.log(shoppingInfo)
  const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  useEffect(() => {
    let items = []
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        price: cartState[index]?.price,
        color: cartState[index]?.color?._id
      })
    }
    setCartProductState(items)
  },[])
  // console.log(cartProductState)
  const checkoutHandler = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
        alert("Razorpay SDK Failed To Load")
        return;
    }

    const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

    const result = await axios.post('http://localhost:4000/api/user/order/checkout', {amount: totalAmount + 5}, configHeader)
    if(!result){
        alert("Something Went Wrong")
        return;
    }
   // alert("Hello")
    const{ amount, order_id, id, currency } = result.data.order;

    // console.log(result.data.order)

    const options = {
        key: "rzp_test_m4NW0heBziEXDz", // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Hassan Musa",
        description: "Test Transaction",
       // image: { logo },
        order_id: id,
        handler: async function (response) {
          // console.log(response)
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
          
            const result = await axios.post("http://localhost:4000/api/user/order/paymentverification", data, configHeader);
            dispatch(createUserOrder({totalPrice: totalAmount, totalPriceAfterDiscount: totalAmount, orderItems: cartProductState, paymentInfo: result.data,  shippingInfo: JSON.parse(localStorage.getItem("address"))}))
            dispatch(emptyUserCart())
            localStorage.removeItem("address")
        },
        prefill: {
            name: "Hassan Musa",
            email: "hassanmusa3971@gmail.com",
            contact: "+23278837468",
        },
        notes: {
            address: "Up Town Bar Calabatown",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <Meta title="Checkout" />
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav style={{ "--bs breadcrumb-divider:": ">" }}>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;
                  <li className="breadcrumb-item total-price active">
                    Information
                  </li>
                  &nbsp; / &nbsp;
                  <li className="breadcrumb">Shipping</li>
                  &nbsp; / &nbsp;
                  <li className="breadcrumb-item">Payment</li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">hassanmusa3971@gmail.com</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-wrap justify-content-between gap-15"
              >
                <div className="w-100">
                  <select
                    name="country"
                    id=""
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur}
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="India">India</option>
                  </select>
                  <div className="error text-danger ms-2 my-2">
                  {formik.touched.country && formik.errors.country ? (
                    <div>{formik.errors.country}</div>
                  ) : null}
                </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                  />
                  <div className="error text-danger ms-2 my-2">
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div>{formik.errors.firstname}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  <div className="error text-danger ms-2 my-2">
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div>{formik.errors.lastname}</div>
                    ) : null}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="form-control"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                    <div className="error text-danger ms-2 my-2">
                  {formik.touched.address && formik.errors.address ? (
                    <div>{formik.errors.address}</div>
                  ) : null}
                </div>
                </div>
              
                <div className="w-100">
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, Suite"
                    className="form-control"
                    onChange={formik.handleChange("apartment")}
                    onBlur={formik.handleBlur}
                    value={formik.values.apartment}
                  />
                   <div className="error text-danger ms-2 my-2">
                  {formik.touched.apartment && formik.errors.apartment ? (
                    <div>{formik.errors.apartment}</div>
                  ) : null}
                </div>
                </div>
               
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="form-control"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                  <div className="error text-danger ms-2 my-2">
                  {formik.touched.city && formik.errors.city ? (
                    <div>{formik.errors.city}</div>
                  ) : null}
                </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur}
                    id=""
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Freetown">
                      Freetown
                    </option>
                    <option value="Bo">
                      Bo
                    </option>
                    <option value="Makeni">
                      Makeni
                    </option>
                    <option value="Kenema">
                      Kenema
                    </option>
                  </select>
                  <div className="error text-danger ms-2 my-2">
                  {formik.touched.state && formik.errors.state ? (
                    <div>{formik.errors.state}</div>
                  ) : null}
                </div>
                </div>
              
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="pincode"
                    className="form-control"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur}
                    value={formik.values.pincode}
                  />
                  <div className="error text-danger ms-2 my-2">
                    {formik.touched.pincode && formik.errors.pincode ? (
                      <div>{formik.errors.pincode}</div>
                    ) : null}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="fs-5" /> Return to cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button"  type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState.map((cartItem) => (
                  <div
                    className="d-flex align-content-center gap-10 mb-2"
                    key={cartItem?._id}
                  >
                    <div className="w-75 d-flex">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {cartItem?.quantity}
                        </span>
                        <img
                          className="img-fluid"
                          width={100}
                          height={100}
                          src={cartItem?.productId?.images[0]?.url}
                          alt="watch"
                        />
                      </div>
                      <div>
                        <h5 className="total-price">
                          {cartItem?.productId?.title}
                        </h5>
                        <p className="total-price">
                          s / {GetColorName(cartItem?.color?.title)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">
                        ${cartItem?.price * cartItem?.quantity}
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">${totalAmount ? totalAmount : 0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$5</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4>Total</h4>
                <h5>${totalAmount ? totalAmount + 5 : 0}</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
