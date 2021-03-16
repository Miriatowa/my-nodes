Array.prototype.xforEach = function (callback){
    var _arr = this
    var _len = _arr.length
    var _arg = arguments[1] || window
    for(var i=0;i < _len;i++){
        callback.apply(_arg, [_arr[i], i])
    }
}
