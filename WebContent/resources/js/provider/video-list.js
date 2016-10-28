var type; // 供应商类型
$().ready(function(){
	// 注册分享
	video.share();
	
	video.register();
	
	//video.initUploadify();
	video.webupload();
	
	$('.media-object').on('click',function(){
		var videoUrl = $(this).next('input').val();
		var picUrl = $(this).attr('scr');
		$('#videoModal').modal();
		//修改为DFS路径
		//var videoName = getFileName(videoUrl);
		//var videoPath = getHostName() + '/product/video/' + videoName;
		var videoPath = getDfsHostName() + videoUrl;
		//修改为DFS end
		// 装配视频
		$('#videoModal').find('video').attr('src',videoPath);
		$('#videoModal').find('video').attr('poster',picUrl);
	});
	
	$('#video-close').on('click',function(){
		//$('#videoModal').modal('hide');
		// 关闭视频
		$('#videoModal').find('video').attr('src','');
		$('#videoModal').find('video').attr('poster','');
	});
});

var video = {
		register : function() {
			$('.btn-update').on('click',modify); // 注册修改事件
			$('.btn-danger').on('click',delProduct); // 注册 删除事件
			$('.btn-setMaster').on('click',setMaster);
			// 注册 上传 按钮点击事件
			$('#uploadBt').on('click',function(){
				$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/product/upload/' + $('#company-key').val() + '/0');
			});
		},
		share : function(){ // 分享
			$('.share').on('click',function(){
				var shareUrl = 'http://www.apaipian.com/play/' + $('#company-key').val() + '_' + $(this).data('no') + '.html';
				var share_title = $(this).parent().parent().parent().find('.media-heading').text().split('标题：')[1];
				var imgUrl = $(this).parent().parent().parent().parent().find('.media-object').attr('src');
				var imgPath = '';
				if(imgUrl != undefined && imgUrl != null){
					//var img_Name = getFileName(imgUrl);
					//imgPath = getHostName() + '/product/img/' + img_Name;
					var imgPath = imgUrl;
				}
				
				share.init(shareUrl, share_title, imgPath);
			});
		},
		webupload:function(){
			$('#multipModal').on('shown.bs.modal', function (e) {
				webupload({
					 server: '/provider/multipUploadFile',//url
					 pick: '#picker',//点击弹窗
					 submitBtn:'#submit-multip',
					 fileQueued:function(file){//选中后执行
						$('#thelist').append('<div id="' + file.id + '" class="item">'
										+ '<h4 class="info">' + file.name + '</h4>'
										+ '<p class="state">等待上传...</p>' + '</div>');
					 },
					 uploadProgress:function(file, percentage){
						 var $li = $('#' + file.id), $percent = $li
							.find('.progress .progress-bar');
							// 避免重复创建
							if (!$percent.length) {
								$percent = $(
										'<div class="progress progress-striped active">'
												+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
												+ '</div>' + '</div>')
										.appendTo($li).find('.progress-bar');
							}
							$li.find('p.state').text('上传中');
							$percent.css('width', percentage * 100 + '%');
					 },//进度显示
					 uploadSuccess:function( file ,response){//成功回调
						$( '#'+file.id ).find('p.state').text('已上传');
						$('#' + file.id).find('.progress').fadeOut();
					 }
				});
			})
		}
		
/*		initUploadify : function(){
				$('#file_upload').uploadify({
					'swf' : getContextPath() + '/resources/lib/uploadify/uploadify.swf', // 空间flash文件位置
					'uploader' : getContextPath() + '/provider/multipUploadFile',
					'method' : 'post',
					'queueSizeLimit' : 10,
					'queueID' : 'queue',
					'removeCompleted' : false,
					'buttonText' : '选择视频',
					'simUploadLimit' : 5, // 并发上传数据
					'auto' : false,
					'multi' : true,
					'rollover' : true,
					'width' : '80', // 按钮宽度
					'height' : '28', // 按钮高度
					'cancle' : getContextPath() + '/resources/lib/uploadify/uploadify-cancel.png',
					'folder': 'upload',//服务端的上传目录
					'fileTypeDesc' : '请上传mp4文件',
					'fileTypeExts' : '*.mp4',
					'fileObjNames' : 'file',
					'fileSizeLimit' : '500MB',
					'progressData' : 'speed',
					//'button_image_url' : getContextPath() + '/resources/lib/uploadify/uploadify-cancel.png',
					'onFallback' : function(){ // 检测FLASH失败调用
						alert('您未安装FLASH控件，无法上传文件!请安装FLASH控件后再使用!');
						return ;
					},
					'onQueueComplete' : function(queueData){
						alert(queueData.uploadsSuccessful + '个文件:上传成功!');
					},
					'onUploadSuccess' : function(file,data,response){
						//alert(file.name + ':上传成功');
					},
					'onSelect' : function(event){
						//var sessionId = event.id; // 上传唯一ID
					},
					'onSelectError' : function(file, errorCode, errorMsg){
						var msgText = '上传失败\n';
						switch(errorCode){
						case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
							msgText += '上传的文件数量已经超出系统限制的' + $('#file_upload').uploadify('settings', 'queueSizeLimit') + '个文件!';
							break;
						case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
							msgText += "文件 [" + file.name + "] 大小超出系统限制的" + $('#file_upload').uploadify('settings', 'fileSizeLimit') + "大小！";
							break;
						case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
							msgText += '文件大小为0';
							break;
						case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
							msgText += '文件格式不正确，仅限 ' + this.settings.fileTypeExts;
							break;
						default:
							msgText += '错误代码:' + errorCode + '\n' + errorMsg;
							break;
						}
						alert(msgText);
					}
				});
		}*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
}

// 修改
function modify(){
	$('#content-frame', parent.document).prop('src',getContextPath() + '/provider/product/modify/' + $('#company-key').val() + '/' + $(this).data('id'));
}

// 删除
function delProduct() {
	if(confirm('确定要删除此条记录吗？')){
		var pKey = $(this).data('id');
		loadData(function(){
			$('.nav-stacked li:nth-child(2)', parent.document).click();
		}, getContextPath() + '/provider/delete/product/' + pKey, null);
	}
}
// 设置代表作
function setMaster(){
	var productId  = $(this).attr('data-id');
	loadData(function(){
		$('.nav-stacked li:nth-child(2)', parent.document).click();
	}, getContextPath() + '/provider/set/masterWork',$.toJSON({
		productId : productId,
		teamId:$('#company-key').val()
	}));
}