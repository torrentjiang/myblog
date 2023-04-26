---
toc: content
group:
  title: typescript操练场
  order: 2
order: 2
title: 实战演练
---

# 实战演练

## 实现 RaadOnly< T >

```ts
// 实现效果如下：
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
```

```ts
// 解
type MyReadonly<T> = {
  readonly [p in keyof T]: T[p];
};
```

## 实现 Pick<T, K>

从类型 `T` 中选择出属性 `K`，构造成一个新的类型

```ts
// 实现效果如下：
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

```ts
// 解
type MyPick<T extends Object, K in keyof T> = {
    [key in K]: T[key]
}
```

## 实现一个通用 First< T >

接受一个数组 T 并返回它的第一个元素的类型。

```ts
// 实现效果如下：
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

```ts
// 解
type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
```

## 实现一个 IF

接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

```ts
// 解
type IF<B extends boolean, T, F> = B extends true ? T : F;
```

## 实现一个 Push

在类型系统里实现 JavaScript 的 Array.push 方法

```ts
type Result = Push<[1, 2], '3'>; // [1, 2, '3']
```

```ts
// 解
type Push<T extends unknown[], U> = [...T, U];
```

## 实现内置的 Parameters 类型

```ts
const foo = (arg1: string, arg2: number): void => {};
```

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...any: infer S
) => any
  ? S
  : any;
```
