---
layout: "post"
title: "「前端开发」- Vue-Component"
subtitle: "Vue —— 组件"
author: "eliochiu"
date: 2022-11-14

tags: ["前端开发@Tags", "Vue@Tags", "Vue2.0@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 组件
Vue组件化就是对UI结构的复用，Vue是一个支持组件的框架。

在Vue中，组件的后缀是`.vue`，任何`.vue`文件都是一个组件。`App.vue`是根组件。

### 组件的构成
Vue组件主要有三个部分组成：`template, script, style`。
- `template`：组件的模板结构
    - `template`只是一个容器标签，不会被渲染为真的Dom结构
    - `template`中只能包含唯一的根节点标签，不能同时出现两个根节点
- `script`：组件的JavaScript行为
    - 固定用法：`script`第一句必须是`export default {}`
    - `.vue`文件中的数据必须定义成方法，而不是数据对象
    - 计算属性`computed`， 侦听器`watch`， 过滤器`filters`，方法`methods`均使用对象定义
- `style`：组件的样式，支持less语法，只需要将`style`标签的`lang="less"`即可

```Vue
<template>
    <div id="app"></div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                username: "",
                age: 21
            }
        },
        methods: {

        }
    }
</script>

<style lang="less">
#app {
    font-family: Avenir, Arial, sans-serif;
    color: red;
    margin-top: 60px;
}
</style>
```

### 组件的关系
组件之间常见的关系有：父子、兄弟。

组件在创建的时候不具有关系，使用的时候才具有了关系，组件间的关系主要是根据嵌套关系确定的。

### 组件的使用步骤
如果要在一个组件中使用另一个组件，则需要遵循下面的步骤：

首先，在`script`中导入组件：
```js
import Left from "@/components/Left.vue"
import Right from "@/components/Right.vue"
```

然后，在`export default`使用`components`节点注册组件：
```js
export default {
    components: {
        Left,
        Right
    }
}
```

注册完毕后，可以直接在`template`中使用组件标签（组件看成自定义标签）
```Vue
<template>
    <div id="app">
        <Left></Left>
        <Right></Right>
    </div>
</template>
```

### 全局组件
使用`components`节点注册的组件是私有组件，只能在父组件内部使用。如果想为全局注册组件，在任何组件中都可以调用，则需要在`main.js`中使用下列语句：
```js
import Count from '@/components/Count.vue'

Vue.component('MyCount', Count);
```
其中：`MyCount`是全局组件的名称，该组件存在`Count.vue`文件下。

### 自定义属性props
`props`是自定义属性节点，声明在`export default`中，允许使用者通过自定义属性，为当前组件指定初始值。

组件的封装者，使用`props`属性定义自定义属性；组件的使用者，在使用组件的时候，为自定义属性指定任意值。
```js
export default {
    // 组件的自定义属性
    props: ['attribute1', 'attribute2', 'attribute3'...]

    // 组件的私有数据
    data() {
        return {}
    }
}
```

`props`是只读的，程序员不能修改`props`的值。如果确实要修改`props`的值，将`props`的值转存到`data`中：
```js
export default {
    // 组件的自定义属性
    props: ['init']

    // 组件的私有数据
    data() {
        return {
            count: this.init
        }
    }
}
```
如此，便可以通过修改`count`来达到修改init的目的。

#### default
`default`用于定于属性的默认值。
```js
export default {
    
    props: {
        init: {
            default: 0
        }
    }
}
```

#### type
`type`用于定义属性值的类型。如果传递的值不符合该类型，则会报错。
```js
export default {
    
    props: {
        init: {
            default: 0,
            type: Number
        }
    }
}
```

#### required
`required`是用来定义属性是否必须填写，将属性设为必填项后，强制用户传递属性的值。
```js
export default {
    
    props: {
        init: {
            default: 0,
            type: Number,
            required: true
        }
    }
}
```

### 组件间的样式冲突
在组件内部通过`style`指定样式实际上是全局的样式（因为最终他们都要在`index.html`）中渲染，必然会发生冲突。

解决冲突的方法是：在每一个组件中都指定一个自定义属性`data-v-xxx`，然后使用CSS的属性选择器指定样式。人为手动指定属性选择器比较麻烦，Vue提供了简单的方式，即在`style`标签中使用`scoped`，就会自动重复上面的过程，保证当前的css样式封闭在当前的组件里。

使用`scoped`后，当前样式便无法对子组件的样式进行修改，当使用第三方组件库的时候，如果有修改第三方默认样式的需求，需要使用`/deep/`深度选择器：
```Vue
<style>
.title {
    color: blue; // 不加deep，生成的选择器为.title[data-v-052242de]
}

/deep/ .title {
    color: blue; // 加deep时，生成的选择器是[data-v-052242de] .title
}
</style>
```


