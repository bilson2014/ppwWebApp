$().ready(function(){
	
	
	login.doLogin();
	showForget.doshowForget();
});

var login = {
	doLogin : function(){
		$('#loginbtn').unbind('click');
		$('#loginbtn').bind('click',function(){
			// 登陆
			loadData(function(result){
				if(result.ret){
					// 跳转
					$('#login-form').attr('action',getContextPath() + '/mgr/index').submit().remove();
					$('#pwdId').addClass('hide');
				}else {
//					$('.tooltip-message-recover').text(result.message);
//					$('.tooltip-show-recover').slideDown('normal');
//					window.setInterval(hideTooltipRecover, 4000);
					$('#pwdId').text(result.message);
					$('#pwdId').removeClass('hide');
				}
			}, getContextPath() + '/mgr/doLogin', $.toJSON({
				employeeLoginName : $('#loginName').val().trim(),
				employeePassword : Encrypt($('#pwd').val().trim())
			}));
		});
	}
}

var showForget = {

     doshowForget : function(){
     	$('#forget').on('click',function(){
            $('.login-div'). addClass('hide');
            $('.forget-div').removeClass('hide');
     	});
     }

}

function hideTooltipRecover(){
	$('.tooltip-show-recover').hide('normal');
}