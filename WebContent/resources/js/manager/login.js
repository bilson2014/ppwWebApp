$().ready(function(){
	
	
	login.doLogin();
});

var login = {
	doLogin : function(){
		$('#loginbtn').unbind('click');
		$('#loginbtn').bind('click',function(){
			// 登陆
			// TODO 数据验证
			loadData(function(result){
				if(result.ret){
					// 跳转
					$('#login-form').attr('action',getContextPath() + '/mgr/index').submit().remove();
				}else {
					alert(result.message);
				}
			}, getContextPath() + '/mgr/doLogin', $.toJSON({
				managerLoginName : $('#loginName').val().trim(),
				managerPassword : Encrypt($('#pwd').val().trim())
			}));
		});
	}
}