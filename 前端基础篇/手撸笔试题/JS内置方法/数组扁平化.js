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