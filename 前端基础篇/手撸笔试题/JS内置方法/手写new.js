function xnew() {
    var constructor = [].shift.call(arguments)
    var _this = {}
    _this.__proto__ = constructor.prototype
    constructor.apply(_this, arguments)
    return _this
}
var a = xnew(function Person(a,b) {
    this.a = a
    this.b = b
}, 3,4)
console.log(a);