// 函数防抖：对于时间被触发n秒后在执行的回调，如果在这n秒内在触发，重新开始计时
function debounce(fn, time, triggerNow) {
    var t = null;
    var debounced = function() {
        var _this = this,
            arg   = arguments;
        if(t){
            clearTimeout(t)
        }
        if(triggerNow){
            var exec = !t;
            t = setTimeout(() => {
                t = null
            }, time)
            if(exec){
                fn.apply(_this, args)
            }
        }else{
            t = setTimeout(() => {
                fn.apply(_this, args)
            },time)
        }
    }
    debounced.remove = () => {
        clearTimeout(t)
        t = null
    }
    return debounced
}  

// 函数节流：事件被触发，n秒之内只执行一次事件处理函数
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