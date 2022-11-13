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

function strMapToObj(strMap) {
    let obj = {};
    for (let [u, v] of strMap) {
        obj[u] = v;
    }
    return obj;
}

let myMap = new Map([
    ['yes', true],
    ['no', false]
]);

// console.log(strMapToObj(myMap));

function objToStrMap(obj) {
    let strMap = new Map();
    for (let p in obj) {
        strMap.set(p, obj[p]);
    }
    return strMap;
}

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

var book = {
    "title": "Professional JavaScript", "authors": [
        "Nicholas C. Zakas"],
    edition: 3,
    year: 2011
};

var jsonText = JSON.stringify(book, null, 4);
console.log(jsonText);