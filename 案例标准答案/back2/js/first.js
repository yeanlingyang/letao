$(function () {

  // 1. 一进入页面, 发送ajax请求获取数据, 通过模板引擎渲染
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstTpl', info);
        $('tbody').html(htmlStr);

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 添加页码点击事件
          onPageClicked: function (a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新根据当前页, 进行渲染
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加按钮, 弹出添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  });


  // 3. 添加表单校验
  //    注意: 一定要给 form 表单, 加 id 再获取,  使用jquery时, 发现不报错, 第一时间看选择器有没有写对
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },


    // 配置字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }

  });


  // 4. 注册表单校验成功事件, 阻止默认的提交, 通过ajax进行提交
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function( info ) {
        console.log(info);
        if (info.success) {
          // 添加成功
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })

  });

})