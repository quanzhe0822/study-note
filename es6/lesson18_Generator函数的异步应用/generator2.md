### 目录
1. [Generator 异步实现](#generator)
2. [Thunk 函数](#thunk)
3. [co 模块 ](#co)


***

<span id="generator"></span>
### 1.Generator 异步实现
##### 异步
对于异步，已经有很多介绍和说明，在此不赘述详细的内容。简单地讲，异步是一个可以分解成两段来执行的任务。当第一段任务开启之后，就可以执行其他任务，而不必一直等待着，当做好了准备后，再回过头执行第二段。

比如，执行文件读取任务中，该任务的第一段是向系统发送文件请求。然后，继续执行其他任务，等到操作系统返回文件，再接着执行任务的第二段。这种不连续的执行，就叫做异步。

相应地，连续的执行就叫做同步。由于是连续执行，当某个任务结束之前，不能执行下一个任务，所以操作系统从硬盘读取文件的这段时间，程序只能干等着。

##### 异步任务的封装
Generator 函数中的yield表达式可以暂停函数执行，next方法可以恢复函数执行。这使得 Generator函数非常适合将异步任务以同步的形式表现出来。

    var fetch = require('node-fetch');
    function* gen(){
      var url = 'http://www.xxxxx.com/user';
      var result = yield fetch(url);
      
      //获取到数据后进行逻辑操作
      console.log(result.data);
    }

上面代码中，Generator 函数封装了一个异步任务，任务第一段是读取一个远程接口，任务第二段紧随其后，进行逻辑操作。可以看出，整个流程非常像同步操作，除了内部加上了yield命令。下面是执行这段代码的方法。
    
    var g = gen();
    var result = g.next();
    result.value.then(function(data){
      return data.json();
    }).then(function(data){
      g.next(data);
    });

首先执行 Generator 函数获取生成器对象，然后使用next方法执行任务第一段。此时返回的对象的value值为Promise，所以可以用then方法绑定回调函数，获取异步请求的结果，并且再次使用next方法，把该结果传递给 Generator 函数内部。

但是上面的代码会有问题。当执行链式的异步操作时，每次获取异步的值，都要手动执行以下步骤。

    var g = gen();
    var result = g.next();
    result.value.then(function(data){
      return data.json();
    }).then(function(data){
      g.next(data);
    });


那么我们是否可以封装一个自动流程函数呢？答案是可以的。

    var fetch = require('node-fetch');
    function* gen(){
      var result1 = yield fetch(url1);
      console.log(result1.data);

      var result2 = yield fetch(url2);
      console.log(result2.data);

      var result3 = yield fetch(url3);
      console.log(result1.data);
    }

    function run(g) {
      var g = gen();//获取生成器对象

      function next(data) {//通过递归，执行所有的异步任务。
        var r = g.next(data);
        if(r.done) return;
        r.value.then(function(data){
          next(data);
        })
      }

      next();
    }

    run(gen);

上面代码中，调用run函数的时候，只要传入一个 Genenrator 函数就可以自动完成所有流程。


<span id="thunk"></span>
### 2.Thunk 函数
上一章中，我们封装的 Generator 函数异步任务是基于Promise对象实现的。那么 Generator 函数除了 Promise 之外，还有没有其他实现方法呢？答案是肯定有的，这一章要介绍的 Thunk 函数就是。

Thunk 函数是一个早在上个世纪60年代就诞生的老古董。该函数诞生是源于一个编译器设计的问题——“求值策略”，即函数的参数应该何时求值。在不同的策略下，Thunk 函数的含义可能有所不同。

在 JavaScript 中，Thunk 函数的作用是，将函数的执行部分和回调部分分开。这样做的意义在于，我们可以在一个地方执行执行部分，在另一个地方执行回调部分。

下面是实现简单的 Thunk 函数转换器，并生成 fs.readFile的 Thunk 函数的方法。在这之前，说明一下，**任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。**

    var Thunk = function(fn){//Thunk 函数转换器
      var ctx = this;
      return function(...args){
        return function(callback){
          fn.call(ctx,...args,callback)
        }
      }
    }

    var fs = require('fs');
    
    var read  = Thunk(fs.readFile);
    read ('package.json')(function(err,str){
      //...
    });

生产环境的转换器，建议使用Thunkify 模块。使用方式与上面的Thunk函数一样。

下面是该模块的源码

    function thunkify(fn) {
      return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i];
        }

        return function (done) {
          var called;

          args.push(function(){
            if (called) return;//回调函数只能调用一次
            called = true;
            done.apply(null,arguments);
          })

          try {
            fn.apply(ctx,args);
          } catch (err) {
            done(err);
          }
        }
      }
    }

其实一个 Thunk 函数并没有什么大作用，管键是 ES6 有了 Generator函数后，通过结合，就可以实现异步任务的自动流程管理。下面是通过模拟的异步代码实现的自动流程管理。
    
    var thunkify = require('thunkify');
    var th = thunkify(asy);
    
    function asy(a,callkback){//模拟的异步任务
      var a = a*2;
      
      setTimeout(function(){
        callkback(a)
      },1000)
    }

    function* g() {
      var v1 = yield th(2);//执行异步任务第一段
      console.log(v1);
      var v2 = yield th(3);//执行异步任务第一段
      console.log(v2);
    }

    function run (g) {
      
      var ge = g();

      function next(data){
        var result = ge.next(data);
        if(result.done) return;
        result.value(next);//执行异步任务第二段，回调部分；使用递归方式执行所有异步任务
      }

      next();
    }
    run(g);
    //4，6

通过两个章节的内容，总结一下就是，我们使用 Generator 函数，再结合 Promise 对象或 Thunk 函数可以封装以同步形式表现的异步任务。其优点是代码看起来更加简洁，更加易懂，并且可以实现异步任务自动执行。之所以能实现自动执行，关键点在于两种方法都可以自动控制 Generator 函数的流程，接受和交换程序的执行权。


***

<span id="co"></span>
### 3.co 模块
[co 模块 ](https://github.com/tj/co)是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。下面是该模块的基本用法。

    var co = require('co');
    var gen = function* (){
        var f1 = yield fetch(url1);
        var f2 = yield fetch(url2);
        console.log(f1.toString());
        console.log(f2.toString());
    }
    co(gen).then(function(){
      console.log('Generator 函数执行完成');
    });

其实，co 模块是将两种自动执行器 (Thunk 函数和 Promise对象)，包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或Promise对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用co，详见后文的例子。

下面是 co 模块的源码

    function co(gen) {
      var ctx = this;

      return new Promise(function(resolve,reject) {//检查 gen 是否为 Generaotor函数
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
      

        //包装next方法，捕获抛出的错误。
        onFulfilled();
        function onFulfilled(res) {
          var ret;
          try {
            ret = gen.next(res)
          } catch (e) {
            return reject(e)
          }
          next(ret);
        }

        //反复调用复自身，直到ret.done返回true
        function next(ret) {
          if (ret.done) return resolve(ret.value);

          //返回的对象的value值转换为Promise对象。
          var value = toPromise.call(ctx,ret.value);
          
          //value值符合要求，通过onFulfilled函数再次调用next函数。
          if (value && isPromise(value)) return value.then(onFulfilled, onRejected);

          //如果转换后值不符合要求，将Promise对象的状态变为rejected，从而终止执行。
          return onRejected(
            new TypeError(
              'You may only yield a function, promise, generator, array, or object, '
              + 'but the following object was passed: "'
              + String(ret.value)
              + '"'
            )
          )
        }
      });
    }

co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。

    // 数组的写法
    co(function* () {
      var res = yield [
        Promise.resolve(1),
        Promise.resolve(2)
      ];
      console.log(res);
    }).catch(onerror);

    // 对象的写法
    co(function* () {
      var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
      };
      console.log(res);
    }).catch(onerror);

之所以yield后面能跟数组或者对象，是因为 co 的next函数中有 toPromise 方法，它会根据数据类型的不同做相应的转换处理。但是有一个条件，就是数组的成员或者对象的值必须都是 Promise 对象或者 Thunk 函数才行。如果是 Generator 函数或者是生成器对象，会把该值当作参数，再一次调用自己。下面是 co 内部的 toPromise 函数，以及处理数组和对象的函数。

    function toPromise(obj) {
      if (!obj) return obj;
      if (isPromise(obj)) return obj;
      if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
      if ('function' == typeof obj) return thunkToPromise.call(this, obj);
      if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
      if (isObject(obj)) return objectToPromise.call(this, obj);
      return obj;
    }

    //数组转换成Promise 对象
    function arrayToPromise(obj) {
      return Promise.all(obj.map(toPromise, this));
    }

    //对象转换成Promise对象
    function objectToPromise(obj){
      var results = new obj.constructor();
      var keys = Object.keys(obj);
      var promises = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise)) defer(promise, key);
        else results[key] = obj[key];
      }
      return Promise.all(promises).then(function () {
        return results;
      });

      function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function (res) {
          results[key] = res;
        }));
      }
    }

下面是另一个例子。

    co(function* () {
      var values = [fetch(url1), fetch(url2), fetch(url3)];//三个异步任务是基于Promise的
      yield values.map(somethingAsync);
    }).then(function(d){
      console.log('任务完成!')
    });

    function* somethingAsync(x) {
      var y = yield x;
      return y
    }


上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。

***
### 总结
Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，函数体内外的数据交换和错误处理机制，这两个特性是它能成为异步编程的完整解决方案的原因。

Generator 函数封装异步优点在于，不会产生传统回调函数形式中的回调地狱问题, 比 Promise 语义上更清楚，代码以同步形式表现，所以看起来更加简洁，易懂，并且还可以自动控制流程。


参考：阮一峰 [《ECMAScript 6 入门》](#http://es6.ruanyifeng.com)