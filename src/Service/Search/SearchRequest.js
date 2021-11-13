import axios from "axios"
import { BASE_URL } from "../settings"


export const searchRequest = (token,word) => {
    return axios.get(`${BASE_URL}/community/searchCommunity`,{
        headers:{
            "access_token":`Bearer: ${token}`,
            "word":word
        }
    })
}

