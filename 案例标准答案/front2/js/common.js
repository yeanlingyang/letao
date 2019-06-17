// 进行mui的区域滚动的初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});

// 进行轮播图的手动初始化
// 获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 0 // 自动轮播周期，若为0则不自动播放，默认为0；
});