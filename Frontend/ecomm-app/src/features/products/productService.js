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

const fetchProducts = async (data) => {
  console.log(data)
    const response = await axios.get(`${base_url}product/allproduct?${data?.brand? `brand=${data?.brand}&&`:""}${data?.tags? `tag=${data?.tags}&&`:""}${data?.category? `category=${data?.category}&&`:""}${data?.minPrice? `price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice? `price[lte]=${data?.maxPrice}&&`:""}${data?.sort? `sort=${data?.sort}&&`:""}`)
    if(response.data){
        return response.data
    }
}

const fetchProduct = async (prodId) => {
  const response = await axios.get(`${base_url}product/${prodId}`)
  if(response.data){
      return response.data
  }
}

const addProductToWishList = async (prodId) => {
    const response = await axios.put(`${base_url}product/wishlist`, {prodId}, configHeader)
    if(response.data){
        return response.data
    }
}

const rateAProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, configHeader)
  if(response.data){
      return response.data
  }
}
const productService = {
    fetchProducts,
    fetchProduct,
    addProductToWishList,
    rateAProduct,
}

export default productService;