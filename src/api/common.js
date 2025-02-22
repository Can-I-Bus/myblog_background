import axios from 'axios';
import base from '@/config/base.config';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/index';
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
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            // 未授权
            // localStorage.removeItem('token');
            ElMessage.error('登录已过期，请重新登录');
            const userStore = useUserStore();
            userStore.logout();
        }
        return response?.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
