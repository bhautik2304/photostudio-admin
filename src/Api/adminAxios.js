import axios from "axios"

const token = localStorage.getItem('accessToken') || null

const adminAxios = axios.create({
    headers:{
        Accesstoken: token,
    }
});

export default adminAxios