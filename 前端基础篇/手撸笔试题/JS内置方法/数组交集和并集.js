let a = [1,2,3,4,5,6,7]
let b =[2,3,4,5,6,20,30,40]

// 数组交集
function intersection (arr1, arr2){
   let res = arr1.filter(item => arr2.includes(item))
   return res
}
// 数组并集
function union (arr1, arr2){
    let res = arr1.concat(b.filter(item => !a.includes(item)))
    return res
}
console.log(union(a,b)); 