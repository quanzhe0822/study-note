### 目录
1. [Generator 简介](#generator)
2. [next 方法的参数](#next)
3. [for...of 循环](#forof)
4. [Generator.prototype.throw()](#throw)
5. [Generator.prototype.return()](#return)
6. [yield* 表达式](#yield)
7. [作为对象属性的 Generator 函数](#prop)
8. [Generator 函数的this](#this)
9. [应用](#use)
10. [总结](#summary)

***

<span id="generator"></span>
### 1.Generator 简介
##### 基本概念
Generator 函数是ES6引入的新型函数，调用方法跟普通函数一样，也是在函数名后面加上一对圆括号。但是，不同的是，此时Generataor内部代码并不会马上执行，而是先返回一个保存内部状态的生成器对象，然后通过该对象的next方法执行函数内部代码。

**该生成器对象符合可迭代协议和迭代器协议，也就是说可以被for...of，扩展运算符，解构赋值等操作遍历。**

    function* a{
      yield 1;
      yield 2;
      yield 3;
    }
    [...a]//1,2,3


Generator最大的特点是，可以控制函数执行的暂停和恢复，类似于程序的断点测试，我们可以设置一个断点，每次到达断点程序就会停止，然后我们点击继续，程序又恢复执行。Generator中我们可以通过 yield 表达式设置这样的断点，当函数执行到yield时候就会暂停，然后通过next 方法就可以恢复执行。

    function* g() {
      console.log('start');
      yield 1;
      console.log('continue..');
      yield 2;
      console.log('end');
    }
    var t = g();
    t.next();//返回{ value: 1, done: false}  控制台上会打印start
    t.next();//返回{ value: 2, done: false}  控制台上会打印continue...
    t.next();//返回{ value: undefined, done: true}  控制台上会打印end
    
上面代码中第一次调用next方法，Generator函数开始执行，直到执行到第一个yield表达式为止。next方法返回一个对象，它的value属性值就是当前yield表达式的值1，done属性的值则为false，表示遍历还没有结束。

第二次调用next方法,代码会从上一个暂停点继续往下执行，直到执行到下一个yield。 第三次调用next方法,此时返回的对象的**value**属性值为**undefined**，**done**属性值为**true**，表示遍历结束。以后再调用next方法，返回的都是这个值。

函数具有return的情况。

    function* r(){
      yield 'a';
      yield 'b';
      return 'end';
    }
    var t = r();
    t.next()//{value: 'a', done: false}
    t.next()//{value: 'b', done: false}
    t.next()//{value: 'end', done: true}
    t.next()//{value: undefined, done: true}

调用next方法，并且执行到return语句时，该方法返回的对象的value属性为return语句后面的表达式的值，done属性为true，表示遍历结束。

##### yield 表达式
yield表达式，如上文中提到过的，在函数中能起到暂停标志的作用，并且可以生成一系列的值。
yield表达式只能用在Generator函数里面，用在其他地方都会报错。

    (function(){
      yield 1;
    })()
    //SyntaxError: Unexpected number

    function* a(arr){
      arr.forEach(function(v,i){
        yield v
      })
    }
    //Uncaught SyntaxError: Unexpected identifier

yield 表达式如果用在另一个表达式之中，必须放在圆括号里。

    function* a(){
      console.log('Hello' + yield);//SyntaxError

      console.log('Hello'+(yield));//ok
    }

yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

    function* a(){
      f(yield 1,yield 2);
      let d = yield 222;
    }


<span id="next"></span>
### 2.next 方法的参数
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

    例1.
    function* a(){
      console.log('start');
      var d= yield 1;
      console.log(d);
      yield 2;
    }
    var g = a();
    a.next();//控制台打印start 返回{value:1,done:false}
    a.next('continue');//控制台打印continue 返回{value:2,done:false}
    例2.
    function* f(){
      for(var i = 0; true; i++) {
        var reset = yield i;
        if(rest) i = -1;
      }
    }
    var g =f();
    g.next();//{ value: 0, done: false }
    g.next();//{ value: 1,done: false }
    g.next('r');//{valur: 0,done: false}

例2中第一次调用next方法时，函数会执行到yield表达式为止，注意，此时还未进行rest赋值操作。

当第二次调用next方法时，接着往下执行，把上一个yield的返回值赋给reset，由于此时并未传参所以reset接收到的值是undefined。开始第二轮循环，执行到yield，程序暂停，返回value值为1的对象。

第三次调用next方法，由于本次next方法带有参数，所以上一个yield的返回值变为'r',并赋给了变量rest。最终，因为受到传参的影响，下一轮循环就会从0开始递增。

**其实上面代码演示了一个非常重要的功能，就是在 Generator 函数运行的不同阶段，通过向内部注入不同的值，我们可以调整函数的行为。**

再看一个例子。

    function* f(x){
      var y = 2 * (yield (x + 1));
      var z = yield (y/3);
      return (x + y + z);
    }
    var a = foo(5);
    a.next() // Object{value:6, done:false}
    a.next() // Object{value:NaN, done:false}
    a.next() // Object{value:NaN, done:true}

    var b = foo(5);
    b.next() // { value:6, done:false }
    b.next(12) // { value:8, done:false }
    b.next(13) // { value:42, done:true }

**注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。**

再看一个通过 next 方法的参数，向generator函数内部输入值的例子。

    function* dataConsumer() {
      console.log('Started');
      console.log(`1. ${yield}`);
      console.log(`2. ${yield}`);
      return 'result';
    }

    let genObj = dataConsumer();
    genObj.next();
    // Started
    genObj.next('a')
    // 1. a
    genObj.next('b')
    // 2. b

如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外再包一层。

    function wrap(g) {
      return function (...args){
        var gen = g(...args);
        gen.next();
        return gen;
      }
    }
    var w = wrap(function* f(){
      console.log(`First input: ${yield}`);
      return 'DONE';
    });
    w().next('hello');
***

<span id="forof"></span>
### 3.for...of 循环
for...of循环可以自动遍历Generator函数生成的生成器对象，且此时不再需要调用next方法。

    function* foo(){
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      return 5;
    }
    for (let v of foo()){
      console.log(v)//1,2,3,4
    }

下面是利用 Genenrator 函数和for...of循环，实现斐波那契数列的例子。

    function* f(){
      var [cur,next] = [0,1];
      for(;;) {
        yield cur;
        [cur,next] = [next,cur+next]
      }
    }
    for (let n of f()) {
      if(n > 10000) break;
      console.log(n);
    }
***

<span id="throw"></span>
### 4.Generator.prototype.throw()
Generator 函数返回的遍历器对象，都有一个throw方法，可以再函数体外抛出错误，然后在Generator函数体内捕获。

    var g = function* (){
      yield 11;
      try {
        yield;
      } catch (e) {
        console.log(e);
      }
    };
    var i = g();
    i.next();
    i.next();
    i.throw(new Error('出错了'))

throw方法可以接受一个参数，该参数会被catch语句接受。

执行throw方法时，如果 Generator 内部或者在外部没有被catch语句捕获，程序将会报错，直接中断执行。

当 Generator 函数内部未执行到try语句或者执行完try语句后，执行throw方法也都会报错，直接中断执行。

比如，下面代码中，如果throw方法执行在第一个next方法之后，由于此时函数内部未执行到try语句，所以就会直接报错，中断执行。

    var g = function* (){
      yield 11;
      try {
        yield;
      } catch (e) {
        console.log(e);
      }
    };
    var i = g();
    i.next();
    i.throw(new Error('出错了'))
    i.next();
    //整个程序会报错，直接中断执行
   
**所以，当使用throw方法时，其执行次序尤为重要。**
当thorw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。

    var gen = function* gen(){
      try {
        yield console.log('a');
      } catch (e) {
        // ...
      }
      yield console.log('b');
      yield console.log('c');
    }

    var g = gen();
    g.next() // a
    g.throw() // b
    g.next() // c

上面代码中，g.throw()方法捕获以后，自动执行了一次next方法，所以会打印b。另外，也可以看到，只要 Generator 函数内部捕获了这个错误，那么并不会影响到函数的继续执行。

但是，如果throw是在 Generator 函数外部被捕获的话，生成器对象的遍历就会直接结束，即使后面还有yield表达式。

    var g = function* () {
      yield console.log(1);
      yield console.log(2);
      yield console.log(3);
    };
    var i = g();
    i.next();//控制台打印1
    try {
      i.throw('error');
    } catch (e) {
      console.log(e)
    }
    console.log('continue...')//continue...
    i.next();//返回 {value:undefined,done:true}
    i.next();//返回 {value:undefined,done:true}
  
可以看出，throw方法在函数体外被捕获之后，虽然程序没被中断，可以继续执行。但是，此时Generator 函数已经结束了执行。即使继续调用next方法，也无法恢复执行。

Generator 函数体外抛出的错误，可以在函数体内捕获；返回来，Generator函数体内抛出的错误，也可以被函数体外的catch捕获。

    function* foo() {
      var x = yield 3;
      var y = x.toUpperCase();
      yield 11;
    }
    console.log('continue');
    yield 2222;

    var it = foo();

    it.next(); // { value:3, done:false }

    try {
      it.next(42);
    } catch (err) {
      console.log(err);
    }
    it.next();{value:undefined,done:true}
    it.next();{value:undefined,done:true}

上面代码中，第二个next方法向函数体内传入一个参数 42，数值是没有toUpperCase方法的，所以会抛出一个 TypeError 错误，被函数体外的catch捕获。

并且，这时候 Generator 函数执行也结束了，如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

***

<span id="return"></span>
### 5.Generator.prototype.return()
Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。

    function* gen() {
      yield 1;
      console.log('continue')
      yield 2;
      yield 3;
    }

    var g = gen();

    g.next()        // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    g.next()        // { value: undefined, done: true }

上面代码中，**当执行return方法时 Generator 函数的遍历就会结束**，之后调用next方法返回值的value为undefined，done为true。return方法返回值的value就是return方法的参数foo，如果不提供参数就返回undefined。

如果 Generator 函数内部有 try...finally代码块，且正在执行try代码块，那么 return 方法会推迟到finally代码块执行完再执行。

    function* g(){
      yield console.log(1);
      try{
        yield console.log(2);
      } finally {
        yield console.log(3);
        yield console.log(4);
      }
      yield console.log(5);
      yield console.log(6);
    }
    var ge = g();
    ge.next();//1
    ge.next();//2
    ge.finally('end');//3
    ge.next();//4
    ge.next()//{value:'end',done:true};
    ge.next()//{value:undefined,done:true};

上面代码中,调用return方法时 Generator 函数正执行try...fianlly代码块，所以return方法会推迟到finally代码块执行完再执行。


***

<span id="yield"></span>
### 6.yield* 表达式
如果再 Generator 函数内部，调用另一个 Generator 函数，默认情况下时没有效果的。

    function* foo() {
      yield 1;
      yield 2;
    }
    function* bar() {
      yield 3;
      foo();
      yield 4;
    }
    for (let v of bar()){
      console.log(v);
    }
    //3,4

上面代码中，foo和bar都是Generator函数，在bar里面调用foo，是不会有效果的。

这个就需要用到yield* 表达式，yield* 可以遍历生成器对象。

    function* foo() {
      yield 1;
      yield 2;
    }
    function* bar() {
      yield 3;
      yield* foo();
      yield 4;
    }
    //等同于
    function* bar() {
      yield 3;
      yield 1;
      yield 2;
      yield 4;
    }
    //等同于
    function* bar() {
      yield 3;
      for (let v of foo()){
        yield v;
      }
      yield 4;
    }
    for (let v of bar()){
      console.log(v);
    }
    //3,1,2,4

通过上面代码，我们可以把yield* 看作是在 Genertor 函数内部的 for...of简写，区别在于yield*可以接受函数return的值，而for...of是无法接受该值的，如下面代码。

    function* f(){
      yield 1;
      yield 2;
      return 'done'
    }
    function* p(){
      yield 'x';
      var a = yield* f();
      console.log(a);
      yield 'y';
    }
    for (let v of p()){
      console.log(v);
      
    }
    //x,1,2,done,y

不仅是生成器对象，只要是符合迭代器协议的数据 yield* 都可以遍历。

    function* g(){
      yield* ['a','b','v'];
      yield* 'hello';
    }
    for(var a of g()){
      console.log(a);
    }
    //a,b,v,h,e,l,l,o

yield* 可以很方便地取出嵌套数组的所有成员。

    function* iterTree (tree) {
      if (Array.isArry(tree)) {
        for(let i = 0;i < tree.length; i++) {
          yield* iterTree(tree[i]);
        }
      } else {
        yield tree;
      }
    }

    const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

    for(let x of iterTree(tree)) {
      console.log(x);
    }
    // a
    // b
    // c
    // d
    // e


***

<span id="prop"></span>
### 7.作为对象属性的 Generator 函数
如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

    let obj = {
      * g() {
        ...
      }
    }

它的完整形式如下，与上面的写法是等价的。

    let obj = {
      g: function* () {}
    }

***

<span id="this"></span>
### 8.Generator 函数的this
Generator 函数总是返回一个生成器对象，ES6 规定这个生成器对象是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。

    function* g() {
      this.a = 1;
    }
    g.prototype.hello = function () {
      return 'hi!';
    }
    let obj = g();
    obj instanceof g //true
    obj.hello()// 'hi!';
    obj.next();
    obj.a//undefined

上面代码表明，Generator 函数g返回的生成器对象，是g的实例，而且继承了g.prototype。但是，如果把g当作普通的构造函数，并不会生效，因为g并未返回一个this对象，所以obj对象也拿不到函数内部的this.a属性。

而且，使用 new 命令也会报错。

    function* G() {
      yield this.x = 2;
    }
    new G();
    // TypeError: F is not a constructor

那有什么方法可以获取到this.a呢？

下面是一个变通方法。通过call方法把 Generator 函数内部的this绑定到其prototype对象上，这样prototype上就具有了a属性。

    function* F() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }
    
    var f = F.call(F.prototype);
    f.next();
    f.next();
    f.next();
    f.a //1
    f.b //2
    f.c //3
    


***

<span id="use"></span>
### 9.应用
##### 图片懒加载 

    function* lazyLoad(url) {
      yield loadImage(url);
      showImage();
    }
    function loadImage(url){
      var img = new Image();
      img.src = url;
      img.onload = function() {
        g.next();
      }
    }
    var g = lazyLoad(url);
    g.next();

##### Ajax异步操作，同步方式表达

    function* main() {
      var result = yield request("http://some.url");
      var resp = JSON.parse(result);
        console.log(resp.value);
    }

    function request(url) {
      makeAjaxCall(url, function(response){
        it.next(response);
      });
    }

    var it = main();
    it.next();

***
<span id="summary"></span>
### 10.总结
Generator函数是一个可以控制内部执行的函数，首先使用yield表达式定义每种状态，然后通过返回的生成器对象的next方法分段执行每一种状态。并且，通过传参的形式，还可以控制内部代码的具体行为。

下图是具体流程
![流程](https://res.cloudinary.com/dvix9atu4/image/upload/v1544151262/avatar/1_0pLkX6yrbV2r6_pZ10AIvQ.png)

返回的生成器对象是一个可遍历的数据结构。

调用return方法可以直接结束函数的执行，调用throw方法可以抛出错误。

yield* 遍历符合可迭代协议和迭代器协议的数据结构。







参考：阮一峰 [《ECMAScript 6 入门》](#http://es6.ruanyifeng.com)