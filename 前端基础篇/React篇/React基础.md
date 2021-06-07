# 前端学习之React

## 1、react和vue的区别

* react的整体思路是函数式编程，推崇纯组件，数据不可变，单向数据流。而vue是数据可变的，双向绑定，声明式编程
* react的思想是`all in js`,采用的jsx语法，通过js生成html或者操作css。vue采用模板引擎，可以把html、css、js写到一个文件
* react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些。
* 在**超大量数据的首屏渲染速度**上，React 有一定优势，因为 Vue 的渲染机制启动时候要做的工作比较多，而且 React 支持服务端渲染。

## 2、react的虚拟dom

虚拟DOM（**VDOM**）是真实DOM在内存中的表示。UI的表示形式保存在内存中，并与实际的DOM同步。这是一个发生在渲染函数被调用和元素在屏幕上显示之间的步骤，整个过程被称为**调和**



## 3、类组件和函数组件之间的区别

* 类组件可以使用其他特性，如状态state和生命周期钩子
* 当组件只是接收props渲染到页面时，就是无状态组件，就属于函数组件，也被称为展示组件

函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可，为了提高性能，尽量使用函数组件。

| 区别            | 函数组件 | 类组件 |
| --------------- | -------- | ------ |
| 是否有this      | 没有     | 有     |
| 是否有生命周期  | 没有     | 有     |
| 是否有状态state | 没有     | 有     |



## 4、React中的refs

`REFS`提供一种访问在`render`方法中创建的DOM节点或Rect元素的方法。在典型的数据流中，props是父子组件交互的唯一方式，想要修改子组件，需要使用新的props重新渲染它。凡是有例外，某些情况下我们需要在典型数据流外，强制修改子代，这个时候可以使用Refs。



## 5、state和props的区别

`props`和`state`是普通的js对象。虽然它们都包含影响渲染输出的信息，但是它们载组件方面的功能不同。

* state是组件自己管理数据，控制自己的状态，可变
* props是外部传入的数据参数，不可变
* 没有state的叫做无状态组件，有state的叫做有状态组件
* 多用props，少用state，也就是多写无状态组件



## 6、React中的高阶组件

`高阶组件(HOC)`是接收一个组件并返回一个新组件的函数。基本上，这是一个模式，是从React的组合特性中衍生出来的，称其为纯组件，因为它们可以接收任何动态提供的子组件，但不会修改或复制输入组件的任何行为

```
EnhancedComponent = higherOrderCompinent(WrappedComponent)
```

HOC可以用于：

* 代码重用、逻辑和引导抽象

* 渲染劫持

* state抽象和操作

* props处理

  

## 7、React的生命周期

* `componentsWillMount`：在渲染之前执行，用于跟组件中的App配置
* `componentDidMount`：在第一次渲染之后执行，可以再这里做AJAX请求，DOM的操作或状态更新以及设置事件监听器
* `componentWillReceiveProps`：在初始化render的时候不会执行，它会在组件接受到新的状态时被触发。一般用于父组件状态更新时组件的重新渲染
* `shouldComponentUpdate`：确定是否更新组件。默认情况下，他返回true。如果确定在state或props更新后组件不需要再重新渲染，则返回false，这是一个高性能方法
* `componentWillUpdate`：在shouldComponentUpdate返回true需要更新组件之前执行
* `componentDidUpdate`：它主要用于更新DOM以响应props或state更改
* `componentWillUnmount`：它用于取消任何的网络请求，或删除与组件关联的所有事件监听

## 8、React的setState

#### setState异步情况：

在组件生命周期或React合成事件中，setState是异步

* setState设计为异步，可以显著的提升性能
  * 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁地调用，界面重新渲染，这样效率很低
  * 最好的办法应该是获取到多个更新，之后进行批量更新

* 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步
  * state和props不能保持一致性，会在开发中产生很多问题

#### setState同步的情况

在setTimeout或者原生dom事件中，setState是同步