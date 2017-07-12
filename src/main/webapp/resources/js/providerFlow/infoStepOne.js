 var step = 1;
 var curCount = 3;
 var InterValObj;
 var uploader;
 var uploaderInfo; //营业执照
 var uploaderZ;//正面
 var uploaderB;//背面
$().ready(function(){

	 initUl();
	 $('.getTag').on('click',function(){
	        if($(this).hasClass('redTag')){
	        	$(this).removeClass('redTag');
	        }else{
	        	$(this).addClass('redTag');
	        }
		});
	initEven();
	upLoadEven();
});

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


function resumeError(){
    showError($('.input-group-div'),'');
    $('input').removeClass('errorL');
    showErrorLeader($('.user-img-content'),'');
}


//业务范围
function getBusinessVal(){
	var busArr;
	var tags = $('#getBussiness .redTag');
	for (var int = 0; int < tags.length; int++) {
		if(int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}

//创意策划
function getDreamVal(){
	var busArr;
	var tags = $('#getDream .redTag');
	for (var int = 0; int < tags.length; int++) {
		if(int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}
//创作团队
function getTeamVal(){
	var busArr;
	var tags = $('#getTeam .redTag');
	for (var int = 0; int < tags.length; int++) {
		if(int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}
//后期制作
function getLastVal(){
	var busArr;
	var tags = $('#getLast .redTag');
	for (var int = 0; int < tags.length; int++) {
		if(int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
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
	
	$('#step1Next').off('click').on('click',function(){
		/* $('#step1').hide();
		 $('#step2').show();
		 $(document).scrollTop(0);*/
		checkStepOne();
	});
	
	
	
	$('#company-data').datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		maxDate: new Date(),
		autoClose:true
	});
	var showWho = 0;
	$('#checkCompany').off('click').on('click',function(){
		$('#uploadYE').find('.webuploader-pick').text('上传营业执照');
		showWho = 0;
	});
	$('#checkWorkRoom').off('click').on('click',function(){
		$('#uploadYE').find('.webuploader-pick').text('身份证正面');
		showWho = 1;
	});
	
	
	//示例
	$('#theInfo').off('click').on('click',function(){
		if(showWho == 0){
			 $('#tooltip-warn-bannerInfo').show();
		}else{
			$('#tooltip-warn-banner').show();
		}
	});

	$('#theZ').off('click').on('click',function(){
		 $('#tooltip-warn-bannerZ').show();
	});

	$('#theB').off('click').on('click',function(){
		 $('#tooltip-warn-bannerB').show();
	});
	
	$('.closeBanner').off('click').on('click',function(){
		  $('.tooltip-warn-banner').hide();
	});
	
}

function checkStepOne(){
    var companyName = $('#teamName').val().trim(); // 公司名称
    var teamNature = $('.radio');
    var indent_scale = $('#indent_scale').attr('data-value');
	var infoResource = $('#getCity').attr('data-value');//市
	var teamProvince = $("#getProvince").attr('data-value');//省
	var companyAddress = $('#company-address').val().trim();//地址
	var companyData = $('#company-data').val().trim(); 
	var companyWeb = $('#companyWeb').val().trim();
	var user_img_url = $('#user_img_url').val().trim();//头像
	var user_img_url_Info = $('#user_img_url_Info').val().trim();//营业执照
	var user_img_url_Z = $('#user_img_url_Z').val().trim();//正面
	var user_img_url_B = $('#user_img_url').val().trim();//背面
	var businessVal = getBusinessVal();
	var dreamVal = getDreamVal();
	var teamVal = getTeamVal();
	var lastVal = getLastVal();
	var companyTeamDesc = $('#company-teamDesc').val().trim();
	resumeError();
	if(user_img_url == '' || user_img_url == null || user_img_url == undefined){
		showErrorLeader($('#user-img-content'),'请选择头像!');
		return false;
	}
	if(companyName == '' || companyName == null || companyName == undefined){
		showErrorLeader($('#company-name-error'),'请输入公司名称!');
		$('#teamName').focus();
		return false;
	}

	if(indent_scale == '' || indent_scale == null || indent_scale == undefined){
		showErrorLeader($('#company-scale-error'),'请输入公司规模!');
		return false;
	}else{
		$('#company-scale').val(indent_scale);
	}
	
	if(teamProvince == '' || teamProvince == null || teamProvince == undefined){
		showErrorLeader($('#cityError'),'请输入省');
		return false;
	}
	
	if(infoResource == '' || infoResource == null || infoResource == undefined){
		showErrorLeader($('#cityError'),'请输入市');
		return false;
	}

	if(companyAddress == '' || companyAddress == null || companyAddress == undefined){
		showErrorLeader($('#addressError'),'请输入详细地址');
		$('#company-address').focus();
		return false;
	}
	if(companyWeb != '' && companyWeb != null && companyWeb != undefined){
		if(!IsUrl(companyWeb)){
			$('#webError').attr('data-content','网址不正确');
			$('#companyWeb').focus();
			return false;
		}
	}
	
	if(companyData == '' || companyData == null || companyData == undefined){
		showErrorLeader($('#companyDataError'),'请输入日期');
		$('#company-data').focus();
		return false;
	}
	
	if(user_img_url_Info == '' || user_img_url_Info == null || user_img_url_Info == undefined){
		 showErrorLeader($('#user-img-contentInfo'),'请选择营业执照');
		return false;
	}
	
	if(user_img_url_Z == '' || user_img_url_Z == null || user_img_url_Z == undefined){
		 showErrorLeader($('#user-img-contentInfo'),'请选择身份证正面');
		return false;
	}
	
	if(user_img_url_B == '' || user_img_url_B == null || user_img_url_B == undefined){
		 showErrorLeader($('#user-img-contentInfo'),'请选择身份证背面');
		return false;
	}
	
	if(companyTeamDesc == '' || companyTeamDesc == null || companyTeamDesc == undefined){
		 showErrorLeader($('#company-teamDesc-error'),'请填写公司简介');
		 $('#company-teamDesc').focus();
		return false;
	}
	
	if(businessVal == '' || businessVal == null || businessVal == undefined){
		 showErrorLeader($('#business-checkbox-error'),'请选择影片类型');
		return false;
	}
	
	if(teamVal == '' || teamVal == null || teamVal == undefined){
		 showErrorLeader($('#checkbox-error'),'请选择创作团队');
		return false;
	}
	$('#businessSkill').val(businessVal);
    $('#skill').val(dreamVal+teamVal+lastVal);
	return true;
}




function upLoadEven(){
	userpicInfo();
	userpicInfoYE();
	userpicInfoZCard();
	userpicInfoBCard();
}

//头像修改
function userpicInfo(){
	uploader && uploader.destroy();
	uploader = WebUploader.create({
		auto:true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadBt',
		accept :{
		    title: 'Images',
		    extensions: 'jpg,png,jpeg',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*2048,
		duplicate: true//允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'文件超过最大限制');
				} else if(path.indexOf("error=2") > -1){
					showErrorLeader($('.user-img-content'),'格式不正确');
				}
			}else{
				$('#user_img_url').val(path);
				var img = getDfsHostName()+path;
				$('#user-img').attr('src',img);
				showErrorLeader($('.user-img-content'),'');
			}
		}else{
			showErrorLeader($('.user-img-content'),'上传失败!');
		}
	});
	uploader.on('error', function(type) {
		 if (type=="Q_TYPE_DENIED"){
			 showErrorLeader($('.user-img-content'),'格式不正确!');
        }else if(type=="F_EXCEED_SIZE"){
        	showErrorLeader($('.user-img-content'),'文件超过最大限制!');
        }
	});
}
//营业执照
function userpicInfoYE(){
	uploaderInfo && uploaderInfo.destroy();
	uploaderInfo = WebUploader.create({
		auto:true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadYE',
		accept :{
		    title: 'Images',
		    extensions: 'jpg,png,jpeg',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*2048,
		duplicate: true//允许重复上传同一个
	});
	uploaderInfo.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'文件超过最大限制');
				} else if(path.indexOf("error=2") > -1){
					showErrorLeader($('.user-img-content'),'格式不正确');
				}
			}else{
				$('#user_img_url_Info').val(path);
				var img = getDfsHostName()+path;
				$('#user-img-info').attr('src',img);
				showErrorLeader($('.user-img-content'),'');
			}
		}else{
			showErrorLeader($('.user-img-content'),'上传失败!');
		}
	});
	uploaderInfo.on('error', function(type) {
		 if (type=="Q_TYPE_DENIED"){
			 showErrorLeader($('.user-img-content'),'格式不正确!');
        }else if(type=="F_EXCEED_SIZE"){
        	showErrorLeader($('.user-img-content'),'文件超过最大限制!');
        }
	});
}
//正面
function userpicInfoZCard(){
	uploaderZ && uploaderZ.destroy();
	uploaderZ = WebUploader.create({
		auto:true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadZCard',
		accept :{
		    title: 'Images',
		    extensions: 'jpg,png,jpeg',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*2048,
		duplicate: true//允许重复上传同一个
	});
	uploaderZ.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'文件超过最大限制');
				} else if(path.indexOf("error=2") > -1){
					showErrorLeader($('.user-img-content'),'格式不正确');
				}
			}else{
				$('#user_img_url_Z').val(path);
				var img = getDfsHostName()+path;
				$('#user-img-z').attr('src',img);
				showErrorLeader($('.user-img-content'),'');
			}
		}else{
			showErrorLeader($('.user-img-content'),'上传失败!');
		}
	});
	uploaderZ.on('error', function(type) {
		 if (type=="Q_TYPE_DENIED"){
			 showErrorLeader($('.user-img-content'),'格式不正确!');
        }else if(type=="F_EXCEED_SIZE"){
        	showErrorLeader($('.user-img-content'),'文件超过最大限制!');
        }
	});
}
//背面
function userpicInfoBCard(){
	uploaderB && uploaderB.destroy();
	uploaderB = WebUploader.create({
		auto:true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadBCard',
		accept :{
		    title: 'Images',
		    extensions: 'jpg,png,jpeg',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*2048,
		duplicate: true//允许重复上传同一个
	});
	uploaderB.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'文件超过最大限制');
				} else if(path.indexOf("error=2") > -1){
					showErrorLeader($('.user-img-content'),'格式不正确');
				}
			}else{
				$('#user_img_url_B').val(path);
				var img = getDfsHostName()+path;
				$('#user-img-b').attr('src',img);
				showErrorLeader($('.user-img-content'),'');
			}
		}else{
			showErrorLeader($('.user-img-content'),'上传失败!');
		}
	});
	uploaderB.on('error', function(type) {
		 if (type=="Q_TYPE_DENIED"){
			 showErrorLeader($('.user-img-content'),'格式不正确!');
        }else if(type=="F_EXCEED_SIZE"){
        	showErrorLeader($('.user-img-content'),'文件超过最大限制!');
        }
	});
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