var upload_Video;
var upload_Update;
var upload_dir;
var upload_site;
var upload_sitemore;
var upload_profession;
var upload_cameraman;
var upload_clothing;
var upload_props;
var image_max_size = 1024*1024*10; // 250KB
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
	imgUpload1.init();
	imgUpload2.init();
	imgUpload3.init();
	imgUpload4.init();
	imgUpload5.init();
	imgUpload6.init();
	imgUpload7.init();
	imgUpload8.init();
	imgUpload9.init();

});
//添加演员弹出框
	function staffboxshow(){
		listpeopledata('actor');
		$('.staffbox .stafftitle span').text('添加演员');
		cleanactordata();
		var hasCity = $('.citycheck p');
		if(!hasCity.length > 0){
			listcitydata();
		}
	}
//添加导演弹出框
	function directorboxshow(){
		listpeopledata('director');
		cleadirectordata();
		$('.directorbox .directortitle span').text('添加导演');
		var hasCity = $('.citycheck p');
		if(!hasCity.length > 0){
			listcitydata();
		}
	}
	//添加其他职业弹出框
	function peopleboxshow(type,professionName){
		$('#professionpeo').val(type);
		
		//listpeopledata(type); 无页面参数
		cleanpeopledata();
		$('.peoplebox .peopletitle span').text('添加'+professionName);
		var hasCity = $('.citycheck p');
		if(!hasCity.length > 0){
			listcitydata();
		}
	}
	function cameramanboxshow(){
//		listpeopledata('cameraman'); 
		cleancameramandata();
		$('.cameramanbox .cameramantitle span').text('添加摄影师');
		var hasCity = $('.citycheck p');
		if(!hasCity.length > 0){
			listcitydata();
		}
	}

//角色选择
function peoplechengck(){
 
	
	$("body").on("mouseover",".filesimage",function(){
		$(this).find('.reupload').show();
	});
	$("body").on("mouseout",".filesimage",function(){
		$(this).find('.reupload').hide();
	});
	
	/*$("body").on("mouseover","#filePicker1 ,#filePicker2,#filePicker3 ,#filePicker4,#filePicker5,#filePicker6,#filePicker7,#filePicker8",function(){
		$(this).find('.reupload').show();
	});
	$("body").on("mouseout","#filePicker1 ,#filePicker2,#filePicker3 ,#filePicker4,#filePicker5,#filePicker6,#filePicker7,#filePicker8",function(){
		$(this).find('.reupload').hide();
	});*/
	$('.page').on('click','#closePhone',function(){
		$('#uploadConfirmBt').attr('disabled',false);
		$('#modal-original-img').attr('src','');
		$('#modal-preview').attr('src','/resources/images/supplier/black.png');	
		$("#mymodal").hide();	
	});
	
	$('body').on('mouseover','.showimages .imgsboxs,.siteimages .imgsboxs',function(){
		$(this).find('.imgshade ').show();
	});
	$('body').on('mouseout','.showimages .imgsboxs,.siteimages .imgsboxs ',function(){
		$(this).find('.imgshade ').hide();
	});
	//同下
	//演员上传图片点击
	$('.page').on('click','.showimages .imgsboxs .imgshade .select',function(){
		$('#filePicker2').removeAttr("style");
		$('#filePicker2').removeClass('webuploader-element-invisible');
		if ($(this).parent().parent().parent().children('.imgsboxs').length==1){
			$(this).parent().parent().remove();
			$('.staffbox .showimages').hide();
			$('.role').removeClass('pickroleshowimg');
			$('.role').addClass('pickroledir');
			
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
//		
			var welldata=$('.showimages').attr('data-value');
//			welldata=welldata+";"+removesrc;
			$('.showimages').attr('data-value',welldata);
		}else {
			$(this).parent().parent().remove();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
			
			if(removesrc != undefined){
				setDel += removesrc+";";
			}
				
			$('.showimages').attr('data-value',removesrc);
		}
	});
	//场地上传图片点击
	$('.page').on('click','.siteimages .imgsboxs .imgshade .select',function(){
		$('#filePicker5').removeAttr("style");
		$('#filePicker5').removeClass('webuploader-element-invisible');
		if ($(this).parent().parent().parent().children('.imgsboxs').length==1){
			$(this).parent().parent().remove();
			$('.sitebox .siteimages').hide();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
			var welldata=$('.siteimages').attr('data-value');
			$('.siteimages').attr('data-value',welldata);
			if(removesrc != undefined){
				setDel += removesrc+";";
			}
		}else {
			$(this).parent().parent().remove();
			var removesrc=$(this).parent().parent().find('.imgsfive1').attr('data-value');
			if(removesrc != undefined){
				setDel += removesrc+";";
			}
			$('.siteimages').attr('data-value',removesrc);
		}
	});

	
	$('body').off('click').on('click',function(e){
		 $('.morecheck').removeClass('reilef');
		 $('.check').removeClass('Color');
		 event.stopPropagation();
	});
	$('.check,.more').off('click').on('click',function(e){
		 $('.morecheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.morecheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.check').removeClass('Color');
			$(this).find('.morecheck').addClass('reilef');
			$(this).addClass('Color');
		}
		event.stopPropagation();
	});
	$('.morecheck span').off('click').on('click',function(e){
		$('.check').val($(this).text());
	   	$('.morecheck').removeClass('reilef');
	   	$('.check').removeClass('Color');
	     event.stopPropagation();
	});

	$('.addpeople .cancel,.directorbox .cancel,.staffbox .cancel,.peoplebox .cancel,.cameramanbox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.addpeople').hide();
		$('.staffbox').hide();
		$('.directorbox').hide();
		$('.peoplebox').hide();	

		$('.role').hide();
		$('.staffbox').removeClass('pickborder');
		$('.directorbox').removeClass('pickborder');
		
		//TODO 没必要存在，只在打开页面时清空就可以
		cleadirectordata();
		cleanactordata();
		cleanpeopledata();
		
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
		$('.role').hide();
		$('.staffbox').removeClass('pickborder');
		$('.directorbox').removeClass('pickborder');
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
		var phone=$('.gatherPhone').val();
		
		var fileimg=$('#filePicker1 .fileimg').attr('src');
		
		var endimg;
		$('.imgsboxs').children('img').each(function(){
			var moreimg=$(this).attr('data-value');
			if (endimg==null||endimg==undefined||endimg==''){
				endimg=moreimg;
			}else {
				endimg=endimg+";"+moreimg;
			}
		})
			
		$('.errorp').text('');
/*		$('.namegatherp').text('');
		$('.oldgatherp').text('');
		$('.pricegatherp').text('');
		$('.gendergatherp').text('');
		$('.gendergather').attr('key','');
		$('.racegatherp').text('');
		$('.racegatherp').attr('value','');
		$('.citygatherp').text('');
		$('.cityValue').attr('cityid','');
		$('.phonegatherpe').text('');*/
		
		
		var s = $('.gendergather').attr('key');
		
		 if(phone!=''&&phone!=null&&phone!=undefined){
				if(!checkMobile(phone)){
					$('.phonegatherpe').text('手机号错误');
					return false;
				}
			}
		
		if (namegather==undefined||namegather==null||namegather==''){
			$('.namegatherp').text('*演员姓名不能为空');
			return false;
		}else if(gendergather=='请选择'){
			$('.gendergatherp').text('*请选择性别');
			return false;
		}else if (oldgather==undefined||oldgather==null||oldgather==''){
			$('.oldgatherp').text('*出生年份不能为空');
			return false;
		}else if(racegather=='请选择'){
			$('.racegatherp').text('*请选择种族');
			return false;
		}else if(citygather=='请选择'){
			$('.citygatherp').text('*请选择城市');
			return false;
		}else if (pricegather==undefined||pricegather==null||pricegather==''){
			$('.pricegatherp').text('*价格不能为空');
			return false;
		}else if (fileimg=='/resources/images/supplier/people.png'){
			$('.gatherright .addboxs span').attr("style","color: red;");
			return false;
		}else {
			var biao=$('.staffbox .stafftitle span').text();
			if(biao=='更新演员信息'){
				var biaoID=$('.staffbox').attr('id');
				loadData(function(result){	
					cleanactordata();
					$('.setting').hide();
					$('.staffbox').hide();
					$('.role').hide();
					$('.staffbox').removeClass('pickborder');
					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/actor/update', $.toJSON({						
					 id:biaoID,//获取的id
					 birthDay:oldgather,//出生日期
					 city:$('.citygather').attr('cityid'),//城市(编码)
					 delImg:setDel,//待删除图片
					 mainPhoto:$('#filePicker1 .fileimg').attr('data-value'),//主图
					 name:namegather,//姓名
					 photo:endimg,//更多图片
					 price:pricegather,//价格
					 remark:remarkgather,//备注
					 sex:$('.gendergather').attr('key'),//性别(1,2)
					 zone:$('.racegather').attr('value'),//种族(编码)
					 phone:phone
				}));
			}else{
				loadData(function(result){	
					console.log(result);
					cleanactordata();
					$('.setting').hide();
					$('.staffbox').hide();
					$('.role').hide();
					$('.staffbox').removeClass('pickborder');
					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/actor/save', $.toJSON({						
					 birthDay:oldgather,//出生日期
					 city:$('.citygather').attr('cityid'),//城市(编码)
					 delImg:setDel,//待删除图片
					 mainPhoto:$('#filePicker1 .fileimg').attr('data-value'),//主图
					 name:namegather,//姓名
					 photo:endimg,//更多图片
					 price:pricegather,//价格
					 remark:remarkgather,//备注
					 sex:$('.gendergather').attr('key'),//性别(1,2)
					 zone:$('.racegather').attr('value'),//种族(编码)
					 phone:phone
				}));
			}
		}
		
	});	
}
//清除数据
function cleanactordata(){
	$('.namegatherp').text('');
	$('.oldgatherp').text('');
	$('.pricegatherp').text('');
	$('.gendergatherp').text('');
	$('.racegatherp').text('');
	$('.citygatherp').text('');
	$('.gatherPhone').val('');
	$('.errorp').text('');
	
	$('.namegather').val('');
	$('.gendergather').text('请选择');
	$('.gendergather').attr('key','');
	$('.oldgather').val('');
	$('.racegather').text('请选择');
	$('.gendergather').attr('value','');
	$('.citygather').text('请选择');
	$('.cityValue').attr('cityid','');
	
	$('.pricegather').val('');
	$('.remarkgather').val('');
	
	$('.citycheck').hide();
	$('.twocheck').hide();
	$('.racecheck').hide();
	$('.addboxs span').removeAttr("style");
	$('#filePicker2').removeAttr("style");
	$('#filePicker2').removeClass('webuploader-element-invisible');
	
	$('#filePicker1 .fileimg').attr('src','/resources/images/supplier/people.png');
	$('#filePicker1 .fileimg').attr('data-value','/resources/images/supplier/people.png');
	
	$('#filePicker1 .reupload').remove();

	$('.showimages').hide();
	$('.showimages').empty();
	
	$('.role').removeClass('pickroleshowimg');
}
//删除演员和导演
function delpeople(id,identity){
	if (identity=='actor'){
		loadData(function(res){	
			getlistdatap();//获取人数据
		 }, getContextPath() + '/production/actor/delete', $.toJSON({						
			 id:id,//	主键
		}));
	}else if (identity=='director'){
		loadData(function(res){	
			getlistdatap();//获取人数据
		 }, getContextPath() + ' /production/director/delete', $.toJSON({						
			 id:id,//	主键
		}));
	}else if (identity=='cameraman'){
		loadData(function(res){	
			getlistdatap();//获取人数据
		 }, getContextPath() + ' /production/cameraman/delete', $.toJSON({						
			 id:id,//	主键
		}));
	}else{
		loadData(function(res){	
			getlistdatap();//获取人数据
		 }, getContextPath() + ' /production/personnel/delete', $.toJSON({						
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
			var picker =$('#filePicker1'); 
			upload_Video = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_Video.on('uploadProgress',function(file, percentage) {
			});
			upload_Video.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作	
					setDel += $('#filePicker1 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker1');
					cutUpload(path,'filePicker1');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_Video.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			
			upload_Video.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_Video.reset();
				}
			});
			
			upload_Video.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});		
		}		
}
//文件批量上传
var imgUpload2 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		
		multipUploadFile:function(){
			upload_Update && upload_Update.destroy();
			var picker =$('#filePicker2'); 
			upload_Update = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_Update.on('uploadProgress',function(file, percentage) {
			});
			upload_Update.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作
					setDel += $('#filePicker2 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker2');
					cutUpload(path,'filePicker2');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_Update.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_Update.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_Update.reset();
				}
			});
			upload_Update.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
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
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_dir.on('uploadProgress',function(file, percentage) {
			});
			upload_dir.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker3 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker3');
					cutUpload(path,'filePicker3');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_dir.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_dir.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_dir.reset();
				}
			});
			upload_dir.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
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
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_site.on('uploadProgress',function(file, percentage) {
			});
			upload_site.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker4 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					addmodelstyle();
					JcropFunctionsite();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker4');
					cutUpload(path,'filePicker4');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_site.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_site.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_site.reset();
				}
			});
			upload_site.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}

//错误提示
function successToolTipShow(error){
		window.clearInterval(successIntervalObj);
		$('.tooltip-success-show').show();
		$(".tooltip-success-show").text(error);
		$(window.parent.parent.parent.document).find('html').scrollTop(0);
		$(window.parent.parent.parent.document).find('body').scrollTop(0);
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
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_sitemore.on('uploadProgress',function(file, percentage) {
			});
			upload_sitemore.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker5 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					addmodelstyle();
					JcropFunctionsite();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker5');
					cutUpload(path,'filePicker5');
					
				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_sitemore.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_sitemore.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_sitemore.reset();
				}
			});
			upload_sitemore.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}
//人员主图
var imgUpload6 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_profession && upload_profession.destroy();
			var picker =$('#filePicker6'); 
			upload_profession = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_profession.on('uploadProgress',function(file, percentage) {
			});
			upload_profession.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker6 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker6');
					cutUpload(path,'filePicker6');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_profession.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_profession.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_profession.reset();
				}
			});
			upload_profession.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}

var imgUpload7 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_cameraman && upload_cameraman.destroy();
			var picker =$('#filePicker7'); 
			upload_cameraman = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_cameraman.on('uploadProgress',function(file, percentage) {
			});
			upload_cameraman.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker7 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					remodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker7');
					cutUpload(path,'filePicker7');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_cameraman.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_cameraman.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_profession.reset();
				}
			});
			upload_cameraman.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}

var imgUpload8 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_clothing && upload_clothing.destroy();
			var picker =$('#filePicker8'); 
			upload_clothing = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_clothing.on('uploadProgress',function(file, percentage) {
			});
			upload_clothing.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作		
					setDel += $('#filePicker8 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					addmodelstyle();
					JcropFunctionsite();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker8');
					cutUpload(path,'filePicker8');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_clothing.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_clothing.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_profession.reset();
				}
			});
			upload_clothing.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}

var imgUpload9 = {
		init : function() {
			//批量上传
			this.multipUploadFile();
		},
		multipUploadFile:function(){
			upload_props && upload_props.destroy();
			var picker =$('#filePicker9'); 
			upload_props = WebUploader.create({
				auto:true,
				swf : '/resources/lib/webuploader/Uploader.swf',
				server : '/web/upload',
				timeout:60*60*1000,
				pick : picker,
				fileSingleSizeLimit : image_max_size,
				threads :1,
				duplicate :true,
				multiple:true,
				accept :{
				    title: 'Images',
				    extensions: 'jpg,png,jpeg',
				    mimeTypes: 'image/jpeg,image/png'
				}
			});
			upload_props.on('uploadProgress',function(file, percentage) {
			});
			upload_props.on('uploadSuccess', function(file,response) {
				if(response.code == 0){
					//图片获取成功的 操作	
					
					setDel += $('#filePicker9 .webuploader-pick .updateimg .fileimg').attr('data-value')+";";
					
					var path = response.result;
					var imgPath = getResourcesName() + path;
					$('#mymodal').show();//裁剪弹框
					$('#modal-preview').attr('src','/resources/images/supplier/black.png');
					$('#modal-original-img').attr('src','');
					addmodelstyle();
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg('filePicker9');
					cutUpload(path,'filePicker9');

				}else{
					successToolTipShow('图片处理失败,请联系客服协助您上传(400-660-9728)');
				}
				
			});
			upload_props.on('uploadError', function(file,reason) {
				successToolTipShow(reason);
			});
			upload_props.on('filesQueued', function(file) {
				if(file.length > 1){
					successToolTipShow('只能选择一张图片替换');
					upload_profession.reset();
				}
			});
			upload_props.on('error', function(type) {
				if (type=="Q_TYPE_DENIED"){
					successToolTipShow('请上传正确格式的图片');
			    }else if(type=="F_EXCEED_SIZE"){
					successToolTipShow('请上传10M以内的图片');
			    }
			});
			
		}		
}
//长图预览
function addmodelstyle(){
	$('.modal-body .modal-left').addClass('modal-left-site');
	$('.modal-body .modal-preview-container').addClass('modal-site');
	//$('.modal-body .modal-preview-container #modal-preview').addClass('modal-site');
	$('.modal-body .modal-preview-container').addClass('modal-site');
	$('.modal-body .modal-right .preview').addClass('preview-site ');
	$('.modal-body .modal-right button').addClass('btn-site');
	$('.modal-body .modal-right').addClass('modal-right-site');
}
//高图预览
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
		var realHeight = $(this).height();
		var realWidth  = $(this).width();	
		//原图的
		
		if(realHeight>=realWidth){
			$('.modal-original').attr('style',"height:300px;");
			$('#modal-original-img').attr('style','height:100%;width:auto;');	
		
			$('.modal-original').attr('style',"height:300px;width:"+$('#modal-original-img').width()+"px");
		}else{
			
			var paddingTop=(300-300*realHeight/realWidth)/2;
			var num=parseInt(paddingTop);
			
			$('#modal-original-img').attr('style',"height:auto;width:100%;");
			$('.modal-original').attr('style',"height:"+$('#modal-original-img').height()+"px;width:100%;margin-top:"+num+"px;");
		
		}
		if (type=='filePicker4'||type=='filePicker5'||type=='filePicker8'||type=='filePicker9'){
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
			$("#mymodal").hide();
			$('#modal-preview').attr('src','/resources/images/supplier/black.png');
			$('#modal-original-img').attr('src','');
			return;
		}
		$('#uploadConfirmBt').attr('disabled','disabled');
		// 裁剪图片
		loadData(function(userTarget){
			if(userTarget.code == 200){
				jcrop_api.destroy();//销毁
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				var imgPath = getResourcesName() + userTarget.result;
				if (pick=='filePicker1'){
					$('#filePicker1 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker1 .fileimg').attr('data-value',userTarget.result);
//					//移除--之后添加
//					$('#filePicker1 .addimgs').remove();
//					$('#filePicker1 .clickimg').remove();
//					
					if($('.reupload').length<=0){
						$('#filePicker1 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if(pick=='filePicker2'){
					$('.showimages').show();
					$('.role').addClass('pickroleshowimg');
					$('.role').removeClass('pickroledir');
					
					var addimagebox="<div class='imgsboxs '>"
          				+"<img class='imgsfive1' data-value="+userTarget.result+" src="+getResourcesName()+userTarget.result+">"
          				+"<div class='imgshade '>"
          				+"<img class='select' src='/resources/images/supplier/select.png'>"
          				+"</div></div>";
					$('.showimages').append(addimagebox);
					if ($('.showimages').children(".imgsboxs").length>=5){
						$('#filePicker2').attr("style","background: #ebebeb;");
						$('#filePicker2').addClass('webuploader-element-invisible');
					
					}else {
						$('#filePicker2').removeAttr("style");
						$('#filePicker2').removeClass('webuploader-element-invisible');
					}
					
				}else if(pick=='filePicker3'){
					$('#filePicker3 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker3 .fileimg').attr('data-value',userTarget.result);
					//移除--之后添加

					
					if($('.reupload').length<=0){
						$('#filePicker3 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
					
				}else if(pick=='filePicker4'){
					$('#filePicker4 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker4 .fileimg').attr('data-value',userTarget.result);
					//移除--之后添加

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
						$('#filePicker5').addClass('webuploader-element-invisible');
					}else {
						$('#filePicker5').removeAttr("style");
						$('#filePicker5').removeClass('webuploader-element-invisible');
					}
					
				}else if (pick=='filePicker6'){
					$('#filePicker6 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker6 .fileimg').attr('data-value',userTarget.result);
//					//移除--之后添加
//					$('#filePicker1 .addimgs').remove();
//					$('#filePicker1 .clickimg').remove();
//					
					if($('.reupload').length<=0){
						$('#filePicker6 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if (pick=='filePicker7'){
					$('#filePicker7 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker7 .fileimg').attr('data-value',userTarget.result);
//					//移除--之后添加
//					$('#filePicker1 .addimgs').remove();
//					$('#filePicker1 .clickimg').remove();
//					
					if($('.reupload').length<=0){
						$('#filePicker7 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if (pick=='filePicker8'){
					$('#filePicker8 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker8 .fileimg').attr('data-value',userTarget.result);
//					//移除--之后添加
//					$('#filePicker1 .addimgs').remove();
//					$('#filePicker1 .clickimg').remove();
//					
					if($('.reupload').length<=0){
						$('#filePicker8 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}else if (pick=='filePicker9'){
					$('#filePicker9 .fileimg').attr('src',getResourcesName()+userTarget.result);
					$('#filePicker9 .fileimg').attr('data-value',userTarget.result);
//					//移除--之后添加
//					$('#filePicker1 .addimgs').remove();
//					$('#filePicker1 .clickimg').remove();
//					
					if($('.reupload').length<=0){
						$('#filePicker9 .updateimg').after("<div class='reupload'>重新上传</div>");
					}
				}
				
				$('#modal-preview').attr('src','/resources/images/supplier/black.png');
				$('#modal-original-img').attr('src','');

			}else{
				jcrop_api.destroy();
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				$('#modal-preview').attr('src','/resources/images/supplier/black.png');
				$('#modal-original-img').attr('src','');
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

function delImg(path) {
	
	loadData(function(){	

	 }, getContextPath() + '/web/delImg?path='+$('.fileimg').attr('data-value'), '');
	
}

