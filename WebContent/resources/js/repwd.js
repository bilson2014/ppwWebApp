var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数  
sendCode=true;
var userType;
$().ready(function(){
	userType = $("#userType").val(); // 识别页面用户类型，1=供应商，2=客户 找回密码！
	var user_login = {
			init:function(){
				//手机号码失去焦点
				this.phoneNumberChange();
				//更换图形验证码
				this.changeKaptcha();
				//获取手机验证码
				this.verificationCode();
				//回车
				getEnter();
				//图片验证
				this.checkImageCode();
				this.login();
				
			},
			phoneNumberChange:function(){
				$('#user_phoneNumber').on('change',function(){
					
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return ;
					}
					if(checkMobile(telephone)){
						var error = $("#user_phoneNumberId");
						if(userType == 'role_customer'){
							// 客户
							loadData(function(flag){
								if(flag.errorCode == 200){
									error.addClass('hide');
								}else if(flag.errorCode == 300){
									error.removeClass('hide');
									error.html('手机号不存在，请<a href="/login">注册</a>');
								}else if(flag.errorCode == 500){
									error.removeClass('hide');
									error.html(flag.errorMsg);
								}
							}, getContextPath() + '/login/validation/phone', $.toJSON({
								telephone : telephone
							}));
						}else if(userType == 'role_provider'){
							// 供应商
							loadData(function(flag){
								if(!flag){
									error.addClass('hide');
								}else{
									error.removeClass('hide');
									error.html('手机号不存在，请<a>注册</a>');
								}
							}, getContextPath() + '/provider/checkExisting', $.toJSON({
								phoneNumber : telephone
							}));
						}
					}else{
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('手机号不正确');
						$('#user_phoneNumber').focus();
						return ;
					}
					$('#user_phoneNumberId').addClass('hide');
				});
			},
			//更换图片验证码
			changeKaptcha:function(){
				$('#kaptcha_pic').off("click").on('click',function(){
					$('#kaptcha_pic').val('');// 重置图片验证码
					// 初始化 验证码
					$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('#kaptcha_pic').focus();
				});
			},
			//图片验证码
			checkImageCode:function(){
			$('#kaptcha_code').on('input propertychange',function(){
				var kaptchaCode = $('#kaptcha_code').val().trim();
				if(kaptchaCode.length==4){
						// 点击获取手机验证码发送按钮
							curCount = count;
							var kaptchaCode = $('#kaptcha_code').val().trim();
							var telephone = $('#user_phoneNumber').val().trim();
							if(telephone == '' || telephone == null || telephone == undefined){
								$('#user_phoneNumberId').removeClass('hide');
								$('#user_phoneNumberId').text('请填写手机号');
								$('#user_phoneNumber').focus();
								return ;
							}
							      if(sendCode){
		                            sendCode=false;
		                            curCount = count;
									user_login.checkVerification();
		                            }
				}
			});
			},
			checkVerification:function(){
				var kaptchaCode = $('#kaptcha_code').val().trim();
				if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
					// 判断 图片验证码 是否正确
					getData(function(info){
						if(!info.key){
							// 图片验证码 不一致 
							// 重置图片验证码
							$('#kaptcha_code').val(''); // 重置 图片验证码 信息
							// 初始化 验证码
							$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
							$('#kaptcha_code').focus();
							$("#kapt_error_info").text("图形验证码错误").removeClass("hide");
							return;
						}else{
							// 验证通过
							// 发送验证码
							$("#kapt_error_info").addClass("hide");
							loadData(function(flag){
								if(flag){
									// 发送成功
									// 设置 button 效果为禁用
									$('#verification_code_recover_btn').text('已发送('+ curCount +')');
									$('#verification_code_recover_btn').attr('disabled','disabled');
									InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
									// 倒计时
								}else{
									// 发送不成功
									// 显示重新发送
									sendCode=true;
									$('#verification_code_btn').text('重新获取');
									$('#verification_code_btn').removeAttr('disabled');
								}
							}, getContextPath() + '/login/verification/' + $('#user_phoneNumber').val().trim(), null);
						}
					}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
				}else{ // 图片验证码为空
					$('#kaptcha_code').val('');// 重置图片验证码
					// 初始化 验证码
					$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('#kaptcha_code').focus();
					$("#kapt_error_info").text("请填写图片验证码!").removeClass("hide");
				}
			},
			
			
			//点击获取手机验证码
			verificationCode:function(){
				// 点击获取手机验证码发送按钮
				$('#verification_code_recover_btn').off('click').on('click',function(){
					curCount = count;
					var kaptchaCode = $('#kaptcha_code').val().trim();
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return ;
					}
					else{
						user_login.checkVerification();
					}
				});
			},
			login:function(){
				if(userType == 'role_customer'){
					// 客户
					$('#submitbtn').on('click',function(){
						if(checkData()){
							loadData(function(info){
								if(info.key){
									$(".errorDiv").addClass("hide");
									window.location.href=getContextPath()+ '/user/updatePwd';
								}else{
									$("#code_error_info").text('验证失败').removeClass("hide");
								}
							}, getContextPath() + '/login/doLogin', $.toJSON({
								loginType : $("#login_type").val(),
								telephone : $('#user_phoneNumber').val().trim(),
								password : Encrypt("123456"),
								verification_code : $('#verification_code').val().trim(),
							}));
						}
					});
				}else if(userType == 'role_provider'){
					// 供应商
					$('#submitbtn').on('click',function(){
						if(checkData()){
							loadData(function(info){
								if(info.result){
									$(".errorDiv").addClass("hide");
									window.location.href=getContextPath()+ '/provider/updatePwd';
								}else{
									$("#code_error_info").text('验证失败').removeClass("hide");
								}
							},
							getContextPath() + '/provider/doLogin', $.toJSON({
								phoneNumber : $('#user_phoneNumber').val().trim(),
								loginType : "phone",
								verification_code : $('#verification_code').val().trim(),
							}))
						}
					});
				}
			}
	} 
	user_login.init();
	
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
	
	function checkData(){
		var telephone = $('#user_phoneNumber').val().trim();
		var kaptcha_code = $('#kaptcha_code').val().trim();
		var verification_code = $('#verification_code').val().trim();
		
		if(telephone == '' || telephone == null || telephone == undefined){
			$('#user_phoneNumberId').removeClass('hide');
			$('#user_phoneNumberId').text('请填写手机号');
			$('#user_phoneNumber').focus();
			return false;
		}else{
			$('#user_phoneNumberId').addClass('hide');
		}
		if(!checkMobile(telephone)){
			$('#user_phoneNumberId').removeClass('hide');
			$('#user_phoneNumberId').text('手机号不正确');
			$('#user_phoneNumber').focus();
			return false;
		}else{
			$('#user_phoneNumberId').addClass('hide');
		}
		if(kaptcha_code == '' || kaptcha_code == null || kaptcha_code == undefined){
			$('#kapt_error_info').removeClass('hide');
			return false;
		}else{
			$('#kapt_error_info').addClass('hide');
		}
		if(verification_code == '' || verification_code == null || verification_code == undefined){
			$('#code_error_info').removeClass('hide');
			return false;
		}else{
			$('#code_error_info').addClass('hide');
		}
		return true;
	}
	
});

//回车
function getEnter(){
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			$('#submitbtn').click();
		}
	});
}