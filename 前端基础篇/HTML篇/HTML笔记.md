# 									HTML基础

## 1、html标签语义化的优点

- HTML结构清晰

- 代码可读性强

- 有利于SEO优化，搜索引擎可根据标签的语言确定上下文和权重问题

- 移动设备能更完美的展示页面

  

## 2、盒模型

#### 标准盒模型

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/9535e767-6a38-4174-8974-8dc37ea6aec3.png)

> 在标准的盒子模型中，width指content部分的宽度
>
> 设置方式：box-sizing: content-box

#### IE盒模型

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/6dd6910f-baaa-4917-97b7-174ee0a4d6a3.png)

> 在IE盒子模型中，width表示content+padding+border这三个部分的宽度
>
> 设置方式：box-sizing:  border-box

## 3、重绘和回流（Repaint & Reflow）

#### 浏览器渲染机制

浏览器采用流式布局模型（Flow Based Layout） 浏览器会把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，DOM 和 CSSOM 合并就 产生了渲染树（Render Tree）。 有了 RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大 小和位置，最后把节点绘制到页面上。 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完 成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同 等元素的时间，这也是为什么要避免使用 table 布局的原因之一。 

#### 重绘 

由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为 重绘，例如 outline, visibility, color、background-color 等，重绘的代价是高昂的， 因为浏览器必须验证 DOM 树上其他节点元素的可见性。 

#### 回流 

回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键 因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的 回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素 的随后的回流。