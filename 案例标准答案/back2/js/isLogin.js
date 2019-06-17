// 登录拦截, 本身在后台实现的, 用于一访问页面, 后台就可以判断该用户是否登录, 一旦未登录
// 直接重定向(跳转)到登录页

// 基于前端实现的登录拦截, 前端不知道当前用户的登录状态, 所以需要发送ajax请求, 去获取用户的登录状态
// 一进入页面, 获取用户的登录状态
// (1) 如果已登录, 不管, 让用户继续访问
// (2) 如果未登录, 拦截到登陆页
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function(info) {
    // console.log(info);
    if (info.error === 400) {
      // 未登录, 拦截到登陆页
      location.href = 'login.html';
    }
  }
})


