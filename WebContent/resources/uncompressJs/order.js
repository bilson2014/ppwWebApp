$().ready(function(){
	
	order.init();
	
});

var order = {
	init : function(){
		// 装载 联系人电话
		var telephone = $('#telephone').val();
		if(telephone != null && telephone != '' && telephone != undefined){
			$('#indent_tele').val(telephone);
		}
		
		// 注册下单按钮
		$('#order-btn').click(function(){
			if(checkData()){ // 检查数据完整性
				if(checkMobile($('#indent_tele').val())){ // 检查 是否 是手机号码
					$('#label-message').hide('normal');
					// 提交表单
					$('#order-form').attr('action',getContextPath() + '/order/submit').submit().remove();
				}else{
					$('#label-message').show('normal');
					$('#label-message').text('请输入正确的手机格式');
					return false;
				}
			}
			
		});
	}
}


//检查数据完整性
function checkData(){
	// 检查数据
	var contact = $('#indentName').val().trim();
	var contactTele = $('#indent_tele').val().trim();
	var flag = true;
	
	if(contact == '' || contact == null || contact == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入姓名');
		flag = false;
	}
	
	if(contactTele == '' || contactTele == null || contactTele == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入手机号码');
		flag = false;
	}
	
	return flag;
}

// 验证 手机号
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if(str.match(reg)){
		return true;
	} else{
		return false;
	}
}