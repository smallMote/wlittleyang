'use strict';

/**
 * 处理书籍的业务类
 */
class Book {
    /**
     * 构造函数，传入JQuery对象
     * @param $ JQuery对象
     */
    constructor($){
        this.$ = $;
        this.name = 'Larry';
        this.$row = $('#wallpaper .row');
    };
    //使用ajax获取数据
    getBookData(callback){
        this.$.ajax({
            url:'http://localhost:8080/book.do',
            type : 'post',
            dataType : 'json',
            success(data){
                callback(data);
            },
            error(msg , struts){
                let errCode = msg.status;
                console.log(msg , struts , errCode);
            }
        });
    };
    //显示在DOM中
    view(){
        let self = this;
        this.getBookData((data)=>{
            data = data[0];
            let dataArr = splitArr(data.data , 4);
            console.log(data.data);
            let v_wallpaper = new Vue({
                el : '#wallpaper',
                data : {
                    bookArr : dataArr,
                }
            });
        });
    };

    //测试
    test(){
        let moniData = ()=>{
            let data = [];
            for (let i = 0; i < 21; i++) {
                data[i] = i;
            }
            let arr_len = data.length % 4 === 0 ? data.length / 4 : parseInt((data.length / 4)+'') + 1;
            let arr = new Array(arr_len);
            let count = 0;
            for (let j = 0; j < data.length; j++) {
                if (j % 4 === 0){
                    count++;
                    arr[count-1] = new  Array(4);
                    let new_count = 0;
                    for (let k = j; k < 4 * count; k++) {
                        arr[count-1][new_count] = k+'_data';
                        new_count++;
                    }
                }
            }
            console.log(arr);
        };

    };
}
let book = new Book($);
book.view();
// book.getBookData();

/**
 * 分割数组创建二维数组封装
 * @param data 数组
 * @param senArrLen 需要分割成子数组的长度
 */
let splitArr = (data , senArrLen)=>{
    //处理成len个一组的数据
    let data_len = data.length;
    let arrOuter_len = data_len % senArrLen === 0 ? data_len / senArrLen : parseInt((data_len / senArrLen)+'') + 1;
    let arrSec_len = data_len > senArrLen ? senArrLen : data_len;//内层数组的长度
    let arrOuter = new Array(arrOuter_len);//最外层数组
    let arrOuter_index = 0;//外层数组的子元素下标
    for (let i = 0; i < data_len; i++) {
        if (i % senArrLen === 0){
            arrOuter_index++;
            let len = arrSec_len * arrOuter_index;
            //将内层数组的长度最小取决于数据长度对len取余，平时最内层由下面赋值决定
            arrOuter[arrOuter_index-1] = new  Array(data_len % senArrLen);
            if(arrOuter_index === arrOuter_len)//最后一组
                data_len % senArrLen === 0 ?
                    len = data_len % senArrLen + senArrLen * arrOuter_index :
                    len = data_len % senArrLen + senArrLen * (arrOuter_index - 1);
            let arrSec_index = 0;//第二层数组的索引
            for (let k = i; k < len; k++) {//第一层数组的开始取决于第二层数组长度*当前第一层的索引
                arrOuter[arrOuter_index-1][arrSec_index] = data[k];
                arrSec_index++;
            }
        }
    }
    return arrOuter;
};