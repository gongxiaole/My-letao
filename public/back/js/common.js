/**
 * Created by hp on 2017/11/2.
 */
//校验用户是否登录
//indexOf 检索字符串值有没有出现 没有则返回-1
if(location.href.indexOf("login.html") < 0){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明该用户没有登录 跳转到登录页面
                location.href = "login.html";
            }
        }
    })
}
$(document).ajaxStart(function () {
    //让进度条显示出来
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});

//点击分类管理，显示或者隐藏二级分类
$('.child').prev().on("click",function () {
    $(this).next().slideToggle();
})

//点击小图标，显示或者隐藏侧边栏
$(".icon_menu").on("click",function () {
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now")
})

//右边小图标退出功能
$(".icon_logout").on("click",function () {
    $("#logoutModal").modal("show");
})
$(".btn_logout").on("click",function () {
    //发送一个ajax请求，去告诉服务器我要退出了
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
            if(data.success){
                window.location.href = "login.html";
            }
        }
    })
})
