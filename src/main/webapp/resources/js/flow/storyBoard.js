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
	
	initOption();
	getMyProject();
	 $('.modelProItem').off('click').on('click',function(){
			$('.modelProItem').removeClass('modelPActive');
			$(this).addClass('modelPActive');
	});
	 
	$('#saveProject').off('click').on('click',function(){
		if(checkError()){
			getValue();
			/*if($('#projectId').val() >= 0){
				getValue();
			}else{
				getMyProject();			
			}*/
		}
	});
	
	$('.openTool').off('click').on('click',function(){
		openProjectModel();
	});
	
	$('.closeModel,#cancleLoadProduct').off('click').on('click',function(){
		$('#loadProductModel').hide();
	});

});

function openProjectModel(){
	$('#loadProductModel').show();
	loadData(function(src){
		var ss = src;
	}, getContextPath() + '/continuity/list/synergetic','');
	
}

function getMyProject(){
	
	loadData(function(item){
		
		var src = item;
		
	}, getContextPath() + '/continuity/synergetic/listByName', $.toJSON({
		projectName:'',
	}));
}

function initOption(){
	imgUpload.init();
	newSelectCheck();
	initSelect();
	initCheckBox();
}

function optEntity( type,picture,description){
	this.type =  type;
	this.picture = picture;
	this.description = description;
}

function getValue(){
		
	var imgItem = $('.imgItem');
		
	for (var int = 0; int < imgItem.length; int++) {
		 var type = $(imgItem[int]).find('.checkImgType').attr('data-id');
		 var image = $(imgItem[int]).find('.backgroundImg').attr('src');
		 var text = $(imgItem[int]).find('.checkImgText').val();
		 setData.push(new optEntity(type,image,text));
	}
	
	var storyName = $('#storyName').val();
	var dimensionId = $('#time .active').attr('data-id');	
	var pictureRatio = $('#videoType .active').attr('data-id');
	var videoStyle = $('#videoStyle .active').attr('data-id');
	
	loadData(function(){
        
	}, getContextPath() + '/continuity/save', $.toJSON({
		 ShootingScript:setData,
		 name:storyName,
		 delImgs:delImgGroup,
		 videoStyle:videoStyle,
		 pictureRatio:pictureRatio,
		 dimensionId:dimensionId,
		 id:0,
	}));
		
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
	$(changeImg).each(function() {
		$(this).load(function(){
			var realHeight = $(this).height();
			var realWidth  = $(this).width();			
			if(realHeight >= realWidth){				
				$(this).css('height',needHeight).css('width','auto');
			}
			else{
				$(this).css('height','auto').css('width',needWidth);
				if(realWidth/realHeight < (16/9)){
					$(this).css('height','auto').css('width',needHeight);
				}
			}
		});
    });
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
		
	var checkImgType = $('.checkImgType');
	if(checkImgType.length>0){
		for (var int = 0; int < checkImgType.length; int++) {
			  var val = $(checkImgType[int]).attr('data-id');
			  if(val == '' || val == null || val ==undefined){
					successToolTipShow('镜头类型未填写');
					 return false;
				}
		}
	}else{
		successToolTipShow('镜头未添加');
		return false;
	}
	
	var checkImgText = $('.checkImgText');
	if(checkImgText.length>0){
		for (var int = 0; int < checkImgText.length; int++) {
			  var val = $(checkImgText[int]).val();
			  if(val == '' || val == null || val ==undefined){
					successToolTipShow('镜头要求未填写');
					 return false;
				}
		}
	}else{
		successToolTipShow('镜头未添加');
		return false;
	}
		
	var storyName = $('#storyName').val();
	if(storyName == '' || storyName == null || storyName ==undefined){
		successToolTipShow('脚本名称未填写');
		return false;
	}
	
	//附加
	/*var howManyBox = $('.onebox');
	for (var int = 0; int < howManyBox.length; int++) {
			 var thisItem = $(howManyBox[int]).find('.boxItem');
			    for (var j = 0; j < thisItem.length; j++) {
					 if($(thisItem[j]).hasClass('active')){
						 break;
					 }
					 successToolTipShow('视频信息不完整');
					 return false;
				}
	}*/
	
	var time = $('#time .active');
	if(!time.length > 0){
		successToolTipShow('视频时长未选择');
		return false;
	}
	
	var videoType = $('#videoType .killDiv  .active');
	if(!videoType.length > 0){
		successToolTipShow('画幅比例未选择');
		return false;
	}
	
	var videoStyle = $('#videoStyle .active');
	if(!videoStyle.length > 0){
		successToolTipShow('影片风格未选择');
		return false;
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
var imgUpload = {
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
				threads :10,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			
			upload_Video.on('uploadProgress',function(file, percentage) {
				
			});

			upload_Video.on('uploadSuccess', function(file,response) {
				
				if(response.code == 0){
					    var path = response.result;
						var imgPath = getResourcesName() + path;
						$(".addItem").before(juicer(videoList_tpl.upload_Tpl,{file:imgPath,path:path}));
//						console.log(file:imgPath);
//						console.log(path:path);
						initImgSize();						
						initSortable();
						delImgEven();	
						initSelect();
						initCheckBox();
						imgUpdate.init();
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

		}
		
		
}

//删除图片
function delImgEven(){
	
	$('.delLoadImg').off('click').on('click',function(){
		var thiItem = $(this);
		var path = $(this).parent().attr('data-id');
		
		$('#checkSureModel').show();
		$('.closeBtn,#cModel').off('click').on('click',function(){
			$('#checkSureModel').hide();
		});
		$('#tModel').off('click').on('click',function(){
			delImgGroup += path +';';
			thiItem.parent().parent().remove();
		});
		
	})
	
}

//图片更新
var imgUpdate = {
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
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:false,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			
			upload_Update.on('uploadSuccess', function(file,response) {
				var uploaderId = '#rt_'+file.source.ruid;
				var nowEven = $(uploaderId).parent().parent();
				var delImg = nowEven.attr('data-id');	
				
				if(response.code == 0){
					    delImgGroup += delImg +';';
					    var path = response.result;
						var imgPath = getResourcesName() + path;
						nowEven.find('.backgroundImg').attr('src',imgPath);
						nowEven.attr('data-id',path);
						initImgSize();
						console.log(delImgGroup);
				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_Update.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_Update.on('error', function(type) {
				 if (type=="Q_TYPE_DENIED"){
					 	successToolTipShow('请上传正确格式的图片');
			        }else if(type=="F_EXCEED_SIZE"){
						successToolTipShow('请上传1M以内的图片');
			        }
			});

		}
}

var videoList_tpl = {
		upload_Tpl:[
		"<div class='imgItem'>"+
        "<div class='orderSelect'>"+
        "        <div class='imgType checkImgType'>请选择镜头类型</div>"+
        "        <img src='/resources/images/flow/selectS.png'>"+
        "        <ul class='oSelect' style='display: none;'>"+
        "           <li data-id='1'>极远景</li>"+
        "           <li data-id='2'>远景</li>"+
        "           <li data-id='3'>大全景</li>"+
        "           <li data-id='4'>全景</li>"+
        "           <li data-id='5'>中景</li>"+
        "           <li data-id='6'>近景</li>"+
        "           <li data-id='7'>特写</li>"+
        "           <li data-id='8'>大特写</li>"+
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







