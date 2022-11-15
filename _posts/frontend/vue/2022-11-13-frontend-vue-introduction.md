---
layout: "post"
title: "「前端开发」- Vue-Introduction"
subtitle: "Vue —— 简介与基本指令"
author: "eliochiu"
date: 2022-11-13

tags: ["前端开发@Tags", "Vue@Tags", "Vue2.0@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## Vue简介
Vue是一套用于构建前端页面的前端框架。他具有两个特性：
- 数据驱动视图：传统使用Dom或者jQuery操作数据和文档对象，而在Vue页面中，Vue会监听数据的变化，自动渲染页面。
- 双向数据绑定：填写表单时，双向数据绑定可以在不操作Dom的前提下自动把用户填写的内容同步到数据源中。

### MVVM
MVVM是*Model-View-ViewModel*的简写，是Vue实现数据驱动视图和双向数据绑定的原理。MVVM是`Model`、`View`、`ViewModel`，他将每个HTML页面拆分成了三个部分：
- `Model`：当前页面渲染所依赖的数据源
- `View`：表示当前页面渲染的Dom结构
- `ViewModel`：表示vue的实例，他是MVVM的核心。

`ViewModel`作为MVVM的核心，把当前页面的数据源和页面的结构联系到了一起。它能实现：
- 当数据源发生变化时，会被`ViewModel`监听到，VM会根据最新的数据源自动更新页面的结构。
- 当表单元素的值发生变化时，也会被`ViewModel`监听到，VM会把变化过后的值自动同步到`Model`结构中。

### Vue版本
目前，Vue共有三大版本:
- Vue1.x几乎被淘汰，是最早的Vue版本。
- Vue2.x是企业开发使用的主流版本。
- Vue3.x于2019年9月19日发布，是未来企业级项目开发的新趋势。

## Vue的基本使用
### 基本使用步骤
1. 导入Vue.js的script脚本文件
2. 在页面声明一个要被Vue控制的Dom区域
3. 创建Vue实例对象

```html
<body>
    <!-- Dom区域 -->
    <div id="app">{ { username } }</div>

    <!-- 导入Vue脚本文件 -->
    <script src="vue-2.6.12.js"></script>
    <script>
        const vm = new Vue({
            el: "#app",
            data: {
                username: 'zs'
            }
        })
    </script>
</body>
```

上述代码创建了一个简单的Vue页面。其中，`app`对应了MVVM中的`View`，即渲染的DOM结构；创建的Vue实例充当了`ViewModel`的角色；而在内部的`data`则被作为`Model`。

## Vue指令
Vue指令（*Directives*）是Vue开发者提供的模板语法，是辅助开发者渲染页面的基本结构。按照不同的指令可以分为6大类：
- 内容渲染指令
- 属性绑定指令
- 事件绑定指令
- 双向绑定指令
- 条件绑定指令
- 列表渲染指令

### 内容渲染指令
内容渲染指令主要有`v-text, v-html, 插值表达式`三类。

#### v-text
v-text用于将数据某个值渲染到指定的标签内。

```html
<!-- username对应的值渲染到第一个p标签中 -->
<p v-text="username"></p>

<!-- age对应的值渲染到第一个p标签中 -->
<p v-text="age">性别</p>
```

注意，`v-text`会覆盖掉表情内默认的文字。

#### v-html
如果要渲染的是一个html结构，则可以使用`v-html`指令。
```html
<ul v-text="list"></ul> 
<!-- list: "<li>1</li><li>2</li>" -->
```

`v-text`只能原封不动地渲染字符串，不能渲染html语句。`v-html`刚好可以实现这一点。

#### 插值表达式
`v-text`和`v-html`都不常用，最常用的是插值表达式`{ { } }`。
```html
<p>姓名：{ { name } }</p>
<p>性别：{ { gender } }</p>
```
插值表达式不会覆盖默认内容，在开发中更常用。

此外，插值表达式还支持简单的JavaScript表达式。
```html
{ { number + 1 } }

{ { ok ? 'YES' : 'NO' } }

{ { message.split('').reverse().join('') } }
```

### 属性绑定表达式
如果要为元素的属性动态绑定属性值（属性值和数据源对应），需要用到`v-bind:`属性绑定指令。用法示例如下：
```html
<!-- 假如数据源如下：
data: {
  inputValue: '请输入内容：',
  imgSrc: "https://cn.vuejs.org/images/logo.png"
}
 -->

<input type="text" v-bind:placeholder="inputValue">
<br>
<img v-bind:src="imgSrc" alt="">
```

`v-bind:`使用频率非常高，Vue官方给出的简写形式：`:`
```html
<!-- 假如数据源如下：
data: {
  inputValue: '请输入内容：',
  imgSrc: "https://cn.vuejs.org/images/logo.png"
}
 -->

<input type="text" :placeholder="inputValue">
<br>
<img :src="imgSrc" alt="">
<div :id="'list' + '-id'"></div>
```

日后在开发中，带`:`的属性都是动态属性，属性值跟随数据源变化，是字符串变量对应的数据的值；不带`:`的属性都是静态属性，属性值就是字符串的值。

### 事件绑定指令
Vue提供了`v-on`事件绑定指令，来辅助程序员为Dom元素绑定事件监听。语法格式如下：
```html
<h3>count的值为：{ { this.count } }</h3>
<button v-on:click="addCount">+1</button>
```
原生的Dom事件有：`onclick, onchange, oninput`等事件，对应`v-on:click, v-on:change, v-on:keyup`

通过`v-on`指令绑定的事件处理函数，需要在`methods`节点内声明：
```js
const vm = new Vue({
    el: "#app",
    data: {
      count: 0
    },
    methods: {
      addCount() {
        this.count ++;
      }
    }
})
```

由于`v-on`使用的频率非常高，Vue也提供了简写形式`@`，例如：
```html
<div id="app">
  <h3>count的值为：{ { this.count } }</h3>

  <!-- 完整写法 -->
  <button v-on:click="addCount">+1</button>

    <!-- 简便写法 -->
    <!-- 事件处理函数很简单，可以直接在写标签里 -->
  <button @click="count += 1">+1</button>

</div>
```

#### 传递参数
可以在`v-on`指令内为事件处理函数传递参数。例如：
```html
<h3>count的值为：{ { this.count } }</h3>
<button v-on:click="addCount(2)">+n</button>
```
```js
methods: {
  addCount(n) {
    this.count += n;
  }
}
```
上述代码可以实现计数器+n的效果。


#### 事件对象
在原生Dom事件绑定中，可以在事件处理函数的形参处，获得事件对象`event`。同理，在`v-on`指令所绑定的事件处理函数中，同样可以接收到事件对象。
```html
<h3>count的值为：{ { this.count } }</h3>
<button v-on:click="addCount">+1</button>
```
```js
methods: {
  addCount(e) {
    const nowBgColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = nowBgColor === 'red' ? '' : 'red';
    this.count += 1;
  }
}
```
上述代码可以实现按钮交替变红的效果。

#### $event
默认情况下，事件处理函数保留一个事件对象参数。如果我们需要同时传递参数和事件对象，则需要使用Vue内置的`$event`事件对象。

`$event`是Vue提供的特殊变量，用来表示原生的事件参数对象`event`。`$event`可以解决事件对象被覆盖的问题：
```html
<h3>count的值为：{ { this.count } }</h3>
<button v-on:click="addCount(2, $event)">+n</button>
```
```js
methods: {
  addCount(n, e) {
    const nowBgColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = nowBgColor === 'red' ? '' : 'red';
    this.count += n;
  }
}
```

#### 事件修饰符
原生Dom中，可以通过事件对象调用基本的方法（e.preventDefault(), e.stopPropagation()），常用的五个事件修饰符：
- `prevent`：阻止默认行为（阻止跳转、阻止表单提交）
- `stop`：阻止事件冒泡
- `capture`：以捕获模式出发当前的事件处理函数
- `once`：绑定的事件只触发一次
- `self`：只有在`event.target`是当前元素自身的时候触发事件

```html
<a href="http://www.baidu.com" @click.prevent="onLinkClick">百度首页</a>
```
上述代码阻止了链接自动跳转。

#### 按键修饰符
监听键盘事件的时候，需要判断按键的类别，可以使用案件修饰符：
```html
<input @keyup.enter="submit">
```

### 双向绑定指令
Vue提供了`v-model`双向数据绑定指令，用于辅助开发者在不操作Dom的前提下，快速获取表单的数据。
```html
<p>用户名是：{ { username } }</p>
<input type="text" v-model="username">

<p>选中的省份是：{ { province } }</p>
<select name="" id="" v-model="province">
    <option value="">请选择</option>
    <option value="1">北京</option>
    <option value="2">上海</option>
    <option value="3">广州</option>
</select>
```

### 条件渲染指令
条件渲染指令有`v-if`和`v-show`两个，主要作用都是在某个条件成立/不成立的情况下，显示/隐藏某个Dom结构。用法如下：
```html
<div id="app">
  <p v-if="networkState === 200">请求成功 --- 被v-if控制</p>
  <p v-show="networkState === 200">请求成功 --- 被v-show控制</p>
</div>
```

#### 原理对比
- `v-if`指令会动态地创建和删除Dom元素，从而控制元素的显示和隐藏。
- `v-show`指令通过控制Dom元素的`style="display: none"`属性，从而控制元素的显示与隐藏。

二者的消耗不同：`v-if`具有较高的切换消耗，而`v-show`具有较高的初始渲染消耗：
- 如果需要频繁地切换，则使用`v-show`较好。
- 如果运行时条件很少改变，则`v-if`较好。

#### v-else、v-else-if
`v-else和v-else-if`可以搭配`v-if`连续使用，用于分支判断渲染。

### 列表渲染指令
Vue提供了`v-for`列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。`v-for`指令需要使用`item in items`形式的特殊语法，其中：
- `items`：待循环的数组
- `item`：被循环的每一项

```js
data: {
  list: [
    {id: 1, name: 'zs'},
    {id: 2, name: 'ls'}
  ]
}
```

```html
<ul>
  <li v-for="item in list">姓名是：{ {item.name} }</li>
</ul>
```

可以添加一个循环参数`index`，代表当前循环项的索引。
```html
<ul>
  <li v-for="(item, index) in list">序号是：{ { index } }姓名是：{ { item.name } }</li>
</ul>
```

> 注意：item和index都是形参，可以重命名。例如：v-for = "(user, i) in list"

#### key
当列表的状态发生变化后，Vue会尽可能的复用已有的Dom元素，从而提升渲染的性能（不必再从头渲染一次），为了使Vue能准确追踪每个节点，从而在保证有状态的列表被正确更新的前提下，提升渲染的性能。此时，需要为每项提供一个唯一的`key`属性：
```html
<ul>
  <li v-for="item in list" :key="item.id">姓名是：{ {item.name} }</li>
</ul>
```
`key`值需要满足以下条件：
- `key`值必须是字符串或者数字类型
- `key`值必须具有唯一性
- 建议把数据项的`id`直接作为`key`
- v-for指令一定要添加`key`值
- 不能使用`index`作为`key`值，因为`index`是动态变化的，不具有唯一性




