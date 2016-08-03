var InterValObj; // timer变量，控制时间 
var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 

var PopInterValObj,oTimer,successIntervalObj; // timer变量，控制时间

var wb_uniqueId;
var qq_uniqueId;

// 头像裁剪参数 
var jcrop_api;
var x;
var y;
var x2;
var y2;
var w;
var h;
//头像裁剪参数 

// 自定义图片上传 检验参数
var ImgObj=new Image(); //建立一个图像对象
var AllowExt=".jpg|.gif" //允许上传的文件类型 ŀ为无限制 每个扩展名后边要加一个"|" 小写字母表示
var AllowImgFileSize=70;  //允许上传图片文件的大小 0为无限制  单位：KB
var FileObj,ImgFileSize,FileExt,ErrMsg,FileMsg,HasCheked,IsImg//全局变量 图片相关属性
// 自定义图片上传 检验参数
$().ready(function(){
	// 加载头部
	$('#header-content').prop('src',getContextPath() + '/header');
	// 导航切换方法
	$('.nav-tabs').find('a').on('click',function(){
		var item = $(this).data('url');
		$('.nav-tabs').find('a').removeClass('active').css({color:'#000000'});
		$(this).addClass('active').css({color:'#ffffff'});
		$('.information').hide();
		switch(item){
			case 'self-info-content':
				selfInfo();
				break;
			case 'password-info-content':
				passwordInfo();
				break;
			case 'userpic-info-content':
				userpicInfo();
				break;
			case 'phone-info-content':
				phoneInfo();
				break;
				
			case 'three-band':
				bandInfo();
				break;
			default:
				break;
		}
	});
	
	$('.nav-tabs').find('a:first').click();
	
	// 初始化数据
	initData();
	
	// 隐藏 提示信息
	$('.tooltip-show').hide();
	$('.tooltip-showBand').hide();
	var userLoginName = $("#userLoginName").text();
	if(userLoginName != null && userLoginName != '' && userLoginName != undefined){
		$("#ins").addClass('hide');
		$("#upd").removeClass('hide');
	}else{
		$("#ins").removeClass('hide');
		$("#upd").addClass('hide');
	}
});
// 初始化数据
function initData(){
	// 性别 判断
	if($('#user_sex').val() == null || $('#user_sex').val() == ''){
		$('#user_sex').val(0);
	}
	$.each($('input[name="sex"]'),function(i,n){
		if($(this).val() == $('#user_sex').val()){
			$(this).attr('checked',true);
		}
	});
	// 判断 昵称不能为空
	$('#nickName').on('change',function(){
		if($('#nickName').val().length < 1){
			$('#label-nickName').removeClass('hide');
		}else{
			$('#label-nickName').addClass('hide');
		}
	});
	// 头像加载
	var userImgPath = $('#user_img').val();
	if(userImgPath != null && userImgPath != '' && userImgPath != undefined){ // 加载用户头像
		
		if(userImgPath.indexOf('http') > -1){
			// 第三方登录
			$('#user-circle-img').attr('src',userImgPath);
			$('#user-img').attr('src',userImgPath);
		}else{
			var imgName = getFileName(userImgPath);
			var imgPath = getHostName() + '/user/img/' + imgName;
			$('#user-circle-img').attr('src',imgPath);
			$('#user-img').attr('src',imgPath);
		}
	}else{
		// 加载 默认头像
		var defaultImgPath = getHostName() + '/user/img/default.png';
		$('#user-circle-img').attr('src',defaultImgPath);
		$('#user-img').attr('src',defaultImgPath);
	}
	
	$('#uploadBt').on('click',function(){
		$('#file').click();
	});
	
	$('#passw0rd').val('');
}

// 个人资料
function selfInfo(){
	$('.self-info-content').slideDown('normal');
	
	// 注册 个人资料-修改按钮点击事件
	$('#self-info-contentBt').unbind('click');
	$('#self-info-contentBt').bind('click',function(){
		if($('#nickName').val().trim() != ''){
			var ret = true;
			if($('#contact-email').val().trim() != ''){
				ret = checkEmail($('#contact-email').val().trim());
				if(!ret){
					$('#label-email').removeClass('hide');
				}else{
					$('#label-email').addClass('hide');
				}
			}
			
			if(ret){
				loadData(function(flag){
					// 提示信息修改成功
					$('.tooltip-show').slideDown('normal');
					if(flag){
						$("#user-name").text($("#nickName").val());
						$(".header-name").text($("#trueName").val());
						$('.tooltip-message').text('信息修改成功!');
					}else{
						$('.tooltip-message').text('信息修改失败，请刷新后再试!');
					}
					window.setInterval(hideTooltip, 2000);
				}, getContextPath() + '/user/modify/info', $.toJSON({
					id : $('#user_unique').val(),
					userName : $('#nickName').val().trim(),
					sex : $('input[name="sex"]:checked').val(),
					realName : $('#trueName').val().trim(),
					email : $('#contact-email').val().trim(),
					qq : $('#contact-qq').val().trim(),
					userCompany : $('#company').val().trim(),
					customerSource : $("#customerSource").val().trim()
				}))
			}
		}else{
			$('#label-nickName').removeClass('hide');
		}
	});
}

// 密码修改
function passwordInfo(){
	$('.password-info-content').slideDown('normal');
	window.clearInterval(InterValObj);
	$("#upd-codeBt").text("获取验证码").removeAttr("disabled");
	$("#upd-codeBt").off("click").on("click",function(){
		var telPhone = $("#user-telephone").text();
		if(checkData(5)){
			if(checkMobile(telPhone)){
				verification(telPhone);
			}
		}
	})
	$("#pwd-codeBt").off("click").on("click",function(){
		var telPhone = $("#user-telephone").text();
		if(checkData(6)){
			if(checkMobile(telPhone)){
				verification(telPhone);
			}
		}
	})
	// 注册 个人资料-修改按钮点击事件
	$('#password-info-contentBt').unbind('click');
	$('#password-info-contentBt').bind('click',function(){
		if(checkData(2)){
			var confirmPassw0rd = $('#insTwoPassword').val().trim();
			var loginName = $('#insuserName').val().trim();
			var id = $('#user_unique').val();
			var verification_code = $("#veritifyCode-pwd").val().trim();
				loadData(function(flag){
					$('.tooltip-show').slideDown('normal');
					if(flag.errorCode == 200){
						if(flag.result){
							window.clearInterval(InterValObj);
							$("#upd-codeBt").text("获取验证码").removeAttr("disabled");
							$('.tooltip-message').text('修改成功！');
							$("#userLoginName").text(loginName);
							$("#upd").removeClass("hide");
							$("#ins").addClass("hide");
							$(".warn").attr("class","").text("");//清除右上角提示标识
						}else{
							$('.tooltip-message').text('修改失败！');
						}
					}else if(flag.errorCode == 500){
						$('.tooltip-message').text(flag.errorMsg);
					}else{
						$('.tooltip-message').text('修改失败，请稍后重试！');
					}
					window.setInterval(hideTooltip, 2000);
				}, getContextPath() + '/login/modify/logName', $.toJSON({
					id : id,
					password : Encrypt(confirmPassw0rd),
					loginName : loginName,
					verification_code:verification_code
				}));
			}else{
				$('#label-confirm-passw0rd').removeClass('hide');
			}
	});
	
	$('#upd-btn').unbind('click');
	$('#upd-btn').bind('click',function(){
		if(checkData(4)){
			var password = $('#upd-towpassword').val().trim();
			var id = $('#user_unique').val();
			var verification_code = $("#upd-veritifyCode").val().trim();
				loadData(function(data){
					// 提示信息修改成功
					$('.tooltip-show').slideDown('normal');
					if(data.code==1){
						window.clearInterval(InterValObj);
						$("#upd-codeBt").text("获取验证码").removeAttr("disabled");
						$('.tooltip-message').text('信息修改成功!');
					}else{
						$('.tooltip-message').text(data.msg);
					}
					window.setInterval(hideTooltip, 2000);
				}, getContextPath() + '/user/modify/code/password', $.toJSON({
					id : id,
					password : Encrypt(password),
					verification_code:verification_code
				}));
			}else{
				$('#label-confirm-passw0rd').removeClass('hide');
			}
	});
}

// 头像修改
function userpicInfo(){
	$('.userpic-info-content').slideDown('normal');
	
	$('.alternative-img-wrap').find('img').on('click',function(){
		
		$('#user-img').attr('src',$(this).attr('src'));
		$('#user-circle-img').attr('src',$(this).attr('src'));
		
		loadData(function(result){
			if(result){
				// 提示成功
				$('.tooltip-show').slideDown('normal');
				window.setInterval(hideTooltip, 2000);
			}else{
				alert('头像更改失败,请重新上传!');
			}
		}, getContextPath() + '/user/directModify/photo', $.toJSON({
			id : $('#user_unique').val(),
			imgUrl : $(this).attr('src')
		}));
		
	});
	
	// 图片上传 点击事件
	$('input[type="file"]').change(function(){
		// 上传图片
		uploadImg();
	});
}
//更换手机

function phoneInfo(){
	$('.phone-info-content').slideDown('normal');
	window.clearInterval(InterValObj);
	$(".phone-bind").empty().append(userInfo_tpl.tpl_old_phone);
	// 激活 获取验证码 按钮
	getVeritifyCodeValidate();
	//点击验证
	$("#validate-phone-code").off("click").on("click",function(){
		var veritifyCode = $("#veritifyCode").val().trim();
		if(null!=veritifyCode&&veritifyCode!=''&&veritifyCode!=undefined){
			loadData(function(result){
				if(result){
					window.clearInterval(InterValObj);
					$(".phone-bind").empty().append(userInfo_tpl.tpl_new_phone);
					getVeritifyCodeValidate();
					// 注册 个人资料-修改按钮点击事件
					$('#phone-info-contentBt').unbind('click');
					$('#phone-info-contentBt').bind('click',function(){
						if(checkData(1)){
							$(this).attr('disabled','disabled');
							loadData(function(result){
								$('.tooltip-show').slideDown('normal');
								if(result){
									$("#concat_tele_old").text($('#concat_tele_new').val().trim());
									$("#user-telephone").text($('#concat_tele_new').val().trim());
									window.clearInterval(InterValObj); // 停止计时器
									$("#codeBt").text("获取验证码").removeAttr("disabled");
									$('.tooltip-message').text('电话修改成功!');
								}else{
									$('.tooltip-message').text('电话修改失败!');
								}
								$('#phone-info-contentBt').removeAttr('disabled');
								window.setInterval(hideTooltip, 2000);
							}, getContextPath() + '/user/modify/phone', $.toJSON({
								id : $('#user_unique').val(),
								telephone : $('#concat_tele_new').val().trim(),
								verification_code : $('#veritifyCode').val().trim()
							}));
						}
					});
				}else{
					$("#label-code-phone-error").removeClass("hide");
				}
			}, getContextPath() + '/phone/validate', $.toJSON({
				telephone : $('#concat_tele_old').text().trim(),
				verification_code : veritifyCode
			}));
		}else{
			$('#label-code-phone').removeClass('hide');
			return false;
		}
	})
}
/**
 * 验证手机号码是否已被注册
 */
function isPhoneNumExit(teleNum){
	if(teleNum != '' && teleNum != null && teleNum != undefined){
		loadData(function(flag){
			return flag;
		}, getContextPath() + '/login/validation/phone', $.toJSON({
			telephone : teleNum
		}));
	}
}

function getVeritifyCodeValidate(){
	$('#codeBt').unbind('click');
	$('#codeBt').bind('click',function(){
		var phoneNum = $('#concat_tele_old').text().trim();
		if(checkMobile(phoneNum)){
			var flag = $("#codeBt").attr("data-flag");
			if(flag=='new-bind'){//新手机获取验证码
				var concat_tele_new = $("#concat_tele_new").val().trim();
				if(concat_tele_new == '' || concat_tele_new == null || concat_tele_new == undefined){
					$("#label-telephone").removeClass("hide").text("请输入正确的手机号码");
					return false;
				}
				loadData(function(flag){
					if(flag){
						// 注册过
						$('#label-telephone').text('您输入的手机号码已被注册');
						$('#label-telephone').removeClass('hide');
					}else{ // 未注册
						$('#label-telephone').addClass('hide');
						verification(concat_tele_new);
					}
				}, getContextPath() + '/login/validation/phone', $.toJSON({
					telephone : concat_tele_new
				}));
			}else{//老手机获取验证码
				verification(phoneNum);
			}
		}else{
			// 输入正确的手机号
			$('#label-telephone').text('请输入正确的手机号码');
			$('#label-telephone').removeClass('hide');
		}
	});
}
/**
 * 获取验证码钮 点击事件
 */
function verification(phone){
	curCount = count;
	// 发送验证码
	loadData(function(flag){
		if(flag){ // 发送成功
			$('.codeBt').text('已发送('+ curCount +')');
			// 设置 button 效果为禁用
			$('.codeBt').attr('disabled','disabled');
			InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
		}else{ // 发送不成功
			// 显示重新发送
			$('.codeBt').text('重新获取');
			$('.codeBt').removeAttr('disabled');
		}
	}, getContextPath() + '/user/verification/' + phone, null);

}
//timer 处理函数
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		$('.codeBt').text('重新获取');
		$('.codeBt').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/user/clear/code');
		
	}else{
		curCount--;  
		$(".codeBt").text('已发送('+ curCount +')');
	}
}

/**
 * 检查数据的完整性
 * @param flag 0: 验证密码的完整性, 1: 验证手机的完整性
 */
function checkData(flag){
	if(flag == 0){ // 验证密码的完整性
		var password = $('#passw0rd').val();
		
		if(password.length < 6){
			$('#label-passw0rd').removeClass('hide');
			return false;
		}else{
			$('#label-passw0rd').addClass('hide');
		}
		
		return true;
	}else if(flag == 1){ // 验证手机的完整性
		var telephone = $('#concat_tele_new').val().trim();
		var verification_code = $('#veritifyCode').val().trim();
		
		if(telephone == '' || telephone == null || telephone == undefined){
			$('#label-telephone').removeClass('hide');
			return false;
		}else{
			$('#label-telephone').addClass('hide');
		}
		
		if(verification_code == '' || verification_code == null || verification_code == undefined){
			$('#label-code').removeClass('hide');
			return false;
		}else{
			$('#label-code').addClass('hide');
		}
		
		return true;
	}else if(flag == 2){ // 验证添加用户名密码
		var insloginName = $('#insuserName').val().trim();
		var newPassword = $('#insPassword').val().trim();
		var comfrimPassword = $('#insTwoPassword').val().trim();
		var code = $('#veritifyCode-pwd').val().trim();
		if(insloginName == '' || insloginName == null || insloginName == undefined){
			$("#insuserName-error").removeClass('hide');
			$("#insuserName-error").text('用户名不能为空');
			$('#insUserName').focus();
			return false;
		}else{
			$("#insuserName-error").addClass('hide');
		}
		if(code == '' || code == null || code == undefined){
			$("#label-code").removeClass('hide');
			$('#veritifyCode-pwd').focus();
			return false;
		}else{
			$("#label-code").addClass('hide');
		}
		var x; 
		syncLoadData(function(flag){
			if(flag){
				$("#insuserName-error").removeClass('hide');
				$("#insuserName-error").text('用户名已经重复过请更换用户名！');
				$('#insUserName').focus();
				x = true;
			}else{
				$("#insuserName-error").addClass('hide');
			}
		}, getContextPath() + '/login/validation/userName', $.toJSON({
			loginName : insloginName
		}));
		if(x){
			return false;
		}
		if(newPassword == '' || newPassword == null || newPassword == undefined || newPassword.length < 6){
			$("#insPassword-error").removeClass('hide');
			$("#insPassword-error").text('密码不能少于6位!');
			$('#insPassword').focus();
			return false;
		}else{
			$("#insPassword-error").addClass('hide');
		}
		if(newPassword != comfrimPassword){
			$("#insTwoPassword-error").removeClass('hide');
			$("#insTwoPassword-error").text('密码两次输入不一致!');
			$('#insTwoPassword').focus();
			return false;
		}else{
			$("#insTwoPassword-error").addClass('hide');
		}
		
		return true;
	}else if(flag == 3){//
		var insloginName = $('#userLoginName').text().trim();
		var upd_password = $('#upd-passwords').val().trim();
		var upd_newpassword = $('#upd-newpassword').val().trim();
		var upd_towpassword = $('#upd-towpassword').val().trim();
		if(upd_password == '' || upd_password == null || upd_password == undefined || upd_password.length < 6){
			$("#upd-password-error").removeClass('hide');
			$("#upd-password-error").text('密码不能少于6位!');
			$('#insPassword').focus();
			return false;
		}else{
			$("#upd-password-error").addClass('hide');
		}
		var x; 
		syncLoadData(function(msg){
			if(msg.errorCode == 200 && !msg.result){
				$("#upd-password-error").removeClass('hide');
				$("#upd-password-error").text('密码错误！');
				$('#upd-passwords').focus();
				x = true;
			}else if(msg.errorCode == 500){
				$("#upd-password-error").removeClass('hide');
				$("#upd-password-error").text('服务器繁忙，请重试！');
				$('#upd-passwords').focus();
				x = true;
			}else{
				$("#upd-password-error").addClass('hide');
				x = false;
			}
		}, getContextPath() + '/login/checkPwd', $.toJSON({
			loginName : insloginName,
			password :Encrypt(upd_password)
		}));
		if(x){
			return false;
		}
		if(upd_newpassword == '' || upd_newpassword == null || upd_newpassword == undefined || upd_newpassword.length < 6){
			$("#upd-newpassword-error").removeClass('hide');
			$("#upd-newpassword-error").text('密码不能少于6位!');
			$('#upd-newpassword').focus();
			return false;
		}else{
			$("#upd-newpassword-error").addClass('hide');
		}
		if(upd_newpassword != upd_towpassword){
			$("#upd-towpassword-error").removeClass('hide');
			$("#upd-towpassword-error").text('两次输入密码不一致！');
			$('#upd-towpassword').focus();
			return false;
		}else{
			$("#upd-towpassword-error").addClass('hide');
		}
		return true;
	}else if(flag == 4){
		var upd_newpassword = $('#upd-newpassword').val().trim();
		var upd_towpassword = $('#upd-towpassword').val().trim();
		var code = $('#upd-veritifyCode').val().trim();
		if(upd_newpassword == '' || upd_newpassword == null || upd_newpassword == undefined || upd_newpassword.length < 6){
			$("#upd-newpassword-error").removeClass('hide');
			$("#upd-newpassword-error").text('密码不能少于6位!');
			$('#upd-newpassword').focus();
			return false;
		}else{
			$("#upd-newpassword-error").addClass('hide');
		}
		if(code == '' || code == null || code == undefined){
			$("#upd-label-code").removeClass('hide');
			$('#upd-veritifyCode').focus();
			return false;
		}else{
			$("#upd-label-code").addClass('hide');
		}
		if(upd_newpassword != upd_towpassword){
			$("#upd-towpassword-error").removeClass('hide');
			$("#upd-towpassword-error").text('两次输入密码不一致！');
			$('#upd-towpassword').focus();
			return false;
		}else{
			$("#upd-towpassword-error").addClass('hide');
		}
		return true;
	}else if(flag==5){
		var upd_newpassword = $('#upd-newpassword').val().trim();
		var upd_towpassword = $('#upd-towpassword').val().trim();
		if(upd_newpassword == '' || upd_newpassword == null || upd_newpassword == undefined || upd_newpassword.length < 6){
			$("#upd-newpassword-error").removeClass('hide');
			$("#upd-newpassword-error").text('密码不能少于6位!');
			$('#upd-newpassword').focus();
			return false;
		}else{
			$("#upd-newpassword-error").addClass('hide');
		}
		if(upd_newpassword != upd_towpassword){
			$("#upd-towpassword-error").removeClass('hide');
			$("#upd-towpassword-error").text('两次输入密码不一致！');
			$('#upd-towpassword').focus();
			return false;
		}else{
			$("#upd-towpassword-error").addClass('hide');
		}
		return true;
	}else if(flag==6){
		var insloginName = $('#insuserName').val().trim();
		var newPassword = $('#insPassword').val().trim();
		var comfrimPassword = $('#insTwoPassword').val().trim();
		if(insloginName == '' || insloginName == null || insloginName == undefined){
			$("#insuserName-error").removeClass('hide');
			$("#insuserName-error").text('用户名不能为空');
			$('#insUserName').focus();
			return false;
		}else{
			$("#insuserName-error").addClass('hide');
		}
		if(newPassword == '' || newPassword == null || newPassword == undefined || newPassword.length < 6){
			$("#insPassword-error").removeClass('hide');
			$("#insPassword-error").text('密码不能少于6位!');
			$('#insPassword').focus();
			return false;
		}else{
			$("#insPassword-error").addClass('hide');
		}
		if(newPassword != comfrimPassword){
			$("#insTwoPassword-error").removeClass('hide');
			$("#insTwoPassword-error").text('密码两次输入不一致!');
			$('#insTwoPassword').focus();
			return false;
		}else{
			$("#insTwoPassword-error").addClass('hide');
		}
		return true;
	}
}

function hideTooltip(){
	$('.tooltip-show').hide('normal');
}

//上传图片
function uploadImg(){
	$.ajaxFileUpload({
		url : getContextPath() + '/user/preview/photo',
		secureuri : true,
		fileElementId : ['file'],
		dataType : 'text/html',
		data : {
			'id' : $('#user_unique').val().trim()
		},
		success: function(path){
			if(path != '' && path != null){
				if(path.indexOf('false@error') > -1){
					// 开启 modal
					$('#errorModal').modal('show');
					
					if(path.indexOf("error=1") > -1){
						$('#error-message').text('文件超过最大限制');
					} else if(path.indexOf("error=2") > -1){
						$('#error-message').text('格式不正确');
					}
					
					$('#iKnow').unbind('click');
					$('#iKnow').bind('click',function(){
						$('#errorModal').modal('hide');
					});
				}else{

					// 打开 图片遮罩
					$('#mymodal').modal('show');
					
					$('#mymodal').on('hidden.bs.modal', function () {
						jcrop_api.destroy();
						loadData(function(){
							// 自定义文件删除成功
							
						}, getContextPath() + '/user/delete/photo', $.toJSON({
							id : $('#user_unique').val().trim(),
							imgUrl : path
						}));
					})
					
					// 显示 图片
					var imgName = getFileName(path);
					var imgPath = getHostName() + '/user/img/' + imgName;
					
					$('#modal-original-img').attr('src',imgPath);
					$('#modal-preview').attr('src',imgPath);
					
					JcropFunction(); // 图片裁剪
					
					// 点击确定，裁剪文件，并将该文件转化为正规的文件名称
					$('#uploadConfirmBt').unbind('click');
					$('#uploadConfirmBt').bind('click',function(){
						
						$('#uploadConfirmBt').attr('disabled','disabled');
						
						// 裁剪图片
						loadData(function(userTarget){
							jcrop_api.destroy();
							$('#uploadConfirmBt').attr('disabled',false);
							$("#mymodal").modal("hide");
							var imgPath = getHostName() + '/user/img/' + userTarget.imgFileName;
							$('#user-img').attr('src',imgPath);
							$('#user-circle-img').attr('src',imgPath);
						}, getContextPath() + '/user/cutPhoto', $.toJSON({
							userId : $('#user_unique').val().trim(),
							imgUrl : path,
							x : x,
							y : y,
							x2 : x2,
							y2 : y2,
							width : w,
							height : h,
							originalWidth : $("#modal-original-img").width(),
							originalHeight : $("#modal-original-img").height()
						}));
					});
				}
			}else{
				alert('上传失败!');
			}
		},
		error : function(data, status, e){
			alert('信息保存失败...');
		}
	});
}

// 图片裁剪功能 start
function JcropFunction(){
	x=0;
	y=0;
	x2=0;
	y2=0;
	h=0;
	w=0;
	
	// 初始化Jcrop
	jcrop_api = $.Jcrop('#modal-original-img',{
		bgOpacity : 0.2,
		aspectRatio : 1 / 1,
		onSelect : updateCoords // 当选择完成时执行的函数
	});
}

function updateCoords(coords){
	
	x=coords.x;
	y=coords.y;
	x2=coords.x2;
	y2=coords.y2;
	w=coords.w;
	h=coords.h;
	
	if(parseInt(coords.w) > 0){
		//计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到 
		var rx = $(".modal-preview-container").width() / coords.w;
		var ry = $(".modal-preview-container").height() / coords.h;
		
		//通过比例值控制图片的样式与显示 
		$("#modal-preview").css({
			width:Math.round(rx * $("#modal-original-img").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积 
			height:Math.round(ry * $("#modal-original-img").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积 
			marginLeft:"-" + Math.round(rx * coords.x) + "px",
			marginTop:"-" + Math.round(ry * coords.y) + "px"
		});
		
	}
}
//图片裁剪功能 end

function bandInfo(){
	$('.three-band').slideDown('normal');
	$("#qq").attr("class","");
	$("#wechat").attr("class","");
	$("#wb").attr("class","");
	loadData(function(data){
		if(data.qq==1){
			$("#qq").addClass("band");
		}else{
			$("#qq").addClass("noBand");
		}
		if(data.wechat==1){
			$("#wechat").addClass("band");
		}else{
			$("#wechat").addClass("noBand");
		}
		if(data.wb==1){
			$("#wb").addClass("band");
		}else{
			$("#wb").addClass("noBand");
		}
		check();
		//初始化第三方
		userinfo_third.init();
		
	}, getContextPath() + '/user/third/status');
}

function check(){
	  
	 var wechatWord = $('#wechatWord');
	 var wechatBtn = $('#wechatBtn');
	 var qqWord = $('#qqWord');
	 var qqBtn = $('#qqBtn');
	 var wbWord = $('#wbWord');
	 var wbBtn = $('#wbBtn');
	
	if($('#wechat').hasClass('band')){
		wechatWord.text('绑定');
		wechatBtn.text('取消绑定');
		$("#wechatBtn").attr("data-status","1");
	}else{
		wechatWord.text('未绑定');
		wechatBtn.text('绑定');
		$("#wechatBtn").attr("data-status","0");
	}
	
	if($('#qq').hasClass('band')){
		qqWord.text('绑定');
		qqBtn.text('取消绑定');
		$("#qqBtn").attr("data-status","1");
	}else{
		qqWord.text('未绑定');
		qqBtn.text('绑定');
		$("#qqBtn").attr("data-status","0");
	}
	
	if($('#wb').hasClass('band')){
		wbWord.text('绑定');
		wbBtn.text('取消绑定');
		$("#wbBtn").attr("data-status","1");
	}else{
		wbWord.text('未绑定');
		wbBtn.text('绑定');
		$("#wbBtn").attr("data-status","0");
	}
	
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
/**
 * 更换手机模板
 */
var userInfo_tpl={
	//旧手机模板
	tpl_old_phone:[
	'	<div class="form-group">',
	'		<label class="col-sm-2 control-label">验证手机</label>',
	'		<div class="col-sm-3">',
	'			<input type="text" class="form-control" id="veritifyCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />',
	'		</div>',
	'		<div class="col-sm-2">',
	'			<button type="button" class="btn btn-default codeBt" id="codeBt">获取验证码</button>',
	'		</div>',
	'		<div class="col-sm-4">',
	'			<label id="label-code-phone" class="label-message hide" >请输入验证码</label>',
	'			<label id="label-code-phone-error" class="label-message hide" >验证码错误</label>',
	'		</div>',
	'	</div>',
	'	<div class="form-group">',
	'		<label class="col-sm-2 control-label"> </label>',
	'		<div class="col-sm-5">',
	'			<button type="button" class="btn btn-primary" id="validate-phone-code" >验证</button>',
	'		</div>',
	'	</div>',
	 ].join(""),
	//验证码通过后模板
	tpl_new_phone:[ 
	'	<div class="form-group">',
	'		<label class="col-sm-2 control-label item-height">新手机号</label>',
	'		<div class="col-sm-5">',
	'			<input type="text" class="form-control" id="concat_tele_new" tabindex="1" placeholder="请输入新手机号" autocomplete="off" />',
	'		</div>',
	'		<div class="col-sm-5">',
	'			<label id="label-telephone" class="label-message hide" >请输入正确的手机号码</label>',
	'		</div>',
	'	</div>',
	'	<div class="form-group">',
	'		<label class="col-sm-2 control-label">验证码</label>',
	'		<div class="col-sm-3">',
	'			<input type="text" class="form-control" id="veritifyCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />',
	'		</div>',
	'		<div class="col-sm-3">',
	'			<button type="button" data-flag="new-bind" class="btn btn-default codeBt" id="codeBt">获取验证码</button>',
	'		</div>',
	'		<div class="col-sm-4">',
	'			<label id="label-code-phone" class="label-message hide" >请输入验证码</label>',
	'			<label id="label-code--phone-error" class="label-message hide" >验证码错误</label>',
	'		</div>',
	'	</div>',
	'	<div class="form-group">',
	'		<label class="col-sm-2 control-label"> </label>',
	'		<div class="col-sm-5">',
	'			<button type="button" class="btn btn-primary" id="phone-info-contentBt" >修改</button>',
	'		</div>',
	'	</div>',
	 ].join(""),
}

//成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-showBand').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideSuccessTooltip(){
	$('.tooltip-showBand').hide('normal');
}

