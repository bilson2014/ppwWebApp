var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
var sendCode =true;
var isLogin;
var wb_uniqueId;
var qq_uniqueId;
var isShowKaptcha = false;

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
				//qq登陆
				this.qq();
				//微信登陆
				this.wechat();
				//微博登陆
				this.wb();
				//切换登陆
				this.changeLogin();
				//回车
				getEnter();
				
				this.checkImageCode();
				
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
						loadData(function(flag){
							if(flag){
								$('#submitBtn').text("登录");
								$('#title').text("客户登录");
								$('#submitBtn').attr('data-id','login'); // 标记login
							}else{
								$('#submitBtn').text("注册");
								$('#title').text("客户注册");
								$("#submitBtn").attr('data-id','register'); // 标记register
							}
						}, getContextPath() + '/login/validation/phone', $.toJSON({
							telephone : telephone
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
							user_login.checkVerification();
                            }
				}
			});
			},
			//点击获取手机验证码
			verificationCode:function(){
				// 点击获取手机验证码发送按钮
				$('#verification_code_recover_btn').off('click').on('click',function(){
					curCount = count;
					
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
			
			
			regesterOrLogin:function(){
				var _this = this;
				$("#submitBtn").off("click").on("click",function(){
					var loginType = $("#login_type").val();
					if(loginType=='phone'){//手机号登录
						var action = $("#submitBtn").attr("data-id");//login or register
						var phone_code = $('#user_phoneNumber').val();				
						var veri_code = $('#verification_code').val();
						var kap_code = $('#kaptcha_code').val();
						$("#code_error_info").addClass("hide");
						$("#user_phoneNumberId").addClass("hide");
						$("#kapt_error_info").addClass("hide");
						if(phone_code == null || phone_code == '' || phone_code == undefined){
							$("#user_phoneNumberId").text("请输入手机号").removeClass("hide");
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
						
						user_login.init();
						
						if(!checkMobile($('#user_phoneNumber').val().trim())){
							$('#user_phoneNumberId').removeClass('hide');
							$('#user_phoneNumberId').text('手机号不正确');
							$('#user_phoneNumber').focus();
							return false;
						}
						if(action=='login'){
							_this.login();
						}
						if(action=='register'){
							_this.register();
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
							if(msg.key){ 
								$(".errorDiv").addClass("hide");
								window.location.href=getContextPath()+ '/mgr/index';
							}else{
								$("#pwd_error").addClass('hide');
								$('#loginName_error').addClass('hide');
								$("#login_error_info_user").text(msg.value).removeClass("hide");
								return false;
							}
						}, getContextPath() + '/login/doLogin', $.toJSON({
							loginType : loginType,
							loginName : $('#loginName').val().trim(),
							password : Encrypt($('#pwd').val().trim())
						}))
					}
					
				})
			},
			login:function(){
				loadData(function(info){
					if(info.key){
						$(".errorDiv").addClass("hide");
						window.location.href=getContextPath()+ '/mgr/index';
					}else{
						$("#code_error_info").text(info.value).removeClass("hide");
						return false;
					}
				}, getContextPath() + '/login/doLogin', $.toJSON({
					loginType : $("#login_type").val(),
					telephone : $('#user_phoneNumber').val().trim(),
					password : Encrypt("123456"),
					verification_code : $('#verification_code').val().trim(),
				}))
			},
			register:function(){
				loadData(function(info){
					if(info.key){
						$(".errorDiv").addClass("hide");
						window.location.href=getContextPath()+'/mgr/index';
					}else{
						$("#code_error_info").text(info.value).removeClass("hide");
						return false;
					}
				},  getContextPath() + '/login/register', $.toJSON({
					telephone : $('#user_phoneNumber').val().trim(),
					password : Encrypt("123456"),
					verification_code : $('#verification_code').val().trim(),
					flag : 3
				}));
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
//			/	 open model
				$('#webcat').on('click',function(){
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
			changeLogin:function(){
				$('#changeLoginId').on('click',function(){
					
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
						$('#threeId').removeClass('hide');
					
					}else{
						$('#threeId').addClass('hide');
						$('input').val('');
						$('#loginWord').text('使用手机号登录');//用户名登录
						$('#showLogin').addClass('hide');
						$('#nameLogin').removeClass('hide');
						$('#changeId').removeClass('changeImg');
						$('#changeId').addClass('changeImgPhone');
						$('#outSideId').removeClass('phoneHeight');
						$('#outSideId').addClass('userheight');
						$('#login_type').val("loginName");
					}
				});
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
	
});
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


//回车
function getEnter(){
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			$('#submitBtn').click();
		}
	});
}
	
//function local(){
//	if(window.localStorage){
//		
//		 //localStorage.setItem("b","isaac");//设置b为"isaac"
//		localStorage.removeItem("b");
//		 alert(localStorage.getItem("b"));
//		}else{
//		 alert('This browser does NOT support localStorage');
//		}
//}
