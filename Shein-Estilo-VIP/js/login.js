document
.getElementById("loginBtn")
.onclick=function(){

const user=document
.getElementById("username")
.value;

const pass=document
.getElementById("password")
.value;

if(user==="admin"&&pass==="123456"){

localStorage.setItem(
"currentUser",
JSON.stringify({

name:user,

role:"boss"

})
);

location.href="index.html";

return;

}

if(user==="staff"&&pass==="123456"){

localStorage.setItem(
"currentUser",
JSON.stringify({

name:user,

role:"staff"

})
);

location.href="index.html";

return;

}

alert("用户名或密码错误");

}