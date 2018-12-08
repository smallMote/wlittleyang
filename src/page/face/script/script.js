'use strict';

//https://api-cn.faceplusplus.com/facepp/v3/detect
class FaceBean {
    constructor(){
        this.a_util = new AJAXUtil();
        this.url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
        this.api_key = 'OiEQIB1Mp6WCdseaFqW-u79w5fNqWtwv';
        this.api_secret = 'rv8ZjccrlvDPPzoD9NeI1b3PlNv4xpvA';
        this.$file = $('#file');
        this.$getImgBtn = $('#getImgBtn');
        this.$backImage = $('#backImage');
        this.$dataUl = $('#dataView>ul');

    }

    get Url(){return this.url}
    set Url(url){this.url = url}

    get $File(){return this.$file}
    set $File(o){this.$file = o}

    get $GetImgBtn(){return this.$getImgBtn}
    set $GetImgBtn(o){this.$getImgBtn = o}

    get $BackImage(){return this.$backImage}
    set $BackImage(o){this.$backImage = o}

    get $DataUl(){return this.$dataUl}
    set $DataUl(o){this.$dataUl = o}
}

class FaceService {
    constructor(){
        this.FB = new FaceBean();
        this.FU = new FaceUI();
    }
    GetData(image64){
        this.FB.$DataUl.html("");
        let url = this.FB.Url;
        // let image_url = 'http://img.mp.itc.cn/upload/20160723/20dc8becdf2f4e789c46bd986e97c06f_th.jpg';
        //年龄、性别、微笑、头部、脸型、模糊、眼部、情感、种族、美丽、口感、眼部、皮肤状况
        let return_attributes = 'age,gender,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus' ;
        let R_data = {
            api_key : this.FB.api_key,
            api_secret : this.FB.api_secret,
            image_base64 : image64,
            return_attributes : return_attributes
        };
        let type = 'POST';
        this.FB.a_util.GET_DATA(url , R_data , type , (data)=>{
            console.log(data.code , data.msg);

            let faceAttr = data.faces[0].attributes;
            let age = faceAttr.age.value;
            //None-不佩戴眼镜 Dark-佩戴墨镜 Normal-佩戴普通眼镜
            let glass = faceAttr.glass;
                if (glass === 'None') {
                    glass = '没有佩戴眼镜';
                }else if (glass === 'Dark') {
                    glass = '佩戴了墨镜';
                }else {
                    glass = '佩戴普通眼镜';
                }
            //male_score：男性认为的此人脸颜值分数。值越大，颜值越高。female_score：女性认为的此人脸颜值分数。值越大，颜值越高。
            let beauty = faceAttr.beauty;
            let gender = faceAttr.gender === 'Male' ? '男' : '女';//性别
            //anger：愤怒 disgust：厌恶fear：恐惧 happiness：高兴 neutral：平静 sadness：伤心 surprise：惊讶
            let emotion = faceAttr.emotion;
            let ethnicity = faceAttr.ethnicity;//人种
            if (ethnicity === 'Asian') {
                ethnicity = '亚洲人';
            }else if (ethnicity === 'White') {
                ethnicity = '白人';
            }else {
                ethnicity = '黑人';
            }
            //健康指数health：健康 stain：色斑 acne：青春痘 dark_circle：黑眼圈
            let skinstatus = faceAttr.skinstatus;
            switch (skinstatus) {
                case 'health': skinstatus = '健康';break;
                case 'stain': skinstatus = '色斑';break;
                case 'acne': skinstatus = '青春痘';break;
                case 'dark_circle': skinstatus = '黑眼圈';break;
            }

            let $lis = $(`
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">年龄</span>${age}
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">性别</span>${gender}
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">眼镜</span>${glass}
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">人种</span>${ethnicity}
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">健康</span>
                    健康:${skinstatus.health} 色斑:${skinstatus.stain} 
                    青春痘:${skinstatus.acne} 黑眼圈:${skinstatus.dark_circle} 
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">心情（极限100）</span>
                    生气:${emotion.anger} 厌恶:${emotion.disgust} 恐惧:${emotion.fear} 
                    高兴:${emotion.happiness} 平静:${emotion.neutral} 伤心:${emotion.sadness} 
                    惊讶:${emotion.surprise} 
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">男性认为颜值（满分100）</span>${beauty.male_score}
                </li>
                <li class="list-group-item list-group-item-info">
                    <span class="badge pull-left">女性认为颜值（满分100）</span>${beauty.female_score}
                </li>
            `);
            this.FB.$DataUl.append($lis);
        });
    }

    /**
     * 将获取的img转换为64位的值
     * @param $img
     * @returns {*}
     * @constructor
     */
    GetImage_base64($img){
        let imgFile;
        let self = this;
        //获取文件
        try{
            let file = $img[0].files[0];
            //创建读取文件的对象
            let reader = new FileReader();
            //为文件读取成功设置事件
            reader.onload=function(e) {
                imgFile = e.target.result;
                self.GetData(imgFile);//将图片数据上传
                self.FU.BackImage(imgFile);//回显
            };
            //正式读取文件
            reader.readAsDataURL(file);
        }catch (e) {
            // console.log(e);
        }
    }

    GetLocaImg(){
        let $btn = this.FB.$getImgBtn;
        $btn.click(()=>{
            let $img_64 = this.FB.$File;
            this.GetImage_base64($img_64);//获取64位的图片数据
        });
    }
}


class FaceUI{
    constructor(){
        this.FB = new FaceBean();
    }
    /**
     * 设置上传图片的回显
     * @param imgFile_64 图片64位的数据
     * @constructor
     */
    BackImage(imgFile_64){
        let $backImage = this.FB.$BackImage;
        $backImage.html("");
        let $img = $(`
            <img src="${imgFile_64}" alt="图片" id="imgContent">
        `);
        $backImage.append($img);
    }
}
let FS = new FaceService();
FS.GetLocaImg();