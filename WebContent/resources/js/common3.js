var hasVideo = false;
var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var initM = 3;
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
            '<form id="cOrder-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">'+
            ' <div class="cOrderItem">' +
            '<div class="dropdown dropdowns" id="selectType">' +
            '<div class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">' +
            '<span data-content="0">' + typeName + '</span>' +
            '<div class="carets"></div>' +
            '</div>' +
            '<ul class="dropdown-menu" id="commonOrderUl" role="menu" aria-labelledby="dropdownMenu1">' +
            '<li data-content="0">宣传片</li>' +
            '<li data-content="1">广告片</li>' +
            '<li data-content="2">动画片</li>' +
            '<li data-content="3">病毒视频</li>' +
            '<li data-content="4">微电影</li>' +
            '<li data-content="5">证言影片</li>' +
            '<li data-content="6">公益片</li>' +
            '<li data-content="7">MV</li>' +
            '<li data-content="8">预告片</li>' +
            '<li data-content="9">纪录片</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="cOrderItem" data-content="" id="indent_tele_error" >' +
            ' <input id="indent_tele" placeholder="您的电话号">' +
            '</div>' +
            '<div class="cOrderItem" data-content="">' +
            ' <input placeholder="输入手机验证码">' +
            '<div>获取验证码</div>' +
            ' </div>' +
            ' <div class="cOrderBtn" id="order-btn">确认下单</div>' +
            ' </form>' +
            '  <div class="cOrderBotTitle">下单后,专业顾问将在2小时之内与您致电确认具体需求</div>' +
            '</div>';
        $body += '</div>';
        $("body").append($body);
        initOrderClick();
    }

    $('.cCloseBtn').on('click', function() {
        $('.comOrder').hide();
    });
}

function initOrderClick(){
	
	$('#order-btn').click(function(){
		if(checkData()){ // 检查数据完整性
			if(checkMobile($('#indent_tele').val())){ // 检查 是否 是手机号码
				showError($('#indent_tele_error'),'');
				// 提交表单
				var token = $('#commonToken').val();
				$('#commonToken').val(htmlSpecialCharsEntityEncode(decodeURIComponent(token)));
				$('#cOrder-form').attr('action',getContextPath() + '/order/submit').submit().remove();
			}else{
				showError($('#indent_tele_error'),'请输入正确的手机格式');
				return false;
			}
		}
	});
	 
	
    $('#commonOrderUl li').on('click',function(){
        $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());        var info=parseInt($(this).attr('data-info'));
        $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-content",($(this).attr('data-content')));
        $(this).parent().slideUp();
        return false;
   });
}


//检查数据完整性
function checkData(){
	// 检查数据
    
	showError($('#indent_tele_error'),'');
	var contactTele = $('#indent_tele').val().trim();
	var flag = true;	
	if(contactTele == '' || contactTele == null || contactTele == undefined){
		showError($('#indent_tele_error'),'请输入手机号码');
		flag = false;
	}
	return flag;
}

// 验证 手机号
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
	if(str.match(reg)){
		return true;
	} else{
		return false;
	}
}


function showError(id,error){
	if(error == "" || error == null){
		id.attr('data-content',"");
	}else{
		id.attr('data-content','*'+error);
	}
}


//成功 提示框弹出方法

function showSuccess(){
	 if ($('body').hasClass('showSuccess')) {
	        
	    } else {

	        var $body = '<div class="showSuccess">' +
	            '<div class="successModal">' +
	            ' 	<div class="show-zero2 zeromodal-icon zeromodal-success">' +
	            ' 		<span class="line tip"></span>' +
	            '   	<span class="line long"></span>' +
	            '   	<div class="placeholder"></div>' +
	            '	</div>' +
	            '   <div class="successWord">下单成功</div>' +
	            '   <div class="successInfo">欢迎加入拍片网!  自动跳转至<span id="toPortal">首页</span><span id="last3">3</span>秒</div>' +
	            '</div>';
	        $body += '</div>';
	        $("body").append($body);
	        successToolTipShow();
   }	 
}

function successToolTipShow(){
	$('#toPortal').on('click',function(){
		window.location.href=getContextPath()+ '/';
	});
	window.clearInterval(successIntervalObj);
	successIntervalObj = window.setInterval(firstSuccessTooltip, 1000);
}
function firstSuccessTooltip(){
	if(initM < 0){
		$('#last3').text('0');
		window.location.href=getContextPath()+ '/';
		clearInterval(successIntervalObj);
		$('#showSuccess').hide();
	}else{
	$('#last3').text(initM --);
	}
}







