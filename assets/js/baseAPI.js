// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 如果options.url里面包含'/my',则说明这次发起的是[有权限]的请求
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            // 统一为[有权限]的接口 设置 headers 请求头
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete方法
    options.complete = function(res) {
        // 不论结果如何，都会调用 complete 回调方法
        // 在 complete 回调方法中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = 'login.html';
        }
    }
})