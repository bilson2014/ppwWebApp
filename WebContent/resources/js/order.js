var hasVideo = false;
$().ready(function(){
	
	order.init();
	order.showVideo();
	order.closeVideo();
	order.playVideo();
});

var order = {
	init : function(){
		// 装载 联系人电话
		var telephone = $('#telephone').val();
		if(telephone != null && telephone != '' && telephone != undefined){
			$('#indent_tele').val(telephone);
		}
		
		// 注册下单按钮
		$('#order-btn').click(function(){
			if(checkData()){ // 检查数据完整性
				if(checkMobile($('#indent_tele').val())){ // 检查 是否 是手机号码
					$('#label-message').hide('normal');
					// 提交表单
					var token = $('#token').val();
					$('#token').val(htmlSpecialCharsEntityEncode(decodeURIComponent(token)));
					$('#order-form').attr('action',getContextPath() + '/order/submit').submit().remove();
				}else{
					$('#label-message').show('normal');
					$('#label-message').text('请输入正确的手机格式');
					return false;
				}
			}
		});
	},

   showVideo : function(){
	   
	           $('#showVideo').on('click',function(){
//		       $('#area').attr('class','');
//		       $('#area').addClass('video-wrap contentSizeOpen');
		       $('#word').addClass('hide');
		       $('#video').removeClass('hide');
		       $('#video').addClass('contentVideoOpen');
//		       $('#line').removeClass('LineSizeClose');
//		       $('#line').addClass('LineSizeOpen');
	   });
	   
   },
   
   closeVideo : function(){
	           $('#closeVideo').on('click',function(){
//		       $('#area').attr('class','');
//		       $('#area').addClass('content-wrap contentSizeClose');
		       $('#word').removeClass('hide');
		       $('#word').addClass('contentVideoOpen');
		       $('#video').addClass('hide');
//		       $('#line').removeClass('LineSizeOpen');
//		       $('#line').addClass('LineSizeClose');
	   });
   },
   playVideo:function(){
	   $('#openVideo').on('click',function(){
		   $('#playVideo').removeClass('hide');
		  // $('#source').attr("src", "http://video.tezign.com/01.mp4");
		   
		   if(!hasVideo){
		   var $body='<video autoplay controls loop  name="media">'+
			   			 '<source  src="/product/video/paipianwangMovie.mp4"  id="source" type="video/mp4">'+
			   		  '</video>';
			$body+='</div>';
			$("#playVideo").append($body);
			hasVideo = true;
		   }
	   });
	   $('#playVideo').on('dblclick',function(){
		   $('#playVideo').addClass('hide');
	   });
   }
}


//检查数据完整性
function checkData(){
	// 检查数据
	var contact = $('#indentName').val().trim();
	var contactTele = $('#indent_tele').val().trim();
	var flag = true;
	
	if(contact == '' || contact == null || contact == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入姓名');
		flag = false;
	}
	
	if(contactTele == '' || contactTele == null || contactTele == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入手机号码');
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
