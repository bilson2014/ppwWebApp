var image_max_size = 1024*1024; // 250KB
var image_err_msg = '图片大小超出1MB上限,请重新上传!';
var upload_Video;
var upload_Update;
var successIntervalObj; // timer变量，控制时间
var nowPoint = [[1,2,3],[4,5,6]];
var setData = new Array();
//头像裁剪参数 start
var jcrop_api;
var x;
var y;
var x2;
var y2;
var w;
var h;
var timer = null;
var loadTime = 0;
//头像裁剪参数 end
var delImgGroup = '';

$().ready(function() {
	
	console.log(nowPoint[0][0]);

	initSelect();
	initSortable();
	initCheckBox();
	videoListProtal.init();
	videoUpdate.init();
	 $('.modelProItem').off('click').on('click',function(){
			$('.modelProItem').removeClass('modelPActive');
			$(this).addClass('modelPActive');
	});
	$('#saveProject').off('click').on('click',function(){
		checkError();
	});
	$('.openTool').off('click').on('click',function(){
		$('#loadProductModel').show();
	});
	$('.closeModel,#cancleLoadProduct').off('click').on('click',function(){
		$('#loadProductModel').hide();
	});
	
	
	
	initImgSize();
	newSelectCheck();
	

	
});

function optEntity(key,value,type){
	this.key = key;
	this.value = value;
	this.type = type;
}

function getValue(){
	
	
	var imgItem = $('.imgItem');
	for (var int = 0; imgItem < array.length; int++) {
		 var type = $(imgItem[int]).find('.checkImgType');
		 var image = $(imgItem[int]).find('.backgroundImg');
		 var text = $(imgItem[int]).find('.checkImgText');
		 setData.push(new optEntity(itemId,itemValues,setType));
	}
	
	var storyName = $('#storyName').val();
	var productLine = $('#productLine').attr('data-id');
	var productType = $('#productType').attr('data-id');
	var getActive = $('.active');
	for (var int = 0; getActive < array.length; int++) {

	}
	
	
}


function newSelectCheck(){
	
	$('.productLine').off('click').on('click',function(e){
		$('.selectUl').hide();
		if($(this).hasClass('selectColor')){
			$('.selectUl').slideUp();
			$(this).removeClass('selectColor');
		}
		else
		{
			$('.productLine').removeClass('selectColor');
			$(this).find('.selectUl').slideDown();
			$(this).addClass('selectColor');
		}
		e.stopPropagation();
	});
	$('.selectUl li').off('click').on('click',function(e){
		 var id = $(this).attr('data-id');
	   	 $(this).parent().parent().find('div').text($(this).text());
	   	 $(this).parent().parent().find('div').attr('data-id',id);
	   	 $(this).parent().slideUp();
	   	 $('.productLine').removeClass('selectColor');

	     e.stopPropagation();
	});
	
}

function initImgSize(){
	var needWidth = $('.loadImg').css('width');
	var needHeight = $('.loadImg').css('height');	
	var changeImg = $('.backgroundImg');
	for (var int = 0; int < changeImg.length; int++) {
			var realHeight = $(changeImg[int]).height();
			var realWidth  = $(changeImg[int]).width();			
			if(realHeight >= realWidth){				
				$(changeImg[int]).css('height',needHeight).css('width','auto');
			}
			else{
				$(changeImg[int]).css('height','auto').css('width',needWidth);
				if(realWidth/realHeight < (16/9)){
					$(changeImg[int]).css('height','auto').css('width',needHeight);
				}
			}
	}
}

function initSortable(){
	$( ".setImg" ).sortable({
		cursor:'move',
		items:'.imgItem',
		opacity:0.6,
	});
	$( ".setImg" ).disableSelection();      
}

function initCheckBox(){
	getBox($('#time .boxItem'));
	getBox($('#videoType .boxItem'));
	getBox($('#videoStyle .boxItem'));
	
	function getBox(id){
		id.on('click',function(){
			id.removeClass('active');
			$(this).addClass('active');
		})
	}
}

function checkError(){
		
	var checkImgType = $('.checkImgType').attr('data-id');
	if(checkImgType == '' || checkImgType == null || checkImgType ==undefined){
		successToolTipShow('镜头类型未填写');
		 return false;
	}
	
	var checkImgText = $('.checkImgText').val();
	if(checkImgText == '' || checkImgText == null || checkImgText ==undefined){
		successToolTipShow('镜头要求未填写');
		 return false;
	}
		
	var storyName = $('#storyName').val();
	if(storyName == '' || storyName == null || storyName ==undefined){
		successToolTipShow('脚本名称未填写');
		 return false;
	}
	
	var productLine = $('#productLine').attr('data-id');
	if(productLine == '' || productLine == null || productLine ==undefined){
		successToolTipShow('阶段未选择');
		 return false;
	}
	
	var productType = $('#productType').attr('data-id');
	if(productType == '' || productType == null || productType ==undefined){
		successToolTipShow('视频类型未选择');
		 return false;
	}
	
	//附加
	var howManyBox = $('.onebox');
	for (var int = 0; int < howManyBox.length; int++) {
			 var thisItem = $(howManyBox[int]).find('.boxItem');
			    for (var j = 0; j < thisItem.length; j++) {
					 if($(thisItem[j]).hasClass('active')){
						 break;
					 }
					 successToolTipShow('视频信息不完整');
					 return false;
				}
	}
	
	return true;
	
}
//错误提示
function successToolTipShow(error){
		window.clearInterval(successIntervalObj);
		$('.tooltip-success-show').show();
		$(".tooltip-success-show").text(error);
		successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
	}
	
function hideSuccessTooltip(){
		$('.tooltip-success-show').hide();
	}

//文件批量上传
var videoListProtal = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},

		multipUploadFile:function(){
			upload_Video && upload_Video.destroy();
			var picker =$('#picker'); 
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			
			upload_Video.on('uploadProgress',function(file, percentage) {
				$('#modal-original-img').attr('src','');
				$('#modal-preview').attr('src','');
				$('#mymodal').show();
			});

			upload_Video.on('uploadSuccess', function(file,response) {
				
				if(response.code == 0){
					    var path = response.result;
						
						$('#closePhone').on('click', function () {
							$('#mymodal').hide();
							jcrop_api.destroy();
						/*	loadData(function(){
								// 自定义文件删除成功
							}, getContextPath() + '/user/delete/photo', $.toJSON({
								id : $('#user_unique').val().trim(),
								imgUrl : path
							}));*/
						});
						var imgPath = getResourcesName() + path;
						$('#modal-original-img').attr('src',imgPath);
						checkImgComplete(path);					
				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_Video.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	successToolTipShow('请上传正确格式的图片');
			        }else if(type=="F_EXCEED_SIZE"){
						successToolTipShow('请上传1M以内的图片');
			        }
			});
			$("#submit-multip").on('click', function() {
				upload_Video.upload();
			});
		}
}

function checkImgComplete(path){
	
	
	   document.getElementById("modal-original-img").onload = function () {
	        console.log("图片加载已完成");
	        initCutImg();
			JcropFunction();
			cutUpload(path);
	    }
/*	var imgObj = document.getElementById("modal-original-img");
	loadTime++;
	timer = setInterval(function(){
		if(imgObj.complete){
			loadTime = 0;
			clearInterval(timer);
			timer = null;
			initCutImg();
			JcropFunction();
			cutUpload(path);
		}else{
			if(loadTime > 10){
				jcrop_api.destroy();
				upload_Video.destroy();
				$("#mymodal").hide();
				successToolTipShow('网络异常请重新上传');
			}else{
				checkImgComplete(path);
			}
		}
	},500);*/
}
	
function initCutImg(){
	$('#modal-original-img').attr('style','');
	$('#modal-original-img').css('width','100%');
	var needWidth = $('.modal-original').css('width');
	var needHeight = $('.modal-original').css('height');	
	var changeImg = $('#modal-original-img');	
    var realHeight = changeImg.height();
	var realWidth  = changeImg.width();			
			if(realHeight >= realWidth){				
				changeImg.css('height',needHeight).css('width','auto');
			}
			else{
				changeImg.css('height','auto').css('width',realWidth);
			}
}

function cutUpload(path){
	
	// 点击确定，裁剪文件，并将该文件转化为正规的文件名称
	$('#uploadConfirmBt').unbind('click');
	$('#uploadConfirmBt').bind('click',function(){
		if(x == 0 && y == 0 && x2 ==0 && y2 ==0){
			jcrop_api.destroy();
			$('#uploadConfirmBt').attr('disabled',false);
			$("#mymodal").hide;
			return;
		}
		$('#uploadConfirmBt').attr('disabled','disabled');
		// 裁剪图片
		loadData(function(userTarget){
			
			if(userTarget.code == 200){
				jcrop_api.destroy();
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				var imgPath = getResourcesName() + userTarget.result;
				$("#setImg").prepend(juicer(videoList_tpl.upload_Tpl,{file:imgPath,path:userTarget.result}));
				delImgEven();
			}else{
				jcrop_api.destroy();
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				successToolTipShow('图片异常请重新上传');
			}
			
		}, getContextPath() + '/web/cutPhoto', $.toJSON({
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


//裁剪start
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
		aspectRatio : 16/9,
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

//裁剪end

//删除图片
function delImgEven(){
	
	$('.delLoadImg').off('click').on('click',function(){
		
		var path = $(this).parent().attr('data-id');
		
		$('#checkSureModel').show();
		$('.closeBtn,#cModel').off('click').on('click',function(){
			$('#checkSureModel').hide();
		});
		$('#tModel').off('click').on('click',function(){
			delImgGroup += path +';';
		});
		
	})
	
}


//图片更新
var videoUpdate = {
		init : function() {
			//批量上传
			this.uploadFile();
		},

		uploadFile:function(){
			upload_Update && upload_Update.destroy();
			var picker =$('.updateImg'); 
			upload_Update = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/provider/multipUploadFile',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				fileNumLimit : 1,//最多上传文件
				threads :1,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			

			upload_Update.on('uploadSuccess', function(file,response) {
				
				if(response._raw == 'success'){
				//	$("#setImg").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
				}else{

				}
				
			});
			upload_Update.on('uploadError', function(file,reason) {

				successToolTipShow(reason);
			});
			upload_Update.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	successToolTipShow('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						successToolTipShow(video_err_msg);
			        }
			});
			$("#submit-multip").on('click', function() {
				upload_Update.upload();
			});
		}
}

var videoList_tpl = {
		upload_Tpl:[
		"<div class='imgItem'>"+
        "<div class='orderSelect'>"+
        "        <div class='imgType checkImgType'>请选择镜头</div>"+
        "        <img src='/resources/images/flow/selectS.png'>"+
        "        <ul class='oSelect' style='display: none;'>"+
        "           <li data-id='0'>全部</li>"+
        "           <li data-id='1'>沟通阶段</li>"+
        "           <li data-id='2'>方案阶段</li>"+
        "           <li data-id='3'>商务阶段</li>"+
        "           <li data-id='4'>制作阶段</li>"+
        "           <li data-id='5'>交付阶段</li>"+
        "        </ul>    "+
	    " </div>"+
	    " <div class='loadImg' data-id='${path}'>"+
	    "        <div class='updateImg'>重新上传</div>"+
	    "        <img class='delLoadImg' src='/resources/images/flow/del.png'>"+
	    "        <img class='backgroundImg' src='${file}'>"+
	    " </div>"+
	    " <textarea class='checkImgText' placeholder='请输入镜头要求...'></textarea>"+
        "</div>"
		].join("")
}






