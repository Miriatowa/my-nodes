function repeatNumber (arr){
    let map = new Map()
    for(var i=0;i< arr.length;i++){
        if(map.has(arr[i])){
           map.set(arr[i], map.get(arr[i]) + 1)
        }else{
            map.set(arr[i], 1)
        }
    }
    //重复的数
    for(var [key, value] of map){
        if(value > 1){
            console.log(`重复的数：${key} 重复次数：${value}`)
        }else{
            map.delete(key)
        }
    }
    return map
}
let nums = [1,1,2,3,1,2,3,4,5,1,2,3]
const res = repeatNumber(nums)