var upload_Video;
var video_max_size = 200*1024*1024; // 200MB
var video_err_msg = '视频大小超出200M上限,请重新上传!';
$().ready(function(){
	initEven();
});

function initEven(){
	//上传
	$('#moreUp').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#multUpload').show();
		 $('#video-container').html();
	});
	$('#newProduct').off('click').on('click',function(){
		 $('#uploadChoose').hide();
		 $('#upVideoCard').show();
	});
	$('#cancleMult').off('click').on('click',function(){
		$('#multUpload').hide();
		$('#uploadChoose').show();
		$('#video-container').html();
		window.location.reload();
	});
	$('#upBtn').off('click').on('click',function(){
		 $('.hideUp1').hide();
		 $('.hideUp2').show();
	});
	
	$('#cancleUpload').off('click').on('click',function(){
		 $('#uploadChoose').show();
		 $('.hideUp2').hide();
	});
	
	multipUploadFile();
	delProduct();
	playProduct();
}

function delProduct(){
	$('.del').off("click").on('click',function(){
		var pKey = $(this).data('id');
		$('#tooltip-check').show();
		$('#checkInfo').text('确定要删除此条记录吗？');
		$('#falseCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#closeCheck').off('click').on('click',function(){
			$('#tooltip-check').hide();
		});
		$('#sureCheck').off('click').on('click',function(){
			loadData(function(){
				window.location.reload();
			}, '/provider/delete/product/' + pKey, null);
			$('#tooltip-check').hide();
		});
	}); 
}

function playProduct(){
	$('.playCBtn').off("click").on('click',function() {
		var videoUrl = $(this).parent().find('input').val();
		var picUrl = $(this).attr('src');
		var videoPath = getDfsHostName() + videoUrl;
		$('#playVideo').removeClass('hide');
		$(".openVideo") && $(".openVideo").remove();
		var $body = ' <div class="openVideo" title="双击关闭视频" id="playVideo">'
				+   '<div class="openVideoCommon"></div>'
				+ '<div class="setOpi" id="videoRoata"><div class="videoClose setCloseSize" id="commonCloseVideo"></div><video class="setSize" autoplay controls loop poster="'+picUrl+'"  name="media" id="header3Video"> '
				+'<source  src="'+videoPath+'"  id="source" type="video/mp4">'
				+ '</video></div>';
		$body += '</div>';
		$("body").append($body);
		initClose();
		setTimeout(function(){
			 $('#header3Video').addClass('active');
			},100);
	});
}


function multipUploadFile(){
	$(".showErrorUp").hide();
	upload_Video && upload_Video.destroy();
	var picker =$('#picker'); 
	upload_Video = WebUploader.create({
		auto:false,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/multipUploadFile',
		timeout:60*60*1000,
		pick : picker,
		fileSingleSizeLimit : video_max_size,
		fileNumLimit : 10,//最多上传文件
		threads :1,
		accept :{
		    title: 'video',
		    extensions: 'mp4',
		    mimeTypes: 'video/mp4'
		}
	});
	upload_Video.on('beforeFileQueued', function(file) {
		 var array = upload_Video.getFiles();
		 if(array.length == 10){
			 $(".showErrorUp").show();
			 $(".showErrorUp").text("最多一次上传10个视频");
		 }
	});
	
	upload_Video.on('fileQueued', function(file) {
		$("#video-container").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
	});
	
	// 文件上传过程中创建进度条实时显示。
	upload_Video.on('uploadProgress',function(file, percentage) {
		var $li = $('#' + file.id), $percent = $li
		.find('.progress .progress-bar');
		// 避免重复创建
		if (!$percent.length) {
			$percent = $(
					'<div class="progress progress-striped active">'
							+ '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 0%">'
							+ '</div>' + '</div>')
					.appendTo($li).find('.progress-bar');
		}
		$li.find('.videoState').text('上传中');
		$percent.css('width', percentage * 100 + '%');
	});
	upload_Video.on('uploadSuccess', function(file,response) {
		if(response._raw == 'success'){
			$('body').find('#'+file.id ).find('.videoState').text('已上传');
			$('body').find('#'+file.id ).find('.videoState').addClass("showUpSuccess");
			$('body').find('#' + file.id).find('.progress').fadeOut();
		}else{
			$('body').find('#'+file.id ).find('.videoState').text('上传失败');
			$('body').find('#' + file.id).find('.progress').fadeOut();
		}
		
	});
	upload_Video.on('uploadError', function(file,reason) {
		console.info(reason);
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
}

var videoList_tpl = {
		upload_Tpl:[
		" <div class='videoCard'>                            "+
		"	<div class='videoContent'>                       "+
		"   	<div id='${file.id}' class='item'>			 "+
		"	    <div class='videoName'>${file.name}</div>    "+
		"	    <div class='videoState'>等待上传</div>		 "+
		"	</div>                                           "+
		" </div>                                             "      
		].join("")
}



