import axios from "axios"
import { BASE_URL } from "../settings"

export const getAllCommunity = (token) => {
    return axios.get(`${BASE_URL}/community/getAllCommunities`,{
        headers: {
            "access_token":`Bearer: ${token}`
        }
    });
}