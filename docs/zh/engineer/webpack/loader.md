# loader
## 样式文件处理
CSS、style、Sass、less、stylus
例：less-loader 配置
```js
// 加载器
module: {
  rules: [
    // loader 的配置
    {
      test: /\.less$/,
      // loader: 'xxx', // 只能使用一个loader
      use: [
        'style-loader',
        'css-loader',
        'less-loader', // 将less编译成css文件
      ],
    },
  ]
},
```

## 图片资源处理
在Webpack4中，处理图片资源通过 file-loader 和 url-loader 进行处理

在Webpack5中已经将两个loader功能内置到Webpack里了，只需要简单配置即可处理图片资源
```js
module: {
  rules: [
    // loader 的配置
    {
      test: /\.(png|jpe?g|gif|webp|svg)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          // 小于10kb的图片转为base64
          // 优点： 减少请求数量  缺点：体积会更大
          maxSize: 10 * 1024
        }
      }
    }
  ]
},
```

## 输入文件处理
```js
// 输出
output: {
  // 文件输出路径
  // __dirname node.js 的变量，代表当前文件的文件夹目录
  path: path.resolve(__dirname, "dist"), // 绝对路径
  // 文件名
  filename: "static/js/main.js",
},

// 加载器
module: {
  rules: [
    // loader 的配置
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
        // 输出图片名称，图片输出文件
        // [hash:10] hash值取前10位
        filename: 'static/images/[hash:10][ext][query]'
      }
    }
  ]
},
```

## 清空上次打包
```js
// 输出
output: {
  // 自动清空上次打包的内容
  // 原理：在打包前，将path的整个目录内容清空，再进行打包
  clean: true
},
```

## 字体图标处理
```js
// 加载器
module: {
  rules: [
    // loader 的配置
    {
      test: /\.(ttf|woff2?)$/,
      type: "asset/resource",
      generator: {
        // 输出名称
        filename: 'static/images/[hash:10][ext][query]'
      }
    }
  ]
},
```

## JS处理
### 处理代码格式： eslint
```js
// 安装
npm install eslint-webpack-plugin --save-dev
// 安装 eslint -- 先引入8版本，最新版 9.x.x 会报 extends 弃用错误
npm install eslint@8 --save-dev

// 引入
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};

// 根目录下添加 .eslintrc.js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {// 解析选项
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```

### 处理兼容性：Babel
```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ];
}
```