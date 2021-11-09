
import axios from 'axios'
import {BASE_URL} from '../settings'


export const RegisterRequest = (username, password, email) => {
    return axios.post(`${BASE_URL}/user/register`,
        { username, password, email });
}


export const LoginRequest = (username,password) => {
    return axios.post(`${BASE_URL}/user/login`,{
        username,
        password
    })
}
