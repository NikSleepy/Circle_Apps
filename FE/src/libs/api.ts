import axios from "axios";
const token = sessionStorage.getItem('token')

export const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
})

export const Api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        Authorization:`Bearer `+ token
    }
})

export const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        Authorization:`Bearer `+ token, 'Content-Type': 'multipart/form-data'
    }
})
