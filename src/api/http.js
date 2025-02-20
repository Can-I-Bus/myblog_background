import service from './common';
import API_LIST from '@/config/api.config';

import { ElLoading, ElMessage } from 'element-plus';

export default async function Http({ type, data }) {
    if (!(type in API_LIST)) {
        throw new Error('API ERROR');
    }
    let { url, method, isLoading = true } = API_LIST[type];
    let loading;

    try {
        if (isLoading) {
            loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
        }
        method = method.toLowerCase();
        data = method === 'get' || method === 'delete' ? { params: data } : data;
        let result = await service[method](url, data);

        return result;
    } catch (error) {
        ElMessage.error('网络错误');
        console.error(error);
        return Promise.reject(error);
    } finally {
        if (loading) {
            loading.close();
        }
    }
}
