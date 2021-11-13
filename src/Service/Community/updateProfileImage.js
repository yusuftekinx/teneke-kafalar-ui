
import axios from 'axios'
import { BASE_URL } from '../settings'

export const uploadProfileImageRequest = (formData,token,id) => {
    return axios.post(`${BASE_URL}/community/uploadProfileImage`,formData,{
        headers:{
            "access_token":`Bearer: ${token}`,
            "id":id
        }
    });
}
