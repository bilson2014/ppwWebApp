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
// 自定义图片上传 检验参数
$().ready(function() {
	$('.sexCheckItem').on('click', function() {
		$('.sexCheckItem').removeClass('selectItem');
		$(this).addClass('selectItem');
	});

	initUl();
	selfInfo();
	userpicInfo();
	

});


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
			if($('#nickName').val().trim() != ''){
				var ret = true;
				if($('#contact-email').val().trim() != ''){
					ret = checkEmail($('#contact-email').val().trim());
					if(!ret){
						showCommonError($('#contact-email-error'),"请输入正确的邮箱地址");
					}else{
						showCommonError($('#contact-email-error'),"");
					}
				}
				if(ret){
					loadData(function(flag){
						// 提示信息修改成功
						$('.tooltip-show').slideDown('normal');
						if(flag){
							$("#user-name").text($("#nickName").val());
							$(".header-name").text($("#trueName").val());
							successToolTipShow('信息修改成功!');
						}else{
							successErrorTipShow('信息修改失败，请刷新后再试!');
							alert('success');
						}
						window.setInterval(hideTooltip, 2000);
					}, getContextPath() + '/user/modify/info', $.toJSON({
						id : $('#user_unique').val(),
						userName : $('#nickName').val().trim(),
						sex : $('.selectItem').attr('data-content'),
						realName : $('#trueName').val().trim(),
						email : $('#contact-email').val().trim(),
						qq : $('#contact-qq').val().trim(),
						weChat : $('#contact-wechat').val().trim(),
						userCompany : $('#company').val().trim(),
						customerSource : $("#customerSource").text().trim()
					}))
				}
			}else{
				alert('error');
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
		    extensions: 'jpg,png',
		    mimeTypes: 'image/jpeg,image/png'
		},
		resize : true,
		chunked : false,
		fileSingleSizeLimit : 1024*2048,
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
				var imgPath = getDfsHostName() + path;
				$('#modal-original-img').attr('src',imgPath);
				$('#modal-preview').attr('src',imgPath);
				JcropFunction(); // 图片裁剪
				// 点击确定，裁剪文件，并将该文件转化为正规的文件名称
				$('#uploadConfirmBt').unbind('click');
				$('#uploadConfirmBt').bind('click',function(){
					$('#uploadConfirmBt').attr('disabled','disabled');
					// 裁剪图片
					loadData(function(userTarget){
						jcrop_api.destroy();
						$('#uploadConfirmBt').attr('disabled',false);
						$("#mymodal").modal("hide");
						var imgPath = getDfsHostName() + userTarget.imgFileName;
						$('#user-img').attr('src',imgPath);
						$('#user-circle-img').attr('src',imgPath);
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
			 	$('#error-message').text('格式不正确');
	        }else if(type=="F_EXCEED_SIZE"){
	        	$('#error-message').text('文件超过最大限制');
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
	$(window.parent.document).find('.tooltip-success-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageSSSS").val(msg);
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}
function hideSuccessTooltip(){
	$(window.parent.document).find('.tooltip-success-show').hide();
	location.reload();
}

function hideError(){
	$(window.parent.document).find('.tooltip-error-show').hide();
	location.reload();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(msg){
	window.clearInterval(successIntervalObj);
	$(window.parent.document).find('.tooltip-error-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageEEEE").val(msg);
	successIntervalObj = window.setInterval(hideError(), 3000);
}
function showInfomation(title,body){
	$(window.parent.document).find('#infomation').slideDown();
	$(window.parent.document).find('#infomation_title').text(title);
	$(window.parent.document).find('#infomation_body').text(body);
	$(window.parent.document).find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}
function hideInfomation(){
	$(window.parent.document).find('#infomation').hide();
}
