var InterValObj; // timer变量，控制时间 
var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 

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
			default:
				break;
		}
	});
	
	$('.nav-tabs').find('a:first').click();
	
	// 初始化数据
	initData();
	
	// 隐藏 提示信息
	$('.tooltip-show').hide();
	
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
					userCompany : $('#company').val().trim()
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
	
	// 注册 个人资料-修改按钮点击事件
	$('#password-info-contentBt').unbind('click');
	$('#password-info-contentBt').bind('click',function(){
		if(checkData(0)){
			var confirmPassw0rd = $('#confirm-passw0rd').val();
			var passw0rd = $('#passw0rd').val();
			if(confirmPassw0rd == passw0rd){
				$('#label-confirm-passw0rd').addClass('hide');
				loadData(function(flag){
					// 提示成功
					$('.tooltip-show').slideDown('normal');
					if(flag){
						$('.tooltip-message').text('密码修改成功!');
					}else{
						$('.tooltip-message').text('密码修改失败，请刷新后再试!');
					}
					window.setInterval(hideTooltip, 2000);
				}, getContextPath() + '/user/modify/password', $.toJSON({
					id : $('#user_unique').val(),
					password : Encrypt($('#passw0rd').val().trim())
				}));
			}else{
				$('#label-confirm-passw0rd').removeClass('hide');
			}
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

// 更换手机
function phoneInfo(){
	$('.phone-info-content').slideDown('normal');
	
	// 激活 获取验证码 按钮
	$('#codeBt').unbind('click');
	$('#codeBt').bind('click',function(){
		var phoneNum = $('#concat_tele_new').val();
		if(checkMobile(phoneNum)){
			loadData(function(flag){
				if(flag){
					// 注册过
					$('#label-telephone').text('您输入的手机号码已被注册');
					$('#label-telephone').removeClass('hide');
				}else{ // 未注册
					$('#label-telephone').addClass('hide');
					verification();
				}
			}, getContextPath() + '/login/validation/phone', $.toJSON({
				telephone : phoneNum
			}));
				
		}else{
			// 输入正确的手机号
			$('#label-telephone').text('请输入正确的手机号码');
			$('#label-telephone').removeClass('hide');
		}
	});
	
	// 注册 个人资料-修改按钮点击事件
	$('#phone-info-contentBt').unbind('click');
	$('#phone-info-contentBt').bind('click',function(){
		if(checkData(1)){
			$(this).attr('disabled','disabled');
			loadData(function(result){
				$('.tooltip-show').slideDown('normal');
				if(result){
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

/**
 * 获取验证码钮 点击事件
 */
function verification(){
	curCount = count;
	
	// 发送验证码
	loadData(function(flag){
		if(flag){ // 发送成功
			$('#codeBt').text('已发送('+ curCount +')');
			// 设置 button 效果为禁用
			$('#codeBt').attr('disabled','disabled');
			InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
		}else{ // 发送不成功
			// 显示重新发送
			$('#codeBt').text('重新获取');
			$('#codeBt').removeAttr('disabled');
		}
	}, getContextPath() + '/user/verification/' + $('#concat_tele_new').val().trim(), null);

}

//timer 处理函数
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		$('#codeBt').text('重新获取');
		$('#codeBt').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/user/clear/code');
		
	}else{
		curCount--;  
		$("#codeBt").text('已发送('+ curCount +')');
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