// 进度条

// NProgress.configure({ showSpinner: false });
// ajax全局事件
$(document).ajaxStart(function() {
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function() {
    NProgress.done();
  },500)
});


$(function() {
  $('.category').click(function() {
    $(this).next().stop().slideToggle();
  })

//点击菜单的按钮，可以切换左侧的菜单
$('.icon_left').click(function() {
  $('.index_left').toggleClass('hideleft');
  $('.index_right').toggleClass('hideleft');
  $('.top').toggleClass('hideleft');
})

//点击退出按钮  弹出模态框
$('.icon_right').click(function() {
  $('#removemodal').modal('show');
});

//点击退出按钮 退出到登录页面
$('.btn-remove').click(function() {
  $.ajax({
    url :'/employee/employeeLogout',
    dataType :'json',
    success:function(info) {
      console.log(info);
      if (info.success) {
        location.href='login.html';
      }
    }
  })
})
})


