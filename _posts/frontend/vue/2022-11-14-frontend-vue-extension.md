---
layout: "post"
title: "「前端开发」- Vue-Extension"
subtitle: "Vue —— 扩展"
author: "eliochiu"
date: 2022-11-14

tags: ["前端开发@Tags", "Vue@Tags", "Vue2.0@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 过滤器
过滤器（Filters）是Vue为开发者提供的工具，常用于文本的格式化，主要用在插值表达式与`v-bind`指令中。

过滤器应该被添加在JavaScript表达式的尾部，并由一个竖线（管道符进行调用）。例如：
```html
<p>{ { message | capicalize } }</p>

<div v-bind:id="rawId | formatId"></div>
```
上述代码分别调用了`capitalize， formatId`过滤器，对`message`和`rawId`进行了过滤。

在Vue实例中，通过`filters`节点定义过滤器：
```js
const vue = new Vue({
  el: "#app",
  data: {

  },
  methods: {

  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
});
```

### 全局过滤器
上述定义的过滤器是私有过滤器，只能在当前Vue实例控制的区域内生效。如果想定义全局的过滤器，需要使用下面的语句：
```js
Vue.filter('capitalize', (str) => {str.charAt(0).toUpperCase() + str.slice(1)});
```

### 连续调用
通过连续的管道符，可以连续调用过滤器：
```html
{ { value | filter1 | filter2 ... } }
```
上述代码将`value`经过`filter1`的返回值，作为新的值再经过`filter2`过滤。

### 传参
过滤器函数里的第一个参数是默认的参数，即调用过滤器的值。如果后面还有参数，加在过滤器函数上：
```js
filters: {
  filter1(value, arg1, arg2) {
    return value + arg1 + arg2;
  }
}
```

```html
<p>{ { value | filter1(a, b) } }</p>
```

### 兼容性
过滤器仅在Vue2.x和1.x中受支持，在Vue3.x 的版本中剔除了过滤器相关的功能。


## 侦听器
侦听器是Vue提供给开发者的功能，允许开发者监测数据的变化，对数据的变化做出特定的操作。

侦听器通过在Vue实例中添加`watch`节点实现：
```js
const vue = new Vue({
  el: '#app',
  data: {username: ''},
  watch: {
    // 监听username的变化
    // oldValue是变化前的值，newVal是变化后的值
    username(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  }
});
```

### immediate选项
通常情况下，组件在初次加载完毕后不会调用watch侦听器。如果想让watch侦听器立刻被调用，则需要使用immediate选项。
```js
const vue = new Vue({
  el: '#app',
  data: {username: ''},
  watch: {
    username: {
      handler: function(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      immediate: true
    }
  }
});
```

### deep选项
如果我们监听的属性是一个对象，当对象的值发生变化，我们无法监听到。这时就需要使用deep选项：
```js
const vue = new Vue({
  el: '#app',
  data: {
    info: {
      id: 1,
      username: ''
    }
  },  
  watch: {
    info: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      deep: true
    }
  }
});
```

### 监听单个对象属性的变化
```js
const vue = new Vue({
  el: '#app',

  data: {
    info: {
      id: 1,
      username: ''
    }
  },
  
  watch: {
    'info.username': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
    }
  }
});
```

## 计算属性
计算属性指的是通过一系列运算之后，最终得到一个属性值。计算出的属性值，可以被methods或者模板结构使用。

Vue通过`computed`节点定义计算属性：
```js
data: {
  r: 0,
  g: 0, 
  b: 0
},

computed: {
  rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
},

methods() {
  show() {
    console.log(this.rbg);
  }
}
```

计算属性的特点：
- 计算属性是一个属性，定义的时候以方法的形式定义，但是以属性使用。
- 计算属性会根据原始数据的变化自动地变化。



