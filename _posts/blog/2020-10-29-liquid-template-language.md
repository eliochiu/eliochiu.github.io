---
layout: "post"
title: "博客搭建问题记录"
subtitle: "用 Liquid Template Language 搭建博客时遇到的问题"
author: "roife"
date: 2020-10-29

tags: ["Liquid@Languages", "博客搭建@Tags"]
lang: zh
catalog: true
header-image: ""
header-style: text
---

# 常见问题

## 内容被当成语法解析

在使用 Liquid Template 写博客的时候, 经常会遇到的输入的大括号对 `{}` 被当成 Liquid Template 的语法解析了 (比如在 Verilog 中使用位拼接). 此时可以用 `raw` 标签包裹对应的内容防止被转义.

解决方案来自 [Stack Overflow: How to escape liquid template tags?](https://stackoverflow.com/a/57120464)

同时为了防止 `raw` 标签被其他引擎渲染, 可以将其用注释包裹, 即:

```liquid
{{ "<!-- {% raw " }}%} -->
{{ "{% this " }}%}
{{ "<!-- {% endraw " }}%} -->

<!-- 也可以用这种方案 -->
{{ '{{ ' }}"{{ '{% this' }} " }}%}
```

## 双关键字排序

Liquid Template 默认的 `sort` filter 只能进行单关键字排序, 而且使用两次 `sort` 并不能达到双关键字排序的效果.

解决方案来自 [Stack Overflow: Is there a way to sort lists in Jekyll by two fields?](https://stackoverflow.com/questions/45651759/is-there-a-way-to-sort-lists-in-jekyll-by-two-fields)

<!-- {% raw %} -->
```liquid
{%- assign _sorted_list = site.posts | group_by: 'date' -%}

{%- for _article_group in _sorted_list -%}
    {%- assign _article_list = _article_group.items | sort: 'title' -%}

    {%- for _article in _article_list -%}
        <!-- 主程序 -->
    {%- endfor -%}
{%- endfor -%}
```
<!-- {% endraw %} -->
