$(function () {

  /* 
    明确:
      1. 使用的是本地存储, localStorage
      2. 搜索数据有顺序的, 所以通过数组来存储
      3. localStorage.setItem('search_list', jsonStr)  我们整个页面都要进行历史记录操作, 键名要一致
         约定键名: search_list
  */

  /* 
    以下三行代码, 在控制台执行, 用于添加假数据
      var arr = ['耐克', '阿迪', '老北京', '老奶奶', '老太太'];
      var jsonStr = JSON.stringify(arr);
      localStorage.setItem('search_list', jsonStr);
  */


  // 分析功能:
  // 功能1: 渲染历史记录
  // 功能2: 清空所有历史记录
  // 功能3: 删除单个历史
  // 功能4: 添加历史记录


  // 功能1: 渲染历史记录
  // (1) 从本地读取历史记录
  // (2) 拿到的是 jsonStr, 需要转换成 数组  (数组需要包装成对象)
  // (3) 结合模板引擎渲染
  render();


  // 作用: 读取本地历史, 转成数组返回
  function getHistory() {
    // 当没有数据时, 获取得到的是 null, 可以设置一个默认值
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  // 作用: 读取本地历史, 得到数组, 根据数组, 完成渲染
  function render() {
    var arr = getHistory();
    // 结合模板引擎渲染, 在模板中, 可以使用对象中的所有属性
    var htmlStr = template('searchTpl', { arr: arr });
    $('.lt_history').html(htmlStr);
  }


  // 功能2: 清空历史记录  localStorage.clear(慎用)   localStorage.removeItem删除单个
  // (1) 给清空按钮, 添加点击事件 (事件委托)
  // (2) 使用 removeItem, 移除 search_list 即可
  // (3) 重新渲染
  $('.lt_history').on('click', '.btn_empty', function () {

    // 点击清空历史, 弹出确认框
    // mui.confirm(message, title, btnValue, callback)
    // 参数1: 确认框的内容
    // 参数2: 确认框的标题
    // 参数3: 按钮的文本值
    // 参数4: 用户选择后的回调函数
    mui.confirm('你确认要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      // console.log(e);
      // e.index 获取获取选择的按钮的下标
      if (e.index === 1) {
        // 确认
        localStorage.removeItem('search_list');
        render();
      }
    });

  });


  // 功能3: 删除单个功能
  // (1) 给所有的删除按钮, 添加点击事件, (事件委托)
  // (2) 点击对应项, 获取下标, 根据下标, 从数组中删除该项
  // (3) 得到是修改后的数组, 还需要存回本地
  // (4) 重新渲染
  $('.lt_history').on('click', '.btn_delete', function () {

    // 获取下标
    var index = $(this).data('index');

    // 获取数组
    var arr = getHistory();

    // 根据下标从数组中删除对应项
    // arr.splice(start, deleteCounts, args1, args2, args3 ... );
    // arr.splice(从哪开始删, 删几个, 替换的项1, 替换的项2, 替换的项3....);
    arr.splice(index, 1);

    // 得到的是修改后的数组, 需要存回本地
    localStorage.setItem('search_list', JSON.stringify(arr));

    // 重新渲染
    render();
  });


  // 功能4: 添加历史记录
  // (1) 给搜索按钮, 添加点击事件
  // (2) 获取搜索框的值, 添加到数组的最前面 unshift
  // (3) 得到是修改后的数组, 还需要存回本地
  // (4) 重新渲染
  $('.search_btn').click(function() {
    // 获取搜索关键字
    var key = $('.search_input').val().trim();
    $('.search_input').val('');

    // 非空判断
    if (key === "") {
      // mui.toast('消息')
      mui.toast('请输入搜索关键字');
      return;
    }

    // 从本地读取, 获取数组
    var arr = getHistory();

    // 1. 如果已经有相同的项, 将该项删除
    //    通过 indexOf 找下标, 如果 下标 不等于 -1, 说明找到了, 存在相同的项, 需要删除
    var index = arr.indexOf(key);
    if (index != -1) {
      // 找到了, 将该项删除
      arr.splice(index, 1);
    }
    // 2. 最多存储 10 条, 超过10条, 删除最旧的(最后一个)
    if (arr.length >= 10) {
      arr.pop();
    }

    // 将数据添加到数组的最前面
    arr.unshift(key);

    // 得到的是修改后的数组, 存回本地
    localStorage.setItem('search_list', JSON.stringify(arr));

    // 重新渲染
    render();

    // 跳转页面, 需要给跳转的页面传参的
    // (1) 利用地址栏传参   xxx.php?username=pp&age=18
    // (2) 利用本地存储 localStorage
    location.href = "searchList.html?key=" + key;
  })


});