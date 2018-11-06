'use strict';
class AJAXUtil{
    constructor(){

    }

    /**
     * AJAX请求数据
     * @param url 地址
     * @param data 参数
     * @param type 类型
     * @param callback 回调
     * @constructor
     */
    GET_DATA(url , data , type = 'POST' ,callback) {
        $.ajax({
            url:url,
            type : type,
            data : data,
            dataType : 'json',
            success : function (data) {
                callback(data);
            },
            error : function (e_o, msg, code) {
                console.log(`e_o:${e_o} \n msg:${msg} \n code:${code}`);
            }
        });
    };
    /**
     * 分割数组创建二维数组封装
     * @param data 数组
     * @param senArrLen 需要分割成子数组的长度
     */
    SplitArr(data , senArrLen){
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
    //测试方法
    test(){
        console.log(this.SplitArr([1,2,3,4,5] , 2));
    };
}
// let au = new AJAXUtil();
// au.test();