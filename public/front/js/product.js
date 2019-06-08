

 $(function() {
//// 1. 进入商品详情页, 获取地址栏传递过来的 productId
 var productId = getSearch('productId');

 console.log(productId);

 //根据产品的id  发送ajax请求
 $.ajax({
  url :'/product/queryProductDetail',
  data :{
    id :productId
  },
  dataType :'json',
  success:function(info) {
    console.log(info);
    var htmlStr = template('productTpl',info);
    $('.lt_main .mui-scroll').html(htmlStr);

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
  $('.lt_main').on('click','.lt_size span',function() {
    $(this).addClass('current').siblings().removeClass('current');



  })
 })
