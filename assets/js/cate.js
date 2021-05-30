$(function() {
    // 进入页面时,首先调用 获取列表 方法
    initArtCateList();

    // ---------------------获取文章分类的列表---------------------
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    var layer = layui.layer;
    var form = layui.form;
    // ----------------------实现添加文章分类----------------------
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        // 先阻止 提交 的默认行为
        e.preventDefault();
        // 然后发起 post 发送请求
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }

                // 再次调用 获取文章列表 方法
                initArtCateList();
                layer.msg('新增分类成功！');
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        });
    })

    // ---------------------为[添加类别]按钮绑定点击事件---------------------
    var indexAdd = null;
    $('#AddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['450px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // ---------------------为[修改类别]按钮绑定点击事件---------------------
    var indexEdit = null;
    // 通过 代理 的方式绑定事件
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['450px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        // ----------根据 id 的值发起请求获取文章分类的数据，并填充到表单中----------
        var id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })



    // ---------------------为修改分类的表单绑定 submit 事件---------------------
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                // 快速拿到当前表单中的数据
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败!');
                    }
                    layer.msg('更新分类数据成功!');
                    layer.close(indexEdit);
                    // 重新获取 文章列表
                    initArtCateList();
                }
            });
        })
        // -------------------------为删除按钮绑定点击事件-------------------------
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败!')
                    }
                    layer.msg('删除分类成功!')
                    layer.close(index);
                    // 调用 获取文章分类的列表 方法, 重新获取数据
                    initArtCateList();
                }
            });
        })
    })
})