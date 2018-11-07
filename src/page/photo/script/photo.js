'use strict';
//curl https://api.unsplash.com/search/photos?query=minimal
class PhotoBean {
    constructor(){
        this.a_util = new AJAXUtil();
        this.url = 'https://api.unsplash.com/photos/';
        this.data = {
            client_id : '1504a87833d967b30639a845dbf7d0ca0fc4846af0760bc06e43fdce04515bfc'};
    };

    View(){
        this.a_util.GET_DATA(this.url , this.data , 'GET' ,(data)=>{
            console.log(data);
        });
    }
}
let photo = new PhotoBean();
photo.View();