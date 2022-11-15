---
layout: "post"
title: "「前端开发」- Vue-Cli"
subtitle: "Vue —— 脚手架"
author: "eliochiu"
date: 2022-11-14

tags: ["前端开发@Tags", "Vue@Tags", "Vue2.0@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 单页面程序
单页面程序（*SPA, Signle Page Application*），简称SPA，就是指一个Web网站只有唯一的一个HTML页面，所有的功能和交互都在这一个HTML页面中进行。

## Vue-cli
vue-cli是Vue.js标准的开发工具，它简化了程序员基于webpack创建工程化Vue项目的过程。

### Vue-cli安装
vue-cli是一个npm上的全局的包，使用`npm install`命令可以安装到自己的电脑上：
```shell
npm install -g @vue/cli
```

使用vue-cli的命令，可以快速地创建工程化的Vue项目：
```shell
vue create 项目名
```

### Vue目录结构
`public`文件夹用于存放对外的资源，如`index.html`

`src`用于存放源代码，`src`下有这些文件：
- `assets`：存放图片等静态资源
- `components`：封装好的组件
- `main.js`：项目的入口文件，整个项目运行要先执行`main.js`
- `App.vue`：项目的根组件，页面看到的UI结构均要定义在`App.vue`中

`package.json`是webpack包的文件

`babel.config.js, vue.config.js, jsconfig.js`是babel和vue的配置文件


### Vue-cli运行流程
工程化项目中，Vue做的事情很简单：通过`main.js`将`App.vue`渲染到`index.html`中。
- `App.vue`：用来编写待渲染地模板结构
- `index.html`：预留一个`el`区域
- `main.js`：将`App.vue`渲染到`index.html`的指定的区域中。

```js
// 导入Vue包，获取Vue构造函数
import Vue from 'vue'

// 导入根组件App
import App from './App.vue'

// 创建Vue对象
new Vue({
    // render函数指定组件渲染到指定区域
    render: h => h(App)
}).$mount("#app");
// $mount与el属性具有相同的效果






