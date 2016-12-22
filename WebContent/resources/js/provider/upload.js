var image_max_size = 1024*250; // 250KB
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var curCount = 3;
var InterValObj;
$().ready(function(){
	var upload = {
		init:function(){
			//初始化上传视频
			this.uploaderVideo();
			//初始化创作时间和tag标签
			this.initPage();
			//初始化上传图片
			this.uploaderPic();
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
				$("#productId").val(response.result);
				$(".stateInfo").addClass("hide");
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
				maxDate: new Date() 
			});
			// 注册 标签输入 监听
			$('.input_inner').bind('keypress',function(event){
				// 如果含有, 或者 空格 ，则添加标签，然后清空input
				e = event ? event :(window.event ? window.event : null);
				var code = e.keyCode||e.which||e.charCode;
				if(code == 32 || code == 44){
					var tag = $(this).val().replace (/,/g,'').trim();
					// 检查是否 汉字或是 全角
					if(tag != null && tag != '' && tag != undefined){
						var count = tag.replace(/[^\x00-\xff]/g,"**").length;
						if(count > 16){
							// 提示错误信息
							$('#tagLabel').show().text("每个标签最多8个汉字或16个字母！");
						}else {
							$('#tagLabel').hide();
							addTags(tag); // 增加标签
						}
					}
				}
			});
			// 注册 标签输入框 的失去焦点事件
			$('.input_inner').blur(function(){
				var tag = $(this).val().replace (/,/g,'').trim();
				if(tag == null || tag == '' || tag == undefined){
					// 为空时，查看是否有标签，如果没有，则显示 placeholder 提示
					var tagName = mergeTag();
					if(tagName == null || tagName == '' || tagName == undefined){
						$('.keyword_placeholder').show('fast');
					}
				}else {
					addTags(tag); // 增加标签
				}
			});
		},
		uploaderPic:function(){
			var _this = this;
			uploader_Pic = WebUploader.create({
				auto:false,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/update/product/info',
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
					extensions: 'jpg,png',
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
			});
			uploader_Pic.on('uploadSuccess', function(file,response) {
				$(".step2").addClass("hide");
				$(".step3").removeClass("hide");
				SetLastTime();
				$('#toPortal').off('click').on('click',function(){
					window.location.href=getContextPath() + '/provider/portal';
				});
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
					if(picImgUrl != ''){//修改状态下存在路径，可以不上传
						_this.modifyProduct();//ghost用户在有图片的情况下修改作品且没有更换图片
					}else{
						//webupload启动提交
						uploader_Pic.option('formData',{
							productId:$("#productId").val(),
							productName:$("#video-name").val(),
							creationTime:$("#creationTime").val(),
							tags:mergeTag()
						});
						uploader_Pic.upload();
					}
				}
			});
		},
		modifyProduct:function(){
			
		}
	}
	upload.init();
});
//提取标签
function mergeTag(){
	var tagName = '';
	$.each($('.keyword_item_inner'),function(i,obj){
		var tag = $(obj).text().replace (/,/g,'').trim();
		if(tag !=null && tag != '' && tag != undefined){
			tagName += tag;
			if (i != $('.keyword_item_inner').length - 1)
				tagName += ' ';
		}
	});
	return tagName;
}
//增加标签
function addTags(tag) {
	if(tag != null && tag != undefined && tag != ''){
		// 增加标签时 ,看其是否超过5条
		var num = $('.keyword_item').length;
		if(num < 5){ // 当前没有超过5条，则增加
			var $tag = '<span class="keyword_item">';
			$tag += '<b class="keyword_item_inner">'+ tag +'</b>';
			$tag += '<a href="javascript:void(0);" class="btn_keyword_del">';
			$tag += '<span>x</span>';
			$tag += '</a>';
			$('.keyword_input').before($tag);
			// 激活 x 
			$('.btn_keyword_del').unbind('click');
			$('.btn_keyword_del').bind('click',function(){
				removeTags($(this));
			});
		}
		// 清空input
		$('.input_inner').val('');
	}else {
		// 清空input
		$('.input_inner').val('');
	}
}
// 删除 标签
function removeTags(obj) {
	obj.parent().remove();
	var num = $('.keyword_item').length;
	if(num == 0){
		$('.keyword_placeholder').show('fast');
	}
}

function checkData(){
	var productId = $("#productId").val();
	var productName = $("#video-name").val();
	var creationTime = $("#creationTime").val();
	var picLDChange = $("#pic-LD-url").attr("data-change");
	var picImgUrl = $("#pic-LD-url").val();
	var tagsinput = mergeTag();
	resumeCommonError($(".setItem"),'');
	if(productId == null || productId == undefined || productId == ''){
		return false;
	}
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
	if($("#flag") == 4){//ghost账户需要填写标签
		if(tagsinput == null || tagsinput == undefined || tagsinput == ''){
			$('#tagLabel').show().text("请填写作品标签！");
			return false;
		}
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
	window.location.href=getContextPath() + '/provider/portal';
}
else{
	  curCount--;
	 $('#lasttime').text(curCount); 
}
}
