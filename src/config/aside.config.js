//用于配制侧边栏

export default [
    {
        label: '首页管理',
        route: '/home',
        icon: 'House',
        index: '1',

        children: null,
    },
    {
        label: '文章管理',
        route: '',
        icon: 'Tickets',
        index: '2',
        children: [
            {
                label: '文章列表',
                route: '/article_list',
                icon: 'Operation',
                index: '2-1',

                children: null,
            },
            {
                label: '文章分类',
                route: '/article_category',
                icon: 'SetUp',
                index: '2-2',

                children: null,
            },
            {
                label: '添加文章',
                route: '/add_article',
                icon: 'FolderOpened',
                index: '2-3',

                children: null,
            },
        ],
    },
    {
        label: '项目管理',
        route: '',
        icon: 'Monitor',
        index: '3',

        children: [
            {
                label: '项目列表',
                route: '/project_list',
                icon: 'Operation',
                index: '3-1',

                children: null,
            },
            {
                label: '添加项目',
                route: '/project_add',
                icon: 'FolderOpened',
                index: '3-2',

                children: null,
            },
        ],
    },
    {
        label: '评论管理',
        route: '/comment',
        icon: 'ChatSquare',
        index: '4',

        children: null,
    },
    {
        label: '留言管理',
        route: '/message',
        icon: 'ChatSquare',
        index: '5',

        children: null,
    },
    {
        label: '关于我',
        route: '/about',
        icon: 'User',
        index: '6',

        children: null,
    },
    {
        label: '设置',
        route: '/config',
        icon: 'Setting',
        index: '7',

        children: null,
    },
];
