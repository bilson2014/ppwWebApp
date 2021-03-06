var  successIntervalObj; // timer变量，控制时间
$().ready(function() {
	
	$('.getTag').on('click', function() {
		if ($(this).hasClass('redTag')) {
			$(this).removeClass('redTag');
		} else {
			$(this).addClass('redTag');
		}
	});

	$('#company-establishDate').datepicker({
		language : 'zh',
		dateFormat : 'yyyy-MM-dd',
		maxDate : new Date()
	});
	//iframe 高度，离底边距离300
	$(window.parent.document).find('#content-frame').css('height',$('.proInfo').height() + 300);
	userpicInfo();
	initUl();
	updateProvider();
	getReturnValue();//回显
	
});

function getReturnValue(){
	setBusinessVal($('#Tags').val());
	setBusinessVal($('#skill').val());
	var index = $('.priceRangeSelect').find('span').attr('data-value');
	var lis = $('.priceRangeSelect').find('ul li');
	for ( var li in lis) {
		var liid = $(lis[li]).attr('data-value');
		if(index == liid){
			$('.priceRangeSelect').find('span').text($(lis[li]).text());
			break;
		}
	}
	
/*	var index = $('.infoResourceSelect').find('span').attr('data-value');
	var lis = $('.infoResourceSelect').find('ul li');
	for ( var li in lis) {
		var liid = $(lis[li]).attr('data-value');
		if(index == liid){
			$('.infoResourceSelect').find('span').text($(lis[li]).text());
			break;
		}
	}*/
	//公司规模
	var index = $('.priceScaleSelect').find('span').attr('data-value');
	var lis = $('.priceScaleSelect').find('ul li');
	for ( var li in lis) {
		var liid = $(lis[li]).attr('data-value');
		if(index == liid){
			console.info($(lis[li]).text())
			$('.priceScaleSelect').find('span').text($(lis[li]).text());
			break;
		}
	}
	
}


function verifyData() {
	
	showCommonError($('.infoItem'),"");
	
	var name = $('#company-name').val().trim(); // 公司名称
	if (name == '' || name == null || name == undefined) {
		showCommonError($('#company-name-error'),"请输入公司名称!");
		$('#company-name').focus();
		return false;
	}

	/* var telephone = $('#company-telephone').val().trim(); // 公司电话 */
	var email = $('#company-email').val().trim(); // 公司邮箱
	if (email == '' || email == null || email == undefined) {
		showCommonError($('#company-email-error'),"请输入公司邮箱!");
		$('#company-email').focus();
		return false;
	}
	// 验证邮箱正确性
	if (!checkEmail(email)) {
		showCommonError($('#company-email-error'),"邮箱格式不正确");
		$('#company-email').focus();
		return false;
	}

	var company_address = $('#company-address').val();
	if (company_address == '' || company_address == null
			|| company_address == undefined) {
		showCommonError($('#company-address-error'),"请输入公司地址!");
		$('#company-address').focus();
		return false;
	}

	var linkman = $('#company-linkman').val().trim(); // 联系人
	if (linkman == '' || linkman == null || linkman == undefined) {
		showCommonError($('#company-linkman-error'),"请输入联系人!");
		$('#company-linkman').focus();
		return false;
	}

	var phoneNumber = $('#company-phoneNumber').val().trim();
	if (phoneNumber == '' || phoneNumber == null || phoneNumber == undefined) {
		showCommonError($('#company-phoneNumber-error'),"请输入手机号码!");
		$('#company-phoneNumber').focus();
		return false;
	}
	// 验证电话号码正确性
	if (!checkMobile(phoneNumber)) {
		showCommonError($('#company-phoneNumber-error'),"手机号码格式不正确");
		$('#company-phoneNumber').focus();
		return false;
	}

	var qq = $('#company-qq').val().trim(); // QQ
		if (qq != '' && qq != null && qq != undefined) {
			var reg = /^[1-9]\d{4,9}$/;
			if(!qq.match(reg)){
				showCommonError($('#company-qq-error'),"QQ号码有误!");
				$('#company-qq').focus();
					return false;
			}
	}
	
	var province = $('#getProvince').attr('data-value'); // 所在城市
	if (province == '' || province == null || province == undefined) {
		showCommonError($('#getProvince-error'),"请选择所在省!");
		$('#company-province').focus();
		return false;
	}

	var city = $('#getCity').attr('data-value'); // 所在城市
	if (city == '' || city == null || city == undefined) {
		showCommonError($('#getCity-error'),"请选择所在城市!");
		$('#company-city').focus();
		return false;
		
	}
	
	var companyWeb = $('#company-officialSite').val();
	if(companyWeb != "" && companyWeb != null && companyWeb != undefined){
		if(!IsUrl(companyWeb)){
			$('#web-error').attr('data-content','网址不正确');
			$('#company-officialSite').focus();
			return false;
		}
	}

	var business = getBusinessVal(); // 业务范围
	if (business == '' || business == null || business == undefined) {
		showCommonError($('#Tags-error'),"请选择业务范围!");
		return false;
	}
	
	var skill = checkSkillVal();
	if (skill == '' || skill == null || skill == undefined) {
		showCommonError($('#skill-error"'),"请选择创作团队!");
		return false;
	}

	var description = $('#company-teamDesc').val().trim(); // 公司简介
	if (description == '' || description == null || description == undefined) {
		showCommonError($('#company-teamDesc-error'),"请输入公司简介!");
		$('#company-teamDesc').focus();
		return false;
	}

	var scale = $('#company-scale').attr('data-value'); // 公司规模
	if (scale == '' || scale == null || scale == undefined) {
		showCommonError($('#company-scale-error'),"请填写公司规模信息!");
		$('#company-scale').focus();
		return false;
	}

	return true;
}

function popshow(id, error) {
	var xxx = $('#'+id);
	if (error == "" || error == null) {
		xxx.attr('data-content', "");
	} else {
		xxx.attr('data-content', '*' + error);
	}
}

function IsUrl(str){   
	var Url=str;
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(Url)==true){
	return true;
	}else{
	return false;
	}	 
}



function getBusinessVal() {
	var busArr = '';
	var tags = $('#businessSkill .redTag');
	for (var int = 0; int < tags.length; int++) {
		if (int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}

function getSkillVal() {
	var busArr = '';
	var tags = $('.businessSkill .redTag');
	for (var int = 0; int < tags.length; int++) {
		if (int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}

function checkSkillVal(){
	var busArr = '';
	var tags = $('#getTeamSkill .redTag');
	for (var int = 0; int < tags.length; int++) {
		if (int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}
/**
 * 页面标签，点击变红，再点击取消样式
 * @param ids
 */
function setBusinessVal(ids) {
	if(ids != null && ids!= undefined){
		var idsArray = ids.split(',');
		if(idsArray!=null && idsArray.length >0){
			var tags = $('.getTag');
			for (var int = 0; int < idsArray.length; int++) {
				var id = idsArray[int];
				for (var int2 = 0; int2 < tags.length; int2++) {
					var id2 = $(tags[int2]).attr('data-value');
					if(id == id2)
						$(tags[int2]).addClass('redTag');
				}
			}
		}
	}
}

// 头像修改
function userpicInfo() {
	uploader && uploader.destroy();
	uploader = WebUploader.create({
		auto : true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadBt',
		accept : {
			title : 'Images',
			extensions : 'jpg,png,jpeg',
			mimeTypes : 'image/jpeg,image/png'
		},
		compress :{
		    compressSize:250 * 1024,
		    width:512,
		    height:512,
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 10 * 1024 * 1024,
		duplicate : true
	// 允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file, response) {
		var path = response._raw;
		if (path != '' && path != null) {
			if (path.indexOf('false@error') > -1) {
				if (path.indexOf("error=1") > -1) {
					$('.errorImg').text("图片处理失败,请联系客服协助您上传(400-660-9728)");
				} else if (path.indexOf("error=2") > -1) {
					$('.errorImg').text("格式不正确");
				}
			} else {
				$('#user_img_url').val(path);
				var img = getDfsHostName() + path;
				$('#user-img').attr('src', img);
				$('.errorImg').text("");
			}
		} else {
		    $('.errorImg').text("上传失败!");
		}
	});
	uploader.on('error', function(type) {
		if (type == "Q_TYPE_DENIED") {
			$('.errorImg').text("格式不正确");
		} else if (type == "F_EXCEED_SIZE") {
			$('.errorImg').text("文件超过最大限制");
			
		}
	});
}

function initUl(){
	$('.dropdown li').on('click',function(){
        $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
        var info=parseInt($(this).attr('data-info'));
        $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-value",($(this).attr('data-value')));
        $(this).parent().slideUp();
        if($(this).hasClass('Province'))
        	Province($(this));
        return false;
   });
	
	var url = $('#user-img').attr('data-value');
	if(url!=null && url !='' && url.indexOf("/resources/") == -1){
		$('#user-img').attr('src',getDfsHostName()+url);
		$('#user_img_url').val(url);
	}
	
	var msg = $('#recommendation').val();
	var flag = $("#bean-flag").val();
	if(flag != null && flag !='' && flag == '0'){
		//var msg = $('#recommendation').val();
		showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
	}else if(flag != null && flag !='' && flag == '2'){
		showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
	}else{
		var a = $("#bean-checkStatus").val();//是否存在再次审核
		if(a != null && a !='' && a == '0'){
			//var msg = $('#recommendation').val();
			showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
		}else if(a != null && a !='' && a == '2'){
			var msg = $('#checkDetails').val();
			showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
		}else{
			hideInfomation();
		}
	}
}

function Province(self){
	var ProvinceId = self.attr('data-value')
	loadData(function(msg){
		if(msg != null && msg.length >0 ){
			var select = $("#selectUlCity");
		    $('#getCity').text('');
		    $('#getCity').attr('data-value','');
			select.empty();
			msg.forEach(function(city){
				var html = '<li data-value = "' + city.cityID + '" >'+city.city+'</li>';
				select.append(html);
			});
			initUl();
		}
	}, getContextPath() + '/get/citys', $.toJSON({
		provinceId : ProvinceId
	}))
}
function hasAuditing() {
	var flag = $("#bean-flag").val();
	return flag == 1 ? true : false
}
function updateProviderInfo() {
	$(window.parent.document).find('.tooltip-wati').show();
	loadData(function(flag) {
		$(window.parent.document).find('.tooltip-wati').hide();
		if (flag) {
			// 更新成功
			successToolTipShow("更新成功");
			
		} else {
			// 更新失败
			successErrorTipShow('请重新保存');
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
		priceRange : $('#priceRange').attr('data-value'),
		/*infoResource : $('#infoResource').attr('data-value'),*/
		business : getBusinessVal(),
		scale : $('#company-scale').attr('data-value'),
		phoneNumber : $('#company-phoneNumber').val().trim(),
		teamProvince : $('#getProvince').attr('data-value'),
		teamCity : $("#getCity").attr('data-value'),
		teamPhotoUrl : $('#user_img_url').val(),
		flag : $('#bean-flag').val(),
		telNumber : $('#telNumber').val(),
		skill:getSkillVal()
	}));
}
function dealTeamTmpAndUpdateTeamDesc(){
	$(window.parent.document).find('.tooltip-wati').show();
	loadData(function(flag){
		$(window.parent.document).find('.tooltip-wati').hide();
		if(flag){
			// 
			successToolTipShow("更新成功");
		}else{
			// 更新失败
			successErrorTipShow('请重新保存');
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
		priceRange : $('#priceRange').attr('data-value'),
		/*infoResource : $('#infoResource').attr('data-value'),*/
		business : getBusinessVal(),
		scale : $('#company-scale').attr('data-value'),
		phoneNumber : $('#company-phoneNumber').val().trim(),
		teamProvince : $('#getProvince').attr('data-value'),
		teamCity : $("#getCity").attr('data-value'),
		teamPhotoUrl : $('#user_img_url').val(),
		flag : $('#bean-flag').val(),
		telNumber : $('#telNumber').val(),
		skill:getSkillVal()
	}));
}
function updateProvider(){
	$('#infoBt').off("click").on('click',function(){
		if(verifyData()){ // 检测数据完整性
			if(!hasAuditing()){//审核未通过
				updateProviderInfo();
			}else{
				//验证team是否修改 true存在修改 false 没有修改
				loadData(function(flag){
					var a = $("#bean-checkStatus").val();//是否存在再次审核
					if(flag || a !=""){
						$(window.parent.document).find('#tooltip-check').show();
						$(window.parent.document).find('#checkInfo').text('您修改了贵公司资料,需要再次进行审核,是否确定?');
						$(window.parent.document).find('#sureCheck').off('click').on('click',function(){
							dealTeamTmpAndUpdateTeamDesc();
							$(window.parent.document).find('#tooltip-check').hide();
						});
					}else{
						updateProviderInfo();
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
					priceRange : $('#priceRange').attr('data-value'),
				/*	infoResource : $('#infoResource').attr('data-value'),*/
					business : getBusinessVal(),
					scale : $('#company-scale').attr('data-value'),
					phoneNumber : $('#company-phoneNumber').val().trim(),
					teamProvince : $('#getProvince').attr('data-value'),
					teamCity : $("#getCity").attr('data-value'),
					teamPhotoUrl : $('#user_img_url').val(),
					telNumber : $('#telNumber').val(),
					skill:getSkillVal()
				}));
			}
		}
	});
}
//成功信息 提示框弹出方法
function successToolTipShow(msg){
	window.clearInterval(successIntervalObj);
	$(window.parent.document).find('.tooltip-success-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageSSSS").val(msg);
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}
function hideSuccessTooltip(){
	$(window.parent.document).find('.tooltip-success-show').hide();
	location.reload();
}

function hideError(){
	$(window.parent.document).find('.tooltip-error-show').hide();
	location.reload();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(msg){
	window.clearInterval(successIntervalObj);
	$(window.parent.document).find('.tooltip-error-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageEEEE").val(msg);
	successIntervalObj = window.setInterval(hideError(), 3000);
}
function showInfomation(title,body){
	$(window.parent.document).find('#infomation').slideDown();
	$(window.parent.document).find('#infomation_title').text(title);
	$(window.parent.document).find('#infomation_body').text(body);
	$(window.parent.document).find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}
function hideInfomation(){
	$(window.parent.document).find('#infomation').hide();
}
