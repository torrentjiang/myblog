---
toc: content
nav:
  title: 学习文档
  order: -1
group:
  title: js基础
  order: 1
title: 正则真的香
---

# 正则表达式从入门到精通 🐶

### 什么是正则？

正则表达式是匹配模式，**要么匹配字符，要么匹配位置**。

### 1. 匹配字符 - 入门

- 两种匹配模式

  - 精确匹配  
     `/hello/`
  - 模糊匹配
    - 横向 （一个正则可匹配的字符串的长度不是固定的）
      ```
          var regex = /ab{2,5}c/g;
          var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
          console.log( string.match(regex) );
          // => ["abbc", "abbbc", "abbbbc", "abbbbbc"]
      ```
    - 纵向 （某一位字符，它可以不是某个确定的字符）
      ```
          var regex = /a[123]b/g;
          var string = "a0b a1b a2b a3b a4b";
          console.log( string.match(regex) );
          // => ["a1b", "a2b", "a3b"]
      ```

- 字符组
  ```
  [1-9] [a-z] [A-Z]
  // 脱字符 ^
  [^abc]
  ```
  常见的字符组
  | 简写 | 全称 |
  | ---- | :-----------: |
  | \d | [0-9] |
  | \D | [^0-9] |
  | \w | [0-9a-zA-Z_] |
  | \W | [^0-9a-za-z_] |
  | \s | [\t\v\n\r\f] |
  | \S | [^\f\n\r\t\v] |
  | \b | 单词边界 |
  | \B | 非单词边界 |
  ```
   var str = "hello"
   /lo\b/
   /lo\B/
  ```
- 量词
  表示重复的次数

  - 常见的量词
    - `{m,}` m 次以上
    - `?` 0 次或着有 有吗？
    - `*` 0 次或任意次
    - `+` 至少有一次
  - 贪婪匹配和惰性匹配
    ```
        var str = '123456'
        /\d{2,5}/
        /\d{2,5}?/
    ```

- 分支结构
  分支符号`|`

  ```
      var str = 'goodbye'
      /good|goodbye/g
      /goodbye|good/g
  ```

  ps: 分支结构也是惰性的

- 栗子

  ```
  要求匹配16进制颜色值 #ffbbad #ddd
   /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/

  要求匹配 2022-07-22
  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

  要同时匹配 2022-07-22  2022/07/22
  ？

  ```

### 2. 匹配位置 - 小成

- 什么是位置？
  相邻字符串之间的位置

  ```
   h e l l o
  ↑ ↑ ↑ ↑ ↑ ↑
  ```

- 怎么匹配位置？
  锚字符 `^ $ \b \B (?=p) (?!p)`

  - `^` 开头
  - `$` 结尾

  ```
  字符串开头结尾添加字符
  var str = 'hello'
  'hello'.replace(/^|$/g,'#')
  => // #hello#
  ```

  - `\b` 空白字符
  - `\B`
  - `(?=p)` 其中 p 是一个子模式，即 p 前面的位置
    ```
    var result = "hello".replace(/(?=l)/g, '#');
    console.log(result);
    // => "he#l#lo"
    ```
  - `(?!p)`

- 位置特性
  可以把位置理解成空字符 ""
  且可以多个
  `"" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + "";`
  也可以写成
  `"" + "" + "hello"`

- 栗子

```
    要求把所有单子的首字母转化成大写 'my name is jtt'
    "my name is jtt".replace(/\b\w+\b/g, function(word){
        return word.substring(0,1).toUpperCase() + word.substring(1)
    });
    => // My Name Is Jtt
```

```
    要求把"12345678"，变成"12,345,678"
    /(?=\d{3}$)/g
    /(?=(\d{3})+$)/g
    匹配'123456789' ?
    匹配'123456789.123' ?
```

### 3. 正则分组 - 大成

- 括号分组

  1. 分组

  ```
      匹配连续出现的hello
      "hellohello abcd hellohello"
      /(hello)+/g
  ```

  2.改变优先级

  ```
      /^I love (you | me)$/
  ```

- 引用分组

  - 数据提取
  - 数据替换

  ```
      匹配yyyy-mm-dd
      /(\d{4})-(\d{2})-(\d{2})/
      '2022-07-22'.match(regex)
      => // ["2022-07-22", "2022", "07", "22", index: 0, input: "2022-07-22"]
      =>  console.log(RegExp.$1); // "2022"
          console.log(RegExp.$2); // "07"
          console.log(RegExp.$3); // "22"
  ```

  ```
      如何替换
      var regex = /(\d{4})-(\d{2})-(\d{2})/;
      var string = "2022-07-22";
      var result = string.replace(regex, function(match, year, month, day) {
          return month + "/" + day + "/" + year;
      });
      console.log(result);

  ```

- 反向引用

  ```
      var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/
      注意里面的\1，表示的引用之前的那个分组(-|\/|\.)。不管它匹配到什么（比如-），\1都匹配那个同样的具体某个字符。
  ```

### 4. 精通待研究...

拆分
回溯法

---

```
优先级(从高到低)
    1. 转义符 \
    2. 括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
    3. 量词限定符 {m}、{m,n}、{m,}、?、*、+
    4. 位置和序列 ^ 、$、 \元字符、 一般字符
    5. 分支符（竖杠）|
```
