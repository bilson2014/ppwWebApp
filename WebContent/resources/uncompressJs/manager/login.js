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
				}else {
					$('.tooltip-message-recover').text(result.message);
					$('.tooltip-show-recover').slideDown('normal');
					window.setInterval(hideTooltipRecover, 4000);
				}
			}, getContextPath() + '/mgr/doLogin', $.toJSON({
				managerLoginName : $('#loginName').val().trim(),
				managerPassword : Encrypt($('#pwd').val().trim())
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