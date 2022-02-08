---
title: 关于不能把less安装为依赖（dependency）
date: 2022/01/04
tags:
 - Vue
 - less
categories:
 - frontend
---


这个问题在vite的github上也有被报告过 [issues #826](https://github.com/vitejs/vite/issues/826#/)

以下为官方回答的原文：

> The `less` should place inside `devDependencies` instead of `dependencies`, because `vite` will optimized the package comes from `dependencies`.

翻译过来就是，开发者应该把less安装在devDependencies而不是dependencies，因为vite会优化dependencies下的包。而less作为一个预处理器，属于开发依赖，不应该被提前打包，所以应该装在devDependencies下。

而作者[尤雨溪](https://www.zhihu.com/people/evanyou)，尤大也有在知乎就vite的预优化问题进行过[解释](https://www.zhihu.com/pin/1244577301163106304#/)

> Vite 0.15 现在启动时会自动分析依赖进行一次预优化，把没有提供 esm 格式的依赖和内部有大量模块的依赖提前打包，减少开发时 es import 的请求数量，解决 es import 在开发中的主要软肋（请求多了影响页面 reload 速度）。

