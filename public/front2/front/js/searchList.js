$(function() {

  // 1. 一进入页面, 获取传递过来的参数, 将参数设置给 input 框
  var key = getSearch('key');
  $('.search_input').val(key);
  // 2. 根据搜索关键字, 发送ajax请求, 获取搜索得到的数据
  //    后台: 会根据 前端传递过来的 搜索关键字, 写 sql 语句(模糊查询), 从数据库中找出 符合条件的 数据, 返回
  render();



  // 3. 点击搜索按钮, 根据关键字, 发送ajax, 渲染页面
  $('.search_btn').click(function() {
    render();
  });

  // 4. 先实现排序按钮点击效果
  //    (1) 如果有current类, 点击时, 需要切换箭头的方向
  //    (2) 如果没有current类, 点击时, 加上current, 并且排他
  $('.lt_sort a[data-type]').click(function() {
    if( $(this).hasClass('current') ) {
      // 有, 切换箭头的方向  fa-angle-down <=> fa-angle-up 切换类名
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }
    else {
      // 没有, 给自己加上 current类, 移除其他的
      $(this).addClass('current').siblings().removeClass('current');
    }

    // 只要修改了, 排序规则, 必然需要重新渲染
    render();
  });



  // 每次调用, 都会重新获取输入框的值, 发送ajax请求, 渲染页面
  function render() {
    // 在发送ajax之前, 显示一个加载中的效果
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};

    // 这三个是必传参数
    paramsObj.proName = $('.search_input').val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 还有两个可传的排序参数   price num  （1升序，2降序）
    // paramsObj.price = 1;   // 按照价格降序排列

    // 可以通过判断有没有高亮的 a, 来决定是否需要排序
    var $current = $('.lt_sort a.current'); 

    if ($current.length === 1) {
      // 有高亮的 a, 需要拼接参数
      // 传递给后台的 键名, 可以通过存在自定义属性中的值, 来获取
      var sortName = $current.data('type');  // price
      // 传递给后台的 值, 可以通过箭头的方向判断  
      var sortValue = $current.find('i').hasClass('fa-angle-up') ? 1 : 2;

      // 将排序的参数, 拼接在对象中, 中括号可以解析变量
      paramsObj[ sortName ] = sortValue;
    }
    console.log(paramsObj);

    setTimeout(function() {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: paramsObj,
        dataType: 'json',
        success: function( info ) {
          console.log(info);
          var htmlStr = template('searchTpl', info);
          $('.lt_product').html(htmlStr);
        }
      });
    }, 500); 
  }


});