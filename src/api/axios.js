import axios from "axios"
// const BASE_URL = 'http://localhost:8080/api/'
const BASE_URL = 'https://e-commerce-spring.onrender.com/api'


export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})