$(function() {
  // 登录功能
  $('#loginBtn').click(function() {
    // 获取用户名 和 密码
    var username = $('#username').val().trim();
    var password = $('#password').val();
    
    // 非空校验
    if (username === '') {
      mui.toast('请输入用户名');
      return;
    }
    if (password === '') {
      mui.toast('请输入密码');
      return;
    }

    // 发送 ajax 请求, 进行登录
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function( info ) {
        console.log(info);
        if (info.error === 403) {
          mui.toast('用户名或密码错误');
          return;
        }

        if (info.success) {
          // 登录成功
          // (1) 如果地址栏有传递过来的参数, 说明需要跳回去
          // (2) 如果地址栏没有传递过来的参数, 跳转到用户中心 
          if (location.search.indexOf('retUrl') != -1) {
            // 说明有传参, 获取传递过来的地址, 跳转
            var retUrl = location.search.replace('?retUrl=', '');
            location.href = retUrl;
          }
          else {
            // 没有传地址过来
            location.href = 'user.html';
          }
        }
      }
    })

  });

});