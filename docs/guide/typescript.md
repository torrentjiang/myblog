---
toc: content
nav:
  title: 学习文档
  order: -1
group:
  title: js基础
  order: 1
title: typescript类型体操
---

# typescript 常见用法介绍

### 什么是 ts？

### ts 跟 js 的区别？

| TypeScript                                     | JavaScript                                 |
| ---------------------------------------------- | ------------------------------------------ |
| JavaScript 的超集用于解决大型项目的代码复杂性  | 一种脚本语言，用于创建动态网页             |
| 可以在编译期间发现并纠正错误                   | 作为一种解释型语言，只能在运行时发现错误   |
| 强类型，支持静态和动态类型                     | 弱类型，没有静态类型选项                   |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用                     |
| 支持模块、泛型和接口                           | 不支持模块，泛型或接口                     |
| 支持 ES3，ES4，ES5 和 ES6 等                   | 不支持编译其他 ES3，ES4，ES5 或 ES6 功能   |
| 社区的支持仍在增长，而且还不是很大             | 大量的社区支持以及大量文档和解决问题的支持 |

### 1. typescript 基础类型

#### js 的基础类型？对象类型？

#### ts 的基础类型

- Boolean 类型
- Number 类型
- String 类型
- Array 类型
- Tuple 类型

```
元组
let tupleType: [string, boolean];
tupleType = ["Semlinker", true];
tupleType = ['Semlinker']
```

- Enum 类型

```
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
```

- Any 类型 （顶级类型）

```
养成非必要不any的习惯 很重要！

let value: any;

value.foo.bar;
value.trim();
value();
new value();
value[0][1];
```

- Unknown 类型 （顶级类型）

```
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK

// 赋值给其他类型
let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
```

- Null 和 Undefined 类型

```
let u: undefined = undefined;
let n: null = null;
```

- Never 类型

```
//表示永远永远不存在的值的类型
function error(message: string): never {
  throw new Error(message);
}

//实战中用来进行类型检查

type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}

```

- Void 类型

```
// 表示示没有任何类型
// 声明函数返回值为void  并且函数没有返回值
function sayHello(): void {
  console.log("hello");
}
```

### 2. typescript 断言

相信我，我知道自己在干什么

- 尖括号用法

```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

- as 用法

```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

- 非空断言

```
let user: string | null | undefined;
console.log(user!.toUpperCase()); // 编译正确
console.log(user.toUpperCase()); // 错误
```

### 3. 联合类型、交叉类型和类型别名

- 联合类型 **|**

```
let status: string | number
status = 'to be or not to be'
status = 1
```

- 交叉类型 **&**

```
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker;

const staff: IStaff = {
  id: '007',
  age: 18,
  companyId: 'Saic'
};
```

- 类型别名 **type**

```
类型别名用来给一个类型起个新名字。

type IStaff = IPerson & IWorker;
```

### 4. typescript 接口

**interface 用来定义对象的类型**

- 对象的形状

```
interface IPerson {
  name: string;
  age: number;
}

let Semlinker: IPerson = {
  name: "torrent",
  age: 18,
};
```

- 可选 | 只读属性

```
//制度属性创建后不可修改
//可选属性放在最后面
interface IPerson {
  readonly name: string;
  age?: number;
}
```

- 索引签名

```
允许有其他的任意属性
interface IPerson {
  name: string;
  age: number;
  [prop: string]: string | number; //  prop字段必须是 string类型 or number类型。
}
```

- type 与 interface 的区别

**相同点**

都可以用来描述对象或函数的类型

```
type MyType = {
  name: string;
  sayHello(): void;
}

interface MyInterface {
  name: string;
  sayHello(): void;
}
```

都允许扩展

```
//interface 用 extends 扩展
interface MyInterface {
  name: string;
  sayHello(): void;
}

interface MyInterface2 extends MyInterface {
  sex: string;
}

let person: MyInterface2 = {
  name:'jtt',
  sex:'男',
  sayHello(): void {
    console.log("hello！");
  }
}

// type 用 & 完成扩展
type MyType = {
  name: string;
  sayHello(): void;
}
type MyType2 = MyType & {
  sex:string;
}
let value: MyType2 = {
  name:'jtt',
  sex:'男',
  sayHello(): void {
    console.log("hello！");
  }
}

```

**不同点**

type 可以声明基本数据类型别名/联合类型/元组等，而 interface 不行

```
// 基本类型别名
type UserName = string;
type UserName = string | number;
// 联合类型
type Animal = Pig | Dog | Cat;
type List = [string, boolean, number];
```

interface 能够合并声明，而 type 不行

```
interface Person {
  name: string
}
interface Person {
  age: number
}

```

### 5. typescript 泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

```
// 需求 - 函数的参数可以是任何值，返回值就是将参数原样返回
function getValue(arg:string | number):string | number  {
  return arg;
}
```

```
function getValue<T>(arg:T):T  {
  return arg;
}

getValue<string>('jtt'); // 定义 T 为 string 类型
getValue('jtt') // 自动推导类型为 string
```

- 多个参数

```
function getValue<T, U>(arg:[T,U]):[T,U] {
  return arg;
}

const str = getValue(['jtt', 18]);
```

- 泛型约束

```
function getLength<T>(arg:T):T  {
  console.log(arg.length); // 报错，不能调用 length 属性
}
如何解决？
```
