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
    upload: {
        url: '/api/upload',
        method: 'post',
    },
    getArticleList: {
        url: '/api/article',
        method: 'get',
    },
    getCategoryList: {
        url: '/api/blog_type',
        method: 'get',
    },
    editCategory: {
        url: '/api/blog_type',
        method: 'put',
    },
    addCategory: {
        url: '/api/blog_type',
        method: 'post',
    },
    deleteCategory: {
        url: '/api/blog_type',
        method: 'delete',
    },
    addArticle: {
        url: '/api/article',
        method: 'post',
    },
    editArticle: {
        url: '/api/article',
        method: 'put',
    },
    getProject: {
        url: '/api/project',
        method: 'get',
    },
    addProject: {
        url: '/api/project',
        method: 'post',
    },
    editProject: {
        url: '/api/project',
        method: 'put',
    },
    deleteProject: {
        url: '/api/project',
        method: 'delete',
    },
    getcommentList: {
        url: '/api/comment',
        method: 'get',
    },
};
