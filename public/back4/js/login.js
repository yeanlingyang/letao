// import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

$(function() {
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',   // 校验成功
      invalid: 'glyphicon glyphicon-tint',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },
    fields:{
      username: {
        validators: {
          notEmpty : {
            message:'用户名不能为空'
          },
          stringLength :{
            min :2,
            max :6,
            message :'用户名必须在2-6位'
          },
          callback :{
            message :'用户名不存在'
          }
        }
      },
      password :{
        validators:{
          notEmpty:{
            message :'密码不能为空'
          },
          stringLength:{
            min :6,
            max :12,
            message :'密码必须要在6-12位之间'
          },
          callback :{
            message :'密码错误'
          }
        }
      }
    }
  })

  // /2.进行登录请求
  //进行ajax进行登录请求
  $('.enter').click(function(e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url :'/employee/employeeLogin',
      data :$('#form').serialize(),
      dataType:'json',
      success:function(info) {
        if (info.success) {
          location.href ="index.html"
        }
        if (info.error===1000) {
          $('#form').data("bootstrapValidator").updateStatus('username','INVALID','callback')
        }
        if (info.error===1001) {
          console.log(info);
          $('#form').data("bootstrapValidator").updateStatus('password','INVALID','callback')
        }
      }
  
    })
  })
  $('[type="reset"]').click(function() {
    $('#form').data("bootstrapValidator").resetForm();
  })
})
