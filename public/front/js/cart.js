

$(function() {

  $.ajax({
    url:'/cart/queryCart',
    dataType :'json',
    success:function(info) {
      console.log(info);
      var htmlStr =template('cartTpl',{arr:info});
      $('#cartList').html(htmlStr);
    }



  })



})