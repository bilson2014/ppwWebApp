var kaptcharInterValObj; // timer变量，控制时间
var InterValObj; // timer变量，控制时间 - 注册
var InterValRecoverObj; // timer变量，控制时间 - 密码找回
var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 - 注册
var recoverCount; // 当前剩余秒数 - 密码找回
var sendCode =true;
var qq_uniqueId;
var wb_uniqueId;
var qq_uniqueId;

$().ready(function(){
	changeAttr();
	var login = { 
			sina : function(){ // 新浪登陆
				$('#weiboBt').on('click',function(){
					WB2.login(function() {
							// 获取 用户信息
						getWBUserData(function(o){
							// 保存至session中，并跳转
							var condition = $.toJSON({
								linkman : o.screen_name,
								teamPhotoUrl : o.profile_image_url,
								thirdLoginType : 'weibo',
								wbUnique : wb_uniqueId
							});
							otherLogin(condition);
						});
					});
				});
			},
			webcat : function(){ // 微信登陆
				// open model
				$('#webcat').on('click',function(){
					var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx3d453a7abb5fc026&redirect_uri=http%3A%2F%2Fwww.apaipian.com%2Flogin%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login';
					window.open (url,'_self','height=560,width=400,top=60,left=450,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
				})
			},
			qq : function(){
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
								linkman : s.data.nickname,
								teamPhotoUrl : s.data.figureurl,
								thirdLoginType : 'qq',
								qqUnique : openId
							});
							
							otherLogin(condition);
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
				
			}
	}
	
	login.sina();
	login.webcat();
	login.qq();
	
	var provider_login = {
			init:function(){
				//手机号码失去焦点
				this.phoneNumberChange();
				//更换图形验证码
				this.changeKaptcha();
				//获取手机验证码
				this.verificationCode();
				//注册或者登录
				this.regesterOrLogin();
				//切换
				this.changeLogin();
				//回车
				getEnter();
				
				//this.checkImageCode();
			},
			
			phoneNumberChange:function(){
				$('#user_phoneNumber').on('change',function(){
					$('#submitBtn').removeAttr('data-id');//清空注册或登陆标记位，防止换号后数据错误
					$('#submitBtn').text("登录");
					var telephone = $('#user_phoneNumber').val().trim();
					if(telephone == '' || telephone == null || telephone == undefined){
						$('#user_phoneNumberId').removeClass('hide');
						$('#user_phoneNumberId').text('请填写手机号');
						$('#user_phoneNumber').focus();
						return ;
					}
					if(checkMobile(telephone)){
						loadData(function(flag){
							if(flag !=null){
								if(flag.errorCode == 200){
									$('#submitBtn').text("注册");
									$('#title').text("供应商注册");
									$("#submitBtn").attr('data-id','register'); // 标记register
									$('#user_phoneNumberId').addClass('hide');
									$('#changeAttr').text('供应商登陆');
									$('#changeAttr').attr('data-event','register');
								}else if(flag.errorCode == 300){
									$('#submitBtn').text("登录");
									$('#title').text("导演登录");
									$('#submitBtn').attr('data-id','login'); // 标记login
									$('#user_phoneNumberId').addClass('hide');
									$('#changeAttr').text('新用户注册');
									$('#changeAttr').attr('data-event','login');
								}else if(flag.errorCode == 500){
									$('#user_phoneNumberId').text(flag.errorMsg);
								}else{
									$('#user_phoneNumberId').text('请求失败，请刷新重试！');
								}
							}
						}, getContextPath() + '/provider/checkPhoneExisting', $.toJSON({
							phoneNumber : telephone
						}));
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
                            provider_login.checkVerification();
                            }

				}
			});
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
						provider_login.checkVerification();
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
							// 设置 button 效果为禁用
							//图片验证码通过就发短信,修改按钮状态为disabled,防止信息发送中的多次点击
							$('#verification_code_recover_btn').text('已发送('+ curCount +')');
							$('#verification_code_recover_btn').attr('disabled','disabled');
							InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
							// 倒计时
							loadData(function(flag){
								if(!flag){
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
			regesterOrLogin:function(){
				var _this = this;
				$("#submitBtn").off("click").on("click",function(){
					var loginType = $("#login_type").val();
					if(loginType=='phone'){//手机号登录
						var phone_code = $('#user_phoneNumber').val();				
						var veri_code = $('#verification_code').val();
						var kap_code = $('#kaptcha_code').val();
						$("#user_phoneNumberId").addClass("hide");
						$("#code_error_info").addClass("hide");
						$("#kapt_error_info").addClass("hide");
						
						if(phone_code == null || phone_code == '' || phone_code == undefined){
							$("#user_phoneNumberId").text("请输入手机号").removeClass("hide");
							$('#user_phoneNumber').focus();
							return false;
						}
						if(!checkMobile(phone_code)){
							$("#user_phoneNumberId").text("手机号输入错误").removeClass("hide");
							$('#user_phoneNumber').focus();
							return false;
						}
						if(kap_code == null || kap_code == '' || kap_code == undefined){
							$("#kapt_error_info").text("请输入图形验证码").removeClass("hide");
							$('#kaptcha_code').focus();
							return false;
						}
						if(veri_code == null || veri_code == '' || veri_code == undefined){
							$("#code_error_info").text("请输入验证码").removeClass("hide");
							$('#verification_code').focus();
							return false;
						}
						//20160706 lt 添加验证begin		
						provider_login.init();
						//end
						var action = $("#submitBtn").attr("data-id");//login or register
						$('#submitBtn').removeAttr('data-id');//清空注册或登陆标记位，防止重复点击1
						if(action=='login'){
							_this.login(action);
						}
						if(action=='register'){
							_this.register(action);
						}
					}
					if(loginType=='loginName'){//账号登录
						var loginName = $("#loginName").val();
						var pwd = $("#pwd").val();
						if(loginName == null || loginName == '' || loginName == undefined){
							$("#loginName_error").text("请输入用户名").removeClass("hide");
							$('#loginName_error').focus();
							return false;
						}
						if(pwd == null || pwd == '' || pwd == undefined){
							$("#pwd_error").text("请输入密码").removeClass("hide");
							$('#pwd_error').focus();
							return false;
						}
						if(pwd.length<6){
							$("#pwd_error").text("密码最少六位").removeClass("hide");
							$('#pwd_error').focus();
							return false;
						}
						loadData(function(msg){
							if(msg.errorCode == 200){
								$(".errorDiv").addClass("hide");
								window.location.href=getContextPath()+ '/provider/portal';
							}else{
								$("#pwd_error").addClass('hide');
								$('#loginName_error').addClass('hide');
								$("#name_login_error_info").text(msg.errorMsg).removeClass("hide");
								return false;
							}
						}, getContextPath() + '/provider/doLogin', $.toJSON({
							loginType : loginType,
							loginName : $('#loginName').val().trim(),
							password : Encrypt($('#pwd').val().trim())
						}))
					}
				})
			},
			login:function(action){
				loadData(function(msg){
					if(msg.errorCode == 200){
						$(".errorDiv").addClass("hide");
						window.location.href=getContextPath()+ '/provider/portal';
					}else{
						//$("#code_error_info").text(info.value).removeClass("hide");
						$("#login_error_info").text(msg.value).removeClass("hide");
						$("#submitBtn").attr("data-id",action);//login or register
						return false;
					}
				}, getContextPath() + '/provider/doLogin', $.toJSON({
					phoneNumber : $('#user_phoneNumber').val().trim(),
					loginType : "phone",
					verification_code : $('#verification_code').val().trim(),
				}))
			},
			register:function(action){
				loadData(function(info){
					if(info.key){
						$(".errorDiv").addClass("hide");
						window.location.href=getContextPath()+'/provider/leader';
					}else{
						$("#code_error_info").text(info.value).removeClass("hide");
						$("#login_error_info").text(info.result).removeClass("hide");
						$("#submitBtn").attr("data-id",action);//login or register
						return false;
					}
				},  getContextPath() + '/provider/info/register', $.toJSON({
					phoneNumber : $('#user_phoneNumber').val().trim(),
					password : Encrypt("123456"),
					verification_code : $('#verification_code').val().trim(),
					flag : 3
				}));
			},
			changeLogin:function(){
				$('#changeLoginId').off('click').on('click',function(){
					if($('#showLogin').hasClass('hide')){//手机登录
						$('input').val('');
						$('#loginWord').text('使用账号登录');
						$('#showLogin').removeClass('hide');
						$('#nameLogin').addClass('hide');
						$('#changeId').removeClass('changeImgPhone');
						$('#changeId').addClass('changeImg');
						$('#outSideId').addClass('phoneHeight');
						$('#outSideId').removeClass('userheight');
						$('#login_type').val("phone");
						$('#changeAttr').show();
						$('#changeAttr').attr('data-event','register');
						$('#changeAttr').click();
					}else{
						$('input').val('');
						$('#loginWord').text('使用手机号登录');//用户名登录
						$('#showLogin').addClass('hide');
						$('#nameLogin').removeClass('hide');
						$('#changeId').removeClass('changeImg');
						$('#changeId').addClass('changeImgPhone');
						$('#outSideId').removeClass('phoneHeight');
						$('#outSideId').addClass('userheight');
						$('#login_type').val("loginName");
						$('#submitBtn').text("登录");
						$('#changeAttr').hide();
					}
				});
				
			}
	} 
	provider_login.init();
	
	function otherLogin(condition){
		var url = getContextPath() + '/provider/thirdLogin';
		var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
		$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
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
	
});

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

//回车
function getEnter(){
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			$('#submitBtn').click();
		}
	});
}
function changeAttr(){
	$('#changeAttr').on('click',function(){
		var type = $(this).attr('data-event');
		if(type == 'login'){
			$('#submitBtn').text('注册');
			$(this).attr('data-event','register');
			$(this).text('供应商登陆');
			$('#title').text('供应商注册');
		}else if(type == 'register'){
			$('#submitBtn').text('登陆');
			$(this).attr('data-event','login');
			$(this).text('新用户注册');
			$('#title').text('供应商登陆');
		}
	});
}