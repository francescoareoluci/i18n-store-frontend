import axios from 'axios';
import { BASE_URL } from './rest_api';


function buildCustomAxios(token) {
    let axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 2000,
        headers: {'Authorization': 'Bearer ' + token}
    })
    return axiosInstance;
}
  
export default buildCustomAxios;