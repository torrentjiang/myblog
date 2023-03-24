---
toc: content
group:
  title: js基础
  order: 3
title: 常用的js手写方法实现
order: 3
---

## 防抖

```
function debounce(fn, wait, immediate) {
  let timer = null;

  return function() {
    let args = arguments;
    let context = this;

    if (immediate && !timer) {
      fn.apply(context, args)
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
};
```

## 节流 使用时间戳

```
function throttle(func, wait) {
  let preTime = 0;

  return function () {
    let nowTime = +new Date();
    let context = this;
    let args = arguments;

    if (nowTime - preTime > wait) {
      func.apply(context, args);
      preTime = nowTime;
    }
  };
}
```

## 手写一个 new

```
function myNew(Cons,...args){
  let obj = {};
  obj.__proto__ = Cons.prototype;
  let ret = Cons.call(obj, args);
  return ret instanceof Object ? ret : obj;
}
```

## 手写一个深拷贝

```
function deepClone(obj = {}, map = new Map()) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString.call(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }

  // 返回结果
  return result;
}
```

## 使用 Promise 实现一个异步流量控制的函数, 比如一共 10 个请求, 每个请求的快慢不同, 最多同时 3 个请求发出, 快的一个请求返回后, 就从剩下的 7 个请求里再找一个放进请求池里, 如此循环。

```
function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;
  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      fetch(url).then((res) => {
        // 保存请求结果
        result[current] = res;
        console.log(`完成 ${current}`, new Date().toLocaleString());
        // 请求没有全部完成, 就递归
        if (current < len) {
          next();
        }
      }).catch((err) => {
        console.log(`结束 ${current}`, new Date().toLocaleString());
        result[current] = err;
        // 请求没有全部完成, 就递归
        if (current < len) {
          next();
        }
      });
    }
  });
  return result
}
// 测试
multiRequest(['http://xxa', 'http://xxb', 'http://xxc', 'http://xxd', 'http://xxe'], 3)
```

## ES5 和 ES6 的继承?

```
es5 原型链继承 组合继承

function Parent () {
  this.name = "jtt";
}

Parent.prototype.say = function() {
  console.log(this.name)
}

function Child () {
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var c1 = new Child();

*** 每个实例对引用类型属性的修改都会被其他的实例共享
*** 在创建Child实例的时候，无法向Parent传参

构造函数继承
function Parent(age) {
  this.name = ['jtt', 'waa']
  this.age = age
}

function Child (name) {
  Parent.call(this, name)
}
var c2 = new Child(19)

*** 无法复用父类的公共函数
*** 每次子类构造实例都得执行一次父类函数

组合继承(原型链继承和借用构造函数合并)
function Parent(name) {
  this.name = name
  this.body = ['foot','hand']
}
Parent.prototype.say = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

var c3 = new Child('arzh1', '18')
*** 需执行两次父类构造函数

es6 class

class Parent {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}

```

## 手写 bind

```
Function.prototype.myBind = function (target,...outArgs) {
  let target = target || {};
  const symbolKey = Symbol();
  target[symbolKey] = this;
  return function (...innerArgs) {
    const res = target[symbolKey](...outArgs, ...innerArgs); // outArgs和innerArgs都是一个数组，解构后传入函数
    return res
  }
}
var a = {
  name: "jtt"
}
var b = {
  name: 'abc',
  say() {
    console.log(this.name)
  }
}
b.say.myCall(a, 'def')
```

## 数组扁平化

```
var arr = [1,2,[3,4,[5]]];
arr.flat();

function flatten(arr) {
  let res = [];
  for (let i = 0, length = arr.length; i < length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
      //res.push(...flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

function flatten(arr) {
  return arr.reduce((res, next) => {
    return res.concat(Array.isArray(next)? flatten(next) : next);
  },[]);
}

```

## 实现 reduce 函数

```
Array.prototype.reduce = function (callback) {
  const arr = this;
  let total = arr[0];
  for (let i = 1; i < arr.length; i++) {
    total = callback(total, arr[i], i, arr);
  }
  return total;
};

```

## 有序数组原地去重

```
*es5
function unique(arr) {
  for(let i = 0; i < arr.length; i++){
    for(let j = i + 1; j < arr.length; j++){
      if(arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr
}

filter?

*es6

function unique(arr) {
  return [...new Set(arr)]
}

```
