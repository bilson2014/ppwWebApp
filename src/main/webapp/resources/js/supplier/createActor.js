var upload_Video;
var upload_Update;
var upload_dir;
var upload_site;
var upload_sitemore;
var image_max_size = 1024*1024; // 250KB
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
$().ready(function() {
	
	peoplechengck();
	gathermethod();
//	userpicInfo();
	imgUpload1.init();
	imgUpload2.init();
	imgUpload3.init();
	imgUpload4.init();
	imgUpload5.init();
	//初始化jcrop
//	JcropFunction();
//	JcropFunctionsite();
	
});

//角色选择
function peoplechengck(){
	$("body").on("mouseover","#filePicker1 ,#filePicker3 ,#filePicker4",function(){
		$(this).find('.reupload').show();
	});
	$("body").on("mouseout","#filePicker1 ,#filePicker3,#filePicker4",function(){
		$(this).find('.reupload').hide();
	});
	$('body').on('click','#closePhone',function(){
		jcrop_api.destroy();//销毁
		$('#uploadConfirmBt').attr('disabled',false);
		$("#mymodal").hide();
	});
	
	$('body').on('mouseover','.showimages .imgsboxs,.siteimages .imgsboxs',function(){
		$(this).find('.imgshade ').show();
	});
	$('body').on('mouseout','.showimages .imgsboxs,.siteimages .imgsboxs ',function(){
		$(this).find('.imgshade ').hide();
	});
	//同下
	$('body').on('click','.showimages .imgsboxs .imgshade .select',function(){
		$('#filePicker2').removeAttr("style");
		$('#filePicker2').addClass('webuploader-container');
		if ($(this).parent().parent().parent().children('.imgsboxs').length==1){
			$(this).parent().parent().remove();
			$('.staffbox .showimages').hide();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
//			console.log(removesrc);
			var welldata=$('.showimages').attr('data-value');
			welldata=welldata+";"+removesrc;
			$('.showimages').attr('data-value',welldata);
		}else {
			$(this).parent().parent().remove();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
//			console.log(removesrc);
			$('.showimages').attr('data-value',removesrc);
		}
	});
	$('body').on('click','.siteimages .imgsboxs .imgshade .select',function(){
		$('#filePicker5').removeAttr("style");
		$('#filePicker5').addClass('webuploader-container');
		if ($(this).parent().parent().parent().children('.imgsboxs').length==1){
			$(this).parent().parent().remove();
			$('.sitebox .siteimages').hide();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
//			console.log(removesrc);
			var welldata=$('.siteimages').attr('data-value');
			welldata=welldata+";"+removesrc;
			$('.siteimages').attr('data-value',welldata);
		}else {
			$(this).parent().parent().remove();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
//			console.log(removesrc);
			$('.siteimages').attr('data-value',removesrc);
		}
	});
	
	
	$('.check,.more').off('click').on('click',function(){
		$('.morecheck').show();
	});


	$('.morecheck span').off('click').on('click',function(){
		$('.morecheck').hide();
		$('.check').text($(this).text());
	});
	//addpeople的确认 和取消
	$('.addpeople .sure').off('click').on('click',function(){
		$('.addpeople').hide();
		listcitydata();
		if ($('.check').text()=='演员'){
			listpeopledata('actor');
			$('.staffbox').show();
			$('.staffbox .stafftitle span').text('创建演员');
			cleanactordata();
			//提前加载图片
			imgcheckpeoplefive();
		}else if($('.check').text()=='导演'){
			listpeopledata('director');
			$('.directorbox').show();
			cleadirectordata();
			$('.directorbox .directortitle span').text('创建导演');
			imgcheckpeoplefive();
			cleadirectordata();
		}
	});
	$('.addpeople .cancel,.directorbox .cancel,.staffbox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.addpeople').hide();
		$('.staffbox').hide();
		$('.directorbox').hide();
		cleadirectordata();
		cleanactordata();
		$('.skillcheck').hide();
		$('.citycheck').hide();
		
	});
	
	
}
//创建演员
function gathermethod(){
	//关闭弹框
	$('.stafftitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.staffbox').hide();	
		cleanactordata();
		
	});
	//下拉框出现(性别、种族、城市)$('body').on('click','.citycheck p',function(){
	$('.gatherleft .gendergather,.gatherleft .genderimg').off('click').on('click',function(){
		$('.twocheck').show();	
		$('.racecheck').hide();
		$('.citycheck').hide();
	});
	$('.twocheck p').off('click').on('click',function(){
		$('.gendergather').attr('key',$(this).attr('key'));
		$('.gendergather').text($(this).text());
		$('.twocheck').hide();
	});
	
	$('.gatherleft .racegather,.gatherleft .raceimg').off('click').on('click',function(){
		$('.racecheck').show();
		$('.twocheck').hide();
		$('.citycheck').hide();
	});
	$('body').on('click','.racecheck p',function(){
		$('.racegather').text($(this).text());
		$('.racegather').attr('value',$(this).attr('value'));
		$('.racecheck').hide();
	});
	
	$('.gatherleft .citygather,.gatherleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
		$('.twocheck').hide();
		$('.racecheck').hide();
	});
	$('body').on('click','.citycheck p',function(){
		$('.citygather').text($(this).text());
		$('.citygather').attr('cityid',$(this).attr('cityid'));
		$('.citycheck').hide();
	});
	$('.gatherleft .namegather,.gatherleft .oldgather,.gatherleft .pricegather,.gather .remarkgather').off('click').on('click',function(){
		$('.citycheck').hide();
		$('.twocheck').hide();
		$('.racecheck').hide();
	});
	//图片的操作
	$('.imgsboxs').off('mouseover').on('mouseover',function(){
		$(this).find('.imgshade ').show();
	});
	$('.imgsboxs').off('mouseout').on('mouseout',function(){
		$(this).find('.imgshade ').hide();
	});
	//提交
	$('.gatherbut .sure').off('click').on('click',function(){
		var namegather=$('.namegather').val();
		var gendergather=$('.gendergather').text();
		var oldgather=$('.oldgather').val();
		var racegather=$('.racegather').text();
		var citygather=$('.citygather').text();
		var pricegather=$('.pricegather').val();
		var remarkgather=$('.remarkgather').val();
		
		var fileimg=$('#filePicker1 .fileimg').attr('src');
		console.log(fileimg);
		
		
		var endimg;
		$('.imgsboxs').children('img').each(function(){
			var moreimg=$(this).attr('data-value');
			if (endimg==null||endimg==undefined||endimg==''){
				endimg=moreimg;
			}else {
				endimg=endimg+";"+moreimg;
			}
		})
			
		$('.namegatherp').text('');
		$('.oldgatherp').text('');
		$('.pricegatherp').text('');
		$('.gendergatherp').text('');
		$('.racegatherp').text('');
		$('.citygatherp').text('');
		if (namegather==undefined||namegather==null||namegather==''){
			$('.namegatherp').text('*姓名不能为空');
			return false;
		}else if(gendergather=='请选择性别'){
			$('.gendergatherp').text('*请选择性别');
			return false;
		}else if (oldgather==undefined||oldgather==null||oldgather==''){
			$('.oldgatherp').text('*出生年份不能为空');
			return false;
		}else if(racegather=='请选择种族'){
			$('.racegatherp').text('*请选择种族');
			return false;
		}else if(citygather=='请选择城市'){
			$('.citygatherp').text('*请选择城市');
			return false;
		}else if (pricegather==undefined||pricegather==null||pricegather==''){
			$('.pricegatherp').text('*价格不能为空');
			return false;
		}else if (fileimg==undefined||fileimg==null||fileimg==''){
			$('.gatherright .addboxs span').attr("style","color: red;");
			return false;
		}else {
			var biao=$('.staffbox .stafftitle span').text();
			if(biao=='修改演员'){
				console.log('修改演员');
				var biaoID=$('.staffbox').attr('id');
				loadData(function(result){	
					console.log(result);
					cleanactordata();
					$('.setting').hide();
					$('.staffbox').hide();
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/actor/update', $.toJSON({						
					 id:biaoID,//获取的id
					 birthDay:oldgather,//出生日期
					 city:$('.citygather').attr('cityid'),//城市(编码)
					 delImg:$('.staffbox .showimages').attr('data-value'),//待删除图片
					 mainPhoto:$('#filePicker1 .fileimg').attr('data-value'),//主图
					 name:namegather,//姓名
					 photo:endimg,//更多图片
					 price:pricegather,//价格
					 remark:remarkgather,//备注
					 sex:$('.gendergather').attr('key'),//性别(1,2)
					 zone:$('.racegather').attr('value'),//种族(编码)
					
				}));
			}else{
				console.log('新建保存演员');
				loadData(function(result){	
					console.log(result);
					cleanactordata();
					$('.setting').hide();
					$('.staffbox').hide();
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/actor/save', $.toJSON({						
					 birthDay:oldgather,//出生日期
					 city:$('.citygather').attr('cityid'),//城市(编码)
					 delImg:$('.staffbox .showimages').attr('data-value'),//待删除图片
					 mainPhoto:$('#filePicker1 .fileimg').attr('data-value'),//主图
					 name:namegather,//姓名
					 photo:endimg,//更多图片
					 price:pricegather,//价格
					 remark:remarkgather,//备注
					 sex:$('.gendergather').attr('key'),//性别(1,2)
					 zone:$('.racegather').attr('value'),//种族(编码)
				}));
			}
		}
		
	});	
}
//清楚数据
function cleanactordata(){
	$('.namegatherp').text('');
	$('.oldgatherp').text('');
	$('.pricegatherp').text('');
	$('.gendergatherp').text('');
	$('.racegatherp').text('');
	$('.citygatherp').text('');
	
	$('.namegather').val('');
	$('.gendergather').text('请选择性别');
	$('.oldgather').val('');
	$('.racegather').text('请选择种族');
	$('.citygather').text('请选择城市');
	$('.pricegather').val('');
	$('.remarkgather').val('');
	
	$('.citycheck').hide();
	$('.twocheck').hide();
	$('.racecheck').hide();
	$('.addboxs span').removeAttr("style");
	$('#filePicker2').removeAttr("style");
	$('#filePicker2').addClass('webuploader-container');
	$('#filePicker1 .fileimg').removeAttr('data-value');
	$('#filePicker1 .fileimg').removeAttr('src');
	$('#filePicker1 .reupload').remove();
	$('#filePicker1 .addimgs,#filePicker1 .clickimg').show();
	$('#filePicker1').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加图片</p>");

	$('.showimages').hide();
	$('.showimages').empty();
}
//删除演员和导演
function delpeople(id,identity){
	if (identity=='actor'){
		loadData(function(res){	
			//getlistdatap();//获取人数据
		 }, getContextPath() + '/production/actor/delete', $.toJSON({						
			 id:id,//	主键
		}));
	}else{
		loadData(function(res){	
			//getlistdatap();//获取人数据
		 }, getContextPath() + ' /production/director/delete', $.toJSON({						
			 id:id,//	主键
		}));
	}
}
//文件批量上传
var imgUpload1 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		
		multipUploadFile:function(){
			upload_Video && upload_Video.destroy();
		/*	var picker =$('.pickimg'); */
			var picker =$('#filePicker1'); 
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
				},
			});
			upload_Video.on('uploadProgress',function(file, percentage) {
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				console.log(file);
				console.log(response);
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功了 图片');			
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker1');
					cutUpload(path,'filePicker1');

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
//			//计算有多少个实例化按钮
//			 var boxes_len = $(".filesimage").length;
//		    //循环实例化页面的上传按钮
//		     for(var i=1; i<=boxes_len ;i++){
//		    	 upload_Video.addButton({
//		             id : "#filePicker"+(i),//必须唯一
//		             innerHTML : '选择图片',
//		         });
//		     }
			
			
		}		
}
//文件批量上传--------------
var imgUpload2 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		
		multipUploadFile:function(){
			upload_Update && upload_Update.destroy();
		/*	var picker =$('.pickimg'); */
			var picker =$('#filePicker2'); 
			upload_Update = WebUploader.create({
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
				},
			});
			upload_Update.on('uploadProgress',function(file, percentage) {
			});
			upload_Update.on('uploadSuccess', function(file,response) {
				console.log(file);
				console.log(response);
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功了 图片');			
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker2');
					cutUpload(path,'filePicker2');

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
var imgUpload3 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_dir && upload_dir.destroy();
			var picker =$('#filePicker3'); 
			upload_dir = WebUploader.create({
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
				},
			});
			upload_dir.on('uploadProgress',function(file, percentage) {
			});
			upload_dir.on('uploadSuccess', function(file,response) {
				console.log(file);
				console.log(response);
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功 图片');			
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker3');
					cutUpload(path,'filePicker3');

				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_dir.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_dir.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传1M以内的图片');
			    }
			});
			
		}		
}
var imgUpload4 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_site && upload_site.destroy();
			var picker =$('#filePicker4'); 
			upload_site = WebUploader.create({
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
				},
			});
			upload_site.on('uploadProgress',function(file, percentage) {
			});
			upload_site.on('uploadSuccess', function(file,response) {
				console.log(file);
				console.log(response);
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功 图片');			
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					addmodelstyle();
					JcropFunctionsite();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker4');
					cutUpload(path,'filePicker4');

				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_site.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_site.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传1M以内的图片');
			    }
			});
			
		}		
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
var imgUpload5 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_sitemore && upload_sitemore.destroy();
			var picker =$('#filePicker5'); 
			upload_sitemore = WebUploader.create({
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
				},
			});
			upload_sitemore.on('uploadProgress',function(file, percentage) {
			});
			upload_sitemore.on('uploadSuccess', function(file,response) {
				console.log(file);
				console.log(response);
				if(response.code == 0){
					//图片获取成功的 操作
					console.log('获取成功 图片');			
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					addmodelstyle();
					JcropFunctionsite();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker5');
					cutUpload(path,'filePicker5');
					

				}else{
					successToolTipShow('图片获取失败');
				}
				
			});
			upload_sitemore.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_sitemore.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传1M以内的图片');
			    }
			});
			
		}		
}

function addmodelstyle(){
	$('.modal-body .modal-left').addClass('modal-left-site');
	$('.modal-body .modal-preview-container').addClass('modal-site');
	$('.modal-body .modal-right .preview').addClass('preview-site ');
	$('.modal-body .modal-right button').addClass('btn-site');
	$('.modal-body .modal-right').addClass('modal-right-site');
}
function remodelstyle(){
	$('.modal-body .modal-left').removeClass('modal-left-site');
	$('.modal-body .modal-preview-container').removeClass('modal-site');
	$('.modal-body .modal-right .preview').removeClass('preview-site ');
	$('.modal-body .modal-right button').removeClass('btn-site');
	$('.modal-body .modal-right').removeClass('modal-right-site');
}
function initCutImg(type){
	$('#modal-original-img').attr('style','');
	var needWidth = 300;
	var needHeight =300;
	$('#modal-original-img').load(function(){
		var img = new Image();
		img.src = $('#modal-original-img').attr("src");
		var realHeight = img.height;
		var realWidth  = img.width;
		if(realHeight>=realWidth){
			$('.modal-original').attr('style',"height:300px;");
			$('#modal-original-img').attr('style','height:100%;width:auto;');	
			console.log($('#modal-original-img').width());
			$('.modal-original').attr('style',"height:300px;width:"+$('#modal-original-img').width()+"px");
		}else{
			var paddingTop=(300-300*realHeight/realWidth)/2;
			var num=parseInt(paddingTop);
			
			$('#modal-original-img').attr('style',"height:auto;width:100%;");
			$('.modal-original').attr('style',"height:"+$('#modal-original-img').height()+"px;width:100%;margin-top:"+num+"px;");
		}
		if (type=='filePicker4'||type=='filePicker5'){
			JcropFunctionsite();
		}else {
			JcropFunction();
		}
	 });
}
function initCutImgsite(){
	$('#modal-original-img').attr('style','');
	var needWidth = 300;
	var needHeight =300;
	$('#modal-original-img').load(function(){
		var img = new Image();
		img.src = $('#modal-original-img').attr("src");
		var realHeight = img.height;
		var realWidth  = img.width;
		if(realHeight>=realWidth){
			$('.modal-original').attr('style',"height:300px;");
			$('#modal-original-img').attr('style','height:100%;width:auto;');	
			console.log($('#modal-original-img').width());
			$('.modal-original').attr('style',"height:300px;width:"+$('#modal-original-img').width()+"px");
		}else{
			var paddingTop=(300-300*realHeight/realWidth)/2;
			var num=parseInt(paddingTop);
			
			$('#modal-original-img').attr('style',"height:auto;width:100%;");
			$('.modal-original').attr('style',"height:"+$('#modal-original-img').height()+"px;width:100%;margin-top:"+num+"px;");
		}
		JcropFunctionsite();
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
		aspectRatio : 162/216,//选框宽高比。说明：width/height
//		aspectRatio : 248/140,//选框宽高比。说明：width/height
		onSelect : updateCoords // 当选择完成时执行的函数
	});
}
function JcropFunctionsite(){
	x=0;
	y=0;
	x2=0;
	y2=0;
	h=0;
	w=0;
	// 初始化Jcrop
	jcrop_api = $.Jcrop('#modal-original-img',{
		bgOpacity : 0.2,
		aspectRatio : 248/140,//选框宽高比。说明：width/height
		onSelect : updateCoords // 当选择完成时执行的函数
	});
}
function updateCoords(coords){
	x=coords.x;//坐标位置x的开始位置
	y=coords.y;//坐标位置y的开始位置
	x2=coords.x2;//坐标x结束位置
	y2=coords.y2;//坐标y结束位置
	w=coords.w;//实际宽
	h=coords.h;//实际高
	if(parseInt(coords.w) > 0){
		//计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到 
		var rx = $(".modal-preview-container").width() / coords.w;
		var ry = $(".modal-preview-container").height() / coords.h;
		$("#modal-preview").attr('src',$('#modal-original-img').attr('src'));
		//通过比例值控制图片的样式与显示 
		$("#modal-preview").css({
			width:Math.round(rx * $("#modal-original-img").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积 
			height:Math.round(ry * $("#modal-original-img").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积 
			marginLeft:"-" + Math.round(rx * coords.x) + "px",
			marginTop:"-" + Math.round(ry * coords.y) + "px",
			opacity:1,
		});
	}
}
//裁剪end
function cutUpload(path,pick){
	
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
//			console.log(pick);
//			console.log(userTarget);
			if(userTarget.code == 200){
				jcrop_api.destroy();//销毁
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				var imgPath = getResourcesName() + userTarget.result;
//				console.log(imgPath);
				if (pick=='filePicker1'){
					$('#filePicker1 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker1 .fileimg').attr('data-value',userTarget.result);
					//移除--之后添加
					$('#filePicker1 .addimgs').remove();
					$('#filePicker1 .clickimg').remove();
					
					if($('.reupload').length<=0){
						$('#filePicker1 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if(pick=='filePicker2'){
					$('.showimages').show();
					var addimagebox="<div class='imgsboxs '>"
          				+"<img class='imgsfive1' data-value="+userTarget.result+" src="+getResourcesName()+userTarget.result+">"
          				+"<div class='imgshade '>"
          				+"<img class='select' src='/resources/images/supplier/select.png'>"
          				+"</div></div>";
					$('.showimages').append(addimagebox);
					if ($('.showimages').children(".imgsboxs").length>=5){
						$('#filePicker2').attr("style","background: #ebebeb;");
						$('#filePicker2').removeClass('webuploader-container');
					
					}else {
						$('#filePicker2').removeAttr("style");
						$('#filePicker2').addClass('webuploader-container');
					}
					
				}else if(pick=='filePicker3'){
					$('#filePicker3 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker3 .fileimg').attr('data-value',userTarget.result);
					//移除--之后添加
					$('#filePicker3 .addimgs').remove();
					$('#filePicker3 .clickimg').remove();
					
					if($('.reupload').length<=0){
						$('#filePicker3 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
					
				}else if(pick=='filePicker4'){
					$('#filePicker4 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker4 .fileimg').attr('data-value',userTarget.result);
					//移除--之后添加
					$('#filePicker4 .addimgs').remove();
					$('#filePicker4 .clickimg').remove();
					
					if($('.reupload').length<=0){
						$('#filePicker4 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if(pick=='filePicker5'){
					$('.siteimages').show();
					var addimagebox="<div class='imgsboxs '>"
          				+"<img class='imgsfive1' data-value="+userTarget.result+" src="+getResourcesName()+userTarget.result+">"
          				+"<div class='imgshade '>"
          				+"<img class='select' src='/resources/images/supplier/select.png'>"
          				+"</div></div>";
					$('.siteimages').append(addimagebox);
					if ($('.siteimages').children(".imgsboxs").length>=3){
						$('#filePicker5').attr("style","background: #ebebeb;");
						$('#filePicker5').removeClass('webuploader-container');
					
					}else {
						$('#filePicker5').removeAttr("style");
						$('#filePicker5').addClass('webuploader-container');
					}
					
				}
				
				
				
				$('#modal-preview').attr('src','');
//				$("#setImg").prepend(juicer(videoList_tpl.upload_Tpl,{file:imgPath,path:userTarget.result}));
//				delImgEven();
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

////删除图片
//function delImgEven(){
//	
////	$('.delLoadImg').off('click').on('click',function(){
////		var thiItem = $(this);
////		var path = $(this).parent().attr('data-id');
////		
////		$('#checkSureModel').show();
////		$('.closeBtn,#cModel').off('click').on('click',function(){
////			$('#checkSureModel').hide();
////		});
////		$('#tModel').off('click').on('click',function(){
////			delImgGroup += path +';';
////			thiItem.parent().parent().remove();
////		});
////		
////	})
//	
//}
