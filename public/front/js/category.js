

$(function() {
  //一进入页面 发送ajax请求  渲染左侧的

  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function( info ) {
      // console.log(info);

      var htmlStr = template('leftTpl', info);
      $('.lt_category_left ul').html(htmlStr);


      // 左侧渲染完成后, 应该立即渲染第一个一级分类对应的二级分类
      // 根据第一个一级分类的id, 渲染 
      // info.rows[0] 第一个
      renderById(info.rows[0].id)
    }
  })
      //点击左边的切换右边的

    $('.lt_category_left').on('click','a',function() {
      //排他思想

      //先干掉所有人  清除所有的高亮
      $('.lt_category_left a').removeClass('current');

      //复活自己
      $(this).addClass('current');
      var id = $(this).data('id');

      //根据id重新渲染二级分类
      renderById(id);
    })


    //封装一个方法。专门用于根据一级标题  切换二级标题
    function renderById(id) {
      $.ajax({
        url :'/category/querySecondCategory',
        data :{
          id :id
        },
        dataType:'json',
        success:function(info) {
          console.log(info);
          var htmlStr = template('rightTpl',info);
          $('.lt_category_right ul').html(htmlStr);
        }
      })
    }

})