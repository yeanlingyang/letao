$(function() {
  $('#loginBtn').click(function() {
    var username = $('#username').val().trim();
    var password = $('#password').val();

    //进行非空校验
    if(username==='') {
      mui.toast('请输入用户名');
      return;
    }
    if (password==='') {
      mui.toast('请输入密码');
      return;
    }
    //发送ajax请求  进行登录
    $.ajax({
      type :'post',
      url :'/user/login',
      data :{
        username:username,
        password :password
      },
      dataType :'json',
      success:function(info) {
        if (info.error===403) {
          mui.toast('用户名或密码错误');
          return;
        }
        if (info.success) {
          location.href='user.html'
        }
      }




    })
  })






})