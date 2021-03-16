function deepClone(origin, target = {}) {
		for(var key in origin){
		  if(origin.hasOwnProperty(key)){
			  console.log(key)
			if(typeof origin[key] === 'object' && origin[key] !== null){
				target[key] = Object.prototype.toString.call(origin[key]) === '[object Array]' ?  [] : {},
				deepClone(origin[key], target[key])
			}else{
				target[key] = origin[key]
			}
		}
	}
	return target
}