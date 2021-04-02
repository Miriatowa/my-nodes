function calRedBall(box, num) {
	let res = 0
    if(num === 0) return 0
    if( num === 1 || num === box.length - 1){
        for(let i=0;i<box.length;i++){
             let m = box.reduce((cur,item,index) =>{
                 if(index === i){
                     item = 1 - item
                 }
                 return cur * item
             },1)
             res += m
        }
    }
	if(box.length === num){
        res = box.reduce((pre,cur) => {
            return pre * cur
        },1)
    }
    return res*10000

}
var box=[0.4,0.6,0.7] 
var num=1
let b =calRedBall(box,num)
console.log(b)