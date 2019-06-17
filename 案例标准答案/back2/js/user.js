$(function() {

  // 1. 一进入页面, 发送ajax请求, 获取数据, 通过模板引擎渲染
  var currentPage = 1;
  var pageSize = 5;
  // 根据 currentPage 的值, 去请求数据完成渲染
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',     // =>  http://localhost:3000/user/queryUser
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('tpl', info);
        $('tbody').html(htmlStr);
  
        // 根据后台返回的数据, 设置分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 给页码添加事件
          onPageClicked: function(a, b, c, page) {
            console.log(page); // 2
            // 更新当前页
            currentPage = page;
            // 重新根据currentPage 进行渲染
            render();
          }
        });
      }
    });
  }

  /* 
    1. 引包
    2. 准备分页容器, ul  决定了将来分页按钮的位置
    3. 进行分页初始化
  */
  // 分页插件的测试
  // $('#paginator').bootstrapPaginator({
  //   // 版本号
  //   bootstrapMajorVersion: 3,
  //   // 总页数
  //   totalPages: 5,
  //   // 当前页
  //   currentPage: 3,
  //   // 给页码添加点击事件
  //   onPageClicked: function(event, originalEvent, type, page) {
  //     console.log(page);
  //   }
  // })


  // 2. 给启用禁用按钮, 添加点击事件 (事件委托)
  var currentId;
  var isDelete;
  $('tbody').on('click', '.btn', function() {
    $('#userModal').modal('show');

    // 获取 id
    // attr(属性名) 获取用于获取标签的属性, 固有的属性(id, src), 自定义的属性(data-id, data-title) 都可以获取
    // attr('data-id');
    // jquery中还内置一个专门用于操作 自定义属性的方法 data('id');
    currentId = $(this).data('id');

    // 获取isDelete
    // 如果是启用按钮被点击了, 启用这个用户, 把他的状态改成 1
    // 如果是禁用按钮被点击了, 禁用这个用户, 把他的状态改成 0
    isDelete = $(this).hasClass('btn-success') ? 1 : 0;
  });

  // 确认按钮, 被点击, 发送ajax请求, 修改用户状态
  $('#confirmBtn').click(function() {

    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#userModal').modal('hide');
          // 重新渲染
          render();
        }
      }
    })

  });


});