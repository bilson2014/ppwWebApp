var PopInterValObj,oTimer,successIntervalObj; // timer变量，控制时间
var image_max_size = 1024*250; // 250KB
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var editor;
var flag = 3;//作品状态
$().ready(function(){
	uploaderVideo();
	$('#upLoad_png').on('click',function(){
		$('#upBtn').find('label').click();
	});
});
function uploaderVideo(){    
	upload_Video = WebUploader.create({
		auto:false,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/web/upload',
		pick : {
			id:'#upBtn',
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
}