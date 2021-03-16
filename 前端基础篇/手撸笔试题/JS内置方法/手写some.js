Array.prototype.xsome =function (callback) {
    var _this = this
    var _len = _this.length
    var arg = arguments[1] ||  window()
    var flag = false
    for(var i =0;i< _len;i ++){
        if(!callback.apply(arg, [_this.arr[i], i, _this])){
            flag = true
            break
        }
    }
    return flag
}