---
layout: "post"
title: "「前端开发」- JS-EX-01"
subtitle: "JavaScript —— 练习1"
author: "eliochiu"
date: 2022-11-13

tags: ["前端开发@Tags", "JavaScript@Languages", "练习题@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

### 01 自增运算符
```js
let number = 0
console.log(number++)
console.log(++number)
console.log(number)
```
结果：`0`, `2`, `2`

一元后自增运算符 ++：

返回值（返回 0）
值自增（number 现在是 1）
一元前自增运算符 ++：
值自增（number 现在是 2）
返回值（返回 2）

----

### 02 模板字符串
```js
function getPersonInfo(one, two, three) {
  console.log(one)
  console.log(two)
  console.log(three)
}

const person = 'Lydia'
const age = 21

getPersonInfo(`${person} is ${age} years old`)
```
结果：`["", "is", "years old"], "Lydia", 21`

如果使用标记模板字面量，第一个参数的值总是包含字符串的数组。其余的参数获取的是传递的表达式的值！

----

### 03 引用类型
```js
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!')
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.')
  } else {
    console.log(`Hmm.. You don't have an age I guess`)
  }
}
```
结果：`Hmm.. You don't have an age I guess`

在测试相等性时，**基本类型通过它们的值（value）进行比较，而对象通过它们的引用（reference）进行比较**。JavaScript 检查对象是否具有对内存中相同位置的引用。

题目中我们正在比较的两个对象不是同一个引用：作为参数传递的对象引用的内存位置，与用于判断相等的对象所引用的内存位置并不同。

这也是 { age: 18 } === { age: 18 } 和 { age: 18 } == { age: 18 } 都返回 false 的原因。

----

### 04 剩余运算符
```js
function getAge(...args) {
  console.log(typeof args)
}

getAge(21)
```
结果：`object`

扩展运算符（...args）会返回实参组成的数组。而数组是对象，因此 typeof args 返回 "object"。

----

### 05 严格模式
```js
function getAge() {
  'use strict'
  age = 21
  console.log(age)
}

getAge()
```
结果：`ReferenceError`

使用 "use strict"，你可以确保不会意外地声明全局变量。我们从来没有声明变量 age，因为我们使用 "use strict"，它将抛出一个引用错误。如果我们不使用 "use strict"，它就会工作，因为属性 age 会被添加到全局对象中了。

----

### 06 eval
```js
const sum = eval('10*10+5')
```
结果：`105`

代码以字符串形式传递进来，eval 对其求值。如果它是一个表达式，就像本例中那样，它对表达式求值。表达式是 10 * 10 + 5。这将返回数字 105。

----

### 07 setItem
cool_secret 可访问多长时间？
```js
sessionStorage.setItem('cool_secret', 123)
```

----

### 08 var
```js
var num = 8
var num = 10

console.log(num)
```

结果：`10`

使用 var 关键字，你可以用相同的名称声明多个变量。然后变量将保存最新的值。

你不能使用 let 或 const 来实现这一点，因为它们是块作用域的。

----

### 09 键
```js
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)
```
结果：`true`, `true`, `false`, `true`

所有对象的键（不包括 Symbol）在底层都是字符串，即使你自己没有将其作为字符串输入。这就是为什么 obj.hasOwnProperty('1') 也返回 true。

对于集合，它不是这样工作的。在我们的集合中没有 '1'：set.has('1') 返回 false。它有数字类型为 1，set.has(1) 返回 true。

----

### 10  对象
```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

结果：`{ a: "three", b: "two" }`

如果你有两个名称相同的键，则键会被替换掉。它仍然位于第一个键出现的位置，但是值是最后出现那个键的值。

----

### 11 全局上下文
JavaScript 全局执行上下文为你做了两件事：全局对象和 this 关键字。
结果：对。

----

### 12 continue
```js
for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
```

结果：`1, 2, 4`

如果某个条件返回 true，则 continue 语句跳过本次迭代。

----

### 13 包装类型
```js
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
```
结果：`Just give Lydia pizza already!`

String 是内置的构造函数，我们可以向它添加属性。我只是在它的原型中添加了一个方法。基本类型字符串被自动转换为字符串对象，由字符串原型函数生成。因此，所有 string(string 对象) 都可以访问该方法！

----

### 14 对象
```js
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```
结果：`456`

对象的键被自动转换为字符串。我们试图将一个对象 b 设置为对象 a 的键，且相应的值为 123。

然而，当字符串化一个对象时，它会变成 "[object Object]"。因此这里说的是，a["[object Object]"] = 123。然后，我们再一次做了同样的事情，c 是另外一个对象，这里也有隐式字符串化，于是，a["[object Object]"] = 456。

然后，我们打印 a[b]，也就是 a["[object Object]"]。之前刚设置为 456，因此返回的是 456。

----

### 15 字符串拼接
```js
const foo = () => console.log('First')
const bar = () => setTimeout(() => console.log('Second'))
const baz = () => console.log('Third')

bar()
foo()
baz()
```
结果：`First, Third, Second`

我们有一个 setTimeout 函数，并首先调用它。然而，它是最后打印日志的。

这是因为在浏览器中，我们不仅有运行时引擎，还有一个叫做 WebAPI 的东西。WebAPI 提供了 setTimeout 函数，也包含其他的，例如 DOM。

将 callback 推送到 WebAPI 后，setTimeout 函数本身 (但不是回调！) 将从栈中弹出。



