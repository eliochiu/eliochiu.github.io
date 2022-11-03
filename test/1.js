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

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType() {
  // 继承supertype
  SuperType.call(this, "Nicholas");

  // 实例对象属性
  this.age = 21;
}

// 继承方法
SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubType();
console.log(instance1.name);  // Nicholas
console.log(instance1.age); // 21
instance1.sayName(); // Nicholas
instance1.sayAge(); // 21
instance1.colors.push("yellow");
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'yellow' ]

var instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green']

