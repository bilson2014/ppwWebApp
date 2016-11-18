var PopInterValObj,oTimer,successIntervalObj; // timer变量，控制时间
var imageType = ['png','jpg'];
var videoType = ['mp4'];
var image_max_size = 1024*250; // 250KB
var video_max_size = 500*1024*1024; // 500MB
var image_err_msg = '图片大小超出250KB上限,请重新上传!';
var video_err_msg = '视频大小超出500M上限,请重新上传!';
var tipMsg = "您的浏览器暂不支持计算上传文件的大小，为保证操作体验，建议使用IE、FireFox、Chrome浏览器";
var browserCfg = {};
var localAddress;
var sessionId;
var editor;
var timer;
oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
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
				fileSingleSizeLimit : 1024*1024*500,
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
					 toolTipShow('格式不正确');
			        }else if(type=="F_EXCEED_SIZE"){
			        	$('#videoLabel').show();
						$('#videoLabel').text('视频大小超出500M上限,请重新上传!');
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
			}, getContextPath() + url ,$.toJSON({
				'productId' : $('#p-id').val().trim(),
				'teamId' : $('#company-id').val(),
				'productName' : $('#video-name').val().trim(),
				'productType' : $('#video-type option:selected').val(),
				'videoLength' : $('#video-length').val().trim(),
				'pDescription' : $('#video-description').val().trim(),
				'servicePrice' : $('#video-price').val(),
				'visible' : $('#video-switch').val(),
				'tags' : mergeTag(),
				'videoDescription' : videoDescription.trim(),
				'creationTime' : $('#creationTime').val(),
				'picHDUrl' : $("#video-picHDUrl").val(),
				'picLDUrl' : $("#video-picLDUrl").val(),
				'videoUrl' : videoUrl
			}));
		},
		
		uploaderPic:function(){
			var _this = this;
			uploader_HD = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				pick : '#uploadHDBt',
				resize : false,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				fileSingleSizeLimit : 1024*250,
				formData : {oldUrl:$("#video-picHDUrl").val()},//参数
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			uploader_LD = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				pick : '#uploadLDBt',
				resize : false,
				chunked : false,
				duplicate: true,//允许重复上传同一个
				fileSingleSizeLimit : 1024*250,
				formData : {oldUrl:$("#video-picLDUrl").val()},//参数
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			uploader_HD.on('fileQueued', function(file) {
				$('#imageLabel-HD').hide();
				var $img = $("#HDImg");
		        // 创建缩略图
		        // 如果为非图片文件，可以不用调用此方法。
		        // thumbnailWidth x thumbnailHeight 为 100 x 100
		    	$("#video-picHD-div").show();
		    	uploader_HD.makeThumb( file, function( error, src ) {
		            if ( error ) {
		                $img.replaceWith('<span>不能预览</span>');
		                return;
		            }
		            $img.attr( 'src', src );
		        }, 130, 100 );
				
			});
			uploader_HD.on('uploadSuccess', function(file,response) {
				if(response.code==0){//上传成功
					$("#video-picHDUrl").val(response.result);
				}
			});
			uploader_HD.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 toolTipShow('格式不正确');
			        }else if(type=="F_EXCEED_SIZE"){
			        	$('#imageLabel-HD').show();
						$('#imageLabel-HD').text(image_err_msg);
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
					 toolTipShow('格式不正确');
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
	
	initData(); // 初始化数据
	
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
	
	// 注册 返回 按钮点击事件
	$('#backBt').on('click',function(){
		if(action == 'upload'){
			loadData(function(){
				
			}, getContextPath()+'/kindeditor/delete/' + sessionId, null);
		}
		$('.menu-content li:eq(1)', parent.document).click();
	});
	 
	
	// 注册变更模式
	
	if(action == 'upload'){
		//新增首先获取sessionid
		loadData(function(pData){
			sessionId = pData.sessionId;
			$('#video-picHD-div').hide();
			$('#video-picLD-div').hide();
			// 开关注册
			initSwitch(true);
		}, getContextPath()+'/product/sessionId', null);
	}else if(action == 'modify'){
		sessionId=$("#sessionId").val();
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
		
		// 显示缩略图
		var picHDUrl = $('#video-picHDUrl').val();
		if(picHDUrl != '' && picHDUrl != null){
			// 上传过缩略图
			$('#video-picHD-div').show();
			//修改为DFS路径
			//var picHDName = getFileName(picHDUrl);
			//var picHDPath = getHostName() + '/product/img/' + picHDName;
			var picHDPath = getDfsHostName() + picHDUrl;
			//修改为DFS end
			$('#HDImg').attr('src',picHDPath);
		}else{
			// 显示请上传图片
			$('#video-picHD-div').hide();
		}
		
		// 显示封面
		var picLDUrl = $('#video-picLDUrl').val();
		if(picLDUrl != '' && picLDUrl != null){
			// 上传过封面
			$('#video-picLD-div').show();
			//修改为DFS路径
			//var picLDName = getFileName(picLDUrl);
			//var picLDPath = getHostName() + '/product/img/' + picLDName;
			var picLDPath = getDfsHostName() + picLDUrl;
			//修改为DFS end
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
		//修改为DFS路径begin 2016年10月25日 12:08:46
		//$('#previewImg').attr('src',getContextPath() + '/product/img/' + name);
		$('#previewImg').attr('src',getDfsHostName() + name);
		//修改为DFS路径end
		$('#previewImg').css({'width':width + 'px','height':height + 'px'});
		if(name.indexOf('default-thumbnail') > -1){ // 缩略图
			$('#photoModel-content').css({'width':'1080px','height':'700px','top':'40px','position':'relative','left':'45%',});
			$('#photoModel-dialog').css({'margin':0});
			$('#previewImg').css({'left':'24px','top':'15px','position':'relative'});
		}else{ // 封面
		    //TODO:我改了它我是卢涛就是这么吊
			//$('#photoModel-content').css({'width':'680px','height':'420px','top':'40px'});
			$('#photoModel-content').css({'width':'680px','height':'420px'});
			$('#photoModel-dialog').css({'margin':'30px auto'});
		}
		$('#photoModel').modal('show');
	});
});

// 初始化数据
function initData(){
	loadVideoType(); // 初始化 视频类型
}

// 加载视频类型
function loadVideoType(){
	loadData(function(tList){
		$('#video-type').empty(); // 清空原始数据
		$option = '<option value="-1"> -- 请选择类型 -- </option>';
		if(tList.length > 0){
			for(var i = 0;i < tList.length; i++){
				$option += '<option value="'+ tList[i].itemId +'">';
				$option += tList[i].itemName;
				$option += '</option>';
			}
		}
		$('#video-type').append($option);
		
		var videoType = $('#vType').val();
		if(videoType != '' && videoType != undefined){
			$.each($('#video-type option'),function(i,n){
				if($(this).val() == videoType){
					$(this).attr('selected','selected');
				}
			});
		}
	}, getContextPath() + '/provider/load/videoType', null);
}

// 新增上传
function upload(){
	
	$('#imageLabel').hide();
	$('#videoLabel').hide();
	if(checkData('upload')){ // 检验数据完整性
		
		if(checkFileDecriminalization()){
			
			oTimer = setInterval("getProgress()", 500);
			$('.progress-bar-success').text('0')
			$('.progress-bar-success').attr('aria-valuenow','0').css({"width":'0%'});
			$('#mymodal').modal('show');
			
			// 获取 videoDescription 值
			$.base64.utf8encode = true;
			var videoDescription= $.base64.btoa(editor.html());
		}
	}
}

// 修改
function modify(){
	
	$('#imageLabel').hide();
	$('#videoLabel').hide();
	if(checkData('modify')){ // 检验数据完整性
		
		if(checkFileDecriminalization()){
			// 文件验证成功，则隐藏错误提示
			$('#imageLabel').hide();
			$('#videoLabel').hide();
				if($('#videoFile').val() != ''){
					oTimer = setInterval("getProgress()", 500);
					$('.progress-bar-success').text('0')
					$('.progress-bar-success').attr('aria-valuenow','0').css({"width":'0%'});
					$('#mymodal').modal('show');
				}
				// 获取 videoDescription 值
				$.base64.utf8encode = true;
				var videoDescription= $.base64.btoa(editor.html());
				
				$.ajaxFileUpload({
					url : getContextPath() + '/provider/update/product/info',
					secureuri : false,
					fileElementId : ['videoFile','picHDFile','picLDFile'],
					dataType : 'text/html',
					data : {
						'productId' : $('#p-id').val().trim(),
						'teamId' : $('#company-id').val(),
						'productName' : $('#video-name').val().trim(),
						'productType' : $('#video-type option:selected').val(),
						'videoLength' : $('#video-length').val().trim(),
						'pDescription' : $('#video-description').val().trim(),
						'serviceId' : $('#s-id').val(),
						'servicePrice' : $('#video-price').val(),
						'visible' : $('#video-switch').val(),
						'tags' : mergeTag(),
						'videoDescription' : videoDescription.trim(),
						'sessionId' : sessionId,
						'creationTime' : $('#creationTime').val()
					},
					success: function(data){
						window.clearInterval(oTimer); // 停止计时器
						
						if(data.indexOf('error=1') > -1){
							$('#videoLabel').show();
							$('#videoLabel').text('视频大小超出500M上限,请重新上传!');
							$('#mymodal').modal('hide');
						}else if(data.indexOf('error=2') > -1){
							$('#imageLabel').show();
							$('#imageLabel').text('图片大小超出250KB上限,请重新上传!');
							$('#mymodal').modal('hide');
						}else {
							// 成功
							
							if($('#s-id').val() == '' || $('#s-id').val() == null){
								$('#s-id').val(serviceId);
							}
							
							$('#mymodal').modal('hide');
							
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
						
						},
						error : function(data, status, e){
							alert('文件上传失败...');
						}
					});
		}
	}
}

// 进度条显示进程
function getProgress() {
	var now = new Date();
	loadData(function(data){
		var progress = Number((data.pBytesRead / data.pContentLength) * 100).toFixed(0) + '%';
		$('.progress-bar-success').text('已完成' + progress)
		$('.progress-bar-success').attr('aria-valuenow',progress).css({"width":progress});
	}, getContextPath() + '/upfile/progress', now.getTime());
}

// 检测数据的完整性
function checkData(type){
	var name = $('#video-name').val().trim(); // 视频名称
	var videoType = $('#video-type option:selected').val(); // 视频类型
	var videoLength = $('#video-length').val().trim(); // 视频长度
	var price = $('#video-price').val(); //价格
	var creationTime = $('#creationTime').val();//创作时间
	var length = $(".keyword_item_inner").length;//标签长度
	var description = $('#video-description').val().trim(); // 视频描述
	
	if(name == '' || name == null || name == undefined){
		popshow('video-name', '请输入视频标题!');
		$('#video-name').focus();
		return false;
	}
	
	if(videoType == -1){
		popshow('video-type', '请选择视频类型!');
		$('#video-type').focus();
		return false;
	}
	
	if(videoLength == '' || videoLength == null || videoLength == undefined){
		popshow('video-length', '请填写视频长度!');
		$('#video-length').focus();
		return false;
	}
	if(price == '' || price == null || price == undefined){
		popshow('video-price', '请填写价格!');
		$('#video-price').focus();
		return false;
	}
	if(creationTime == '' || creationTime == null || creationTime == undefined){
		popshow('creationTime', '请填写创作时间!');
		$('#creationTime').focus();
		return false;
	}
	if(length==0){
		popshow('text_tags', '请填写标签!');
		$("#text_tags").focus();
		return false;
	}
	
	
	if(description == '' || description == null || description == undefined){
		popshow('video-description', '请填写视频简介!');
		$('#video-description').focus();
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
	var HDImg = $('#video-picHDUrl').val(); // 缩略图
	var LDImg = $('#video-picLDUrl').val(); // 封面图
	if(HDImg == '' || HDImg == null || HDImg == undefined){
		if($('#picHDFile').val() == null || $('#picHDFile').val() == ''){
			popshow('uploadHDBt', '请上传缩略图!');
			return false;
		}
	}
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

// 检验 文件格式
function checkFileDecriminalization(){
	var picHDFile = $('#picHDFile').val();
	var picLDFile = $('#picLDFile').val();
	var videoFile = $('#videoFile').val();
	
	if(picHDFile != null && picHDFile != '' && picHDFile!= undefined){
		picHDFile = transformLower(picHDFile);
		
		if(picHDFile.indexOf('.' + imageType[0]) < 0 && picHDFile.indexOf('.' + imageType[1]) < 0){
			
			$('#imageLabel').show();
			$('#imageLabel').text('缩略图请上传png、jpg格式的图片!');
			return false;
		}
		
	}
	
	if(picLDFile != null && picLDFile != '' && picLDFile!= undefined){
		picLDFile = transformLower(picLDFile);
		
		if(picLDFile.indexOf('.' + imageType[0]) < 0 && picLDFile.indexOf('.' + imageType[1]) < 0){
			$('#imageLabel').show();
			$('#imageLabel').text('封面请上传png、jpg格式的图片!');
			return false;
		}
		
	}
	
	if(videoFile != null && videoFile != '' && videoFile!= undefined){
		videoFile = transformLower(videoFile);
		
		if(videoFile.indexOf('.' + videoType[0]) < 0){
			
			$('#videoLabel').show();
			$('#videoLabel').text('请上传mp4格式的视频!');
			return false;
		}
		
	}
	
	return true;
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
function transformLower(value){
	if(value != null && value != '' && value != undefined){
		return value.toLowerCase();
	}
	return null;
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


function showPic(inputFile,imgID,container){
	 if (document.getElementById(inputFile).files.length === 0) { return; }
	  var oFile = document.getElementById(inputFile).files[0];
	  if (!rFilter.test(oFile.type)) { alert("只能选择图片文件!"); return; }
	  oFReader.readAsDataURL(oFile);
	  oFReader.onload = function (oFREvent) {
	  	$("#"+container).show();
	    document.getElementById(imgID).src = oFREvent.target.result;
	  };
}	

