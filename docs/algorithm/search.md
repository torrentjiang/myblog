---
toc: content
group:
  title: 查找算法
  order: 2
title: 线性、二分查找
order: 1
---

## 线性查找

### 顺序查找

最基本的搜索算法，是将每个数据结构中的元素与需要查找的元素作对比。
缺点：最低效

```javascript
function sequentialSearch(items, item) {
  for (let i = 0; i < items.length; i++) {
    if (item === items[i]) {
      return i;
    }
  }
  return -1;
}
```

### 二分查找

也称折半查找算法，它是一种简单易懂的快速查找算法。例如我随机写 0-100 之间的一个数字，让你猜我写的是什么？你每猜一次，我就会告诉你猜的大了还是小了，直到猜中为止。
缺点：
元素必须有序
顺序储存结构太小不合适，直接使用顺序查找即可
顺序储存结构太长不合适，它要求连续的内存空间，太长不利于存储

```javascript
function binarySearch(items, target) {
  let low = 0,
    high = items.length - 1,
    mid,
    curent;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    curent = items[mid];
    if (curent < target) {
      low = mid + 1;
    } else if (curent > target) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}
```
