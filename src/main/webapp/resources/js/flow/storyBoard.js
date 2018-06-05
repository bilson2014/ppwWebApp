var image_max_size = 1024*1024; // 250KB
var image_err_msg = '图片大小超出1MB上限,请重新上传!';
var upload_Video;
var upload_Update;
var successIntervalObj; // timer变量，控制时间
var nowPoint = [[1,2,3],[4,5,6]];
var setData = new Array();

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
			var picker =$('.updateImg'); 
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/multipUpload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				fileNumLimit : 10,//最多上传文件
				threads :1,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_Video.on('beforeFileQueued', function(file) {
				 var array = upload_Video.getFiles();
				 if(array.length == 10){
					 successToolTipShow("最多一次上传10张分镜");
				 }
			});
			
		/*	upload_Video.on('fileQueued', function(file) {
				$("#setImg").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
			});*/
			
			$('.picker').on('click',function(){
				$('.titleWarn').hide();
				$('#video-container').show();
				$('#changWord').text('了解详情');
			});
			
			
			// 文件上传过程中创建进度条实时显示。
			upload_Video.on('uploadProgress',function(file, percentage) {
				/*var $li = $('#' + file.id), $percent = $li
				.find('.progress .progress-bar');
				// 避免重复创建
				if (!$percent.length) {
					$percent = $(
							'<div class="progress progress-striped active">'
									+ '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 0%">'
									+ '</div>' + '</div>')
							.appendTo($li).find('.progress-bar');
				}*/
			/*	$li.find('.videoState').text('上传中');
				$percent.css('width', percentage * 100 + '%');*/
			});

			upload_Video.on('uploadSuccess', function(file,response) {
				
				if(response._raw == 'success'){
					$("#setImg").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
					/*$('body').find( '#'+file.id ).find('.videoState').text('已上传');
					$('body').find( '#'+file.id ).find('.videoState').addClass("showUpSuccess");
					$('body').find('#' + file.id).find('.progress').fadeOut();*/
				}else{
					/*$('body').find( '#'+file.id ).find('.videoState').text('上传失败');
					$('body').find('#' + file.id).find('.progress').fadeOut();*/
				}
				
			});
			upload_Video.on('uploadError', function(file,reason) {
				//console.info(reason);
				successToolTipShow(reason);
			});
			upload_Video.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	successToolTipShow('请上传mp4格式');
			        }else if(type=="F_EXCEED_SIZE"){
						successToolTipShow(video_err_msg);
			        }
			});
			$("#submit-multip").on('click', function() {
				upload_Video.upload();
			});
		}
}

function delImgEven(){
	
	$('.delLoadImg').off('click').on('click',function(){
		
		$('#checkSureModel').show();
		$('.closeBtn').off('click').on('click',function(){
			$('#checkSureModel').hide();
		});
		$('.closeBtn').off('click').on('click',function(){
			$('.cModel').hide();
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
			
			// 文件上传过程中创建进度条实时显示。
			upload_Update.on('uploadProgress',function(file, percentage) {
				/*var $li = $('#' + file.id), $percent = $li
				.find('.progress .progress-bar');
				// 避免重复创建
				if (!$percent.length) {
					$percent = $(
							'<div class="progress progress-striped active">'
									+ '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style="width: 0%">'
									+ '</div>' + '</div>')
							.appendTo($li).find('.progress-bar');
				}*/
			/*	$li.find('.videoState').text('上传中');
				$percent.css('width', percentage * 100 + '%');*/
			});

			upload_Update.on('uploadSuccess', function(file,response) {
				
				if(response._raw == 'success'){
					$("#setImg").append(juicer(videoList_tpl.upload_Tpl,{file:file}));
					/*$('body').find( '#'+file.id ).find('.videoState').text('已上传');
					$('body').find( '#'+file.id ).find('.videoState').addClass("showUpSuccess");
					$('body').find('#' + file.id).find('.progress').fadeOut();*/
				}else{
					/*$('body').find( '#'+file.id ).find('.videoState').text('上传失败');
					$('body').find('#' + file.id).find('.progress').fadeOut();*/
				}
				
			});
			upload_Update.on('uploadError', function(file,reason) {
				//console.info(reason);
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
	    " <div class='loadImg'>"+
	    "        <div>重新上传</div>"+
	    "        <img class='delLoadImg' src='/resources/images/flow/del.png'>"+
	    "        <img class='backgroundImg' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527507228707&di=5e7521e976e53da5ace3e221447a1a74&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01635d571ed29832f875a3994c7836.png%40900w_1l_2o_100sh.jpg'>"+
	    " </div>"+
	    " <textarea class='checkImgText' placeholder='请输入镜头要求...'></textarea>"+
        "</div>"
		].join("")
}






