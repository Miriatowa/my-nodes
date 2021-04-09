Promise.race = function(ps) {

    let resolve
  
    let reject
  
    const promise = new Promise((r, j) => {
  
      resolve = r
  
      reject = j
  
    })
  
    for (let p of ps) {
  
      Promise.resolve(p).then(
  
        val => resolve(val),
  
        err => reject(err)
  
      )
  
    }
  
    return promise
  
  }