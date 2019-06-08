
$(function() {
  // 当前页
  var currentPage = 1;
  //一共有多少个
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url:'/user/queryUser',
      dataType :'json',
      data :{
        page :currentPage,
        pageSize :pageSize
      },
      success:function(info) {
        console.log(info);
        var htmlStr = template('tp1',info);
        $('tbody').html(htmlStr);



        //分页操作
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil( info.total / info.size ),

        // 当页面被点击时触发
        onPageClicked: function( a, b, c, page ) {
          // page 当前点击的页码
          currentPage = page;
          // 调用 render 重新渲染页面
          render();
        }
      })
      }
    })
  }


  
    //注册点击事件(事件委托)
  var currentId;
  var isDelete;
  $('tbody').on('click','.btn',function() {
    $('#usermodal').modal('show');
    // 用户 id
    currentId = $(this).data("id");
    // 获取将来需要将用户置成什么状态
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  })    

    //注册绑定事件 发送ajax请求
    $('#btn-affirm').click(function() {
      $.ajax({
        type :'post',
        url :'/user/updateUser',
        data :{
          id :currentId,
          isDelete :isDelete
        },
        dataType:'json' ,
        success:function(info) {
          console.log(info);
          if(info.success) {
            $('#usermodal').modal('hide');
            render();
          }
        }
      })


})
})