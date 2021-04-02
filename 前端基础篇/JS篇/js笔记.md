# 								前端学习之js

## 1、js垃圾回收机制

#### 标记清除：

这是js最常见的垃圾回收机制。垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及闭包中的变量，在这完成之后仍然存在的标记就是要删除的变量

#### 引用计数：

在低版本的IE中采用引用计数的方式进行垃圾回收，经常会发生内存泄露，引用计数的策略时跟踪记录每一个值被使用的次数。当声明一个变量并将这个引用类型赋值给该变量的时候，这个值的引用次数就加1，如果变量的值变成另外以一个，则这个值的引用就减少1.当这个值得引用变为0 的时候，说明没有变量在使用，这个值没法被访问

## 2、DOM节点的类型

* 整个文档就是一个文档（**document**）节点

* 每个HTML标签是一个元素 （**Element**）节点

* 每一个HTML属性是一个属性（**Attribute**）节点

* 包含在HTML元素中的文本时文本（**Text**）节点

  

## 3、script标签中defer和async属性

1. defer属性规定是否延迟执行脚本，直到页面加载为止，async属性规定脚本一旦可用，就异步执行
2. defer并行加载js文件，会按照页面的script标签的顺序执行，async并行加载js文件，下载完成立即执行，不会按照页面上的script标签的顺序执行

## 4、闭包

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染；缺点是闭包会常驻内存，增加内存使用量，使用不当很容易造成内存泄漏。在js中，有权访问其它函数内部变量的函数，有3个特性：

* 函数嵌套函数
* 函数内部引用外部的参数和变量
* 参数和变量不会被被垃圾回收机制回收

## 5、eval的功能是什么？

它的功能是把对应的字符串解析成js代码并运行，应该避免使用eval，它会造成程序的不安全，非常影响性能

## 6、图片的懒加载和预加载

#### 懒加载

场景：对于图片过多的页面，为了加快页面加载速度，需要将页面内未出现的可视区域内的图片先不做加载，等到滚动可视区域后再去加载。
原理：img标签的src属性用来表示图片的URL，当这个属性值不为空时，浏览器就会根据这个值发送请求，如果没有src属性就不会发送请求。所以，在页面加入时将img标签的src指向为空或者指向一个小图片（loading或者缺省图），将真实地址存在一个自定义属性data-src中，当页面滚动时，将可视区域的图片的src值赋为真实的值。

```js
<img src="https://i.loli.net/2017/08/08/5989307b6c87b.gif" data-xxx="${data.content[i].url}">

let images = document.querySelectorAll('img[data-xxx]')
for(let i = 0; i <images.length; i++){
  if(/* 出现在屏幕里(images[i]) */){
  // 一般判断这个高度用到高度有:浏览器高度,文档高度,滚动的高度
    images[i].src = images[i].getAttribute('data-xxx')
    images[i].removeAttribute('data-xxx')
  }
}
```

#### 预加载

场景：图鼠标移入一张图片时，换成另一张图片，移出时换回原来的图片，正常做法是，鼠标移入的时候，改变图片的src，但这时就要去加载图片了，会等待一段时间，这样体验不好。预加载的做法是，在页面加载完，鼠标移入之前就通过Image对象把图片加载进缓存了，这样鼠标移入的时候直接从缓存里读取了，速度很快，解决此问题的方案就是实现图片预加载。
原理：事先把网页的图片记载到本地，之后就直接到缓存中拿图片

1. 使用CSS进行图片预加载
   原理：将需要加载的图片作为标签的背景图预先加载出来，但是不显示在可视区域内
   缺点：加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间

```javascript
#preload-01 { background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; }  
#preload-02 { background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px; }  
#preload-03 { background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px; }
```

## 7、定时器误差

#### 原因：

Eventloop 循环机制中，异步事件 setInterval 到时后会把回调函数放入消息队列中，主线程的任务执行完毕后依次执行消息队列的任务，由于消息队列中存在大量任务，其他任务执行时间就会造成定时器回调函数的延迟，如果不处理则会一直叠加延迟

#### 示例：

```javascript
var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
    var i = 0;
    while(i++ < 100000000);
}, 0);


setInterval(function(){
    count++;
    console.log(count + ' --- ' + (new Date().getTime() - (startTime + count * 1000)));
}, 1000);

```

##### 示例结果：

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/5ca00b25-8bca-424a-83ec-6095b5712b4d.png)

#### 解决方案1： 动态计算时差

根据定时器最开始时间计算当前时间（回调函数执行时间）与开始时间的误差，用期望时差减误差作为下一次任务的时间间隔
注：时差过大（超过期望时差）时，由于无法时间回流。只能按没有间隔处理，减轻影响

```javascript
var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
    var i = 0;
    while(i++ < 100000000);
}, 0);
function handle() {
    count++;
    var offset = new Date().getTime() - (startTime + count * 1000);
    var nextTime = 1000 - offset;
    if (nextTime < 0) nextTime = 0;
    setTimeout(handle, nextTime);
     
    console.log(count + ' --- ' + (new Date().getTime() - (startTime + count * 1000)));
}
setTimeout(handle, 1000);

```

##### 示例结果：

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/0b28b0af-7b11-4edc-a195-4e2167931aee.png)

#### 解决方案2： 使用 web Worker将定时函数作为独立线程执行

```javascript
var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
    var i = 0;
    while(i++ < 100000000);
}, 0);

// worker 解决方案
let worker = new Worker('./preciseTiming.js')
```

```javascript
// preciseTiming.js
var startTime = new Date().getTime();
var count = 0;
setInterval(function(){
    count++;
    console.log(`${count}---${(new Date().getTime() - (startTime + count * 1000)}`);
}, 1000);

```

##### 示例结果：

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/88b51889-4b75-434d-91db-251df59adeab.png)

## 8、防抖和节流

#### 防抖：

触发高频事件后 n 秒后函数只会执行一次，如果 n 秒内高频事件再 次被触发，则重新计算时间；fun

```javascript
function debounced = function (fn, delay){
    let t = null
    return function (){
        var _this = this,
            arg   = arguments;
        clearTimeout(t)
        t = setTimeout(() => {
            fn.apply(_this, args)
         },delay)
    }
}
```

#### 节流：

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执 行频率。

```javascript
function throttle(fn, delay){
    var t = null,
        begin = new Date().getTime();
    return function() {
        var _this = this,
            arg   = arguments,
            cur   = new Date().getTime();
        clearTimeout(t)
        if(cur - begin >  delay){
            fn.apply(_this, args)
            begin = cur
        }else{
            t = setTimeout(() => {
                fn.apply(_this, args)
            },delay)
        }
    }
}
```

## 9、判断数组方法

#### Object.prototype.toString.call() 

每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的 话，会返回 [Object type]，其中 type 为对象的类型。但当除了 Object 类型的 对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串， 所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

```javascript
Object.prototype.toString.call('js')    		 // "[object String]"
Object.prototype.toString.call(1)    		     // "[object Number]"
Object.prototype.toString.call(Symbol(1))  		 // "[object Symbol]"
Object.prototype.toString.call(null)       		 // "[object Null]"
Object.prototype.toString.call(undefined)   	 // "[object Undefined]"
Object.prototype.toString.call(function(){})     // "[object Function]"
Object.prototype.toString.call({name: 'js'})     // "[object Object]"
```

#### instanceof

instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。 使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型 链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。 [] instanceof Array; // true 但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。 [] instanceof 

#### Array.isArray()

```javascript
Array.isArray([1, 2, 3]);    // true
Array.isArray({foo: 123});   // false
Array.isArray("foobar");     // false
Array.isArray(undefined);    // false
```

