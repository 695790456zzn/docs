/**
 * 导航路由
 */
export const navbar = [
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
    ],
  },
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
            text: "优化",
            link: "optimize.md",
          },
          {
            text: "Loader",
            link: "loader.md",
          },
          {
            text: "Plugin",
            link: "plugin.md",
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
  {
    text: "TS",
    link: "/zh/ts/common.md",
  },
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
  {
    text: "Node",
    prefix: "/zh/node",
    children: [
      {
        text: "Node基础",
        prefix: "node/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
        ],
      },
      {
        text: "Express",
        prefix: "express/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
        ],
      },
      {
        text: "Koa2",
        prefix: "koa2/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
        ],
      },
      {
        text: "nest",
        prefix: "nest/",
        children: [
          {
            text: "基本使用",
            link: "base.md",
          },
        ],
      },
    ],
  },
  {
    text: "面试题",
    prefix: "/zh/interview",
    children: [
      {
        text: "JS相关面试题",
        prefix: "js/",
        children: [
          {
            text: "js common",
            link: "common.md",
          },
        ],
      },
      {
        text: "Vue相关面试题",
        prefix: "vue/",
        children: [
          {
            text: "vue common",
            link: "common.md",
          },
        ],
      },
      {
        text: "React相关面试题",
        prefix: "react/",
        children: [
          {
            text: "React common",
            link: "common.md",
          },
        ],
      },
      {
        text: "Node相关面试题",
        prefix: "node/",
        children: [
          {
            text: "node common",
            link: "common.md",
          },
        ],
      },
    ],
  },
];
