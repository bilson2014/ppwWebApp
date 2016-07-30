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
$.base64.utf8encode = true;
$().ready(function(){
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
	 
	$('#uploadLDBt').on('click',function(){
		$('#picLDFile').click();
		$('#picLDFile').unbind('change');
		$('#picLDFile').bind('change',function(){
			checkFile('picLDFile');
		});
	});
	
	$('#uploadHDBt').on('click',function(){
		$('#picHDFile').click();
		$('#picHDFile').unbind('change');
		$('#picHDFile').bind('change',function(){
			checkFile('picHDFile');
		});
	});
	
	$('#uploadVideoBt').on('click',function(){
		$('#videoFile').click();
		$('#videoFile').unbind('change');
		$('#videoFile').bind('change',function(){
			checkFile('videoFile');
		});
	});
	
	// 注册变更模式
	
	if(action == 'upload'){
		
		//新增首先获取sessionid
		loadData(function(pData){
			sessionId = pData.sessionId;
			$('#video-picHD-div').hide();
			$('#video-picLD-div').hide();
			// 注册 保存 按钮
			$('#infoBt').on('click',function(){
				$('#sureUpdate').on('click',function(){
					$('#warmModel').modal('hide');
					if($('#video-switch').val() == 1){
					if(confirm('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？')){
						upload();
					}
				}else{
					upload();
				}
				});

			});
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
		
		// 修改界面
		$('#infoBt').on('click',function(){
			$('#warmModel').modal('show');
			
			$('#sureUpdate').on('click',function(){
				$('#warmModel').modal('hide');
				if($('#video-switch').val() == 1){
				if(confirm('关闭状态会导致您的影片不能在官网显示，确定要关闭视频吗？')){
					modify();
				}
			}else{
				modify();
			}
			});

		});
		
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
			var picHDName = getFileName(picHDUrl);
			var picHDPath = getHostName() + '/product/img/' + picHDName;
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
			var picLDName = getFileName(picLDUrl);
			var picLDPath = getHostName() + '/product/img/' + picLDName;
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
		$('#previewImg').attr('src',getContextPath() + '/product/img/' + name);
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
			
			$.ajaxFileUpload({
				url : getContextPath() + '/provider/save/product/info',
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
					'servicePrice' : $('#video-price').val(),
					'visible' : $('#video-switch').val(),
					'tags' : mergeTag(),
					'videoDescription' : videoDescription.trim(),
					'sessionId' : sessionId
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
					}
					
				},
				error : function(data, status, e){
					alert('文件上传失败...');
				}
			});
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
						'sessionId' : sessionId
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
									var picLDName = getFileName(product.picLDUrl);
									var picLDPath = getHostName() + '/product/img/' + picLDName;
									$('#LDImg').attr('src',picLDPath);
								}
								
								if(product.picHDUrl != null && product.picHDUrl != '' && product.picHDUrl != undefined){
									
									var picHDName = getFileName(product.picHDUrl);
									var picHDPath = getHostName() + '/product/img/' + picHDName;
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
	var description = $('#video-description').val().trim(); // 视频描述
	var price = $('#video-price').val(); // 
	
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
	
	if(description == '' || description == null || description == undefined){
		popshow('video-description', '请填写视频简介!');
		$('#video-description').focus();
		return false;
	}
	
	if(price == '' || price == null || price == undefined){
		popshow('video-price', '请填写价格!');
		$('#video-price').focus();
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
	
	if(type == 'upload'){ // 新建
		var hdFile = $('#picHDFile').val(); // 缩略图
		var ldFile = $('#picLDFile').val(); // 封面
		var videoFile = $('#videoFile').val(); // 视频
		if(hdFile == '' || hdFile == null || hdFile == undefined){
			
			popshow('uploadHDBt', '请上传缩略图!');
			return false;
		}
		
		if(ldFile == '' || ldFile == null || ldFile == undefined){
			
			popshow('uploadLDBt', '请上传封面!');
			return false;
		}
		
		if(videoFile == '' || videoFile == null || videoFile == undefined){
			
			popshow('uploadVideoBt', '请上传视频!');
			return false;
		}
		
		return true;
	}else if(type == 'modify'){
		var HDImg = $('#video-picHDUrl').val(); // 缩略图
		var LDImg = $('#video-picLDUrl').val(); // 封面图
		var videoUrl = $('#videoUrl').val(); // 视频
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
		
		if(videoUrl == '' || videoUrl == null || videoUrl == undefined){
			
			if($('#videoFile').val() == null || $('#videoFile').val() == ''){
				popshow('uploadVideoBt', '请上传视频!');
				return false;
			}
		}
		return true;
	}
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

// 判断文件大小
function checkFile(id){
	// 检测文件是否为空
	// 获取文件
	var obj_file = document.getElementById(id); // 目标文件
	var filesize = 0; // 文件大小
	try{
		if(obj_file.value == null || obj_file.value == undefined || obj_file.value == ''){
			alert('请上传文件');
			return ;
		}else{
			if(browserCfg.firefox || browserCfg.chrome ){
				filesize = obj_file.files[0].size;
			}else if(browserCfg.ie){
				var obj_image = document.getElementById('tempImg');
				obj_image.dynsrc=obj_file.value;
				filesize = obj_image.fileSize;
			}else{
				//alert(tipMsg);
				return;  
			}
			
			if(filesize == -1){
				//alert(tipMsg);
				return ;
			}
			
			switch(id){
			// 检测文件格式
				case 'picLDFile': //封面
				case 'picHDFile': // 缩略图
					if(filesize > image_max_size){
						$('#imageLabel').show();
						$('#imageLabel').text(image_err_msg);
						return ;
					}else {
						$('#imageLabel').hide();
						return true;
					}
					break;
				case 'videoFile': // 视频文件
					if(filesize > video_max_size){
						$('#imageLabel').show();
						$('#imageLabel').text(video_err_msg);
						return ;
					}else{
						$('#imageLabel').hide();
						return true;
					}
					break;
				default: // 其他情况
					break;
			}
		}
	}catch(e){
		console.info(e);
	}
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