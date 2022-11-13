---
layout: "post"
title: "「前端开发」- JS-ES6-07"
subtitle: "ECMAScript6 —— Set&Map数据结构"
author: "eliochiu"
date: 2022-11-10

tags: ["前端开发@Tags", "JavaScript@Languages", "ES6@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---
## Set
### 基本用法
ES6提供了一种新的数据结构——`Set`，它类似于数组，但成员的值都是唯一的，没有重复值。`Set`本身是一个构造函数，用来生成`Set`数据结构。
```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
s // {2, 3, 5, 4}
```

`Set`构造函数可以接受一个数组：
```js
const set = new Set([2, 3, 4, 3, 2]);
set // {2, 3, 4}
```
### Set实例的属性和方法
#### 属性
`Set`结构有如下的属性：
- `Set.prototype.constructor`：构造函数，默认就是`Set`函数
- `Set.prototype.size`：返回`Set`实例的成员总数。

`Set`的方法分为两类：操作方法和遍历方法。

#### 操作方法
`Set`共有四个操作方法：
- `add(value)`：添加某个值，返回`Set`结构本身。
- `delete(value)`：删除某个值，返回一个布尔值代表是否删除成功。
- `has(value)`：返回一个布尔值，代表参数是否是`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

上面这些属性和方法的实例如下：
```js
var s = new Set();

// 2被添加了两次
s.add(1).add(2).add(2); 

s.size; // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false

s.delete(2);
s.has(2); // false
```

`Array.from()`可以将`Set`结构转为数组。

### 遍历方法
`Set`结构有四个遍历方法，可用于遍历成员：
- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

> `Set`的遍历顺序就是插入顺序。

#### keys()、values()、entries()
这三个方法返回的都是遍历器对象。由于`Set`结构没有键名，只有键值，因此`keys(), values()`的行为完全一致。
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
    console.log(item);
}

// red
// green
// blue

for (let item of set.values()) {
    console.log(item);
}

// red
// green
// blue

for (let item of set.entries()) {
    console.log(item);
}

// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`Set`结构默认遍历器就是`values()`：
```js
Set.prototype[Symbol.iterator] === Set.prototype.values; // true
```
因此可以直接使用`for...of`遍历`Set`结构。

#### forEach
`forEach`和数组用法类似，对每个成员执行某个操作，没有返回值：
```js
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 3));
// 2
// 4
// 6
```
#### 遍历的应用
```js
let set = new Set(['red', 'green', 'blue']);
let arr = [...set]; // ['red', 'green', 'blue']
```
数组去重：
```js
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]
```

filter和map：
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x ** 2)); // [1, 4, 9]
```

并集、交集、差集：
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]); // [1, 2, 3, 4]

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
```

## Map
JavaScript的对象本质上是键值对的集合（Hash结构），但只能用字符串作为键，这给它的使用带来了很大的限制。

为了解决这个问题，ES6提供了`Map`数据结构。它类似对象，但是各种类型的值都可以作为键。
```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content');
m.get(o); // 'content'

m.has(o); // true
m.delete(o); // true
m.has(o); // false
```
`Map`构造函数可以接受数组作为参数，这个数组是一个键值对数组。
```js
const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

map.size; // 2
map.has('name'); // true
map.get('name'); // '张三'
```

### Map实例的属性和方法
**size属性**

`size`属性返回`Map`数据结构的成员总数：
```js
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size; // 2
```

**set(key, value)**

`set`方法设置`key`所对应的键值，然后返回整个`Map`结构。如果`key`已经有值，则键值会被更新，否则就生成该键。
```js
const m = new Map();
map.set('edition', 6);
map.set(262, 'standard');
map.set(undefined, 'nah');
```

因为`set`直接返回新的`Map`结构，因而可以使用链式写法。
```js
let map = new Map()
.set(1, 'a')
.set(2, 'b')
.set(3, 'c');
```

**get(key)**

`get`方法用于读取`key`所对应的键值，如果找不到`key`，返回`undefined`。
```js
const m = new Map();
m.set('hello', 'Hello, ES6!');
m.get('hello'); // 'Hello, ES6!'
```

**has(key)**

`has`方法返回一个布尔值，用于判断`Map`结构是否有某个键值`key`。
```js
const m = new Map();
map.set('edition', 6);
map.set(262, 'standard');
map.set(undefined, 'nah');

map.has('edition'); // true
map.has('262'); // false
```

**delete(key)** 

`delete`方法删除某个键，返回`true`; 若删除失败，返回`false`。
```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined); // true

m.delete(undefined);
m.has(undefined); //  false
```

**clear()**
`clear`方法清除所有成员，没有返回值。
```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size; // 2
map.clear();  
map.size; // 0
```

遍历方法和`Set`一致，这里就不再赘述。
> 注意，`Map`方法默认的迭代器是`entries()`，因此可以使用`let [key, value] of map`直接遍历`Map`结构。（而`Set`默认方法为`values()`）。

## 类型转换
### Map转为数组
最容易的办法是使用扩展运算符(...)将`Map`转为数组：
```js
const myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);

[...myMap]; // [[true, 7], [{foo: 3}, ['abc']]]
```

### 数组转为Map
使用`Map()`构造函数，传入一个数组：
```js
const myMap = new Map([
    [true: 7],
    [{foo: 3}, ['abc']]
]);
```

### Map转为对象
如果`Map`所有键都是字符串，可以转化成对象。
```js
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

const myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap); // {yes: true, no: false}
```

### 对象转Map
```js
function objToStrMap(obj) {
    let strMap = new Map();
    for (let p in obj) {
        // 也可以写成 for (let k of Object.keys(obj))
        strMap.set(p, obj[p]);
    } 
    return strMap;
}
```

### Map转为JSON
`Map`的键名都是字符串，可以考虑转为对象JSON。具体步骤为：先将`Map`转为对象，再使用`JSON.stringnify`方法进行序列化。
```js
function strMapToJson(strMap) {
    return JSON.stringnify(strMapToObj(strMap));
}
```

如果`Map`的键名有非字符串，可以考虑转为数组JSON：
```js
function mapToArrayJson(map) {
    return JSON.stringnify([...map]);
}
```

### JSON转为Map
一般情况下，JSON结构的键名均为字符串，因此可以先将JSON反序列化为对象，然后再转为`Map`：
```js
function jsonToStrMap(json) {
    return objToStrMap(JSON.parse(json));
}
```

若整个JSON就是一个数组，里面包含的所有元素都为数组的时候，可以直接使用构造函数：
```js
function jsonToMap(json) {
    return new Map(JSON.parse(json));
}
```


