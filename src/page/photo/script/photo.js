'use strict';
//curl https://api.unsplash.com/search/photos?query=minimal
class PhotoBean {
    constructor(){
        this.a_util = new AJAXUtil();
        this.url = '../../public/source/photo.json';
        this.data = {
            client_id : '1504a87833d967b30639a845dbf7d0ca0fc4846af0760bc06e43fdce04515bfc'};
        this.main_don_id = '#wallpaper';
        this.$search = $('#search');
    };

    get A_util(){
        return this.a_util;
    }
    set A_util(o){
        this.a_util = o;
    }

    get Url(){
        return this.url;
    }
    set Url(url){
        this.url = url;
    }

    get Data(){
        return this.data;
    }
    set Data(data){
        this.data = data;
    }

    get Main_don_id(){
        return this.main_don_id;
    }
    set Main_don_id(id){
        this.main_don_id = id;
    }

    get $Search(){
        return this.$search;
    }
    set $Search($o){
        this.$search = $o;
    }

}

class PhotoService {
    constructor(){
        this.PB = new PhotoBean();
        this.a_util = this.PB.A_util;
        this.url = this.PB.Url;
        this.data = this.PB.Data;
        this.main_don_id = this.PB.Main_don_id;
    }

    /**
     * 数据显示
     * @constructor
     */
    View(){
        let self = this;
        this.a_util.GET_DATA(this.url , this.data , 'GET' ,(data)=>{
            console.log(data);
            let wallpaper = new Vue({
                el : this.main_don_id,
                data(){
                    return{
                        IMG_DATA : data
                    }
                }
            });
        });
    }


    test(){
        console.log(this.url)
    }
}
<<<<<<< HEAD
let photo = new PhotoBean();
photo.View();
=======

// new PhotoService().View();

class PhotoUI {
    constructor(){
        this.PB = new PhotoBean();
        this.$search = this.PB.$Search;
    }

    //search
    Search(){
        let doc_Height = $(window).height();
        this.$search.children('.search-box').height(doc_Height);
        console.log(doc_Height);
    };

    test(){

    }
}

let p_ui = new PhotoUI();
// p_ui.Search();
>>>>>>> ab5468b9a70907590b968469e8db875e7b7f3f67
