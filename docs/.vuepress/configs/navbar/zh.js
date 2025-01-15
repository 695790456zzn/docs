/**
 * 导航路由
 */
export const navbar = [
  /**
   * HTMl
   */
  {
    text: "HTML",
    link: "/zh/html/html.md",
  },
  /**
   * CSS
   */
  {
    text: "CSS",
    link: "/zh/css/css.md",
  },
  /**
   * js
   */
  {
    text: "JS",
    prefix: "/zh/js",
    children: [
      {
        text: "JS基础",
        prefix: "base/",
        children: ["variable.md", "prototype.md", "scope.md", "async.md"],
      },
      {
        text: "JS-Web-API",
        prefix: "web/",
        children: [
          {
            text: "DOM",
            link: "dom.md",
          },
          {
            text: "BOM",
            link: "bom.md",
          },
          {
            text: "事件",
            link: "event.md",
          },
          {
            text: "Ajax",
            link: "ajax.md",
          },
          {
            text: "存储",
            link: "storage.md",
          },
        ],
      },
      {
        text: "数组",
        prefix: "array/",
        children: ["array.md"],
      },
    ],
  },
  /**
   * Vue
   */
  {
    text: "Vue",
    prefix: "/zh/vue",
    children: [
      {
        text: "Vue2.0",
        prefix: "vue2/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
          {
            text: "组件",
            link: "component.md",
          },
          {
            text: "高级使用",
            link: "senior.md",
          },
          {
            text: "原理",
            link: "principle.md",
          },
        ],
      },
      {
        text: "Vue3.0",
        prefix: "vue3/",
        children: [
          {
            text: "新功能",
            link: "new.md",
          },
          {
            text: "原理",
            link: "principle.md",
          },
          {
            text: "setup",
            link: "setup.md",
          },
        ],
      },
    ],
  },
  /**
   * React
   */
  {
    text: "React",
    prefix: "/zh/react",
    children: [
      {
        text: "class组件",
        prefix: "class/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
          {
            text: "高级特性",
            link: "senior.md",
          },
          {
            text: "原理",
            link: "principle.md",
          },
        ],
      },
      {
        text: "Hooks",
        prefix: "hooks/",
        children: [
          {
            text: "Hooks使用",
            link: "common.md",
          },
        ],
      },
      {
        text: "Redux",
        prefix: "redux/",
        children: [
          {
            text: "Redux基本使用",
            link: "base.md",
          },
          {
            text: "Toolkit",
            link: "toolkit.md",
          },
          {
            text: "zustand",
            link: "zustand.md",
          },
        ],
      },
      {
        text: "Next",
        prefix: "next/",
        children: [
          {
            text: "Next.js使用",
            link: "common.md",
          },
        ],
      },
    ],
  },
  /**
   * 网络
   */
  {
    text: "网络",
    prefix: "/zh/net",
    children: ["http.md", "websocket.md"],
  },
  /**
   * 工程化
   */
  {
    text: "工程化",
    prefix: "/zh/engineer",
    children: [
      {
        text: "Webpack",
        prefix: "webpack/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
          {
            text: "Loader",
            link: "loader.md",
          },
          {
            text: "Plugin",
            link: "plugin.md",
          },
          {
            text: "优化",
            link: "optimize.md",
          },
        ],
      },
      {
        text: "Vite",
        prefix: "vite/",
        children: [
          {
            text: "基本使用",
            link: "common.md",
          },
        ],
      },
    ],
  },
  /**
   * TS
   */
  {
    text: "TS",
    link: "/zh/ts/common.md",
  },
  /**
   * ES
   */
  {
    text: "ES",
    prefix: "/zh/es",
    children: [
      {
        text: "ES6",
        link: "es6.md",
      },
      {
        text: "ES7",
        link: "es7.md",
      },
      {
        text: "ES8",
        link: "es8.md",
      },
      {
        text: "ES9",
        link: "es9.md",
      },
      {
        text: "ES10",
        link: "es10.md",
      },
      {
        text: "ES11",
        link: "es11.md",
      },
    ],
  },
  /**
   * node
   */
  {
    text: "Node",
    prefix: "/zh/node",
    children: [
      {
        text: "Node",
        prefix: "node/",
        children: ["base.md", "boke.md"],
      },
      {
        text: "Mysql",
        link: "mysql/base.md",
      },
      {
        text: "Redis",
        link: "redis/base.md",
      },
      {
        text: "Nginx",
        link: "nginx/base.md",
      },
      {
        text: "Express",
        link: "express/base.md",
      },
      {
        text: "Koa2",
        link: "koa2/base.md",
      },
      {
        text: "sequelize",
        link: "sequelize/base.md",
      },
      {
        text: "mongodb",
        link: "mongodb/base.md",
      },
      {
        text: "pm2",
        link: "pm2/base.md",
      },
      {
        text: "nest",
        link: "nest/base.md",
      },
    ],
  },
  /**
   * 面试题
   */
  {
    text: "面试题",
    prefix: "/zh/interview",
    children: [
      {
        text: "JS",
        prefix: "js/",
        children: [
          {
            text: "JS基础面试题",
            link: "common.md",
          },
          {
            text: "JS手撕代码",
            link: "write.md",
          },
          {
            text: "算法",
            link: "algorithm.md",
          },
          {
            text: "LeetCode",
            link: "LeetCode.md",
          },
        ],
      },
      {
        text: "Vue",
        prefix: "vue/",
        children: [
          {
            text: "vue common",
            link: "common.md",
          },
        ],
      },
      {
        text: "React",
        prefix: "react/",
        children: [
          {
            text: "React common",
            link: "common.md",
          },
        ],
      },
      {
        text: "Node",
        prefix: "node/",
        children: [
          {
            text: "node common",
            link: "common.md",
          },
        ],
      },
      {
        text: "网络",
        prefix: "net/",
        children: [
          {
            text: "http",
            link: "net.md",
          },
        ],
      },
      {
        text: "常见面试题",
        link: "common.md",
      },
    ],
  },
  /**
   * 开发工具、框架的使用
   */
  {
    text: "工具",
    prefix: "/zh/tools",
    children: [
      {
        text: "Vuepress",
        link: "vuepress/usetips.md",
      },
      {
        text: "NPM",
        link: "npm/use.md",
      },
      {
        text: "Git",
        link: "git/git.md",
      },
      {
        text: "vscode",
        link: "vscode.md",
      },
      {
        text: "正则",
        link: "test.md",
      },
    ],
  },
  /**
   * web3
   */
  {
    text: "web3",
    prefix: "/zh/web3",
    children: ["block.md", "uniswap.md", "defi.md", "wallet.md"],
  },
];
