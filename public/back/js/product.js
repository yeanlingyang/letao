

$(function () {
  // 当前显示是第几页
  currentPage = 1;
  // 每页有几个
  pageSize = 2;
  var picArr = []; //专门用于存储, 所有需要提交的图片对象 (名称 和 地址)
  render();

  // 发送ajax请求 渲染当前的页面
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
        // console.log(info);
        var htmlStr = template('productTp1', info);
        $('tbody').html(htmlStr);

        //进行分页的初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            //更新当前页
            currentPage = page;
            render();
          }
        });
      }
    })
  }



  //给添加分类的按钮  设置点击事件  点击后显示模态框
  $('.addBtn').click(function () {
    $('#addModal').modal('show');

    //发送ajax请求,渲染下拉菜单
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 999
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('downTp1', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })


  //添加点击事件  给a 注册点击事件  选中的那个就是显示那个  （事件委托）
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('.downtxt').text(txt);

    //获取id
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);

    //校验
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  });

  //进行文件初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var picObj = data.result;  //图片地址和名称
      var picUrl = picObj.picAddr;

      //每次上传完成，都要往数组中最前面加一项
      picArr.unshift(picObj);

      //每次上完完成，都往盒子最前面添加一张图片
      $('#imgBox').prepend('<img width="100" src="' + picUrl + '" alt="">');

      //判断数组的长度，如果大于3，需要删除最旧的（最后一个）
      if (picArr.length > 3) {
        //数组删除最后一项
        picArr.pop();
        //删除最后一张img的图片  img：last-of-type   找到最后的img类型的元素

        $('#imgBox img:last-of-type').remove();
      }


      //如果上传成功，满三张了  就更新校验的状态为成功
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });


  //添加校验
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
      //归属品牌
      brandId: {
        validators: {
          notEmpty: {
            message: '请输入二级标题'
          }
        }
      },
      //产品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入产品名称'
          }
        }
      },
      //产品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入产品描述'
          }
        }
      },
      //产品库存
      num: {
        validators: {
          notEmpty: {
            message: '请输入产品库存'
          },
          //正则校验   商品库存, 必须是非零开头的数字 
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: ' 商品库存, 必须是非零开头的数字'
          }
        }
      },
      // 商品尺码  尺码要求: 必须是 xx-xx的格式,  xx为两位的数字 产品尺寸
      size: {
        validators: {
          notEmpty: {
            message: '请输入产品尺寸'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: ' 必须是 xx-xx的格式,  例如:34-45'
          }
        },
      },
      //产品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入产品原价'
          },
          regexp: {
            regexp: /^\d*$/,
            message: ' 请输入正确的数字'
          }
        }
      },
      //产品现价
      price: {
        validators: {
          notEmpty: {
            message: '请输入产品现价'
          },
          regexp: {
            regexp: /^\d*$/,
            message: ' 请输入正确的数字'
          }
        }
      },
      //产品图片
      picStatus: {
        validators: {
          notEmpty: {
            message: '请输入3张图片'
          }
        }
      }
    }
  });
  //一进入页面   清除默认样式 发送ajax请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var primPic = $('#form').serialize();/// 得到基本的数据, 格式: brandId=3&proName=123


    // 还需要拼接上 图片的数据, 图片的数组要转成 json字符串格式来传输
    // 'brandId=3&proName=123' + '&key=value';
    primPic = primPic + '&picArr=' + JSON.stringify(picArr);

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: primPic,
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('show');
          //页面显示到第一页
          currentPage = 1;
          render();
          //重置表单内容和状态
          $('#form').data('bootstrapValidator'), resetForm(true);

          // 重置按钮的文字, 清除掉图片
          $('downtxt').text('请输入二级分类');
          //清除图片
          $('#imgBox img').remove();
          //// 同步清空 picArr 数组
          picArr = [];

        }
      }
    })
  })


})