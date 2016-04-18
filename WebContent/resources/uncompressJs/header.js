$().ready(function(){
	
	initData(); // 数据初始化
	
	// 登出操作
	$('#loginoutBt').on('click',function(){
		WB2.logout(function(){
			
		});
		
		QC.Login.signOut();
	});
});

// 数据初始化
function initData(){
	var imgPath = $('#user-img').val();
	if(imgPath != null && imgPath != '' && imgPath != undefined){
		if(imgPath.indexOf('http') > -1){
			// 第三方登录
			$('.img-circle').attr('src',imgPath);
		}else{
			// 自定义图片
			var imgName = getFileName(imgPath);
			var img_Path = getHostName() + '/user/img/' + imgName;
			$('.img-circle').attr('src',img_Path);
		}
	}
}