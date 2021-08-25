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

