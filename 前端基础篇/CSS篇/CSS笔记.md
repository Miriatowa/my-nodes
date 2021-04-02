# 										前端学习之CSS

## 1、什么是BFC？

BFC（Block Formating Context）:块级格式化上下文，是页面盒模型布局中的一种CSS渲染模式，形成独立的渲染区域，内部元素的渲染不会影响外界

#### 创建BFC的方式：

* html根元素
* float不是none
* position是absolute或fixed
* overflow不为visiable
* display为flex或者table-ceil

#### BFC的主要作用：

* 清除浮动
* 防止同一BFC容器中的相邻元素间的外边距重叠问题

## 2、flex布局

flex：是flex-grow和flex-shrink、flex-basis的简写，默认值是0 1 auto

> flex-grow属性：定义项目的放大比例，即使存在空间也不会放大
>
> flex-shrink属性：定义项目的缩小比例，当空间不足的情况下会等比例的缩小
>
> flex-basis属性：定义再分配多余的空间，项目占据的空间

## 3、元素水平、垂直居中的方法

* 块级元素：margin：auto    文本元素： text-align：centert；line-height： 父元素高度

* 表格布局

  ```
  display： table-cell
  vertical-align：center
  text-align：center
  ```

* 弹性布局

  ```
  display：flex
  justify-content: center
  align-items: center
  ```

  

* 定位

  ```
  position: fiexed
  left: 50%
  top: 50%
  transform: translate(-50%, -50%) 
  ```

  

## 4、清除浮动

* 使用带clear属性的空元素

  > 在浮动元素后使用一个空元素如<div class='clear'></div>,并在css中赋予clear：{clear：both}属性清理浮动

* 使用CSS的overflow属性

  > 给浮动元素的容器添加overflow：hidden或者overflow：auto清除浮动

* 使用 :after 伪元素

  > 给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个：after伪元素实现元素末尾添加一个看不见的元素清理浮动

* 使用邻接元素处理

  > 给浮动元素后面的元素添加clear属性

## 5、重排（reflow）和重绘（repaint）

DOM的变化影响到了预算内的几何属性比如：宽高，浏览器重新计算元素的几何属性，其它元素的几何属性不会受到影响，浏览器需要重新构造渲染数，称之为**重排**。浏览器将受到影响的部分重新绘制在屏幕上的过程称之为**重绘**。

| 常见引起重绘属性和方法 |                  |                     |                   |
| :--------------------- | :--------------- | :------------------ | :---------------- |
| color                  | border-style     | visibility          | background        |
| text-decoration        | background-image | background-position | background-repeat |
| outline-color          | outline          | outline-style       | border-radius     |
| outline-width          | box-shadow       | background-size     |                   |

| 常见引起重排属性和方法  |                          |                    |            |
| :---------------------- | :----------------------- | :----------------- | :--------- |
| width                   | height                   | margin             | padding    |
| display                 | border                   | position           | overflow   |
| clientWidth             | clientHeight             | clientTop          | clientLeft |
| offsetWidth             | offsetHeight             | offsetTop          | offsetLeft |
| scrollWidth             | scrollHeight             | scrollTop          | scrollLeft |
| scrollIntoView()        | scrollTo()               | getComputedStyle() |            |
| getBoundingClientRect() | scrollIntoViewIfNeeded() |                    |            |

