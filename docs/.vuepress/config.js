module.exports = {
    title: '西毒', // 页签标题 : A001_VuePress博客搭建的简单教程&问题分析 # | Wiki 1001
    description: 'vuepress vue blog', // meta 中的描述文字，意义不大，SEO用
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        // 增加一个自定义的 favicon(网页标签的图标)
        // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
        // 即 docs/.vuepress/public/img/geass-bg.ico
        ['link', { rel: 'icon', href: '/img/head.jpg' }], 
    ],
    base: '/dj-blog/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        logo: '/img/head.jpg',
        sidebarDepth: 4, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: '最近更新于' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
             // 单项 text：显示文字，link：指向链接
             // 这里的'/' 指的是 docs文件夹路径
             // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: 'Home', link: '/'},
            { 
                text: 'Blog', 
                items:[
                   { text: 'HTML/CSS', link: '/blog/htmlcssMD/' },
                   { text: 'JS', link: '/blog/jsMD/' },
                   { text: '计算机网络', link: '/blog/networkMD/' },    
                   { text: '浏览器', link: '/blog/browsersMD/' },
                ] 
            },  // http://localhost:8080/Wiki1001Pro/FAQ/
            { text: 'Talks', link: '/talk/' },
            { text: 'About', link: '/about/' },
            // 多项，下拉形式
            { 
                text: 'Link', 
                items: [
                    { text: 'CSDN', link: 'https://blog.csdn.net/qq_41554071' },
                    { text: 'GitHub', link: 'https://github.com/dj12160114' }
                ]
            },
           
        ],
         // 侧边栏菜单( 一个模块对应一个菜单形式 )
        sidebar:{
        // 打开FAQ主页链接时生成下面这个菜单
        '/blog/htmlcssMD/':[
                ['',' '],
            //多级菜单形式
            {
                // 菜单名
                title: 'HTML/CSS',
                // 子菜单
                children: [
                    // ['','']=>[路径,标题]
                    // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
                    // 不以 '/' 结尾的就是指向.md文件             
                    ['/blog/htmlcssMD/htmlMD/JavaScript', 'JavaScript'],
                    ['/blog/htmlcssMD/cssMD/分析比较 opacity 0、visibility hidden、display none 优劣和适用场景','分析比较 opacity 0、visibility hidden、display none 优劣和适用场景'],
                    ['/blog/htmlcssMD/cssMD/前端面试准备之CSS篇','前端面试准备之CSS篇'],
                ]
            }
        ],  
        '/blog/networkMD/': [
            {
                title: '计算机网络',
                children: [
                    // 
                    ['/blog/networkMD/HTTP','HTTP'],
                ]
            }         
        ],
        '/blog/jsMD/': [
            {
                title: 'JS',
                children: [
                    ['/blog/jsMD/AJAX','AJAX'],
                    ['/blog/jsMD/JavaScript函数','JavaScript函数'],
                    ['/blog/jsMD/JavaScript基础知识','JavaScript基础知识'],
                    ['/blog/jsMD/动态加载 js','动态加载 js'],
                ]
            }
        ],
        '/blog/browsersMD/': [
                
            {
                title: 'Browsers',
                children: [
                    ['/blog/browsersMD/重排与重绘','重排与重绘'],

                
                ]
            },
        ]
        }
    }
} 


 