var upload_Video;
var upload_Update;
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
//	imgUploadmore.init();
	//初始化jcrop
	JcropFunction();
	
});
//function webUpload(id) {
//	$("#"+id).addClass("pickimg");
//	imgUpload.init();
//	$(".gatherright").load(function(){
//		
//	
//	});
////    $("#"+id).addClass("pickimg");
////	imgUpload.init();
//}
//角色选择
function peoplechengck(){
	$('.check,.more').off('click').on('click',function(){
		$('.morecheck').show();
	});
//	$('.more').off('click').on('click',function(){
//		$('.morecheck').show();
//	});

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
			cleanactordata();
			$('.staffbox .stafftitle span').text('创建演员');
			//提前加载图片
			imgcheckpeoplefive();
		}else if($('.check').text()=='导演'){
			listpeopledata('director');
			$('.directorbox').show();
			cleadirectordata();
			$('.directorbox .directortitle span').text('创建导演');
			imgcheckpeoplefive();
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
		}else {
			var biao=$('.staffbox .stafftitle span').text();
			console.log(biao);
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
//					 delImg:,//待删除图片
					 mainPhoto:'https://filed.apaipian.com/group1/M00/00/BC/CgptuFqxzaeARCQ0AAGFXnP4NoU224.jpg',//主图
					 name:namegather,//姓名
//					 photo:,//更多图片
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
//					 delImg:,//待删除图片
//					 mainPhoto:,//主图
					 name:namegather,//姓名
//					 photo:,//更多图片
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
	$('.namesitep').text('');
	$('.msitep').text('');
	$('.typesitep').text('');
	$('.pricesitep').text('');
	$('.locationsitep').text('');
	$('.citysitep').text('');
	
	$('.namesite').val('');
	$('.msite').val('');
	$('.typesite').text('请选择场地类型');
	$('.pricesite').val('');
	$('.citysite').text('请选择城市');
	$('.locationsite').val('');
	$('.siteremark').val('');
	
	$('.citycheck').hide();
	$('.twocheck').hide();
	$('.racecheck').hide();
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
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg();
					cutUpload(path);

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
					JcropFunction();
					$('#modal-original-img').attr('src',imgPath);
					initCutImg();
					cutUpload(path);

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

function initCutImg(){
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
		JcropFunction();
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
			console.log(userTarget);
			if(userTarget.code == 200){
				jcrop_api.destroy();//销毁
				$('#uploadConfirmBt').attr('disabled',false);
				$("#mymodal").hide();
				var imgPath = getResourcesName() + userTarget.result;
				console.log(imgPath);
				
				$('.fileimg').attr('src',getResourcesName()+userTarget.result);
				if($('.reupload').length>0){
					console.log('不加');
					
				}else {
					$('.updateimg').after("<div class='reupload'>重新上传</div>");
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

//删除图片
function delImgEven(){
	
//	$('.delLoadImg').off('click').on('click',function(){
//		var thiItem = $(this);
//		var path = $(this).parent().attr('data-id');
//		
//		$('#checkSureModel').show();
//		$('.closeBtn,#cModel').off('click').on('click',function(){
//			$('#checkSureModel').hide();
//		});
//		$('#tModel').off('click').on('click',function(){
//			delImgGroup += path +';';
//			thiItem.parent().parent().remove();
//		});
//		
//	})
	
}