
$(function() {
  //分页参数
  currentPage= 1;
  pageSize = 5;

  render();
  //发送ajax请求  渲染页面
 function render() {
  $.ajax({
    type :'get',
    url :'/category/queryTopCategoryPaging',
    data :{
      page : currentPage,
      pageSize:pageSize
    },
    dataType :'json',
    success:function(info) {
      console.log(info);
      var htmlStr = template('firstTp1',info);
      $('tbody').html(htmlStr);


      //进行分页操作
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        // size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(a, b, c,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          //恢复按钮到第一页
          currentPage =page;
          render();
        }
      });
    }
  })
 }

 //点击添加分类的按钮 显示模态框
 $('.addBtn').click(function() {
   $('#addModal').modal('show');
 })

 //进行校验
 $('#form').bootstrapValidator({
   // 配置图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',  // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中..
  },
  fields: {
    categoryName:{
      validators: {
        notEmpty :{
          message :"内容并不能为空"
        }
      }
    }
  }
 });

 //发送ajax请求  先清除浏览器默认
 $('#form').on('success.form.bv',function(e) {
  e.preventDefault();

  //发送ajax请求
  $.ajax({
    type:'post',
    url :'/category/addTopCategory',
    data :$('#form').serialize(),
    dataType :'json',
    success :function(info) {
      if (info.success) {
        $('#addModal').modal('hide');
        currentPage=1;
        render();
      }
    }
  })
 })

})