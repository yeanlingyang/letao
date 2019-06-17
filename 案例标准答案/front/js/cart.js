$(function() {

  // 1. 一进入页面, 发送 ajax 请求, 渲染购物车
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(info) {
        // 优先处理错误的情况, 用户未登录, 获取不到购物车的数据的
        if (info.error === 400) {
          // 用户未登录, 拦截到登录, 登录完成后, 还跳回购物车
          // 需要将购物车的地址, 作为参数, 传递过去
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }
  
        // 当用户登录成功, 成功获取到购物车数据 info 数据是一个数组, 需要包装成对象, 将来渲染
        var htmlStr = template('cartTpl', { arr: info });
        $('#cartList').html(htmlStr);
        console.log(info);
      }
    });
  }

  // 2. 删除功能
  // (1) 给所有删除按钮, 添加点击事件 (事件委托)
  // (2) 获取 删除的 id, 发送 ajax 请求进行删除
  // (3) 后台删除完成, 重新渲染
  $('#cartList').on('click', '.btn_delete', function() {
    var id = $(this).data('id');

    // 根据id发送ajax请求, 删除数据
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          render();
        }
      }
    })
  })

});