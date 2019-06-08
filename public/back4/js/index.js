$(function() {
  // 基于准备好的dom，初始化echarts实例
  var foot1 = echarts.init(document.querySelector('.foot1'));

  // 指定图表的配置项和数据
  var option1 = {
      title: {
          text: '鞋子总销量'
      },
      //提示框组件
      tooltip: {},
      legend: {
          data:['销量','人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [15, 20, 36, 10, 10, 20]
      },
      {
        name: '人数',
        type: 'bar',
        data: [90, 50, 23, 67, 98, 45]}
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  foot1.setOption(option1);


 // 基于准备好的dom，初始化echarts实例
 var foot2 = echarts.init(document.querySelector('.foot2'));

 // 指定图表的配置项和数据
 var option2 = {
  title : {
    text: ' 一线大牌鞋子销量对比',
    subtext: '啦啦',
    x:'center'
},
tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪达斯','匡威','AJ','彪马']
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
            {value:1325, name:'AJ'},
            {value:158, name:'彪马'}
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