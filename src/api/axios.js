import axios from "axios"
const BASE_URL = 'http://localhost:8080/api/'
// const BASE_URL = 'http://192.168.0.134:8080/api/'


export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})