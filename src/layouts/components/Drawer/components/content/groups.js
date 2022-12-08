export default [
    {
        title: '导航区域',
        type: 'content',
        items: [
            {
                label: '固定 Header',
                key: 'fixedHeader',
            },
            {
                label: '固定侧边菜单',
                key: 'fixedSideBar'
            }
        ],
    },
    {
        type: 'divider',
    },
    {
        title: '内容区域',
        type: 'content',
        items: [
            {
                label: '顶栏',
                key: 'showHeader',
            },
            {
                label: '页脚',
                key: 'showFooter',
            },
            {
                label: '菜单',
                key: 'showSideBar',
            },
            {
                label: '菜单头',
                key: 'showLogo'
            }
        ],
    }
];