function Counter() {
    var start = Date.now()
    this.num =0
    this.timer1 = setInterval(function () {
    this.num++
    var gap = Date.now() - start
    console.log('t1',this.num, gap)
    },900)
    JSON. parse('{"desc":"..."}') //假设执行耗时1000 毫秒
    this.timer2 = setTimeout(() => {
    this.num++
    var gap = Date.now() - start
    console.log('t2',this.num, gap)
    },0)
    }
    Counter()