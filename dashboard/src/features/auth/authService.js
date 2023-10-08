import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async(userData) => {
    const response = await axios.post(`${base_url}user/loginadmin`, userData)
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const getMonthlyOrders = async(configHeader) => {
    const response = await axios.get(`${base_url}user/getmonthwiseorderincome`, configHeader)
    if(response.data){
        return response.data
    }
}

const getYearlyStats = async(configHeader) => {
    const response = await axios.get(`${base_url}user/getyearlytotalorders`, configHeader)
    if(response.data){
        return response.data
    }
}

 const authService = {
    login,
    getMonthlyOrders,
    getYearlyStats,
}

export default authService;