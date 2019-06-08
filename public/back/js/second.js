$(function() {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type :'get',
      url :'/category/querySecondCategoryPaging',
      data :{
        page: currentPage,
        pageSize: pageSize
      },
      dataType :'json',
      success:function(info) {
        console.log(info);
        var htmlStr = template('secondTp1', info);
          $('tbody').html(htmlStr);
  
          //进行分页的初始化
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

//2.点击添加按钮，显示添加模态框
// 2. 点击添加分类, 显示模态框, 每一个行一个form-group, 上面用到了 bootstrap 下拉菜单组件
$('.addBtn').click(function() {
  $('#secondModal').modal('show');
// . 点击添加分类按钮, 立刻发送ajax请求, 渲染下拉菜单
  $.ajax({
    type :'get',
    url :'/category/queryTopCategoryPaging',
    data :{
      page:1,
      pageSize:1000
    },
    dataType :'json',
    success  :function(info) {
      console.log(info);
      var htmlStr = template('downTp1',info);
      $('.dropdown-menu').html (htmlStr);
    }
  })
})
  // 3. 给下拉菜单添加选中功能, 点击 a 时(事件委托), 获取 a 的文本, 设置给 button 按钮
    $('.dropdown-menu').on('click','a',function() {
      //获取文本  给按钮赋值
      var txt = $(this).text();
      $('.downtext').text(txt);

      //获取id值，给input赋值
      var id = $(this).data('id');
      $('[name = "categoryId"]').val(id);
      console.log(id);

      //校验input框 
      $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })
  // 4. 进行文件上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      console.log(data.result);
      var pic2 = data.result.picAddr;
      // console.log(pic1);
      $('#imgBox img').attr('src',pic2);

      //给input设置图片地址
      $('[name="brandLogo"]').val(pic2);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
});
// 5. 添加表单校验
$('#form').bootstrapValidator({
  // 配置不校验的内容, 表示所有的都校验
  excluded: [],

  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',  // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中..
  },
  fields : {
    categoryId:{
      validators :{
        notEmpty: {
          message :'请选择一级分类'
        }
      }
    },
    brandName: {
      validators :{
        notEmpty: {
          message :'请选择输入二级分类的名称'
        }
      }
    },
    brandLogo:{
      validators :{
        notEmpty: {
          message :'请插入图片'
        }
      }
    }
  }
});
// 6. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
$('#form').on('success.form.bv',function(e) {
  e.preventDefault();
  $.ajax({
    type :'post',
    url :'/category/addSecondCategory',
    data :$('#form').serialize(),
    dataType :'json',
    success:function(info) {
      if (info.success) {
        $('#secondModal').modal('hide');
        render();

        //重置表单的内容
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    }
  })
})
})