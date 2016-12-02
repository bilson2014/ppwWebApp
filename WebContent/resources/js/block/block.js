var kaptcharInterValObj; // timer变量，控制时间
var InterValObj; // timer变量，控制时间 - 注册
var InterValRecoverObj; // timer变量，控制时间 - 密码找回
var count = 120; // 间隔函数，1秒执行 
var curCount = 0; // 当前剩余秒数 - 注册
var recoverCount; // 当前剩余秒数 - 密码找回
var noCardIndex = 0;

var color = new Array(
   '#33D8B5',
   '#F5A623',
   '#FE5453',
   '#AA4CFC',
   '#79D01B',
   '#FF8BE5',
   '#C49B57',
   '#5CB2E6',
   '#F9D100',
   '#02CECA',
   '#FF7600',
   '#FF35C7'
);
$().ready(function() {
    initTab();
    showDiv();
    initView();
//    var node=document.getElementsByClassName('playContent')[0];  
//    $clamp(node,{clamp:4});   
//    
//    var teamDescripti=document.getElementsByClassName('teamDescription')[0];  
//    $clamp(teamDescripti,{clamp:2});   
    
    loadRecommendProductIfNo();

});
function initTab() {
    var product_id = 1;
    // 初始化
    handleScreenSlider(initKey(product_id));
    $(window).resize(function() {
        // window.location.reload();
        handleScreenSlider(initKey(product_id));
    });

    var initColor = $('.conTop');
    $.each(initColor, function(i, item) {
    	var index = $(this).attr('data-id') - 1;
        $(this).css('background', color[index]);
    });

}
// 获取初始化单品分类下单品在页面中的key值
function initKey(product_id) {
    var obj = $(".second_sort .s_item");
    var _key = '';
    for (var i = 0; i < obj.length; i++) {
        var data_id = obj.eq(i).parent().data('id');
        if (product_id == data_id) {
            _key = i;
        }
    }
    return _key;
}
// 不同屏幕下
function handleScreenSlider(default_val) {
    if (devicesSize() == "md") {
        initSlider(4, default_val);
    } else if (devicesSize() == "sm") {
        initSlider(3, default_val);
    } else if (devicesSize() == "xs") {
        initSlider(1, default_val);
    } else {
        initSlider(5, default_val);
    }
}
// 初始化轮播图
function initSlider(number, default_item) {
    var start_at = parseInt(default_item / number);
    var $s_item = $(".second_sort .s_item");
    var s_item_length = $s_item.length;
    // var s_item_length = 9;
    var fSliders = $('.second_sort .f_slider');
    fSliders.each(function() {
        $(this).flexslider({
            slideshow: false,
            directionNav: true,
            controlNav: false,
            animation: "slide",
            animationSpeed: 1500,
            touch: true,
            itemWidth: 300,
            itemMargin: 0,
            minItems: number,
            maxItems: number,
            move: number,
            prevText: "",
            nextText: "",
            startAt: 0,
            start: function(slider) {
                $(".j_choose_style .s_item").fadeIn();
                slider.flexAnimate(start_at, true);
                $(".flex-viewport").css("overflow", "visible");
                // 当分类少于number时，左右箭头不显示
                if (s_item_length < number) {
                    $(".flex-prev").hide();
                    $(".flex-next").hide();
                }
                // 第一页时，做箭头不显示
                if (start_at == 0) {
                    $(".flex-prev").hide();
                }
                // 默认项显示
                $s_item.eq(default_item).addClass("s_item_cur");
                // 默认蒙层
                handleLayer(start_at * number, $s_item, number);
            },
            before: function(slider) {
                if (slider.direction == "next") {
                    $(".flex-prev").show();
                }
                if (slider.direction == "prev") {
                    $(".flex-next").show();
                }
            },
            after: function(slider) {
                var cur_item_index;
                if (slider.direction == "next") {
                    if (slider.animatingTo == slider.pagingCount - 1) { // 最后一页
                        $(".flex-next").hide();
                        if ((slider.animatingTo + 1) * number - s_item_length >= 0) { // 5*2-9
                            cur_item_index = s_item_length - number;
                        }
                    } else {
                        cur_item_index = slider.animatingTo * number;
                    }
                }
                if (slider.direction == "prev") {
                    if (slider.animatingTo == 0) { // 第一页
                        $(".flex-prev").hide();
                    }
                    cur_item_index = slider.animatingTo * number;
                }
                if (!cur_item_index && cur_item_index != 0) {
                    var d = start_at * number;
                    if (slider.animatingTo == slider.pagingCount - 1) {
                        d = s_item_length - number;
                    }
                    handleLayer(d, $s_item, number);
                    var data_id = $s_item.eq(default_item).parent().data('id');
                    setPackageData(default_item, data_id);
                } else {
                    handleLayer(cur_item_index, $s_item, number);
                    var data_id = $s_item.eq(cur_item_index).parent().data('id');
                    setPackageData(cur_item_index, data_id);
                }
            }
        });
    });
}

// 两个数组差集
function arrDifference(arr1, arr2) {
    var isNaN = Number.isNaN;
    return arr1.reduce(function(previous, i) {
        var found = arr2.findIndex(function(j) {
            return j === i || (isNaN(i) && isNaN(j));
        });
        return (found < 0 && previous.push(i), previous);
    }, []);
}
// 蒙层显示
function handleLayer(active_index, obj, n) {
    var active_item = [],
        all_item = [],
        other_item = [];
    for (var i = active_index; i < active_index + n; i++) {
        active_item.push(i);
    }
    for (var j = 0; j < obj.length; j++) {
        all_item.push(j);
    }
    other_item = arrDifference(all_item, active_item);
    other_item.forEach(function(i, index) {
        obj.eq(i).find(".layer").fadeIn().css({ "cursor": "auto" });
    });
    active_item.forEach(function(i, index) {
        obj.eq(i).find(".layer").fadeOut().css({ "cursor": "pointer" });
    });
}
// 判断屏幕尺寸
function devicesSize() {
    var w = $(window).width();
    var flag = null;
    if (w > 0 && w <= 767) {
        flag = "xs";
    } else if (w >= 768 && w <= 991) {
        flag = "sm";
    } else if (w >= 992 && w <= 1199) {
        flag = "md";
    } else {
        flag = "lg";
    }
    return flag;
}
// 表单特效
function showDiv(){
    $('#needOrder').on('click',function(){
      $('#price').removeClass('showPrice');
      $('#price').addClass('noShow');
      $('#order').addClass('showOrder');
    });


    $('#closeBtn').on('click',function(){
      $('#price').addClass('showPrice');
      $('#price').removeClass('noShow');
      $('#order').removeClass('showOrder');
    });
    
    // event
    $('#verification_code_recover_btn').off('click').on('click',verificationCodeBtn);
    $('#order-btn').off('click').on('click',submitOrder);
}


/////////////////////////////////////////wang//////////////////////////////////////
// order verificationCode
function verificationCodeBtn(){
	if(curCount == 0 && checkData(1)){
		curCount = count;
		var telephone = $('#phoneNumber').val().trim();
		$('#verification_code_recover_btn').text('已发送('+ curCount +')');
		$('#verification_code_recover_btn').attr('disabled','disabled');
		InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
		loadData(function(flag){
			if(!flag){
				// 发送不成功
				// 显示重新发送
				sendCode=true;
				$('#verification_code_btn').text('重新获取');
				$('#verification_code_btn').removeAttr('disabled');
			}
		}, getContextPath() + '/login/verification/' + telephone, null);
	}
}
function checkData(type){
	var telephone = $('#phoneNumber').val().trim();
	var verificationCodeValue =	$("#verificationCodeValue").val().trim();
	showError($('#phoneError'),'');
	showError($('#phoneCodeError'),'');
	switch (type) {
	case 1:
		if(telephone == '' || telephone == null || telephone == undefined){
			showError($('#phoneError'),'请填写手机号');
			$('#phoneNumber').focus();
			return false;
		}
		if(!checkMobile(telephone)){
			showError($('#phoneError'),'手机号输入错误');
			$('#phoneNumber').focus();
			return false;
		}
		return true;
	case 2:
		if(verificationCodeValue == '' || verificationCodeValue == null || verificationCodeValue == undefined){
			showError($('#phoneCodeError'),'请填写验证码');
			$('#verificationCodeValue').focus();
			return false;
		}
		return true;
	}
}
//timer 处理函数 - 注册
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		sendCode=true;
		$('#verification_code_recover_btn').text('重新获取');
		$('#verification_code_recover_btn').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/login/clear/code');
	}else{
		curCount--;  
		$("#verification_code_recover_btn").text('已发送('+ curCount +')');
	}
}

function submitOrder(){
	var verificationCodeValue =	$("#verificationCodeValue").val().trim();
	var telephone = $('#phoneNumber').val().trim();
	if(checkData(1) && checkData(2)){
		loadData2(function(msg){
			if(msg.ret){
				showSuccess();
			}else{
				showError($('#phoneCodeError'),'验证码错误');
			}
		}, getContextPath() + '/order/deliver', 
			{indentName : $("#indentName").val(),
			productId :$("#play-unique").val() ,
			teamId : $('#company-unique').val(),
			serviceId : $('#service-unique').val(),
			csrftoken : $('#csrftoken').val(),
			phoneCode : $('#verificationCodeValue').val(),
			indent_tele : telephone
			});
		// ret
	}	
}

function initView(){
	// -> 如果视频有优酷地址，那么使用UK播放器
	var hret = $('#yk-play').val();
	if(hret != '' && hret != null && hret != undefined){
		makePlayer('player-wrap', hret); // 创建视频浏览器
	}
	
	// -> 注册 分享按钮 
	$('.share').click(function(){
		var title = $('#pName').text();
		var url = 'http://m.apaipian.com/play/' + $('#company-unique').val() + '_' + $('#play-unique').val() + '.html';
		var img_path = getDfsHostName() + $('#picPath').val();
		share.init(url,title,img_path);
	});
	
	var html = $('#videoValue').text().trim();
	if(html != ''){
		$.base64.utf8encode = true;
		var decodeContent = $.trim($.base64.atob(html,true));
		var re2 = 'src="@.@([^"]*)"';
	    var p = new RegExp(re2,["gm"]);
	    decodeContent=decodeContent.replace(p, "src='"+getDfsHostName()+"$1"+"'");
		$('#videoValue').html(decodeContent);
		$('#videoDescription').removeClass('hide');
	}else{
		$('#videoDescription').addClass('hide');
		$('#videoValue').text('');
	}
	var x = $('#videoDescription').length;
	if(x > 0){
		loadRecommendProduct();
	}
}
//function loadMoreTeamProduct(){
//	var teamId=$('#company-unique').val();
//	loadData(function(msg){
//		if(msg.code == 1){
//			var res = msg.result;
//			if(res != null && res!=undefined){
//				var hasCount = 0;
//				var productId = $('#play-unique').val();
//				var v1 = $('#moreTeamProductDiv');
//				v1.html('');
//				for (var i = 0; i < res.length; i++) {
//					if(res[i].productId == productId)
//						continue;
//					hasCount ++;
//					var card = createCard(res[i].productName,res[i].productId,res[i].teamId,res[i].picLDUrl);
//					v1.append(card);
//					if(hasCount == 3)
//						break;
//				}
//				if(hasCount == 0){
//					$('#moreTeamProductTitle').addClass('hide');
//					$('#moreTeamProductDiv').addClass('hide');
//				}
//				loadRecommendProduct();
//			}
//		}else{
//			$('#moreTeamProductTitle').addClass('hide');
//			$('#moreTeamProductDiv').addClass('hide');
//		}
//			
//	}, getContextPath() + '/team/product/more', $.toJSON({
//		teamId : teamId
//	}));
//}

//function loadRecommendProduct(){
//	var tags=$('#tags').val();
//	if(tags == null || tags == undefined || tags == ''){
//		return;
//	}
//	loadData(function(msg){
//		if(msg.code == 1){
//			var count = msg.result.total
//			var res = msg.result.result;
//			if(count > 0){
//				if(res != null && res!=undefined){
//					var hasCount = 0;
//					var productId = $('#play-unique').val();
//					var v1 = $('#moreTeamProductDiv');
//					v1.html('');
//					for (var i = 0; i < res.length; i++) {
//						if(res[i].productId == productId)
//							continue;
//						hasCount ++;
//						var card = createCard(res[i].productName,res[i].productId,res[i].teamId,res[i].picLDUrl);
//						v1.append(card);
//						if(hasCount == 8)
//							break;
//					}
//					if(hasCount == 0){
//						$('#recommendProductTitle').addClass('hide');
//						$('#recommendProductTitleDiv').addClass('hide');
//					}
//					var item = $('.Xflag');
//					if(item.length == 0){
//						$('.noMore').removeClass('hide');
//					}
//				}
//				if(count > 8){
//					$('#moreProductInfo').removeClass('hide');
//					$('#moreProductInfo').attr('href','/search?q=tags='+tags);
//				}
//			}else{
//				$('#recommendProductTitle').addClass('hide');
//				$('#recommendProductTitleDiv').addClass('hide');
//				$('.noMore').removeClass('hide');
//			}
//		}else{
//			$('#recommendProductTitle').addClass('hide');
//			$('#recommendProductTitleDiv').addClass('hide');
//			$('.noMore').removeClass('hide');
//		}
//	}, getContextPath() + '/tags/product/search', $.toJSON({
//		condition : tags,
//		begin : 0,
//		limit : 7
//	}));
//}

function loadRecommendProduct(){
		var tags=$('#tags').val();
		if(tags == null || tags == undefined || tags == ''){
			return;
		}
		loadData(function(msg){
			if(msg.code == 1){
				var count = msg.result.total;
				var res = msg.result.result;
				if(count > 0){
					if(res != null && res!=undefined){
						var hasCount = 0;
						var productId = $('#play-unique').val();
						var v1 = $('#newMoreTeamProductDiv');
						v1.html('');
						for (var i = 0; i < res.length; i++) {
							if(res[i].productId == productId){
								count --;
								continue;
							}
								
							hasCount ++;
							var card = createCard(res[i].productName,res[i].productId,res[i].teamId,res[i].picLDUrl,res[i].price);
							v1.append(card);
							if(hasCount == 8)
								break;
						}
						initMoreInfo(count);
						if(hasCount == 0){
							$('#recommendProductTitle').addClass('hide');
							$('#recommendProductTitleDiv').addClass('hide');
						}
						var item = $('.Xflag');
						if(item.length == 0){
							$('.noMore').removeClass('hide');
							 $('.rightNext').hide();
							 $('.rightPrev').hide();
						}
					}
					if(count > 8){
						$('#moreProductInfo').removeClass('hide');
						$('#moreProductInfo').attr('href','/search?q=tags='+tags);
					}
				}else{
					$('#recommendProductTitle').addClass('hide');
					$('#recommendProductTitleDiv').addClass('hide');
					$('.noMore').removeClass('hide');
					 $('.rightNext').hide();
					 $('.rightPrev').hide();
				}
			}else{
				$('#recommendProductTitle').addClass('hide');
				$('#recommendProductTitleDiv').addClass('hide');
				$('.noMore').removeClass('hide');
				 $('.rightNext').hide();
				 $('.rightPrev').hide();
			}
		}, getContextPath() + '/tags/product/search', $.toJSON({
			condition : tags,
			begin : 0,
			limit : 9
		}));
		
	
		}


function loadRecommendProductIfNo(){
	var tags=$('#tags').val();
	if(tags == null || tags == undefined || tags == ''){
		return;
	}
	
	if($('div').hasClass('bottomContent')){
		return;
	}else{
		$('#noInfo').removeClass('hide');
	}
	loadData(function(msg){
		if(msg.code == 1){
			var count = msg.result.total
			var res = msg.result.result;
			if(count > 0){
				if(res != null && res!=undefined){
					var hasCount = 0;
					var productId = $('#play-unique').val();
					var v1 = $('#swiper-noInfoId');
					v1.html('');
					for (var i = 0; i < res.length; i++) {
						if(res[i].productId == productId)
							continue;
						hasCount ++;
						var card = createNoInfoCard(res[i].productName,res[i].productId,res[i].teamId,res[i].picLDUrl,res[i].price);
						v1.append(card);
						if(hasCount == 8)
							break;
					}
					initNoInfo();
				}
				
				if(count > 8){
					 $('#moreNoInfo').removeClass('hide');
					 $('#moreNoInfo').attr('href','/search?q=tags='+tags);
				}
				
			}
		}
	}, getContextPath() + '/tags/product/search', $.toJSON({
		condition : tags,
		begin : 0,
		limit : 9
	}));
}


function initNoInfo(){
	
	 var director = new Swiper('.swiper-noInfo', {
	        pagination: '.swiper-pagination',
	        slidesPerView: 4,
	        paginationClickable: true,
	        spaceBetween: 20,
	        grabCursor: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	    });
	 
	 var maxCard = $('.noInfoCard').length;
	 if(maxCard<=4){
		 $('.noInfo .swiper-button-next').hide();
		 $('.noInfo .swiper-button-prev').hide();
	 }	 
}

function initMoreInfo(num){
	
	var initNum = 0;
	 if(num > 6){
		 initNum = 6;
	 }else{
		 initNum = num;
		 $('.rightNext').hide();
		 $('.rightPrev').hide();
	 }
	 
	 var realHeight = (280/16*9 + 30)*initNum + (initNum-1)*30;
	 $('.rightContentSwiper').css('height',realHeight+"px");
	
    var moreInfo = new Swiper('.swiper-more', {
        pagination: '.swiper-pagination',
        slidesPerView:initNum,
        paginationClickable: true,
        grabCursor: true,
        nextButton: '.rightNext',
        prevButton: '.rightPrev',
        direction: 'vertical'
    });
    
  
}


//function createCard(productName,productId,teamId,imageUrl){
//	var url = getContextPath() +'/play/'+teamId+'_'+productId+'.html';
//	var imageUrl = getDfsHostName() + imageUrl;
//	var html = [
//	    '<div>',
//		'<a href="',url,'">',
//			'<div class="videoModel Xflag">',
//			    '<div class="videoIcon"></div>',
//				'<img src="',imageUrl,'">',
//				'<label>',productName,'</label>',
//			'</div>',
//		'</a>'
//	].join('');
//	return html;
//}


function createNoInfoCard(productName,productId,teamId,imageUrl,price){
	var url = getContextPath() +'/play/'+teamId+'_'+productId+'.html';
	var imageUrl = getDfsHostName() + imageUrl;
	
	if(price<=0){
		var productPrice = "";	
	}else{
	var productPrice ="￥"+thousandCount(price);
	}
	var html = [
	    '<div class="swiper-slide noInfoCard">',
		'	<a href="',url,'">',
		'     <img src="',imageUrl,'">',
		'     <div class="margin-top">',
		'     	<span>',productName,'</span>',
		'     	<span>',productPrice,'</span>',
		'     </div>',
		'	</a>',
		'</div>'
	].join('');
	return html;
}


function createCard(productName,productId,teamId,imageUrl,price){
var url = getContextPath() +'/play/'+teamId+'_'+productId+'.html';
var imageUrl = getDfsHostName() + imageUrl;
if(price<=0){
	var productPrice = "";	
}else{
var productPrice ="￥"+thousandCount(price);
}
var html = [
            '<div class="swiper-slide">',
    		'     <div class="videoModel Xflag">',
    		'	<a href="',url,'">',
    		'     <div class="videoIcon"></div>',			
    		'     <img src="',imageUrl,'">',
    		'     <div class="word">',
    		'     	 <span>',productName,'</span>',
    		'     	 <span>',price,'</span>',
    		'     </div>',
    		'	</a>',
    		'</div>'
].join('');
return html;
}



 	




