$(function() {
    var form = layui.form;

    form.verify({
        // 定义密码的 设置规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 判断新旧密码是否相同
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        // 判断两次的密码是否一致
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！';
            }
        }
    });

    // 发起请求 实现 重置密码
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认 提交 行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                }
                layui.layer.msg('更新密码成功！');
                // 重置表单 行为  先拿到jQuery对象,再调用这个方法
                $('.layui-form')[0].reset();
            }
        })
    })
})