### 目录
1. [Iterator 概念](#iterator)
2. [默认 Iterator 接口](#api)
3. [调用 Iterator 接口的场合](#use)
4. [字符串的 Iterator 接口](#string)
5. [Iterator 接口与 Generator 函数](#generator)
6. [遍历器对象的 return(), throw()](#break)
7. [for...of](#forof)

***

<span id="iterator"></span>
### 1.Iterator 概念
在ES5中有多种遍历数据的方法，从简单的for循环到map()和filter()等，可用于数组，字符串，nodeList等集合。但是，对于ES6新添加的Set和Map数据结构，这些方法是不支持的，所以ES6就创建了一种能统一处理这些不同数据的机制，这就是Iterator。

Iterator作用是，提供统一的，简便的访问接口；使得数据结构的成员能够按某种次序排列；供for...of消费。

for...of是ES6新增的，专门使用Iterator接口来进行遍历的新语法(后文有介绍)。

Iterator遍历过程中，Iterator会作为一个指针对象，通过next()方法指向数据结构的每个成员来进行遍历。具体过程看下面代码。

    function makeIterator (array) {
      let index = 0;
      return {
        next: function(){
          return index > array.length ?
          {value: array[index++],done:false} :
          {value: undefined,done: true};
        }
      }
    }
    var iterator = makeIterator([1,2,3]);
    iterator.next()//{value:'1',done:false}
    iterator.next()//{value:'2',done:false}
    iterator.next()//{value:'3',done:false}
    iterator.next()//{value:undefined,done:true}

生成器函数makeIterator返回Iterator对象，然后通过next方法进行遍历，并返回当前成员的信息。不断调用next方法，直到返回{value:undefined,done:true}对象，表示遍历结束。其中done:false和value:undefined属性可以省略。

***
<span id="api"></span>
### 2.默认 Iterator 接口
ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是"可遍历的(iterable)"。

Symbol.iterator是遍历器生成函数，返回遍历器对象。

至于属性名Symbol.iterator，他是一个表达式，预定义好的，类型为Symbol的特殊值。

原生具备Iterator接口的数据结构：
- Array
- Map
- Set
- String
- TypedArray
- 函数的arguments对象
- NodeList 对象

对于这些原生部署Iterator接口的数据结构，可以直接使用for...of进行遍历，但是，其他数据结构（主要是对象),都需要自己在Symbol.iterator属性上面部署遍历器生成函数，才会被for...of循环遍历。

##### 例1.类部署Iterator接口

    class RangeIterator {
      constructor(start,stop) {
        this.value = start;
        this.stop = stop;
      }
      [Symbol.iterator]() {
        return this;
      }
      next() {
        return this.value < this.stop ?
        {value:this.value++,done:false} :
        {value:undefined,done:true}
      }
    }

    function range(start,stop) {
      return new RangeIterator(start,stop)
    }
    for (var a of range(0,4)){
      console.log(a)//0,1,2,3
    }

##### 例2.给对象部署Iterator

    let obj = {
      value: ['a','b','c'],
      [Symbol.iterator]: function() {
        var index = 0;
        var _this = this;
        return {
          next: function() {
            if(index < _this.value.length) {
              return {done: false,value: _this.value[index++]}
            }else {
              return {done: true, value: undefined}
            }
          }
        }
      }
    }

##### 例3.类似数组的对象引用Iterator

对于类似数组的对象，可以直接引用数组的Iterator接口

    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

或

    let iterable = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3,
      [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };
    for (let i of iterable) {
      console.log(i)//'a','b','c'
    }

***
<span id="use"></span>
### 3.调用 Iterator 接口的场合
默认调用Iterator接口(Symbol.iterator)的场合。
##### 1.结构赋值

    let set = new Set([1,2,3,4]);
    let [a,b,c,d] = set;
    //a=1,b=2,c=3,d=4

##### 2.扩展运算符

    let str = 'hello';
    [...str] //['h','e','l','l','o'];

    let arr = ['b','c'];
    ['a',...arr,'d']//['a','b','c','d']

只要某个数据结构部署了Iterator接口，就可以通过扩展运算符转为数组。
##### 3.yield*

    let generator = function* () {
      yield 1;
      yield* [2,3,4];
      yield 5;
    };

    var iterator = generator();

    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }

##### 4.其他场合
一些把数组作为参数的方法，其实内部都调用了遍历器。
- for...of
- Map(),Set(),WeakMap(),WeakSet()
- Promise.all()
- Promise.race()

***
<span id="string"></span>
### 4.字符串的 Iterator 接口
字符串是一个类似数组的对象，也原生具有Iterator接口。

    let str = 'string';
    let itr = str[Symbol.iterator]();
    itr.next()//{value:'s',done:false}
    itr.next()//{value:'t',done:false}
    itr.next()//{value:'r',done:false}
    ...

***
<span id="generator"></span>
### 5.Iterator 接口与 Generator 函数

    let myIterable = {
      [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
      }
    }
    [...myIterable] // [1, 2, 3]

    // 或者采用下面的简洁写法

    let obj = {
      * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    };

    for (let x of obj) {
      console.log(x);
    }
    // "hello"
    // "world"

上面代码中，Symbol.iterator方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。

***
<span id="break"></span>
### 6.遍历器对象的 return(), throw()
Iterator对象除了next方法，还可以具有return方法和throw方法。如果自己写遍历器生成函数，next方法是必须部署的，return方法和throw方法是可选的。

return方法使用场景是，如果for...of遍历中，有break或者出错，就会调用return方法。

    arr[Symbol.iterator] = function() {
      var _this = this;
      var index = 0;
      return {
        next(){
          if(index < _this.length) {
            return {value:_this[index++],done:false}
          }else {
            return {value:undefined,done:true}
          }
        },
        return(){
          console.log('已中断')
          return {value: undefined,done:true}
        }
      }
    }
    //情况1
    var arr = [1,3,4,5,6];
    for(var i of arr) {
      if(i === 4) {
        break;
      }
      console.log(i)//1,3,已中断
    }
    //情况2
     var arr = [1,2,'str',5,6];
    for(var i of arr) {
      if(typeof i === 'string') {
        throw new Error('数组中有字符串')
      }
      console.log(i)//1,3,Uncaught Error:数组中有字符串
    }

throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

***
<span id="forof"></span>
### 7.for...of
for...of 是ES6新引入的循环，内部通过调用Iterator接口来进行遍历获得键值。也就是说，部署了Symbol.iterator属性的数据据结构，都可以使用for...of进行循环遍历。
##### 数组
数组原生具备iterator接口，for...of循环本质上调用这个接口产生的遍历器。

    const arr = [1,2,3];
    for (var a in arr) {
      console.log(a)//1,2,3
    }

    const obj = {};
    obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr)
    for (let a in obj) {
      console.log(a) //1,2,3
    }

##### Set和Map结构
Set和Map结构也原生具有Iterator接口，可以直接使用for...of循环。

    let set = new Set(['a','b','b','c','d']);
    for (var s of set) {
      console.log(s)//a,b,c,d
    }

    let map = new Map();
    map.set('a',1);
    map.set('b',2);
    map.set('c',3);
    for (var m of map){
      console.log(m);
    }
    //[a,1]
    //[b,2]
    //[c,3]

  ##### 计算生成的数据结构
 有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

- entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
- keys() 返回一个遍历器对象，用来遍历所有的键名。
- values() 返回一个遍历器对象，用来遍历所有的键值。

这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。
    
    var arr = [1,2,3,4];
    for(var a of arr.entries()){
      console.log(a)
    }
    //[0,1]
    //[1,2]
    //[2,3]
    //[3,4]

##### 类似数组的对象

类似数组的对象包括好几类。下面是for...of循环用于字符串，DOM NodeList对象，arguments对象的例子。

    //字符串
    let str = "hello";
    for (let s of str) {
      console.log(s)//h e l l o
    }

    //DOM NodeList对象
    let eles = document.querySelectorAll('a');
    for(let e of eles) {
      e.setAttribute('target','_blank');
    }

    // arguments对象
    function printArgs() {
      for (let x of arguments) {
        console.log(x);
      }
    }
    printArgs('a', 'b');
    // 'a'
    // 'b'

##### 对象
对于普通的对象，for...of结构不能直接使用，会报错，必须部署Iterator接口，或者使用Oject.keys方法将对象的键名生成一个数组，然后遍历这个数组。

    let obj = {
      a:1,
      b:2,
      c:3
    }
    for (var key of Object.keys(obj)) {
      console.log( `${key}:${obj[key]}`)
    }
    //a:1
    //b:2
    //c:3

##### 与其他遍历语法的比较
最原始的写法for循环，写起来比较麻烦，因此数组提供内置forEach方法。
forEach方法问题在于，无法中途跳出，break命令或return命令都不能奏效。

for...in循环缺点

- 数组的键名，使用字符串表示
- 可能会遍历原型链上的键
- 某些情况下，for...in循环会以任意顺序遍历键名。

总之，for...in循环主要是为遍历对象而设计的，不适用于数组。

for...of优点

- 语法简洁，没有for...in那些缺点
- 可以中途跳出
- 提供了所有数据结构的统一操作接口。




参考：阮一峰 [《ECMAScript 6 入门》](#http://es6.ruanyifeng.com/#docs/promise)