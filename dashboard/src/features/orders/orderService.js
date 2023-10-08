import axios from "axios";
import { base_url } from "../../utils/base_url";

// const getToken = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;
// const configHeader = {
//   headers: {
//     Authorization: `Bearer ${getToken?.token}`,
//     Accept: "application/json",
//   },
// };
const fetchOrders = async (configHeader) => {
  const response = await axios.get(`${base_url}user/allorders`, configHeader);
  return response.data;
};

const getOrder = async (data) => {
  const response = await axios.get(`${base_url}user/getsingleorder/${data.id}`,  data.configHeader);
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(`${base_url}user/order/update-order-status/${data.id}`, {status: data.status},  data.configHeader);
  return response.data;
};

const orderService = {
  fetchOrders,
  getOrder,
  updateOrder,
};
export default orderService;
