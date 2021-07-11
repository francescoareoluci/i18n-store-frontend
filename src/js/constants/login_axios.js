import axios from 'axios';
import { BASE_URL } from './rest_api';
import { encode as base64_encode } from 'base-64';


function buildLoginAxios(username, password) {
    /*
    const auth = {
        username: username,
        password: password
    };*/

    const auth = username + ":" + password;
    
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {'Authorization': 'Basic   ' + 
                    base64_encode(auth)}
    })
    return axiosInstance;
}
  
export default buildLoginAxios;