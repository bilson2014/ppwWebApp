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

	userpicInfo();
	saveInfo();
	initUl();
	setBusinessVal($('#Tags').val());
});

function verifyData() {
	var name = $('#company-name').val().trim(); // 公司名称
	if (name == '' || name == null || name == undefined) {
		popshow('company-name', '请输入公司名称!');
		$('#company-name').focus();
		return false;
	}

	/* var telephone = $('#company-telephone').val().trim(); // 公司电话 */
	var email = $('#company-email').val().trim(); // 公司邮箱
	if (email == '' || email == null || email == undefined) {
		popshow('company-email', '请输入公司邮箱!');
		$('#company-email').focus();
		return false;
	}
	// 验证邮箱正确性
	if (!checkEmail(email)) {
		popshow('company-email', '邮箱格式不正确!');
		$('#company-email').focus();
		return false;
	}

	var company_address = $('#company-address').val();
	if (company_address == '' || company_address == null
			|| company_address == undefined) {
		popshow('company-address', '请输入公司地址！');
		$('#company-address').focus();
		return false;
	}

	var linkman = $('#company-linkman').val().trim(); // 联系人
	if (linkman == '' || linkman == null || linkman == undefined) {
		popshow('company-linkman', '请输入联系人!');
		$('#company-linkman').focus();
		return false;
	}

	var phoneNumber = $('#company-phoneNumber').val().trim();
	if (phoneNumber == '' || phoneNumber == null || phoneNumber == undefined) {
		popshow('company-phoneNumber', '请输入手机号码!');
		$('#company-phoneNumber').focus();
		return false;
	}
	// 验证电话号码正确性
	if (!checkMobile(phoneNumber)) {
		popshow('company-phoneNumber', '手机号码格式不正确');
		$('#company-phoneNumber').focus();
		return false;
	}

	var webchat = $('#company-webchat').val().trim(); // 微信
	if (webchat == '' || webchat == null || webchat == undefined) {
		popshow('company-webchat', '请输入微信号码!');
		$('#company-webchat').focus();
		return false;
	}

	var qq = $('#company-qq').val().trim(); // QQ
	if (qq == '' || qq == null || qq == undefined) {
		popshow('company-qq', '请输入QQ号码!');
		$('#company-qq').focus();
		return false;
	}

	var province = $('#getProvince').attr('data-value'); // 所在城市
	if (province == '' || province == null || province == undefined) {
		popshow('company-province', '请选择所在省!');
		$('#company-province').focus();
		return false;
	}

	var city = $('#getCity').attr('data-value'); // 所在城市
	if (city == '' || city == null || city == undefined) {
		popshow('company-city', '请选择所在城市!');
		$('#company-city').focus();
		return false;
	}

	var business = getBusinessVal(); // 业务范围
	if (business == '' || business == null || business == undefined) {
		popshow('business-checkbox', '请选择业务范围!');
		$('#business-checkbox').focus();
		return false;
	}

	var description = $('#company-teamDesc').val().trim(); // 公司简介
	if (description == '' || description == null || description == undefined) {
		popshow('company-teamDesc', '请输入公司简介!');
		$('#company-teamDesc').focus();
		return false;
	}

	var scale = $('#company-scale').val().trim(); // 公司规模
	if (scale == '' || scale == null || scale == undefined) {
		popshow('company-scale', '请填写公司规模信息!');
		$('#company-scale').focus();
		return false;
	}

	var company_demand = $('#company-demand').val();
	if (company_demand == '' || company_demand == null
			|| company_demand == undefined) {
		popshow('company-demand', '必须填写对客户的要求!');
		$('#company-demand').focus();
		return false;
	}

}

function popshow(id, error) {
	var xxx = $('#'+id);
	if (error == "" || error == null) {
		xxx.attr('data-content', "");
	} else {
		xxx.attr('data-content', '*' + error);
	}
}

function saveInfo() {
	$("#submitCheck").on('click', function() {
		var res = verifyData();
		if (res) {
			submitForm(function(flag){
				showStepThree();
			}, getContextPath() + '/provider/update/leaderInfomation', $.toJSON({
					teamName : $('#company-name').val().trim(),
					email : $('#company-email').val().trim(),
					address : $('#company-address').val().trim(),
					teamDescription : $('#company-teamDesc').val().trim(),
					linkman : $('#company-linkman').val().trim(),
					webchat : $('#company-webchat').val().trim(),
					qq : $('#company-qq').val().trim(),
					business : getBusinessVal(),
					scale : $('#company-scale').val().trim(),
					demand : $('#company-demand').val().trim(),
					city : $('#company-city option:selected').val(),
					priceRange : $('#indent_recomment').attr('data-value'),
					infoResource :  $('#indent_qwe').attr('data-value'),
					teamProvince : $("#getProvince").attr('data-value'),
					teamCity : $("#getCity").attr('data-value'),
					teamPhotoUrl : $('#user_img_url').val()
			}),	$('#submitCheck'));
		}
	});
}

function getBusinessVal() {
	var busArr = '';
	var tags = $('.redTag');
	for (var int = 0; int < tags.length; int++) {
		if (int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}
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
			extensions : 'jpg,png',
			mimeTypes : 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024 * 2048,
		duplicate : true
	// 允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file, response) {
		var path = response._raw;
		if (path != '' && path != null) {
			if (path.indexOf('false@error') > -1) {
				if (path.indexOf("error=1") > -1) {
					alert("文件超过最大限制");
				} else if (path.indexOf("error=2") > -1) {
					alert('格式不正确');
				}
			} else {
				$('#user_img_url').val(path);
				var img = getDfsHostName() + path;
				$('#user-img').attr('src', img);
			}
		} else {
			alert('上传失败!');
		}
	});
	uploader.on('error', function(type) {
		if (type == "Q_TYPE_DENIED") {
			alert("文件超过最大限制");
		} else if (type == "F_EXCEED_SIZE") {
			alert('格式不正确');
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