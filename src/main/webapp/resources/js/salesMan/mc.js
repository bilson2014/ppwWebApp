var kaptcharInterValObj; // timer变量，控制时间
var InterValObj; // timer变量，控制时间 - 注册
var InterValRecoverObj; // timer变量，控制时间 - 密码找回
var count = 120; // 间隔函数，1秒执行 
var curCount = 0;
var countBot = 120;

$().ready(function() {
	showDiv();
	orderBottom();
});
function noLoginOrder(){
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
			{indentName : '网站-PC-' + $("#indentName").val(),
			productId :$("#play-unique").val() ,
			teamId : $('#company-unique').val(),
			serviceId : $('#service-unique').val(),
			csrftoken : $('#csrftoken').val(),
			phoneCode : $('#verificationCodeValue').val(),
			indent_recomment:'样片名称:'+$("#indentName").val()+',价格:'+$("#vPrice").val(),
			indent_tele : telephone,
			indentSource:15
		});
	}
}

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


function showDiv(){
    $('#needOrder').on('click',function(){
  	var loginTel = $('#rolephone').val();

	var role = $('#role').val();
	if(loginTel!=null && loginTel!= "" && role !='客户' ){
		//loginOrder();
		var setInfo = "您现在登陆角色是"+role+"</br>请退出登陆后重新下单，或联系我们400-660-9728"
		$('#tooltip-check').show();
		$('#checkInfo').html(setInfo);
	}
	else{
	    $('#price').removeClass('showPrice');
	    $('#price').addClass('noShow');
	    $('#order').addClass('showOrder');
	    $('#oootitlte').text('立即下单，为您定制专属影片');
	}
    });
    $('#closeBtn').on('click',function(){
      $('#price').addClass('showPrice');
      $('#price').removeClass('noShow');
      $('#order').removeClass('showOrder');
    });
    // event
    $('#order-btn1').off('click').on('click',noLoginOrder);
    $('#verification_code_recover_btn').off('click').on('click',verificationCodeBtn);
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


//底部下单
function varphone(){
	var phone=$('#phone').val();
	if (phone==''||phone==null||phone==undefined){
		$('#phoneerror').text('*手机号不能为空');
		return false;
	}
	if(!checkMobile(phone)){
		$('#phoneerror').text('*请输入正确的手机号');
		return false;
	} 
	$('#phoneerror').text('');
	return true;
}
function orderBottom(){
	//立即报名
	$('#btnSub').on('click',function(){
		if (varphone()){
			var num=$('#num').val();
			if (num==''||num==null||num==undefined){
				 $('#numerror').text('*验证码不能为空');
				 return false;
			}else {
				loadData(function(result){	
					console.log(result);
					 if (!result.ret){
						$('#numerror').text('*'+ result.message);
						return false;
					 }else{
						 $('#orderSuccess').attr('style','display:block;');	
						 $('#numerror').text('');
						 window.clearInterval(InterValObj);
						 $('#varnum').text('获取验证码');
						 $('#phone').val('');
						 $('#num').val('');
						 sendCodeFlag = true;						 					 
					 }	 
				 }, getContextPath() + '/order/deliver', 
				 {	
					csrftoken:$("#csrftoken").val(),
					indent_tele:$('#phone').val(),
					indentName:'拍片网视频名片',//订单名称
					productId:-1,
					teamId:-1,
					serviceId:-1,
					phoneCode:$('#num').val(),
					target:'Pbusinesscard',
					indentSource : 2//订单来源编号			
				  });	
			}			 
		}				 
	})
	//验证码
	$('#varnum').on('click',function(){		
		if(varphone()){
			if(sendCodeFlag){//防止多次点击			
				sendCodeFlag = false;
				var phone=$('#phone').val();
				verification(phone,'varnum');			
			}
		}
	})
	//报名成功弹框确认事件
	$('#checkSuccess').on('click',function(){
           success();		
	})
}

function verification(phone,ID){
	curCount = countBot;
	// 发送验证码	
	loadData(function(flag){
		if(flag){ // 发送成功
			$('#'+ID).text('已发送('+ curCount +')');
			// 设置 button 效果为禁用
			$('#'+ID).attr('disabled','disabled');
			InterValObj && window.clearInterval(InterValObj);
			InterValObj = window.setInterval(function(){
				if(curCount == 0){
					window.clearInterval(InterValObj); // 停止计时器
					$('#'+ID).text('重新获取');
					$('#'+ID).removeAttr('disabled')
					// 清除session code
					getData(function(data){
						// 清除session code
					}, getContextPath() + '/login/clear/code');
					sendCodeFlag = true;
				}else{
					curCount--;  
					$('#'+ID).text('已发送('+ curCount +')');
				}
			}, 1000); // 启动计时器，1秒钟执行一次
		}else{ // 发送不成功
			// 显示重新发送
			$('#'+ID).text('重新获取');
			$('#'+ID).removeAttr('disabled');
		}			
	}, getContextPath() + '/login/verification/' + phone, null);		
		
}