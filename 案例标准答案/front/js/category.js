$(function() {

  // 1. 一进入页面发送ajax请求, 获取数据渲染
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function( info ) {
      console.log(info);

      var htmlStr = template('leftTpl', info);
      $('.lt_category_left ul').html(htmlStr);

      // 左侧渲染完成后, 应该立即渲染第一个一级分类对应的二级分类
      // 根据第一个一级分类的id, 渲染 
      // info.rows[0] 第一个
      renderById( info.rows[0].id );
    }
  });

  // 2. 点击左侧切换
  $('.lt_category_left').on('click', 'a', function() {
    // 让自己加上current类, 让其他的移除
    // $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    // 先干掉所有人
    $('.lt_category_left a').removeClass('current');
    // 再复活自己
    $(this).addClass('current');

    // 获取 id
    var id = $(this).data('id');
    // 根据 id 重新渲染二级分类
    renderById(id);

  });


  // 封装一个方法, 专门用于根据一级分类的id, 渲染二级分类
  function renderById(id) {
    // 根据id, 发送ajax请求, 渲染右侧
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('rightTpl', info);
        $('.lt_category_right ul').html(htmlStr);
      }
    })
  }

});