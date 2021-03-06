var image_max_size = 10 * 1024 * 1024; // 10M 
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出10M上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var curCount = 3;
var InterValObj;
$().ready(function(){
	
	$('#checkbtn').off('click').on('click',function(){
		 window.history.go(-1);
	});
	var upload = {
		init:function(){
			//初始化上传视频
			this.uploaderVideo();
			//初始化创作时间和tag标签
			this.initPage();
			//初始化上传图片
			this.uploaderPic();
			$('#upBtnImg').off('click').on('click',function(){
				  $('#upBtn').click();
			});
		},
		uploaderVideo:function(){
			var _this = this;
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/save/product/info',
				pick : {
					id:'#upBtn',
					multiple :false//弹窗时不允许多选
				},
				timeout:0,
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
				if(response.code == 1){
					$('.upIng').addClass("hide");
					$('.upSuccess').removeClass("hide");
					$('.upError').addClass("hide");
					$("#productId").val(response.result);
					$(".stateInfo").addClass("hide");
				}else{
					$('.upIng').addClass("hide");
					$('.upSuccess').addClass("hide");
					$('.upError').removeClass("hide");
				}
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
		},
		initPage:function(){
			$('#findEx').on('click',function(){
				$('#tooltip-warn-banner').show();
			});
			$('#closeBanner').on('click',function(){
				$('#tooltip-warn-banner').hide();
			});
			$('#creationTime').datepicker({
				language: 'zh',
				dateFormat:'yyyy-MM-dd',
				maxDate: new Date(),
				autoClose:true
			});
			if(!$("#creationTime").val()){
				$("#creationTime").val(new Date().Format("yyyy-MM-dd"));
			}
			
		},
		uploaderPic:function(){
			var _this = this;
			uploader_Pic = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/update/product/flow/info',
				pick : {
					id:'#upBtn-pic',
					multiple :false//弹窗选文件时，不允许多选
				},
				resize : false,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				fileNumLimit : 1,//最多上传一个文件
				fileSingleSizeLimit : image_max_size,
				accept :{
					title: 'Images',
					extensions: 'jpg,png,jpeg',
					mimeTypes: 'image/jpeg,image/png'
				}
			});
			uploader_Pic.on('beforeFileQueued', function(file) {
				  //选中前触发，移除了所有的文件
				 //删除所有文件,值上传一个
				 var array = uploader_Pic.getFiles();
				 for(var i=0;i<array.length;i++){
					 uploader_Pic.removeFile( array[i] );
				 }
			});
			uploader_Pic.on('fileQueued', function(file) {
				var $img = $("#LDimg");
				// 创建缩略图
				// 如果为非图片文件，可以不用调用此方法。
				// thumbnailWidth x thumbnailHeight 为 100 x 100
				uploader_Pic.makeThumb( file, function( error, src ) {
					if ( error ) {
						$img.replaceWith('<span>不能预览</span>');
						return;
					}
					$img.attr( 'src', src );
				}, 130, 100 );
				$("#pic-LD-url").attr("data-change","1");//添加图片更换状态
				$("#img-error").text("");
			});
			uploader_Pic.on('uploadSuccess', function(file,response) {
				if(response.code==1){
					$(".step2").addClass("hide");
					$(".step3").removeClass("hide");
					SetLastTime();
					$('#toPortal').off('click').on('click',function(){
						window.location.href=getContextPath() + $('#flowExecutionUrl').val() + '&_eventId=save';
					});
				}else{
					$("#img-error").text(response.result);
				}
				
			});
			uploader_Pic.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					$("#img-error").text('格式不正确');
				}else if(type=="F_EXCEED_SIZE"){
					$("#img-error").text(image_err_msg);
				}
			});
			_this.submit();
		},
		submit:function(){
			var _this = this;
			$('#infoBt').off("click").on('click', function() {
				var picLDChange = $("#pic-LD-url").data("change");
				var picImgUrl = $("#pic-LD-url").val();
				if(checkData()){ // 检验数据完整性
					if(picImgUrl != '' && picLDChange == 0){//修改作品，作品有图片且无更换时
						_this.modifyProduct();//ghost用户在有图片的情况下修改作品且没有更换图片
					}else{
						//webupload启动提交
						uploader_Pic.option('formData',{
							productId:$("#productId").val(),
							productName:$("#video-name").val(),
							creationTime:$("#creationTime").val()
						});
						uploader_Pic.upload();
					}
				}
			});
		},
		modifyProduct:function(){
			$.ajax({
				url : '/provider/update/product/flow/info',
				type : 'POST',
				data : {
					productId:$("#productId").val(),
					productName:$("#video-name").val(),
					creationTime:$("#creationTime").val()
				},
				dataType : 'json',
				success : function(data){
					$(".step2").addClass("hide");
					$(".step3").removeClass("hide");
					SetLastTime();
					$('#toPortal').off('click').on('click',function(){
						window.location.href=getContextPath() + $('#flowExecutionUrl').val() + '&_eventId=save';
					});
				},
				error : function() {
					alert(error);
				}
			});
		}
	}
	upload.init();
	
});

function checkData(){
	var productId = $("#productId").val();
	var productName = $("#video-name").val();
	var creationTime = $("#creationTime").val();
	var picLDChange = $("#pic-LD-url").attr("data-change");
	var picImgUrl = $("#pic-LD-url").val();
	resumeCommonError($(".proItem"),'');
	if(productName == null || productName == undefined || productName == ''){
		showCommonError($('#video-name-error'),"请输入作品名称");
		return false;
	}
	if(creationTime == null || creationTime == undefined || creationTime == ''){
		showCommonError($('#creationTime-error'),"请输入创作时间");
		return false;
	}
	if(picImgUrl == '' && picLDChange != 1){//ghost用户可以修改各种状态下的作品
		$("#img-error").text("请上传视频封面");
		return false;
	}
	if(productId == 0){
		return false;
	}
	return true;
}

function SetLastTime(){
    $('#lasttime').text(curCount); 
    $('#lasttime').attr('disabled','disabled');
    InterValObj = window.setInterval(SetRemainTime, 1000);  
}
function SetRemainTime(){
if(curCount == 0){
	window.clearInterval(InterValObj); // 停止计时器
	window.location.href = getContextPath() + $('#flowExecutionUrl').val() + '&_eventId=save';
}
else{
	  curCount--;
	 $('#lasttime').text(curCount); 
}
}