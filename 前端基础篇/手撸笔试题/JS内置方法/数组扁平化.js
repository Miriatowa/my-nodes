//使用reduce扁平化数组
function arrayFlat(arr) {
    return arr.reduce((initval,item) => {
        if(Object.prototype.toString.call(item) === '[object Array]'){
            return [...initval, ...arrayFlat(item)]
        }else{
            return [...initval,item]
        }
    }, [])
}
let arr = [1,2,3,4,[23,12,[55,33]],[99,[22],[66]]]
console.log(arrayFlat(arr))
let res = []
Array.prototype._flat = function (n){
    for(let i =0;i<this.length;i++){
        let item = this[i]
        if(n > 0){
            if(Object.prototype.toString.call(item) === '[object Array]'){
                --n
                item._flat(n)
            }else{
                res.push(item)
            }
        }else{
            res.push(item)
        }
        
    }
    return res
}
let arr =[1,2,3,[4,[5],[6,[7,8,[9]]]]]
let a = arr._flat(3)
console.log(a)
