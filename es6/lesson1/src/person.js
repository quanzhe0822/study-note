class Person{
  constructor(){
    this.name='quanzhe'
  }
  sayName(){
    alert(`my name is ${this.name}`)
  }
}
let p = new Person();
p.sayName()