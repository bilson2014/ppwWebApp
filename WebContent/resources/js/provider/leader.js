 var step = 1;
$().ready(function(){
  
    resumeError();
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

  

});

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
      	alert('success');
      }
	 }
}


function resumeError(){

		$('#company-name-error').hide();
		$('#company-email-error').hide();
		$('#company-linkman-error').hide();
		$('#company-webchat-error').hide();
		$('#company-phoneNumber-error').hide();
		$('#company-address-error').hide();
		$('#company-qq-error').hide();
	    $('#business-checkbox-error').hide();
	    $('#company-teamDesc-error').hide();
		$('#company-scale-error').hide();
        $('#company-demand-error').hide();
}

function showStepOne(){
  $('.step-one-div').addClass('hide');
  $('.step-two-div').removeClass('hide');
}

function showStepTwo(){
 $('.step-one-div').removeClass('hide');
 $('.step-two-div').addClass('hide');
}



function checkStepOne(){
   		    var name = $('#company-name').val().trim(); // 公司名称
			var email = $('#company-email').val().trim(); // 公司邮箱
			var linkman = $('#company-linkman').val().trim(); // 联系人
			var webchat = $('#company-webchat').val().trim(); // 微信
			var qq = $('#company-qq').val().trim(); // QQ
			var phoneNumber = $('#company-phoneNumber').val().trim();
			var address = $('#company-address').val().trim();

			
			if(name == '' || name == null || name == undefined){
				$('#company-name-error').show();
                $('#company-name-error').text('请输入公司名称!');
				$('#company-name').focus();
				return false;
			}

			if(linkman == '' || linkman == null || linkman == undefined){
				$('#company-linkman-error').show();
                $('#company-linkman-error').text('请输入联系人!');
				$('#company-linkman').focus();
				return false;
			}
			
			if(phoneNumber == '' || phoneNumber == null || phoneNumber == undefined){
				$('#company-phoneNumber-error').show();
                $('#company-phoneNumber-error').text('请输入联系号码!');
				$('#company-phoneNumber').focus();
				return false;
			}

			// 验证电话号码正确性
			if(!checkMobile(phoneNumber)){
				$('#company-phoneNumber-error').show();
                $('#company-phoneNumber-error').text('手机号码格式不正确');
				$('#company-phoneNumber').focus();
				return false;
			}

				if(webchat == '' || webchat == null || webchat == undefined){
				$('#company-webchat-error').show();
                $('#company-webchat-error').text('请输入微信号!');
				$('#company-webchat').focus();
				return false;
			}
			
			if(qq == '' || qq == null || qq == undefined){
			    $('#company-qq-error').show();
                $('#company-qq-error').text('请输入QQ号码!');
				$('#company-qq').focus();
				return false;
			}
			
			if(email == '' || email == null || email == undefined){
			    $('#company-email-error').show();
                $('#company-email-error').text('请输入公司邮箱!');
				$('#company-email').focus();
				return false;
			}
			
			// 验证邮箱正确性
			if(!checkEmail(email)){
				$('#company-email-error').show();
                $('#company-email-error').text('邮箱格式不正确!');
				$('#company-email').focus();
				return false;
			}

			if(address == '' || address == null || address == undefined){
			    $('#company-address-error').show();
                $('#company-address-error').text('请输入公司地址!');
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
			    $('#business-checkbox-error').show();
                $('#business-checkbox-error').text('请输入对客户的需求!');
				return false;
			}

				if(teamDesc == '' || teamDesc == null || teamDesc == undefined){
			    $('#company-teamDesc-error').show();
                $('#company-teamDesc-error').text('请输入公司简介!');
				$('#company-teamDesc').focus();
				return false;
			}

				if(scale == '' || scale == null || scale == undefined){
			    $('#company-scale-error').show();
                $('#company-scale-error').text('请输入公司规模!');
				$('#company-scale').focus();
				return false;
			}

				if(demand == '' || demand == null || demand == undefined){
			    $('#company-demand-error').show();
                $('#company-demand-error').text('请输入对客户的需求!');
				$('#company-demand').focus();
				return false;
			}
			return true;
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
			phoneNumber : $('#company-phoneNumber').val().trim()
		}));
	}
	
	
}





