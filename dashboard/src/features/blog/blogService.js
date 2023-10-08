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

const fetchBlog = async() => {
    const response = await axios.get(`${base_url}blog/allblogs`)
    return response.data
}

const createBlog = async(blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, configHeader)
    return response.data
}
const getABlog = async(blogId) => {
  const response = await axios.get(`${base_url}blog/getblog/${blogId}`, configHeader)
  return response.data
}
const updateABlog = async(blog) => {
  const response = await axios.put(`${base_url}blog/updateblog/${blog.id}`, {...blog.blogData}, configHeader)
  return response.data
}
const deleteABlog = async(blogId) => {
  const response = await axios.delete(`${base_url}blog/deleteblog/${blogId}`, configHeader)
  return response.data
}

 const blogService = {
    fetchBlog,
    createBlog,
    getABlog,
    updateABlog,
    deleteABlog,
}

export default blogService;