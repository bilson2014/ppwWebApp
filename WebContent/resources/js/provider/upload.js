var PopInterValObj,oTimer,successIntervalObj; // timer变量，控制时间
var image_max_size = 1024*250; // 250KB
var video_max_size = 200*1024*1024; // 200MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出200M上限,请重新上传!';
var browserCfg = {};
var editor;
$.base64.utf8encode = true;
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
			$('#infoBt').off("click").on('click', function() {
				var action = $('#action').val();
				var change = $("#video-change").val();
				if(checkData()){ // 检验数据完整性
					$('#warmModel').modal('show');
					$('#sureUpdate').off('click').on('click',function(){
						$('#warmModel').modal('hide');
						if($('#video-switch').val() == 1){
							if(confirm('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？')){
								if(action == 'modify' && change == 0){//修改状态,且视频无修改,此时不需要上传视频
									_this.saveOrModify();
								}else{
									//webupload启动提交
									upload_Video.upload();
								}
							}
						}else{
							if(action == 'modify' && change == 0){
								_this.saveOrModify();
							}else{
								//webupload启动提交
								upload_Video.upload();
							}
						}
					});
				}
			});
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
			// 获取 videoDescription 值
			$.base64.utf8encode = true;
			var videoDescription= $.base64.btoa(editor.html());
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
					loadData(function(product){
						// 替换图片
						if(product.picLDUrl != null && product.picLDUrl != '' && product.picLDUrl != undefined){
							var picLDPath = getDfsHostName() + product.picLDUrl;
							$('#LDImg').attr('src',picLDPath);
						}
						if(product.picHDUrl != null && product.picHDUrl != '' && product.picHDUrl != undefined){
							var picHDPath = getDfsHostName() + product.picHDUrl;
							$('#HDImg').attr('src',picHDPath);
						}
					}, getContextPath() + '/provider/product/data/' + $('#p-id').val(), null);
				}
				$("#s-id").val(data);
			}, getContextPath() + url ,$.toJSON({
				'productId' : $('#p-id').val().trim(),
				'teamId' : $('#company-id').val(),
				'productName' : $('#video-name').val().trim(),
				//'productType' : $('#video-type option:selected').val(),
				'videoLength' : $('#video-length').val().trim(),
				'pDescription' : $('#video-description').val().trim(),
				'servicePrice' : $('#video-price').val(),
				'visible' : $('#video-switch').val(),
				'tags' : mergeTag(),
				'serviceId' : $('#s-id').val(),
				'videoDescription' : videoDescription.trim(),
				'creationTime' : $('#creationTime').val(),
				'picHDUrl' : $("#video-picHDUrl").val(),
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
	
	createEditor('textarea[name="pageDescription"]');
	cancleUpdate();
	// 判断浏览器格式
	var ua = window.navigator.userAgent;
	if (ua.indexOf("MSIE")>=1){
		browserCfg.ie = true;
	}else if(ua.indexOf("Firefox")>=1){
		browserCfg.firefox = true;
	}else if(ua.indexOf("Chrome")>=1){
		browserCfg.chrome = true;
	}
	
	var companyKey = $('#company-id').val();
	var pKey = $('#p-id').val();
	var action = $('#action').val();
	
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
					$('#tagLabel').show();
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
	
	// 注册 标签关闭 按钮
	$('.btn_keyword_del').on('click',function(){
		removeTags($(this));
	});
	
	// 注册 placeholder 的focus 事件
	$('.keyword_placeholder').click(function(){
		$(this).hide('fast');
		$('.input_inner').focus();
	});
	
	// 注册变更模式
	
	if(action == 'upload'){
		$('#video-picHD-div').hide();
		$('#video-picLD-div').hide();
		// 开关注册
		initSwitch(true);
	}else if(action == 'modify'){
		// 加载Editor
		var pageDescription = $('#page-description').val().trim();
		$.base64.utf8encode = true;
		var pageContent =$.trim($.base64.atob(pageDescription,true));
		editor.html(pageContent);
		
		// 如果 停止启用，则改变  switch 状态
		if($('#video-switch').val() == 1){
			initSwitch(false);
		}else{
			initSwitch(true);
		}
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
	var videoLength = $('#video-length').val().trim(); // 视频长度
	var price = $('#video-price').val(); //价格
	var creationTime = $('#creationTime').val();//创作时间
	
	if(name == '' || name == null || name == undefined){
		popshow('video-name', '请输入视频标题!');
		$('#video-name').focus();
		return false;
	}
	if(videoLength == '' || videoLength == null || videoLength == undefined){
		$('#video-length').val(0);
	}
	if(price == '' || price == null || price == undefined){
		$('#video-price').val(0);
	}
	if(creationTime == '' || creationTime == null || creationTime == undefined){
		popshow('creationTime', '请填写创作时间!');
		$('#creationTime').focus();
		return false;
	}
	var numReg = new RegExp("^[0-9]*$");
	
	if(!numReg.test(videoLength)){
		popshow('video-length', '请填写整数!');
		$('#video-length').focus();
		return false;
	}
	
	if(isNaN(price)){
		popshow('video-price', '请输入数字!');
		$('#video-price').focus();
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

//启用switch开关
function initSwitch(type){
	$("#video-switch").bootstrapSwitch({
		animate : true,
		state : type,
		onColor : 'success',
		offColor : 'danger',
		onText : '可见',
		offText : '关闭',
		onSwitchChange : function(event,state){
			if(state){
				$(this).val(0);
			}else {
				$(this).val(1);
			}
		}
	});
}

// 提取标签
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

// 增加标签
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

function createEditor(name){
	editor = KindEditor.create(name, {
		cssPath : getContextPath() + '/resources/lib/kindeditor/plugins/code/prettify.css',
		uploadJson : getContextPath() + '/kindeditor/uploadImage',
		zIndex : 888888,
		width : '600px',
		height : '350px',
		resizeType:0,
		allowImageUpload : true,
		items : [ 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor',
					'bold', 'italic', 'underline', 'removeformat', '|',
					'justifyleft', 'justifycenter', 'justifyright',
					'insertorderedlist', 'insertunorderedlist', '|',
					'emoticons', 'image', 'link', 'unlink', 'fullscreen',
					'table', 'formatblock', 'preview' ]
	});
}

function cancleUpdate(){
	$('#cancleUpdate').on('click',function(){
		$('#warmModel').modal('hide');
	});

}
$('#backBt').on('click',function(){
	$('.menu-content li:eq(1)', parent.document).click();
});
 
