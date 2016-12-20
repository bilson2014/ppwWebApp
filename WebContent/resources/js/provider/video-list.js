var type; // 供应商类型
var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function(){
	// 注册分享
	video.share();
	video.register();
	video.webupload();
	$('.media-object').on('click',function(){
		var videoUrl = $(this).next('input').val();
		var picUrl = $(this).attr('scr');
		$('#videoModal').modal();
		var videoPath = getDfsHostName() + videoUrl;
		// 装配视频
		$('#videoModal').find('video').attr('src',videoPath);
		$('#videoModal').find('video').attr('poster',picUrl);
	});
	$('#video-close').on('click',function(){
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
					var imgPath = imgUrl;
				}
				share.init(shareUrl, share_title, imgPath);
			});
		},
		webupload:function(){
			$('#multipModal').on('shown.bs.modal', function (e) {
				upload_Video && upload_Video.destroy();
				upload_Video = WebUploader.create({
					auto:false,
					swf : '/resources/lib/webuploader/Uploader.swf',
					server : '/provider/multipUploadFile',
					pick : '#picker',
					fileSingleSizeLimit : video_max_size,
					accept :{
					    title: 'video',
					    extensions: 'mp4',
					    mimeTypes: 'video/mp4'
					}
				});
				upload_Video.on('fileQueued', function(file) {
					$('#thelist').append('<div id="' + file.id + '" class="item">'
							+ '<h4 class="info">' + file.name + '</h4>'
							+ '<p class="state">等待上传...</p>' + '</div>');
				});
				// 文件上传过程中创建进度条实时显示。
				upload_Video.on('uploadProgress',function(file, percentage) {
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
				});
				upload_Video.on('uploadSuccess', function(file,response) {
					$( '#'+file.id ).find('p.state').text('已上传');
					$('#' + file.id).find('.progress').fadeOut();
				});
				upload_Video.on('error', function(type) {
					 if (type=="Q_TYPE_DENIED"){
						 	alert('请上传mp4格式');
				        }else if(type=="F_EXCEED_SIZE"){
							alert(video_err_msg);
				        }
				});
				$("#submit-multip").on('click', function() {
					upload_Video.upload();
				});
			})
		}
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