 //进度条的显示
//  $(document).ajaxStart(function () {
//   // console.log("ajaxStart在开始一个ajax请求时触发");
//   NProgress.start();
// });
// $(document).ajaxStop(function () {
//   setTimeout(function() {
//     NProgress.done();
//   },500)
// });



//分类管理的js  
$(function() {
  $('.sort').click(function() {
    $(this).next().stop().slideToggle();
  })


  $('.icon-left').click(function() {
    $('.index_left').toggleClass('hidemenu');
    $('.index_right').toggleClass('hidemenu');
    $('.toper ').toggleClass('hidemenu');
  })

  //点击退出按钮   退出到login中
  $('.icon-right').click(function() {
    $('#removeModal').modal('show');
  })
  $('.btn-remove').click(function() {
    $.ajax({
      url :'/employee/employeeLogout',
      dataType :'json',
      success:function(info) {
        if(info.success) {
          location.href="login.html"
        }
      }
    })
  })
})