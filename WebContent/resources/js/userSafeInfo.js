var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 
var IntervalObj; // timer变量，控制时间
var sendCodeFlag = true;

var passwordMode = '';
$().ready(function() {
	init();
});

var parent = $(window.parent.document);
function init(){
	// 初始化页面切换
	initPage();
	// 初始化动态验证
	verify();
	// 初始化验证码发送模块
	sendCode();
	// 初始化提交按钮
	initSubBtn();
	// 第三方绑定
	bandInfo();
}

function initPage(){
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
	$('#phoneReturn').on('click',function(){
		noraml.show();
		userName.hide();
	});
	
	var res = $('#loginDivName').text();
	if(res != null && res != ''){
		// 修改密码 模式
		$('#loginDivName').show();
		$('#loginName').hide();
		passwordMode = 'pass';
	}else{
		// 修改用户名和密码模式
		$('#loginDivName').hide();
		$('#loginName').show();
		passwordMode = 'passAlog';
	}
	
	$('#code-foroldphone').off('click').on('click',function(){
		var telPhone = $("#phoneNumber").val();
		verification(telPhone,"code-foroldphone");
	});
	
	$("#validate-oldPhonecode").off("click").on("click",function(){
		if(phoneVeritifyCode()){
			loadData(function(result){
				if(result){
					$(".old-phone").addClass("hide");
					$(".new-phone").removeClass("hide")
				}else{
					showCommonError($('#old-code-error'),'验证码错误');
				}
			}, getContextPath() + '/phone/validate', $.toJSON({
				telephone : $("#phoneNumber").val().trim(),
				verification_code :  $('#old-code').val()
			}));
		}
	});
	$("#code-fornewphone").off("click").on("click",function(){
		var concat_tele_new = $("#new-phoneNumber").val().trim();
		if(!checkData(3)){
			return false;
		}
		loadData(function(msg){
			if(msg.errorCode == 500){
				// 注册过
				showCommonError($('#new-phoneNumber-error'),'您输入的手机号码已被注册');
				$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon")
			}else{ // 未注册
				$("#new-phoneNumber").parent().removeClass("errorIcon").addClass("sureIcon")
				//发送手机验证码
				verification(concat_tele_new,"code-fornewphone");
			}
		}, getContextPath() + '/login/validation/phone', $.toJSON({
			telephone : concat_tele_new
		}));
	});
	
	$("#bindNewPhone").off("click").on("click",function(){
		if(checkData(3) && checkData(4)){
			parent.find('.tooltip-wati').show();
			$(this).attr('disabled','disabled');
			
			loadData(function(result){
                if(result){
                	loadData(function(result){
        				if(result.code == 3){
        					window.clearInterval(InterValObj); // 停止计时器
        					$("#codeBt").text("获取验证码").removeAttr("disabled");
        					successToolTipShow('电话修改成功!');
        				}else if(result.code == 1){
        					showCommonError($('#new-code-error'),"验证码错误");
        				}	
        				else if(result.code == 2){
        					showCommonError($('#new-phoneNumber-error'),"您输入的手机号码已被注册");
        				}
        			}, getContextPath() + '/user/modify/phone', $.toJSON({
        				id : $('#userId').val(),
        				telephone : $('#new-phoneNumber').val().trim(),
        				verification_code : $('#new-code').val().trim()
        			}));
                }else{
                	showCommonError($('#new-code-error'),"验证码错误");
                }
                $('#bindNewPhone').removeAttr('disabled');
				parent.find('.tooltip-wati').hide();
            }, getContextPath() + '/phone/validate', $.toJSON({
                telephone : $('#new-phoneNumber').val().trim(),
                verification_code : $('#new-code').val().trim()
            }));
			
			
		}
	});
	
}
function verify(){
	$("#newpwd").off("change").on("change",function(){
		var pwd = $("#newpwd").val().trim();
		if(checkData(11)){
			$("#newpwd").parent().removeClass("errorIcon").addClass("sureIcon");
		}
	});
	$("#repwd").off("change").on("change",function(){
		if(checkData(11) && checkData(12)){
			$("#repwd").parent().removeClass("errorIcon").addClass("sureIcon");
		}
	});
	$("#loginName").off("change").on("change",function(){
		syncLoadData(function(flag){
			if(flag){
				showCommonError($('#loginName-error'),"用户名已经重复过请更换用户名！");
				$('#loginName').focus();
				x = true;
			}else{
				showCommonError($('#loginName-error'),"");
			}
		}, getContextPath() + '/login/validation/userName', $.toJSON({
			loginName : $("#loginName").val()
		}));
	});
	
}

function sendCode(){
	var telPhone = $("#phoneNumber").val();
	$("#code-forpwd").off("click").on("click",function(){
		if(checkData(1)){
			verification(telPhone,"code-forpwd");
		}
	})
}

function initSubBtn(){
	$('.pwdupdate').off('click').on('click',function(){
		parent.find('.tooltip-wati').show();
		if(passwordMode == 'pass'){
			// 修改密码 模式
			if(checkData(2)){
				var confirmPassw0rd = $('#repwd').val().trim();
				var id = $('#userId').val();
				var verification_code = $("#veritifyCode").val().trim();
					loadData(function(data){
						parent.find('.tooltip-wati').hide();
						// 提示信息修改成功
						if(data.code==1){
							successToolTipShow('修改成功!');
						}else{
							successErrorTipShow(data.msg);
						}
						window.clearInterval(InterValObj);
						$("#code-forpwd").text("获取验证码").removeAttr("disabled");
					}, getContextPath() + '/user/modify/code/password', $.toJSON({
						id : id,
						password : Encrypt(confirmPassw0rd),
						verification_code:verification_code
					}));
			}else{
				parent.find('.tooltip-wati').hide();
			}
		}else{
			// 修改用户名和密码模式
			if(checkData(2)){
				var confirmPassw0rd = $('#repwd').val().trim();
				var loginName = $('#loginName').val().trim();
				var id = $('#userId').val();
				var verification_code = $("#veritifyCode").val().trim();
					loadData(function(flag){
						parent.find('.tooltip-wati').hide();
						if(flag.errorCode == 200){
							if(flag.result){
								window.clearInterval(InterValObj);
								successToolTipShow('修改成功!');
								$("#code-forpwd").text("获取验证码").removeAttr("disabled");
								$("#loginDivName").text(loginName);
								$("#loginName").val(loginName);
								$("#upd").removeClass("hide");
								$("#ins").addClass("hide");
								$(".warn").attr("class","").text("");//清除右上角提示标识
							}else{
								parent.find('.tooltip-wati').hide();
								showCommonError($('.tooltip-error-show'),"修改失败！");
							}
						}else if(flag.errorCode == 500){
							showCommonError($('.tooltip-error-show'),flag.errorMsg);
							parent.find('.tooltip-wati').hide();
						}else{
							showCommonError($('.tooltip-error-show'),"修改失败，请稍后重试！");
							parent.find('.tooltip-wati').hide();
						}
						//window.setInterval(hideTooltip, 2000);
					}, getContextPath() + '/login/modify/logName', $.toJSON({
						id : id,
						password : Encrypt(confirmPassw0rd),
						loginName : loginName,
						verification_code:verification_code
					}));
			}else{
				parent.find('.tooltip-wati').hide();
			}
		}
	})
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
			return baseVerify();
			break;
		case 2: 
			var res = baseVerify();
			if(res){
				if(null==veritifyCode || ''==veritifyCode || undefined==veritifyCode){
					showCommonError($('#veritifyCode-error'),"请输入验证码");
					$("#veritifyCode").focus();
					return false;
				}
				resumeCommonError($(".setItem"),'');
				return true;
			}else{
				return false;
			}
			break;
		case 3:
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
			return true
		case 4:
			if(null==newcode || ''==newcode || undefined==newcode){
				showCommonError($('#new-code-error'),"请输入验证码");
				return false;
			}
			return true
		// 双位的都是页面动态验证
		case 11:
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
		case 12:
			if(repwd != pwd){
				showCommonError($('#repwd-error'),"两次密码不一致");
				$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
				return false;
			}
			resumeCommonError($(".setItem"),'');
			return true
			break;
	}
}

function loginNameVeritifyCode(){
	var veritifyCode = $("#veritifyCode").val();
	if(null==veritifyCode || ''==veritifyCode || undefined==veritifyCode){
		showCommonError($('#veritifyCode-error'),"请输入验证码");
		$("#veritifyCode").focus();
		return false;
	}else{
		return true;
	}
}

function phoneVeritifyCode(){
	var veritifyCode = $("#old-code").val();
	if(null==veritifyCode || ''==veritifyCode || undefined==veritifyCode){
		showCommonError($('#old-code-error'),"请输入验证码");
		$("#old-code").focus();
		return false;
	}else{
		return true;
	}
}

function baseVerify(){
	var pwd = $("#newpwd").val().trim();
	var repwd = $("#repwd").val().trim();
	var telPhone = $("#phoneNumber").val();
	
	var res = verifyLoginName(); 
	
	if(!res)
		return false;
	
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
    return true;
}

function verifyLoginName(){
	if(passwordMode == 'pass')
		return true;

	var LoginName = $("#loginName").val();
	if(null==LoginName || ''==LoginName || undefined==LoginName){
		showCommonError($('#loginName-error'),"登录名不能为空");
		$("#loginName").focus();
		return false;
	}
	var x; 
	syncLoadData(function(flag){
		if(flag){
			showCommonError($('#loginName-error'),"用户名已经重复过请更换用户名！");
			$("#loginName").focus();
			x = false;
		}else{
			x = true;
			showCommonError($('#loginName-error'),"");
		}
	}, getContextPath() + '/login/validation/userName', $.toJSON({
		loginName : LoginName
	}));
	if(!x){
		return false;
	}else{
		return true;	
	}
}

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


function bandInfo(){
	$('.three-band').slideDown('normal');
	$("#qq").attr("class","qq");
	$("#wechat").attr("class","weChat");
	$("#wb").attr("class","wb");
	loadData(function(data){
		if(data.qq==1){
			$("#qq").addClass("activeBind");
			$("#qq").find('.state').text('绑定');
			$("#qqSet").addClass("activeBind");
			$("#qqSet").find('.state').text('已绑定');
			$('#qqBtn').addClass('isNotBind');
			$('#qqBtn').text('取消绑定');
			$("#qqBtn").attr("data-status","1");
		}else{
			$("#qq").removeClass("activeBind");
			$("#qq").find('.state').text('未绑定');
			$("#qqSet").removeClass("activeBind");
			$("#qqSet").find('.state').text('未绑定');
			$('#qqBtn').addClass('isBind');
			$('#qqBtn').removeClass('isNotBind');
			$('#qqBtn').text('绑定');
			$("#qqBtn").attr("data-status","0");
		}
		if(data.wechat==1){
			$("#wechat").addClass("activeBind");
			$("#wechat").find('.state').text('绑定');
			$("#wechatSet").addClass("activeBind");
			$("#wechatSet").find('.state').text('已绑定');
			$('#wechatBtn').addClass('isNotBind');
			$('#wechatBtn').text('取消绑定');
			$("#wechatBtn").attr("data-status","1");

		}else{
			$("#wechat").removeClass("activeBind");
			$("#wechat").find('.state').text('未绑定');
			$("#wechatSet").removeClass("activeBind");
			$("#wechatSet").find('.state').text('未绑定');
			$('#wechatBtn').addClass('isBind');
			$('#wechatBtn').text('绑定');
			$("#wechatBtn").attr("data-status","0");
			$('#wechatBtn').removeClass('isNotBind');
		}
		if(data.wb==1){
			$("#wb").addClass("activeBind");
			$("#wb").find('.state').text('绑定');
			$("#wbSet").addClass("activeBind");
			$("#wbSet").find('.state').text('已绑定');
			$('#wbBtn').addClass('isNotBind');
			$('#wbBtn').text('取消绑定');
			$("#wbBtn").attr("data-status","1");

		}else{
			$("#wb").removeClass("activeBind");
			$("#wb").find('.state').text('未绑定');
			$("#wbSet").removeClass("activeBind");
			$("#wbSet").find('.state').text('未绑定');
			$('#wbBtn').addClass('isBind');
			$('#wbBtn').text('绑定');
			$("#wbBtn").attr("data-status","0");
			$('#wbBtn').removeClass('isNotBind');
		
		}
		
		//初始化第三方
		userinfo_third.init();
        $('#bindReturn').on('click',function(){
        	$('#normal').show();
            $('#userBind').hide();
        });
		
	}, getContextPath() + '/user/third/status');
}

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
							$("#wechat").removeClass("activeBind");
							$("#wechat").find('.state').text('未绑定');
							$("#wechatSet").removeClass("activeBind");
							$("#wechatSet").find('.state').text('未绑定');
							$('#wechatBtn').addClass('isBind');
							$('#wechatBtn').text('绑定');
							$("#wechatBtn").attr("data-status","0");
							successToolTipShow();
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
							successToolTipShow();
							$('#wb').removeAttr("class").addClass("noBand");
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







function successToolTipShow(msg){
	window.clearInterval(successIntervalObj);
	parent.find('.tooltip-success-show').slideDown();
	parent.find("#tooltip-success-messageSSSS").val(msg);
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}
function hideSuccessTooltip(){
	parent.find('.tooltip-success-show').hide();
	location.reload();
}

function hideError(){
	parent.find('.tooltip-error-show').hide();
	//location.reload();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(msg){
	window.clearInterval(successIntervalObj);
	parent.find('.tooltip-error-show').slideDown();
	parent.find("#tooltip-success-messageEEEE").text(msg);
	successIntervalObj = window.setInterval(hideError, 3000);
}
function showInfomation(title,body){
	parent.find('#infomation').slideDown();
	parent.find('#infomation_title').text(title);
	parent.find('#infomation_body').text(body);
	parent.find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}
function hideInfomation(){
	parent.find('#infomation').hide();
}
