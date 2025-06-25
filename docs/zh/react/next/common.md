# Next.js
[Next.js官网](https://nextjs.org/docs/app/building-your-application/routing)
## 安装
> npx create-next-app@latest

## 配置启动端口
1.使用命令行修改
> npx next start -p 4000
> PORT=4000 npx start next

2.在package.json中配置
```json
{
	"scripts": {
    	"dev": "PORT=3001 next dev",   
    	"start": "next start -p 3002", 
    },
}
```

## 路由
## 文件路由系统
默认首页的文件路径
> / -> src/app/page.tsx

新建一个dashboard路由
> /dashboard -> src/app/dashboard/page.tsx

### Layout
1.根Layout 

app/layout.tsx
```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```
2.嵌套Layout

app/blog/layout.tsx
```tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

### template
用法类似于Layout，父级为Layout（包裹在Layout中）
```tsx
export default function Template({children} : {children: React.ReactNode}) {
  return <div className="template">
    <h2>我是 Template</h2>
    {children}
  </div>
}
```

### Layout 与 template 对比
区别：
- 路由跳转时，Layout不会重新渲染，template会重新渲染

### usePathname
获取路由地址
```ts
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const linkData = [
  { name: "About", path: "/dashboard/about" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [count, setCount] = useState(0)
  const pathname = usePathname()
  return (
    <div className="border-2 border-dashed border-white p-4 w-1/2 mx-auto mt-10">
      <div className="flex gap-4 font-bold text-lg mb-4">
        {
          linkData.map(link => (
            <Link key={link.path} className={pathname === link.path ? "text-purple-500" : ""} href={link.path}>{link.name}</Link>
          ))
        }
      </div>
      <h2>Dashboard Layout {count}</h2>
      <button
        className="bg-white text-black p-2 my-4 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      {children}
    </div>
  );
}
```

**注意**

如果打印路由地址，开发模式下会打印两次，因为开发模式下会开启严格模式，在严格模式下模拟了组件严格卸载和挂载的过程，可以通过配置修改为非严格模式
```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false
};

export default nextConfig;
```


## 问题记录
### Warning: Extra attributes from the server: class...
如果控制太出现警告：Warning: Extra attributes from the server: class... ，可能是安装的一些浏览器插件导致的，关闭插件或者在 src/app/layout.tsx 添加相关属性：
```html
<html lang="en" suppressHydrationWarning={true}>
  ...
</html>
```