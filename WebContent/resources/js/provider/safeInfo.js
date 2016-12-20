$().ready(function() {
	init();
});

function init(){
	var noraml = $('#normal');
	var userName = $('#userName');
	var userPassWord = $('#userPassWord');
	$('#toUserName').on('click',function(){
		noraml.hide();
		userPassWord.show();
	});
	
	$('#nameReturn').on('click',function(){
		noraml.show();
		userName.hide();
	});
	
	$('#toUserPassWord').on('click',function(){
		noraml.hide();
		userName.show();
	});
	
	$('#pwdReturn').on('click',function(){
		noraml.show();
		userPassWord.hide();
	});
	
	
	
	
	
	
	
};