import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { navbar } from './configs/navbar';
import { sidebar } from './configs/sidebar';

export default defineUserConfig({
  base: "/study-docs.github.io/",
  lang: "en-US",
  head: [["link", { rel: "icon", href: "/images/logo.png" }]],

  title: "学习文档",
  description: "Madison's study document",

  theme: defaultTheme({
    logo: "/images/wendang_1.png",
    docsDir: "docs",

    navbar,
    sidebarDepth: 2,
    sidebar,
  }),

  bundler: viteBundler(),
});
