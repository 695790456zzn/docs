# Plugin

## 处理html资源
```js
plugins: [
  new HtmlWebpackPlugin({
    // 模版：以public/index.html文件创建的html文件
    // 新的html文件特点：1.结构和原来的一致 2.自动引入打包输出的资源
    template: path.resolve(__dirname, "public/index.html")
  })
],
```

## 提取CSS成单独文件
CSS文件目前被打包到js文件中，当js文件加载时，会创建一个style标签来生成样式，这样对网站来说，会出现闪屏现象，用户体验不好，应该提取出单独的css文件，通过link标签加载性能才会更好
```js
// 安装
npm install --save-dev mini-css-extract-plugin

// webpack.prod.js中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 修改loader -- 将 style-loader 都替换成 MiniCssExtractPlugin.loader
{
  test: /\.css$/, // 只检测 .css 文件
  use: [
    // 执行顺序，从右到左（从下到上）
    MiniCssExtractPlugin.loader, // 提取css成单独的文件
    'css-loader' // 将css资源编译成commonjs的模块到js中
  ], 
},

// plugins
new MiniCssExtractPlugin({
    filename: 'static/css/main.css' // css文件输出目录
  })
```

## CSS压缩
```js
// 安装
npm install css-minimizer-webpack-plugin --save-dev

plugins: [new MiniCssExtractPlugin()],
```

