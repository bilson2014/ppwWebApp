var PopInterValObj,oTimer,successIntervalObj; // timer变量，控制时间
var image_max_size = 1024*250; // 250KB
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var editor;
var flag = 3;//作品状态
$().ready(function(){
	var upload = {
		init:function(){
			//初始化图片uploader
			this.uploaderPic();
			//初始化视频上传
			this.uploaderVideo();
		},
		uploaderVideo:function(){    
			var _this = this;
			var action = $('#action').val();
			upload_Video = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				pick : {
					id:'#uploadVideoBt',
					multiple :false
				},
				fileNumLimit : 1,
				fileSingleSizeLimit : video_max_size,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				formData : {oldUrl:$("#videoUrl").val()},
				accept :{
				    title: 'video',
				    extensions: 'mp4',
				    mimeTypes: 'video/mp4'
				}
			});
			upload_Video.on('beforeFileQueued', function(file) {
				 //删除所有文件,值上传一个
				 var array = upload_Video.getFiles();
				 for(var i=0;i<array.length;i++){
					 upload_Video.removeFile( array[i] );
				 }
			});
			upload_Video.on('fileQueued', function(file) {
				$('#videoLabel').hide();
				$("#videoName").text(file.name);
				$("#video-change").val(1);//更换了video
			});
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				if($('.progress-bar-success').text()==''){
					$('#mymodal').modal('show');
					$('.progress-bar-success').text('0')
					$('.progress-bar-success').attr('aria-valuenow','0').css({"width":'0%'});
				}
				$('.progress-bar-success').text('已完成' + Math.round((percentage*100)) + '%')
				$('.progress-bar-success').attr('aria-valuenow',(percentage*100)).css({"width":percentage*100+'%'});
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				_this.saveOrModify(response.result);
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	$('#videoLabel').show();
						$('#videoLabel').text('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
			        	$('#videoLabel').show();
						$('#videoLabel').text(video_err_msg);
			        }
			});
			_this.submit();
		},
		//点击保存按钮
		submit:function(){
			var _this = this;
			$('#saveBt').off("click").on('click', function() {
				flag = 3;//保存状态
				dealProduct();
			});
			$('#submitBt').off("click").on('click', function() {
				flag = 0;//审核中状态
				dealProduct();
			});
			function dealProduct(){
				var action = $('#action').val();
				var change = $("#video-change").val();
				if(checkData()){ // 检验数据完整性
					$('#warmModel').modal('show');
					$('#sureUpdate').off('click').on('click',function(){
						$('#warmModel').modal('hide');
						if(action == 'modify' && change == 0){//修改状态,且视频无修改,此时不需要上传视频
							_this.saveOrModify();
						}else{
							//webupload启动提交
							upload_Video.upload();
						}
					});
				}
			}
		},
		saveOrModify:function(videoUrl){
			var url;
			var action = $('#action').val();
			if(action == 'upload'){
				url = '/provider/save/product/info';
			}
			if(action == 'modify'){
				url = '/provider/update/product/info';
			}
			loadData(function(data){
				if(videoUrl){//说明是dfs返回值,此时代表有视频上传
					// 文件验证通过，则隐藏提示信息
					$('#imageLabel').hide();
					$('#videoLabel').hide();
					$('#mymodal-body').empty();
					$alert = '<div class="alert alert-success" role="alert">信息保存成功</div>';
					$('#mymodal-body').append($alert);
					$footer = '<div class="modal-footer">';
					$footer += '<button type="button" class="btn btn-default" data-dismiss="modal" id="modelBT">确定</button>';
					$footer += '</div>';
					$('#mymodal-content').append($footer);
					// 注册 模态框 确认点击事件
					$('#modelBT').on('click',function(){
						$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/video-list');
					});
				}else{//没有修改视频
					// 显示保存成功
					successToolTipShow();
				}
			}, getContextPath() + url ,$.toJSON({
				'productId' : $('#p-id').val().trim(),
				'flag':flag,
				'teamId' : $('#company-id').val(),
				'productName' : $('#video-name').val().trim(),
				'creationTime' : $('#creationTime').val(),
				'picLDUrl' : $("#video-picLDUrl").val(),
				'videoUrl' : videoUrl
			}));
		},
		
		uploaderPic:function(){
			var _this = this;
			uploader_LD = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				pick : '#uploadLDBt',
				resize : false,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				fileSingleSizeLimit : image_max_size,
				formData : {oldUrl:$("#video-picLDUrl").val()},//参数
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			uploader_LD.on('fileQueued', function(file) {
				$('#imageLabel-LD').hide();
		    	var $img = $("#LDImg");
		        // 创建缩略图
		        // 如果为非图片文件，可以不用调用此方法。
		        // thumbnailWidth x thumbnailHeight 为 100 x 100
		    	$("#video-picLD-div").show();
		    	uploader_LD.makeThumb( file, function( error, src ) {
		            if ( error ) {
		                $img.replaceWith('<span>不能预览</span>');
		                return;
		            }
		            $img.attr( 'src', src );
		        }, 130, 100 );
			});
			uploader_LD.on('uploadSuccess', function(file,response) {
				if(response.code==0){//上传成功
					$("#video-picLDUrl").val(response.result);
				}
			});
			uploader_LD.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	$('#imageLabel-LD').show();
						$('#imageLabel-LD').text('请上传图片格式');
			        }else if(type=="F_EXCEED_SIZE"){
			        	$('#imageLabel-LD').show();
						$('#imageLabel-LD').text(image_err_msg);
			        }
			});
		},
	}
	upload.init();
	$('#creationTime').datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		maxDate: new Date() 
	});
	cancleUpdate();
	var action = $('#action').val();
	// 注册变更模式
	if(action == 'upload'){
		$('#video-picLD-div').hide();
	}else if(action == 'modify'){
		// 显示封面
		var picLDUrl = $('#video-picLDUrl').val();
		if(picLDUrl != '' && picLDUrl != null){
			// 上传过封面
			$('#video-picLD-div').show();
			var picLDPath = getDfsHostName() + picLDUrl;
			$('#LDImg').attr('src',picLDPath);
		}else{
			// 显示请上传图片
			$('#video-picLD-div').hide();
		}
	}
	
	$('.exampleUrl').on('click',function(){
		var name = $(this).data('href');
		var width = $(this).data('width');
		var height = $(this).data('height');
		$('#previewImg').attr('src', name);
		$('#previewImg').css({'width':width + 'px','height':height + 'px'});
		$('#photoModel-content').css({'width':'680px','height':'420px'});
		$('#photoModel-dialog').css({'margin':'30px auto'});
		$('#photoModel').modal('show');
	});
});

// 检测数据的完整性
function checkData(){
	var name = $('#video-name').val().trim(); // 视频名称
	var creationTime = $('#creationTime').val();//创作时间
	if(name == '' || name == null || name == undefined){
		popshow('video-name', '请输入视频标题!');
		$('#video-name').focus();
		return false;
	}
	if(creationTime == '' || creationTime == null || creationTime == undefined){
		popshow('creationTime', '请填写创作时间!');
		$('#creationTime').focus();
		return false;
	}
	var LDImg = $('#video-picLDUrl').val(); // 封面图
	if(LDImg == '' || LDImg == null || LDImg == undefined){
		if($('#picLDFile').val() == null || $('#picLDFile').val() == ''){
			popshow('uploadLDBt', '请上传封面!');
			return false;
		}
	}
	if($("#videoUrl").val() == '' && $("#video-change").val()==0){
		popshow('uploadVideoBt', '请上传视频!');
		return false;
	}
	return true;
}


//初始化弹出框
function popshow(id,content){
	window.clearInterval(PopInterValObj); // 停止计时器
	$('#' + id).popover({
		placement : 'bottom',
		content : content,
		trigger : 'manual',
		delay: { show: 200, hide: 100 }
	}).popover('show');
	
	PopInterValObj = window.setInterval(function(){
		$('#' + id).popover('hide');
	}, 2000);
}

//成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideSuccessTooltip(){
	$('.tooltip-success-show').hide('normal');
}
function cancleUpdate(){
	$('#cancleUpdate').on('click',function(){
		$('#warmModel').modal('hide');
	});
}
$('#backBt').on('click',function(){
	$('.menu-content li:eq(1)', parent.document).click();
});
