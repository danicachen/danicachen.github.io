---
title: 二分查找
date: 2022/05/02
tags:
 - 算法
categories:
 - leetcode
---
::: tip 参考资料：
1. [二分查找有几种写法？它们的区别是什么？](https://www.zhihu.com/question/36132386) 
::: 

## 何为二分查找
将搜索区间以中位值为界，划分成两个区间。然后将中位值与目标值做比较，如果中位值比目标值大，即目标值处于左区间，缩小右边界；若中位值比目标值小，即目标处于右区间，缩小左边界。继续重复第一步，将新的搜索区间以新的中位值为界，划分成两个区间。

```
@flowstart
st=>start: Start
i=>inputoutput: 输入数组与查找目标值
op=>operation: 计算中位值mid
cond=>condition: 左右边界未重叠
                right > left 
cond2=>condition: 目标值是否落在左区间
target < mid
op1=>operation: 缩小右区间边界至mid+1
right=mid+1
op2=>operation:  缩小左区间边界至mid
left=mid
sub2=>subroutine: 返回left值（重叠边界），为查找值
e=>end: 结束

st->i->op->cond
cond(no,left)->sub2->e
cond(yes,bottom)->cond2
cond2(no, left)->op2->cond(right)
cond2(yes, bottom)->op1->cond
@flowend
```


## 各步骤注意点
1. 明确左右界限和中间值
first为0，last为length（因为区间为左闭右开，即实际搜索范围为lenght-1）
中间值为first + （last-first）/2   
2. 在左右区间不重叠的循环条件内将目标值与中位值作比较
3. 根据比较结果缩小边界范围
 - 目标值等于中间值：查找结束，返回中间值下标
 - 目标值小于中间值：mid 变为新的right边界（右开，mid值未检查，即不在搜索区间）
 - 目标值大于中间值：mid+1 变为新的left边界（因为左闭，mid值已经检查过）
4. 直至左右边界重叠
左右边界重叠，说明数组里的所有元素已经比较完毕。

## 相关题目
- [704](https://leetcode-cn.com/problems/binary-search)
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

- [278](https://leetcode-cn.com/problems/first-bad-version/)
你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
leetcode思路：
具体地，将左右边界分别初始化为 1 和 n，其中 n 是给定的版本数量。设定左右边界之后，每次我们都依据左右边界找到其中间的版本，检查其是否为正确版本。如果该版本为正确版本，那么第一个错误的版本必然位于该版本的右侧，我们缩紧左边界；否则第一个错误的版本必然位于该版本及该版本的左侧，我们缩紧右边界。

这样我们每判断一次都可以缩紧一次边界，而每次缩紧时两边界距离将变为原来的一半，因此我们至多只需要缩紧 O(\log n)O(logn) 次。

- [35](https://leetcode-cn.com/problems/search-insert-position)
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
请必须使用时间复杂度为 O(log n) 的算法。

