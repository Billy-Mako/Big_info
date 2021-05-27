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
            console.log(res);
        }
    })
}