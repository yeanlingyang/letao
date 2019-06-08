

$(function() {

  //一进入页面 先渲染历史记录
  render();

  //封装一个数组
  function getHistory () {
    //获取本地存储  是一个jsonStr  []作为一个默认值
    var jsonStr = localStorage.getItem('search_list')|| '[]';

    //将json格式转换成一个数组的格式
    var arr = JSON.parse(jsonStr);

    //返回这个arr
    return arr;
  };


  //封装一个页面渲染
  function  render() {
    //获取arr数组
    var arr = getHistory ();
    //进行模板引擎的渲染
    var htmlStr = template('searchTpl',{arr:arr});

    $('.lt_history').html(htmlStr);

  }

  //功能2 
  //清空历史记录

  //给所以的删除按钮添加点击事件（事件委托）
  $('.lt_history').on('click','.btn_empty',function() {
    //获取下标index
    mui.confirm('你确认要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index===1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  });

  //功能3  删除单个的功能(事件委托)

  $('.lt_history').on('click','.btn-delete',function() {
    //获取下标
    var  index =$(this).data('index');

    //获取数组
    var arr = getHistory();
    //根据下标 删除对应的项
    arr.splice(index,1);

    //得到一个新的数组  重新渲染页面
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  });


   //功能四
   // 点击搜索按钮 
  $('.search_btn').click(function() {
    //获取搜索框的value值
   var key =  $('.search_input').val().trim();
   //设置value值为空
   $('.search_input').val('');

   //做判断
   if(key==='') {
      // mui.toast('消息')
      mui.toast('请输入关键字');
      //返回
      return;
   }

   //从本地读取数据
   var  arr = getHistory();


  //  1、如果长度大于等于10   删除最后一项
  if (arr.length>=10) {
    arr.pop();
  }
  //如果有相同的值  使用indexOf进行查找  如果结果不等于-1   就等于重复  删除那一项
  //先声明一个变量
  var index = arr.indexOf(key);
  if(index!==-1) {
    arr.splice(index,1);
  }

   //将值添加到数组的最前面
   arr.unshift(key);

   // //得到一个新的数组  重新渲染页面
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  });





})