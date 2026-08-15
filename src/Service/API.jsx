import axios from 'axios';
import baseURL from '../Utils/Utils';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
});
let authToken = null;
export const setAuthToken = (token) => {
    authToken = token;
}
axiosInstance.interceptors.request.use(
    (config) => {
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
            console.log("Added Authorization header to request:", config.headers['Authorization']);
        }
        return config;
    },
    (error) => {
        console.log("Request error:", error);
        return Promise.reject(error);
    }
);




const API = {
    SignUp: async (userData) => {
        return axiosInstance.post('/auth/register', userData);
    },

    Login: async (credentials) => {
        return axiosInstance.post('/auth/login', credentials);
    },
    getAllItems: async () => {
        return axiosInstance.get('/api/item/getAllItem');
    },

    getItemById: async (id) => {
        return axiosInstance.get(`/api/item/getItem/${id}`);
    },
    createItem: async (itemData) => {
        return axiosInstance.post('/api/item/addItem', itemData);
    },

    updateItem: async (id, itemData) => {
        return axiosInstance.put(`/api/item/updateItem/${id}`, itemData);
    },
    deleteItem: async (id) => {
        return axiosInstance.delete(`/api/item/deleteItem/${id}`);
    },
    placeOrder: async (orderData) => {
        return axiosInstance.post('/api/order/placeOrder', orderData);
    }
}

export default API;
