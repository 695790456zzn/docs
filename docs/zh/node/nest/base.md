# nest
[官网](https://nestjs.com/)
[中文网站](https://docs.nestjs.cn/)
[GitHub](https://github.com/nestjs/nest)
## 核心概念
- 模块：module
- 控制器：controller
- 服务： service

## 环境搭建
安装nest cli
> npm i -g @nest/cli

使用 Nest CLI 创建项目
> nest new nestdemo

## 基本使用
```js
// 创建模块
nest g module blog

// 创建 controller
nest g controller blog
// 创建不带测试文件的 controller
nest g controller --no-spec

// 创建拦截器（配置统一的正确的返回格式）{ errno, data, message }
nest g interceptor transform

// 创建拦截器（配置统一的错误的返回格式）
nest g filter http-exception
```

## 路由
Nestjs 中没有单独配置路由的地方。定义好控制器后 nestjs 会自动给我们配置对应的路由。
```js
import {Controller, Get} from '@nestjs/common'

@Controller('article') 
export class ArticleController {
    @Get()
    index(): string {
        return '这是 article 里面的 index'    
    }
    @Get()
    add(): string {
        return '这是 article 里面的 index'    
    }
}
```
关于 nest 的 return ：当请求处理程序返回对象或数组时，它将自动序列化为 JSON。但是，当它返回一个字符串时，Nest 将只发送一个字符串而不是序列化它。这使响应请求处理变得简单：只需要返回值，Nest 负责其余部分。

## 请求方法
### Get、Post请求
```js
import {Controller, Get, Post} from '@nestjs/common'

@Controller('cats')
export class CatsController {
    @Post()
    create(): string {
        return 'This action adds a new cat'    
    }
    @Get() 
    findAll(): string {
        return 'This action returns all cats'    
    }
}
```
nestjs 也提供了其他HTTP请求方法的装饰器 @Put()、@Delete()、@Patch()、@Options()、@Head() 和 @All()

### Nestjs 中获取请求参数
在 Nestjs 中获取 Get 传值或者 Post 提交的数据的话可以使用 Nestjs 中的装饰器来获取
```js
@Request()                req
@Response()               res
@Next()                   next
@Session()                req.session
@Param(key?: string)      req.params
@Body(key?: string)       req.body
@Query(key? string)       req.query
@Headers(name?: string)   req.headers

// 例
import {Controller, Get, Post} from '@nestjs/common'
@Controller('news')
export class NewsController {
    @Get()
    getAbout(@Query() query): string {
        console.log(query) // 这里获取的就是所有 Get 传值
        return '这是 about'    
    }
    @Get('list')
    getNews(@Query('id') query): string {
        console.log(query) // 这里获取的就是 Get传值里面的id的值
        return '这是新闻'    
    }
    @Post('doAdd')
    async addNews(@Body() newsDate) {
        console.log(newsData)
        return '增加新闻'    
    }
}
```

### 动态路由
```js
@Get(":id")
findOne(@Param() params): string {
    console.log(params.id)
    return `This action returns a #${params.id} cat`
}
```

## Nest.js连接 MySQL 数据库
使用 typeorm 并连接数据库

> npm install --save @nestjs/typeorm typeorm mysql2

创建 service

> nest g service blog --no-spec

#### vscode按nestjs规则格式化（保存自动格式化）
在Visual Studio Code中，要保存文件时自动格式化为满足NestJS规范，你需要安装一个插件，比如Prettier - Code formatter和ESLint。

步骤如下：

1.打开VS Code。
2.打开扩展视图（快捷键Ctrl + Shift + X）。
3.搜索并安装

Prettier - Code formatter和ESLint。

4.重新加载窗口（可选，可以让扩展生效）。
5.根据需要配置 .prettierrc 和 .eslintrc 文件。

这样，每次保存文件时，VS Code会自动使用Prettier进行格式化，并根据ESLint的配置检查代码符不符合NestJS的规范。
示例.prettierrc配置：
```js
{  
    "singleQuote": true, 
    "trailingComma": "es5",  
    "printWidth": 80,  
    "tabWidth": 2,  
    "semi": false,  
    "arrowParens": "avoid"
 }
```

示例.eslintrc配置（使用了NestJS的推荐配置）：
```js
{  
    "parser": "@typescript-eslint/parser",  
    "plugins": ["@nestjs"],  
    "extends": [    
        "plugin:@typescript-eslint/recommended",    
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier/@typescript-eslint",    
        "plugin:prettier/recommended",    
        "plugin:@nestjs/recommended"  
     ],  
     "rules": {
         // 自定义规则 
       }
 }
```

确保你的项目已经安装了所需的依赖，例如@nestjs/cli、typescript和@typescript-eslint/parser。
```js
npm install --save-dev @nestjs/cli
npm install --save-dev typescript
npm install --save-dev @typescript-eslint/parser
```
以上步骤和配置将确保你的代码在保存时自动格式化，并符合NestJS的规范。
