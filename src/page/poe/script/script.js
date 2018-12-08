'use strict';

class PoeBean {
    constructor(){
        this.url = 'http://api.apiopen.top/recommendPoetry';//随机
        this.a_util = new AJAXUtil();
        this.$poeBox = $('#poe-box');
        this.$title = $('#title');
        this.$author = $('#author');
    }
    get Url(){return this.url}
    set Url(url){this.url = url}
}

class PoeService {
    constructor(){
        this.PB = new PoeBean();
        this.PU = new PoeUI();
    }

    /**
     * ajax获取数据
     * @constructor
     */
    GetPoe(){
        this.PB.a_util.GET_DATA(this.PB.Url , {} , 'GET', (data)=>{
            data = data.result;
            console.log(data);
            let poe = this.SplitContent(data);
            this.PU.PutPoe(poe);
        });
    }

    SplitContent(data){
        let authors = data.authors;
        let title = data.title;
        let content = data.content;
        let regReplace = new RegExp("，" , "g");
        let regRcover = new RegExp(",</p><p>" , "g");
        let $win = $(window);
        if ($win.width() <= 666) {//iPhone7横屏
            content = content.replace(regReplace , ",</p><p>");
        }else {
            content = content.replace(regRcover , "，");
        }
        content = content.split('|');

        return {
            authors : authors,
            title : title,
            content : content
        };
    }
    test(){

    }
}

class PoeUI {
    constructor(){
        this.PB = new PoeBean();
    }

    PutPoe(poe){
        let title = this.PB.$title;
        let author = this.PB.$author;
        let poeBox = this.PB.$poeBox;
        let content = poe.content;
        title.text(poe.title);
        author.text(poe.authors);
        for (let i = 0; i < content.length; i++) {
            let line = $(`
                <p>${content[i]}</p>
            `);
            poeBox.append(line);
        }
    }

    test(){
    }
}

new PoeService().GetPoe();