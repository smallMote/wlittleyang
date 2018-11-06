'use strict';
$(function () {
    $('#myTab li:eq(1) a').tab('show');
});
/**
 * 接口https://www.apiopen.top/satinApi?type=1&page=1
 * type=1 : 全部
 * type=2 : 文字
 * type=3 : 图片
 * type=4 : 视频
 * page=1:页码
 */
let au = new AJAXUtil();
let  url = 'https://www.apiopen.top/satinApi';
let data = {type : 3 , page : 1};
// $('#myTab li').click(function (e) {
//     let tag = $(e.target);
//     console.log(tag);
//     if(tag.hasClass('text')){
//         data = {type : 2 , page : 1};
//     }else if(tag.hasClass('image')){
//         data = {type : 3 , page : 1};
//     }else if(tag.hasClass('video')){
//         data = {type : 3 , page : 1};
//     }else if(tag.hasClass('all')){
//         data = {type : 1 , page : 1};
//     }
//     view(data);
// });
au.GET_DATA(url,data,function (data) {
    data = data.data;
    let dataArr = au.SplitArr(data , 4);
    new Vue({
        el : '#dom',
        data : function () {
            return{
                duanziArr : dataArr[0],
                videoArr : '',
                page : 0,
                request_data : '1',
            }
        },
        computed : {
        },
        methods : {
            test : function () {
                this.a = 2;
            },
            pageAction : function (ev) {
                let tag = $(ev)[0].target;
                let data_len = dataArr.length;
                if(tag.id === 'next-btn'){
                    this.page === data_len - 1 ? this.page = data_len - 1 : this.page++;
                }else if(tag.id === 'pre-btn'){
                    this.page === 0 ? this.page = 0 : this.page--;
                }else if(tag.id === 'fir-btn'){
                    this.page = 0;
                }else if(tag.id === 'lst-btn'){
                    this.page = dataArr.length - 1;
                }
                this.duanziArr = dataArr[this.page];
            },
            kindAction : function (ev) {
                let tag = $($(ev)[0].target);
                let self = this;
                console.log(self.request_data);
                au.GET_DATA(url , {type : 2 , page : 1}, function (data) {
                    self.duanziArr = au.SplitArr(data.data , 4);
                });
            }
        }
    });
});

