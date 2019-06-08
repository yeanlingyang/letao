$(function() {
  // <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  var foot1 = echarts.init(document.querySelector('.foot1'));
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
foot1.setOption(option1);


var foot2 = echarts.init(document.querySelector('.foot2'));
// 指定图表的配置项和数据
option2 = {
  title : {
      text: '品牌鞋子销量图',
      subtext: '一线大牌',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪达斯','匡威','彪马','人本']
  },
  series : [
      {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪达斯'},
              {value:234, name:'匡威'},
              {value:135, name:'彪马'},
              {value:1548, name:'人本'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};

// 使用刚指定的配置项和数据显示图表。
foot2.setOption(option2);
})




