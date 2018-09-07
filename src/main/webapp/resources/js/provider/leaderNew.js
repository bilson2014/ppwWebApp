 var step = 1;
 var curCount = 3;
 var InterValObj;
 var uploader;
 var uploaderInfo; //营业执照
 var uploaderZ;//正面
 var uploaderB;//背面
$().ready(function(){
	    /*resumeError();
	$('#checkbtn').on('click',function(){
		 resumeError();
		 checkStepOneData();
	});
	$('#surebtn').on('click',function(){
		 resumeError();
		 checkStepTwoData();
	});
    $('#backbtn').on('click',function(){
         step=1;
         showStepOne();
	});
	 $('#to-top').on('click',function(){
         step=1;
         window.location.href=getContextPath() + '/provider/portal';
	});
	userpicInfo();*/
	
	 initUl();
	 $('.getTag').on('click',function(){
	        if($(this).hasClass('redTag')){
	        	$(this).removeClass('redTag');
	        }else{
	        	$(this).addClass('redTag');
	        }
		});
	upLoadEven();
	initEven();
	upload.init();
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
function SetLastTime(){
        $('#lasttime').text(curCount); 
        $('#lasttime').attr('disabled','disabled');
        InterValObj = window.setInterval(SetRemainTime, 1000);  
}
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		window.location.href=getContextPath() + '/provider/portal';
	}
	else{
		  curCount--;
		 $('#lasttime').text(curCount); 
	}
}

function checkStepOneData(){
 if(step==1){

      if(checkStepOne()){
      	step=2;
      	showStepTwo();
      }
	 }
}

function checkStepTwoData(){
 if(step==2){
      if(checkStepTwo()){
      	infoSave();
      }
 }
}


function resumeError(){
    showError($('.input-group-div'),'');
    $('input').removeClass('errorL');
    showErrorLeader($('.user-img-content'),'');
}

function showStepOne(){

	 $('.step-two-div').hide();
	 $('.step-one-div').show();

     $('#step-1').addClass('step-1');
     $('#step-2').removeClass('step-1');
}

function showStepTwo(){
	$('.step-one-div').hide();
	$('.step-two-div').show();
    $('#step-2').addClass('step-1');
    $('#step-1').removeClass('step-1');
}

function showStepThree(){
	    $('.step-two-div').hide();
		$('.step-three-div').show();
        $('#step-2').removeClass('step-1');
        $('#step-3').addClass('step-1');
        SetLastTime();
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

function infoSave(){
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
	}),	$('#surebtn'));
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
	
	$('#agree').off('click').on('click',function(){
		if($("#isAgree[type='checkbox']").is(':checked')){
			 $('#agreement').hide();
			 $('.step').show();
			 $('#step1').show();
			 $(document).scrollTop(0);
		}else{
			$('#showErrorAgree').show();
		}
	});
	
	$('#step1Next').off('click').on('click',function(){
		/* $('#step1').hide();
		 $('#step2').show();
		 $(document).scrollTop(0);*/
		checkStepOne();
		
	});
	
	$('#step2Pre').off('click').on('click',function(){
		 $('#step2').hide();
		 $('#step1').show();
		 $(document).scrollTop(0);
	});
	
	$('#step2Next').off('click').on('click',function(){
		 if(checkStepTwo()){
			/* $('#step2').hide();
			 $('#step3').show();
			 $(document).scrollTop(0);*/
			 $('#toLeaderForm').submit();
		 }
	});
	
	$('#step3Pre').off('click').on('click',function(){
        $('#step3').hide();
        $('#step2').show();
        $(document).scrollTop(0);
	});
	
	$('#step3Next').off('click').on('click',function(){
		    $('#step3').hide();
		    $('#step4').show();
		    $(document).scrollTop(0);
	});
	
	$('#step4Pre').off('click').on('click',function(){
	    $('#step4').hide();
	    $('#step3').show();
	    $(document).scrollTop(0);
	});
	
	$('#step4Next').off('click').on('click',function(){
		   $('#successCheck').hide();
		   $('#success').show();
		   $(document).scrollTop(0);
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
	//上传
	$('#moreUp').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#multUpload').show();
	});
	$('#newProduct').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#upVideoCard').show();
	});
	$('#cancleMult').off('click').on('click',function(){
		$('#multUpload').hide();
		$('#uploadChoose').show();
	});
	$('#upBtn').off('click').on('click',function(){
		 $('.hideUp1').hide();
		 $('.hideUp2').show();
	});
	
	$('#cancleUpload').off('click').on('click',function(){
		 $('#uploadChoose').show();
		 $('.hideUp2').hide();
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
	
	$('#setLinkman').val(companyLinkman);
	$('#setEmail').val(companyEmail);
	$('#setWebChat').val(companyWebchat);
	$('#setQQ').val(companyQQ);
	$('#setPhoneNumber').val(companyPhone);
    	
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
		compress :{
		    compressSize:250 * 1024,
		    width:512,
		    height:512,
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 10 * 1024 * 1024,
		duplicate: true//允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'图片处理失败,请联系客服协助您上传(400-660-9728)');
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
		compress :{
		    compressSize:250 * 1024,
		    width:512,
		    height:512,
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 10 * 1024 * 1024,
		duplicate: true//允许重复上传同一个
	});
	uploaderInfo.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'图片处理失败,请联系客服协助您上传(400-660-9728)');
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
		compress :{
		    compressSize:250 * 1024,
		    width:512,
		    height:512,
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 10 * 1024 * 1024,
		duplicate: true//允许重复上传同一个
	});
	uploaderZ.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'图片处理失败,请联系客服协助您上传(400-660-9728)');
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
		compress :{
		    compressSize:250 * 1024,
		    width:512,
		    height:512,
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 10 * 1024 * 1024,
		duplicate: true//允许重复上传同一个
	});
	uploaderB.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				if(path.indexOf("error=1") > -1){
					showErrorLeader($('.user-img-content'),'图片处理失败,请联系客服协助您上传(400-660-9728)');
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

//上传视频单个
var upload = {
		init:function(){
			//初始化上传视频
			this.uploaderVideo();
			//初始化创作时间和tag标签
			this.initPage();
			//初始化上传图片
			this.uploaderPic();
		},
		uploaderVideo:function(){
			var _this = this;
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/save/product/info',
				pick : {
					id:'#upBtn',
					multiple :false//弹窗时不允许多选
				},
				timeout:0,
				fileSingleSizeLimit : video_max_size,
				accept :{
				    title: 'video',
				    extensions: 'mp4',
				    mimeTypes: 'video/mp4'
				}
			});
			upload_Video.on('fileQueued', function(file) {
				//跳转step2.添加信息
				_this.addProductMsg();
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				$(".progress-bar").css('width', percentage * 100 + '%');
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				if(response.code == 1){
					$('.upIng').addClass("hide");
					$('.upSuccess').removeClass("hide");
					$('.upError').addClass("hide");
					$("#productId").val(response.result);
					$(".stateInfo").addClass("hide");
				}else{
					$('.upIng').addClass("hide");
					$('.upSuccess').addClass("hide");
					$('.upError').removeClass("hide");
				}
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
						$('.error_upload').text('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						$('.error_upload').text(video_err_msg);
			        }else{
			        	$('.upIng').addClass("hide");
						$('.upSuccess').addClass("hide");
						$('.upError').removeClass("hide");
			        }
			});
		},
		addProductMsg:function(){
			$(".step1").addClass("hide");
			$(".step2").removeClass("hide");
		},
		initPage:function(){
			$('#findEx').on('click',function(){
				$('#tooltip-warn-banner').show();
			});
			$('#closeBanner').on('click',function(){
				$('#tooltip-warn-banner').hide();
			});
			$('#creationTime').datepicker({
				language: 'zh',
				dateFormat:'yyyy-MM-dd',
				maxDate: new Date(),
				autoClose:true
			});
			if(!$("#creationTime").val()){
				$("#creationTime").val(new Date().Format("yyyy-MM-dd"));
			}
		},
		uploaderPic:function(){
			var _this = this;
			uploader_Pic = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/update/product/info',
				pick : {
					id:'#upBtn-pic',
					multiple :false//弹窗选文件时，不允许多选
				},
				resize : false,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				fileNumLimit : 1,//最多上传一个文件
				fileSingleSizeLimit : image_max_size,
				accept :{
					title: 'Images',
					extensions: 'jpg,png',
					mimeTypes: 'image/jpeg,image/png'
				}
			});
			uploader_Pic.on('beforeFileQueued', function(file) {
				  //选中前触发，移除了所有的文件
				 //删除所有文件,值上传一个
				 var array = uploader_Pic.getFiles();
				 for(var i=0;i<array.length;i++){
					 uploader_Pic.removeFile( array[i] );
				 }
			});
			uploader_Pic.on('fileQueued', function(file) {
				var $img = $("#LDimg");
				// 创建缩略图
				// 如果为非图片文件，可以不用调用此方法。
				// thumbnailWidth x thumbnailHeight 为 100 x 100
				uploader_Pic.makeThumb( file, function( error, src ) {
					if ( error ) {
						$img.replaceWith('<span>不能预览</span>');
						return;
					}
					$img.attr( 'src', src );
				}, 130, 100 );
				$("#pic-LD-url").attr("data-change","1");//添加图片更换状态
				$("#img-error").text("");
			});
			uploader_Pic.on('uploadSuccess', function(file,response) {
				if(response.code==1){
					$(".step2").addClass("hide");
					$(".step3").removeClass("hide");
					SetLastTime();
					$('#toPortal').off('click').on('click',function(){
						window.location.href=getContextPath() + '/provider/portal';
					});
				}else{
					$("#img-error").text(response.result);
				}
				
			});
			uploader_Pic.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					$("#img-error").text('格式不正确');
				}else if(type=="F_EXCEED_SIZE"){
					$("#img-error").text(image_err_msg);
				}
			});
			_this.submit();
		},
		submit:function(){
			var _this = this;
			$('#infoBt').off("click").on('click', function() {
				var picLDChange = $("#pic-LD-url").data("change");
				var picImgUrl = $("#pic-LD-url").val();
				if(checkData()){ // 检验数据完整性
					if(picImgUrl != '' && picLDChange == 0){//修改作品，作品有图片且无更换时
						_this.modifyProduct();//ghost用户在有图片的情况下修改作品且没有更换图片
					}else{
						//webupload启动提交
						uploader_Pic.option('formData',{
							productId:$("#productId").val(),
							productName:$("#video-name").val(),
							creationTime:$("#creationTime").val(),
							tags:delTag()
						});
						uploader_Pic.upload();
					}
				}
			});
		},
		modifyProduct:function(){
			$.ajax({
				url : '/provider/update/product/info',
				type : 'POST',
				data : {
					productId:$("#productId").val(),
					productName:$("#video-name").val(),
					creationTime:$("#creationTime").val(),
					tags:delTag()
				},
				dataType : 'json',
				success : function(data){
					$(".step2").addClass("hide");
					$(".step3").removeClass("hide");
					SetLastTime();
					$('#toPortal').off('click').on('click',function(){
						window.location.href=getContextPath() + '/provider/portal';
					});
				},
				error : function() {
					alert(error);
				}
			});
		}
	}