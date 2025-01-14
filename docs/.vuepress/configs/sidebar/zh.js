
export const sidebar = {
  "/zh/html": ["/zh/html/html.md"],
  "/zh/css": ["/zh/css/css.md"],
  "/zh/js/": [
    {
      text: "JS基础",
      collapsible: true,
      children: [
        {
          text: "变量类型和计算",
          link: "/zh/js/base/variable.md",
          collapsible: true,
        },
        {
          text: "原型和原型链",
          link: "/zh/js/base/prototype.md",
          collapsible: true,
        },
        {
          text: "作用域和闭包",
          link: "/zh/js/base/scope.md",
          collapsible: false,
        },
        {
          text: "异步和单线程",
          link: "/zh/js/base/async.md",
          collapsible: true,
        },
      ],
    },
    {
      text: "JS-Web-API",
      collapsible: true,
      children: [
        "/zh/js/web/dom.md",
        "/zh/js/web/bom.md",
        "/zh/js/web/event.md",
        "/zh/js/web/ajax.md",
        "/zh/js/web/storage.md",
      ],
    },
  ],
  "/zh/vue/": [
    {
      text: "Vue2.0",
      collapsible: true,
      children: [
        "/zh/vue/vue2/base.md",
        "/zh/vue/vue2/senior.md",
        "/zh/vue/vue2/senior.md",
        "/zh/vue/vue2/principle.md",
      ],
    },
    {
      text: "Vue3.0",
      collapsible: true,
      children: [
        "/zh/vue/vue3/new.md",
        "/zh/vue/vue3/principle.md",
        "/zh/vue/vue3/setup.md",
      ],
    },
  ],
  "/zh/react/": [
    {
      text: "class组件",
      collapsible: true,
      children: [
        "/zh/react/class/base.md",
        "/zh/react/class/senior.md",
        "/zh/react/class/principle.md",
      ],
    },
    {
      text: "Hooks组件",
      collapsible: true,
      children: ["/zh/react/hooks/common.md"],
    },
    {
      text: "Redux",
      collapsible: true,
      children: [
        "/zh/react/redux/base.md",
        "/zh/react/redux/toolkit.md",
        "/zh/react/redux/zustand.md",
      ],
    },
    {
      text: "Next",
      collapsible: true,
      children: ["/zh/react/next/common.md"],
    },
  ],
  "/zh/engineer/": [
    {
      text: "Webpack",
      collapsible: true,
      children: [
        "/zh/engineer/webpack/base.md",
        "/zh/engineer/webpack/loader.md",
        "/zh/engineer/webpack/plugin.md",
        "/zh/engineer/webpack/optimize.md",
      ],
    },
    {
      text: "Vite",
      collapsible: true,
      children: ["/zh/engineer/vite/common.md"],
    },
  ],
  "/zh/ts": [
    {
      text: "TS",
      collapsible: true,
      children: ["/zh/ts/common.md"],
    },
  ],
  "/zh/es/": [
    {
      text: "ES",
      collapsible: true,
      children: [
        "/zh/es/es6.md",
        "/zh/es/es7.md",
        "/zh/es/es8.md",
        "/zh/es/es9.md",
        "/zh/es/es10.md",
        "/zh/es/es11.md",
      ],
    },
  ],
  "/zh/node/": [
    {
      text: "Node",
      children: ["/zh/node/node/base.md", "/zh/node/node/boke.md"],
    },
    "/zh/node/mysql/base.md",
    "/zh/node/redis/base.md",
    "/zh/node/nginx/base.md",
    "/zh/node/express/base.md",
    "/zh/node/koa2/base.md",
    "/zh/node/sequelize/base.md",
    "/zh/node/mongodb/base.md",
    "/zh/node/pm2/base.md",
    "/zh/node/nest/base.md",
  ],
  "/zh/interview/": [
    {
      text: "JS",
      collapsible: true,
      children: ["/zh/interview/js/common.md"],
    },
    {
      text: "Vue",
      collapsible: true,
      children: ["/zh/interview/vue/common.md"],
    },
    {
      text: "React",
      collapsible: true,
      children: ["/zh/interview/react/common.md"],
    },
    {
      text: "Node",
      collapsible: true,
      children: ["/zh/interview/node/common.md"],
    },
  ],
  "/zh/tools/": [
    "/zh/tools/vuepress/usetips.md",
    "/zh/tools/npm/use.md",
    "/zh/tools/git/git.md",
    "/zh/tools/vscode.md",
  ],
  "/zh/web3/": [
    "/zh/web3/block.md",
    "/zh/web3/uniswap.md",
    "/zh/web3/defi.md",
    "/zh/web3/wallet.md",
  ],
  "/zh/net/": ["/zh/net/http.md", "/zh/net/websocket.md"],
};