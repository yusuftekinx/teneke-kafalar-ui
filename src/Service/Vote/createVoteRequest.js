import axios from "axios"
import { BASE_URL } from "../settings"



export let createVoteRequest = (formData,token) => {
    return axios.post(`${BASE_URL}/socket/createNewVote`,formData,{
        headers:{
            "access_token":`Bearer: ${token}`
        }
    })
}