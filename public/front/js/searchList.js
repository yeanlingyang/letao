
$(function () {


  //  一进入页面  获取传过来的参数  将参数设置给input框中
  var key = getSearch('key');
  $('.search_input').val(key);

  render();

  

// 3. 点击搜索按钮, 根据关键字, 发送ajax, 渲染页面
  $('.search_btn').click(function() {
    render();
  })


   // 4. 先实现排序按钮点击效果
  //    (1) 如果有current类, 点击时, 需要切换箭头的方向
  //    (2) 如果没有current类, 点击时, 加上current, 并且排他
  $('.lt_sort a[data-type]').click(function(){
    if($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }
    else {
      $(this).addClass('current').siblings().removeClass('current');
    }
    //重新渲染
    render();
  })
  function render() {
    //发送ajax请求 显示一个加载中的效果
  $('.lt_product').html('<div class="loading"></div>');

  var paramsObj = {};
  //三个必传的参数
  paramsObj.page = 1;
  paramsObj.pageSize = 100;
  paramsObj.proName = $('.search_input').val();


  //判断有没有高亮
  var $current =$('.lt_sort a.current');


  if ($current.length===1) {
    var sortName = $current.data('type');

    var sortValue = $current.find('i').hasClass('fa-angle-up')? 1:2;

    // 将排序的参数, 拼接在对象中, 中括号可以解析变量
    paramsObj[ sortName ] = sortValue; 
  }

    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: paramsObj,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          var htmlStr = template('searchListTpl', info);
          $('.lt_product').html(htmlStr);
        }
      })
    }, 500)
  }

})