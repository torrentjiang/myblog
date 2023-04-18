---
toc: content
group:
  title: 常用算法
  order: 1
title: 排序算法
order: 1
---

# 常见的排序算法

## 冒泡排序

原理：
从左到右，相邻元素进行比较，如果前一个元素值大于后一个元素值（正序），则交换，这样一轮下来，将最大的数在最右边冒泡出来。这样一轮一轮下来，最后实现从小到大排序。

复杂度：

- 时间 O(n^2)
- 空间 O(1)

```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 改进版
function bubbleSortec(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = false; // 提前退出冒泡循环的标识位
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true; // 表示发生了数据交换
      }
    }
    // 没有数据交换 证明当前数据已经有序 退出循环
    if (!flag) break;
  }
  return arr;
}
```

## 插入排序

原理：
插入排序的思路跟整理扑克牌是一样的，即每次拿到一张牌，按大小顺序将其插入到合适的位置。那么插入排序实际上就是：每次将一个数插入到有序的数组中去(初始一个数字自然有序)。

复杂度：

- 时间 O(n^2)
- 空间 O(1)

```javascript
function insertSort(arr) {
  let length = arr.length;
  for (let i = 1; i < length; i++) {
    let temp = arr[i];
    for (let j = i; j > 0; j--) {
      if (temp >= arr[j - 1]) {
        break; // 当前考察的数大于前一个数，证明有序，退出循环
      }
      arr[j] = arr[j - 1]; // 将前一个数复制到后一个数上
    }
    arr[j] = temp; // 找到考察的数应处于的位置
  }
  return arr;
}
```

## 选择排序

原理：
从未排序的序列中找到最大（或最小的）放在已排序序列的末尾（为空则放在起始位置），重复该操作，直到所有数据都已放入已排序序列中。

复杂度：

- 时间 O(n^2)
- 空间 O(1)

```javascript
function selectionSort(arr) {
  const length = arr.length;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
  }
  return arr;
}
```

## 归并排序

原理：
采用了分治策略，将数组分成 2 个较小的数组，然后每个数组再分成两个更小的数组，直至每个数组里只包含一个元素，然后将小数组不断的合并成较大的数组，直至只剩下一个数组，就是排序完成后的数组序列。

复杂度：

- 时间 O(nlog~2~n)
- 空间 O(n)

```javascript
function mergeSort(arr) {
  let array = mergeSortRec(arr);
  return array;
}

// 若分裂后的两个数组长度不为 1，则继续分裂
// 直到分裂后的数组长度都为 1，
// 然后合并小数组
function mergeSortRec(arr) {
  let length = arr.length;
  if (length === 1) {
    return arr;
  }
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length);
  return merge(mergeSortRec(left), mergeSortRec(right));
}

// 顺序合并两个小数组left、right 到 result
function merge(left, right) {
  let result = [],
    ileft = 0,
    iright = 0;
  while (ileft < left.length && iright < right.length) {
    if (left[ileft] < right[iright]) {
      result.push(left[ileft++]);
    } else {
      result.push(right[iright++]);
    }
  }
  while (ileft < left.length) {
    result.push(left[ileft++]);
  }
  while (iright < right.length) {
    result.push(right[iright++]);
  }
  return result;
}
```

## 快速排序

原理：
快排使用了分治策略的思想，所谓分治，顾名思义，就是分而治之，将一个复杂的问题，分成两个或多个相似的子问题，在把子问题分成更小的子问题，直到更小的子问题可以简单求解，求解子问题，则原问题的解则为子问题解的合并。

复杂度：

- 时间 O(nlog~2~n)
- 空间 O(nlog~2~n)

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
```
