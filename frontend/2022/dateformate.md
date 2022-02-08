---
title: Vue中如何对时间进行格式化处理
date: 2022/01/10
tags:
 - Vue
categories:
 - frontend
---

## vue2
::: tip 参考资料：
- [P541 Vue3.0-26.综合案例 - 通过作用域插槽自定义创建时间的渲染格式](https://www.bilibili.com/video/BV1zq4y1p7ga?p=541&t=122.1)
- [过滤器](https://cn.vuejs.org/v2/guide/filters.html)
- [JavaScript Date 对象](https://www.runoob.com/jsref/jsref-obj-date.html)
::: 
### 步骤
1. 原始时间数据为`addtime`,在数据`addtime`后面添加管道符`|`和全局过滤器`dateFormat` 
```
{{ addtime | dateFormat }}
```

2. 在`main.js`入口文件中定义全局过滤器 `dateFormat`

```
Vue.filter('dataFormat',(dtStr)=>{
	//返回一个日期对象
	const dt = new Date(dtStr)
	
	const y = dt.getFullYear()
	const m = padZero(dt.getMonth() + 1)
	const d = padZero(dt.getDate())

	const hh = padZero(dt.getHours())
	const mm = padZero(dt.getMinutes())
	const ss = padZero(dt.getSeconds())
	
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

```

3. 声明补零函数，为不足两位数的时间数据补零
```
function padZero(n){
	n > 9 ? n : '0' + n
}
```

## vue3
::: tip 参考资料
- [vue3 通过计算属性代替 filter 过滤器实现时间格式化](https://www.mybj123.com/12885.html)
- [计算属性](https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)
::: 
### 步骤
1. 在`assets/js/`中声明一个`FormatDate`的函数，并导出
```
// 用于格式化时间

function formatDate(value, format) {
	//value: 需要格式化的数据
	//format: 指定格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(value);
	
	// 获取年份
	let year = date.getFullYear();
	if (/(y+)/.test(format)) {
	
	// 获取匹配组的内容
	let content = RegExp.$1;
	format = format.replace(content, year.toString().slice(4 - content.length));
	}

	let o = {

	// y: date.getFullYear(), // 用这一句也行，但只适用于四位数显示时候用
		
		M: date.getMonth() + 1,
		
		d: date.getDate(),
		
		h: date.getHours(),
		
		m: date.getMinutes(),
		
		s: date.getSeconds()
	
	};

	for (let key in o) {
	
		// 构造动态正则
	
		let reg = new RegExp(`(${key}+)`);
	
		if (reg.test(format)) {
		
			// 获取匹配组的内容

			let content = RegExp.$1;
			
			let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
			
			format = format.replace(content, k);
		
		}
	
	}

	return format;

}

export default formatDate

```

2. 在使用组件页面中导入此js模块 
`import formatDate from '@/assets/js/FormatDate'`
3. 在使用组件的`computed`节点中调用此函数

```
computed:{

	formatDate(){
	
	return formatDate
	
	}

},

```

4. 在需要渲染处使用计算属性
```
{{ formatDate(scope.row.addtime, "yyyy-mm-dd hh:MM:ss") }}

```