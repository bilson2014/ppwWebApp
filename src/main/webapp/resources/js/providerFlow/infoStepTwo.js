 var step = 1;
 var curCount = 3;
 var InterValObj;
 var uploader;
 var uploaderInfo; //营业执照
 var uploaderZ;//正面
 var uploaderB;//背面
$().ready(function(){
	initEven();
});

function resumeError(){
    showError($('.input-group-div'),'');
    $('input').removeClass('errorL');
    showErrorLeader($('.user-img-content'),'');
}




function showErrorLeader(id, error) {
	if (error == "" || error == null) {
		id.attr('data-content', "");
	} else {
		id.attr('data-content', '*' + error);
		id.find('input').addClass('errorL');
	}
}

function initEven(){
	
	$('#step12Next').off('click').on('click',function(){
		checkStepTwo();
	});
}

function checkStepTwo(){

	var companyLinkman = $('#company-linkman').val().trim();
	var companyEmail   = $('#company-email').val().trim();
	var companyWebchat = $('#company-webchat').val().trim();
	var companyQQ = $('#company-qq').val().trim();
	var companyPhone = $('#company-phone').val().trim();
	
	if(companyLinkman == '' || companyLinkman == null || companyLinkman == undefined){
		 showErrorLeader($('#company-linkman-error'),'请填写联系人');
		 $('#company-linkman').focus();
		return false;
	}

	if(companyEmail == '' || companyEmail == null || companyEmail == undefined){
		showErrorLeader($('#company-email-error'),'请输入公司邮箱');
		 $('#company-email').focus();
		return false;
	}
	// 验证邮箱正确性
	if(!checkEmail(companyEmail)){
		showErrorLeader($('#company-email-error'),'邮箱格式不正确');
		 $('#company-email').focus();
		return false;
	}
	
	if(companyQQ != '' || companyQQ != null || companyQQ != undefined){
		var reg = /^[1-9]\d{4,9}$/;
		if(!companyQQ.match(reg)){
			showErrorLeader($('#company-qq-error'),'QQ号码有误!');
				$('#company-qq').focus();
				return false;
		}
	}
	return true;
}



