function f(...e){
  console.log(e)
  let arr=[]
  arr.push(...e)
  console.log(arr)
}
f(...[1,3,4])