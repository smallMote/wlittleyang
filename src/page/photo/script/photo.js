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
        this.keyWord = 'all';
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
        this.$serch = this.PB.$Search;
        this.keyWord = this.PB.keyWord;
    }

    /**
     * 数据显示
     * @constructor
     */
    View(url=this.url , data = this.data , type = 'GET' , isSerch = false){
        let self = this;
        this.a_util.GET_DATA(url , data , type ,(data)=>{
             if (isSerch) data = data.results;

            let wallpaper = new Vue({
                el : this.main_don_id,
                data : {
                    IMG_DATA : data
                },
                methods : {
                    GetImage : ()=>{
                        let $text = $('#search-text');
                        this.keyWord = $text.val() || 'all';
                        let $pic = $('#view-box .col .pic');
                        for (let i = 0; i < $pic.length; i++) {
                            if ($pic.index() >= 5){
                                $($pic.get(i)).remove();
                            }
                        }
                        let url = 'https://api.unsplash.com/search/photos';
                        let data = {
                            page : 1 ,
                            query : this.keyWord,
                            client_id : '1504a87833d967b30639a845dbf7d0ca0fc4846af0760bc06e43fdce04515bfc'
                        };
                        console.log();
                        self.a_util.GET_DATA(url , data , 'GET', (data)=>{
                            wallpaper.$data.IMG_DATA = data.results;
                        });
                    }
                }
            });
        });
    }

    /**
     * 上拉加载新数据
     * @constructor
     */
    AppendView(){
        let $doc = $(document);
        let $win = $(window);
        let pages = 1;
        $win.scroll(()=>{
            if ($win.scrollTop() + $win.height() === $doc.height() && pages <= 20) {
                console.log(`keyWord:${this.keyWord}`);
                let R_data = {
                    page : pages ,
                    query : this.keyWord,
                    client_id : '1504a87833d967b30639a845dbf7d0ca0fc4846af0760bc06e43fdce04515bfc'
                };
                let url = 'https://api.unsplash.com/search/photos';
                this.a_util.GET_DATA(url , R_data , 'GET' ,(data)=>{
                    data = data.results;
                    for (let i = 0; i < data.length; i++) {
                        let img = data[i];
                        let $appendCol = $(`
                            <div class="pic">
                                <a href="${img.urls.raw}" class="raw">查看原图</a>
                                <img src="${img.urls.small}" alt="">
                                <p>${img.description}</p>
                             </div>
                            `);
                        $('#view-box .col').append($appendCol);
                    }
                    pages++;//请求页数+1
                });
            }
        });
    }
    test(){
        console.log(this.url)
    }
}

let PS = new PhotoService();
PS.View();
PS.AppendView();
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