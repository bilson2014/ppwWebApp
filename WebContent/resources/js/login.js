var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
$().ready(function() {
	
	checkState();

	var login = {
		// 方法都在init中
		init_user : function() {
			//用户手机号码失去焦点
			this.userPhoneChange();
			//用户更换图形验证码
			this.userChangeKaptcha();
			//获取手机验证码
			this.userVerificationCode();
			//用户点击手机登录
			this.user_phoneLogin();
			//用户密码登录
			this.user_nameLogin();
			//qq登陆
			this.qq();
			//微信登陆
			this.wechat();
			//微博登陆
			this.wb();
			//初始化页面
			this.movePage();
		},
		init_team : function() {
			//供应商手机号码失去焦点
			this.teamPhoneChange();
			//供应商更换图形验证码
			this.teamChangeKaptcha();
			//获取手机验证码
			this.teamVerificationCode();
			//供应商点击登录
			this.team_phoneLogin();
			//供应商密码登录
			this.team_nameLogin();
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
//						if(flag.errorCode == 200){
//							$('#phone_error_user').addClass('hide')
//						}else if(flag.errorCode == 300){
//							$('#phone_error_user').removeClass('hide').text('该手机号未注册');
//						}else if(flag.errorCode == 500){
//							$('#phone_error_user').removeClass('hide');
//							$('#phone_error_user').text(flag.errorMsg);
//						}
						
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
					$('#phone_error_user').text('请填写手机号');
					$('#user_phoneNumber').focus();
					return false;
				}
				if(checkMobile(telephone)){
					login.userCheckVerification();
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
		user_phoneLogin:function(){
			$("#submitBtn-user").off("click").on("click",function(){
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
						window.location.href=getContextPath()+'/mgr/index';
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
		user_nameLogin:function(){
			$("#submitBtn_user_name").off("click").on("click",function(){
				var loginName = $("#user_name").val();
				var pwd = $("#user_pwd").val();
				if(loginName == null || loginName == '' || loginName == undefined){
					$("#user_name_error").text("请输入用户名").removeClass("hide");
					$('#user_name').focus();
					return false;
				}
				if(pwd == null || pwd == '' || pwd == undefined){
					$("#user_pwd_error").text("请输入密码").removeClass("hide");
					$('#user_pwd').focus();
					return false;
				}
				if(pwd.length<6){
					$("#user_pwd_error").text("密码最少六位").removeClass("hide");
					$('#user_pwd').focus();
					return false;
				}
				loadData(function(msg){
					$(".errorDiv").addClass("hide");
					if(msg.key){ 
						window.location.href=getContextPath()+ '/mgr/index';
					}else{
						$("#user_pwd_error").text(msg.value).removeClass("hide");
						return false;
					}
				}, getContextPath() + '/login/doLogin', $.toJSON({
					loginType : 'loginName',
					loginName : loginName,
					password : Encrypt(pwd.trim())
				}))
			});
		},
		qq :function(){
			$('#qqBt').on('click',function(){
					QC.Login.showPopup();
					var paras = {};
					//用JS SDK调用OpenAPI
					QC.api("get_user_info", paras)
					//指定接口访问成功的接收函数，s为成功返回Response对象
					.success(function(s){
						// 成功回掉，通过 s.data 获取OpenAPI的返回数据
						QC.Login.getMe(function(openId, accessToken){
							
							// 存入session
							var condition = $.toJSON({
								userName : s.data.nickname,
								imgUrl : s.data.figureurl,
								uniqueId : openId,
								lType : 'qq',
								qqUnique : openId
							});
							OAuthor(condition);
						});
					})
					.error(function(e){
						// 回掉失败
						alert('获取用户信息失败');
					})
					.complete(function(c){
						// 完成请求回掉
					})
				});
		},
		wechat:function(){
			$('#wechat').on('click',function(){
				var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx3d453a7abb5fc026&redirect_uri=http%3A%2F%2Fwww.apaipian.com%2Flogin%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login';
				window.open (url,'_self','height=560,width=400,top=60,left=450,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
			})
		},
		wb:function(){
			$('#weiboBt').on('click',function(){
				WB2.login(function() {
						// 获取 用户信息
					getWBUserData(function(o){
						// 保存至session中，并跳转
						var condition = $.toJSON({
							userName : o.screen_name,
							imgUrl : o.profile_image_url,
							uniqueId : wb_uniqueId,
							lType : 'weibo',
							wbUnique : wb_uniqueId
						});
						OAuthor(condition);
					});
				});
			});
		},
		/*  
		 * ==============================================================================
		 * ==============================user 忧伤的分割线  team==============================
		 * ==============================================================================
		 */	    
		teamPhoneChange:function(){
			$('#team_phoneNumber').off("change").on('change',function(){
				var telephone = $('#team_phoneNumber').val().trim();
				if(telephone == '' || telephone == null || telephone == undefined){
					$('#phone_error_team').removeClass('hide').text('请填写手机号');
					$('#team_phoneNumber').focus();
					return ;
				}
				if(checkMobile(telephone)){
					loadData(function(flag){
						if(flag.errorCode == 200){
							$('#phone_error_team').removeClass('hide').text('该手机号未注册');
						}else if(flag.errorCode == 300){
							$('#phone_error_team').addClass('hide')
						}else if(flag.errorCode == 500){
							$('#phone_error_team').removeClass('hide');
							$('#phone_error_team').text(flag.errorMsg);
						}
					}, getContextPath() + '/provider/checkPhoneExisting', $.toJSON({
						phoneNumber : telephone
					}));
				}else{
					$('#phone_error_team').removeClass('hide').text('手机号不正确');
					$('#team_phoneNumber').focus();
					return ;
				}
			});
		},
		//更换图片验证码
		teamChangeKaptcha:function(){
			$('#kaptcha_pic_team').off("click").on('click',function(){
				$('#kaptcha_pic_team').val('');// 重置图片验证码
				// 初始化 验证码
				$('#kaptcha_pic_team').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#kaptcha_code_team').focus();
			});
		},
		//点击获取手机验证码
		teamVerificationCode:function(){
			// 点击获取手机验证码发送按钮
			$('#get_code_team').off('click').on('click',function(){
				curCount = count;
				var telephone = $('#team_phoneNumber').val().trim();
				if(telephone == '' || telephone == null || telephone == undefined){
					$('#phone_error_team').removeClass('hide');
					$('#phone_error_team').text('请填写手机号');
					$('#team_phoneNumber').focus();
					return false;
				}
				if(checkMobile(telephone)){
					login.teamCheckVerification();
				}else{
					$('#phone_error_team').removeClass('hide');
					$('#phone_error_team').text('手机号不正确');
					$('#user_phoneNumber').focus();
				}
			});
		},
		teamCheckVerification:function(){
			var kaptchaCode = $('#kaptcha_code_team').val().trim();
			if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
				// 判断 图片验证码 是否正确
				getData(function(info){
					if(!info.key){
						// 重置图片验证码
						$('#kaptcha_pic_team').val('');// 重置图片验证码
						$('#kaptcha_pic_team').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
						$('#kaptcha_code_team').focus();
						$("#kapt_error_info_team").text("图形验证码错误").removeClass("hide");
						return;
					}else{
						$("#kapt_error_info_team").addClass("hide");
						// 发送验证码
						// 设置 button 效果为禁用
						//图片验证码通过就发短信,修改按钮状态为disabled,防止信息发送中的多次点击
						$('#get_code_team').text('已发送('+ curCount +')');
						$('#get_code_team').attr('disabled','disabled');
						InterValObj = window.setInterval(SetTeamRemainTime, 1000); // 启动计时器，1秒钟执行一次
						loadData(function(flag){
							if(!flag){
								window.clearInterval(InterValObj);
								$('#get_code_team').text('重新获取');
								$('#get_code_team').removeAttr('disabled');
							}
						}, getContextPath() + '/login/verification/' + $('#team_phoneNumber').val().trim(), null);
					}
				}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
			}else{ // 图片验证码为空
				$('#kaptcha_pic_team').val('');// 重置图片验证码
				$('#kaptcha_pic_team').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#kaptcha_code_team').focus();
				$("#kapt_error_info_team").text("请填写图片验证码!").removeClass("hide");
			}
		},
		team_phoneLogin:function(){
			$("#submitBtn-team").off("click").on("click",function(){
				var phoneNumber = $('#team_phoneNumber').val();				
				var veri_code = $('#verification_code_team').val();
				var kap_code = $('#kaptcha_code_team').val();
				$("#code_error_info_team").addClass("hide");
				$("#team_phoneNumberId").addClass("hide");
				$("#kapt_error_info_team").addClass("hide");
				if(phoneNumber == null || phoneNumber == '' || phoneNumber == undefined){
					$("#phone_error_team").text("请输入手机号").removeClass("hide");
					$('#team_phoneNumber').focus();
					return false;
				}
				if(!checkMobile(phoneNumber.trim())){
					$('#phone_error_team').removeClass('hide').text('手机号不正确');
					$('#team_phoneNumber').focus();
					return false;
				}
				if(kap_code == null || kap_code == '' || kap_code == undefined){
					$("#kapt_error_info_team").text("请输入图形验证码").removeClass("hide");
					$('#kaptcha_code_team').focus();
					return false;
				}
				if(veri_code == null || veri_code == '' || veri_code == undefined){
					$("#code_error_info_team").text("请输入验证码").removeClass("hide");
					$('#verification_code_team').focus();
					return false;
				}
				loadData(function(info){
					$(".errorDiv").addClass("hide");
					if(info.errorCode==200){
						window.location.href=getContextPath()+'/provider/portal';
					}else{
						$("#code_error_info_team").text(info.errorMsg).removeClass("hide");
						return false;
					}
				},  getContextPath() + '/provider/doLogin', $.toJSON({
					loginType :'phone',
					phoneNumber : phoneNumber,
					verification_code : veri_code
				}));
			})
		},
		team_nameLogin:function(){
			$("#submitBtn_team_name").off("click").on("click",function(){
				var loginName = $("#team_name").val();
				var pwd = $("#team_pwd").val();
				if(loginName == null || loginName == '' || loginName == undefined){
					$("#team_name_error").text("请输入用户名").removeClass("hide");
					$('#team_name').focus();
					return false;
				}
				if(pwd == null || pwd == '' || pwd == undefined){
					$("#team_pwd_error").text("请输入密码").removeClass("hide");
					$('#team_pwd').focus();
					return false;
				}
				if(pwd.length<6){
					$("#team_pwd_error").text("密码最少六位").removeClass("hide");
					$('#team_pwd').focus();
					return false;
				}
				loadData(function(msg){
					$(".errorDiv").addClass("hide");
					if(msg.errorCode==200){ 
						window.location.href=getContextPath()+ '/mgr/index';
					}else{
						$("#team_pwd_error").text(msg.errorMsg).removeClass("hide");
						return false;
					}
				}, getContextPath() + '/provider/doLogin', $.toJSON({
					loginType : 'loginName',
					loginName : loginName,
					password : Encrypt(pwd.trim())
				}))
			});
		},
		movePage : function() {
			$('#toNoPhone').on('click', function() {
				$('#cusPhoneLogin').css('display', 'none');
				$('#cusPhoneLogin').removeClass('rightFrom');
				$('#cusNoPhoneLogin').css('display', 'block');
				$('#cusNoPhoneLogin').addClass('leftFrom');
			});
			$('#toUsePhone').on('click', function() {
				$('#cusPhoneLogin').css('display', 'block');
				$('#cusPhoneLogin').addClass('rightFrom');
				$('#cusNoPhoneLogin').css('display', 'none');
				$('#cusNoPhoneLogin').removeClass('leftFrom');
			});
			$('#toNoProPhone').on('click', function() {
				$('#providePhoneLogin').css('display', 'none');
				$('#providePhoneLogin').removeClass('rightFrom');
				$('#providerNoPhoneLogin').css('display', 'block');
				$('#providerNoPhoneLogin').addClass('leftFrom');
			});
			$('#toProPhone').on('click', function() {
				$('#providePhoneLogin').css('display', 'block');
				$('#providePhoneLogin').addClass('rightFrom');
				$('#providerNoPhoneLogin').css('display', 'none');
				$('#providerNoPhoneLogin').removeClass('leftFrom');
			});
			$('#toDir').on('click', function() {
				$('#toCus').removeClass('redColor');
				$('#toDir').addClass('redColor');
				$('#kaptcha_pic_user').val('');// 重置图片验证码
				$('#kaptcha_pic_user').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#moveLine').css('left', '0px');
				$('#showPro').hide();
				$('#showCus').show();
				$('#hideProvider').slideUp();
//				$('#showPro').fadeOut();
//				$('#showCus').fadeIn();
//				$('#showPro').fadeOut("fast",function(){
//					alert(1);
//					
//				});
				setTimeout(function() {
					$('#cusPhoneLogin').css('display', 'block');
					$('#cusNoPhoneLogin').css('display', 'none');
					$('#providePhoneLogin').css('display', 'none');
					$('#providerNoPhoneLogin').css('display', 'none');
					$('#hideCus').slideDown();
				}, 500);
			});
			$('#toCus').on('click', function() {
				$('#toCus').addClass('redColor');
				$('#toDir').removeClass('redColor');
				$('#kaptcha_pic_team').val('');// 重置图片验证码
				$('#kaptcha_pic_team').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
				$('#moveLine').css('left', '50%');
				$('#showCus').hide();
				$('#showPro').show();
				$('#hideCus').slideUp();
//				$('#showCus').fadeOut("fast",function(){
//					$('#showPro').fadeIn();
//				});
				setTimeout(function() {
					$('#cusPhoneLogin').css('display', 'none');
					$('#cusNoPhoneLogin').css('display', 'none');
					$('#providePhoneLogin').css('display', 'block');
					$('#providerNoPhoneLogin').css('display', 'none');
					$('#hideProvider').slideDown();
				}, 500);
			});
		},
	}
	login.init_user();
	login.init_team();
	
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
	//timer 处理函数 - 注册
	function SetTeamRemainTime(){
		if(curCount == 0){
			window.clearInterval(InterValObj); // 停止计时器
			$('#get_code_team').text('重新获取');
			$('#get_code_team').removeAttr('disabled')
			// 清除session code
			getData(function(data){
				// 清除session code
			}, getContextPath() + '/login/clear/code');
		}else{
			curCount--;  
			$("#get_code_team").text('已发送('+ curCount +')');
		}
	}
	function OAuthor(condition){
		var url = getContextPath() + '/login/OAuthor';
		var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
		$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
	}
	////获取微博用户信息
	function getWBUserData(callback){
		WB2.anyWhere(function(W){
			W.parseCMD('/account/get_uid.json',function(oResult, bStatus){
				if(bStatus){
					getWBUserInfo(W, oResult);
					wb_uniqueId = oResult.uid;
				}else{
					alert('授权失败或错误!');
				}
			},{},{
				method : 'GET'
			});
		});
		function getWBUserInfo(W,result){
			W.parseCMD('/users/show.json', function(sResult, bStatus) {
				if(bStatus) {
					callback.call(this,sResult);
				}
			}, {
				'uid' : result.uid
			}, {
				method : 'GET'
			});
		}
	}
});

function checkState(){
	var href = window.location.href;
    var state = href.substr(href.lastIndexOf("?")+1,href.length);
    if(state.trim() == "role=director"){
    	toProvider();
    }
}

function toProvider(){
	$('#toCus').addClass('redColor');
	$('#toDir').removeClass('redColor');
	$('#kaptcha_pic_team').val('');// 重置图片验证码
	$('#kaptcha_pic_team').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
	$('#moveLine').css('left', '50%');
	$('#showCus').hide();
	$('#showPro').show();
	$('#hideCus').hide();
	
		$('#cusPhoneLogin').css('display', 'none');
		$('#cusNoPhoneLogin').css('display', 'none');
		$('#providePhoneLogin').css('display', 'block');
		$('#providerNoPhoneLogin').css('display', 'none');
		$('#hideProvider').show();
}
