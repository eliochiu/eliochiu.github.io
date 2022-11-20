---
layout: "post"
title: "「前端开发」- JS-Currying"
subtitle: "JavaScript —— 柯里化"
author: "eliochiu"
date: 2022-11-16

tags: ["前端开发@Tags", "JavaScript@Languages"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 柯里化
柯里化（Currying），是把**接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数**，并且返回接受余下的参数而且返回结果的新函数的技术。 例如：
```js
// 正常的函数
function add(x, y) {
  return x + y;
}

add(1, 2); // 3

// 柯里化函数
function curryingAdd(x) {
  return function(y) {
    return x + y;
  }
}

add(1)(2);
```

## 柯里化函数的作用
### 参数复用
```js
function curryCheck(reg) {
  return function(txt) {
    return reg.test(txt);
  }
}

const hasDigit = curryCheck(/\d+/g);
const hasLetter = curryCheck(/[a-z]+/g);
```

### 延迟执行
```js
function add(...args) {
	return args.reduce((prev, current) => prev + current);
}

add(1, 2, 3, 4);

function curry(fn){
  let args = [];
  return function cb() {
    if(arguments.length < 1) {
    	return fn(...args);
    }
    else {
      args = [...args,...arguments]
      return cb;
    }
  }
}

cAdd = curry(add);

cAdd(1)(2)(3)(4)();
```

延迟执行实际上就是当我们调用这个方法时，不会立即执行，或者说在参数符合规定的时候才会执行我们真正想执行的内容。

## 实现方式
### 普通实现
```js
function currying(fn, ...rest) {
  return function(...args) {
    return fn(...rest, ...args)
  }
}

function add(a, b, c, d) {
  return a + b + c + d;
}

const curryingAdd = currying(add, 1, 2);
curryingAdd(3, 4); // 10
```

### 递归实现
```js
function currying(fn) {
  const len = fn.length; // fn参数总长度
  let _args = [];
  const curry() => {
    return function(...args) {
      // 参数攒够就执行
      if (_args.length + args.length >= len) {
        const result = fn(..._args, ...args);
        // 重置
        _args = [];
        return result;
      }
      // 否则就添加参数
      else {
        _args = [..._args, ...arg];
        return curry();
      }
    }
  }
  return curry();
}

function add(a, b, c, d) {
  return a + b + c + d;
}

const curryingAdd = currying(add);
curryingAdd(1)(2)(3)(4); // 10
curryingAdd(1, 2)(3, 4); // 10
curryingAdd(1, 2, 3)(4); // 10
```

## 经典面试题
实现一个add方法，使计算结果能够满足如下预期：
`add(1)(2)(3) == 6 // true`
`add(1, 2, 3)(4) == 10 // true`
`add(1)(2)(3)(4)(5) == 15 // true`

```js
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function() {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
    	return a + b;
    });
  }
  return _adder;
}
```




