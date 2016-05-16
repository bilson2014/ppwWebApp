 var step = 1;
 var curCount = 3;
 var InterValObj;
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

	 $('#to-top').on('click',function(){
         step=1;
         window.location.href=getContextPath() + '/provider/portal';
	});

    

     

  

});


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
      	showStepThree();
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
	 $('.step-one-div').removeClass('hide');
     $('.step-two-div').addClass('hide');
     $('#step-bar').removeClass('step-2');


    
}

function showStepTwo(){
  $('.step-one-div').addClass('hide');
  $('.step-two-div').removeClass('hide');
  $('#step-bar').addClass('step-2');
}

function showStepThree(){

 $('.step-two-div').addClass('hide');
 $('.step-three-div').removeClass('hide');
 $('#step-bar').removeClass('step-2');
 $('#step-bar').addClass('step-3');
 SetLastTime();
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
                $('#company-phoneNumber-error').text('号码格式不正确');
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
                $('#business-checkbox-error').text('请输入业务需求!');
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
                $('#company-demand-error').text('请输入需求!');
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
	
		var teamId = $('#unqiueId').val();

		if(teamId != undefined && teamId != ''){
			loadData(function(flag){
			
		}, getContextPath() + '/provider/update/teamInfomation', $.toJSON({
			teamId : teamId, 
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
			priceRange : $('#company-priceRange option:selected').val(),
			infoResource : $('#company-infoResource option:selected').val(),
			phoneNumber : $('#company-phoneNumber').val().trim()
		}));
	}

	else{
		window.location.href=getContextPath() + '/provider/portal';
	}
}

	      
		
		
			




