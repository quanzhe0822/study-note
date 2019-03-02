### 目录
1. [async 函数简介](#async)
2. [async 函数语法](#grammar)
3. [实例](#example)
4. [总结](#summarize)

***
<span id="async"></span>
### 1.async 函数简介

按 MDN 上的介绍，async 函数是一个通过事件循环操作异步程序，使用隐试的 Promise 返回其结果，并且在语法和结构上又趋近于同步形式呈现代码的函数。

简单来说 async 函数就是一个基于 Promise ，使用起来更加舒服，更加简单的实现异步操作的方法。也可以看作是 Genenrator 函数的改进版本。下面是 async 函数的简单写法。

    async function fetchData() {
      const f1 = await fetch(url1);
      console.log(f1);
      const f2 = await fetch(url2);
      console.log(f2);
    }

上面代码是依次执行2个异步请求操作，可以看出来，写法跟 Generator 函数很像。async 相当于 Generator 函数中的 * ，await 相当于 yield。

async 函数的优点在于：
1. 具有内置执行器。
Generator 函数的执行必须靠执行器，所以才有了co模块函数，而async函数自带执行器。也就是说，只需要执行fetchData()就可以得到结果。
2. 更好的语义。
async和await，比起星号和yield，语义更加清楚。async表示函数里又异步操作，await表示紧跟在后面的表达式需要等待结果。
3. 返回值是 Promise。
async函数的返回值是 Promise 对象，这比Generator 函数的返回值是 Iterator对象方便多了。你可以用then方法指定下一步的操作。

***
<span id="grammar"></span>
### 2.async 函数语法
##### 返回Promise对象
async 返回一个Promise对象，通过then方法可以接受到 async 函数返回的值。

    async function test(){
      return "hello world";
    }
    test().then(r => console.log(r));
    //hello world

上面代码中，async 返回的 Promise 对象把return 值当作了resolve 传递出来的值，所以，可以通过 then 方法的回调函数接受到该值。 

##### await 命令
await 命令必须用在async 函数内部才行，否则报错。

    async function t(){
      [1,2,3].forEach(function(v,i){
        await calculate(v)
      })
    }
    //Uncaught SyntaxError: await is only valid in async function

await 顾名思义就是等待的意思，它首先暂停当前 async function的执行，等待后面表达式的结果。如果该结果是一个Promise对象，它会再次进行等待 Promise 状态的改变。当Promise 状态变为resolve时 await 就会返回 resolve 传递出来的值,继续往下执行。

如果表达式的结果不是 Promise 对象，await 就会直接返回该值，然后，继续往下执行。

需要注意，当执行到 await 的时候，并不是暂停整个程序的进行，而是跳出 async 函数，然后继续执行后面js栈的代码。等本轮事件循环执行完了之后就会跳回到 async 函数中等待后面表达式返回的值，如果返回值为非 promise 则继续执行 async 函数后面的代码，否则将返回的 promise 放入 Promise 队列。

    function get() {
        console.log('start get something') 
        return Promise.resolve("get something")
    };

    function done() {
        return "done something"
    };
    async function test() {
        console.log('start')
        const f1 = await get();
        console.log(f1);
        const f2 = await done();
        console.log(f2);
        return "async end";
    }
    test().then(function (r) {
        console.log(r);
    }); 
    var promiseFn = new Promise((resolve => {
        console.log('promise start');
        resolve('promise Resolve');
    }))
    promiseFn.then((val) => console.log(val));
    console.log('end');
    //start
    //start get something
    //promise start
    //end
    //promise Resolve
    //get something
    //done something
    //async end

整理下上面代码的执行顺序，我们便可以很好的理解到 await 的作用，及其逻辑。

上面代码中，调用 test() 函数，打印出 'start'，当执行到 await 时候会跳出 async 函数，并且执行后面函数get()，打印出 'start get something'。

接着是 async 函数下面的代码，创建 Promise 对象，打印'promise start', 把返回的 **Promise 放入 微任务队列（该任务暂称p1）**，继续执行，打印'end'。

本次事件循环结束，重新返回到 async 函数中，此时get()函数返回结果是一个Promise对象，所以再次跳出 async 函数，并且把该 **Promise 放入微任务队列中（该任务暂称p2）**。继续执行当前的事件循环，由于当前执行栈已经没有任务，主线程会查看任务队列中的任务。

此时任务队列中有 **两个 Promise 任务(p1,p2)**，当2个任务都已经完成的情况下，根据先进先出的原则，执行栈调用p1的回调函数，打印'promise Resolve'。但是，如果此时p1任务还在进行中，而p2任务已经完成的话，执行栈会先调用p2的回调函数。

当p2任务完成，重新返回到 async 函数中，此时 await 相当于then的作用，接受p2任务内部返回的值'get something'，并且继续往下执行，打印该值。

第二个 await 后面的表达式返回的是字符串，所以继续往下执行打印该值'do something'，执行完 async 函数内部所有代码后，会触发then方法注册的回调函数，打印出 async 函数 return 的值'async end'。

##### 错误处理

当 async 函数内部不出现异常，或者 await 后面的 Promise 状态不为 reject 时，async 函数返回的 Promise 就判定为 resolve。

但是，如果是以下情况，返回的 Promise 状态则是 reject。

1. async 函数内部使用未生命的变量。
2. async 函数内部抛出 throw new Error。
3. 函数方法执行出错（Object 使用 push()）等。
4. await 后面的 Promise 状态为 reject。 

我们可以在函数外部使用 catch 方法来捕获上面列出的异常。

    async function test() {
        await Promise.reject('Error');
        console.log('continue...');
        return 'end';
    }
    test().then( d => console.log(d))
          .catch(error => console.log(error));
    //Error

但是，这里有一个问题，就是当函数内部发生异常的时候，整个函数就会直接结束，不会继续执行下面的代码。

所以当我们要捕获 async 函数错误的时候，采取的方法是直接在内部捕获错误。
    
    async function test() {
        try {
            await Promise.reject('Error');
        } catch (e){
            console.log(e)
        }
        console.log('continue...');
        return 'end';
    }
    test().then( d => console.log(d))
    //Error
    //continue...
    //end

上面代码中，当异步操作出现异常或错误的时候，就会被 try/catch 捕获到，并且也不会影响到 async 函数的继续执行。

##### 并发异步请求

    async function test() {
        await step1();
        await step2();
        await step3();
        await step4();
        return 'done';
    }

上面代码中，await 后面的异步操作是继发执行的，就是 step2 要等待 step1 结束之后才能执行，step3 要等待 step2 结束之后才能行，在继发关系的异步请求中，这是没问题的。但是，执行一些没有关联性的多个异步操作时，这种模式就会产生一些不必要的等待时间。

针对这种情况，我们可以写并发异步请求，从而减少等待时间。

    //写法1
    let [foo,bar] =  await Promise.all([getFoo(),getBar()]);

    //写法2
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;


***
<span id="example"></span>
### 3.实例
下面是模拟的异步请求

    function fn(file){
        return new Promise(function(res,rej){
            setTimeout(function(){
                res(file+'aaa')
            },file)
        })
    }
##### 1.按顺序，依次发送请求，然后按顺序输出结果。

    async function sequence (){
        const d =[100,2000,400,300,500,600] ;

        for (const d of d) {
            const result = await fn(d);
            console.log(result);
        }
    }
    sequence();
    //100aaa
    //2000aaa
    //400aaa
    //300aaa
    //500aaa
    //600aaa

上面代码中，按顺序每个请求都是在上一个请求得到结果后才会发送。

##### 2.并行发送请求，然后按请求顺序输出结果。

    async function parallel (){
        const d =[100,2000,400,300,500,600] ;

        var result = await Promise.all(urls.map(async (url) => {
            const result = await fn(url);
            return result;
        }));
        return result;
    }
    parallel().then( data => console.log(data));
    //["100aaa", "2000aaa", "400aaa", "300aaa", "500aaa", "600aaa"]

上面代码中，map回调函数如果是 async 函数，那么 map 返回的数组的成员将会是 Promise 对象，并且回调函数 return 的值将作为该 Promise 对象 resolve 传递出来的值。

***
<span id="summarize"></span>
### 3.总结
async 函数可以看作是现阶段操作异步程序的终极解决方案，相较于传统的回调函数形式，没有回调地狱；相较于 Promise ，语义上更加清晰，减少了冗余的代码；相较于 Generator 函数，不用编写执行函数。尤其，在处理多个继发或并发请求时，其优点更加明显。

总结 async 函数内容，如下。

1. async 函数返回一个隐式的 Promise 来返回结果。
2. 在 async 函数内部使用 try/catch 来捕获错误。
3. await 作用是跳出当前 async 函数，返回后面表达式的结果。
4. await 只能用在 async 函数里面。

参考：
1. 阮一峰 《ECMAScript 6 入门》http://es6.ruanyifeng.com/#docs/async
2. anfunnysoul 《一次性让你懂async/await，解决回调地狱》https://juejin.im/post/5b1ffff96fb9a01e345ba704
3. Gokul N K 《Understanding async-await in Javascript》 https://hackernoon.com/understanding-async-await-in-javascript-1d81bb079b2c
