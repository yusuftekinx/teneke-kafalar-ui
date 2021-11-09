
import axios from 'axios'
import { BASE_URL } from '../settings'

export const uploadProfileImageRequest = (formData,token,id) => {
    return axios.put(`${BASE_URL}/community/uploadProfileImage/${id}`,formData,{
        headers:{
            "access_token":`Bearer: ${token}`
        }
    });
}
