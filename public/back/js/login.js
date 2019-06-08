$(function () {
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',   // 校验成功
      invalid: 'glyphicon glyphicon-tint',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },
    fields : {
      username :{
        //校验的规则
        validators :{
          //非空校验
          notEmpty :{
            message: "用户名不能为空"
          },
          stringLength :{
            min :2,
            max :6,
            message :"用户名长度必须是2-6位"
          },
          callback :{
            message :"用户名不存在"
          }
        }
      },
      password : {
        validators :{
          notEmpty :{
            message :"密码不能为空"
          },
          stringLength :{
            min :6,
            max :12,
            message :"密码长度必须是6-12位"
          },
          callback :{
            message :"密码错误"
          }
        }
      }
    }
  })
  //2.进行登录请求
  //进行ajax进行登录请求
  $('#form').on("success.form.bv",function(e) {
    e.preventDefault();
    //发送ajax请求
    $.ajax({
      type :'post',
      url :"/employee/employeeLogin",
      data :$('#form').serialize(),
      dataType :'json',
      success :function(info) {
        if (info.success) {
          console.log(info);
          location.href ="index.html";
        }
        //用户名不存在
        if (info.error===1000) {
          $('#form').data("bootstrapValidator").updateStatus('username','INVALID','callback')
        }
        //密码错误
        if (info.error===1001) {
          $('#form').data("bootstrapValidator").updateStatus('password','INVALID','callback')
        }
      }
    })
  });
  $('[type="reset"]').click(function() {
    //除了重置文本, 还要重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  })
})