import axios from 'axios';
import { base_url } from '../../utils/baseUrl';


// const getToken = localStorage.getItem("customer")
//   ? JSON.parse(localStorage.getItem("customer"))
//   : null;

// const configHeader = {
//   headers: {
//     Authorization: `Bearer ${getToken?.token}`,
//     Accept: "application/json",
//   },
// };

const getAllBlogs = async () => {
    const response = await axios.get(`${base_url}blog/allblogs`)
    if(response.data){
        return response.data
    }
}

const getABlog = async (blogId) => {
    const response = await axios.get(`${base_url}blog/getblog/${blogId}`)
    if(response.data){
        return response.data
    }
}

const blogService = {
    getAllBlogs,
    getABlog,
}

export default blogService;