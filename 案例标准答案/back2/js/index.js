// 数据可视化 => 数据图表化,  将数据转换成图表
// 插件: echarts 百度   highcharts 国外   (封装的比较彻底, 可定制性没那么强了)
// d3 相对封装的没那么彻底, 可定制性强 
// canvas 原生绘制, 定制性最强, 开发难度, 开发复杂度最高的  (小游戏)

/* 
  1. 引包
  2. 准备一个具备宽高的容器
  3. 复制粘贴, 初始化即可, 不同的图表, 配置不同的 option 即可
*/

$(function () {


  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector('.echarts_left'));

  // 指定图表的配置项和数据
  var option1 = {
    // 标题组件
    title: {
      // 标题的文本
      text: '2020年鞋子销量'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data: ['销量', '人数']
    },
    // x轴的数据
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴的数据, 不要设置, 会自动根据数据的最大值, 自动生成
    yAxis: {},
    // 系列数据
    series: [{
      name: '销量',
      type: 'bar',    // type: bar 柱状图   line 折线图  pie  饼图
      data: [150, 650, 360, 500, 180, 240]
    }, {
      name: '人数',
      type: 'bar',
      data: [100, 150, 200, 50, 30, 60]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);




  // 基于准备好的dom，初始化echarts实例
  var echarts_right = echarts.init(document.querySelector('.echarts_right'));

  // 指定图表的配置项和数据
  var option2 = {
    // 标题组件
    title: {
      // 主标题文本
      text: '热门品牌销售',
      // 副标题文本
      subtext: '2020年6月',
      // 配置水平方向标题组件的位置
      x: 'center',
      // 配置主标题的样式
      textStyle: {
        // 颜色
        color: 'red',
        // 大小
        fontSize: 25
      }
    },
    // 提示框组件
    tooltip: {
      // 当鼠标悬停在数据上时, 触发显示提示框
      trigger: 'item',
      // 配置提示的消息
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 设置垂直排布 vertical   水平 horizontal
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '阿迪王', '老北京', '足力健']
    },
    // 系列列表项
    series: [
      {
        name: '热门销售',  // 系列名称
        type: 'pie',      // 类型饼图
        radius: '55%',     // 配置圆的大小
        center: ['50%', '60%'],   // 配置圆心的坐标
        data: [
          { value: 335, name: '耐克' },   // 数据项
          { value: 310, name: '阿迪' },   // 数据项
          { value: 234, name: '阿迪王' },
          { value: 135, name: '老北京' },
          { value: 1548, name: '足力健' }
        ],
        // 额外的样式效果
        itemStyle: {
          emphasis: {
            shadowBlur: 50,
            shadowOffsetX: 0,
            shadowColor: 'yellow'
          }
        }
      }
    ]
  };


  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2);


  // 学数据可视化, 先掌握 基本 折线图/柱状图  饼图的修改

});