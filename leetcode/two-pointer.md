---
title: 双指针
date: 2022/05/04
tags:
 - 算法
categories:
 - leetcode
---
::: tip 参考资料：
[Two Pointer Approach - CP TacTics | Two Sum Problem | The Code Mate](https://www.youtube.com/watch?v=ymKrGndnTis) 
:::
## 双指针的应用场面
通常用在有序的数组和链表结构上
1. 相反方向的对撞指针：头尾开始，中间相遇，两数之和
2. 相同方向的快慢指针：从头或者尾开始，两个指针有属于自己的速度
   
## 双指针的关键
- 两个指针的定义
- 指针初始化
- 指针改变的条件和方向

## 使用双指针的好处
用暴力破解时，内外循环下，时间复杂度为O(n^2)；用双指针，不仅时间复杂度降为O(N)，也不需要额外空间。
我们以[leetcode167](#167)为例，先来思考暴力破解的过程。

## 相关题目
### <h3 id="167">[167 两数之和](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)</h3>
> 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。
以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。
你所设计的解决方案必须只使用常量级的额外空间。

- 暴力破解:外循环追踪第一个元素，内循环追踪数组里剩下的元素，第一个元素与剩下元素一一组对相加，若两元素相加不等于目标值，则更新外循环，追踪第二个元素，计算第二个元素与剩下元素一一相加的值。重复以上过程，直至找到相加等于目标值的两元素。
```mermaid
flowchart TB
A[开始]-->B[输入数组arr和目标值target,i=0]
B-->C{i < arr.length}
C-->|yes|F[j=i+1]-->D{ j < arr.length} 
C-->|no|Z["let arr=[i+1,j+1] return arr"]
D-->|yes|E{"arr[i] + arr[j]===target"}
D-->|no|H[i++]-->C
E-->|yes|Z
E-->|no|G[j++]-->D
```
![双指针之暴力破解](/img/双指针之暴力破解.png)
```
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    for(let i = 0;i<numbers.length;i++){
        for(let j = i+1;j<numbers.length;j++){
           if(numbers[i]+numbers[j]=== target){
              let arr = [i+1,j+1]
                return arr
            }
        }
    }
    
};
```

- 碰撞指针:前指针追踪头部元素x，后指针追踪尾部元素y，如果x+y==target，搜索完毕。
因为数组为有序数组，所以 x+y < target时,应继续向右移动前指针。
x+y>target，说明 x+ y以后 的元素都大于target，此时应保持x不变，后指针向左移动。

```mermaid
flowchart TB
A[开始]-->B[输入数组arr和目标值target]
B-->C[i = 0, j = arr.length-1]
C-->D{i < j}
D-->|yes|E["arr[i] + arr[j]"]
D-->|no|N[return -1]
E-->|==target|F[return i,j]
E-->|<target|G[i+=1]-->D
E-->|>target|H["j-=1"]-->D
```
![双指针之前后指针](/img/双指针之前后指针.png)
```
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let i = 0,j=numbers.length -1;
    while(i<j){
        if(numbers[i] + numbers[j] === target){
            break
        }else if(numbers[i]+numbers[j]>target){
            j-=1
        }else{
            i+=1
        }
    }
    
    let arr = [i+1,j+1]
    return arr
};
```

### <h3 id="189">[189 轮转数组](https://leetcode.cn/problems/rotate-array/submissions/)</h3>
> 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
- 官方解法：先把整个数组翻转过来，然后以k为界，左边和右边分别再进行翻转。
- 注意点：
  - 最初我无视了k>数组长度的情况。实际上当k>数组长度时，前k次可以忽略不计，最终我们移动次数为k%数组长度次。
  - 三次反转，实质上都会用到js的解构赋值，``` [a, b] = [b, a]; ``` 来实现交换变量，但写完之后，发现并没有用到双指针的思想
  - 
```
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var ratotaArray = function(nums,i,j){
    while(i<j){
        [nums[i],nums[j]] = [nums[j],nums[i]];
            i++;
            j--;
    }
}
var rotate = function(nums, k) {
    let i = 0, j=nums.length-1;
    k> nums.length ? z = k%nums.length : z=k;
    if(j>0){
        ratotaArray(nums,i,j)
        ratotaArray(nums,0,z-1)
        ratotaArray(nums,z,j)
    }
    return nums
};
```
### <h3 id="283">[283 移动零](https://leetcode.cn/problems/move-zeroes/)</h3>
> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。
- 解题思路：这题用双指针解解很容易跟嵌套循环混淆。我开始的解题思路是用非零元素跟与之最近的零元素交换。写了三个钟都没写出来，后来决定用单个指针j跟踪非零元素：如果遇到非零元素，从左到右开始覆盖写入。遍历数组后，length-j后应该全部为0，补零后即可得到正确的数组。
```
/**
var moveZeroes = function(nums) {
  let j=0;  
  for(let i = 0;i<nums.length;i++){
      if(nums[i] != 0){
          nums[j] = nums[i];
          j++ 
      }
  }
  while(j<nums.length){
      nums[j] = 0;
      j++
  }
}
```
![移动零](/img/removezero.png)