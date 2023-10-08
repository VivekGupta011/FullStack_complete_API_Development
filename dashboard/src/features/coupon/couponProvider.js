import axios from "axios";
import { base_url } from "../../utils/base_url";


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

const fetchCoupon = async () => {
    const response = await axios.get(`${base_url}coupon/allcoupon`, configHeader)
    return response.data;
}

const createCoupon = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, configHeader)
    return response.data;
}

const getACoupon = async (couponId) => {
  const response = await axios.get(`${base_url}coupon/getcoupon/${couponId}`, configHeader)
  return response.data;
}

const updateACoupon = async (coupon) => {
  const response = await axios.put(`${base_url}coupon/updatecoupon/${coupon.id}`, {name: coupon.couponData.name, expiry: coupon.couponData.expiry, discount: coupon.couponData.discount}, configHeader)
  return response.data;
}

const deleteACoupon = async (couponId) => {
  const response = await axios.delete(`${base_url}coupon/deletecoupon/${couponId}`, configHeader)
  return response.data;
}

const couponProvider = {
    fetchCoupon,
    createCoupon,
    getACoupon,
    updateACoupon,
    deleteACoupon,
}

export default couponProvider;