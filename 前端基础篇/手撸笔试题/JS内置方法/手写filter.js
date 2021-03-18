Array.prototype.xfilter = function (callback){
    var _arr = this
    var _len = _arr.length
    var _args = arguments[1] || window
    var newArr = []
    for(var i=0;i< _len;i++){
        callback.apply(_args, [_arr[i], i, _arr]) ? newArr.push(arr[i]) : ""
    }
    return newArr
}
let arr = [{'name': '张三',age: 20},{'name': '李四', age: 22}]
let obj ={}
let a = arr.xfilter((item,index) =>{
    console.log(item.name,index)
    return item.age > 21
},obj)
console.log(arr,a)