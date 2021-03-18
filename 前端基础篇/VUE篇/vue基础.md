# 学习VUE篇

## 1、说说你对SPA单页面应用的理解，他的优缺点是什么？

SPA仅在web页面初始化时加载相应的HTML、JS、CSS。一旦页面加载完成，不会随用户的操作重新加载页面或者跳转。取而代之的是利用路由机制实现HTML内容的更换，UI与用户的交互，避免页面的重载。

#### 优点：

* 用户体验好、快，内容的改变不需要重载页面，避免了不必要的重复渲染
* 基于上面一点，SPA相对服务器压力小点
* 前后端职责分离，架构清晰。

#### 缺点：

* 首次加载耗时多：为实现单页web应用功能及现实效果，需要在加载页面的时候将js、css统一加载，部分页面按需加载
* SEO难度较大：所有的内容都在一个页面中动态替换显示，不利于SEO
* 前进后退路由管理：单页应用在一个页面中显示所有，不能使用浏览器的前进后退功能，所有的页面切换需要自己手动实现



## 2、v-show和v-if有什么区别？切换时会触发哪些生命周期？

#### v-if

真正的条件渲染，因为它会确保在切换过程中条件块内事件监听器和子组件适当地被销毁和重建，惰性渲染。

##### 初始渲染：

初始值为 **false** 组件**不会**渲染，生命周期钩子**不会**执行
初始值为 **true** 时，组件会进行渲染，并依次执行 ：

1. beforeCreate 
2. created
3. beforeMount
4. mounted 

##### 切换：

false  =>  true
依次执行 beforeCreate,created,beforeMount,mounted 生命周期。
true => false
依次执行 beforeDestroy,destroyed 生命周期。

#### v-show

> 不管初始条件是什么，元素都会被渲染，并且只是简单地基于CSS的‘**dispaly**’属性进行切换。

##### 初始渲染：

无论初始状态，组件都会渲染，**v-show** 的渲染是**非惰性**的，依次执行

1. beforeCreate
2. created
3. beforeMount
4. mounted 

##### 切换

对生命周期钩子无影响，切换时组件始终保持在 mounted 钩子。

## 3、说说你对MVVM的理解？

MVVM（Model - View - ViewModel）是一个软件架构设计模式，源于经典的MVC（Modle-View-Controller）模式，MVVM促进了前后端分离，极大的提高了前端的开发效率，核心是ViewModel，他就像一个中转站，负责转换Model中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与Modle层通过接口请求进行数据交互，如图

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/332a2ab3-117a-41d9-8469-93dea4a27856.jpg)

#### view层

VIew是视图层，前端主要由HTML和CSS构建

#### Modle层

MOdel是数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的API接口

#### ViewModle层

ViewModel是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的Model数据进行转换处理，做二次封装，以生成符合View层使用预期的视图数据模型。

## 4、怎么理解vue的单向数据流？

所有的prop都使其父子prop之间形成一个单向下行绑定：**父级prop的更新会向下流动到子组件中，但是反向不行**。这样会防止子组件意外改变父级组件的状态，从而导致应用的数据流向难以理解。

#### 常见的改变prop情形：

1. prop用来传递初始值；这个子组件接下来希望将其作为一个本地的prop数据来使用。

   ```javascript
   props:['initNum']
   data: () =>{
       return {
           num: this.props.initNum
       }
   }
   ```

2. 这个prop以一种原始值传入但需要进行转换。在这种情况下，最好使用这个prop的值来定义一个计算属性

   ```javascript
   props:['initNum']
   computed: {
       addNum: ()=>{
           return this.props.initNum++
       }
       
   }
   ```

## 5、谈谈你对vue生命周期的理解？

#### 记忆口诀：4812：  四个阶段，八个生命周期钩子，一个缓存，2个缓存生命钩子

#### 什么是生命周期？

vue实例从创建、初始化数据、编译模板、挂载DOM => 渲染DOM、更新DOM=>渲染DOM、卸载等一系列过程，称之为vue的生命周期

#### 各个生命周期作用

| 生命周期      | 描述                                                         |
| :------------ | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
| created       | 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，$el还不可用 |
| beforeMount   | 在挂载开始之前调用，相关的render函数首次调用                 |
| mounted       | el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子       |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟dom打补丁之前                |
| update        | 组件数据更新之后                                             |
| activited     | keep-alive专属，组件被激活时调用                             |
| deactivated   | kepp-alive专属，组件被销毁时调用                             |
| beforeDestory | 组件销毁前调用                                               |
| destoryed     | 组件销毁后调用                                               |

#### 生命周期示意图

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/6308bce9-40cf-48c6-b5e7-abfd276e5ae4.png)

## 6、computed和watch的区别和运用场景？

#### computed

计算属性，依赖其它属性值，并且computed的值有缓存。只有在他依赖的属性值发生改变时，下一次获取computed的值才会重新计算computed的值

#### watch

更多的时“观察”作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调执行后续操作

#### 适用场景

* 当需要进行数值计算，并且依赖于其他数据时，使用computed，利用其缓存特性，避免每次获取值时，都重新计算

* 当我们需要在数据变化时执行异步或者开销较大的操作时，应该使用watch，使用watch允许我们执行异步操作

  

## 7、谈谈你对keep-alive的了解？

keep-alive式vue内置的一个组件，可以使用被包含的组件保留状态，避免重新渲染，其有以下特性：

* 一般结合路由和动态组件一起使用，用于缓存组件
* 提供include和exclude属性，两者都支持字符串或者正则表达式，include表示只有名称匹配的组件会被缓存，exclude表示任何名称匹配的组件都不会被缓存，其中exclude的优先级比include高
* 对应两个钩子函数activated和deactivated，当组件被激活时，触发钩子函数activated，当组件被移除时，触发钩子函数deactivated



## 8、组件中data为什么是一个函数？

组件是用来复用的，且js里对象是引用关系，如果组件中的data是一个对象，那么这样作用域没有隔离，子组件中的data属性值会相互影响，如果组件中的data是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的data属性值不会相互影响；而new vue实例，是不会被复用，因此不存在引用对象的问题

## 9、v-model的原理？

在vue项目中主要用v-model指令在表单input、textarea、select等元素创建双向绑定。v-modle本质上是语法糖，v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

* text和textarea元素使用value属性和input事件
* checkbook和radio使用checked属性和change事件；
* select字段将value作为prop并将change作为事件



## 10、vue组件间通信有哪几种方式？

vue组件中的通信方式有：父子组件通信、兄弟组件通信、隔代组件通信

#### 1、props/$emit（父子）

父组件向子组件传递数据是通过prop传递，子组件传递数据给父组件是通过$emit触发事件来做到的。适用于父子组件的通信

#### 2、$emit/$on（父子、兄弟、隔代）

这种方法通过一个空的Vue实例作为中央事件总线，用它来触发事件和监听事件，从而实现任何组件的通信，包括父子、隔代、校内各地组件

#### 3、vuex（父子、兄弟、隔代）

vuex是一个专门为Vue.js应用程序开发的状态管理模式。每一个Vuex应用的核心就是store。

#### 4、ref、$parent/$children（父子）

* ref: 如果在普通的dom元素上使用，引用指向是dom元素；如果在子组件上，引用就指向组件实例
* $parent/$children: 访问父/子组件实例

#### 5、$attrs/$listeners（隔代）

* $attrs: 包含了父作用域中不被prop所识别的特性绑定。通常配合inheritAttrs使用
* $listeners：包含了父作用域中的v-on事件监听器，可以通过v-on=“$listeners”传入组件内部

#### 6、provide/inject（父子、兄弟、隔代）

父组件通过provider来提供变量，然后在子组件中通过inject来注入变量。不论子组件有多深，只要调用inject那么就可以注入provide中的数据，适用于隔代组件通信。



## 11、谈谈你对vuex的理解？

Vuex是一个专门为Vue.js应用程序开发的一个全局状态管理模式。。每个vuex应用的核心是store。

（1）vuex的状态管理存储是响应式的。当vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应的得到高校更新

（2） 改变store中的状态唯一途径就是显式地提交mutation。这样使得我们可以方便地跟踪每一个状态的变化

主要包含以下几个模块：

* state：定义了应用状态的数据结构，可以在这里设置默认的初始状态
* getter：允许组件从store中获取数据，mapGetters辅助函数仅仅是将store中的getter映射道局部计算属性
* mutation：是唯一更改store中状态的方法，且必须式同步函数
* module：允许将单一的store拆分为多个store且同时保存单一的状态树中



## 12、vue-router路由模式有几种？

vue-router有三种路由模式：hash、history、abstract，对应源码如下图所示：

```javascript
switch (mode){
    case 'history':
        this.history = new HTML5History(this.options.base)
        break
    case 'hash':
        this.history = new HashHistory(this.options.base, this.fallback)
        break
    case 'abstract':
        this.history = new AbstractHistory(this.options.base)
        break
    default:
        if(process.env.NODE_ENV !== 'production'){
            assert(false, `invalid mode: ${mode}`)
        }
}
```

3中路由模式说明：

* hash: 使用url hash值来作为路由。支持所有浏览器

* history：依赖HTML5History API和服务器配置

* abstract：支持所有js运行环境

  

## 13、v-if和v-for同时使用在一个标签的表现？

当v-if和v-for一起使用时，v-for具有比v-if更高的优先级，这意味着v-if将分别重复运行于每个v-for循环中。所以，不推荐v-if和v-for同时使用。如果v-if和v-for一起使用的话，vue中 的会自动提示v-if应该放到外层去



## 14、v-for的key的作用？

使用每个key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点。主要为了高效的更新虚拟dom



## 15、vue的实现原理？

vue.js是采用数据劫持结合发布订阅模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者，触发相应监听的回调

#### 具体步骤:

##### 第一步：需要obeserve的数据对象进行递归遍历，子属性对象的属性，都加上setter、getter。这样的话，给对象的某个值赋值，就会触发setter，那么就能监听到数据变化

##### 第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据变动，收到通知，更新视图

##### 第三步：Watcher订阅者是Observer和compile之间通信的桥梁，主要做的事：

1. 在自身实例化时往属性订阅器里面添加自己

2. 自身必须有一个update()方法

3. 待属性变动dep.notice（）通知时，能调用自身的update（）方法，并触发compile中绑定的回调。

   

##### 第四步：MVVM作为数据绑定的入口，整合Observer、compile、watcher三者，通过observer来监听自己的model数据变化，通过compile来解析编译模板指令，最终利用watcher搭起observer和compile之间的通信桥梁，达到数据变化 => 视图更新；视图交互变化=> 数据model变更的双向绑定效果



## 16、vue首屏白屏如何解决？

* 路由懒加载
* 开启vue渲染模式
* 进行cdn加速
* 用webpack的externals属性把不需要打包的库文件分离出去，减少打包文件大小
* 添加loading效果，给用户一种进度感受



## 17、vue中router和route的区别？

#### $router

router是vueRouter的一个对象，通过vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，它包含所有路由和许多关键的对象和属性，常见的有：

* push： 向history栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面

  ```javascript
  this.$router.push('home')
  //对象
  this.$router.push({path: 'home'})
  //命名的路由
  this.$router.push({name: 'user'})
  //带查询参数
  this.$router.push({path: 'register', query: {id: '999'}})
  ```

  

  

* go: 页面路由跳转、前进或者后退

  ```
  this.$router.go(-1)  //后退
  ```

  

* replace： push方法会向history栈添加一个新的记录，而replace方法时替换当前的页面，不会向history栈添加一个新的的记录

#### $route

route对象表示当前的路由信息，包含所当前url解析得到的信息，包含当前的路径、参数、query对象等。

* $route.path: 字符串，对应当前路由的路径，总是解析为绝对路径，如： ‘/foo/bar’
* $route.params：一个key/value对象，包含了动态片段和全片段匹配片段，如果没有路由参数，就是一个空对象
* $route.query：一个key/value对象，表示url查询参数
* $route.hash：当前路由的hash值，如果没有hash值，则为空对象
* $route.fullPath: 完成解析后的URL，包含查询参数和hash的完整路径
* $route.matched: 数组，包含当前匹配的路径所包含的所有片段所对应配置参数对象
* $route.name: 当前路径名字
* $route.meta: 路由元信息



## 18、vue-router的钩子函数？

#### 全局钩子

主要包括beforeEach和afterEach，beforeEach函数有三个参数：

* to: router即将进入的路由

* form：当前导航即将离开的路由

* next： 回调函数，进行管道中的一个钩子，如果执行完了，则导航的状态就是confirmed；否则为false，终止导航

  

```javascript
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated){
      next({ name: 'Login' })
  }else{ 
      next()
  }
})
```

#### 单个路由里面的钩子

主要用于写某个指定路由跳转时需要执行的逻辑

#### 组件路由

主要包括beforeRouteEnter、beforeRouteUpdate和beforeRouteLeave。这几个钩子都是写在组件里面也可以传三个参数，作用与前面类似

## 19、vue的diff算法理解？

1. **diff算法的作用**：用来修改dom的一小段，不会引起dom树的重绘

2. **diff算法的实现原理：**diff算法将virtual dom的某个节点数据改变后生成的新的节点，具体过程就是调用patch方法，比较新旧节点，一边比较一边给真实的dom打补丁进行替换

3. **具体过程详解：**

   a、在采用diff算法进行新旧节点进行比较的时候，比较是按照在同级进行比较的，不会进行跨级比较

   b、当数据发生改变的时候，set方法会调用dep.notify通知所有的订阅者watcher，订阅者会调用patch函数给响应的dom进行打补丁，从而更新真实的视图

   c、patch函数接受两个参数，第一个是旧节点，第二个是新节点，首先判断两个节点是否值得比较，值得比较则执行patchVnode函数，不值得比较则直接将旧节点替换为新节点。如果两个节点一样就直接检查对应的子节点，如果子节点不一样就说明整个子节点全部改变不再往下对比直接进行新旧节点的整体替换

   d、patchVnode函数：找到真实的dom元素；判断新旧节点是否指向同一个对象，如果是就直接返回；如果新旧节点都有文本节点，那么直接将新的文本节点赋值给dom元素并且更新旧的节点为新的节点；如果旧节点有子节点而新节点没有，则直接删除dom元素中的子节点；如果旧节点没有子节点，新节点有子节点，那么直接将新节点中的子节点更新到dom中；如果两者都有子节点，那么继续调用函数updateChildren

   e、updateChildren函数：抽离a、在采用diff算法进行新旧节点进行比较的时候，比较是按照在同级进行比较的，不会进行跨级比较

   b、当数据发生改变的时候，set方法会调用dep.notify通知所有的订阅者watcher，订阅者会调用patch函数给响应的dom进行打补丁，从而更新真实的视图

   c、patch函数接受两个参数，第一个是旧节点，第二个是新节点，首先判断两个节点是否值得比较，值得比较则执行patchVnode函数，不值得比较则直接将旧节点替换为新节点。如果两个节点一样就直接检查对应的子节点，如果子节点不一样就说明整个子节点全部改变不再往下对比直接进行新旧节点的整体替换

   d、patchVnode函数：找到真实的dom元素；判断新旧节点是否指向同一个对象，如果是就直接返回；如果新旧节点都有文本节点，那么直接将新的文本节点赋值给dom元素并且更新旧的节点为新的节点；如果旧节点有子节点而新节点没有，则直接删除dom元素中的子节点；如果旧节点没有子节点，新节点有子节点，那么直接将新节点中的子节点更新到dom中；如果两者都有子节点，那么继续调用函数updateChildren

   e、updateChildren函数：抽离出新旧节点的所有子节点，并且设置新旧节点的开始指针和结束指针，然后进行两辆比较，从而更新dom（调整顺序或者插入新的内容 结束后删掉多余的内容）出新旧节点的所有子节点，并且设置新旧节点的开始指针和结束指针，然后进行两辆比较，从而更新dom（调整顺序或者插入新的内容 结束后删掉多余的内容）

## 20、vue中template编译的理解？

先转化为AST树，在得到的render函数返回Vnode，具体为：

* 通过compile编译器把template编译成ATS语法树，compile是createCompiler的返回值，compileComoiler是用以创建编译器并合并option
* AST会经过generate（将抽象语法树转化为render 函数字符串）得到render函数，render的返回值是VNode，VNode是vue的虚拟DOM节点，里面有标签名、子节点、文本等

