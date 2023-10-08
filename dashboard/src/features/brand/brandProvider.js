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

const fetchBrand = async () => {
    const response = await axios.get(`${base_url}brand/getallbrand`)
    return response.data;
}

const createBrand = async (brand) => {
    const response = await axios.post(`${base_url}brand/`, brand, configHeader)
    return response.data;
}

const getBrand = async (brandId) => {
  const response = await axios.get(`${base_url}brand/getbrand/${brandId}`, configHeader)
  return response.data;
}

const updateABrand = async (brand) => {
  const response = await axios.put(`${base_url}brand/update/${brand.id}`, {title: brand.brandData.title}, configHeader)
  return response.data;
}

const deleteABrand = async (brandId) => {
  const response = await axios.delete(`${base_url}brand/delete/${brandId}`, configHeader)
  return response.data;
}

const brandProvider = {
    fetchBrand,
    createBrand,
    getBrand,
    updateABrand,
    deleteABrand,
}

export default brandProvider;