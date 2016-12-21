var image_max_size = 1024*250; // 250KB
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function(){
	
	
	var upload = {
		init:function(){
			//初始化上传视频
			this.uploaderVideo();
		},
		uploaderVideo:function(){
			var _this = this;
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				pick : {
					id:'#upBtn',
					multiple :false//弹窗时不允许多选
				},
				fileSingleSizeLimit : video_max_size,
				accept :{
				    title: 'video',
				    extensions: 'mp4',
				    mimeTypes: 'video/mp4'
				}
			});
			upload_Video.on('fileQueued', function(file) {
				//跳转step2.添加信息
				_this.addProductMsg();
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				$(".progress-bar").css('width', percentage * 100 + '%');
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				$('.upIng').addClass("hide");
				$('.upSuccess').removeClass("hide");
				$('.upError').addClass("hide");
				//_this.saveOrModify(response.result);
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
						$('.error_upload').text('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						$('.error_upload').text(video_err_msg);
			        }else{
			        	$('.upIng').addClass("hide");
						$('.upSuccess').addClass("hide");
						$('.upError').removeClass("hide");
			        }
			});
		},
		addProductMsg:function(){
			$(".step1").addClass("hide");
			$(".step2").removeClass("hide");
		}
	}
	upload.init();
});
