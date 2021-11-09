import axios from "axios"
import { BASE_URL } from '../settings'
export const TokenControl = (token) => {
    return axios.get(`${BASE_URL}/control/tokenControl`, {
        headers: {
            "access_token": `Bearer: ${token}`
        }
    });
}