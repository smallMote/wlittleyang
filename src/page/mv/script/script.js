'use strict';

class MVBean {
    constructor(){
        this.Ajax = new AJAXUtil();
        this.Url = "http://120.79.36.48/mv";
        this.$player = $('#player');
        this.$qxd = $('#qxd');
        this.MVData = {};
    }
}

class MVView {
    constructor(){
        this.mv = new MVBean();
    }

    //设置播放器的src
    PutUrl(src){
        const $mv = this.mv;
        let player = $mv.$player;
        player.attr('src' , src);
    }

    //设置清晰度选择框
    PutQxd(qxdArr){
        const $mv = this.mv;
        let $qxd = $mv.$qxd;
        $qxd.html("");
        for (let i = 0; i < qxdArr.length; i++) {
            let $option = $(`<option value="${i}">${qxdArr[i]} P</option>`);
            $qxd.append($option);
        }
    }

    //清晰度选择
    SelectQxd(){
        const $mv = this.mv;
        let $qxd = $mv.$qxd;
        $qxd.change(()=>{
            setTimeout(()=>{
                let src = sessionStorage.getItem('src');
                src = src.split(',');
                let qxd = $("#qxd").find("option:selected").val();
                this.PutUrl(src[qxd]);
            },50);

        });
    }

    //列表显示
    ShowList(list){
        const $mv = this.mv;
        list = $mv.Ajax.SplitArr(list , 4);
        let $list = $('#list');
        $list.html("");
        for (let i = 0; i < list.length; i++) {
            let $row = $(`
                <div class="row"></div>
            `);
            $list.append($row);
            for (let j = 0; j < list[i].length; j++) {
                let $media = $(`
                <div class="col-sm-3">
                    <div class="thumbnail mvlist" id="${list[i][j].id}">
                        <img src="${list[i][j].cover}"/>
                        <div class="caption">
                            <h3>${list[i][j].artistName}</h3>
                            <p>${list[i][j].name}</p>
                        </div>
                    </div>
                </div>`);
                $row.append($media);
            }

        }
    }

    //更具显示列表获取id，点击播放
    SelectPlay(){
        setTimeout(()=>{
            let $mvlist = $('#list');
            let ms = new MVService();
            $mvlist.on('click',(e)=>{
                let $mvlist = $(e.target).parents('.mvlist');
                let mvid = $mvlist.attr('id');
                ms.GetData({'mvid' : mvid});
            });
        },60);
    }
}

class MVService {
    constructor(){
        this.mv = new MVBean();
        this.mmview = new MVView();
        this.Ajax = this.mv.Ajax;
    }
    //获取播放MV的数据
    GetData(mvid){
        const $MV = this.mv;
        const $mmview = this.mmview;
        const $playerFill = $('#player-fill');
        this.Ajax.GET_DATA($MV.Url,mvid,'GET',(data)=>{
            if (data.code !== 200) {
                $playerFill
                    .text("当前视频资源不存在！")
                    .css({textAlign:'center',color:'red',width:'100%'});
                return;
            }else {
                $playerFill.css('width','720px');
            }
            let src = data.data.brs;
            $MV.MVData.src = src;//保存到bean中
            let qxdArr = [];
            let srcArr = [];
            let count = 0;
            for (let key in src) {
                qxdArr[count] = key;
                srcArr[count] = src[key];
                count++;
            }
            $MV.MVData.qxd = qxdArr;
            sessionStorage.setItem('src' , srcArr);

            //brs   url
            $mmview.PutUrl(src[qxdArr[0]]);//默认清晰度
            $mmview.PutQxd(qxdArr);
        });
    }

    //获取MV的排行
    GetTop(){
        //http://120.79.36.48/top/mv?limit=10
        const $MV = this.mv;
        const $mmview = this.mmview;
        const url = "http://120.79.36.48/top/mv";
        $MV.Ajax.GET_DATA(url , {limit : 10} ,'GET' , (data)=>{
            data = data.data;
            $mmview.ShowList(data);
            this.GetData({mvid : data[0].id})
        });
    }

}
let ms = new MVService();
ms.GetTop();
const mmview = new MVView();
mmview.SelectQxd();
mmview.SelectPlay();
