/**
 * Created by hp on 2017/11/2.
 */

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                $("tbody").html(template("tpl",data));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size:"small",
                    onPageClicked(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();
    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");
    });
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv", function (e) {
        e.preventDefault();//不让他跳转
        // console.log("hehe");
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    $("#addModal").modal("hide");
                    //渲染第一页
                    currentPage = 1;
                    render();
                    //重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        });
    })
});
