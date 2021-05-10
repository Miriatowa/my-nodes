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

## 6、使用css画三角形

#### 伪元素+定位：

使用伪元素相对自身元素定位，是boder的其中三边为透明其中一边为正常可得到对应的三角形

```html
//html代码
<div class='breadcrumb-title'>首页</div>
```

```css
//css代码
.breadcrumb-title{
	position: relative;
	text-align: center;
}
.breadcrumb-title::after{
    content: '';
	position: absolute;
	top: 40px;
	left: 60px;
	border-left: 12px solid transparent;
	border-right: 12px solid transparent;
	border-top: 12px solid #1890ff;
	border-bottom: 12px solid transparent;
}
```

## 7、css选择器优先级

！import  > inline  > id > class > tag >  *  >  inherit   > default

* !import:   优先级最高
* 行内：1000
* id选择器：100
* 类、伪类和属性选择器：10
* 类型选择器和伪元素选择器： 1
* 通配符、子选择器、相邻选择器： 0

同级别的后写的优先级高

## 8、三栏布局

左右固定宽度，中间自适应

#### 使用浮动（float）

```html
<style>
		.left{
			float: left;
			width: 300px;
			height: 100px;
			background-color: #631D9F;
		}
		.mid{
			margin-left: 300px;
			margin-right: 300px;
            height: 100px;
			background-color: #4990E2;
		}
		.right{
			float: right;
			width: 300px;
			height: 100px;
			background-color: #499012;;
		}
	</style>
	<body>
			<div class="left">左</div>
			<div class="right">右</div>
			<div class="mid">中</div>
	</body>
```

#### 使用定位（position）

```html
<style>
		.left{
			position: absolute;
			left: 0;
			width: 300px;
			height: 100px;
			background-color: #631D9F;
		}
		.mid{
			position: absolute;
			left: 300px;
			right: 300px;
			height: 100px;
			background-color: #4990E2;
		}
		.right{
			position: absolute;
			right:0;
			width: 300px;
			height: 100px;
			background-color: #499012;;
		}
	</style>
	<body>
			<div class="left">左</div>
			<div class="right">右</div>
			<div class="mid">中</div>
	</body>
```

#### 使用弹性布局（flex）

```html
<style>
		.main{
			display: flex;
		}
		.left{
			width: 300px;
			height: 100px;
			background-color: #631D9F;
		}
		.mid{
			flex: 1;
			height: 100px;
			background-color: #4990E2;
		}
		.right{
			width: 300px;
			height: 100px;
			background-color: #499012;;
		}
	</style>
	<body>
		<div class="main">
			<div class="left">左</div>
			<div class="mid">中</div>
			<div class="right">右</div>
		</div>
	</body>
```

## 9、css过渡和动画

#### 过渡

transition过渡将变化按照设置时间长度缓慢执行完毕

##### 属性

| 属性                                                         | 描述                                         | CSS  |
| :----------------------------------------------------------- | :------------------------------------------- | :--- |
| [transition](https://www.runoob.com/cssref/css3-pr-transition.html) | 简写属性，用于在一个属性中设置四个过渡属性。 | 3    |
| [transition-property](https://www.runoob.com/cssref/css3-pr-transition-property.html) | 规定应用过渡的 CSS 属性的名称。              | 3    |
| [transition-duration](https://www.runoob.com/cssref/css3-pr-transition-duration.html) | 定义过渡效果花费的时间。默认是 0。           | 3    |
| [transition-timing-function](https://www.runoob.com/cssref/css3-pr-transition-timing-function.html) | 规定过渡效果的时间曲线。默认是 "ease"。      | 3    |
| [transition-delay](https://www.runoob.com/cssref/css3-pr-transition-delay.html) | 规定过渡效果何时开始。默认是 0。             | 3    |

##### 局限性

* transition需要事件触发，所以没法在网页加载时自动发生
* transition是一次性的，不能重复发生，除非一再触发
* transition只能定义初始和结束状态，无法定义中间状态
* 一条translation规则，只能定义一个属性的变化，不能涉及多个属性

#### 动画

使用@keyframes 规则是创建动画，@keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。

##### 属性

| 属性                                                         | 描述                                                         | CSS  |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--- |
| [@keyframes](https://www.runoob.com/cssref/css3-pr-animation-keyframes.html) | 规定动画。                                                   | 3    |
| [animation](https://www.runoob.com/cssref/css3-pr-animation.html) | 所有动画属性的简写属性。                                     | 3    |
| [animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html) | 规定 @keyframes 动画的名称。                                 | 3    |
| [animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html) | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。             | 3    |
| [animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html) | 规定动画的速度曲线。默认是 "ease"。                          | 3    |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 | 3    |
| [animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html) | 规定动画何时开始。默认是 0。                                 | 3    |
| [animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html) | 规定动画被播放的次数。默认是 1。                             | 3    |
| [animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html) | 规定动画是否在下一周期逆向地播放。默认是 "normal"。          | 3    |
| [animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html) | 规定动画是否正在运行或暂停。默认是 "running"。               |      |

##### 示例

```css
.at_chest {
		position: absolute;
		width: 300rpx;
		height: 300rpx;
		left: 225rpx;
		top: 520rpx;
		animation: rotate .5s linear infinite;
	}

@keyframes rotate {
		0% {
			transform: translateY(0);
		}

		25% {
			transform: translateY(16rpx);
		}

		50% {
			transform: translateY(32rpx) scale(1.1, 0.9);

		}

		75% {
			ransform: translateY(16rpx);
		}

		100% {
			transform: translateY(0);
		}
	}
```

## 10、移动端适配方案

### @media + rem适配

@media媒体查询， 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面。采用@media + rem适配移动端还有一个不可少的条件就是要在head标签中写入一个meta标签。 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">

```css
//以下实例在屏幕可视窗口尺寸小于 600 像素时将 div 元素隐藏：
@media screen and (max-width: 600px) {
  div.example {
    display: none;
  }
}
```

### 手机淘宝 flexible.js适配

flexible.js也是rem适配的，它是将设备分成10份，1rem等于1/10

### vw,vh进行适配

vw:viewport width(可视窗口宽度)
vh:viewport height(可视窗口高度)
1vw等于1%的设备宽度(设计稿宽度)，1vh等于1%的设备高度(设计稿高度),这样看来vw,vh其它是最方便的，但是目前兼容性不是特别好

## 11、文本显示省略

#### 单行文本

```css
 overflow: hidden;  /*超出部分隐藏*/
 text-overflow:ellipsis; /* 超出部分显示省略号 */
 white-space: nowrap; /*规定段落中的文本不进行换行 */
```

#### 多行文本

> **-webkit-line-clamp**用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
> display: -webkit-box 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
> -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;

```

