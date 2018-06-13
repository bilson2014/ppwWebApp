//var upload_Video;
//var upload_Update;
//var image_max_size = 1024*1024; // 250KB
////头像裁剪参数 start
//var jcrop_api;
//var x;
//var y;
//var x2;
//var y2;
//var w;
//var h;
//var timer = null;
//var loadTime = 0;
//头像裁剪参数 end
$().ready(function() {
	imgUploads.init();
	//初始化jcrop
//	JcropFunction();
	
});
//文件批量上传
var imgUploads = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_Video && upload_Video.destroy();
			var picker =$('#morepeople'); 
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :10,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_Video.on('uploadProgress',function(file, percentage) {
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功了 图片');
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg();
					cutUpload(path);

				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_Video.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_Video.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传1M以内的图片');
			    }
			});
		}		
}
//
//function initCutImg(){
//	$('#modal-original-img').attr('style','');
//	var needWidth = 300;
//	var needHeight =300;
//	$('#modal-original-img').load(function(){
//		var img = new Image();
//		img.src = $('#modal-original-img').attr("src");
//		var realHeight = img.height;
//		var realWidth  = img.width;
//		if(realHeight>=realWidth){
//			$('.modal-original').attr('style',"height:300px;");
//			$('#modal-original-img').attr('style','height:100%;width:auto;');	
//			console.log($('#modal-original-img').width());
//			$('.modal-original').attr('style',"height:300px;width:"+$('#modal-original-img').width()+"px");
//		}else{
//			var paddingTop=(300-300*realHeight/realWidth)/2;
//			var num=parseInt(paddingTop);
//			
//			$('#modal-original-img').attr('style',"height:auto;width:100%;");
//			$('.modal-original').attr('style',"height:"+$('#modal-original-img').height()+"px;width:100%;margin-top:"+num+"px;");
//		}
//		JcropFunction();
//	 });
//}
////裁剪start
//function JcropFunction(){
//	x=0;
//	y=0;
//	x2=0;
//	y2=0;
//	h=0;
//	w=0;
//	// 初始化Jcrop
//	jcrop_api = $.Jcrop('#modal-original-img',{
//		bgOpacity : 0.2,
//		aspectRatio : 162/216,//选框宽高比。说明：width/height
//		onSelect : updateCoords // 当选择完成时执行的函数
//	});
//}
//function updateCoords(coords){
//	x=coords.x;//坐标位置x的开始位置
//	y=coords.y;//坐标位置y的开始位置
//	x2=coords.x2;//坐标x结束位置
//	y2=coords.y2;//坐标y结束位置
//	w=coords.w;//实际宽
//	h=coords.h;//实际高
//	if(parseInt(coords.w) > 0){
//		//计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到 
//		var rx = $(".modal-preview-container").width() / coords.w;
//		var ry = $(".modal-preview-container").height() / coords.h;
//		$("#modal-preview").attr('src',$('#modal-original-img').attr('src'));
//		//通过比例值控制图片的样式与显示 
//		$("#modal-preview").css({
//			width:Math.round(rx * $("#modal-original-img").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积 
//			height:Math.round(ry * $("#modal-original-img").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积 
//			marginLeft:"-" + Math.round(rx * coords.x) + "px",
//			marginTop:"-" + Math.round(ry * coords.y) + "px",
//			opacity:1,
//		});
//	}
//}
////裁剪end
//function cutUpload(path){
//	// 点击确定，裁剪文件，并将该文件转化为正规的文件名称
//	$('#uploadConfirmBt').unbind('click');
//	$('#uploadConfirmBt').bind('click',function(){
//		if(x == 0 && y == 0 && x2 ==0 && y2 ==0){
//			jcrop_api.destroy();
//			$('#uploadConfirmBt').attr('disabled',false);
//			$("#mymodal").hide;
//			return;
//		}
//		$('#uploadConfirmBt').attr('disabled','disabled');
//		// 裁剪图片
//		loadData(function(userTarget){
//			console.log(userTarget);
//			if(userTarget.code == 200){
//				jcrop_api.destroy();//销毁
//				$('#uploadConfirmBt').attr('disabled',false);
//				$("#mymodal").hide();
//				var imgPath = getResourcesName() + userTarget.result;
//				console.log(imgPath);
//				
//				$('.fileimg').attr('src',getResourcesName()+userTarget.result);
//				if($('.reupload').length>0){
//					console.log('不加');
//					
//				}else {
//					$('.updateimg').after("<div class='reupload'>重新上传</div>");
//				}
//				
//				
//				
//				$('#modal-preview').attr('src','');
////				$("#setImg").prepend(juicer(videoList_tpl.upload_Tpl,{file:imgPath,path:userTarget.result}));
////				delImgEven();
//			}else{
//				jcrop_api.destroy();
//				$('#uploadConfirmBt').attr('disabled',false);
//				$("#mymodal").hide();
//				successToolTipShow('图片异常请重新上传');
//			}
//		}, getContextPath() + '/web/cutPhoto', $.toJSON({
//			imgUrl : path,
//			x : x,
//			y : y,
//			x2 : x2,
//			y2 : y2,
//			width : w,
//			height : h,
//			originalWidth : $("#modal-original-img").width(),
//			originalHeight : $("#modal-original-img").height()
//		}));
//	});
//}
//
////删除图片
//function delImgEven(){
//	
////	$('.delLoadImg').off('click').on('click',function(){
////		var thiItem = $(this);
////		var path = $(this).parent().attr('data-id');
////		
////		$('#checkSureModel').show();
////		$('.closeBtn,#cModel').off('click').on('click',function(){
////			$('#checkSureModel').hide();
////		});
////		$('#tModel').off('click').on('click',function(){
////			delImgGroup += path +';';
////			thiItem.parent().parent().remove();
////		});
////		
////	})
//	
//}