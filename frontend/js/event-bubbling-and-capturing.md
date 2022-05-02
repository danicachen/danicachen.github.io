---
title: 事件冒泡与捕获
date: 2022/01/06
tags:
 - JavaScript
categories:
 - frontend
---
视频链接：https://www.youtube.com/watch?v=aVSf0b1jVKk&t=272s
1. What is Event Bubbling, Capturing, Trickling explained thoroughly
2. Which order are event handlers are called while Event Trickling & Bubbling?
3. How to Capture instead of Bubbling?
4. Demo of code to demonstrate each of them with examples
5. How to stop the propagation of events while Event bubbling and Capturing? 
- DOM 事件标准描述了事件传播的 3 个阶段：
  - 捕获阶段（Capturing phase）—— 事件（从 Window）向下走近元素。
  - 目标阶段（Target phase）—— 事件到达目标元素。
  - 冒泡阶段（Bubbling phase）—— 事件从元素上开始冒泡。

- [冒泡](https://zh.javascript.info/bubbling-and-capturing)（bubbling）：
  - 当一个事件发生在一个元素上，它会首先运行在该元素上的处理程序，然后运行其父元素上的处理程序，然后一直向上到其他祖先上的处理程序。这个过程被称为“冒泡（bubbling）”，因为事件从内部元素“冒泡”到所有父级，就像在水里的气泡一样。
- 捕获（capturing）
  - 
- 
- 