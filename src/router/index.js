import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const originalPush = createRouter.prototype.push;
const originalReplace = createRouter.prototype.replace;
createRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch((err) => err);
};
createRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this, location, onResolve, onReject);
    }
    return originalReplace.call(this, location).catch((err) => err);
};

const modules = import.meta.glob('../views/**/*.vue');

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: modules[`../views/404/404.vue`] },
    {
        path: '/login',
        name: 'login',
        component: modules['../views/login/Login.vue'],
    },
    {
        path: '/',
        component: modules[`../views/layout/Layout.vue`],
        name: 'layout',
        redirect: '/home',
        children: [
            //首页管理
            {
                path: '/home',
                name: 'home',
                component: modules[`../views/home/Home.vue`],
                meta: {
                    title: '首页管理',
                    Webtitle: '首页管理',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //文章列表
            {
                path: '/article_list',
                name: 'article_list',
                component: modules[`../views/article/ArticleList.vue`],
                meta: {
                    title: '文章列表',
                    Webtitle: '文章列表',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //文章分类
            {
                path: '/article_category',
                name: 'article_category',
                component: modules[`../views/article/ArticleCategory.vue`],
                meta: {
                    title: '文章分类',
                    Webtitle: '文章分类',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //添加文章
            {
                path: '/article_compile/:id?',
                name: 'article_compile',
                component: modules[`../views/article/ArticleCompile.vue`],
                meta: {
                    title: '文章编辑',
                    Webtitle: '文章编辑',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //项目列表
            {
                path: '/project_list',
                name: 'group',
                component: modules[`../views/project/ProjectList.vue`],
                meta: {
                    title: '项目列表',
                    Webtitle: '项目列表',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //添加项目
            {
                path: '/project_add',
                name: 'project_add',
                component: modules[`../views/project/ProjectAdd.vue`],
                meta: {
                    title: '添加项目',
                    Webtitle: '添加项目',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //评论管理
            {
                path: '/comment',
                name: 'comment',
                component: modules[`../views/comment/Comment.vue`],
                meta: {
                    title: '评论管理',
                    Webtitle: '评论管理',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //留言管理
            {
                path: '/message',
                name: 'message',
                component: modules[`../views/message/Message.vue`],
                meta: {
                    title: '留言管理',
                    Webtitle: '留言管理',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //关于我
            {
                path: '/about',
                name: 'about',
                component: modules[`../views/about/About.vue`],
                meta: {
                    title: '关于我',
                    Webtitle: '关于我',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
            //设置
            {
                path: '/config',
                name: 'config',
                component: modules[`../views/config/Config.vue`],
                meta: {
                    title: '设置',
                    Webtitle: '设置',
                    active: false,
                    keepAlive: false, //需要被缓存的组件
                },
            },
        ],
    },
];

const router = new createRouter({
    routes,
    history: createWebHistory(), //history模式
});

router.beforeEach((to, from, next) => {
    NProgress.start();

    next();
});

router.afterEach((to, from) => {
    NProgress.done();
    window.document.title = to.meta.Webtitle || '任务网管理后台';
    // firefox
    document.documentElement.scrollTop = 0;
});

export default router;
