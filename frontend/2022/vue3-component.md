---
title: Vue3的组件注册
date: 2022/01/10
tags:
 - Vue
categories:
 - frontend
---


## 全局注册
1. 在main.js导入需要被注册的组件
```
import Componentname from './path'
```
2. 调用`app.component()`方法全局注册组件
```
Vue.component('my-component-name', { /* 配置参数 */ })
```

`Vue`为实例

## 局部注册
通过component节点，为当前的组件注册私有子组件
```
import ComponentName from './path'
export default {
	components:{
		'my-search':Search
	}
}
```
