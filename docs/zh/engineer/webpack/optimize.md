# Webpack优化
## 提升开发体验
### SourceMap
- SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案
1.开发模式：cheap-module-source-map

    优点：打包编译速度快，只包含行映射

    缺点：没有列映射
```js
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map'
}
```

2.生产模式：source-map

优点：包含行/列映射

缺点：打包编译速度更慢
```js
module.exports = {
    mode: 'production',
    devtool: 'source-map'
}
```

## 提升打包构建速度
### HMR
HotModuleReplacement(HMR/热模块替换)： 在程序运行中，替换、添加或删除模块，而无需重新加载整个页面
```js
module.exports = {
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
        hot: true, // 开启HMR功能（只能用于开发环境）    
    }
}
```

### oneOf
```js
module: {
  rules: [
    // loader 的配置
    {
      // 每个文件只能被其中一个loader配置处理
      oneOf: [
        {
          test: /\.css$/, // 只检测 .css 文件
          use: getStyleLoader(), 
        },
        {
          test: /\.less$/,
          // loader: 'xxx', // 只能使用一个loader
          use: getStyleLoader('less-loader'),
        },
        {
          test: /\.s[ac]ss$/,
          use: getStyleLoader('sass-loader'),
        },
        {
          test: /\.styl$/,
          use: getStyleLoader('stylus-loader'),
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              // 小于10kb的图片转为base64
              // 优点： 减少请求数量  缺点：体积会更大
              maxSize: 10 * 1024
            }
          },
          generator: {
            // 输出图片名称
            // [hash:10] hash值取前10位
            filename: 'static/images/[hash:10][ext][query]'
          }
        },
        {
          test: /\.(ttf|woff2?)$/,
          type: "asset/resource",
          generator: {
            // 输出名称
            filename: 'static/images/[hash:10][ext][query]'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ]
    }
  ]
},
```

### include、exclude
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
},

new ESLintPlugin({
  // 检测哪些文件
  context: path.resolve(__dirname, "../src"),
  exclude: "node_modules", // 默认值
}),
```

### Cache缓存
每次打包时js文件都要经过Eslint检查和Babel编译，速度比较慢。可以缓存之前的Eslint检查和Babel编译结果，这样第二次打包时速度就会更快了。
```js
// babel
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true, // 开启babel缓存
    cacheCompression: false, // 关闭缓存文件压缩
  }
},

// eslint
new ESLintPlugin({
  // 检测哪些文件
  context: path.resolve(__dirname, "../src"),
  exclude: "node_modules", // 默认值
  cache: true, // 开启缓存
  cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')
}),
```

### Thead
多进程打包：开启电脑的多个进程同时干一件事，速度更快。

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。**
```js
// 获取 CPU 核数
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;

// 下载包
npm i thread-loader -D

// webpack.prod.js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          works: threads, // 进程数量
        }
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启babel缓存
          cacheCompression: false, // 关闭缓存文件压缩
        }
      }
    ]
  },
  
 new ESLintPlugin({
  // 检测哪些文件
  context: path.resolve(__dirname, "../src"),
  exclude: "node_modules", // 默认值
  cache: true, // 开启缓存
  cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
  threads, // 开启多进程和设置进程数量
}),

optimization: {
  // 压缩的操作
  minimizer: [
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin({
      parallel: threads, // 开启多进程和设置进程数量
    })
  ]
},
```

## 减少代码体积
### Tree Shaking
开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。
如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。
这样将整个库都打包进来，体积就太大了。
Webpack 已经默认开启了这个功能，无需其他配置。

### Babel压缩
```js
{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true, // 开启babel缓存
    cacheCompression: false, // 关闭缓存文件压缩
    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
  }
}
```

### 图片压缩
- 开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。
- 我们可以对图片进行压缩，减少图片体积。
- **注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。**
```js
// 下载包
npm i image-minimizer-webpack-plugin imagemin -D
// 还有剩下包需要下载，有两种模式：
// 无损压缩
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
// 有损压缩
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D

optimization: {
  minimizer: [
    // css压缩也可以写到optimization.minimizer里面，效果一样的
    new CssMinimizerPlugin(),
    // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
    new TerserPlugin({
      parallel: threads, // 开启多进程
    }),
    // 压缩图片
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  "preset-default",
                  "prefixIds",
                  {
                    name: "sortAttrs",
                    params: {
                      xmlnsOrder: "alphabetical",
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
  ],
},
```

## 优化代码运行性能
### Code Split
单页面应用动态引入模块
```js
optimization: {
  // ...
  // 代码分割配置
  splitChunks: {
    chunks: 'all'
    // 其他都用默认值
  }
},
```

### preload/prefetch
- prelaod：告诉浏览器立即加载资源。
- prefetch：告诉浏览器在空闲时才开始加载资源。

共同点：

- 都只会加载资源，并不执行
- 都有缓存

区别：

- prelaod加载优先级高，prefetch加载优先级低
- preload只能加载当前页面需要使用的资源，prefetch可以加载当前页面资源，也可以加载下一个页面需要使用的资源。
```js
npm i @vue/preload-webpack-plugin -D

new PreloadWebpackPlugin({
  rel: "preload", // preload兼容性更好
  as: "script",
  // rel: 'prefetch' // prefetch兼容性更差
}),
```

### Network Cache
```js
 new MiniCssExtractPlugin({
  // 定义输出文件名和目录
  filename: "static/css/[name].[contenthash:8].css",
  chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
}),
```

### core-js
babel使用智能预设能解决一些ES6语法向ES5转换，但是像 Promise，include等语法Babel是无法解决的，一旦遇到低版本浏览器，可能会报错，core-js是专门用来解决ES6及以上的API的polyfill
```js
// 引入 core-js
npm i core-js

// babel.config.js
module.exports = {
  // 智能预设，能够编译ES6语法
  presets: [
    ["@babel/preset-env",
    {
      useBuiltIns: "usage", // 按需加载自动引入
      corejs: 3,
    }]
  ]
}
```

### PWA
渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。
```js
// 安装包
npm i workbox-webpack-plugin -D

// webpack.prod.js
const WorkboxPlugin = require("workbox-webpack-plugin");

plugins: [
     new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
]

// main.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```
