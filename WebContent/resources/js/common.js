var uploader;
$().ready(function(){
	// 弹出电话预约界面
	$('.common-icons-tele-client').click(function(){
		$('#toolbar-modal').modal({
			keyboard: false
		})
		
		$('#modal-call').on('click',function(){
			// 检测手机号码
			var phoneNumber = $('#phoneCall').val();
			if(phoneNumber != null && phoneNumber != '' && phoneNumber != undefined){
				if(checkMobile(phoneNumber)){
					loadData(function(result){
						if(result){
							// 消息发送成功
							$('#modal-dd-second').empty();
							$('#modal-h3-first').text('视频营销专家正火速与您联系!');
							/*$('.modal-message').empty();
							$('.modal-message').text('亲!我们的视频专家将马上与您致电,请耐心等候!');
							$('.modal-message').show('normal');*/
						}else{
							// 消息发送失败
							$('.modal-message').empty();
							$('.modal-message').text('亲!拍拍出了点小问题，正在努力自我修复，请刷新后再试哦!');
							$('.modal-message').show('normal');
						}
					}, getContextPath() + '/appointment/' + phoneNumber, null);
				}else {
					$('.modal-message').empty();
					$('.modal-message').text('请输入正确的电话号码哦亲!');
					$('.modal-message').show('normal');
				}
			}else {
				$('.modal-message').empty();
				$('.modal-message').text('别忘记输入电话哦亲!');
				$('.modal-message').show('normal');
			}
		});
	});
	
	$('#s-btn').on('click',function(){
		var q = $('#search-q').val().trim();
		if(q != null && q != '' && q != undefined){
			$('#s-form').submit();
		} else if(q == null || q == ''){
			$('#search-q').val('*');
			$('#s-form').submit();
		}
	});
	
	
	//检测用户是否完善登录名和密码 wanglc
	loadData(function(flag){
		
		if(!flag){
			$(".right-part").append('<div class="warn">!</div>');
			//.append('<div class="warnWindom"><div class="divImg"></div><div></div></div>');
			//如果是供应商和客户info页面
			var url = window.location.href;
			if(url.indexOf("provider/company-info") != -1 || url.indexOf("user/info") != -1){
				$("#safe-point").append('<div class="warn" style="left: 72px;">!</div>');
			}
		}
	}, getContextPath() + '/loginName/validate');
	
});

function debug(obj) {

	var linebreak = "\r\n";
	// var linebreak = "; ";

	var msg = "OBJECT->" + linebreak;
	msg += obj + linebreak;
	for ( var e in obj) {
		msg += e + "=" + obj[e] + linebreak;
	}

	return alert(msg);
}

//获取项目路径
function getContextPath() {
	var path = document.location.pathname.substr(1);
	path = "/" + path.substr(0, path.indexOf("/"));
	return '';
}

//AJAX GET
function getData(Func,url){
	$.ajax({
		url : url,
		type : 'GET',
		dataType : 'json',
		success : function(data){
			Func(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
			console.error(jqXHR.responseText);
			console.error('[' + textStatus + ']' + errorThrown);
		}
	});
}

// AJAX POST
function loadData(Func,url,param){
	$.ajax({
		url : url,
		type : 'POST',
		data : param,
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			Func(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
			console.error(jqXHR.responseText);
			console.error('[' + textStatus + ']' + errorThrown);
		}
	});
}
// ajax submit form
function submitForm(Func,url,param,checkElement){
	var processing = $(checkElement).hasClass('X');
	var rtoken = $('#rtoken').val();
	
	// 页面存在rtoken添加在提交的参数内
	if(rtoken != undefined && rtoken != null && rtoken != ''){
		var obj = $.evalJSON(param);
		obj.rtoken = rtoken;
		param = $.toJSON(obj);
	}
	
	if(!processing){
		$(checkElement).addClass('X');
		$.ajax({
			url : url,
			type : 'POST',
			data : param,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				$(checkElement).removeClass('X');
				Func(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$(checkElement).removeClass('X');
				console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
				console.error(jqXHR.responseText);
				console.error('[' + textStatus + ']' + errorThrown);
			}
		});
	}else{
		console.log('处理中请勿重复点击！');
	}
}

//AJAX POST
function syncLoadData(Func,url,param){
	$.ajax({
		url : url,
		type : 'POST',
		data : param,
		dataType : 'json',
		async:false,
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			Func(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
			console.error(jqXHR.responseText);
			console.error('[' + textStatus + ']' + errorThrown);
		}
	});
}

//导出excel
function download(url,condition){
	
	$.growlUI('报表输出中…', '正在为您输出报表，请稍等。。。');
	
	var inputHTML = '<input type="hidden" name="json" value="'+ htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) +'" />';
	$('<form action="'+ getContextPath() + url +'" method="POST">' + inputHTML + '</form>').appendTo('body').submit().remove();
}

var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm;

var htmlSpecialCharsPlaceHolders = {
	'<' : 'lt;',
	'>' : 'gt;',
	'&' : 'amp;',
	'\r' : "#13;",
	'\n' : "#10;",
	'"' : 'quot;',
	"'" : 'apos;' /*single quotes just to be safe*/
};

function htmlSpecialCharsEntityEncode(str) {
	return str.replace(htmlSpecialCharsRegEx, function(match) {
		return '&' + htmlSpecialCharsPlaceHolders[match];
	});
}

/**
 * 获取文件名
 */
function getFileName(val){
	var arr = val.split('/');
	var imgName = '';
	for(var i = 0;i < arr.length;i ++){
		if(i == arr.length - 1 ){
			imgName = arr[i]
		}
	}
	
	return imgName;
}

/**
 * 获取 主机名
 * @returns http://localhost:8080
 */
function getHostName(){
	
	return window.location.protocol + '//' + window.location.host;
}
/**
 * 获取 dfs的主机名
 */
function getDfsHostName(){
	var fdfsPath = $('#Fastdfs_path').val();
	return fdfsPath == undefined ? "http://resource.apaipian.com/resource/" : $('#Fastdfs_path').val();
}
/**
 * 数据加分隔符
 * @param number
 * @returns
 */
function thousandCount(number) {
	var tableData;
	if (number == 0) {
		tableData = 0;
	} else {
		if(number != undefined){
			tableData = number.toLocaleString();
			var indexOf = tableData.indexOf(".");
			if (indexOf > -1) {
				tableData = tableData.substring(0, indexOf);
			}
		}
	}
	return tableData;
}

/**
 * 去掉千分位显示
 */
function DisThousandCount(number){
	var tableData;
	if (number == 0) {
		tableData = 0;
	} else {
		tableData = number.toLocaleString();
		var indexOf = tableData.indexOf(".");
		if (indexOf > -1) {
			tableData = tableData.substring(0, tableData.indexOf("."));
		}
		tableData = tableData.replace(',','');
	}
	return tableData;
}

// 重新编码
function htmlSpecialCharsEntityEncode(str) {
	return str.replace(htmlSpecialCharsRegEx, function(match) {
		return '&' + htmlSpecialCharsPlaceHolders[match];
	});
}

var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm;
var htmlSpecialCharsPlaceHolders = {
	'<' : 'lt;',
	'>' : 'gt;',
	'&' : 'amp;',
	'\r' : "#13;",
	'\n' : "#10;",
	'"' : 'quot;',
	"'" : 'apos;' /*single quotes just to be safe*/
};

/**
 * 验证 手机号
 * @param str
 */
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
	if(str.match(reg)){
		return true;
	} else{
		return false;
	}
}

/**
 * 验证 邮箱地址
 */
function checkEmail(str){
	reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(str.match(reg))
		return true; 
	else
		return false;
}

function checkNumber(str){
	reg = /^[1-9]+[0-9]*]*$/;
	if(str.match(reg))
		return true;
	else
		return false;
}

function checkDecimal(str){
	reg =/^\d+(\.\d+)?$/;
	if(str.match(reg))
		return true;
	else
		return false;
	
}
/**
 * 检验 用户名格式
 * @param name 用户名
 */
function checkUserName(name){
	var reg = /^[a-zA-Z0-9_]{6,16}$/ ;
	if(name.match(reg))
		return true; 
	else
		return false;
}

/**
 * 加密
 * @param word
 * @returns
 */
function Encrypt(word){
	var cryptKey = '0102030405060708';
	var key = CryptoJS.enc.Utf8.parse(cryptKey);
	var iv  = CryptoJS.enc.Utf8.parse(cryptKey);
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});  
	return encrypted.toString();
}
//使用方法
/*
 webupload({
	 auto:true,
	 server: '',//url
	 pick: '',//点击弹窗
	 submitBtn:'',//提交按钮
	 formData : {},//参数
	 fileQueued:function(file){//选中后执行
	 },
	 uploadProgress:function(file, percentage){},//进度显示
	 uploadSuccess:function( file ,response){//成功回调
	 },
	 uploadComplete:function(file){},
	 uploadError:function(file){}
});
*/
function webupload(param) {
	uploader && uploader.destroy();//及时销毁,避免,切换导致按钮增大
	var auto = param.auto;
	var submitBtn = param.submitBtn;
	var accept = param.accept;
	var fileNumLimit = param.fileNumLimit;
	var server = param.server;
	var pick = param.pick;
	var data = param.formData;
	var chunked = param.chunked;
	var resize = param.resize;
	if (auto != true) {
		auto = false;
	}
	if (chunked == null || chunked == undefined ) {
		chunked = false;
	}
	if (resize == null || resize == undefined) {
		resize = false;
	}
	if(fileNumLimit == null && fileNumLimit == undefined){
		fileNumLimit=9999;
	}
	uploader = WebUploader.create({
		auto:auto,
		// swf文件路径
		swf : '/resources/lib/webuploader/Uploader.swf',
		// 文件接收服务端。
		server : server,
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick : pick,
		accept:accept,
		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize : resize,
		
		fileNumLimit:fileNumLimit,
		// 开起分片上传。
		chunked : chunked,
		formData : data
	});
	// 当有文件被添加进队列的时候
	uploader.on('beforeFileQueued', function(file) {
		if(param.beforeFileQueued){
			param.beforeFileQueued(file);
		}else{
		}
	});
	// 当有文件被添加进队列的时候
	uploader.on('fileQueued', function(file) {
		if(param.fileQueued){
			param.fileQueued(file);
		}else{
			//$('.uploader-list').append('<div id="' + file.id + '" class="item">'
			//			+ '<h4 class="info">' + file.name + '</h4>'
			//			+ '<p class="state">等待上传...</p>' + '</div>');
			//uploader.md5File(file)
			// 及时显示进度
			//.progress(function(percentage) {
			//	console.log('Percentage:', percentage);
			//})
			// 完成
			//.then(function(val) {
			//	console.log('md5 result:', val);
			//});
		}
	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress',function(file, percentage) {
		if(param.uploadProgress){
			param.uploadProgress(file,percentage);
		}else{
			/*var $li = $('#' + file.id), $percent = $li
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
			$percent.css('width', percentage * 100 + '%');*/
		}
	});
	uploader.on('uploadSuccess', function(file,response) {
		if(param.uploadSuccess){
			param.uploadSuccess(file,response);
		}else{
		}
	});
	uploader.on('uploadError', function(file) {
		if(param.uploadError){
			param.uploadError(file);
		}else{
			//$('#' + file.id).find('p.state').text('上传出错');
		}
	});

	uploader.on('uploadComplete', function(file) {
		if(param.uploadComplete){
			param.uploadComplete(file);
		}else{
			//$( '#'+file.id ).find('p.state').text('已上传');
			//$('#' + file.id).find('.progress').fadeOut();
		}
	});
	$(submitBtn).on('click', function() {
		uploader.upload();
		//uploader.stop();
	});
}


// 分享
var share = {
		init :function(url,title,img){
			mobShare.config({
				 
				debug: true, // 开启调试，将在浏览器的控制台输出调试信息
			
				appkey: '8c49c537a706', // appkey
			
				params: {
					url: url, // 分享链接
					title: title, // 分享标题
					description: '拍片网-中国领先的视频营销服务平台', // 分享内容
					pic: img, // 分享图片，使用逗号,隔开
				},
			 
				callback: function( plat, params ) {
					
				}
			});
		}
}

var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?b0ac6d7e1cee0e96c5c43106c5d43537";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();
/*var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?e6cdc36f100fe051e5adec56d084b6ca";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();*/
var _vds = _vds || [];
window._vds = _vds;
(function(){
  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
  (function() {
    var vds = document.createElement('script');
    vds.type='text/javascript';
    vds.async = true;
    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(vds, s);
  })();
})();
