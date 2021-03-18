// 核心思路：
// • promise.myAll()返回的一定是一个promise对象，所以起手式就是写
// return new Promise((resolve, reject) => {})。
// • 遍历传入的参数，用Promise.resolve()将参数包一层，使其成为一个promise对象。
// • 关键点是何时决议，也就是何时resolve出来，在这里做了计数器（count）,每个内部promise对象决议
// 后就将计数器+1，并判断+1后的大小是否与传入的对象的数量相等，如果相等则调用resolve(),如果任何一个
// promise对象失败了，则调用reject()方法。
// • 官方规定Promise.all接受的参数是一个可遍历的参数，所以未必是一个数组，所以用Array.from()转化一下。
// • 使用for...of进行遍历，因为凡是可遍历的变量都应该是部署了iterator方法，所以用for...of遍历最安全


Promise.myAll = function(iterators) {
	const promises = Array.from(iterators)
  const num = promises.length
  let count = 0
  let resolvedValue = []
	return new Promise((resolve, reject) => {
		for(let item of promises){
    	Promise.resolve(item)
      	.then(data => {
        	// 保存这个promise实例的value
					resolvedValue[count++] = data
          // 通过计数器，标记是否所有实例均 fulfilled
          if(count === num){
						resolve(resolvedValue)
          }
        })
        .catch(err => reject(err))
		}
  })
}
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.myAll([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});