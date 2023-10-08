import axios from 'axios';
import { base_url } from '../../utils/base_url';

const fetchUsers = async() => {
    const response = await axios.get(`${base_url}user/all-user`)
    return response.data
}

 const customerService = {
    fetchUsers,
}

export default customerService;