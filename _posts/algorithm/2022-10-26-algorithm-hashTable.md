---
layout: "post"
title: "「算法」- 哈希表"
author: "eliochiu"
date: 2022-10-24

tags: ["算法@Tags", "哈希表@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
katex: true
---

## 哈希表简介
哈希表是一种使用哈希函数组织数据，以支持快速插入和搜索的数据结构。常用的哈希表分为两类：**哈希集合和哈希映射**，大多数语言(如C++、Java、Python)，均支持哈希集合与哈希映射。

### 哈希表的原理
哈希表的主要思想是利用哈希函数，将键值（*key*）映射到存储桶。当我们插入一个新的键时，哈希函数应当决定将该键分配到哪个存储桶中；当我们想要搜索一个键时，哈希表使用哈希函数来查找对应的存储桶，并返回存储桶中的结果。

### 哈希表常见操作
哈希表有两个最常见的操作：插入和查找，下列给出哈希表插入与查找的实例。

例如，我们设置哈希函数为$y = x \% 5$，则对于一组数据$[3, 7, 100, 2]$。
- 插入：根据哈希函数规则，`3`将被插入桶`3`， `7`将被插入桶`2`，以此类推。
- 查找：
  - 当我们要查询`100`时，根据哈希函数得到`100`在桶`0`中，返回桶`0`的数据。
  - 当我们要查询`6`时，`6`在桶`1`中，然而桶`1`并不存在数据，因此没有找到`6`。

### 哈希函数
哈希函数也被称为散列函数，他将键值映射到一个桶的索引，利用键值和哈希函数就可以计算出该键值所在的位置。

## 哈希集合
哈希集合是一种常见的数据结构，哈希集合中所有元素只能出现一次，它主要有`add`、`has`、`delete`等方法，JavaScript中有Set类可直接实现哈希集合。

### 设计哈希集合
不使用任何内建的哈希表库设计一个哈希集合（HashSet）。

实现`MyHashSet`类：

- `void add(key)`：向哈希集合中插入值`key`。
- `bool contains(key)`：返回哈希集合中是否存在这个值`key`。
- `void remove(key)`：将给定值`key`从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。


```js
var MyHashSet = function() {
    this.set = {};
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    if (this.set[key] === undefined) {
        this.set[key] = key;
    }
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    if (this.set[key] !== undefined) {
        delete this.set[key];
    }
};

/** 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    if (this.set[key] !== undefined) {
        return true;
    }
    return false;
};
```

### 哈希集合的应用
哈希集合因为其内元素的唯一性，常用来查重，例如：给定一个数组，判断其是否包含重复项。解决该题的思路是：简单迭代该数组并将其插入至哈希集，如有重复则判定为重复。

#### 存在重复元素
**给你一个整数数组`nums`。如果任一值在数组中出现至少两次，返回`true` ；如果数组中每个元素互不相同，返回`false`。**
```js
var containsDuplicate = function(nums) {
    let hashSet = new Set();
    for (num of nums) {
        if (hashSet.has(num)) {
            return true;
        } else {
            hashSet.add(num);
        }
    }
    return false;
};
```

#### 只出现一次的元素
**给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。**

该问题可用两种方法求解：位运算、哈希集合，其中法一具有$O(1)$的空间复杂度。

**法1：**
根据法则：$a \oplus a = 0,  a\oplus 0 = a$，只需将所有元素异或起来，就可求出唯一的那个元素。
```js
var singleNumber = function(nums) {
    let ans = 0;
    for (num of nums) {
        ans ^= num;
    }
    return ans;
};
```

**法2：**
迭代处理每一个元素，将其插入到哈希集合中。插入同时进行判断，如果集合中不存在该元素，就将其加入集合，否则就删除该元素，最终集合中只会剩下一个元素，就是我们要找的元素。
```js
var singleNumber = function(nums) {
    let visited = {};
    for (num of nums) {
        if (visited[num] === undefined) {
            visited[num] = num;
        } else {
            delete visited[num];
        }
    }
    return Object.keys(visited)[0];
};
```

#### 两个数组的交集
**给定两个数组`nums1`和`nums2` ，返回它们的交集。输出结果中的每个元素一定是唯一 的。我们可以不考虑输出结果的顺序 。**

基本思路：
- 将两个数组分别去重，转化成两个集合。
- 遍历其中一个集合的元素，判断该元素是否在另一集合中，如果存在，则该元素就是集合交集的元素。
- 返回交集数组。

```js
var intersection = function(nums1, nums2) {
    let ans = [];
    let set1 = new Set(nums1), set2 = new Set(nums2);
    for (num of set2) {
        if (set1.has(num)) {
            ans.push(num);  
        }
    }
    return ans;
};
```

#### 快乐数
**编写一个算法来判断一个数`n`是不是快乐数。**

**「快乐数」 定义为：**

- **对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。**
- **然后重复这个过程直到这个数变为`1`，也可能是无限循环但始终变不到`1`。**
- **如果这个过程结果为`1`，那么这个数就是快乐数。**
- **如果`n`是 快乐数就返回`true`；不是，则返回`false`。**

本题需要用哈希集合来记录计算过程中的每一个值，直至出现循环，或者结果出现1，则可以判定该数不为快乐数。

```js
var isHappy = function(n) {
    var hashSet = new Set();
    while (n !== 1 && !hashSet.has(n)) {
        hashSet.add(n);
        n = calc(n);
    }
    return n === 1;
};
// 计算每一位平方和的函数
var calc = function(n) {
    let ans = 0;
    while (n > 0) {
        ans += Math.pow(n % 10, 2);
        n = Math.floor(n / 10);
    }
    return ans
} 
```

## 哈希映射
哈希映射（*Hash Map*）用于存储键值对（*key-value*）,通过哈希映射，我们可以建立起键和信息之间的映射，键用于查询，值用于获取信息。

JavaScript中内置Map类用于实现哈希映射。主要有`get`、`delete`、`set`等方法。

### 设计哈希映射
不使用任何内建的哈希表库设计一个哈希映射（HashMap）。

实现 MyHashMap 类：

MyHashMap() 用空映射初始化对象
`void put(int key, int value)`：向HashMap插入一个键值对 `(key, value)` 。如果`key`已经存在于映射中，则更新其对应的值`value`。
`int get(int key)`：返回特定的`key`所映射的`value`；如果映射中不包含`key`的映射，返回`-1`。
`void remove(key)` 如果映射中存在`key`的映射，则移除`key`和它所对应的`value`。

```js
var MyHashMap = function() {
    this.map = {};
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    this.map[key] = value;
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    if (this.map[key] !== undefined) {
        return this.map[key];
    } else {
        return -1;
    }

};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    if (this.map[key] !== undefined) {
        delete this.map[key];
    }
};
```

### 哈希映射的应用  —— 提供更多信息
哈希映射的一个重要应用是：可以为我们提供更多信息。

#### 两数之和
**给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。**

**你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。**

**你可以按任意顺序返回答案。**

该题目主要考察哈希映射。将哈希映射的键设为元素，值为元素在数组中的索引，对数组元素进行迭代，每次都判断`target - nums[i]`是否存在哈希映射中：
- 若不存在，则将`{nums[i], i}`作为一组键值对存入哈希映射。
- 若存在，则匹配成功，判断该元素索引是否等于`target - nums[i]`的索引（通过哈希映射获得），如果索引不相等。说明找到了满足两数之和为`target`的两个数，他们的索引分别为`i`, `hashMap[target - nums[i]]`。

```js
var twoSum = function(nums, target) {
    let hashMap = new Map();
    for (i in nums) {
        if (!hashMap.has(nums[i])) {
            hashMap.set(nums[i], i);
        }
        if (hashMap.has(target - nums[i]) && hashMap.get(target - nums[i]) !== i) {
            return [hashMap.get(target - nums[i]), i]
        }
    }
    return [];
};
```

#### 同构字符串
**给定两个字符串 s 和 t ，判断它们是否是同构的。**

**如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。**

**每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。**

该题目主要考查哈希映射，利用两个字符串构造$s_1 \rightarrow s_2$的映射，来判断该映射是否为双射。判断双射的过程可以拆分为两个判断单射的问题。

```js
var isIsomorphic = function(s, t) {
    return isInjection(s, t) && isInjection(t, s);
};

// 判断是否为单射
var isInjection = function(s, t) {
    let hashMap = new Map();
    for (let i = 0; i < s.length; i++) {
        const c1 = s.charAt(i);
        const c2 = t.charAt(i);
        // 当前映射不存在，存入映射中
        if (hashMap.get(c1) === undefined) {
            hashMap.set(c1, c2); 
        // 当前映射存在且出现冲突
        } else if (hashMap.get(c1) !== -1 && hashMap.get(c1) !== c2) {
            return false;
        } 
    }
    // 不存在冲突
    return true;
}
```

#### 两个列表的最小索引总和
**假设 Andy 和 Doris 想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。**

**你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅。 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设答案总是存在。**

解决思路为：
- 遍历list1，得到list1的索引映射。
- 遍历list2，并判断当前元素是否存在于list1，若存在，则计算索引和并添加进索引和映射，同时更新最小索引的值。
- 遍历索引和映射，找出索引最小的组合。

```js
var findRestaurant = function(list1, list2) {
    // 建立list1的元素 -- 索引映射
    let indexMap = new Map();
    for (let i = 0; i < list1.length; i++) {
        indexMap.set(list1[i], i);
    }
    // 最小索引和
    let minIndexSum = Number.MAX_SAFE_INTEGER;
    // 建立串 -- 索引和映射
    let sumMap = new Map();
    // 遍历list2
    for(let i = 0; i < list2.length; i++) {
        const curItem = list2[i];
        if (indexMap.has(curItem)) {
            const currIndexSum = i + indexMap.get(curItem);
            // 添加索引和映射
            sumMap.set(curItem, currIndexSum);
            // 更新最小索引
            minIndexSum = Math.min(minIndexSum, currIndexSum);
        }
    }
    let ans = [];
    sumMap.forEach((value, key) => {
        if (value === minIndexSum) {
            ans.push(key);
        }
    });
    return ans;
};
```

### 哈希映射的应用  —— 按键聚合
哈希映射的另一个场景是按值聚合，常见的需求是：词频统计。

#### 字符串中的第一个唯一字符
**给定一个字符串`s` ，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回`-1` 。**

解决思路：
- 遍历`s`中的字符，用一个哈希映射统计频率。如果该字符未出现过，就将其加入映射，并将值设定为1；如果该字符出现，就更新频率。
- 再次遍历`s`中的字符，在哈希映射中查找频率，如果频率为1，返回该元素的索引。
- 如果未发现频率为1的元素，返回-1。

```js
var firstUniqChar = function(s) {
    let hashMap = new Map();
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (hashMap.has(c)) {
            let cnt = hashMap.get(c);
            hashMap.set(c, ++cnt);
        } else {
            hashMap.set(c, 1);
        }
    }
    for (let i = 0; i < s.length; i++) {
        const c1 = s.charAt(i);
        if (hashMap.get(c1) === 1) {
            return i;
        }
    }
    return -1;
};
```

#### 两个数组的交集II
**给你两个整数数组`nums1`和`nums2`，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。**

解决思路：
- 遍历nums1，建立元素-出现次数映射
- 遍历nums2，如果元素出现次数大于1，将该元素添加到交集中，并将出现次数减一。

```js
var intersect = function(nums1, nums2) {
    if(nums1.length < nums2.length) {
        return intersect(nums2, nums1);
    }

    let hashMap = new Map();
    let ans = [];

    for (num of nums1) {
        if (hashMap.has(num)) {
            const frequency = hashMap.get(num);
            hashMap.set(num, frequency + 1);
        } else {
            hashMap.set(num, 1);
        }
    }

    for (num of nums2) {
        if (hashMap.get(num) >= 1) {
            ans.push(num);
            hashMap.set(num, hashMap.get(num) - 1);
        }
    }

    return ans; 
}
```

#### 存在重复元素II
**给你一个整数数组`nums`和一个整数`k`，判断数组中是否存在两个不同的索引`i`和`j`，满足`nums[i] == nums[j]` 且`abs(i - j) <= k` 。如果存在，返回`true`；否则，返回`false`。**
```js
var containsNearbyDuplicate = function(nums, k) {
    let hashMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (hashMap.has(nums[i]) && i - hashMap.get(nums[i]) <= k) {
            return true;
        }
        hashMap.set(nums[i], i);
    }
    return false;
};
```

## 哈希键选取
上述的算法中，哈希键通常选取为元素，而在有些问题中，我们选取特定的哈希键。哈希键的选取元素很简单：按什么聚合就将其设置为键。

例如：
- 词频统计中，我们需要对单词列表按照单词聚合，则元素是键，频率是值
- 如果我们要将元素按照异位词的关系分组，则可以将字符串排列后的值当作键，字符串当作值。

####  字母异位词分组
**给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。**

**字母异位词是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。**

本题目中的键为字符串排列后的结果。

```js
var groupAnagrams = function(strs) {
    let hashMap = {};
    for (let s of strs) {
        const key = s.split("").sort().join("");
        if (hashMap[key] === undefined) {
            hashMap[key] = [s];
        } else {
            hashMap[key].push(s);
        }
    }
    return Object.values(hashMap);
};
```

#### 有效的数独
**请你判断一个`9x9`的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。**

- **数字`1-9`在每一行只能出现一次。**
- **数字`1-9`在每一列只能出现一次。**
- **数字`1-9`在每一个以粗实线分隔的`3x3`宫内只能出现一次。**

解题思路：
- 建立分别建立行、列、块的Map，行、列、块索引作为键，行、列、块集合作为值。
- 遍历整个矩阵，
```js
var isValidSudoku = function(board) {
    // 建立行、列、块的Map
    let rowMap = new Map(), colMap = new Map(), blockMap = new Map();
    for (i = 0; i < 9; i++) {
        rowMap.set(i, new Set());
        colMap.set(i, new Set());
        blockMap.set(i, new Set());
    }

    // 循环遍历矩阵 
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const curVal = board[i][j];
            const block = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (curVal === '.') {
                continue;
            }

            if (rowMap.get(i).has(curVal)) {
                return false;
            } else {
                rowMap.get(i).add(curVal);
            }

            if (colMap.get(j).has(curVal)) {
                return false;
            } else {
                colMap.get(j).add(curVal);
            }

            if (blockMap.get(block).has(curVal)) {
                return false;
            } else {
                blockMap.get(block).add(curVal);
            }
        }
    }
    return true;
};
```

#### 重复的子树
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    let hashMap = new Map();
    let res = [];
    const dfs = (root, res, hashMap) => {
        if (root === null) {
            return "";
        }
        let str = `${root.val}-${dfs(root.left, res, hashMap)}-${dfs(root.right, res, hashMap)}`;

        if (!hashMap.has(str)) {
            hashMap.set(str, 1);
        } else {
            hashMap.set(str, hashMap.get(str) + 1);
        }

        if (hashMap.get(str) === 2) {
            res.push(root);
        }
        
        return str;
    }

    dfs(root, res, hashMap);
    return res;
};
```


















 




