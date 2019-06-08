//登录拦截
$.ajax({
  url :'/employee/checkRootLogin',
  dataType :'json',
  success:function(info){
    if (info.error===400) {
      location.href = 'login.html';
    }
  }
})