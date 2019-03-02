### 目录
1. [class 简介](#intro)
2. [es5 原型，继承回顾](#es5)
3. [class 语法](#grammer)
4. [class 继承](#inherit)
5. [总结](#summary)

***
<span id="intro"></span>
### 1.class 简介
在其他面向对象语言（比如 java，c++ 等）中，class 类是再也熟悉不过的概念了。通过它可以定义对象的模板，并且在内部创建各种属性和方法。

而 JavaScript 在此之前一直没有类的概念，要生成实例对象只能通过构造函数来实现。现在，引入了 class 之后， 使得原型对象的写法更加清晰，更像面向对象编程的语法了。但是，class 类的作用也是仅此而已，实质是一个基于现有的 JavaScript 原型继承的语法糖，并没有为JavaScript引入新的面向对象的继承模型。

***
<span id="es5"></span>
### 2.es5 创建实例对象，继承回顾
##### 创建实例对象
在 ECMAScript 中，创建对象的方式由好几种，最简单的有 Object 构造函数或对象字面量，稍微复杂一点的有工厂模式，构造函数模式，原型模式，寄生构造函数模式等等。其中，构造函数与原型混成的模式，是目前 es5 中使用最广泛，认同度最高的一种创建自定义类型的方法。

首先，我们先回顾以下 ES5 中使用该模式的方式。

    function Person(name,age){
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function(){
        console.log('My name is'+this.name);
    }
    var mark = new Person('Mark','26');
    var lion = new Person('Lion','26');
    mark.say()
    lion.say()
    //My name is Mark;
    //My name is Lion;

在 ES5 中创建构造函数时，约定俗成，函数名的第一个字母要大写，表示这是一个构造函数。创建一个 Person 的新实例时，使用 new 操作符来调用 Person 构造函数，其过程会经历以下几个步骤。
1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象

创建的每个构造函数都会有一个 prototype（原型）属性，该属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。并且，该对象还有一个自带的属性 constructor，指回其构造函数。

创建完实例对象后，每个实例对象都会由一个内部属性 _ proto _ 来指向 Person.prototype。所以,上面的两个实例对象，mark 和 lion 调用 say 方法时，首先会在自身上寻找该方法，如果没有的话，就会沿着 _ proto _ 属性在原型对象上继续寻找，最后找到该方法，并成功调用。

这种寻找方式的最后终点是 Object 的原型对象，这意味着，在 Person 的原型对象上如果没有找到的话，它还会沿着该原型对象的 _ proto _ 属性继续往下找。用伪代码表示如下。

    mark._proto_._proto_._proto_.........Object.protoype
    //如果，最后都没能找到的话，就会抛出未定义错误。

上面代码中，多个 _ proto _ 组成的链就叫做原型链，并且，这也是实现继承的主要原理。

实例对象，构造函数，原型对象的关系图如下。
![流程](https://res.cloudinary.com/dvix9atu4/image/upload/v1548145095/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190122161654.png)

##### 继承

上一节讲过，ECMAScript实现继承主要是依靠原型链来实现的。下面是 es5 通过原型链实现继承的一个基本模式。

    function Person (name,age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function(){
        console.log('My name is '+this.name);
    }

    function Student (name,age,school){
        Person.call(this,name,age);
        this.school = school;
    }
    Student.prototype = new Person();
    Student.prototype.constructor = Student;
    Student.prototype.study = function(){
        console.log(this.name+'is studying in '+this.school);
    }
    var mark = new Student('Mark',25,'Qinghua');
    mark.study()
    //Mark is studying in Qinghua
    
上面代码中，Person 构造函数内定义了 name 属性和 age 属性。Person 原型定义了一个 say 方法。在 Student 构造函数内，通过使用 call 来调用了 Person 构造函数，这样一来，当创建一个 Student 的实例对象时就会把 this 对象传入到 Person 构造函数，并且把 Person 构造函数的属性添加到 this 上。

接着，通过 Student.prototype 指向 new Person()，Student 构造函数重写了自己的原型对象，这样一来，Student 的实例对象 mark 就可以访问到 Person 的原型对象，并调用say方法。

由于，Stundent 构造函数重写了原型对象，mark 对象的 constructor 属性也不再指向 Student，而指向了 Person。这显然会导致继承链的紊乱（mark明明是用构造函数 Student 生成的），因此必须手动纠正，将 Student.prototype 对象的 constructor 值改为  Student。

下面是继承关系的梳理图

![流程](https://res.cloudinary.com/dvix9atu4/image/upload/v1548232068/imgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190123162623.png)

上图中，每个红色线条通过串联原型对象组成了一个原型链，mark 的 say 方法就是继承自该原型链上的原型对象的。


***
<span id="grammer"></span>
### 3.class 语法
##### 结构与写法

    class Person {
        constructor(name,age){
            this.name = name;
            this.age = age
        }
        say(){
            console.log('My name is'+this.name);
        }
    }
    var mark = new Person('Mark','26');
    mark.say()
    //My name is Mark

上面代码是定义一个类的基本写法，class 后面是类名，名字的第一个字母为大写，相当于 es5 的构造函数名。创建实例方式跟 es5 一样，使用 new 操作符。

类的内部定义了一个 constructor 方法，该方法是构造方法，而 this 关键字代表实例对象。也就是说，ES5 的构造函数对应 ES6 的 constructor 方法。并且，这些类内部的方法是定义在原型 prototype 对象上的，当在实例上调用这些方法，其实就是调用原型上的方法。

    class B {}
    let b = new B();

    b.constructor === B.prototype.constructor // true

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable)。

    class Point {
        constructor(x, y) {
            // ...
        }

        toString() {
            // ...
        }
    }

    Object.keys(Point.prototype)
    // []
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]

上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

**注意点：**
1. 严格模式
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
2. 不存在提升
类不存在变量提升（hoist），这一点与 ES5 完全不同。

        new Foo(); // ReferenceError
        class Foo {}

3. 类的属性名，可以采用表达式。

        let methodName = 'getArea';

        class Square {
            constructor(length) {
                // ...
            }

            [methodName]() {
                // ...
            }
        }

##### 取值函数（getter）和存值函数（setter）
与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

    class MyClass {
        constructor() {
            // ...
        }
        get prop() {
            return 'getter';
        }
        set prop(value) {
            console.log('setter: '+value);
        }
    }

    let inst = new MyClass();

    inst.prop = 123;
    // setter: 123

    inst.prop
    // 'getter'

上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }

        get html() {
            return this.element.innerHTML;
        }

        set html(value) {
            this.element.innerHTML = value;
        }
    }

    var descriptor = Object.getOwnPropertyDescriptor(
        CustomHTMLElement.prototype, "html"
    );

    "get" in descriptor  // true
    "set" in descriptor  // true

上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。

##### this 指向
类的方法内部如果含有 this ，一般默认指向类的实例。但是，要注意，一旦单独使用该方法，很可能报错。

    class Person {
        say(name){
            this.name(name)
        }
        name(name){
            return name 
        }
    }
    const p = new Person();
    const { say } = p;
    say('Mark')//// TypeError: Cannot read property 'say' of undefined

上面代码中，this 默认指向 Person 的实例。但是，如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境，因为找不到 say 方法而导致报错。

一个比较简单的解决方法时，在构造方法中绑定 this，这就不会找不到 say 方法了。

    class Logger {
        constructor() {
            this.say = this.say.bind(this);
        }

        // ...
    }
    

另一种方法是使用箭头函数

    class Person {
        constructor(){
            this.say = (name) => {
                this.name(name)
            }
        }
    }

##### 静态方法和静态属性
所谓静态方法，就是直接通过类来调用的方法。定义的方式是，在方法前面加 static 关键字，表明该方法是一个静态方法。

    class Person {
        static say(){
            return 'hello';
        }
    }
    
    Person.say()//'hello'
    var p = new Person();
    p.say()
    // TypeError: foo.classMethod is not a function

一般方法与静态方法区别在于，静态方法是直接定义在类身上，而不是在原型对象上。所以，试图使用实例调用静态方法时，如果原型上也没有该方法，就会无法找到而报错。

注意，如果静态方法包含 this 关键字，指的时类，而不是实例。

    class Foo {
        static bar() {
            this.baz();
        }
        static baz() {
            console.log('hello');
        }
        baz() {
            console.log('world');
        }
    }

    Foo.bar() // hello
    
父类的静态方法，可以被子类继承。

    class Foo {
        static classMethod() {
            return 'hello';
        }
    }

    class Bar extends Foo {
    }

    Bar.classMethod() // 'hello'

静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。

    class Foo{}
    Foo.prop = 1;
    Foo.prop //1

目前，只有这种方法可行，因为ES6明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上 static 关键字。

    class MyClass {
        static myStaticProp = 42;
        constructor (){
            console.log(MyClass.myStaticProp);//42
        }
    }

##### 私有方法和私有属性
现有的私有方法和私有属性解决方案，只能是在类的内部访问的方法和属性，外部不能访问。这时常见需求，有利与代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区分。

    class Widget {

        // 公有方法
        foo (baz) {
            this._bar(baz);
        }

        // 私有方法
        _bar(baz) {
            return this.snaf = baz;
        }

        // ...
    }

上面代码中，使用 _ 先来表示这是私有方法，只能在内部调用。但是，这种命名时不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部所有方法都是对外可见的。

    class Widget {
        foo (baz) {
            bar.call(this, baz);
        }

        // ...
    }

    function bar(baz) {
        return this.snaf = baz;
    }

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个 Symbol 值。

const bar = Symbol('bar');
const snaf = Symbol('snaf');

    export default class myClass{

        // 公有方法
        foo(baz) {
            this[bar](baz);
        }

        // 私有方法
        [bar](baz) {
            return this[snaf] = baz;
        }

        // ...
    };

上面代码中，bar和snaf都是Symbol值，一般情况下无法获取它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。

    const inst = new myClass();

    Reflect.ownKeys(myClass.prototype)
    // [ 'constructor', 'foo', Symbol(bar) ]

目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
    class Widget {

        // 公有方法
        foo (baz) {
            this.#bar(baz);
        }

        // 私有方法
        #bar(baz) {
            return this.snaf = baz;
        }

        // ...
    }
    var d = new Widget();
    d.foo('hello');
    d.#bar()//报错

上面代码中，在类的外部直接调用私有方法#bar 就会报错。

私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性。

    class Foo {
        #privateValue = 42;
        static getPrivateValue(foo) {
            return foo.#privateValue;
        }
    }

    Foo.getPrivateValue(new Foo()); // 42

##### new.target 属性
ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果，构造函数不是通过 new 命令调用的，new.target 就返回 undefined ，因此这个属性可以用来确定构造函数是怎么调用的。

    function Person(name) {
        if (new.target === Person) {
            this.name = name;
        } else {
            throw new Error('必须使用 new 命令生成实例');
        }
    }

    var person = new Person('张三'); // 正确
    var notAPerson = Person.call(person, '张三');  // 报错

当子类继承父类时，new.target会返回子类。

利用这个特点，可以写出不能独立使用，必须继承后才能使用的类。

    class F {
        constructor(){
            if(new.target === 'F'){
                thorow new Error('本类不能实例化');
            }
        }
    }

    class C extends F{ 
        constructor(){
            super();
            console.log('Child');
        }
    }
    var f = new F()//报错
    var c = new C()//Child

***
<span id="inherit"></span>
### 4.class 继承
##### 方式

使用 class  结构实现继承，离开不了两个关键字 extends，super。先看一下使用该方式实现继承的例子。

    class Animal {
       constructor(name,weight){
           this.name = name;
           this.weight = weight;
       }
       eat() {
           return `${this.name} is eating`
       }
       sleep() {
           return `${this.name} is sleeping`
       }
    }
    class Monkey extends Animal {
        constructor(name,weight){
            super(name,weight)
            this.age = 2
        }
        climbTress() {
            return `${this.name} is climbing trees`;
        }
        dailyRoutine() {
            return `${super.eat()} ${super.sleep()}`
        }
    }

    const monkey = new Monkey('Mark','60kg');
    monkey.climbTrees();
    //Mark is climbing trees
    monkey.dailyRoutine();
    //Mark is eating Mark is sleeping

上面代码中，通过 extends 关键字，Monkey 继承了 Animal 的所有属性和方法。可以看出相较于 es5 复杂传统的继承方式，es6 的继承方式简洁了许多，也更加直观易懂了。

##### 与 es5 的区别

另外，Monkey 类中出现了2次不同类型的super。第一个 super 作为函数被调用，第二个 super 作为一个对象调用了父类的 eat() 方法。

虽然，es6 继承和 es5 传统的继承都是基于原型链模式的。但是，内部具体过程还是稍有不同的。其中，super 就是产生不同之处的原因之一。

在 es5 中，通常使用 Parent.call(this,arg1,arg2) 方式来继承父类的实例属性。其具体过程是，子类使用 new 操作符实例化，同时创建一个新对象并且定义 this 指向该对象，然后使用 call 调用父类构造函数，同时把 this 对象传入父类构造函数添加父类的属性。

而在 es6 中，子类实例化过程是通过构造函数内的 super 函数来定义 this 对象的，并且，该 this 对象会继承父类的实例属性。换句话说，如果 Monkey 构造函数内没有 super 函数，当创建实例对象的时候下面的 this.name 也就没有什么意义，也不会继承父类的属性，并且程序也会报错，中断执行。

    class Animal {
       constructor(name,weight){
           this.name = name;
           this.weight = weight;
       }
    }
    class Monkey extends Animal {
        constructor(name,weight){
            this.age = 2
        }
    }
    class Elephont extends Animal {
        constructor(name,weight){
            this.age = 2
            super(name,weight)
        }
    }
    const monkey = new Monkey('Mark','60kg');
    //Uncaught ReferenceError: Must call super constructor in der....
    const elephont = new Elephont('Mark','200kg');
    //Uncaught ReferenceError: Must call super constructor in der....

上面代码中，因为在子类的构造函数中没有调用 super 函数就抛出了引用错误，而且，如果是像 Elephont 子类一样在实例属性定义之后调用也会抛出错误。

当一个类继承了其他类的时候，子类构造函数内的 super 调用是必不可少的，且只能在构造函数内调用，作用是定义 this 对象，继承父类的实例属性。

Monkey 子类中的第二个 super 是以对象的形式调用了父类的方法，所以，也可以写成下面这种形式。

    super.eat()
    //等同于
    Animal.prototype.eat.call(this)

总结一下 super 的作用。
1. 作为函数，调用父类构造函数，定义 this 对象；
2. 作为对象，指向父类的原型对象，并且可以调用该对象上的方法。

另外一个 es6 继承和 es5 继承不同之处在于继承链的个数。

在 es5 中继承是通过子类原型对象的 _proto_ 指向父类原型对象而实现的。但是，在 es6 中除了这条继承链，还有一条额外的类之间的继承链。

    class Animal {
       constructor(name,weight){
           this.name = name;
           this.weight = weight;
       }
       static d(){
           console.log('这时静态方法！')
       }
    }
    class Monkey extends Animal {
        constructor(name,weight){
            super(name,weight)
            this.age = 2
        }
    }
    var m = new Monkey('mark',20);
    //第一条,原型对象之间的继承链
    m._proto_._proto_ === Animal.prototype //true
    Monkey.prototype._proto_ === Animal.prototype //true

    //第二条,类之间的继承链
    Monkey._proto_ === Animal //true

    Monkey.d()//这时静态方法！
   
上面代码中，由于类之间有直接的继承关系，所以子类也可以调用父类的静态方法了。

##### 原生构造函数的继承
原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。

    function MyArray() {
        Array.apply(this, arguments);
    }

    MyArray.prototype = Object.create(Array.prototype, {
        constructor: {
            value: MyArray,
            writable: true,
            configurable: true,
            enumerable: true
        }
    });

上面代码定义了一个继承 Array 的 MyArray 类。但是，这个类的行为与 Array 完全不一致。

    var colors = new MyArray();
    colors[0] = "red";
    colors.length  // 0

    colors.length = 0;
    colors[0]  //red 

之所以发生这种情况，是因为子类无法获得原生结构构造函数的内部属性，通过 Array.apply() 或者分配给原型对象都不行。原生构造函数会忽略 apply 方法传入的 this ，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。

但是，es6 允许继承原生构造函数定义子类，下面是使用 es6 继承 Array 的例子。

    class MyArray extends Array {
        constructor(...args) {
            super(...args);
        }
    }

    var arr = new MyArray();
    arr[0] = 12;
    arr.length // 1

    arr.length = 0;
    arr[0] // undefined



***


