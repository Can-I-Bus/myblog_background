import axios from 'axios';
import base from '@/config/base.config';
const { BASE_URL, TIMEOUT } = base;

const service = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
});

service.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorized-Key'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        console.log(response);
        return response?.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
