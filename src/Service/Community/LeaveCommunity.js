import axios from "axios"
import { BASE_URL } from "../settings"

export const leaveCommunityRequest = (token,communityId,username) => {
    return axios.post(`${BASE_URL}/community/leaveCommunity`,{
        communityId,
        username,
        
    },{
        headers:{
            "access_token":`Bearer: ${token}`
        }
    })
}