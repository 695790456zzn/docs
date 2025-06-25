# 基本使用
## 基本使用
webpack.config.js中
```js
const path = require("path") // node.js 核心模块，专门用来处理路径问题

module.exports = {
  // 1.入口
  entry: "./src/main.js",
  //2. 输出
  output: {
    // 文件输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"), // 绝对路径
    // 文件名
    filename: "main.js",
  },
  // 3.加载器
  module: {
    rules: [
      // loader 的配置
    ]
  },
  // 4.插件
  plugins: [
    // plugin的配置
  ],
  // 5.模式
  mode: "development"
}
```

## devServer配置
```js
devServer: {
  static: {
    directory: path.join(__dirname, 'public'),
  },
  compress: true,
  port: 9000,
},
```

## 配置浏览器兼容性
```js
"browserslist": [
  "last 2 version", // 只兼容各个浏览器最新的两个版本
  "> 1%", // 兼容市面上 99% 的浏览器
  "not dead" // 已经死了的浏览器不去做兼容处理
]
```

