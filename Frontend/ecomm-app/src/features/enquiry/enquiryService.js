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

const createEnquiry = async (enquiry) => {
    const response = await axios.post(`${base_url}enquiry/`, enquiry)
    return response.data;

}

const enquiryService = {
    createEnquiry,
}

export default enquiryService;