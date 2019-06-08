$(function() {

  // 1. 渲染个人数据, 获取自己的数据, 只要登录了, 就不需要传参了 (后台知道你是谁)
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      // 优先处理错误
      if (info.error === 400) {
        // 未登录, 拦截到登录页
        location.href = 'login.html';
      }

      // 已登录的用户, 会得到用户信息, 需要渲染
      var htmlStr = template('userTpl', info);
      $('#userInfo').html(htmlStr);
    }
  })


  // 2. 退出功能
  $('#logout').click(function() {
    // 发送ajax请求, 退出
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  });

});