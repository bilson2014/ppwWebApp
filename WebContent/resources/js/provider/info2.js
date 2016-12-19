$().ready(function() {

	$('.getTag').on('click', function() {
		if ($(this).hasClass('redTag')) {
			$(this).removeClass('redTag');
		} else {
			$(this).addClass('redTag');
		}
	});
	userpicInfo();
});

function getBusinessVal() {
	var busArr = '';
	var tags = $('.redTag');
	for (var int = 0; int < tags.length; int++) {
		if (int == 0)
			busArr = $(tags[int]).attr('data-value');
		else
			busArr += ',' + $(tags[int]).attr('data-value');
	}
	return busArr;
}
// 头像修改
function userpicInfo() {
	uploader && uploader.destroy();
	uploader = WebUploader.create({
		auto : true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/provider/upload/teamPhoto',
		pick : '#uploadBt',
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
		var path = response._raw;
		if (path != '' && path != null) {
			if (path.indexOf('false@error') > -1) {
				if (path.indexOf("error=1") > -1) {
					alert("文件超过最大限制");
				} else if (path.indexOf("error=2") > -1) {
					alert('格式不正确');
				}
			} else {
				$('#user_img_url').val(path);
				var img = getDfsHostName() + path;
				$('#user-img').attr('src', img);
			}
		} else {
			alert('上传失败!');
		}
	});
	uploader.on('error', function(type) {
		if (type == "Q_TYPE_DENIED") {
			alert("文件超过最大限制");
		} else if (type == "F_EXCEED_SIZE") {
			alert('格式不正确');
		}
	});
}