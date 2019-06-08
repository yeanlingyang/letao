

$(function() {

  //一进入页面先进行渲染
  render();
  //封装一个函数  读取本地历史，转成数组返回
  //默认值是  search_list

  //获取数组  封装
  function getHistory() {
    //当没有数据时  获取的是null   所以可以给她设置一个默认值[]数组
    var jsonStr = localStorage.getItem('search_list')||'[]';
    //转成json格式  将jsonStr   
    var arr = JSON.parse(jsonStr);
    //返回一个arr数组
    return arr;
  } 


  //封装一个数组  完成本地渲染
  function render() {
    var arr = getHistory();
    //结合模板引擎 在模板中，可以使用对象的所以的属性
    var htmlStr =  template('searchTpl',{arr:arr});
    $('.lt_history').html(htmlStr);
  }



  //功能2  清空历史记录  localStorage.removeItem();

  //给按钮添加点击事件（事件委托）
  $('.lt_history').on('click','.btn_empty',function() {
    //点击清空历史的按钮，弹出确认框
    mui.confirm('你确认要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if(e.index===1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  });

  //功能3 删除单个的功能
  //给删除的x的按钮添加点击事件（事件委托）
  $('.lt_history').on('click','.btn-delete',function() {
    //获取下标
    var index = $(this).data('index');

    //获取数组
    var  arr =getHistory();

    //根据下标  删除对应的项
    arr.splice(index,1);

    //得到的新的数组 需要存回本地
    localStorage.setItem('search_list',JSON.stringify(arr));

    //重新渲染
    render();
  })

  //功能4   添加历史记录

  $('.search_btn').click(function() {
    //获取关键字
    var key =$('.search_input').val().trim();
    $('.search_input').val('');

    //非空判断
    if(key==='') {
      // mui.toast('消息')
      mui.toast('请输入关键字');
      //返回
      return;

    }
      //从本地读取，获取数组
      var  arr = getHistory();

      //1.如果已经有相同的项  将该项删除   indexOf  找下标
      //如果下标不等于-1   说明找到了相同的项
      var index= arr.indexOf(key);
      if (index !==-1) {
        arr.splice(index,1)
      }
      //如果长度超过了10
      if (arr.length>=10) {
        //删除最后一个
        arr.pop();
      }

      //将数据添加到数组的最前面
      arr.unshift(key);

      //得到修改后的数组  存回本地
      localStorage.setItem('search_list',JSON.stringify(arr));
      //重新渲染
      render();


      // 跳转页面, 需要给跳转的页面传参的
      // (1) 利用地址栏传参   xxx.php?username=pp&age=18
      // (2) 利用本地存储 localStorage

      location.href='searchList.html?'+key;

  })


})