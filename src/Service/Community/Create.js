import axios from "axios"
import { BASE_URL } from "../settings"



let token = localStorage.getItem("access_token")
export let createCommunityRequest = (communityData) => {
        return axios.post(`${BASE_URL}/community/create`,communityData,{
            headers:{
                "access_token": `Bearer: ${token}`
            }
        });
}