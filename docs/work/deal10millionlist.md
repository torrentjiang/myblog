---
toc: content
---

# 如何应该对后端一次返回 10 万条数据

## 问题描述

问：一次性返回 10 万条数据给你，你如何处理？
我：歪嘴一笑，f\*\*k u!

## 问题实际意义

看似很 nt 的问题，那么它是否真的有实际意义呢？

- 考察前端如何处理大量数据 ？
- 考察对于大量数据的性能优化 ？

行 那就当它有用意义吧。那么该如何处理呢？

### 1、直接渲染。

emm ，卡不死你算我输。

### 2、使用定时器分组分批分堆依次渲染（定时加载、分堆思想）。

#### ①. 分组分批分堆函数

```javascript
// 一个简单的分组函数 10条一组
function averageFn(arr) {
  let i = 0;
  let result = [];
  while (i < arr.length) {
    result.push(arr.slice(i, i + 10));
    i = i + 10;
  }
  return result;
}
```

#### ②. 创建定时器去依次赋值渲染

```javascript
// 渲染函数
async render() {
    this.loading = true;
    const res = await axios.get("http://getBigDataList_100000");
    this.loading = false;
    let twoDArr = averageFn(res.data.data);
    for (let i = 0; i < twoDArr.length; i++) {
        // 相当于在很短的时间内创建许多个定时任务去处理
        setTimeout(() => {
            this.arr = [...this.arr, ...twoDArr[i]];
        }, 1000 * i);
    }
}
```

### 3、使用 scroll 实现虚拟列表

```typescript
import React, { useEffect, useState, useRef } from 'react';

export default () => {
  let data: { value: string; key: number }[] = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      key: i,
      value: `第${i}个数据`,
    });
  }

  const [start, setStart] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(0); //可视区域内最多容乃元素个数
  const [visibleData, setVisibleData] = useState<
    { value: string; key: number }[]
  >([]);
  const virtualRef = useRef<HTMLDivElement>(null);
  const virtualContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (virtualRef.current) {
      const count = Math.ceil(virtualRef.current.clientHeight / 30);
      setVisibleCount(count);
      setVisibleData(data.slice(start, start + count));
    }
  }, []);

  const onHandleScroll = () => {
    if (virtualRef.current) {
      const scrollTop = virtualRef.current.scrollTop;
      const fixedScrollTop = scrollTop - (scrollTop % 30);
      if (virtualContentRef.current) {
        virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
      }
      setStart(Math.floor(scrollTop / 30));
      setVisibleData(data.slice(start, start + visibleCount));
    }
  };

  return (
    <div
      className="virtual-list"
      style={{
        border: '1px solid #666',
        margin: 20,
        height: 400,
        overflow: 'auto',
        position: 'relative',
      }}
      ref={virtualRef}
      onScroll={onHandleScroll}
    >
      {/* 虚拟区 */}
      <div
        className="virtual-list-phantom"
        style={{ height: data.length * 30 + 'px' }}
      ></div>
      {/* 展示区 */}
      <div
        className="virtual-list-content"
        style={{ position: 'absolute', top: 0 }}
        ref={virtualContentRef}
      >
        {visibleData.map((item) => {
          return (
            <div
              className="virtual-list-item"
              style={{ height: 30 }}
              key={item.key}
            >
              {item.key}
              {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
```
