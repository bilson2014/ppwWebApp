var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
$().ready(function(){
	
	// 显示Logo
	var logoPath = $('#logoPath').val().trim();
	if(logoPath != null && logoPath != '' && logoPath != undefined){
		var imgName = getFileName(logoPath);
		var imgPath = getHostName() + '/team/img/' + imgName;
		$('#logoImg').attr('src',imgPath);
	}
	
	// 标签页点击策略
	$('a[data-toggle="tab"]').on('shown.bs.tab',function (e){
		$('.tooltip-message').text('');
		$('.tooltip-show').hide();
		$('.tooltip-success-show').hide();
	})
	
	// 注册基本信息保存按钮
	$('#infoBt').on('click',infoSave);
	// 注册安全设置保存按钮
	$('#passwordBt').on('click',safeInfo);
	
	$('#insSubmit').on('click',addAccount);
	
	$('#uploadBt').on('click',function(){
		$.blockUI({
			message : '<h1><img src="'+ getContextPath() +'/resources/img/busy.gif"></img>&nbsp;准备上传…</h1>'
		});
		// 上传图片
		uploadImg();
	});
	
	// 图片上传 点击事件
	$('#logoImg').on('click',function(){
		$('#file').click();
	});
	
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
function infoSave(){
	
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
	
	
}

// 安全设置保存按钮 点击事件
function safeInfo(){
	if(checkData(2)){ // 检测数据完整性
		// 检验当前密码是否正确
		loadData(function(info){
			if(info.key){
				// 修改密码
				loadData(function(flag){
					if(flag){
						// 更新成功
						successToolTipShow();
					}else{
						// 更新失败
						toolTipShow('请重新操作!');
					}
				}, getContextPath() + '/provider/recover/password', $.toJSON({
					loginName : $('#userName').text().trim(),
					password : Encrypt($('#company-newPassword').val().trim())
				}));
			}else{
				// 不正确,提示不能修改密码
				toolTipShow(info.value);
				$('#company-password').focus();
			}
		}, getContextPath() + '/provider/validateLoginStatus', $.toJSON({
			loginName : $('#userName').text().trim(),
			password : Encrypt($('#company-password').val().trim())
		}));
	}
}


function addAccount(){
	if(checkData(3)){ // 检测数据完整性
		// 检验当前密码是否正确
		var loginName = $('#insUserName').val().trim();
		loadData(function(info){
			if(info){
				// TODO:
				$("#userName").text(loginName);
				$("#loginpwdinsert").addClass("hide");
				$("#loginpwdupdate").removeClass("hide");
			}else{
				toolTipShow('设置失败！');	
			}
		}, getContextPath() + '/provider/add/account', $.toJSON({
			loginName : loginName,
			password : Encrypt($('#insTwoPassword').val().trim()),
			teamId : $("#company-id").val().trim()
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
			var description = $('#company-description').val().trim(); // 公司简介
			
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
				popshow('company-description', '请输入公司简介!');
				$('#company-description').focus();
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
			var curPassword = $('#company-password').val().trim();
			var newPassword = $('#company-newPassword').val().trim();
			var comfrimPassword = $('#company-confirmPassword').val().trim();
			
			if(loginName == '' || loginName == null || loginName == undefined){
				toolTipShow('用户名为空，请重新登陆!');
				return false;
			}
			
			if(curPassword == '' || curPassword == null || curPassword == undefined){
				popshow('company-password', '请填写密码!');
				$('#company-password').focus();
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
		case 3:
			var insloginName = $('#insuserName').val().trim();
			var newPassword = $('#insPassword').val().trim();
			var comfrimPassword = $('#insTwoPassword').val().trim();
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
			if(newPassword != comfrimPassword){
				toolTipShow('密码两次输入不一致');
				return false;
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

//上传图片
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
}

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