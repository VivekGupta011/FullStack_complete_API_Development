import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getToken = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

const register = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  if (response.data) {
    return response.data;
  }
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/getwishlist`, configHeader);
  if (response.data) {
    return response.data;
  }
};

const addProductToCart = async (product) => {
  const response = await axios.post(
    `${base_url}user/cart`,
    product,
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};

const getAUserCart = async () => {
  const response = await axios.get(`${base_url}user/getcart`, configHeader);
  if (response.data) {
    return response.data;
  }
};

const removeCartItem = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/delete-cart-product/${cartItemId}`,
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};

const updateCartQuantity = async (cartDetail) => {
  //console.log(cartDetail);
  const response = await axios.put(
    `${base_url}user/update-quantity/${cartDetail.cartItemId}/${cartDetail.quantity}`, "",
    configHeader
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async(orderDetail) => {
  const response = await axios.post(`${base_url}user/cart/cash-order`, orderDetail, configHeader)
  if (response.data) {
    return response.data;
  }
}

const userOrders = async() => {
  const response = await axios.get(`${base_url}user/getmyorders`, configHeader)
  if(response.data){
    return response.data;
  }
}

const updateAUser = async(userData) => {
  const response = await axios.put(`${base_url}user/update-user`, userData, configHeader)
  if(response.data){
    return response.data;
  }
}

const forgotAPassword = async(email) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`,email)
  if(response.data){
    return response.data;
  }
}

const changeAPassword = async(data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,  {password: data?.password} )
  if(response.data){
    return response.data;
  }
}

const emptyCart = async() => {
  const response = await axios.delete(`${base_url}user/emptycart`, configHeader)
  if(response.data){
    return response.data;
  }
}

const authService = {
  register,
  login,
  getUserWishlist,
  addProductToCart,
  getAUserCart,
  removeCartItem,
  updateCartQuantity,
  createOrder,
  userOrders,
  updateAUser,
  forgotAPassword,
  changeAPassword,
  emptyCart,
};

export default authService;
