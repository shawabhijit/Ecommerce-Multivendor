import axios from "axios";
import store from "../app/Store";
import { logout } from "../app/authSlice/CustomerAuthSlice";

export const API_URL = import.meta.env.VITE_API_URL;


export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/json",
    },
    withCredentials:true, // Include cookies in request
})

// detect expired token and logout user
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);
