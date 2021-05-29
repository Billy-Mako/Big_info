$(function() {
    // 调用 获取用户信息 方法
    getUser();
})

// 获取用户的基本信息
function getUser() {
    $.ajax({
        // 请求的类型
        method: 'GET',
        // 请求的地址
        url: '/my/userinfo',
        // headers 请求头 配置对象 需要携带 Authorization 字样,才能访问成功
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // 进行判断,若请求失败, 则弹出信息
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 若请求成功, 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称 [进行判断优先级]
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本内容
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name + '&nbsp;&nbsp;!');
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 若用户有具体的图片头像, 则优先渲染 图片头像
        $('.layui-nav-img') // 显示 图片头像
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide(); // 隐藏 文本头像
    } else {
        // 若用户没有有具体的图片头像, 则优先渲染 文字头像
        $('.layui-nav-img').hide(); //隐藏 图片头像
        // 定义一个变量, 取用户名字的第一个字符[toUpperCase 取大写]
        var firstStr = name[0].toUpperCase()
        $('.text-avatar')
            .html(firstStr)
            .show()
    }
}
var layer = layui.layer
    // 点击按钮，实现退出功能
$('#logout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        // 1.清空本地存储中的 token
        localStorage.removeItem('token');
        // 2.重新跳转到登录页面
        location.href = 'login.html';
        // 3.关闭 confirm 询问框
        layer.close(index);
    })
})