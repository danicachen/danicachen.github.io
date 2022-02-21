---
title: 递归
date: 2021/12/12
tags:
 - JavaScript
categories:
 - algorithm
---

1. 遍历循环 
```
function getMax(str){
  let json = {};
  for (let i = 0;i<str.length;i++){
    if (!json[str.charAt(i)]){
      json[str.charAt(i)] = 1;
    } else {
      json[str.charAt(i)]++;
    }
  }
  console.log(json)
  let maxNum = 0;
  let maxChar = '';
  for (let key in json){
  	if(json[key] > maxNum){
    	maxChar = key;
      maxNum = json[key];
    }
  }
  return maxChar+":"+maxNum
  
}


var str = "abscsalddfsjoswnfdaskl"


console.log(getMax(str))
```

2. 递归