$().ready(function(){
	order.order();
});

var order = {
	order : function(){
		$('#order-btn').click(function(){
			// 检查数据是否完成
			if(checkData()){
				if(checkMobile($('#indent_tele').val())){ // 检查 是否 是手机号码
					$('#label-message').hide('normal');
					// 提交表单
					$('#order-form').attr('action',getContextPath() + '/phone/salesman/order/submit').submit().remove();
				}else {
					$('#label-message').show('normal');
					$('#label-message').text('请输入正确的手机格式');
					return false;
				}
			}
		});
	}
}

function checkData(){
	// 检查数据
	var contactTele = $('#indent_tele').val().trim();
	var flag = true;
	
	if(contactTele == '' || contactTele == null || contactTele == undefined){
		$('#label-message').show('normal');
		$('#label-message').text('请输入手机号码');
		flag = false;
	}
	
	return flag;
}