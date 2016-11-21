var hasVideo = false;
$().ready(function() {
    playVideo();
    chickShowOrder();
});


function playVideo() {
    $('#showVideo').on('click', function() {
        $('#playVideo').removeClass('hide');
        if (!hasVideo) {
            var $body = ' <div class="openVideo" title="双击关闭视频" id="playVideo"><div></div>' +
                '<video autoplay controls loop  name="media" id="header3Video">' +
                //'<source  src="/product/video/paipianwangMovie.mp4"  id="source" type="video/mp4">' +
                '<source  src="http://www.apaipian.com/product/video/paipianwangMovie.mp4"  id="source" type="video/mp4">' +
                '</video>';
            $body += '</div>';
            $("body").append($body);
            hasVideo = true;
            initClose();
        } else {
            document.getElementById('header3Video').play();
        }
    });

}

function initClose() {
    $('#playVideo').on('dblclick', function() {
        $('#playVideo').addClass('hide');
        document.getElementById("header3Video").pause();
    });
}


function chickShowOrder() {
    $('#wantOrder').on('click', function() {
        showOrder('宣传片');
    });
}


function showOrder(typeName) {
   
    if ($('body').hasClass('comOrder')) {
        $('.comOrder').show();
    } else {

        var $body = '<div class="comOrder">' +
            '<div class="cOrder" id="cOrder">' +
            '<div class="cCloseBtn" id="closeBtn">' +
            ' 	<div></div>' +
            '</div>' +
            '<div class="cOrderTitle">立即下单,对接制作团队</div>' +
            ' <div class="cOrderItem">' +
            '<div class="dropdown dropdowns" id="selectType">' +
            '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">' +
            '<span>' + typeName + '</span>' +
            '<div class="carets"></div>' +
            '</button>' +
            '<ul class="dropdown-menu" id="selectUl" role="menu" aria-labelledby="dropdownMenu1">' +
            '<li>宣传片</li>' +
            '<li>广告片</li>' +
            '<li>动画片</li>' +
            '<li>病毒视频</li>' +
            '<li>微电影</li>' +
            '<li>证言影片</li>' +
            '<li>公益片</li>' +
            '<li>MV</li>' +
            '<li>预告片</li>' +
            '<li>纪录片</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="cOrderItem" data-content="">' +
            ' <input placeholder="您的电话号">' +
            '</div>' +
            '<div class="cOrderItem" data-content="">' +
            ' <input placeholder="输入手机验证码">' +
            '<div>获取验证码</div>' +
            ' </div>' +
            ' <div class="cOrderBtn">确认下单</div>' +
            '  <div class="cOrderBotTitle">下单后,专业顾问将在2小时之内与您致电确认具体需求</div>' +
            '</div>';
        $body += '</div>';
        $("body").append($body);
    }


    $('.cCloseBtn').on('click', function() {
        $('.comOrder').hide();
    });
}





// <div class="comOrder">
//        <div class="cOrder" id="cOrder">
//            <div class="cCloseBtn" id="closeBtn">
//                <div></div>
//            </div>
//            <div class="cOrderTitle">立即下单,对接制作团队</div>
//            <div class="cOrderItem">
//                <div class="dropdown dropdowns" id="selectType">
//                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
//                        <span>宣传片</span>
//                        <div class="carets"></div>
//                    </button>
//                    <ul class="dropdown-menu" id="selectUl" role="menu" aria-labelledby="dropdownMenu1">
//                        <li>宣传片</li>
//                        <li>微电影</li>
//                        <li>广告片</li>
//                        <li>病毒视频</li>
//                    </ul>
//                </div>
//            </div>
//            <div class="cOrderItem" data-content="">
//                <input placeholder="您的电话号">
//            </div>
//            <div class="cOrderItem" data-content>
//                <input placeholder="输入手机验证码">
//                <div>获取验证码</div>
//            </div>
//            <div class="cOrderBtn">确认下单</div>
//            <div class="cOrderBotTitle">下单后,专业顾问将在2小时之内与您致电确认具体需求</div>
//        </div>
//    </div>
