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


// 公共的函数, 专门用于解析地址栏参数
// 使用方法: getSearch('age');  =>  得到地址栏的参数值
function getSearch( k ) {
  // 从地址栏中, 获取参数
  var str = location.search;   // "?name=pp&age=18&desc=%E5%B8%85"

  // 有中文, 需要解码
  str = decodeURI(str);       // "?name=pp&age=18&desc=帅"

  // 去掉问号 
  // slice(start, end); 从start开始, 截取到end结束, 包含start, 不包含end
  str = str.slice(1);         //  "name=pp&age=18&desc=帅"

  // str.split('分割符'); 将字符串, 分割成数组 
  var arr = str.split('&');    // ["name=pp", "age=18", "desc=帅"]

  var obj = {};

  // 遍历数组, 通过等号切割, 得到键 和 值
  for (var i = 0; i < arr.length; i++) {
    // arr[i] 每一项 "age=18"   ["age", "18"]
    var key = arr[i].split('=')[0];  // age
    var value = arr[i].split('=')[1];  // 18

    // 将键值扔到 obj 中, [] 可以解析变量
    obj[key] = value;
  }

  return obj[ k ];
}