import axios from "axios"
import { BASE_URL } from "../settings"


export const deleteCommunityRequest = (id,token) => {
    return axios.post(`${BASE_URL}/community/delete/${id}`,{},{
        headers:{
            "access_token":`Bearer: ${token}`
        }
    })
}