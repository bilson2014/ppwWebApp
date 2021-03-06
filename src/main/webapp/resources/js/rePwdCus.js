var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var initM = 3;
var successIntervalObj;
$().ready(function() {
	var rePwdCus = {
	    //方法都在init中
	    init: function() {
	    	//用户手机号码失去焦点
			this.userPhoneChange();
			//用户更换图形验证码
			this.userChangeKaptcha();
			//获取手机验证码
			this.userVerificationCode();
			//下一步，验证手机验证码
			this.phoneCodeValidate();
			//点击设置完密码，点击完成修改
			this.finishModify();
	    },
	    userPhoneChange:function(){
			$('#user_phoneNumber').off("change").on('change',function(){
				var telephone = $('#user_phoneNumber').val().trim();
				if(telephone == '' || telephone == null || telephone == undefined){
					$('#phone_error_user').removeClass('hide').text('请填写手机号');
					$('#user_phoneNumber').focus();
					return ;
				}
				if(checkMobile(telephone)){
					loadData(function(flag){
						if(flag.errorCode == 200){
							//  未注册
							$('#phone_error_user').removeClass('hide').text('该手机号未注册');
						}else if(flag.errorCode == 500){
							if(flag.result == false){
								// 已经注册
								$('#phone_error_user').addClass('hide')
							}else{
								// 服务器错误
								$('#phone_error_user').removeClass('hide');
								$('#phone_error_user').text(flag.errorMsg);
							}
						}
						
					}, getContextPath() + '/login/validation/phone', $.toJSON({
						telephone : telephone
					}));
				}else{
					$('#phone_error_user').removeClass('hide').text('手机号不正确');
					$('#user_phoneNumber').focus();
					return ;
				}
			});
		},
		//更换图片验证码
		userChangeKaptcha:function(){
			$('#kaptcha_pic_user').off("click").on('click',function(){
				$('#kaptcha_pic_user').val('');// 重置图片验证码
				// 初始化 验证码
				$('#kaptcha_pic_user').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#kaptcha_code_user').focus();
			});
		},
		//点击获取手机验证码
		userVerificationCode:function(){
			// 点击获取手机验证码发送按钮
			$('#get_code_user').off('click').on('click',function(){
				curCount = count;
				var telephone = $('#user_phoneNumber').val().trim();
				if(telephone == '' || telephone == null || telephone == undefined){
					$('#phone_error_user').removeClass('hide');
					$('#phone_error_user').text('请输入手机号');
					$('#user_phoneNumber').focus();
					return false;
				}
				if(checkMobile(telephone)){
					rePwdCus.userCheckVerification();
				}else{
					$('#phone_error_user').removeClass('hide');
					$('#phone_error_user').text('手机号不正确');
					$('#user_phoneNumber').focus();
				}
			});
		},
		userCheckVerification:function(){
			var kaptchaCode = $('#kaptcha_code_user').val().trim();
			if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
				// 判断 图片验证码 是否正确
				getData(function(info){
					if(!info.key){
						// 重置图片验证码
						$('#kaptcha_pic_user').val('');// 重置图片验证码
						$('#kaptcha_pic_user').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
						$('#kaptcha_code_user').focus();
						$("#kapt_error_info_user").text("图形验证码错误").removeClass("hide");
						return;
					}else{
						$("#kapt_error_info_user").addClass("hide");
						// 发送验证码
						// 设置 button 效果为禁用
						//图片验证码通过就发短信,修改按钮状态为disabled,防止信息发送中的多次点击
						$('#get_code_user').text('已发送('+ curCount +')');
						$('#get_code_user').attr('disabled','disabled');
						InterValObj = window.setInterval(SetUsrRemainTime, 1000); // 启动计时器，1秒钟执行一次
						loadData(function(flag){
							if(!flag){
								window.clearInterval(InterValObj);
								$('#get_code_user').text('重新获取');
								$('#get_code_user').removeAttr('disabled');
							}
						}, getContextPath() + '/login/verification/' + $('#user_phoneNumber').val().trim(), null);
					}
				}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
			}else{ // 图片验证码为空
				$('#kaptcha_pic_user').val('');// 重置图片验证码
				$('#kaptcha_pic_user').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#kaptcha_code_user').focus();
				$("#kapt_error_info_user").text("请填写图片验证码!").removeClass("hide");
			}
		},
		phoneCodeValidate:function(){
			var _this = this;
			$("#stepBtn").off("click").on("click",function(){
				var phoneNumber = $('#user_phoneNumber').val();				
				var veri_code = $('#verification_code_user').val();
				var kap_code = $('#kaptcha_code_user').val();
				$("#code_error_info_user").addClass("hide");
				$("#kapt_error_info_user").addClass("hide");
				if(phoneNumber == null || phoneNumber == '' || phoneNumber == undefined){
					$("#phone_error_user").text("请输入手机号").removeClass("hide");
					$('#user_phoneNumber').focus();
					return false;
				}
				if(!checkMobile(phoneNumber.trim())){
					$('#phone_error_user').removeClass('hide').text('手机号不正确');
					$('#user_phoneNumber').focus();
					return false;
				}
				if(kap_code == null || kap_code == '' || kap_code == undefined){
					$("#kapt_error_info_user").text("请输入图形验证码").removeClass("hide");
					$('#kaptcha_code_user').focus();
					return false;
				}
				if(veri_code == null || veri_code == '' || veri_code == undefined){
					$("#code_error_info_user").text("请输入验证码").removeClass("hide");
					$('#verification_code_user').focus();
					return false;
				}
				loadData(function(info){
					$(".errorDiv").addClass("hide");
					if(info.key){
						$('#topStep1').removeClass('red');
			            $('#topStep1').addClass('gray');
			            $('#topStep2').addClass('red');
			            $('#step1').slideUp();
			            setTimeout(function() {
				            $('#step2').slideDown();
				        }, 300);
			            _this.dealLoginNameStatus();
			            _this.checkPWD();
					}else{
						$("#code_error_info_user").text(info.value).removeClass("hide");
						return false;
					}
				},  getContextPath() + '/login/doLogin', $.toJSON({
					loginType :'phone',
					telephone : phoneNumber,
					verification_code : veri_code
				}));
			})
		},
		dealLoginNameStatus:function(){
			var _this = this;
			loadData(function(info){
				var loginName = info.result.loginName;
				if(null != loginName && '' != loginName && undefined != loginName){
					$("#loginName").val(loginName);
					$("#loginName").attr("readonly","readonly");
				}else{
					_this.checkLoginName();//验证loginName唯一性
				}
			},  getContextPath() + '/user/getcurrentUser', null);
		},
		checkLoginName:function(){
			$("#loginName").off("change").on('change',function(){
				var loginName = $('#loginName').val().trim();
				if(loginName == '' || loginName == null || loginName == undefined){
					$('#loginName-info').removeClass('hide').text('请设置登录名');
					$('#loginName').focus();
					return ;
				}
				loadData(function(flag){
					if(flag){
						$('#loginName-info').removeClass('hide').text('登录名被占用,请更换登录名');
						$('#loginName').focus();
					}else{
						$('#loginName-info').addClass('hide').text('');
					}
				}, getContextPath() + '/login/validation/userName', $.toJSON({
					loginName : loginName
				}));
			});
		},
		checkPWD:function(){
			$("#pwd").off("blur").on("blur",function(){
				var pwd = $('#pwd').val();
				if(pwd == null || pwd == '' || pwd == undefined){
					$("#pwd-info").text("请输入密码").removeClass("hide");
					$("#pwd-info-wrong").show();
					return false;
				}else if(pwd.length<6){
					$("#pwd-info").text("密码不能少于6位").removeClass("hide");
					$("#pwd-info-wrong").show();
					return false;
				}else{
					$("#pwd-info").addClass("hide");
					$("#pwd-info-wrong").hide();
					$("#pwd-info-right").show();
				}
			});
		},
		finishModify:function(){
			$("#stepFinishBtn").off("click").on("click",function(){
				$('.errorDiv').addClass("hide");
				var loginInputStatus = $('#loginName').attr("readonly");
				var loginName = $('#loginName').val();	
				var pwd = $('#pwd').val();	
				var newpwd = $('#newpwd').val();
				if(loginName == null || loginName == '' || loginName == undefined){
					$('#loginName-info').removeClass('hide').text('请设置登录名');
					$('#loginName').focus();
					return false;
				}
				if(pwd == null || pwd == '' || pwd == undefined){
					$("#pwd-info").text("请输入密码").removeClass("hide");
					$("#pwd-info-wrong").show();
					$('#pwd').focus();
					return false;
				}else if(pwd.length<6){
					$("#pwd-info").text("密码不能少于6位").removeClass("hide");
					$("#pwd-info-wrong").show();
					$('#pwd').focus();
					return false;
				}else{
					$("#pwd-info-wrong").hide();
					$("#pwd-info-right").show();
				}
				if(newpwd == null || newpwd == '' || newpwd == undefined){
					$("#newpwd-info").text("请再次输入密码").removeClass("hide");
					$("#newpwd-info-wrong").show();
					$('#newpwd').focus();
					return false;
				}
				if(newpwd!=pwd){
					$("#newpwd-info").text("两次密码不一致").removeClass("hide");
					$("#newpwd-info-wrong").show();
					$('#newpwd').focus();
					return false;
				}else{
					$("#newpwd-info-wrong").hide();
					$("#newpwd-info-right").show();
				}
				if(loginInputStatus){//禁用状态
					loadData(function(info){
						$(".errorDiv").addClass("hide");
						if(info){
							$('#topStep2').removeClass('red');
				            $('#topStep2').addClass('gray');
				            $('#topStep3').addClass('red');
				            showFinish();
						}else{
							$("#newpwd-info").text('修改失败').removeClass("hide");
							return false;
						}
					},  getContextPath() + '/user/modify/password', $.toJSON({
						password  :Encrypt(pwd),
					}));
				}else{
					loadData(function(info){
						$(".errorDiv").addClass("hide");
						if(info.errorCode==200){
							$('#topStep2').removeClass('red');
				            $('#topStep2').addClass('gray');
				            $('#topStep3').addClass('red');
				            showFinish();
						}else{
							$("#newpwd-info").text("修改失败").removeClass("hide");
							return false;
						}
					},  getContextPath() + '/login/modify/logName2', $.toJSON({
						password:Encrypt(pwd),
						loginName:loginName
					}));
				}
			})
		},
	}
	rePwdCus.init();
	//timer 处理函数 - 注册
	function SetUsrRemainTime(){
		if(curCount == 0){
			window.clearInterval(InterValObj); // 停止计时器
			$('#get_code_user').text('重新获取');
			$('#get_code_user').removeAttr('disabled')
			// 清除session code
			getData(function(data){
				// 清除session code
			}, getContextPath() + '/login/clear/code');
		}else{
			curCount--;  
			$("#get_code_user").text('已发送('+ curCount +')');
		}
	}
});

function showFinish(){
	 var $body = '<div class="showSuccessModal ">'
         + '<div class="successModals">'
         + '     <div class="show-zero2 zeromodal-icon zeromodal-success">'
         + '     <span class="line tip"></span>'
         + '     <span class="line long"></span>'
         + '     <div class="placeholder"></div>'
         + ' </div>'
         + '   <div class="successWords">重置成功!</div>'
         + '   <div class="successInfos">欢迎加入拍片网！自动跳转至<span id="toPortal">首页</span><span id="last3">3</span>秒后关闭</div>'
         + '</div>';
 $body += '</div>';
 $("body").append($body);
 successToolTipShow();
}

function successToolTipShow() {
	   window.clearInterval(successIntervalObj);
	   successIntervalObj = window.setInterval(firstSuccessTooltip, 1000);
	   $('#toPortal').on('click',function(){
		   window.location.href=getContextPath()+ '/mgr/index'; 
	});
	}
	function firstSuccessTooltip() {
	   if (initM < 0) {
	       $('#last3').text('0');
	       clearInterval(successIntervalObj);
	       $('.showSuccessModal').remove();
	       window.location.href=getContextPath()+ '/mgr/index';
	   } else {
	       $('#last3').text(initM--);
	   }
	}
