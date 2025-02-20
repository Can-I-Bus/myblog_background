export default {
    getCaptcha: {
        url: '/res/captcha',
        method: 'get',
    },
    login: {
        url: '/api/admin/login',
        method: 'post',
    },
    getBannerList: {
        url: '/api/banner',
        method: 'get',
    },
    addBanner: {
        url: '/api/banner',
        method: 'post',
    },
    delBanner: {
        url: '/api/banner',
        method: 'delete',
    },
    editBanner: {
        url: '/api/banner',
        method: 'put',
    },
};
