$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })


    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        var layer = layui.layer;
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // 调用 form.val() 方法为表单赋值：
                form.val('formUserInfo', res.data);
            }
        })
    };

    // 重置表单的数据
    $('#reset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 调用 初始化用户基本信息 方法
        initUserInfo();
    })
})