Array.prototype.xmap = function (callback){
    var _arr = this
    var _len = _arr.length
    var _args =arguments[1] || window
    var newArr = []
    var _item;
    for(var i=0;i < _len;i++){
        // _item = deepClone(arr[i])
       newArr.push(callback.apply(_args, [arr[i], i, _arr]))
    }
    return newArr
}
let arr = [{'name': '张三',age: 20},{'name': '李四', age: 22}]
let obj ={}
arr.xmap((item,index) =>{
    console.log(item.name,index)
    return item.age ++
},obj)
console.log(arr)