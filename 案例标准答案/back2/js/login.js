$(function () {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  // 实现表单校验, 需要先表单校验初始化完成后, 后面才能调用方法
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-leaf',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中..
    },


    // 配置字段列表  field 字段  校验前, 需要先给每个input, 添加上 name
    fields: {
      username: {
        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 提示信息
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须是2-6位'
          },
          // callback 专门用于配置回调提示
          callback: {
            message: '用户名不存在'
          }
        }
      },
      // password
      password: {
        validators: {
          // 非空
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }

  });

  /* 
    2. 实现登录ajax提交
       由于需要校验, 所以需要submit按钮, 在提交时, 会进行校验
       表单校验成功时, 会自动提交, 通常我们需要注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  */
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    // console.log('默认的提交被阻止了');
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error === 1000) {
          // alert('用户名不存在');
          // updateStatus(field, status, validator);
          // 参数1. 字段名称
          // 参数2. 校验状态, VALID 成功  INVALID 失败
          // 参数3. 校验规则的名称, 用于配置提示信息
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error === 1001) {
          // alert('密码错误');
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
        if (info.success) {
          location.href = 'index.html';
        }
      }
    })

  });

  /* 
    3. 重置功能
       type="reset" 按钮只可以重置 表单内容, 但是不能重置表单校验状态的

       resetForm()  只重置状态, 不重置内容
       resetForm(true) 重置状态和内容

       但是由于 type="reset" 按钮, 本身就可以重置内容, 这里重置状态即可
  */
  $('[type="reset"]').click(function() {
    $('#form').data('bootstrapValidator').resetForm();
  });


});