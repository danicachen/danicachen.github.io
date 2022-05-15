(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{599:function(t,e,r){"use strict";r.r(e);var a=r(15),l=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"title"},[t._v("参考资料：")]),r("ol",[r("li",[r("a",{attrs:{href:"https://blog.csdn.net/sunnnnh/article/details/118060361?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1.pc_relevant_default&utm_relevant_index=2",target:"_blank",rel:"noopener noreferrer"}},[t._v("在js中为什么0.1+0.2不等于0.3"),r("OutboundLink")],1),t._v("\n版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://www.bilibili.com/video/BV1RQ4y1D7UC?p=6&spm_id_from=pageDriver",target:"_blank",rel:"noopener noreferrer"}},[t._v("js变量的数据"),r("OutboundLink")],1),t._v(" 时间：05:13")])])]),r("ul",[r("li",[r("p",[t._v("在JS中为什么0.2+0.1>0.3?⭐⭐⭐⭐")])]),t._v(" "),r("li",[r("p",[t._v("答：")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("精简回答：根本原因是小数转换成2进制数据存储到计算机里面的时候会产生循环问题。截取之后的二进制数据进行相加之后，再转换成十进制，就变成了0.30000004")])]),t._v(" "),r("li",[r("p",[t._v("详细解释：在js中，浮点数是使用64位固定长度来表示的，最高位为符号位，11位用来表示指数位，剩下的52位表示尾数位。由于只有52位表示尾数位，而0.1转为二进制是一个无限循环数，所以会出现精度缺失。把0.1存到内存中再取出来转换成十进制就不是原来的0.1了，会变成0.100000000000000005551115123126。因而0.1+0.2先转换成二进制计算，计算结果取前52位，转换成十进制后就是结果大于0.3")]),t._v(" "),r("p",[t._v("参考：浮点数的小数位按照“乘2取整，顺序排列”的方法转换成二进制表示")])])])]),t._v(" "),r("li",[r("p",[t._v("那为什么0.2+0.3=0.5呢?")])]),t._v(" "),r("li",[r("p",[t._v("答：")]),t._v(" "),r("ul",[r("li",[t._v("因为0.2和0.3转换成二进制后尾位数都等于52位，相加又恰巧前52位尾数都是0，所以结果为0.1，等于十进制的0.5")])])]),t._v(" "),r("li",[r("p",[t._v("面试官：那既然0.1不是0.1了，为什么在console.log(0.1)的时候还是0.1呢?⭐⭐⭐")])]),t._v(" "),r("li",[r("p",[t._v("答：在console.log的时候会二进制转换为十进制，十进制再会转为字符串的形式，在转换的过程中发生了取近似值，所以打印出来的是一个近似值的字符串")])])]),t._v(" "),r("h2",{attrs:{id:"解决方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#解决方法"}},[t._v("#")]),t._v(" 解决方法")]),t._v(" "),r("h3",{attrs:{id:"方法一-通过程序自动判断有多少小数-扩大相应的倍数转换成整数-在完成整数运算后再除以扩大的数值-最后得到浮点数并返回"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#方法一-通过程序自动判断有多少小数-扩大相应的倍数转换成整数-在完成整数运算后再除以扩大的数值-最后得到浮点数并返回"}},[t._v("#")]),t._v(" 方法一：通过程序自动判断有多少小数，扩大相应的倍数转换成整数，在完成整数运算后再除以扩大的数值，最后得到浮点数并返回")]),t._v(" "),r("ul",[r("li",[t._v("缺陷：相乘的结果有可能超过")]),t._v(" "),r("li"),t._v(" "),r("li",[r("a",{attrs:{href:"https://juejin.cn/post/6844904066418491406#:~:text=%E5%A4%8D%E5%88%B6%E4%BB%A3%E7%A0%81-,12.%20JavaScript%E5%B0%8F%E6%95%B0%E7%B2%BE%E5%BA%A6%E8%AE%A1%E7%AE%97,-/**%0A%20*%20%E6%95%B0%E5%AD%97%E8%BF%90%E7%AE%97%EF%BC%88%E4%B8%BB%E8%A6%81",target:"_blank",rel:"noopener noreferrer"}},[t._v("12. JavaScript小数精度计算"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://www.jianshu.com/p/fe1ee2a94d96#:~:text=%E4%B8%80%E4%BD%8D%0A%20%20return%20res%3B%0A%7D-,%E4%BA%8C%E3%80%81%E5%B0%8F%E6%95%B0%E7%9B%B8%E5%8A%A0,-float%E5%9E%8B%E6%B5%AE",target:"_blank",rel:"noopener noreferrer"}},[t._v("小数相加"),r("OutboundLink")],1)])]),t._v(" "),r("h3",{attrs:{id:"方法二-通过引入库进行解决"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#方法二-通过引入库进行解决"}},[t._v("#")]),t._v(" 方法二：通过引入库进行解决")]),t._v(" "),r("p",[t._v("bignumber.js，decimal.js，以及big.js\nhttps://www.cnblogs.com/aurora-ql/p/14076481.html\nhttps://www.runoob.com/w3cnote/js-precision-problem-and-solution.html")])])}),[],!1,null,null,null);e.default=l.exports}}]);