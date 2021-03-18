let a = [1,2,3,4,5,6,7]
let b =[2,3,4,5,6,20,30,40]

// 数组交集
function intersection (arr1, arr2){
    let set = new Set(arr2),
        res = []
    for(var i=0;i<arr1.length;i++){
        if(set.has(arr1[i])){
            res.push(arr1[i])
        }
    }
    return res
}
// 数组并集
function union (arr1, arr2){
    let set = new Set(arr2),
        res = []
    for(var i=0;i<arr1.length;i++){
        if(!set.has(arr1[i])){
            res.push(arr1[i])
        }
    }
    return res
}
console.log(union(a,b)); 