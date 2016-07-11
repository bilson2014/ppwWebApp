var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数  
var isLogin;
var wb_uniqueId;
var qq_uniqueId;
$().ready(function(){
	var user_login = {
			init:function(){
				//手机号码失去焦点
				this.phoneNumberChange();
				//更换图形验证码
				this.changeKaptcha();
				//获取手机验证码
				this.verificationCode();
				//注册或者登录
				this.regesterOrLogin();
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
					if(!checkMobile(telephone)){
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
			//点击获取手机验证码
			verificationCode:function(){
				// 点击获取手机验证码发送按钮
				$('#verification_code_recover_btn').off('click').on('click',function(){
					curCount = count;
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
				});
			},
			regesterOrLogin:function(){
				var _this = this;
				$("#submitBtn").off("click").on("click",function(){
					var action = $("#submitBtn").attr("data-id");
					var veri_code = $('#verification_code').val();
					var kap_code = $('#kaptcha_code').val();
					if(kap_code == null || kap_code == '' || kap_code == undefined){
						$("#kapt_error_info").text("请输入图形验证码").removeClass("hide");
						return false;
					}
					if(veri_code == null || veri_code == '' || veri_code == undefined){
						$("#code_error_info").text("请输入验证码").removeClass("hide");
						return false;
					}
					
					_this.bind();
				})
			},
			bind:function(){
				loadData(function(msg){
					if(msg.errorCode == 200){
						$(".errorDiv").addClass("hide");
						window.location.href=getContextPath()+ '/provider/portal';
					}else if (msg.errorCode == 300 && msg.errorMsg == "引导流程"){
						window.location.href=getContextPath()+'/provider/leader';
					}else{
						alert(msg.errorMsg);
					}
				}, getContextPath() + '/provider/bind', $.toJSON({
					phoneNumber : $('#user_phoneNumber').val().trim(),
					verification_code : $('#verification_code').val().trim(),
					thirdLoginType:$("#LType").val().trim()
				}))
			}
	} 
	user_login.init();
	
	
	
	//timer 处理函数 - 注册
	function SetRemainTime(){
		if(curCount == 0){
			window.clearInterval(InterValObj); // 停止计时器
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
	
});	
