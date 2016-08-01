var userType;
var updatePwd ;
$().ready(function(){
	var upd = {
		init:function(){
			var loginName = $('#loginName').val().trim();
			userType = $('#userType').val().trim();
			if(loginName == '' || loginName == null || loginName == undefined){
				updatePwd = false;
				$('#executeBtn').on('click',upd.addAccount);
				$('#loginName').on('change',upd.loginNameVerify);
			}else{
				$('#loginName').attr('readonly','readonly');
				updatePwd = true;
				$('#executeBtn').on('click',upd.updPwd);
			}
			
		},
		updPwd:function(){ //修改密码
			var id = $('#userId').val().trim();
			var loginName = $('#loginName').val().trim();
			var password = $('#comfrimPassword').val().trim();
			if(checkData()){
				if(userType == 'role_customer'){
					loadData(function(flag){
						upd.returnRes(flag);
					}, getContextPath() + '/user/modify/password', $.toJSON({
						id : id,
						password : Encrypt(password),
					}));
				}else if(userType == 'role_provider'){
					// 修改密码
					loadData(function(flag){
						upd.returnRes(flag);
					}, getContextPath() + '/provider/recover/password', $.toJSON({
						loginName : loginName,
						password : Encrypt(password)
					}));
				}
			}
		},
		addAccount:function (){ // 新增用户名密码
			var id = $('#userId').val().trim();
			var loginName = $('#loginName').val().trim();
			var password = $('#comfrimPassword').val().trim();
			if(checkData()){
				if(userType == 'role_customer'){
					loadData(function(flag){
						if(flag.errorCode == 200){
							upd.returnRes(true);
						}else{
							upd.returnRes(false);	
						}
					}, getContextPath() + '/login/modify/logName2', $.toJSON({
						id : id,
						password : Encrypt(password),
						loginName : loginName
					}));
				}else if(userType == 'role_provider'){
					// 检验当前密码是否正确
					loadData(function(flag){
						upd.returnRes(flag);
					}, getContextPath() + '/provider/add/account2', $.toJSON({
						loginName : loginName,
						password : Encrypt(password),
						teamId : id
					}));
				}
			}
		},
		returnRes:function(res){
			if(userType == 'role_customer'){
				if(res){
					window.location.href=getContextPath()+'/mgr/index';
				}else{
					$('#updateerror').removeClass('hide');
				}
			}else if(userType == 'role_provider'){
				if(res){
					window.location.href=getContextPath()+'/provider/portal';
				}else{
					$('#updateerror').removeClass('hide');
				}
			}
		},
		loginNameVerify:function(){
			var loginName = $('#loginName').val();
			if(userType == 'role_customer'){
				loadData(function(flag){
					if(flag){
						$("#errorloginName").removeClass('hide');
						$("#errorloginName").text('用户名已经重复过请更换用户名！');
						$('#errorloginName').focus();
					}else{
						$("#errorloginName").addClass('hide');
					}
				}, getContextPath() + '/login/validation/userName', $.toJSON({
					loginName : loginName
				}));
			}else if(userType == 'role_provider'){
				loadData(function(flag){
					if(!flag){
						$("#errorloginName").removeClass('hide');
						$("#errorloginName").text('用户名已经重复过请更换用户名！');
						$('#errorloginName').focus();
					}else{
						$("#errorloginName").addClass('hide');
					}
				}, getContextPath() + '/provider/checkExisting', $.toJSON({
					loginName : loginName
				}));
			}
		}
	};
	upd.init();
});
function  checkData(){
	var loginName = $('#loginName').val().trim();
	var password = $('#password').val().trim();
	var comfrimPassword = $('#comfrimPassword').val().trim();
	
	if(loginName == null || loginName == ''){
		var errorpassword = $('#errorloginName');
		errorpassword.removeClass('hide');
		errorpassword.text('*请输入用户名');
		return false;
	}else{
		$('#errorloginName').addClass('hide');
	}
	
	if(!updatePwd){
		var x ;
		if(userType == 'role_customer'){
			syncLoadData(function(flag){
				if(flag){
					$("#errorloginName").removeClass('hide');
					$("#errorloginName").text('*用户名已经重复过请更换用户名！');
					$('#errorloginName').focus();
					x = true;
				}else{
					$("#errorloginName").addClass('hide');
					x= false;
				}
			}, getContextPath() + '/login/validation/userName', $.toJSON({
				loginName : loginName
			}));
		}else if(userType == 'role_provider'){
			syncLoadData(function(flag){
				if(!flag){
					$("#errorloginName").removeClass('hide');
					$("#errorloginName").text('*用户名已经重复过请更换用户名！');
					$('#errorloginName').focus();
					x = true;
				}else{
					x= false;
					$("#errorloginName").addClass('hide');
				}
			}, getContextPath() + '/provider/checkExisting', $.toJSON({
				loginName : loginName
			}));
		}
		if(x)
			return false;
	}
	
	if(password == null || password == ''){
		var errorpassword = $('#errorpassword');
		errorpassword.removeClass('hide');
		errorpassword.text('*请输入密码 ');
		return false;
	}else{
		$('#errorpassword').addClass('hide');
	}
	if(password.length < 6){
		var errorpassword = $('#errorpassword');
		errorpassword.removeClass('hide');
		errorpassword.text('*密码长度必须大于6位 ');
		return false;
	}else{
		$('#errorpassword').addClass('hide');
	}
	if(comfrimPassword != password){
		$('#errorcomfrimPassword').removeClass('hide');
		$('#errorcomfrimPassword').text('*两次密码输入不一致！');
		return false;
	}else{
		$('#errorcomfrimPassword').addClass('hide');
	}
	return true;
}
