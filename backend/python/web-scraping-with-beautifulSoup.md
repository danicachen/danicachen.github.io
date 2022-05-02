---
title: 如何利用python的BeautfulSoup库进行网页数据采集
date: 2022/03/14
tags:
 - 爬虫
categories:
 - python
---
## 准备工作
- python的基础语法可以参照阮一峰老师的[网站](https://www.liaoxuefeng.com/wiki/1016959663602400)
- [BeautifulSoup库的简介](https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/)
  - Beautiful Sou是一个可以从HTML或XML文件中提取数据的Python库。它能够通过你喜欢的转换器实现惯用的文档导航，查找，修改文档的方式。Beautiful Soup会帮你节省数小时甚至数天的工作时间。

### 1.导入BeautifulSoup 对象
    ```from bs4 import BeautifulSoup```

### 2.本地文档的情况
  - 2.1 
    ```
    soup = BeautifulSoup("markup.html", "html.parser")
    ```