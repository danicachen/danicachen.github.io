---
title: 使用栈的先进后出原则反转字符串
date: 2021/12/12
tags:
 - JavaScript
categories:
 - frontend
---

::: tip 参考资料：
- [07:48 js字符串常见算法](https://www.bilibili.com/video/BV1RQ4y1D7UC?p=7&spm_id_from=pageDriver)
::: 

### 创建空栈
```
function Stack(){
    this.data = []; //保存栈内元素
    this.top = 0; //记录栈顶（表层）位置
}
```

### 通过原型链增加入栈和出栈方法
```
Stack.prototype = {
    //入栈：先在栈顶加入元素，然后元素个数加1
    push:function push(element){
        this.data[this.top++] = element
    },
    //出栈：先返回栈顶的元素，然后元素个数减1
    pop:function pop(){
        return this.data[--this.top]
    }
    //返回栈内的元素
    length:function(){
        return this.top
    }
}
```

### 通过自定义函数调用栈，实现输出
```
function reverstring(str){
    //new 创建一个stack的实例
    var s = new Stack();
    var arr = s.split('');
    //用for循环进栈
    var len = arr.length;
    //将元素压入栈内
    for (var i = 0;i <len ;i++>){
        s.push(arr[i])
    }
    //输出逆转元素
    var result = ''
    for (var j = 0;j <len ;j++>){
        result += s.pop(j)
    }
    return result;
}
```