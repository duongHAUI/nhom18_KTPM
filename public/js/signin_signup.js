//khung đăng nhập
let btnRegister= document.getElementById('btnRegister');
let btnLogin= document.getElementById('btnLogin');

//trong khung đky
let layoutRegister= document.getElementById('register');
let btnSignUp= document.getElementById('btnSigup');

//hiển thị khung đăng ký
btnRegister.addEventListener('click',async function(e){
  e.preventDefault();
  layoutRegister.classList.add("registerd")
})


// ấn nút sign me up trong khung đăng ký
let formRegister= document.getElementById('formRegister')
btnSignUp.addEventListener("click", function(e){
  e.preventDefault();
  let username= document.getElementById("user").value;
  let password1= document.getElementById("pass1").value;
  let password2= document.getElementById("pass2").value;
  if (username && password1 && password2 &&  password1===password2){
    layoutRegister.classList.remove('registerd');
    formRegister.submit();
  }else {
    alert("Hãy nhập  mật khẩu trùng khớp");
  }
})


//ấn đăng  nhập
let formLogin= document.getElementById('formLogin');
btnLogin.addEventListener('click', function(e){
  formLogin.submit();
})

let btnCancel= document.getElementById('btnCancel');
btnCancel.addEventListener('click', function(e){
  e.preventDefault();
  layoutRegister.classList.remove('registerd');
})