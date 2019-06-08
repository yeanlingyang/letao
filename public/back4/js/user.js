
$(function() {
  // 当前页
  var currentPage=1;
  // 一页有多少个
  pageSize = 5;
  render();
  function render() {
    $.ajax({
      url :'/user/queryUser',
      data : {
        page :currentPage,
        pageSize :pageSize
      },
      dataType :'json',
      success:function(info) {
        console.log(info);
        var htmlStr = template('tp1',info);
        $('tbody').html(htmlStr);
      
  
      //进行分页的处理
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        
        onPageClicked:function(a, b, c, page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          //更新当前页
          currentPage =page;
          render();
        }
      });
    }
    }) 
  }

  //给启用  禁用按钮添加点击事件（事件委托）
  var currentId ;
  var isDelete;
  $('tbody').on('click','.btn',function() {
    $('#userModal').modal('show');
    currentId=$(this).data('id');
    isDelete=$(this).hasClass('btn-success')?0:1;
  });
  //点击确定按钮  发送ajax请求
  $('.btn-ok').click(function() {
    $.ajax({
      type :'post',
      url :'/user/updateUser',
      data :{
        id:currentId,
        isDelete :isDelete
      },
      dataType:'json',
      success:function(info) {
        if (info.success) {
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })
})