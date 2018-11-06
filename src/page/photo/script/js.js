const MAX_PAGES = 29;
//下一页
$('#next-btn').click(()=>{
    let pages = parseInt(sessionStorage.getItem('pages'));
    if( pages > 0){
        sessionStorage.setItem('pages' , pages + 1 + "");
    }
    if (pages >= MAX_PAGES){
        sessionStorage.setItem('pages' , MAX_PAGES + "");
        alert("亲，最后一页了！不能再往后翻页了哦！");
    }
    viewData();
});
//上一页
$('#pre-btn').click(()=>{
    let pages = parseInt(sessionStorage.getItem('pages'));
    if( pages > 1){
        sessionStorage.setItem('pages' , pages - 1 + "");
    }else {
        sessionStorage.setItem('pages' , 1 + "");
        alert("亲，已经是第一页了呢！不能再往前翻页了哦！");
    }
    viewData();
});
//首页
$('#fir-btn').click(()=>{
    sessionStorage.setItem('pages' , 1 + "");
    viewData();
});
//尾页
$('#lst-btn').click(()=>{
    sessionStorage.setItem('pages' , MAX_PAGES + "");
    viewData();
});
//Go
$('#go-btn').click(()=>{
    let pages = $('#pages');
    let pages_num = pages.val();
    if(pages_num.length === 0 || pages_num < 1 || pages_num > MAX_PAGES){
        pages.focus();
        pages.css('borderColor','red');
        pages.blur(()=>{
            pages.css('borderColor','hotpink');
        });
    }else {
        sessionStorage.setItem('pages' , pages_num);
        viewData();
    }
});
let getData = (callback)=>{
    //https://www.apiopen.top/meituApi?page=1
    let pages = sessionStorage.getItem('pages') || 1;
    $.ajax({
        url:'https://www.apiopen.top/meituApi?page='+pages,
        success : (data)=>{
            data = data.data;
            callback(data);
        }
    });
};

let viewData = ()=>{
    $('#box ul').html("");//清空
    getData((data)=>{
        sessionStorage.getItem('pages') === null ? sessionStorage.setItem('pages' , 1+"") : undefined;
        $('#view-pages').text(sessionStorage.getItem('pages'));
        let dom;
        for (let i = 0; i < data.length; i++) {
            dom = $(`
                        <li>
                            <img src="${data[i].url}" alt="">
                        </li>
                    `);
            $('#box ul').append(dom);
        }
    });
};
viewData();