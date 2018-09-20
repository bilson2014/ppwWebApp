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
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
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
