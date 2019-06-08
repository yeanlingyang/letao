$(function() {

  // 1. 进入商品详情页, 获取地址栏传递过来的 productId
  var productId = getSearch('productId');
  console.log(productId);

  // 2. 根据 产品id, 发送 ajax 请求, 进行渲染
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json', 
    success: function(info) {
      console.log(info);
      // 在模板中, 可以使用传入对象的所有属性
      var htmlStr = template('productTpl', info);
      $('.lt_main .mui-scroll').html(htmlStr);

      // 只要是动态渲染的轮播图结构, 都需要在渲染完成后, 再初始化 
      // (包括swiper实现的轮播图, 也需要在动态渲染完成后, 再初始化)

      // 手动初始化轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 手动初始化数字框
      mui('.mui-numbox').numbox();
    }
  });


  // 3. 让尺码可以选中  (事件委托)
  $('.lt_main').on('click', '.lt_size span', function() {
    // 给当前的添加 current 类, 移除其他的 current 类
    $(this).addClass('current').siblings().removeClass('current');
  });


  // 4. 加入购物车
  $('#addCart').click(function() {

    // 获取尺码 和 数量, 发送ajax请求, 加入购物车
    var size = $('.lt_size span.current').text(); 

    if (!size) {
      // 说明没有选择尺码
      mui.toast('请选择尺码');
      return;
    }

    var num = $('.mui-numbox-input').val();

    // 发送ajax请求, 加入购物车
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.error === 400) {
          // 说明未登录, 跳转到登录页
          // 跳转的同时, 可以将当前页的地址传递过去, 将来登录完成, 再跳回来
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }

        if (info.success) {
          // 加入购物车成功
          mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function(e) {
            if (e.index === 0) {
              location.href = 'cart.html';
            }
          })
        }
      }
    })

  });



});