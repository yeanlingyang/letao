/* 
  二级分类整合思路:
  1. 一进入页面 发送 ajax 请求, 渲染, (分页插件)

  2. 点击添加分类, 显示模态框, 每一个行一个form-group, 上面用到了 bootstrap 下拉菜单组件

  3. 点击添加分类按钮, 立刻发送ajax请求, 渲染下拉菜单

  4. 给下拉菜单的 a 添加点击事件(通过事件委托), 获取 a 的文本, 设置给按钮

  5. 点击选择文件需要能选文件, 利用 label 标签 和 input:file关联

  6. 一旦用户选择了图片, 就发送ajax请求, 上传文件, 得到图片地址, 赋值给 img 的 src
     使用 jquery-fileupload 插件
     (1) 引包
     (2) 准备结构,  input: file  name: 指定后台接收的参数名, data-url: 后台接口地址
     (3) 进行初始化
     一旦初始化完成, 插件会监听input:file的change事件, 一旦用户选择了文件, 就会立刻发送ajax请求
     进行文件上传, 将来可以得到文件地址, 调用 done 方法的

  7. 利用 隐藏的 input 存储选择的数据

  8. 添加校验
     (1) 默认不对隐藏的内容校验,  配置 excluded
     (2) 修改了隐藏的内容, 插件不知道, 需要手动将校验状态改成成功

  9. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
*/

$(function () {

  // 1. 一进入页面, 发送 ajax 获取数据, 进行渲染
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('secondTpl', info);
        $('tbody').html(htmlStr);

        // 根据后台返回的数据, 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          //给页码添加点击事件
          onPageClicked: function (a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 根据当前页重新渲染
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    // 发送ajax请求, 获取全部的一级分类数据, 渲染下拉菜单
    // 假设后台接口还没有完成, 此时也可以通过 分页的接口, 也可以获取全部的数据(测试写法)
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 1000    // 模拟测试
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('dropdownTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })

  });

  // 3. 给下拉菜单添加选中功能, 点击 a 时(事件委托), 获取 a 的文本, 设置给 button 按钮
  $('.dropdown-menu').on('click', 'a', function () {
    // 获取文本, 给button赋值
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 获取id, 给input赋值, 将来用于提交
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);

    // 由于给隐藏的input框赋值, input框肯定是非空了, 更新校验状态, 更新成成功了
    // updateStatus(字段名, 校验状态, 校验规则)  校验规则主要用于配置校验提示
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  });

  // 4. 进行文件上传初始化
  /* 
    文件上传插件的使用:
      1. 引包, 注意顺序
      2. 准备结构, input: file,  name:配置后台接收文件的参数名   data-url: 配置后台的接口地址
      3. 进行文件上传初始化
    文件上传插件, 只要初始化好了, 监听文件的选择(change事件), 用户一选择文件, 立刻利用formData发送ajax文件上传请求
    后台接收到文件, 进行转存, 返回文件地址, 当文件地址回来后, 插件会调用 done 方法

    我们在done方法中, 将文件地址设置给 img 的 src 属性即可
  */
  $('#fileupload').fileupload({
    // 设置返回格式类型, 将来按照json格式解析
    dataType: 'json',
    // 图片上传完成时的回调函数, e事件对象, data上传得到的数据对象
    done: function (e, data) {
      console.log(data);
      console.log(data.result); // 就是后台给你返回的结果
      var picUrl = data.result.picAddr;
      $('#imgBox img').attr('src', picUrl);

      // 还有给 input 设置图片地址
      $('[name="brandLogo"]').val(picUrl);

      // 只要input有值了, 说明非空了, 需要更新状态, 成成功
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  });


  /* 
    5. 添加表单校验
       对于隐藏域的校验:
       (1) 配置 excluded, 才会对隐藏的内容进行校验
       (2) 给隐藏的内容赋值了, 更新校验状态成成功 (需要通知到插件)
  */
  $('#form').bootstrapValidator({
    // 配置不校验的内容, 表示所有的都校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },


    fields: {
      // 配置一级分类
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 请输入二级分类名称
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      // 请选择图片
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  });


  /* 
    6. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  */
  $('#form').on('success.form.bv', function( e ) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单内容和校验状态
          $('#form').data('bootstrapValidator').resetForm(true);

          // 按钮 和 图片恢复
          $('#dropdownText').text('请选择一级分类');
          $('#imgBox img').attr('src', './images/none.png');
        }
      }
    })

  });



});