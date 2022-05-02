---
title: Math()对象
date: 2022/02/18
tags:
 - JavaScript
categories:
 - frontend
---

### Math.floor()

### Math.ceil()

### Math.random()
#### 写一个概率为1/2的函数
```
let randomSuccess = () => {
 let num = Math.random();
 if (num < .5 ){
   return true;
 } else {
   return false;
 }
};
```