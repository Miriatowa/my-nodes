Array.prototype.xreduce = function (callback, initialValue){
    var _arr = this
    var _len = _arr.length
    var _arg = arguments[1] || window
    var _item
    for(var i=0;i< _len;i++){
        _item = deepClone(_arr[i])
        initialValue = callback.apply(_arg, [initialValue, _item, i, _arr])
    }
    return initialValue
}