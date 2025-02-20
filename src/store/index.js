import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useTabStore } from './nav';
import router from '../router';
import asideConfig from '../config/aside.config';

export const useUserStore = defineStore('user', () => {
    const tabStore = useTabStore();
    const userInfo = ref({});
    const token = ref('');
    const api = ref(null);

    const setApi = (apiFn) => {
        api.value = apiFn;
    };

    const setUserInfo = (item) => {
        userInfo.value = item;
        localStorage.setItem('user_info', JSON.stringify(item));
    };

    const setToken = (tk) => {
        token.value = tk;
        localStorage.setItem('token', tk);
    };

    const logout = () => {
        userInfo.value = {};
        token.value = '';
        localStorage.removeItem('user_info');
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handleLogin = async (data, type = 'login') => {
        const res = await api.value({ type, data });
        if (res.code === 0) {
            setToken(res.data.token);
            localStorage.setItem('user_info', JSON.stringify(res.data.user));
            tabStore.addTab(asideConfig[0]);
            router.push(asideConfig[0].route);
            ElMessage.success({ message: '登录成功' });
        } else {
            ElMessage.error(res.msg);
        }
    };

    const editUserInfo = ({ key, value }) => {
        userInfo.value[key] = value;
        localStorage.setItem('user_info', JSON.stringify(userInfo.value));
    };

    const initStore = () => {
        let user_info = localStorage.getItem('user_info');
        let token = localStorage.getItem('token');
        if (user_info) {
            setUserInfo(JSON.parse(user_info));
        }
        if (token) {
            setToken(token);
        }
    };

    return {
        userInfo,
        token,
        setApi,
        setUserInfo,
        setToken,
        logout,
        initStore,
        // getUserInfo,
        handleLogin,
        editUserInfo,
    };
});
