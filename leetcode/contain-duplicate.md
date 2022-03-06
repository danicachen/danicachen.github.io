---

title: 哈希表关联

date: 2022/03/05

tags:

- leetcode

categories:

- 算法

---
之前一直不懂哈希表是什么，弄懂之后才知道js里的set和map都可以实现哈希表结构。Hash map特点是一个key对应一个value，不会有重复的元素。Map储存key-value，适合用于二维数组，Set只存储key，适合用于一维数组。
  

## 关联题目：
- 242 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/
- 217 存在重复元素 https://leetcode-cn.com/problems/contains-duplicate/
- 136 只出现一次的数字 https://leetcode-cn.com/problems/single-number/

- 136解题思路
  1. 用Set来实现哈希表
    ```
    /**
    * @param {number[]} nums
    * @return {number}
    */
    var singleNumber = function(nums) {
        let list = new Set();
        for(let i = 0;i<nums.length;i++){
            if(!list.has(nums[i])){
                list.add(nums[i])
            }else{
                list.delete(nums[i])
            }
        }
        return list.values().next().value;
    };
    ```
   
- 242解题思路
  1. 转换成数组，排序后恢复成字符串，然后判断两个字符串是否全等
    ```
        /**
         * @param {string} s
         * @param {string} t
         * @return {boolean}
         */
        var isAnagram = function(s, t) {
            return s.split('').sort().join('') === t.split('').sort().join('')
        }
    ```


- 217解题思路
	1. 利用ES6中**Set没有重复key**的特性

		 - 用set和array的长度进行比较
		
            ```
            /**

                * @param {number[]} nums
                
                * @return {boolean}
                
            */
                
                var containsDuplicate = function(nums) {
                
                    let filterlist =new Set(nums);
                
                    return (filterlist.size === nums.length ? false:true);
                
                };
            ```
        - 我的return语句有点啰嗦，看了一下评论区，因为题目是存在重复的话返回true，所以比起===应该用！==来判断，这样就不需要调换true和false的位置。
            ```
            var containsDuplicate = function(nums) {
            
                return (new Set(nums).size) !== nums.length
            
            };
            ```

        - 把set转换成array再进行比较，似乎跟上面的方法大差不差，但更好理解
	
            ```
                /**
                * @param {number[]} nums
                * @return {boolean}
                */
                
                var containsDuplicate = function(nums) {
                
                    let filterlist =[...new Set(nums)];
                
                    return filterlist.length !== nums.length;
                
                };
            ```

	2. 用遍历暴力破解，因为循环条件是我的弱项，所以还是来写一下。
    思路是创建一个空数组，遍历原数组，把第一次取到的值作为key存到空数组里，在接下来的遍历中，比较取到的值是否为已存在的key，如果发现key已存在的话结束遍历，否则遍历直到尾部。这个方法显然耗时是比较长的。

            ``` 
            /**
                * @param {number[]} nums
                * @return {boolean}
                */
                var containsDuplicate = function(nums) {
                    let newArr = [];
                    for(let i = 0;i<nums.length;i++){
                        if(newArr[nums[i]]){
                            return true;
                        }else{
                            newArr[nums[i]] = true
                        }
                    }
                    return false;
                };

            ```
    