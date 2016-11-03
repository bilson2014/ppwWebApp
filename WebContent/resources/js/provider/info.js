var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
$().ready(function(){
	provider_info.init();
	// 显示Logo
	/*var logoPath = $('#logoPath').val().trim();
	if(logoPath != null && logoPath != '' && logoPath != undefined){
		var imgName = getFileName(logoPath);
		var imgPath = getHostName() + '/team/img/' + imgName;
		$('#logoImg').attr('src',imgPath);
	}*/
	// 标签页点击策略
	$('a[data-toggle="tab"]').on('shown.bs.tab',function (e){
		$('.tooltip-message').text('');
		$('.tooltip-show').hide();
		$('.tooltip-success-show').hide();
		provider_info.init();//放在这里的原因是等frame加载完之后,在加载其他
	})
	

	//初始化綁定信息
	checkBand();
	
	$("#upd-codeBt").off("click").on("click",function(){
		var telPhone = $("#company-phoneNumber").val();
		if(checkData(4)){
			if(checkMobile(telPhone)){
				verification(telPhone,"upd-codeBt");
			}
		}
	})
	$("#codeBt").off("click").on("click",function(){
		var telPhone = $("#company-phoneNumber").val();
		if(checkData(5)){
			if(checkMobile(telPhone)){
				verification(telPhone,"codeBt");
			}
		}
	})

	// 注册基本信息保存按钮
	//$('#infoBt').on('click',infoSave);
	// 注册安全设置保存按钮
	$('#passwordBt').on('click',safeInfo);
	
	$('#insSubmit').on('click',addAccount);
/*	// 图片上传 点击事件
	$('#logoImg').on('click',function(){
		// 图片上传 点击事件
		$('#file').off("change").on("change",function(){
			$.blockUI({
				message : '<h1><img src="'+ getContextPath() +'/resources/images/busy.gif"></img>&nbsp;准备上传…</h1>'
			});
			// 上传图片
			uploadImg();
		});
		$('#file').click();
	});*/
	
	infoEcho();
	
	$('#company-establishDate').datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		maxDate: new Date() 
	});
	
	var loginName = $("#userName").text();
	if(loginName == null ||loginName == ''){
		$("#loginpwdinsert").removeClass("hide");
		$("#loginpwdupdate").addClass("hide");
	}else{
		$("#loginpwdupdate").removeClass("hide");
		$("#loginpwdinsert").addClass("hide");
	}
	
	$("#insUserName").on("change",function(){
		loadData(function(flag){
			if(!flag){
				popshow('insUserName','用户名已经重复');
			}
		}, getContextPath() + '/provider/checkExisting', $.toJSON({
			loginName : $("#insUserName").val().trim()
		}));
	});
	
	// 添加省下拉框监听
	$("#company-province").on('change',function(){
		var ProvinceId = $(this).val();
		loadData(function(msg){
			if(msg != null && msg.length >0 ){
				var select = $("#company-city");
				select.empty();
				msg.forEach(function(city){
					var html = '<option value = "' + city.cityID + '" >'+city.city+'</option>'  ;
					select.append(html);
				});
			}
		}, getContextPath() + '/get/citys', $.toJSON({
			provinceId : ProvinceId
		}))
	});
});

// 信息回显
function infoEcho(){
	var city = $('#company-city-value').val();
	var price = $('#company-priceRange-value').val();
	var resouce = $('#company-infoResource-value').val();
	var business = $('#company-business').val();
	
	//回显数据
	$('#company-infoResource option').each(function(i){
		if($(this).val() == resouce)
			$(this).attr('selected',true);
	});
	
	$('#company-priceRange option').each(function(i){
		if($(this).val() == price)
			$(this).attr('selected',true);
	});
	
	$('#company-city option').each(function(i){
		if(this.value == city)
			this.selected = 'selected';
	});
	
	if(business != null && business != '' && business != undefined){
		var arr = business.split(',');
		for(var i = 0;i < arr.length;i ++){
			// 遍历checkbox
			$('input[name="business"]').each(function(){
				if(this.value == arr[i])
					this.checked = 'checked';
			});
		}
	}
	
}

// 基本信息保存按钮 点击事件
/*function infoSave(){
	
	if(checkData(1)){ // 检测数据完整性
		// TODO 如果更改手机号码的话，验证手机号码是否已经注册
		// 执行update方法
		loadData(function(flag){
			if(flag){
				// 更新成功
				successToolTipShow();
			}else{
				// 更新失败
				toolTipShow('请重新保存');
			}
		}, getContextPath() + '/provider/update/teamInfomation', $.toJSON({
			teamId : $('#company-id').val().trim(),
			teamName : $('#company-name').val().trim(),
			email : $('#company-email').val().trim(),
			address : $('#company-address').val().trim(),
			teamDescription : $('#company-teamDesc').val().trim(),
			linkman : $('#company-linkman').val().trim(),
			webchat : $('#company-webchat').val().trim(),
			qq : $('#company-qq').val().trim(),
			establishDate : $('#company-establishDate').val(),
			officialSite : $('#company-officialSite').val(),
			city : $('#company-city option:selected').val(),
			priceRange : $('#company-priceRange option:selected').val(),
			infoResource : $('#company-infoResource option:selected').val(),
			business : getBusinessVal(),
			scale : $('#company-scale').val().trim(),
			businessDesc : $('#company-businessDesc').val().trim(),
			demand : $('#company-demand').val().trim(),
			description : $('#company-description').val().trim(),
			phoneNumber : $('#company-phoneNumber').val().trim(),
			teamProvince : $("#company-province").val(),
			teamCity : $("#company-city").val()
		}));
	}
	
	
}*/

// 安全设置保存按钮 点击事件
function safeInfo(){
	if(checkData(2)){ // 检测数据完整性
		// 检验当前密码是否正确
		// 修改密码
		loadData(function(data){
			if(data.code==1){
				// 更新成功
				successToolTipShow('更新成功！');
				InterValObj&&window.clearInterval(InterValObj); // 停止计时器
				$("#upd-codeBt").text("获取验证码");
			}else{
				// 更新失败
				toolTipShow(data.result);
			}
		}, getContextPath() + '/provider/recover/password', $.toJSON({
			loginName : $('#userName').text().trim(),
			password : Encrypt($('#company-newPassword').val().trim()),
			verification_code:$("#upd-veritifyCode").val().trim()
		}));
	}
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
	}, getContextPath() + '/login/verification/' + phone, null);

}
/**
 * 获取验证码钮 点击事件,动态绑定按钮id 方法
 */
function verification(phone,ID){
	curCount = count;
	// 发送验证码
	loadData(function(flag){
		if(flag){ // 发送成功
			$('#'+ID).text('已发送('+ curCount +')');
			// 设置 button 效果为禁用
			$('#'+ID).attr('disabled','disabled');
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
	}, getContextPath() + '/login/verification/' + phone, null);

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
		}, getContextPath() + '/login/clear/code');
		
	}else{
		curCount--;  
		$(".codeBt").text('已发送('+ curCount +')');
	}
}
function addAccount(){
	if(checkData(3)){ // 检测数据完整性
		// 检验当前密码是否正确
		var loginName = $('#insUserName').val().trim();
		loadData(function(data){
			if(data.code==1){
				$("#userName").text(loginName);
				$("#loginpwdinsert").addClass("hide");
				$("#loginpwdupdate").removeClass("hide");
				$(".name-item").text($("#userName").text());
				window.clearInterval(InterValObj); // 停止计时器
				$("#upd-codeBt").text("获取验证码");
				$(".warn").attr("class","").text("");//清除右上角提示标识
			}else{
				toolTipShow(data.result);	
			}
		}, getContextPath() + '/provider/add/account', $.toJSON({
			loginName : loginName,
			password : Encrypt($('#insTwoPassword').val().trim()),
			teamId : $("#company-id").val().trim(),
			verification_code:$("#veritifyCode").val().trim()
			
		}));
	}
}

/**
 * 检测数据完整性
 * 1:供应商基本信息
 * 2：供应商安全设置
 */
function checkData(type){
	var teamId = $('#company-id').val().trim();
	if(teamId == '' || teamId == null || teamId == undefined){
		toolTipShow('请重新登录');
		return false;
	}
	switch(type){
		case 1 : // 验证 基本信息
			var name = $('#company-name').val().trim(); // 公司名称
			/*var telephone = $('#company-telephone').val().trim(); // 公司电话 */
			var email = $('#company-email').val().trim(); // 公司邮箱
			var description = $('#company-teamDesc').val().trim(); // 公司简介
			
			var linkman = $('#company-linkman').val().trim(); // 联系人
			var webchat = $('#company-webchat').val().trim(); // 微信
			var qq = $('#company-qq').val().trim(); // QQ
			
			var province = $('#company-province option:selected').val(); // 所在城市
			var city = $('#company-city option:selected').val(); // 所在城市
			
			var priceRange = $('#company-priceRange option:selected').val(); // 价格区间
			var infoResource = $('#company-infoResource option:selected').val(); // 获知渠道
			var business = getBusinessVal(); // 业务范围
			var scale = $('#company-scale').val().trim(); // 公司规模
			var phoneNumber = $('#company-phoneNumber').val().trim();
			
			if(name == '' || name == null || name == undefined){
				popshow('company-name', '请输入公司名称!');
				$('#company-name').focus();
				return false;
			}
			
			if(phoneNumber == '' || phoneNumber == null || phoneNumber == undefined){
				popshow('company-phoneNumber', '请输入手机号码!');
				$('#company-phoneNumber').focus();
				return false;
			}
			
			if(email == '' || email == null || email == undefined){
				popshow('company-email', '请输入公司邮箱!');
				$('#company-email').focus();
				return false;
			}
			
			if(description == '' || description == null || description == undefined){
				popshow('company-teamDesc', '请输入公司简介!');
				$('#company-teamDesc').focus();
				return false;
			}
			
			if(linkman == '' || linkman == null || linkman == undefined){
				popshow('company-linkman', '请输入联系人!');
				$('#company-linkman').focus();
				return false;
			}
			
			if(webchat == '' || webchat == null || webchat == undefined){
				popshow('company-webchat', '请输入微信号码!');
				$('#company-webchat').focus();
				return false;
			}
			
			if(qq == '' || qq == null || qq == undefined){
				popshow('company-qq', '请输入QQ号码!');
				$('#company-qq').focus();
				return false;
			}
			
			if(province == '' || province == null || province == undefined){
				popshow('company-province', '请选择所在省!');
				$('#company-province').focus();
				return false;
			}
			
			if(city == '' || city == null || city == undefined){
				popshow('company-city', '请选择所在城市!');
				$('#company-city').focus();
				return false;
			}
			
			
			if(priceRange == '' || priceRange == null || priceRange == undefined){
				popshow('company-priceRange', '请选择价格区间!');
				$('#company-priceRange').focus();
				return false;
			}
			
			if(infoResource == '' || infoResource == null || infoResource == undefined){
				popshow('company-infoResource', '请选择获取获知渠道!');
				$('#company-infoResource').focus();
				return false;
			}
			
			if(business == '' || business == null || business == undefined){
				popshow('business-checkbox', '请选择业务范围!');
				$('#business-checkbox').focus();
				return false;
			}
			
			if(scale == '' || scale == null || scale == undefined){
				popshow('company-scale', '请填写公司规模信息!');
				$('#company-scale').focus();
				return false;
			}
			
			// 验证邮箱正确性
			if(!checkEmail(email)){
				popshow('company-email', '邮箱格式不正确!');
				$('#company-email').focus();
				return false;
			}
			
			// 验证电话号码正确性
			if(!checkMobile(phoneNumber)){
				popshow('company-phoneNumber', '手机号码格式不正确');
				$('#company-phoneNumber').focus();
				return false;
			}
			
			
			return true;
		case 2 : // 验证 安全信息
			var loginName = $('#userName').text().trim();
			var newPassword = $('#company-newPassword').val().trim();
			var comfrimPassword = $('#company-confirmPassword').val().trim();
			var veritifyCode = $('#upd-veritifyCode').val().trim();
			if(loginName == '' || loginName == null || loginName == undefined){
				toolTipShow('用户名为空，请重新登陆!');
				return false;
			}
			if(newPassword == '' || newPassword == null || newPassword == undefined){
				popshow('company-newPassword', '密码不能少于6位!');
				$('#company-newPassword').focus();
				return false;
			}
			
			if(comfrimPassword == '' || comfrimPassword == null || comfrimPassword == undefined){
				popshow('company-confirmPassword', '请填写确认密码!');
				$('#company-confirmPassword').focus();
				return false;
			}
			if(newPassword.length < 6){
				popshow('company-newPassword', '密码不能少于6位!');
				$('#company-newPassword').focus();
				return false;
			}
			
			if(newPassword != comfrimPassword){
				toolTipShow('密码两次输入不一致');
				return false;
			}
			if(veritifyCode == '' || veritifyCode == null || veritifyCode == undefined){
				popshow('upd-veritifyCode', '请填写验证码!');
				$('#upd-veritifyCode').focus();
				return false;
			}
			return true;
		case 3:
			var insloginName = $('#insUserName').val().trim();
			var newPassword = $('#insPassword').val().trim();
			var comfrimPassword = $('#insTwoPassword').val().trim();
			var veritifyCode = $('#veritifyCode').val().trim();
			if(insUserName == '' || insUserName == null || insUserName == undefined){
				popshow('insUserName','用户名不能为空');
				$('#insUserName').focus();
				return false;
			}
			
			var x; 
			syncLoadData(function(flag){
				if(!flag){
					popshow('insUserName','用户名已经重复');
					x = true;
				}
			}, getContextPath() + '/provider/checkExisting', $.toJSON({
				loginName : insloginName
			}));
			if(x){
				return false;
			}
			if(newPassword == '' || newPassword == null || newPassword == undefined){
				popshow('insPassword', '密码不能少于6位!');
				$('#insPassword').focus();
				return false;
			}
			if(newPassword.length < 6){
				popshow('insPassword', '密码不能少于6位!');
				$('#insPassword').focus();
				return false;
			}
			if(comfrimPassword == '' || comfrimPassword == null || comfrimPassword == undefined){
				popshow('insTwoPassword', '请填写确认密码!');
				$('#insTwoPassword').focus();
				return false;
			}
			if(newPassword != comfrimPassword){
				toolTipShow('密码两次输入不一致');
				return false;
			}
			if(veritifyCode == '' || veritifyCode == null || veritifyCode == undefined){
				popshow('veritifyCode', '请填写验证码!');
				$('#veritifyCode').focus();
				return false;
			}
			return true;
		case 4:
			var loginName = $('#userName').text().trim();
			var newPassword = $('#company-newPassword').val().trim();
			var comfrimPassword = $('#company-confirmPassword').val().trim();
			if(loginName == '' || loginName == null || loginName == undefined){
				toolTipShow('用户名为空，请重新登陆!');
				return false;
			}
			if(newPassword == '' || newPassword == null || newPassword == undefined){
				popshow('company-newPassword', '密码不能少于6位!');
				$('#company-newPassword').focus();
				return false;
			}
			
			if(comfrimPassword == '' || comfrimPassword == null || comfrimPassword == undefined){
				popshow('company-confirmPassword', '请填写确认密码!');
				$('#company-confirmPassword').focus();
				return false;
			}
			if(newPassword.length < 6){
				popshow('company-newPassword', '密码不能少于6位!');
				$('#company-newPassword').focus();
				return false;
			}
			
			if(newPassword != comfrimPassword){
				toolTipShow('密码两次输入不一致');
				return false;
			}
			return true;
		case 5:
			var insloginName = $('#insUserName').val().trim();
			var newPassword = $('#insPassword').val().trim();
			var comfrimPassword = $('#insTwoPassword').val().trim();
			if(insUserName == '' || insUserName == null || insUserName == undefined){
				popshow('insUserName','用户名不能为空');
				$('#insUserName').focus();
				return false;
			}
			if(newPassword == '' || newPassword == null || newPassword == undefined){
				popshow('insPassword', '密码不能少于6位!');
				$('#insPassword').focus();
				return false;
			}
			if(newPassword != comfrimPassword){
				toolTipShow('密码两次输入不一致');
				return false;
			}
			return true;
		case 6:
			var telephone = $('#provider-newphone').val().trim();
			var verification_code = $('#provider-phonecode').val().trim();
			
			if(telephone == '' || telephone == null || telephone == undefined){
				$('#label-telephone').removeClass('hide').text("请输入正确的手机号");
				return false;
			}else{
				$('#label-telephone').addClass('hide');
			}
			if(!checkMobile(telephone)){
				$('#label-telephone').removeClass('hide').text("请输入正确的手机号");
				return false;
			}
			if(verification_code == '' || verification_code == null || verification_code == undefined){
				$('#upd-label-code-phone').removeClass('hide');
				return false;
			}else{
				$('#label-code').addClass('hide');
			}
			
			return true;
		default: // 其他
			return false;
	}
}

//初始化弹出框
function popshow(id,content){
	window.clearInterval(PopInterValObj); // 停止计时器
	$('#' + id).popover({
		placement : 'bottom',
		content : content,
		trigger : 'manual',
		delay: { show: 200, hide: 100 }
	}).popover('show');
	
	PopInterValObj = window.setInterval(function(){
		$('#' + id).popover('hide');
	}, 2000);
}

// 提示框隐藏
function hideTooltip(){
	$('.tooltip-show').hide('normal');
}

function hideSuccessTooltip(){
	$('.tooltip-success-show').hide('normal');
}

// 成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

// 错误信息 提示框弹出方法
function toolTipShow(info){
	window.clearInterval(IntervalObj);
	$('.tooltip-message').text(info);
	$('.tooltip-show').slideDown('normal');
	IntervalObj = window.setInterval(hideTooltip, 3000);
}

/*//上传图片
function uploadImg(){
	$.ajaxFileUpload({
		url : getContextPath() + '/provider/update/teamPhotoPath',
		secureuri : true,
		fileElementId : ['file'],
		dataType : 'text/html',
		data : {
			'teamId' : $('#company-id').val().trim()
		},
		success: function(path){
			$.unblockUI();
			if(path != '' && path != null){
				if(path.indexOf('false@error') > -1){
					if(path.indexOf("error=1") > -1){
						toolTipShow('文件超过最大限制');
					} else if(path.indexOf("error=2") > -1){
						toolTipShow('格式不正确');
					}
					
				}else{
					// 显示 图片
					var imgName = getFileName(path);
					var imgPath = getHostName() + '/team/img/' + imgName;
					$('#logoImg').attr('src',imgPath);
					successToolTipShow();
				}
			}else{
				alert('上传失败!');
			}
		},
		error : function(data, status, e){
			alert('信息保存失败...');
		}
	});
}*/

function getBusinessVal(){
	var busArr;
	$('input[name="business"]:checked').each(function(i){
		if(0 == i){
			busArr = this.value;
		}else {
			busArr += ',' + this.value;
		}
	});
	return busArr;
}
//初始化绑定信息
function checkBand(){
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
		
	}, getContextPath() + '/provider/third/status');
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
								linkman : s.data.nickname,
								teamPhotoUrl : s.data.figureurl,
								thirdLoginType : 'qq',
								qqUnique : openId,
								uniqueId:openId
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
							$('.tooltip-showBand').slideDown('normal');
							$('#qq').removeAttr("class").addClass("noBand");
							check();
							successToolTipShow();
						}
					}, getContextPath() + '/provider/unbind/third',  $.toJSON({
						thirdLoginType:"qq"
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
					}, getContextPath() + '/provider/unbind/third',  $.toJSON({
						thirdLoginType:"wechat"
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
								linkman : o.screen_name,
								teamPhotoUrl : o.profile_image_url,
								thirdLoginType : 'weibo',
								wbUnique : wb_uniqueId,
								uniqueId:wb_uniqueId
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
					}, getContextPath() + '/provider/unbind/third',  $.toJSON({
						thirdLoginType:"wb"
					}));
				}
				
			});
		},
}
function userInfoToBind(condition){
	loadData(function(data){
		if(data.code==1){
			checkBand();
			successToolTipShow();
		}
	}, getContextPath() + '/provider/bind/third',condition);
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

//add by wanglc
var provider_info = {
		init:function(){
			//更换手机获取验证码验证旧手机
			this.changePhone();
			//点击供应商基本信息保存
			this.updateProvider();
			//显示供应商图片
			this.showLogo();
			//供应商LOGO上传
			this.webuploadLOGO();
			
		},
		
		webuploadLOGO:function(){
			webupload({
				 auto:true,
				 server: '/provider/update/teamPhotoPath',//url
				 pick: '#picker',//点击弹窗
				 formData : {'teamId' : $('#company-id').val().trim()},//参数
				 fileQueued:function(file){//选中后执行
					 $.blockUI({
							message : '<h1><img src="'+ getContextPath() +'/resources/images/busy.gif"></img>&nbsp;准备上传…</h1>'
					 });
				 },
				 uploadSuccess:function( file ,response){//成功回调
					 $.unblockUI();
					 var path = response._raw;
						if(path != '' && path != null){
							if(path.indexOf('false@error') > -1){
								if(path.indexOf("error=1") > -1){
									toolTipShow('文件超过最大限制');
								} else if(path.indexOf("error=2") > -1){
									toolTipShow('格式不正确');
								}
							}else{
								// 显示 图片
								var imgPath = getDfsHostName()+ path;
								$('#logoImg').attr('src',imgPath);
								successToolTipShow();
							}
						}else{
							alert('上传失败!');
						}
				 },
			});
		},
		changePhone:function(){
			$("#old-content").empty().append(info_tpl.tpl_old_phone);
			// 激活 获取验证码 按钮
			getVeritifyCodeValidate();
			//点击验证
			$("#code-validate").off("click").on("click",function(){
				var veritifyCode = $("#provider-phoneCode").val().trim();
				if(null!=veritifyCode&&veritifyCode!=''&&veritifyCode!=undefined){
					loadData(function(result){
						if(result){
							window.clearInterval(InterValObj);
							$("#new-phone-content").empty().append(info_tpl.tpl_new_phone);
							$("#phone-codeBt").text("获取验证码");
							$("#old-content").empty();
							$("#old-phone-container").addClass("hide");
							getVeritifyCodeValidate();
							// 注册 个人资料-修改按钮点击事件
							$('#newphone-save').unbind('click');
							$('#newphone-save').bind('click',function(){
								var newPhone = $('#provider-newphone').val().trim();
								if(checkData(6)){
									loadData(function(result){
										if(result.code == 2){
											window.clearInterval(InterValObj);
											$("#new-phone-content").empty();
											$("#old-phone-container").removeClass("hide");
											$("#provider-phone").text(newPhone);
											$("#old-content").empty().append(info_tpl.tpl_old_phone);
											successToolTipShow();
										}else if(result.code == 1){
											toolTipShow("验证码错误");
										}else if(result.code == 3){
											toolTipShow("手机号被占用");
										}
										
									}, getContextPath() + '/provider/modify/phone', $.toJSON({
										teamId : $('#company-id').val(),
										phoneNumber : newPhone,
										verification_code : $('#provider-phonecode').val().trim()
									}));
								}
							});
						}else{
							$("#label-code-phone").removeClass("hide").text("验证码错误");
						}
					}, getContextPath() + '/phone/validate', $.toJSON({
						telephone : $("#provider-phone").text().trim(),
						verification_code : $("#provider-phoneCode").val().trim()
					}));
				}else{
					$('#label-code-phone').removeClass('hide').text("请输入验证码");
					return false;
				}
			})
		},
		//点击供应商保存按钮
		updateProvider:function(){
			var _this = this;
			$('#infoBt').off("click").on('click',function(){
				if(checkData(1)){ // 检测数据完整性
					if(!hasAuditing()){//审核未通过
						_this.updateProviderInfo();
					}else{
						//验证team是否修改 true存在修改 false 没有修改
						loadData(function(flag){
							var a = $("#bean-checkStatus").val();//是否存在再次审核
							if(flag || a != ""){//信息存在修改且数据库中有再次审核记录,a的目的是确保如果有审核未通过后,又改成跟原来一样的,这样也需要审核
								if(confirm('您修改了贵公司资料,需要再次进行审核,是否确定?')){
									//处理team_tmp记录,更新team备注
									_this.dealTeamTmpAndUpdateTeamDesc();
								}
							}else{
								_this.updateProviderInfo();
							}
						}, getContextPath() + '/provider/validate/change', $.toJSON({
							teamId : $('#company-id').val().trim(),
							teamName : $('#company-name').val().trim(),
							email : $('#company-email').val().trim(),
							address : $('#company-address').val().trim(),
							teamDescription : $('#company-teamDesc').val().trim(),
							linkman : $('#company-linkman').val().trim(),
							webchat : $('#company-webchat').val().trim(),
							qq : $('#company-qq').val().trim(),
							establishDate : $('#company-establishDate').val(),
							officialSite : $('#company-officialSite').val(),
							city : $('#company-city option:selected').val(),
							priceRange : $('#company-priceRange option:selected').val(),
							infoResource : $('#company-infoResource option:selected').val(),
							business : getBusinessVal(),
							scale : $('#company-scale').val().trim(),
							businessDesc : $('#company-businessDesc').val().trim(),
							demand : $('#company-demand').val().trim(),
							phoneNumber : $('#company-phoneNumber').val().trim(),
							teamProvince : $("#company-province").val(),
							teamCity : $("#company-city").val()
						}));
					}
				}
			});
		},
		updateProviderInfo:function(){
			loadData(function(flag){
				if(flag){
					// 更新成功
					successToolTipShow();
				}else{
					// 更新失败
					toolTipShow('请重新保存');
				}
			}, getContextPath() + '/provider/update/teamInfomation', $.toJSON({
				teamId : $('#company-id').val().trim(),
				teamName : $('#company-name').val().trim(),
				email : $('#company-email').val().trim(),
				address : $('#company-address').val().trim(),
				teamDescription : $('#company-teamDesc').val().trim(),
				linkman : $('#company-linkman').val().trim(),
				webchat : $('#company-webchat').val().trim(),
				qq : $('#company-qq').val().trim(),
				establishDate : $('#company-establishDate').val(),
				officialSite : $('#company-officialSite').val(),
				city : $('#company-city option:selected').val(),
				priceRange : $('#company-priceRange option:selected').val(),
				infoResource : $('#company-infoResource option:selected').val(),
				business : getBusinessVal(),
				scale : $('#company-scale').val().trim(),
				businessDesc : $('#company-businessDesc').val().trim(),
				demand : $('#company-demand').val().trim(),
				description : $('#company-description').val().trim(),
				phoneNumber : $('#company-phoneNumber').val().trim(),
				teamProvince : $("#company-province").val(),
				teamCity : $("#company-city").val()
			}));
		},
		dealTeamTmpAndUpdateTeamDesc:function(){
			loadData(function(flag){
				if(flag){
					// 更新成功
					successToolTipShow();
					$(".show-check-status").addClass("hide");
					$("#submit-info-show").removeClass("hide");
				}else{
					// 更新失败
					toolTipShow('请重新保存');
				}
			}, getContextPath() + '/provider/deal/TeamTmpAndTeamDesc', $.toJSON({
				teamId : $('#company-id').val().trim(),
				teamName : $('#company-name').val().trim(),
				email : $('#company-email').val().trim(),
				address : $('#company-address').val().trim(),
				teamDescription : $('#company-teamDesc').val().trim(),
				linkman : $('#company-linkman').val().trim(),
				webchat : $('#company-webchat').val().trim(),
				qq : $('#company-qq').val().trim(),
				establishDate : $('#company-establishDate').val(),
				officialSite : $('#company-officialSite').val(),
				city : $('#company-city option:selected').val(),
				priceRange : $('#company-priceRange option:selected').val(),
				infoResource : $('#company-infoResource option:selected').val(),
				business : getBusinessVal(),
				scale : $('#company-scale').val().trim(),
				businessDesc : $('#company-businessDesc').val().trim(),
				demand : $('#company-demand').val().trim(),
				description : $('#company-description').val().trim(),
				phoneNumber : $('#company-phoneNumber').val().trim(),
				teamProvince : $("#company-province").val(),
				teamCity : $("#company-city").val()
			}));
		},
		showLogo:function(){
			var logoPath = $('#logoPath').val().trim();
			if(logoPath != null && logoPath != '' && logoPath != undefined){
				var imgPath = getDfsHostName() + logoPath;
				$('#logoImg').attr('src',imgPath);
			}
		},
		/*uploadLOGO:function(){
			$('#logoImg').off('click').on('click',function(){
				// 图片上传 点击事件
				$('#file').off("change").on("change",function(){
					$.blockUI({
						message : '<h1><img src="'+ getContextPath() +'/resources/images/busy.gif"></img>&nbsp;准备上传…</h1>'
					});
					// 上传图片
					uploadImg();
				});
				$('#file').click();
			});
		}*/
}
/*//上传图片
function uploadImg(){
	$.ajaxFileUpload({
		url : getContextPath() + '/provider/update/teamPhotoPath',
		secureuri : true,
		fileElementId : ['file'],
		dataType : 'text/html',
		data : {
			'teamId' : $('#company-id').val().trim()
		},
		success: function(path){
			$.unblockUI();
			if(path != '' && path != null){
				if(path.indexOf('false@error') > -1){
					if(path.indexOf("error=1") > -1){
						toolTipShow('文件超过最大限制');
					} else if(path.indexOf("error=2") > -1){
						toolTipShow('格式不正确');
					}
					
				}else{
					// 显示 图片
					var imgPath = getDfsHostName()+ path;
					$('#logoImg').attr('src',imgPath);
					successToolTipShow();
				}
			}else{
				alert('上传失败!');
			}
		},
		error : function(data, status, e){
			alert('信息保存失败...');
		}
	});
}*/
function getVeritifyCodeValidate(){
	$('#phone-codeBt').unbind('click');
	$('#phone-codeBt').bind('click',function(){
		$('#label-code-phone').addClass("hide");
		var flag = $("#phone-codeBt").attr("data-flag");
		var phoneNum = $('#provider-phone').text().trim();
		if(flag=='new-bind'){//新手机获取验证码
			var concat_tele_new = $("#provider-newphone").val().trim();
			if(!checkMobile(concat_tele_new)){
				$("#label-telephone").removeClass("hide").text("请输入正确的手机号码");
				return false;
			}
			loadData(function(flag){
				if(!flag){
					// 注册过
					$('#label-telephone').text('您输入的手机号码已被注册');
					$('#label-telephone').removeClass('hide');
				}else{ // 未注册
					$('#label-telephone').addClass('hide');
					verification(concat_tele_new,"phone-codeBt");
				}
			}, getContextPath() + '/provider/checkExisting', $.toJSON({
				phoneNumber : concat_tele_new
			}));
		}else{//老手机获取验证码
			verification(phoneNum,"phone-codeBt");
		}
	});
}
function hasAuditing(){
	var flag = $("#bean-flag").val();
	return flag == 1?true:false
}
var info_tpl = {
	//旧手机模板
	tpl_old_phone:[
	'<div class="form-group">',
	'	<label class="col-sm-2 control-label">验证码</label>',
	'	<div class="col-sm-3">',
	'		<input type="text" class="form-control" id="provider-phoneCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />',
	'	</div>',
	'	<div class="col-sm-3">',
	'		<button type="button" class="btn btn-default phonecodeBt" data-flag="old-bind" id="phone-codeBt">获取验证码</button>',
	'	</div>',
	'	<div class="col-sm-3">',
	'		<label id="label-code-phone" class="label-message hide" ></label>',
	'	</div>',
	'</div>',
	'<div class="form-group">',
	'	<div class="col-sm-offset-2 col-sm-6">',
	'		<button type="button" class="btn btn-default" id="code-validate">验证</button>',
	'	</div>',
	'</div>'
	 ].join(""),
	//新手机模板
	tpl_new_phone:[
	'<div class="form-group">',
	'	<label class="col-sm-2 control-label">新手机号</label>',
	'	<div class="col-sm-3">',
	'		<input type="text" class="form-control" id="provider-newphone" tabindex="2" placeholder="请输入新手机号" autocomplete="off" />',
	'	</div>',
	'	<div class="col-sm-5">',
	'		<label id="label-telephone" class="label-message hide" >请输入正确的手机号码</label>',
	'	</div>',
	'</div>',
	'<div class="form-group">',
	'	<label class="col-sm-2 control-label">验证码</label>',
	'	<div class="col-sm-3">',
	'		<input type="text" class="form-control" id="provider-phonecode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />',
	'	</div>',
	'	<div class="col-sm-3">',
	'		<button type="button" class="btn btn-default codeBt"  data-flag="new-bind" id="phone-codeBt">获取验证码</button>',
	'	</div>',
	'	<div class="col-sm-4">',
	'		<label id="upd-label-code-phone" class="label-message hide" >请输入验证码</label>',
	'	</div>',
	'</div>',
	'<div class="form-group">',
	'	<div class="col-sm-offset-2 col-sm-6">',
	'		<button type="button" class="btn btn-default" id="newphone-save">保存</button>',
	'	</div>',
	'</div>'
	 ].join(""),
}

