

$(function() {
    //一进入页面，渲染个人信息
    $.ajax({
      url :'/user/queryUserMessage',
      dataType :'json',
      success:function(info) {
        console.log(info);
        //优先处理错误的
        if(info.error===400) {
          location.href="login.html";
        }
        var htmlStr = template('userTpl',info);
        $('#userInfo').html(htmlStr);
      }
    }) 


  //点击退出按钮 发送点击事件
  $('#logout').click(function() {
    //发送ajax请求

    $.ajax({
      url :'/user/logout',
      dataType :'json',
      success:function(info) {
        console.log(info);
        if (info.success) {
          location.href="login.html"
        }
      }
    })
  })
})