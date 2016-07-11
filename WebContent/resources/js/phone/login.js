var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数  


var isShowKaptcha = false;

$().ready(function(){
	
	
});

	

/**
 * 验证11位有效数字
 * 登录操作
 */
function validationLogin(){

	if($(this).val().length == 11){
		var phoneNo = $(this).val().trim();
		// 禁用 登录按钮
		$('#loginBt').attr('disabled','disabled');
		$('#loginBt').text('加载中...');
		// 验证是否被注册
		loadData(function(flag){
			if(flag){
				// 被注册,则登录
				$('#verification_code_btn').unbind('click'); // 解绑验证码发送按钮
				$('#uPassw0rd_wrap').removeClass('hide'); // 显示密码
				$('#verification_code_wrap').addClass('hide'); // 隐藏验证码
				$('.footer').addClass('hide'); // 隐藏 footer
				$("#loginBt").attr('data-id','login'); // 标记login
				$("#loginBt").text('登录');
				$('#loginBt').removeAttr('disabled'); // 重置 按钮
			}else{
				// 未被注册
				$('#verification_code_btn').on('click',verification); // 绑定验证码发送按钮
				$('#uPassw0rd_wrap').removeClass('hide'); // 显示密码
				$('#kaptcha_code_wrap').removeClass('hide'); // 显示图片验证码
				$('#verification_code_wrap').removeClass('hide'); // 显示短信验证码
				$('.footer').addClass('hide'); // 隐藏 footer
				$("#loginBt").attr('data-id','register'); // 标记 register
				$("#loginBt").text('注册');
				$('#loginBt').removeAttr('disabled'); // 重置 按钮
				$('#kaptcha_code').val(''); // 重置 图片验证码 信息
				// 初始化 验证码
				$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
				// 绑定  图片点击 事件
				$('#kaptcha_pic').unbind('click');
				$('#kaptcha_pic').bind('click',function(){
					$('#kaptcha_pic').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
				});
			}
		}, getContextPath() + '/login/validation/phone', $.toJSON({
			telephone : phoneNo
		}));
		
		// 登录注册按钮点击事件
		$("#loginBt").unbind('click');
		$("#loginBt").bind('click',function(){
			$('#loginBt').attr('disabled','disabled');
			$('#label-info').addClass('hide');
			$('#label-info').text('');
			lrfunction(phoneNo);
		});
	}else{
		// 恢复状态
		clearState();
	}
}

/**
 * 验证数据完整性 与 正确性
 * @param flag 0:登录 1:注册
 */
function checkData(flag){
	var userName = $('#userName').val();
	var password = $('#uPassw0rd').val();
	var verification_code = $('#verification_code').val();
	
	if(userName == '' || userName == null || userName == undefined){
		$('#label-info').removeClass('hide');
		$('#label-info').text('请输入手机号码');
		return false;
	}
	
	if(password == '' || password == null || password == undefined){
		$('#label-info').removeClass('hide');
		$('#label-info').text('请输入密码');
		return false;
	}
	
	if(password.length < 6){
		$('#label-info').removeClass('hide');
		$('#label-info').text('请输入6位以上密码!');
		return false;
	}
	
	if(flag == 0){
		// 登录
		
	}else if (flag == 1){
		// 注册
		// 检查验证码是否输入
		if(verification_code == '' || verification_code == null || verification_code == undefined){
			$('#label-info').removeClass('hide');
			$('#label-info').text('请输入 验证码');
			return false;
		}
	}
	return true;
}

function clearState(){
	$('#uPassw0rd_wrap').addClass('hide'); // 隐藏密码
	$('#verification_code_wrap').addClass('hide'); // 隐藏验证码
	$('#label-info').addClass('hide');
	$('#uPassw0rd').val(''); // 清除密码
	$('#verification_code').val(''); // 清除验证码
	$('.footer').removeClass('hide');
	$("#loginBt").text('登录/注册');
	$('#label-info').text(''); // 清除标签信息
	$('#loginBt').removeAttr('disabled'); // 重置
	$("#loginBt").unbind('click');
	curCount = 0 ;
	$('#verification_code_btn').text('点击获取'); // 重置短信验证码按钮
	$('#verification_code_btn').removeAttr('disabled','disabled');
	$('#kaptcha_code_wrap').addClass('hide'); // 重置图片验证码
	$('#kaptcha_code').val('');
	$('#kaptcha_pic').unbind('click'); // 图片验证码 解绑
}

// 登录/注册 按钮 判断
function lrfunction(phoneNo){
	var type = $('#loginBt').data('id');
	if(type != '' && type != null && type != undefined){
		if(type == 'register'){
			// 注册
			if(checkMobile(phoneNo)){
				// 手机号码
				$('#loginBt').text('注册中...');
				$('#loginBt').attr('disabled','disabled');
				if(checkData(1)){
					// 如果完整，则点击注册
					// 执行注册方法
					loadData(function(info){
						if(info.key){
							// 注册成功
							// 跳转
							$('#form-login').attr('action',getContextPath() + '/');
							$('#form-login').submit().remove();
						}else{
							// 注册失败，请用户重新注册
//							$('#label-info').removeClass('hide');
//							$('#label-info').text(info.value);
							$('#login_error_info').removeClass('hide');
							$('#login_error_info').text(info.value);
							$('#loginBt').removeAttr('disabled'); // 重置
							$('#loginBt').text('注册');
						}
					}, getContextPath() + '/login/register', $.toJSON({
						telephone : phoneNo,
						verification_code : $('#verification_code').val().trim(),
						password : Encrypt($('#uPassw0rd').val().trim())
					}));
					
				}
			}else{
				// 非手机号码
				$('#label-info').removeClass('hide');
				$('#label-info').text('请输入正确的手机号码!');
			}
			// 如果不完整，提示用户输入验证码
			$('#loginBt').text('注册');
			$('#loginBt').removeAttr('disabled'); // 重置
		}else if(type == 'login'){
			// 登录
			// 查看数据完整性
			if(checkData(0)){
				// 如果完整，检查 是否手机号
				if(checkMobile(phoneNo)){
					$('#loginBt').text('登录中...');
					$('#loginBt').attr('disabled','disabled');
					// 是手机号，执行登录方法
					loadData(function(flag){
						$('#loginBt').text('登录');
						if(flag){
							// 跳转
							$('#form-login').attr('action',getContextPath() + '/mgr/index');
							$('#form-login').submit().remove();
						}else {
							// 提示 用户名或密码不正确
							$('#label-info').removeClass('hide');
							$('#label-info').text('用户名或密码不正确!');
							$('#loginBt').removeAttr('disabled'); // 重置
							
						}
					}, getContextPath() + '/login/doLogin', $.toJSON({
						userName : phoneNo,
						password : Encrypt($('#uPassw0rd').val().trim())
					}));
				}else{
					// 不是手机号，不做任何处理
					$('#label-info').removeClass('hide');
					$('#label-info').text('请输入正确的手机号码!');
				}
			}
			// 如果不完整，那么提示用户数据不完整
			$('#loginBt').text('登录');
			$('#loginBt').removeAttr('disabled'); // 重置
		}
	}
}

/**
 * 验证码按钮点击事件
 */
function verification(){
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
				alert(info.value);
			}else{
				// 验证通过
				// 发送验证码
				loadData(function(flag){
					if(flag){
						// 发送成功
						// 设置 button 效果为禁用
						$('#verification_code_btn').text('已发送('+ curCount +')');
						$('#verification_code_btn').attr('disabled','disabled');
						InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
						// 倒计时
					}else{
						// 发送不成功
						// 显示重新发送
						$('#verification_code_btn').text('重新获取');
						$('#verification_code_btn').removeAttr('disabled');
					}
				}, getContextPath() + '/login/verification/' + $('#userName').val().trim(), null);
			}
		}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
	}else{ // 图片验证码为空
		$('#kaptcha_code').val('');// 重置图片验证码
		// 初始化 验证码
		$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
		$('#kaptcha_code').focus();
		alert('图片验证码为空!');
	}
}

// timer 处理函数
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		$('#verification_code_btn').text('重新获取');
		$('#verification_code_btn').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/login/clear/code');
		
	}else{
		curCount--;  
		$("#verification_code_btn").text('已发送('+ curCount +')');
	}
}

/**
 * 检测服务
 * 忘记密码
 */
function validationRecover(){
	if($(this).val().length == 11){
		var phoneNo = $(this).val().trim();
		// 禁用 重置密码 按钮
		$('#loginBt').attr('disabled','disabled');
		$('#loginBt').text('加载中...');
		// 验证是否被注册
		loadData(function(flag){
			if(flag){
				// 被注册,则 可以找回密码
				$('#verification_code_wrap').removeClass('hide'); // 显示 短信验证码
				$('#verification_code_btn').bind('click',verification); // 解绑验证码发送按钮
				$('#kaptcha_code_wrap').removeClass('hide'); // 隐藏 图片验证码
				$('#uPassw0rd_wrap').removeClass('hide');
				$('#loginBt').removeAttr('disabled'); // 重置 按钮
				$('#loginBt').text('重置密码');
				// 初始化 验证码
				$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
				// 绑定  图片点击 事件
				$('#kaptcha_pic').unbind('click');
				$('#kaptcha_pic').bind('click',function(){
					$('#kaptcha_pic').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
				});
			}else{
				// 未被注册，则提示不能找回密码
				$('#verification_code_btn').unbind('click'); // 解绑验证码发送按钮
				$('#kaptcha_code_wrap').addClass('hide'); // 隐藏 图片验证码
				$('#message-wrap').removeClass('hide');
				$('#message-info').text('该帐号不存在');
				$('#loginBt').attr('disabled','dis'); // 重置 按钮
				$('#loginBt').text('重置密码');
			}
		}, getContextPath() + '/login/validation/phone', $.toJSON({
			telephone : phoneNo
		}));
		
		// 重置密码 按钮点击事件
		$("#loginBt").unbind('click');
		$("#loginBt").bind('click',function(){
			$('#loginBt').attr('disabled','disabled');
			$('#label-info').addClass('hide');
			$('#label-info').text('');
			recoverFunction(phoneNo); // 重置密码 事件
		});
	}else{
		// 恢复状态
		$('#uPassw0rd_wrap').addClass('hide'); // 隐藏密码
		$('#verification_code_wrap').addClass('hide'); // 隐藏验证码
		$('#label-info').addClass('hide');
		$('#uPassw0rd').val(''); // 清除密码
		$('#verification_code').val(''); // 清除验证码
		$('.footer').addClass('hide');
		$("#loginBt").text('重置密码');
		$('#label-info').text(''); // 清除标签信息
		$('#loginBt').removeAttr('disabled'); // 重置
		$("#loginBt").unbind('click');
		curCount = 0 ;
		$('#verification_code_btn').text('点击获取'); // 重置短信验证码按钮
		$('#verification_code_btn').removeAttr('disabled','disabled');
		$('#kaptcha_code_wrap').addClass('hide'); // 重置图片验证码
		$('#kaptcha_code').val('');
		$('#kaptcha_pic').unbind('click'); // 图片验证码 解绑
		$('#message-wrap').addClass('hide');
		$('#message-info').text('');
	}
}

/**
 * 重置密码事件
 * 重置密码
 */
function recoverFunction(phoneNo){
	if(checkMobile(phoneNo)){
		// 手机号码
		$('#loginBt').text('请稍候...');
		$('#loginBt').attr('disabled','disabled');
		if(checkData(1)){
			// 执行 密码重置 方法
			loadData(function(info){
				if(info.key){
					// 密码重置成功
					// 跳转
					$('#form-login').attr('action',getContextPath() + '/');
					$('#form-login').submit().remove();
				}else{
					// 密码重置失败，请用户重新进行重置
					$('#label-info').removeClass('hide');
					$('#label-info').text(info.value);
					$('#loginBt').removeAttr('disabled'); // 重置
					$('#loginBt').text('重置密码');
				}
			}, getContextPath() + '/login/doRecover', $.toJSON({
				userName : phoneNo,
				verification_code : $('#verification_code').val().trim(),
				password : Encrypt($('#uPassw0rd').val().trim())
			}));
			
		}else{
			$('#loginBt').removeAttr('disabled'); // 重置
			$('#loginBt').text('重置密码');
		}
	}else{
		// 非手机号码
		$('#label-info').removeClass('hide');
		$('#label-info').text('请输入正确的手机号码!');
		$('#loginBt').removeAttr('disabled');
		$('#loginBt').text('重置密码');
	}
}

// 获取微博用户信息
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

/**
 * 三方登陆后跳转函数
 * @param userName 昵称
 * @param imgUrl 头像url
 * @param code 用户唯一标识
 * @param type 登录类型
 */
function OAuthor(condition){
	var url = getContextPath() + '/login/OAuthor';
	
	var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
	
	$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
}