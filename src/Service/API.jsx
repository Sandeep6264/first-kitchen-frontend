import axios from 'axios';
import baseURL from '../Utils/Utils';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
});

const API = {
    SignUp: async (userData) => {
        return axiosInstance.post('/auth/register', userData);
    },

    Login: async (credentials) => {
        return axiosInstance.post('/auth/login', credentials);
    },
    getAllItems: async () => {
        return axiosInstance.get('/api/item/getAllItem', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    getItemById: async (id) => {
        return axiosInstance.get(`/api/item/getItem/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    createItem: async (itemData) => {
        return axiosInstance.post('/api/item/addItem', itemData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    updateItem: async (id, itemData) => {
        return axiosInstance.put(`/api/item/updateItem/${id}`, itemData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    deleteItem: async (id) => {
        return axiosInstance.delete(`/api/item/deleteItem/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    placeOrder: async (orderData) => {
        return axiosInstance.post('/api/order/placeOrder', orderData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default API;
