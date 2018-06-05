$().ready(function() {
	
	peoplechengck();
	gathermethod();
	userpicInfo();
});


function init(){
	
	
}

//角色选择
function peoplechengck(){
	$('.check').off('click').on('click',function(){
		$('.morecheck').show();
	});
	$('.more').off('click').on('click',function(){
		$('.morecheck').show();
	});

	$('.morecheck span').off('click').on('click',function(){
		$('.morecheck').hide();
		$('.check').text($(this).text());
	});
	//addpeople的确认 和取消
	$('.addpeople .sure').off('click').on('click',function(){
		if ($('.check').text()=='演员'){
			$('.addpeople').hide();
			$('.staffbox').show();
			//提前加载图片
			imgcheckpeoplefive();
	
		}else if($('.check').text()=='导演'){
			$('.addpeople').hide();
 
		}
	});
	$('.addpeople .cancel,.gatherbut .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.addpeople').hide();
		$('.staffbox').hide();
	});
	
}
//创建演员
function gathermethod(){
//	userpicInfo() ;
	//关闭弹框
	$('.stafftitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.staffbox').hide();	
	});
	//下拉框出现(性别、种族、城市)
	$('.gatherleft .gendergather,.gatherleft .genderimg').off('click').on('click',function(){
		$('.twocheck').show();	
	});
	$('.twocheck p').off('click').on('click',function(){
		$('.gendergather').text($(this).text());
		$('.twocheck').hide();
	});
	$('.gatherleft .racegather,.gatherleft .raceimg').off('click').on('click',function(){
		$('.racecheck').show();
	});
	$('.racecheck p').off('click').on('click',function(){
		$('.racegather').text($(this).text());
		$('.racecheck').hide();
	});
	$('.gatherleft .citygather,.gatherleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
	});
	$('.citycheck p').off('click').on('click',function(){
		$('.citygather').text($(this).text());
		$('.citycheck').hide();
	});
	//图片的操作
	$('.imgsboxs').off('mouseover').on('mouseover',function(){
		$(this).find('.imgshade ').show();
	});
	$('.imgsboxs').off('mouseout').on('mouseout',function(){
		$(this).find('.imgshade ').hide();
	});
	//提交
	$('.gatherbut .sure').off('click').on('click',function(){
		var namegather=$('.namegather').val();
		var gendergather=$('.gendergather').text();
		var oldgather=$('.oldgather').val();
		var racegather=$('.racegather').text();
		var citygather=$('.citygather').text();
		var pricegather=$('.pricegather').val();
		$('.namegatherp').text('');
		$('.oldgatherp').text('');
		$('.pricegatherp').text('');
		$('.gendergatherp').text('');
		$('.racegatherp').text('');
		$('.citygatherp').text('');
//		console.log(namegather);
//		console.log(gendergather);
//		console.log(oldgather);
//		console.log(racegather);
//		console.log(citygather);
//		console.log(pricegather);
		if (namegather==undefined||namegather==null||namegather==''){
			$('.namegatherp').text('*姓名不能为空');
			return false;
		}else if(gendergather=='请选择性别'){
			$('.gendergatherp').text('*请选择性别');
			return false;
		}else if (oldgather==undefined||oldgather==null||oldgather==''){
			$('.oldgatherp').text('*出生年份不能为空');
			return false;
		}else if(racegather=='请选择种族'){
			$('.racegatherp').text('*请选择种族');
			return false;
		}else if(citygather=='请选择城市'){
			$('.citygatherp').text('*请选择城市');
			return false;
		}else if (pricegather==undefined||pricegather==null||pricegather==''){
			$('.pricegatherp').text('*价格不能为空');
			return false;
		}else {
			console.log('验证正确');
			
			
		}
		
	});
	
	
}




////图片上传
function userpicInfo() {
	uploader && uploader.destroy();
	uploader = WebUploader.create({
		auto : true,
//		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/web/upload',
		pick : '.addimgs',
		accept : {
			title : 'Images',
			extensions : 'jpg,png',
			mimeTypes : 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024 * 2048,
		duplicate : true
	// 允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file, response) {
		var path = response.value;
		console.log(path);
		if (path != '' && path != null) {
//			if (path.indexOf('false@error') > -1) {
//				if (path.indexOf("error=1") > -1) {
//					$('#safeError').text("文件超过最大限制");
//				} else if (path.indexOf("error=2") > -1) {
//					$('#safeError').text("格式不正确");
//				}
//			} else {
//				$('#user_img_url').val(path);
//				var img = getDfsHostName() + path;
//				$('#user-img').attr('src', img);
//				$('#safeError').text("");
//			}
			
		} else {
		    $('#safeError').text("上传失败!");
		}
	});
	uploader.on('error', function(type) {
		if (type == "Q_TYPE_DENIED") {
			$('#safeError').text("格式不正确");
		} else if (type == "F_EXCEED_SIZE") {
			$('#safeError').text("文件超过最大限制");   			
		}
	});
}
