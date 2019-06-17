// 公用的功能
// 进度条功能
// NProgress.start();

// setTimeout(function() {
//   NProgress.done();
// }, 500);


// 发送ajax, 开启进度条
// ajax回来, 结束进度条

// ajax全局事件
// 1. ajaxStart 当第一个ajax开始发送时, 调用
// 2. ajaxStop  当全部的ajax完成时, 调用
$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    NProgress.done();
  }, 500);
});




// 公共的功能
// 1. 左侧分类管理, 点击时, 可以切换二级列表
// 2. 上面菜单按钮, 点击, 可以切换左侧菜单
// 3. 退出功能

// 点击事件, 需要等待 dom 的加载
$(function() {
  
  // 1. 左侧分类管理, 点击时, 可以切换二级列表
  $('.category').click(function() {
    $(this).next().stop().slideToggle();
  });

  // 2. 上面菜单按钮, 点击, 可以切换左侧菜单
  $('.icon_menu').click(function() {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
  });

  // 3. 点击退出按钮, 显示模态框
  $('.icon_logout').click(function() {
    $('#logoutModal').modal('show');
  });

  // 点击确认退出, 完成退出功能
  $('#logoutBtn').click(function() {
    // 发送 ajax 请求, 让后台, 销毁当前用户的登录状态
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 退出成功
          location.href = 'login.html';
        }
      }
    })
  });

});

