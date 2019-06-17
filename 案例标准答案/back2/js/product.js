$(function () {
  // 1. 发送ajax请求, 渲染页面
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];   // 专门用于存储, 所有需要提交的图片对象 (名称 和 地址)
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('productTpl', info);
        $('tbody').html(htmlStr);

        // 根据数据进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          // 给页码添加点击事件
          onPageClicked: function (a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });
      }
    })
  }


  // 2. 点击添加分类按钮, 显示添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    // 发送ajax, 渲染二级分类的下拉菜单
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 999
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('dropdownTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });


  // 3. 给下拉菜单, 添加点击事件(事件委托)
  $('.dropdown-menu').on('click', 'a', function () {
    // 获取文本, 设置按钮的span
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 获取id, 设置给 input
    var id = $(this).data('id');   // attr('data-id')
    $('[name="brandId"]').val(id);

    // 手动的更新校验状态成成功
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  });



  // 4. 文件上传初始化
  //    多文件上传:
  //    (1) 引包, 注意顺序问题
  //    (2) 配置html结构, 
  //        input: file   
  //        name: 指定后台接收的参数名,  
  //        data-url: 指定后台上传文件的接口地址, 
  //        multiple 可以选择多个文件了
  //    (3) 进行文件上传插件的初始化, (监听change事件去了)

  //    只要初始化完成了, 插件会监听 input:file 的change事件, 一旦选择了文件
  //    插件, 会自动遍历选择的所有文件, 立刻发送多个ajax请求, 进行文件上传
  $('#fileupload').fileupload({
    dataType: 'json',
    // 图片上传完成时, 会调用的函数, 每次文件上传完成后, 都会调用 done 方法
    done: function (e, data) {
      console.log(data.result); // 后台返回的数据

      var picObj = data.result; // 图片地址和名称
      var picUrl = picObj.picAddr;

      // 每次上传完成, 都往数组最前面追加一项
      // unshift  shift  push  pop
      picArr.unshift(picObj);

      // 每次上传完成, 都往盒子的最前面添加一张图片
      // append 往后面追加内容
      // prepend 往前面追加内容
      $('#imgBox').prepend('<img width="100" src="' + picUrl + '" alt="">');

      // 判断数组的长度, 如果大于 3, 需要将最旧的删除(最后一个)
      if (picArr.length > 3) {
        // 数组删除最后一项
        picArr.pop();

        // 删除imgBox中的最后一个img图片 
        // img:last-of-type 找到最后一个img类型的元素
        $('#imgBox img:last-of-type').remove();
      }

      // 如果上传的图片, 满三张, 更新图片的校验状态为成功
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });



  // 5. 添加校验
  $('#form').bootstrapValidator({
    // 配置不校验的内容, 表示所有的都校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },

    // 配置字段列表
    fields: {
      // 请选择二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 请输入商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      // 商品库存, 要求: 必须是非零开头的数字,  非零(1-9)   1  10  100  1000  10000
      // \d 数字 0-9
      // *  可以出现0次或多次
      // +  可以出现1次或多次
      // ?  可以出现0次或1次
      // {m,n} 可以出现, m到n次
      // {m,}  至少出现 m 次
      // {m}   只能出现 m 次   
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存, 必须是非零开头的数字'
          }
        }
      },
      // 商品尺码  尺码要求: 必须是 xx-xx的格式,  xx为两位的数字
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是xx-xx的格式, 例如: 32-44'
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      // 商品现价
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },

      // 图片校验
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  });



  // 6. 提交数据
  //    (1) 基本的数据  $('#form').serialize() 获取
  //    (2) 多张图片的数据, 存在数组中, 也要传给后台

  // 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();

    var paramsStr = $('#form').serialize(); // 得到基本的数据, 格式: brandId=3&proName=123
    
    // 还需要拼接上 图片的数据, 图片的数组要转成 json字符串格式来传输
    // 'brandId=3&proName=123' + '&key=value';
    paramsStr = paramsStr + '&picArr=' + JSON.stringify(picArr);


    // 通过ajax提交
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: paramsStr,
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单内容 和 状态
          $('#form').data('bootstrapValidator').resetForm(true);

          // 重置按钮的文字, 清除掉图片
          $('#dropdownText').text('请选择二级分类');
          $('#imgBox img').remove();
          picArr = []; // 同步清空 picArr 数组
        }
      }
    })
  })

});