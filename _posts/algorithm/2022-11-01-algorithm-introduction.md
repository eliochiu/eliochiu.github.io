---
layout: "post"
title: "「算法」- 简介"
author: "eliochiu"
date: 2022-11-01

tags: ["算法@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

算法，就是任何良定义的计算过程。

## 插入排序
输入：$n$个数的序列$< a_1, a_2, a_3 ,...a_n >$

输出：序列的一个排序$< a_1\prime, a_2\prime, ... ,a_n\prime$，满足$a_i\prime >= a_{i-1}\prime$

插入排序是一种有效的排序算法，遍历序列元素，当到达`a[i]`时，将`a[i]`插入到`<a[0] ~ a[i - 1]>`中，代码实现如下（JavaScript实现）：
```js
function insertSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    for (j = i - 1; j > 0 && nums[j] > key; j--) {
      nums[j + 1] = nums[j];
    }
    nums[j + 1] = key;
  }
  return nums;
}

const nums = [-1, -100, 2, 44, 0, 9, 188];
console.log(insertSort(nums));
```