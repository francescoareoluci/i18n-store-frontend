import axios from 'axios';
import { BASE_URL } from './rest_api';


function buildLoginAxios(username, password) {
    const auth = {
        username: username,
        password: password
    };

    const authJsonStr = JSON.stringify(auth);
    
    let axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 2000,
        headers: {'Authorization': 'Basic   ' + 
                    Buffer.from(authJsonStr).toString('base64')}
    })
    return axiosInstance;
}
  
export default buildLoginAxios;