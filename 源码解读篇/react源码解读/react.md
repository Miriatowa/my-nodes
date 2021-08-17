# react源码解读

## 1. 组件的渲染

### 1.1 渲染过程

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/23b83406-6fe0-4c23-8eab-012d1472b3fa.png" alt="image-20210813085745862" style="zoom: 67%;" />

### 1.2 手写简化版react、react-dom

```javascript
//react.js
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
    createElement
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
function createDOM(vdom){
    let {type, props} = vdom
    let domNode;
    if(type === REACT_TEXT){
        domNode=document.createTextNode(props.content)
    }else if(typeof type === "function"){
        return mountFunctionComponent(vdom)
    }else{
        domNode = document.createElement(type)
    }
    if(props){
        // 根据虚拟donm中的属性更新真实dom
        updateProps(domNode,{}, props)
        if(typeof props.children == 'object' && props.children.type){
            console.log("执行了",domNode);
            render(props.children, domNode)
        }else if(Array.isArray(props.children)){
            reconcileChildren(props.children, domNode)
        }
    }
    vdom.dom = dom
    return domNode
}
//挂载组件
function  mountFunctionComponent(vdom){
    let {type, props} = vdom;
    let renderVdom = type(props);
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
        }
        if(key === "style"){
            let styleObj = newProps[key]
            for(let attr in styleObj){
                dom.style[attr] = styleObj[attr]
            }
        }else{
            dom[key] = newProps[key]
        }
    }
}

const ReactDom = {
    render
}
export default ReactDom
```

## 2. 组件的状态

* 组件数据源只有两个，一个是父组件传给子组件(单向数据源，不可修改)，一个是内部初始化（通过setState修改）
* 属性和状态都可以影响视图，改变会引起视图更新
