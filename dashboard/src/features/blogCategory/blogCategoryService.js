import axios from 'axios';
import { base_url } from '../../utils/base_url';


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

const fetchBlogCategory = async() => {
    const response = await axios.get(`${base_url}blogcategory/getallblogcategory`)
    return response.data
}

const createBlogCategory = async(data) => {
    const response = await axios.post(`${base_url}blogcategory/`, data, configHeader)
    return response.data
}


const getABlogCategory = async(bCatId) => {
  const response = await axios.get(`${base_url}blogcategory/getblogcategory/${bCatId}`, configHeader)
  return response.data
}

const updateABlogCategory = async(data) => {
  const response = await axios.put(`${base_url}blogcategory/update/${data.id}`, { title: data.blogCatData.title }, configHeader)
  return response.data
}

const deleteABlogCategory = async(bCatId) => {
  const response = await axios.delete(`${base_url}blogcategory/delete/${bCatId}`, configHeader)
  return response.data
}

 const blogCategoryService = {
    fetchBlogCategory,
    createBlogCategory,
    getABlogCategory,
    updateABlogCategory,
    deleteABlogCategory,
}

export default blogCategoryService;