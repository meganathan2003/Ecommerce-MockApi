console.clear();
let a = 10;
const url = "http://localhost:5500/users";
fetch(url).then(res =>{
   return res.json();
})
.then(res =>{
    console.log(res);
}) 
console.log(a);
