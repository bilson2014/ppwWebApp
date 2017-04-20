 var step = 1;
 var curCount = 3;
 var InterValObj;
 var uploader;
$().ready(function(){
	    resumeError();
	    initUl();
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
	 $('.getTag').on('click',function(){
        if($(this).hasClass('redTag')){
        	$(this).removeClass('redTag');
        }else{
        	$(this).addClass('redTag');
        }
	});
	userpicInfo();
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

function checkStepOne(){
    var name = $('#company-name').val().trim(); // 公司名称
	var email = $('#company-email').val().trim(); // 公司邮箱
	var linkman = $('#company-linkman').val().trim(); // 联系人
	var webchat = $('#company-webchat').val().trim(); // 微信
	var qq = $('#company-qq').val().trim(); // QQ
	var address = $('#company-address').val().trim();
	var user_img_url = $('#user_img_url').val().trim();
	
	if(user_img_url == '' || user_img_url == null || user_img_url == undefined){
         
		 showErrorLeader($('.user-img-content'),'请选择Logo!');
		return false;
	}
	
	if(name == '' || name == null || name == undefined){
		showErrorLeader($('#company-name-error'),'请输入公司名称!');
		$('#company-name').focus();
		return false;
	}
	if(linkman == '' || linkman == null || linkman == undefined){
		showErrorLeader($('#company-linkman-error'),'请输入联系人!');
		$('#company-linkman').focus();
		return false;
	}
	if(webchat == '' || webchat == null || webchat == undefined){
		showErrorLeader($('#company-webchat-error'),'请输入微信号!');
		$('#company-webchat').focus();
		return false;
	}
	if(qq != '' || qq != null || qq != undefined){
		var reg = /^[1-9]\d{4,9}$/;
		if(!qq.match(reg)){
			showErrorLeader($('#company-qq-error'),'QQ号码有误!');
				$('#company-qq').focus();
				return false;
		}
	}
	if(email == '' || email == null || email == undefined){
		showErrorLeader($('#company-email-error'),'请输入公司邮箱!');
		$('#company-email').focus();
		return false;
	}
	// 验证邮箱正确性
	if(!checkEmail(email)){
		showErrorLeader($('#company-email-error'),'邮箱格式不正确!');
		$('#company-email').focus();
		return false;
	}
	if(address == '' || address == null || address == undefined){
		showErrorLeader($('#company-address-errors'),'请输入公司地址!');
		$('#company-address').focus();
		return false;
	}
	return true;
}

function checkStepTwo(){

			var business = getBusinessVal(); // 业务范围
			var teamDesc = $('#company-teamDesc').val().trim(); // 公司简介
			var scale = $('#company-scale').val().trim(); // 公司规模
            var demand = $('#company-demand').val().trim();

            	if(business == '' || business == null || business == undefined){
			    showErrorLeader($('#business-checkbox-error'),'请输入业务需求!');
				return false;
			}

				if(teamDesc == '' || teamDesc == null || teamDesc == undefined){
                showErrorLeader($('#company-teamDesc-error'),'请输入公司简介!');
				$('#company-teamDesc').focus();
				return false;
			}

				if(scale == '' || scale == null || scale == undefined){
                showErrorLeader($('#company-scale'),'请输入公司规模!');
				$('#company-scale').focus();
				return false;
			}

				if(demand == '' || demand == null || demand == undefined){
                showErrorLeader($('#company-demand-error'),'请输入需求!');
				$('#company-demand').focus();
				return false;
			}
			return true;
}

function getBusinessVal(){
	var busArr;
	var tags = $('.redTag');
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
				howErrorLeader($('.user-img-content'),'');
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