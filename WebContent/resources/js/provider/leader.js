 var step = 1;
 var curCount = 3;
 var InterValObj;
 
$().ready(function(){
	
	
	
	
	$('.dropdown li').on('click',function(){
        $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
        var info=parseInt($(this).attr('data-info'));
        $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-value",($(this).attr('data-value')));
        $(this).parent().slideUp();
        return false;
   });
  
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
	 
	 $('.getTag').on('click',function(){
        if($(this).hasClass('redTag')){
        	$(this).removeClass('redTag');
        }else{
        	$(this).addClass('redTag');
        }
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
      //	showStepThree();
      }
	 }
}


function resumeError(){

//		$('#company-name-error').hide();
//		$('#company-email-error').hide();
//		$('#company-linkman-error').hide();
//		$('#company-pwd-error').hide();
//		$('#company-webchat-error').hide();
//		$('#company-address-error').hide();
//		$('#company-qq-error').hide();
//	    $('#business-checkbox-error').hide();
//	    $('#company-teamDesc-error').hide();
//		$('#company-scale-error').hide();
//        $('#company-demand-error').hide();
        
        showError($('.input-group-div'),'');
        $('input').removeClass('errorL');
}

function showStepOne(){

	 $('.step-two-div').slideUp();
		setTimeout(function() {
			$('.step-one-div').slideDown();
		}, 500);
     $('#step-1').addClass('step-1');
     $('#step-2').removeClass('step-1');
}

function showStepTwo(){
	$('.step-one-div').slideUp();
	setTimeout(function() {
		$('.step-two-div').slideDown();
	}, 500);
 $('#step-2').addClass('step-1');
 $('#step-1').removeClass('step-1');
}

function showStepThree(){

	$('.step-two-div').slideUp();
	setTimeout(function() {
		$('.step-three-div').slideDown();
	}, 500);
 $('#step-2').removeClass('step-2');
 $('#step-3').addClass('step-3');
 SetLastTime();
}



function checkStepOne(){
   		    var name = $('#company-name').val().trim(); // 公司名称
			var email = $('#company-email').val().trim(); // 公司邮箱
			var linkman = $('#company-linkman').val().trim(); // 联系人
		//	var pwd = $('#company-pwd').val().trim();
			var webchat = $('#company-webchat').val().trim(); // 微信
			var qq = $('#company-qq').val().trim(); // QQ
			var address = $('#company-address').val().trim();

			
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
					showErrorLeader($('#company-qq-error'),'请输入QQ号码!');
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
//	$('input[name="business"]:checked').each(function(i){
//		if(0 == i){
//			busArr = this.value;
//		}else {
//			busArr += ',' + this.value;
//		}
//	});
	
	$('.redTag').each(function(i){
	if(0 == i){
		busArr = $(this).value;
	}else {
		busArr += ',' + $(this).value;
	}
   });
	
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
			priceRange : $('#company-priceRange option:selected').val(),
			infoResource : $('#company-infoResource option:selected').val(),
			teamProvince : $("#company-province").val(),
			teamCity : $("#company-city").val()
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

	      
		
		
			




