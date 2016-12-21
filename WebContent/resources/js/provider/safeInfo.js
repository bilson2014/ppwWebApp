var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 
var IntervalObj; // timer变量，控制时间
var sendCodeFlag = true;
$().ready(function() {

	showCommonError($('#error'),"错误");
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
					$(".old-phone").removeClass("hide")
					
				});
				$('#pwdReturn').on('click',function(){
					noraml.show();
					userPassWord.hide();
				});
			},
			loginNameValidate:function(){
				$("#loginName").off("change").on("change",function(){
					loadData(function(flag){
						if(!flag){
							alert('用户名已经重复');
							$("#loginName").focus();
						}else{
							//TODO
							//错误隐藏
						}
					}, getContextPath() + '/provider/checkExisting', $.toJSON({
						loginName : $("#loginName").val().trim()
					}));
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
						}else{
							alert("错误")
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
						alert("请填写验证码")
						return false;
					}
					loadData(function(result){
						if(result){
							$(".old-phone").addClass("hide");
							$(".new-phone").removeClass("hide")
							
						}else{
							alert("验证码错误")
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
					if(!checkMobile(concat_tele_new)){
						alert("请输入正确的手机号码");
						$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon")
						return false;
					}
					loadData(function(flag){
						if(!flag){
							// 注册过
							alert('您输入的手机号码已被注册');
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
								alert(data.result)
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
	var LoginName = $("#loginName").val().trim();
	var pwd = $("#newpwd").val().trim();
	var repwd = $("#repwd").val().trim();
	var telPhone = $("#phoneNumber").val();
	var veritifyCode = $("#veritifyCode").val();
	var newTelPhone = $("#new-phoneNumber").val();
	var newcode = $("#new-code").val();
	
	switch (type) {
	case 1:
		if(null==pwd || ''==pwd || undefined==pwd){
			alert("密码不能为空")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			alert("密码长度6~16位")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		return true
		break;

	case 2:
		if(repwd != pwd){
			alert("两次密码不一致")
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		return true
		break;
	case 3:
		if(null==LoginName || ''==LoginName || undefined==LoginName){
			alert("登录名不能为空")
			$("#loginName").focus();
			return false;
		}
		if(null==pwd || ''==pwd || undefined==pwd){
			alert("密码不能为空")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			alert("密码长度6~16位")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(repwd != pwd){
			alert("两次密码不一致")
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		return true
	case 4:
		if(null==LoginName || ''==LoginName || undefined==LoginName){
			alert("登录名不能为空")
			$("#loginName").focus();
			return false;
		}
		if(null==pwd || ''==pwd || undefined==pwd){
			alert("密码不能为空")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(pwd.length<6 || pwd.length>16){
			alert("密码长度6~16位")
			$("#newpwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(repwd != pwd){
			alert("两次密码不一致")
			$("#repwd").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		if(null==veritifyCode || ''==veritifyCode || undefined==veritifyCode){
			alert("请输入验证码")
			$("#veritifyCode").focus();
			return false;
		}
		return true
	case 5:
		if(null==newTelPhone || ''==newTelPhone || undefined==newTelPhone){
			alert("手机号不能为空")
			$("#new-phoneNumber").focus();
			$("#new-phoneNumber").parent().removeClass("sureIcon").addClass("errorIcon");
			return false;
		}
		
		if(null==newcode || ''==newcode || undefined==newcode){
			alert("请输入验证码")
			return false;
		}
		return true
	default:
		break;
	}
}





