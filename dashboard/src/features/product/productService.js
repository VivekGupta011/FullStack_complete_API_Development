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
  
const fetchProduct = async() => {
    const response = await axios.get(`${base_url}product/allproduct`)
    return response.data;
}

const createProduct = async (product) => {
    const response = await axios.post(`${base_url}product/`, product, configHeader)
    return response.data;
  }
const productService = {
    fetchProduct,
    createProduct,
}
export default productService;