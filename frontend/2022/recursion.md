---
title: 递归
date: 2021/12/12
tags:
 - JavaScript
categories:
 - Algorithm
---
::: tip 参考资料：
1. [js递归算法](https://www.bilibili.com/video/BV1RQ4y1D7UC?p=8&spm_id_from=pageDriver) 时间：35:10
::: 

## 用递归实现字符串反转
- **charAt()** 方法从一个字符串中返回指定的字符。
> str.charAt(index)
- 字符串
    `var str = 'abcdefg'`
- 反转字符串
    `reverseString(str)`
- 递推关系
    `sortReverse = reverseString.charAt(str.length--)`

```
    //len是动态长度，不是str原本的长度
    function reverseString(str,len,strOut){
        if (len < 0){
            return strOut;
        }
        //str没变，改变charAt索引继续从后往前拿字符
        strOut += str.charAt(len--)
        //每次操作完之后len长度减1，函数内部数据变换
        return reverseString(str,len,strOut);
    }
    var str = 'abc'
    //因为charAt接收的是下标，所以str.length要减1
    reverseString(str,str.length-1,result)
    var result = '';

    console.log(reverseString(str,str.length-1,result))
```