var  successIntervalObj; // timer变量，控制时间
//头像裁剪参数 
var jcrop_api;
var x;
var y;
var x2;
var y2;
var w;
var h;
//头像裁剪参数 
// 自定义图片上传 检验参数
var ImgObj=new Image(); //建立一个图像对象
var AllowExt=".jpg|.gif" //允许上传的文件类型 ŀ为无限制 每个扩展名后边要加一个"|" 小写字母表示
var AllowImgFileSize=70;  //允许上传图片文件的大小 0为无限制  单位：KB
var FileObj,ImgFileSize,FileExt,ErrMsg,FileMsg,HasCheked,IsImg//全局变量 图片相关属性
var parent = $(window.parent.document);
var uploader;

// 自定义图片上传 检验参数
$().ready(function() {
	$('.sexCheckItem').on('click', function() {
		$('.sexCheckItem').removeClass('selectItem');
		$(this).addClass('selectItem');
	});
	initUl();
	selfInfo();
	userpicInfo();
	$(parent).find('#content-frame').css('height',$('.proInfo').height() + 250);
});

function getResourcesName(){
	var rPath = "http://resource.apaipian.com/resource/";
	return rPath;
}

function initUl(){
	$('.dropdown li').on('click',function(){
        $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
        var info=parseInt($(this).attr('data-info'));
        $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-value",($(this).attr('data-value')));
        $(this).parent().slideUp();
        if($(this).hasClass('Province'))
        	Province($(this));
        return false;
   });
	var sex = $('.sex').val();
	if(sex!=null && sex != ''){
		setSex(sex);
	}else{
		setSex(2);
	}
	var src = $('#user-img').attr('src');
	if(src == null || src == '' || src == undefined){
		$('#user-img').attr('src','/resources/images/provider/default-user.jpg');
		parent.find('#proLogo').attr('src','/resources/images/provider/default-user.jpg');
		$('#uploadBt').text('上传头像');
	}else{
		if(src.indexOf('group')> -1){
			var url = getDfsHostName() + src;
			$('#user-img').attr('src',url);
			$('#user_img_url').val(src);
			// 刷新父类页面
			parent.find('#proLogo').attr('src',url);
			$('#uploadBt').text('更换头像');
		}else{
			$('#uploadBt').text('上传头像');
		}
	}
	var name = $('#nickName').val();
	parent.find('.userName').text(name);
	
}
function setSex(sid){
	var item = $('.sexCheckItem');
	item.removeClass('selectItem');
	if(item != null){
		for ( var i in item) {
			var id = $(item[i]).attr('data-content');
			if(sid == id){
				$(item[i]).addClass('selectItem');
				break;
			}
		}
	}
}
function selfInfo(){
	$('.self-info-content').slideDown('normal');
	$("#nickName").off("change").on("change",function(){
		validateNickName();
	})
	// 注册 个人资料-修改按钮点击事件
	$('#self-info-contentBt').unbind('click');
	$('#self-info-contentBt').bind('click',function(){
		validateNickName(function(){
			if($("#self-info-contentBt").attr("disabled")=='disabled'){
				return false;
			}
			
			if($('#contact-email').val().trim() != ''){
				ret = checkEmail($('#contact-email').val().trim());
				if(!ret){
					showCommonError($('#contact-email-error'),"请输入正确的邮箱地址");
					return false;
				}else{
					showCommonError($('#contact-email-error'),"");
				}
			}
			
			var qq = $('#contact-qq').val().trim(); // QQ				
			var reg = /^[1-9]\d{4,9}$/;
			
			if(qq!=""){
				if(!qq.match(reg)){
					showCommonError($('#contact-qq-error'),"QQ号码有误!");
					$('#contact-qq').focus();
						return false;
				}
			}
			
			if($('#nickName').val().trim() != ''){
				var ret = true;
								
				if(ret){
					parent.find('.tooltip-wati').show();
					loadData(function(flag){
						// 提示信息修改成功
						if(flag){
							successToolTipShow('修改成功');
							parent.find('.tooltip-wati').hide();
						}else{
							successErrorTipShow('修改失败');
							parent.find('.tooltip-wati').hide();
						}
						$(window.parent.document).reload;
					}, getContextPath() + '/user/modify/info', $.toJSON({
						id : $('#user_unique').val(),
						userName : $('#nickName').val().trim(),
						sex : $('.selectItem').attr('data-content'),
						realName : $('#trueName').val().trim(),
						email : $('#contact-email').val().trim(),
						qq : $('#contact-qq').val().trim(),
						weChat : $('#contact-wechat').val().trim(),
						userCompany : $('#company').val().trim(),
						customerSource : $("#customerSource").attr('data-value'),
						imgUrl : $('#user_img_url').val()
					}))
				}
			}else{
				successErrorTipShow('修改异常');
			}
		});
	});
}

function validateNickName(fun){
	loadData(function(flag){
		if(!flag){
			$("#self-info-contentBt").attr('disabled','disabled');
			showCommonError($('#nickName-error'),"昵称存在");
		}else{
			$("#self-info-contentBt").removeAttr('disabled');
			showCommonError($('.infoItem'),"");
			fun();
		}
	}, getContextPath() + '/user/unique/username', $.toJSON({
		id : $('#user_unique').val(),
		userName : $('#nickName').val().trim(),
	}))
}


//头像修改
function userpicInfo(){

	uploader && uploader.destroy();
	uploader = WebUploader.create({
		auto:true,
		swf : '/resources/lib/webuploader/Uploader.swf',
		server : '/user/preview/photo',
		pick : '#uploadBt',
		accept :{
		    title: 'Images',
		    extensions: 'jpg,png,jpeg',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*256,
		duplicate: true//允许重复上传同一个
	});
	uploader.on('uploadSuccess', function(file,response) {
		var path = response._raw;
		if(path != '' && path != null){
			if(path.indexOf('false@error') > -1){
				// 开启 modal
				$('#errorModal').modal('show');
				
				if(path.indexOf("error=1") > -1){
					$('.errorImg').text('文件超过最大限制');
				} else if(path.indexOf("error=2") > -1){
					$('.errorImg').text('格式不正确');
					
				}
				
				$('#iKnow').unbind('click');
				$('#iKnow').bind('click',function(){
					$('#errorModal').modal('hide');
				});
			}else{
				// 打开 图片遮罩
				$('#mymodal').modal('show');
				
				$('#mymodal').on('hidden.bs.modal', function () {
					jcrop_api.destroy();
					loadData(function(){
						// 自定义文件删除成功
					}, getContextPath() + '/user/delete/photo', $.toJSON({
						id : $('#user_unique').val().trim(),
						imgUrl : path
					}));
				})
				var imgPath = getResourcesName() + path;
				$('#modal-original-img').attr('src',imgPath);
				$('#modal-preview').attr('src',imgPath);
				JcropFunction(); // 图片裁剪
				// 点击确定，裁剪文件，并将该文件转化为正规的文件名称
				$('#uploadConfirmBt').unbind('click');
				$('#uploadConfirmBt').bind('click',function(){
					if(x == 0 && y == 0 && x2 ==0 && y2 ==0){
						$('#user-img').attr('src',imgPath);
						$('#user_img_url').val(path);
						jcrop_api.destroy();
						$('#uploadConfirmBt').attr('disabled',false);
						$("#mymodal").modal("hide");
						return;
					}
					$('#uploadConfirmBt').attr('disabled','disabled');
					// 裁剪图片
					loadData(function(userTarget){
						jcrop_api.destroy();
						$('#uploadConfirmBt').attr('disabled',false);
						$("#mymodal").modal("hide");
						$('#user_img_url').val(userTarget.imgFileName);
						var imgPath = getResourcesName() + userTarget.imgFileName;
						$('#user-img').attr('src',imgPath);
					}, getContextPath() + '/user/cutPhoto', $.toJSON({
						userId : $('#user_unique').val().trim(),
						imgUrl : path,
						x : x,
						y : y,
						x2 : x2,
						y2 : y2,
						width : w,
						height : h,
						originalWidth : $("#modal-original-img").width(),
						originalHeight : $("#modal-original-img").height()
					}));
				});
			}
		}else{
			$('.errorImg').text('上传失败!');
		}
	});
	uploader.on('error', function(type) {
		// 开启 modal
		$('#errorModal').modal('show');
		 if (type=="Q_TYPE_DENIED"){
			 	$('.errorImg').text('格式不正确');
	        }else if(type=="F_EXCEED_SIZE"){
	        	$('.errorImg').text('文件超过最大限制');
	        }
		 $('#iKnow').unbind('click');
			$('#iKnow').bind('click',function(){
				$('#errorModal').modal('hide');
			});
	});
}


function updateProvider(){}
//成功信息 提示框弹出方法
function successToolTipShow(msg){
	window.clearInterval(successIntervalObj);
	parent.find('.tooltip-success-show').slideDown();
	parent.find("#tooltip-success-messageSSSS").val(msg);
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}
function hideSuccessTooltip(){
	parent.find('.tooltip-success-show').hide();
	location.reload();
}

function hideError(){
	parent.find('.tooltip-error-show').hide();
	location.reload();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(msg){
	window.clearInterval(successIntervalObj);
	parent.find('.tooltip-error-show').slideDown();
	parent.find("#tooltip-success-messageEEEE").val(msg);
	successIntervalObj = window.setInterval(hideError(), 3000);
}
function showInfomation(title,body){
	parent.find('#infomation').slideDown();
	parent.find('#infomation_title').text(title);
	parent.find('#infomation_body').text(body);
	parent.find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}
function hideInfomation(){
	$(window.parent.document).find('#infomation').hide();
}
//图片裁剪功能 start
function JcropFunction(){
	x=0;
	y=0;
	x2=0;
	y2=0;
	h=0;
	w=0;
	
	// 初始化Jcrop
	jcrop_api = $.Jcrop('#modal-original-img',{
		bgOpacity : 0.2,
		aspectRatio : 1 / 1,
		onSelect : updateCoords // 当选择完成时执行的函数
	});
}

function updateCoords(coords){
	
	x=coords.x;
	y=coords.y;
	x2=coords.x2;
	y2=coords.y2;
	w=coords.w;
	h=coords.h;
	
	if(parseInt(coords.w) > 0){
		//计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到 
		var rx = $(".modal-preview-container").width() / coords.w;
		var ry = $(".modal-preview-container").height() / coords.h;
		
		//通过比例值控制图片的样式与显示 
		$("#modal-preview").css({
			width:Math.round(rx * $("#modal-original-img").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积 
			height:Math.round(ry * $("#modal-original-img").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积 
			marginLeft:"-" + Math.round(rx * coords.x) + "px",
			marginTop:"-" + Math.round(ry * coords.y) + "px"
		});
		
	}
}
//图片裁剪功能 end
