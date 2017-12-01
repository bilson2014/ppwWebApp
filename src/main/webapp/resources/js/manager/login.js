$().ready(function(){
	
	var third_login = { 
			sina : function(){ // 新浪登陆
				$('#weiboBt').on('click',function(){
					WB2.login(function() {
							// 获取 用户信息
						getWBUserData(function(o){
							// 保存至session中，并跳转
							var condition = $.toJSON({
								employeeRealName : o.screen_name,
								employeeImg : o.profile_image_url,
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
								employeeRealName : s.data.nickname,
								employeeImg : s.data.figureurl,
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
	third_login.sina();
	third_login.webcat();
	third_login.qq();
	showForget.doshowForget();
	login.doLogin();
	getEnter();
	function otherLogin(condition){
		var url = getContextPath() + '/mgr/thirdLogin';
		var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
		$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
	}
});

var login = {
	doLogin : function(){
		$('#loginbtn').unbind('click');
		$('#loginbtn').bind('click',function(){
			// 登陆
			loadData(function(result){
				if(result.ret){
					// 跳转
					var go = result.message;
					if(go == 2){
						location.href  ='/project/running';
					}else if(go  == 1){
						location.href  ='/project/running?order';
					}else {
						location.href  ='/';
					}
					$('#pwdId').addClass('hide');
				}else {
					$('#pwdId').text(result.message);
					$('#pwdId').removeClass('hide');
				}
			}, getContextPath() + '/mgr/doLogin', $.toJSON({
				employeeLoginName : $('#loginName').val().trim(),
				employeePassword : Encrypt($('#pwd').val().trim())
			}));
		});
	}
}

var showForget = {

     doshowForget : function(){
     	$('#forget').on('click',function(){
            $('.login-div'). addClass('hide');
            $('.forget-div').removeClass('hide');
     	});
     }

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
function hideTooltipRecover(){
	$('.tooltip-show-recover').hide('normal');
}

//回车
function getEnter(){
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			$('#loginbtn').click();
		}
	});
}