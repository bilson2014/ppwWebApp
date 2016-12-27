var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 
var IntervalObj; // timer变量，控制时间
var sendCodeFlag = true;
$().ready(function() {
	
	
	bandInfo();
	
	var safeInfo = {
			init:function(){
				//****登录密码设置******
				//页面点击初始化
				this.initPage();
				//设置登录名      登录名失去焦点
				this.loginNameValidate();
				//设置登录名      密码失去焦点
				this.pwdValidate();
				//设置登录名      点击获取手机验证码
				this.sendCodeForPwd();
				//登录密码	确定事件 
				this.submitPWD();
				
				//****手机绑定设置******
				//手机绑定  发送验证码到原手机号
				this.sendcodeForOldPhone();
				//原手机验证码验证事件
				this.oldPhoneCodeValidate();
				//手机绑定  发送验证码到新手机号
				this.sendcodeForNewPhone();
				//新手机保存事件
				this.bindNewPhone();
			},
			initPage:function(){
				var noraml = $('#normal');
				var userName = $('#userName');
				var userPassWord = $('#userPassWord');
				var userBind = $('#userBind');
				$('#toUserName').on('click',function(){
					noraml.hide();
					userPassWord.show();
				});
				$('#nameReturn').on('click',function(){
					noraml.show();
					userName.hide();
				});
				$('#toUserPassWord').on('click',function(){
					noraml.hide();
					userName.show();
					$(".new-phone").addClass("hide");
					$(".old-phone").removeClass("hide");
				});
				$('#pwdReturn').on('click',function(){
					noraml.show();
					userPassWord.hide();
				});
				$('#userBind-btn').on('click',function(){
					noraml.hide();
					userBind.show();
				});

				
			},
			loginNameValidate:function(){
				$("#loginName").off("change").on("change",function(){
					if($("#loginName").val().trim()!=''){
						loadData(function(flag){
							if(!flag){
								showCommonError($('#loginName-error'),"用户名已经重复");
								$("#loginName").focus();
							}else{
								showCommonError($('#loginName-error'),"");
							}
						}, getContextPath() + '/provider/checkExisting', $.toJSON({
							loginName : $("#loginName").val().trim()
						}));
					}
				});
			},
			pwdValidate:function(){
				$("#newpwd").off("change").on("change",function(){
					var pwd = $("#newpwd").val().trim();
					if(checkData(1)){
						$("#newpwd").parent().removeClass("errorIcon").addClass("sureIcon");
					}
				});
				$("#repwd").off("change").on("change",function(){
					if(checkData(2)){
						$("#repwd").parent().removeClass("errorIcon").addClass("sureIcon");
					}
				});
			},
			sendCodeForPwd:function(){
				var telPhone = $("#phoneNumber").val();
				$("#code-forpwd").off("click").on("click",function(){
					if(checkData(3)){
						verification(telPhone,"code-forpwd");
					}
				})
			},
			submitPWD:function(){
				var _this = this;
				$(".pwdadd").off("click").on("click",function(){
					var url = '/provider/add/account';
					_this.submit(url);
				})
				$(".pwdupdate").off("click").on("click",function(){
					var url = '/provider/recover/password';
					_this.submit(url);
				})
			},
			submit:function(url){
				if(checkData(4)){ // 检测数据完整性
					loadData(function(data){
						if(data.code==1){
							window.location.reload();
						}else if(data.code==2){
							showCommonError($('#loginName-error'),data.result);
						}else{
							showCommonError($('#veritifyCode-error'),data.result);
						}
					}, getContextPath() + url, $.toJSON({
						loginName : $("#loginName").val().trim(),
						password : Encrypt($('#newpwd').val().trim()),
						verification_code:$("#veritifyCode").val().trim()
					}));
				}
			},
			sendcodeForOldPhone:function(){
				$("#code-foroldphone").off("click").on("click",function(){
					var telPhone = $("#phoneNumber").val();
					verification(telPhone,"code-foroldphone");
				})
			},
			oldPhoneCodeValidate:function(){
				var _this = this;
				$("#validate-oldPhonecode").off("click").on("click",function(){
					var oldCode = $("#old-code").val().trim();
					if(oldCode == null || oldCode == '' || oldCode == undefined){
						showCommonError($('#old-code-error'),'请填写验证码');
						return false;
					}
					loadData(function(result){
						if(result){
							$(".old-phone").addClass("hide");
							$(".new-phone").removeClass("hide")
							
						}else{
							showCommonError($('#old-code-error'),'验证码错误');
						}
					}, getContextPath() + '/phone/validate', $.toJSON({
						telephone : $("#phoneNumber").val().trim(),
						verification_code : oldCode
					}));
				})
			},
			sendcodeForNewPhone:function(){
				$("#code-fornewphone").off("click").on("click",function(){
					var concat_tele_new = $("#new-phoneNumber").val().trim();
					if(!checkData(6)){
						return false;
					}
					loadData(function(flag){
						if(!flag){
							// 注册过
							showCommonError($('#new-phoneNumber-error'),'您输入的手机号码已被注册');
							$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon")
						}else{ // 未注册
							$("#new-phoneNumber").parent().removeClass("errorIcon").addClass("sureIcon")
							//发送手机验证码
							verification(concat_tele_new,"code-fornewphone");
						}
					}, getContextPath() + '/provider/checkExisting', $.toJSON({
						phoneNumber : concat_tele_new
					}));
				});
			},
			bindNewPhone:function(){
				$("#bindNewPhone").off("click").on("click",function(){
					if(checkData(5)){
						loadData(function(data){
							if(data.code == 1){
								window.location.reload();
							}else {
								showCommonError($('#new-code-error'),data.result);
							}
						}, getContextPath() + '/provider/modify/phone', $.toJSON({
							phoneNumber : $("#new-phoneNumber").val().trim(),
							verification_code : $('#new-code').val().trim()
						}));
					}
				})
			}
	}
	safeInfo.init();
});


function verification(phone,ID){
	curCount = count;
	// 发送验证码
	if(sendCodeFlag){//防止多次点击
		sendCodeFlag = false;
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
			sendCodeFlag = true;
		}, getContextPath() + '/login/verification/' + phone, null);
	}
}
//公共验证
function checkData(type){
	resumeCommonError($(".setItem"),'');
	$(".setItem").remove("errorIcon").remove("sureIcon");
	var LoginName = $("#loginName").val();
	var pwd = $("#newpwd").val().trim();
	var repwd = $("#repwd").val().trim();
	var telPhone = $("#phoneNumber").val();
	var veritifyCode = $("#veritifyCode").val();
	var newTelPhone = $("#new-phoneNumber").val();
	var newcode = $("#new-code").val();
	switch (type) {
	case 1:
		if(null==pwd || ''==pwd || undefined==pwd){
			showCommonError($('#newpwd-error'),"密码不能为空");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			showCommonError($('#newpwd-error'),"密码长度6~16位");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		resumeCommonError($(".setItem"),'');
		return true
		break;

	case 2:
		if(repwd != pwd){
			showCommonError($('#repwd-error'),"两次密码不一致");
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		resumeCommonError($(".setItem"),'');
		return true
		break;
	case 3:
		if(null==LoginName || ''==LoginName || undefined==LoginName){
			showCommonError($('#loginName-error'),"登录名不能为空");
			$("#loginName").focus();
			return false;
		}
		if(null==pwd || ''==pwd || undefined==pwd){
			showCommonError($('#newpwd-error'),"密码不能为空");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			showCommonError($('#newpwd-error'),"密码长度6~16位");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(repwd != pwd){
			showCommonError($('#repwd-error'),"两次密码不一致");
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		resumeCommonError($(".setItem"),'');
		return true
	case 4:
		if(null==LoginName || ''==LoginName || undefined==LoginName){
			showCommonError($('#loginName-error'),"登录名不能为空");
			$("#loginName").focus();
			return false;
		}
		if(null==pwd || ''==pwd || undefined==pwd){
			showCommonError($('#newpwd-error'),"密码不能为空");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			showCommonError($('#newpwd-error'),"密码长度6~16位");
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(repwd != pwd){
			showCommonError($('#repwd-error'),"两次密码不一致");
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(null==veritifyCode || ''==veritifyCode || undefined==veritifyCode){
			showCommonError($('#veritifyCode-error'),"请输入验证码");
			$("#veritifyCode").focus();
			return false;
		}
		resumeCommonError($(".setItem"),'');
		return true
	case 5:
		if(null==newTelPhone || ''==newTelPhone || undefined==newTelPhone){
			showCommonError($('#new-phoneNumber-error'),"手机号不能为空");
			$("#new-phoneNumber").focus();
			$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(!checkMobile(newTelPhone)){
			showCommonError($('#new-phoneNumber-error'),"请输入正确的手机号码");
			$("#new-phoneNumber").focus();
			$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}else{
			$("#new-phoneNumber").parent().removeClass("errorIcon").addClass("sureIcon")
		}
		if(null==newcode || ''==newcode || undefined==newcode){
			showCommonError($('#new-code-error'),"请输入验证码");
			return false;
		}
		return true
	case 6:
		if(!checkMobile(newTelPhone)){
			showCommonError($('#new-phoneNumber-error'),'请输入正确的手机号码');
			$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon")
			return false;
		}
		return true
	default:
		break;
	}
}



//绑定
var userinfo_third = {
		init:function(){
			//qq登陆
			this.qq();
			//微信登陆
			this.wechat();
			//微博登陆
			this.wb();
		},
		qq :function(){
			$('#qqBtn').on('click',function(){
				if($("#qqBtn").attr("data-status")==0){//去绑定
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
							//个人中心绑定
							userInfoToBind(condition);
						});
					})
					.error(function(e){
						// 回掉失败
						alert('获取用户信息失败');
					})
					.complete(function(c){
						// 完成请求回掉
					})
				}else{//取消绑定
					loadData(function(flag){
						if(flag){ // 发送成功
							//提示成功
							successToolTipShow();
							$('#qq').removeAttr("class").addClass("noBand");
							check();
						}
					}, getContextPath() + '/user/unbind/third',  $.toJSON({
						lType:"qq"
					}));
				}
			});
		},
		wechat:function(){
//		/	 open model
			$('#wechatBtn').on('click',function(){
				if($("#wechatBtn").attr("data-status")==0){//去绑定
					var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx3d453a7abb5fc026&redirect_uri=http%3A%2F%2Fwww.apaipian.com%2Flogin%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login';
					window.open (url,'_self','height=560,width=400,top=60,left=450,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
				}else{
					loadData(function(flag){
						if(flag){ // 发送成功
							//提示成功
							$('.tooltip-showBand').slideDown('normal');
							$('#wechat').removeAttr("class").addClass("noBand");
							check();
						}
					}, getContextPath() + '/user/unbind/third',  $.toJSON({
						lType:"wechat"
					}));
				}
			})
		},
		wb:function(){
			$('#wbBtn').on('click',function(){
				if($("#wbBtn").attr("data-status")==0){//去绑定
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
							userInfoToBind(condition);
						});
					});
				}else{
					loadData(function(flag){
						if(flag){ // 发送成功
							//提示成功
							$('.tooltip-showBand').slideDown('normal');
							$('#wb').removeAttr("class").addClass("noBand");
							check();
						}
					}, getContextPath() + '/user/unbind/third',  $.toJSON({
						lType:"wb"
					}));
				}
				
			});
		},
}

function userInfoToBind(condition){
	loadData(function(data){
		if(data.code==1){
			bandInfo();
			$('.tooltip-message').text('绑定成功!');
			successToolTipShow();
		}
	}, getContextPath() + '/user/bind/third',condition);
}

function bandInfo(){

	loadData(function(data){
		if(data.qq==1){
			$("#qq").addClass("activeBind");
			$("#qq").find('state').text('绑定');
			$("#qqSet").addClass("activeBind");
			$("#qqSet").find('state').text('绑定');
			$('#qqBtn').addClass('isNotBind');
			$('#qqBtn').text('取消绑定');
			$("#qqBtn").attr("data-status","0");

		}else{
			$("#qqSet").removeClass("activeBind");
			$("#qqSet").find('state').text('未绑定');
			$("#qqSet").removeClass("activeBind");
			$("#qqSet").find('state').text('未绑定');
			$('#qqBtn').addClass('isBind');
			$('#qqBtn').text('绑定');
			$("#qqBtn").attr("data-status","1");

		}
		if(data.wechat==1){
			$("#wechat").addClass("activeBind");
			$("#wechat").find('state').text('绑定');
			$("#wechat").addClass("activeBind");
			$("#wechat").find('state').text('绑定');
			$('#wechatBtn').addClass('isNotBind');
			$('#wechatBtn').text('取消绑定');
			$("#wechatBtn").attr("data-status","0");

		}else{
			$("#wechatSet").removeClass("activeBind");
			$("#wechatSet").find('state').text('未绑定');
			$("#wechatSet").removeClass("activeBind");
			$("#wechatSet").find('state').text('未绑定');
			$('#wechatBtn').addClass('isBind');
			$('#wechatBtn').text('绑定');
			$("#wechatBtn").attr("data-status","1");
		}
		if(data.wb==1){
			$("#wb").addClass("activeBind");
			$("#wb").find('state').text('绑定');
			$("#wbSet").addClass("activeBind");
			$("#wbSet").find('state').text('绑定');
			$('#wbBtn').addClass('isBind');
			$('#wbBtn').text('取消绑定');
			$("#wbBtn").attr("data-status","0");

		}else{
			$("#wb").removeClass("activeBind");
			$("#wb").find('state').text('未绑定');
			$("#wbSet").removeClass("activeBind");
			$("#wbSet").find('state').text('未绑定');
			$('#wbBtn').addClass('isNotBind');
			$('#wbBtn').text('绑定');
			$("#wbBtn").attr("data-status","1");
		
		}
		//初始化第三方
        $('#bindReturn').on('click',function(){
        	$('#normal').show();
            $('#userBind').hide();
        });
		userinfo_third.init();
		
	}, getContextPath() + '/user/third/status');
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
