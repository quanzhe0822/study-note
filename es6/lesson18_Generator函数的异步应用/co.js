function co(gen) {
  var ctx = this; //缓存执行环境

  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx); //获取内部指针对象
    if (!gen || typeof gen.next !== 'function') return resolve(gen); //如果不是Generator函数，就返回

    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try { //捕捉抛出的错误
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);

    }

    function next(ret) {
      console.log(ret)
      if (ret.done) return resolve(ret.value); //检查当前是否为最后异步，如果是返回
      var value = ret.value;
      if (value) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError(
        'You may only yield a function, promise, generator, array, or object, ' +
        'but the following object was passed: "' +
        String(ret.value) +
        '"'
      ))

    }
    function onRejected(e){
      console.log('捕获到错误'+e);
    }
  })
}