import axios from "axios";
import { getLocalToken } from "../utils/utils";

export const API_URL = process.env.REACT_APP_API_URL

// const API_URL = process.env.REACT_APP_NOT_SECRET_CODE

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${getLocalToken()}`
    return config;
})

export default $api;