# react源码解读

## 1. 组件的渲染

### 1.1 渲染过程

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/23b83406-6fe0-4c23-8eab-012d1472b3fa.png" alt="image-20210813085745862" style="zoom: 67%;" />

### 1.2 手写简化版react、react-dom

```javascript
//react.js

import Component from './Component'
import {wrapToVdom} from '../utils/index'
function createElement(type, config, children){
    const props = {...config}
    if(arguments.length >3){
        children =  Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    }
    props.children = wrapToVdom(children) 
    return {
        type,
        props
    }
}

const React = {
    createElement,
    Component
}
export default React
```

```javascript
import { REACT_TEXT } from "../utils/consants"

// 把虚拟dom挂载到父容器
function render(vdom, container){
    let realDom = createDOM(vdom)
    container.appendChild(realDom)
}

// 把虚拟dom渲染成dom
export function createDOM(vdom){
    let {type, props} = vdom
    let domNode;
    if(type === REACT_TEXT){
        domNode = document.createTextNode(props.content)
    }else if(typeof type === "function"){
        if(type.isComponent){
            return mountClassComponent(vdom)
        }else{
            return mountFunctionComponent(vdom)
        }
        
    }else{
        domNode = document.createElement(type)
    }
    if(props){
        // 根据虚拟donm中的属性更新真实dom
        updateProps(domNode,{}, props)
        if(typeof props.children == 'object' && props.children.type){
            render(props.children, domNode)
        }else if(Array.isArray(props.children)){
            reconcileChildren(props.children, domNode)
        }
    }
    vdom.dom = domNode
    return domNode
}
//挂载类组件
function  mountClassComponent(vdom){
    let {type, props} = vdom;
    let classInstance = new type(props)
    let renderVdom = classInstance.render();
    const dom = createDOM(renderVdom)
    // vdom[oldRenderVdom] = renderVdom
    classInstance.oldRenderVdom  = renderVdom
    return dom
}
//挂载函数组件
function  mountFunctionComponent(vdom){
    let {type, props} = vdom;
    let renderVdom = type(props);
    // vdom[oldRenderVdom] = renderVdom
    return createDOM(renderVdom)
}
//渲染childrn节点
function reconcileChildren(childrenVdom, parentDom){
    for(let i=0;i< childrenVdom.length;i++){
        let childVdom = childrenVdom[i];
        render(childVdom, parentDom)
    }
}
// 更新属性
function updateProps(dom, oldProps, newProps) {
    for(let key in newProps){
        if(key === 'children'){
            continue
        }else if(key === "style"){
            let styleObj = newProps[key]
            for(let attr in styleObj){
                dom.style[attr] = styleObj[attr]
            }
        }else if(key.startsWith("on")){
            dom[key.toLocaleLowerCase()] = newProps[key]
        }
        else{
            dom[key] = newProps[key]
        }
    }
}
export function findDOM(vdom){
    let {type} = vdom;
    let dom;
    if(typeof type === 'function'){
        dom = findDOM(vdom.oldRenderVdom)
    }else{
        dom = vdom.dom
    }
    return dom;
}
export function compareTwoVdom(parentDOM, oldVdom, newVdom){
    let oldDOM = findDOM(oldVdom)
    let newDOM = createDOM(newVdom)
    parentDOM.replaceChild(newDOM, oldDOM)
}


const ReactDom = {
    render
}
export default ReactDom
```

## 2. 组件的状态

* 组件数据源只有两个，一个是父组件传给子组件(单向数据源，不可修改)，一个是内部初始化（通过setState修改）
* 属性和状态都可以影响视图，改变会引起视图更新

```js
import{findDOM, compareTwoVdom} from './react-dom'
class Updater{
    constructor(classInstance){
        this.classInstance = classInstance;
        this.pendingState = [];
        this.callback = [];
    }
    addState(partialSate, callback){
        this.pendingState.push(partialSate)
        if(typeof callback === 'function'){
            this.callback.push(callback)
        }
         //触发更新
         this.emitUpdate()
    }
    emitUpdate(){
        this.updateComponent()
    }
    updateComponent(){
        let {classInstance, pendingState} = this
        if(pendingState.length > 0){
            shouldUpdate(classInstance, this.getState())
        }
    }
    // 根据老状态和pending和states这个更新队列，计算新状态
    getState(){
        let {classInstance, pendingState} = this
        let {state} = classInstance
        pendingState.forEach(item => {
            if(typeof item === 'function'){
                state =  item(state)
            }
            state = {...state,...item}
        })
        pendingState.length = 0;
        this.callback.forEach(callback => callback())
        this.callback.length = 0
        return state
    }
}
function shouldUpdate(classInstance, newState){
    classInstance.state = newState
    classInstance.forceUpdate()
}


class Component {
    static isComponent = true
    constructor(props){
        this.props = props;
        this.state = {}
        this.updater = new Updater(this)
    };
    setState(partialSate, callback){
        this.updater.addState(partialSate, callback)
    }
    /**
     * 组件更新：
     * 1. 获取老的虚拟dom react元素
     * 2. 根据最新的属性和状态计算新的虚拟dom
     * 3、比较，查找差异，然后把这些差异同步化
     */
    forceUpdate(){
        let oldRnderVdom = this.oldRenderVdom
        let oldDOM= findDOM(oldRnderVdom)
        let newRenderVdom = this.render()
        compareTwoVdom(oldDOM.parentNode, oldRnderVdom, newRenderVdom)
        this.oldRnderVdom = newRenderVdom
    }
}
export default Component;
```

## 3. 事件的处理

### 3.1 批量更新state

#### setState批量更新情况：

在组件生命周期或React合成事件中，setState是异步

* setState设计为异步，可以显著的提升性能
  * 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁地调用，界面重新渲染，这样效率很低
  * 最好的办法应该是获取到多个更新，之后进行批量更新

* 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步
  * state和props不能保持一致性，会在开发中产生很多问题

#### setState同步的情况

在setTimeout或者原生dom事件中，setState是同步.在事件处理函数和生命周期函数中是批量更新的

### 3.2 Ref

* Refs提供一种方式，允许我们访问DOM节点或在render方法创建的元素
* 在react渲染生命周期时，表单元素上的value将会覆盖DOM节点的值；

#### 3.2.1 给元素添加ref

```js
class Wecome extends React.Component{
  constructor(){
    super()
    this.state = {number: 0}
    this.inputRef = React.createRef()
  }
  handleClick = () => {
    // debugger
    console.log(this.inputRef.current.value);
  }
  render(){
     return (
       <div>
         <input ref={this.state.inputRef}></input>
         <button onClick={this.handleClick}>ref按钮</button>
       </div>
     )
  }
}
```

#### 3.2.3 实现ref

```js
//挂载类组件
function  mountClassComponent(vdom){
    let {type, props, ref} = vdom;
    let classInstance = new type(props)
    let renderVdom = classInstance.render();
    const dom = createDOM(renderVdom)
    // 把react的current指向组件虚拟dom
    if(!!ref){
        ref.current = classInstance
    }
    classInstance.oldRenderVdom  = renderVdom
    return dom
}
```



```js
// Ref方法
function createRef(){
    return {current: null}
}
// forwardRef方法
function forwardRef(FunctionComponent){
    return class extends Component {
        render(){
            return FunctionComponent(this.props, this.props.ref)
        }
    }
}
```

## 4. 生命周期

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/7bff8db7-76b2-482f-ae79-4df7a85e5eeb.png)

```js
class Wecome extends React.Component{
  static defaultProps = {
    name: 'miraitowa组件'
  }
  constructor(){
    super()
    this.state = {number: 0}
    this.inputRef = React.createRef()
    console.log("生命周期，init");
  }
  componentWillMount(){
    console.log("生命周期，componentWillMount");
  }
  componentDidMount(){
    console.log("生命周期，componentDidMount");
  }
  shouldComponentUpdate(){
    console.log("生命周期，shouldComponentUpdate");
    return true
  }
  componentWillUpdate(){
    console.log("生命周期，componentWillUpdate");
  }
  componentDidUpdate(){
    console.log("生命周期，componentDidUpdate");
  }
  handleClick = () => {
    this.setState({number: this.state.number+1},() => {
      console.log("number:",this.state.number);
    })
  }
  render(){
    console.log("生命周期，render");
     return (
       <div>
         <input ref={this.state.inputRef}></input>
         <button onClick={this.handleClick}>ref按钮</button>
       </div>
    )
  }
}
```

```js
//类组件生命周期
function  mountClassComponent(vdom){
    let {type, props, ref} = vdom;
    let defaultProps = type.defaultProps || {}
    let classInstance = new type({...defaultProps,...props})
    if(classInstance.componentWillMount) classInstance.componentWillMount()
    let renderVdom = classInstance.render();
    if(classInstance.componentDidMount) classInstance.componentDidMount()
    const dom = createDOM(renderVdom)
    if(!!ref){
        ref.current = classInstance
    }
    classInstance.oldRenderVdom  = renderVdom
    return dom
}
```

```js
function shouldUpdate(classInstance,nextProps, newState){
    let willUpdate = true;
    if(classInstance.shouldComponentUpdate && (!classInstance.shouldComponentUpdate(nextProps,newState))){
        willUpdate = false
    }
    if(nextProps){
        classInstance.props = nextProps
        classInstance.state = newState
    }
    if(willUpdate){
        classInstance.forceUpdate()
    }
}
```

```js
forceUpdate(){
        if(this.componentWillUpdate){
            this.componentWillUpdate(this.props, this.state)
        }
        let oldRnderVdom = this.oldRenderVdom
        let oldDOM= findDOM(oldRnderVdom)
        let newRenderVdom = this.render()
        compareTwoVdom(oldDOM.parentNode, oldRnderVdom, newRenderVdom)
        this.oldRnderVdom = newRenderVdom
        if(this.componentDidUpdate){
            this.componentDidUpdate(this.props, this.state)
        }
    }
```

## 5. hooks

### 5.1 useState

* useState就是一个Hook
* 通过在函数组件里调用它来给组件添加一些内部state&React会在渲染时保留这个state
* useState会返回一对值：当前状态和一个让你更新它的函数
  * 在初始渲染期间，返回的状态与传入的第一个参数值相同
  * setState函数用于更新state，它接收一个新的state值并将组件的一次重新渲染加入队列

```js
let scheduleUpdate; //调度更新的方法
let hookIndex = 0; //当前执行的hook的索引
let hookState = []; //存放所有的hook状态
export function useState(initState) {
    hookState[hookIndex] = hookState[hookIndex] || initState
    let currentIndex = hookIndex
    function setState(newState){
        hookState[currentIndex] = newState;
        scheduleUpdate();
    }
    return [hookState[hookIndex++], setState]
}
```

