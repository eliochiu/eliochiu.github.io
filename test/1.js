// function Person() {

// }

// var p1 = new Person();
// Person.prototype.sayHi = function() {
//   console.log("Hi!");
// }

// p1.sayHi(); // Hi!

// console.log(p1.hasOwnProperty("name")); // false，因为继承自Person.prototype

// p1.name = "Alice";
// console.log(p1.name);
// console.log(p1.hasOwnProperty("name")); // true，因为来自实例对象

// delete p1.name;
// console.log(p1.name); // Nicholas
// console.log(p1.hasOwnProperty("name")); // false





// function Person (name) {
//   this.name = name;
//   this.sayName = function() {
//     console.log(this.name);
//   };
// }

// var p1 = new Person("Nicholas");
// var p2 = new Person("Nicholas");

// console.log(p1.sayName === p2.sayName); // false

// function Animal () {

// };

// function Dog () {

// };
// Dog.prototype = Animal;
// console.log(Dog.prototype);
// console.log(Animal === Dog.prototype);

// var o = {};
// Object.defineProperties(o, {
//   name: {
//     value: "Elio",
//     enumerable: true
//   }, 
//   age: {
//     value: 21,
//     enumerable: false
//   },
//   gender: {
//     value: "male",
//     enumerable: true
//   }
// });

// console.log(Object.keys(o));
// console.log(Object.getOwnPropertyNames(o));
// function Person() {
// }

// Person.prototype = {
//   constructor: Person,
//   name: "Nicholas",
//   age: 29,
//   job: "Software Engineer",
//   friends: ["Shelby", "Court"],
//   sayName: function () {
//     alert(this.name);
//   }
// };

// var person1 = new Person();
// var person2 = new Person();

// person1.friends.push("Van");

// alert(person1.friends);    //"Shelby,Court,Van"
// alert(person2.friends);    //"Shelby,Court,Van"
// alert(person1.friends === person2.friends);  //true


// function SuperType() {
//   this.colors = ["red", "blue", "green"];
// }

// function SubType() {
//   // 继承supertype
//   SuperType.call(this)
// }

// var instance1 = new SubType();
// instance1.colors.push("yellow");
// console.log(instance1.colors); // ["red", "blue", "green", "yellow"]

// var instance2 = new SubType();
// console.log(instance2.colors); // ["red", "blue", "green"]

// function SuperType(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
// }

// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// }

// function SubType() {
//   // 继承supertype
//   SuperType.call(this, "Nicholas");

//   // 实例对象属性
//   this.age = 21;
// }

// // 继承方法
// SubType.prototype = new SuperType();
// // SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// }

// var instance1 = new SubType();
// console.log(instance1.name);  // Nicholas
// console.log(instance1.age); // 21
// instance1.sayName(); // Nicholas
// instance1.sayAge(); // 21
// instance1.colors.push("yellow");
// console.log(instance1.colors); // [ 'red', 'blue', 'green', 'yellow' ]

// var instance2 = new SubType();
// console.log(instance2.colors); // [ 'red', 'blue', 'green']


// global.name = "The Window";

// var object = {
//   name: "My Object",
//   getNameFunc: function() {
//     var that = this;
//     return function() {
//       return that.name;
//     };
//   }
// };

// console.log(object.getNameFunc()()); // "The Window"

// function outputNumbers(count) {
//   (function() {
//     for (var i = 0; i < count; i++) {
//       console.log(i);
//     }
//   })();
//   console.log(i);
// }

// outputNumbers(5);
// console.log(...[1, 2, 3])

// var foo = 'bar';
// var baz = {foo};
// console.log(baz);

// function f(x, y) {
//     return {x, y};
// }

// console.log(f(1, 2));

// console.log(Object.is('foo', 'foo'));
// console.log(Object.is({}, {}));

// var s1 = Symbol('foo');
// console.log(s1);
// console.log(typeof s1);

// const s1 = Symbol('a');
// const s2 = Symbol('a');
// console.log(s1 === s2); // false

// var obj = {};

// var foo = Symbol("foo");

// Object.defineProperty(obj, foo, {
//     value: "foobar",
//     enumerable: true
// });

// Object.defineProperty(obj, 'bar', {
//     value: "barbaz",
//     enumerable: true
// });

// for (let i in obj) {
//     console.log(i);
// }

// console.log(Object.getOwnPropertyNames(obj));
// console.log(Object.getOwnPropertySymbols(obj));

// let a = new Set([1, 2, 3]);
// let b = new Set([2, 3, 4]);

// console.log(new Set([...a, ...b]));
// console.log(new Set([...a].filter(x => b.has(x))));
// console.log(new Set([...a].filter(x => !b.has(x)))); 

// const map = new Map([
//     ['F', false],
//     ['T', true]
// ]);

// for (let key of map.keys()) {
//     console.log(key);
// }

// for (let value of map.values()) {
//     console.log(value);
// }

// for (let [key, value] of map.entries()) {
//     console.log(key, value);
// }

// for (let item of map) {
//     console.log(item);
// }

// function strMapToObj(strMap) {
//     let obj = {};
//     for (let [u, v] of strMap) {
//         obj[u] = v;
//     }
//     return obj;
// }

// let myMap = new Map([
//     ['yes', true],
//     ['no', false]
// ]);

// // console.log(strMapToObj(myMap));

// function objToStrMap(obj) {
//     let strMap = new Map();
//     for (let p in obj) {
//         strMap.set(p, obj[p]);
//     }
//     return strMap;
// }

// const obj = {
//     name: 'elio',
//     age: 21
// };

// console.log(objToStrMap(obj));

// function strMapToJson(strMap) {
//     return JSON.stringify(strMapToObj(strMap));
// }

// function mapToArrayJson(map) {
//     return JSON.stringify([...map]);
// }

// // console.log(strMapToJson(myMap));

// // console.log(mapToArrayJson(myMap));

// var book = {
//     title: "Professional JavaScript",
//     authors: [
//         "Nicholas C. Zakas",
//         "xxx",
//         "xxxxx"
//     ],
//     edition: 3,
//     year: 2011,
//     method: function() {
//         return 1
//     }
// };

// var jsonText = JSON.stringify(book, function(key, value) {
//     switch(key) {
//         case "authors":
//             return value.join(",");
//         case "year":
//             return 5000;
//         case "edition":
//             return undefined;
//         default:
//             return value;
//     }
// });

// console.log(jsonText);

// var book = {
//     "title": "Professional JavaScript", "authors": [
//         "Nicholas C. Zakas"],
//     edition: 3,
//     year: 2011
// };

// var jsonText = JSON.stringify(book, null, 4);
// console.log(jsonText);

// var obj = new Proxy({}, {
//     get: function (target, key, receiver) {
//       console.log(`getting ${key}!`);
//       return Reflect.get(target, key, receiver);
//     },
//     set: function (target, key, value, receiver) {
//       console.log(`setting ${key}!`);
//       return Reflect.set(target, key, value, receiver);
//     }
// });

// obj.count = 1;
// obj.count++;

// var proxy = new Proxy({}, {
//     get: function(target, property) {
//       return 35;
//     }
//   });

// console.log(proxy.name); // 35

// var target = {};
// var handler = {
//     get: function (target, property) {
//         target.property = 35;
//     }
// };
// var proxy = new Proxy(target, handler);
// proxy.a = 'b';
// console.log(target);

// const _proxy = (object, ...prototypes) => {
//     // 补全代码
//     const proxy = new Proxy(object, {
//         get: function (target, property) {
//             if (prototypes.includes(property)) {
//                 return "noright";
//             } else {
//                 return target[property];
//             }
//         }
//     });
//     return proxy;
// }

// let me = _proxy({ name: 'me', age: 1, from: 'china' }, 'age');
// console.log(me.age);
// console.log(me.from);
// console.log(me.name);

// const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]
// console.log([...new Set(arr)])

// const unique = function (arr) {
//     let ans = [];
//     arr.forEach(item => {
//         if (!ans.includes(item)) {
//             ans.push(item)
//         }
//     });
//     return ans;
// }

// console.log(unique(arr));

// const unique1 = function (arr) {
//     return arr.filter((item, index) => { 
//         return arr.indexOf(item) === index;
//     });
// }

// console.log(unique1(arr));

// function timeout(ms) {
//     return new Promise((resolve, reject) => {

//         setTimeout(resolve, ms, 'done');
//     });
// }

// timeout(10000).then((value) => {
//     console.log(value);
// });

// let promise = new Promise((resolve, reject) => {
//     console.log("Promise");
//     resolve();
//   });

//   promise.then(() => {
//     console.log("Resolved");
//   });

//   console.log("Hi!");

// var p1 = new Promise((resolve, reject) => {
//     setTimeout(() => reject(new Error('fail')), 3000);
// });

// var p2 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(p1), 1000);
// });

// p2
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

// let promise = new Promise(resolve => {
//     setTimeout(resolve, 5000);
// });

// promise.then(() => {
//     console.log("First");
//     return "First";
// }).then(value => {
//     console.log("------------");
//     console.log(value);
// });

// let p1 = new Promise((resolve, reject) => {
//     setTimeout(resolve(1), 1000);
// });

// let p2 = new Promise((resolve, reject) => {
//     setTimeout(resolve(2), 3000);
// });

// let p3 = new Promise((resolve, reject) => {
//     setTimeout(resolve(3), 5000);
// });

// p1.then((value) => {
//     console.log(value);
// });

// p2.then((value) => {
//     console.log(value);
// });

// p3.then((value) => {
//     console.log(value);
// });

// p = Promise.all([p1, p2, p3]);
// p.then((value) => {
//     console.log(value);
// });

// const p = new Promise((resolve, reject) => {
//     resolve("test");
// });

// const p = new Promise((resolve, reject) => {
//     throw new Error("test-error");
//     resolve(data);
// });

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("test")
//     }
//         , 5000);
// });

// p.then(
//     data => console.log(1, "resolved", data),
//     data => console.log(1, "rejected", data)
// );

// p.then(
//     data => console.log(2, "resolved", data),
//     data => console.log(2, "rejected", data)
// );

// var p = new Promise(resolve => {
//     throw new Error("test-error");
//     // resolve("test");
// });

// p.then(
//     () => { return Promise.resolve("yes") },
//     () => { return Promise.reject("no") })
// .then(
//     data => console.log('resolved', data),
//     err => console.log('rejected', err)
// );

// var p = new Promise((r) => {throw new Error('test')});


// p
// .then(
//     () => ({then: function(resolvePromise, rejectPromise) {}}),
//     e => ({then: function(resolvePromise, rejectPromise) {}})
// )
// .then(
//     data => console.log('resolve', data),
//     e => console.log('reject', e)
// );

// // 执行结果
// // promise 处于pending状态

// var p = new Promise((r) => {throw new Error('test')});

// p
// .then(
//     () => {return {then: function(resolvePromise, rejectPromise) {resolve('resolvePromise')}}},
//     e => {return {then: function(resolvePromise, rejectPromise) {throw new Error('surprise')}}}
// )
// .then(
//     data => console.log('resolve', data),
//     e => {console.error('reject', e)}
// );

// // 执行结果
// // reject Error: surprise

// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 5000)
// })
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2);
//     }, 3000);
// });

// Promise.race([p1, p2])
// .then(
//     data => console.log("resolved", data),
//     e => console.log("rejected", e)
// );

// const task1 = () => {
//     return new Promise((resolve, reject) => {
//         resolve(1);
//     });
// };

// const task2 = () => {
//     return new Promise((resolve, reject) => {
//         resolve(2);
//     });
// };

// const task3 = () => {
//     return new Promise((resolve, reject) => {
//         resolve(3);
//     });
// };

// console.log("script start");

// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);

// Promise.resolve()
//   .then(function () {
//     console.log("promise1");
//   })
//   .then(function () {
//     console.log("promise2");
//   });

// console.log("script end");
// console.log("script start");

// setTimeout(function () {
//   console.log("timeout1");
// }, 10);

// new Promise((resolve) => {
//   console.log("promise1");
//   resolve();
//   setTimeout(() => console.log("timeout2"), 10);
// }).then(function () {
//   console.log("then1");
// });

// console.log("script end");

// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     toString() {
//         return '(' + this.x + ',' + this.y + ')';
//     }
// }

// // console.log(typeof Point);
// // console.log(Point === Point.prototype.constructor);
// // const p = new Point(1, 2);

// // console.log(p.toString === Point.prototype.toString)

// console.log(Object.keys(Point.prototype));
// console.log(Object.getOwnPropertyNames(Point.prototype));
// for (let prop in Point.prototype) {
//     console.log(prop);
// }

// class MyClass {
//     constructor() {
//         // ...
//     }
//     get prop() {
//         console.log("getter");
//     }

//     set prop(value) {
//         console.log('setter:' + value);
//     }
// }

// let inst = new MyClass();
// inst.prop = 123;
// // setter: 123

// inst.prop;
//   // getter

// function currying(fn, ...rest) {
//     return function(...args) {
//         return fn(...rest, ...args)
//     }
// }

// function add(a, b, c, d) {
//     return a + b + c + d;
// }

// const curryingAdd = currying(add, 1, 2, 3);
// console.log(curryingAdd(3, 4));


const func = (function() {
    let i = 0;
    return () => i++;
})();

console.log(func());
console.log(func());
console.log(func());
console.log(func());
console.log(func());
