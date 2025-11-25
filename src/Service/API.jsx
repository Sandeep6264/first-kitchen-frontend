import axios from 'axios';
import baseURL from '../Utils/Utils';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
});

const API = {
    getAllItems: async () => {
        return axiosInstance.get('/item/getAllItem');
    },

    getItemById: async (id) => {
        return axiosInstance.get(`/item/getItem/${id}`);
    },
    createItem: async (itemData) => {
        return axiosInstance.post('/item/addItem', itemData);
    },

    updateItem: async (id, itemData) => {
        return axiosInstance.put(`/item/updateItem/${id}`, itemData);
    },
    deleteItem: async (id) => {
        return axiosInstance.delete(`/item/deleteItem`);
    },
    placeOrder: async (orderData) => {
        return axiosInstance.post('/order/placeOrder', orderData);
    }
}

export default API;
