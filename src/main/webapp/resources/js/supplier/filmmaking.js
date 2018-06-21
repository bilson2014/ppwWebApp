$().ready(function() {
	init();
	imgcheckpeople();
	newbutton();
	listcitydata();
	btnfocus();

//初始化数据
	$('.setCard').text('');
	getlistdatap();//获取人数据
	$('#filePicker2 .webuploader-pick').text('上传更多照片(最多5张)');
//	$('#filePicker1').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加封面</p>");
//	$('#filePicker3').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加封面</p>");
	$('#filePicker5 .webuploader-pick').text('上传更多照片(最多3张)');
//	$('#filePicker4').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加封面</p>");
//	
});
//图片尺寸的显示处理竖版
function imgcheckpeople(){
	for (var i=1;i<=10000;i++){
		var img=new Image();
		img.src=$('.imgs'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				$('.imgs'+i).attr('style','width:auto;height:100%');
			}else {
				$('.imgs'+i).attr('style','width:100%;height:auto;position: absolute;top: 60%;margin-top: -50%;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
function imgcheckpeoplefive(){
	for (var i=1;i<=6;i++){
		var img=new Image();
		img.src=$('.imgsfive'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				$('.imgsfive'+i).attr('style','width:auto;height:100%');
			}else {
				$('.imgsfive'+i).attr('style','width:100%;height:auto;position: absolute;top: 60%;margin-top: -50%;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
//图片尺寸的显示处理横版
function imgchecksite(){
	for (var i=0;i<=8;i++){
		var img=new Image();
		img.src=$('.imgs'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				$('.imgs'+i).attr('style','width:auto;height:100%');
			}else {
				$('.imgs'+i).attr('style','width:100%;height:auto;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
function init(){
	$('.shade').hide();
	$("body").on("mouseover",".idcard",function(){
		$(this).find('.shade').show();
	});
	$("body").on("mouseout",".idcard",function(){
		$(this).find('.shade').hide();
	});
	
	$(".idcard .select").click(function(){
		 console.log('wwq');
	});
	//图片删除共同dels  修改
	$('.page').on('click','.idcard .select',function(){
		console.log('消失select');
		$(this).parent().parent().find('.shade').hide();
		var id=$(this).parent().parent().attr('id');
		var identity=$(this).parent().parent().attr('identity');
		if ($('.showimages').children().length==1){
			$(this).parent().parent().remove();
			$('.showimages').hide();
		}else {
			$(this).parent().parent().remove();
		}
		if ($('.top .people').hasClass('top-text')){
			delpeople(id,identity);
		}else if($('.top .sitett').hasClass('top-text')){
			delstudio(id);
		}else if($('.top .facility').hasClass('top-text')){
			deldevice(id);
		}
	});
	$('.page').on('click','.idcard .read',function(){
		console.log('消失read');
		$(this).parent().parent().find('.shade').hide();
		$('.setting').show();
		var id=$(this).parent().parent().attr('id');
		if ($('.top .people').hasClass('top-text')){
			getpeople(id,$(this).parent().parent().attr('identity'));
		}else if($('.top .sitett').hasClass('top-text')){
			$('.sitebox').show();
			getstudio(id);
		}else if($('.top .facility').hasClass('top-text')){
			$('.equipbox').show();
			getdevice(id);
			dropdowndata();
		}
	});
	//tab 切换
	$('.people').off('click').on('click',function(){
		$('.setCard').text('');
		getlistdatap();//获取人数据
		$(this).addClass('top-text');
		$(this).siblings('div').removeClass('top-text ');
		imgcheckpeople();
	});
	$('.sitett').off('click').on('click',function(){
		$('.setCard').text('');
		getlistdatas();//获取场地数据
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		imgchecksite();
	});
	$('.facility').off('click').on('click',function(){
		$('.setCard').text('');
		getlistdatad();//获取设备数据
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		imgchecksite();
	});
}
function newbutton(){
	$('.newbox').off('click').on('click',function(){
		$('.setting').show();
		$('.addpeople').hide();
		$('.sitebox').hide();
		$('.equipbox').hide();
		if ($('.top .people').hasClass('top-text')){
			$('.addpeople').show();
			$('.check').val('');
		}else if($('.top .sitett').hasClass('top-text')){
			$('.sitebox').show();
			$('.sitebox .sitetitle span').text('添加场地');
			$('.sitebox').attr('id','');
			cleandata();
		}else if($('.top .facility').hasClass('top-text')){
			$('.equipbox').show();
			$('.equipbox .equiptitle span').text('添加设备');
			$('.equipbox').attr('id','');
			cleandevdata();
			dropdowndata();
		} 
	});
}
function getlistdatap(){
	$('.setCard').text('');
	loadData(function(res){	
		if (res.length==0){
			$('.writepng').show();
		}else {
			$('.writepng').hide();
		}
		var htt = getResourcesName();
		for(var i=0;i<res.length;i++){
			var boxhtml="<div class='idcard  ' id ="+res[i].id+" identity="+res[i].identity+">"
            +"<img class='imgs"+i+"' src="+getResourcesName()+res[i].photo+">"
            +"<div class='shade  ' style='display: none;'>"
            +"<img class='read' src='/resources/images/supplier/read.png'>"
            +"<img class='select' src='/resources/images/supplier/select.png'>"
            +"</div>"
            +"<div class='linebox '>"
            +"<span class='name one'>"+res[i].name+"</span>"
            +"<p class='price'>"+res[i].price+"</p>"
            +"<div class='addprice'>元/天</div>"
            +"</div>"
            +"</div>";
			$('.setCard').append(boxhtml);
		}
		imgcheckpeople();
		$(window.parent.document).find('.frame').css('height',$('.page').height() + 350);
	 }, getContextPath() + ' /production/people/list');
}
function getlistdatas(){
	$('.setCard').text('');
	loadData(function(res){	
		if (res.length==0){
			$('.writepng').show();
		}else {
			$('.writepng').hide();
		}
		var htt = getResourcesName();
		for(var i=0;i<res.length;i++){
			var boxhtml="<div class='idcard  idcard-site' id ="+res[i].id+" identity="+res[i].identity+">"
	        +"<img class='imgs"+i+"' src="+getResourcesName()+res[i].photo+">"
	        +"<div class='shade  idcard-sites' style='display: none;'>"
	        +"<img class='read' src='/resources/images/supplier/read.png'>"
	        +"<img class='select' src='/resources/images/supplier/select.png'>"
	        +"</div>"
	        +"<div class='linebox linebox-site'>"
	        +"<span class='name two'>"+res[i].name+"</span>"
	        +"<p class='price'>"+res[i].price+"</p>"
	        +"<div class='addprice'>元/天</div>"
	        +"</div>"
	        +"</div>";
			$('.setCard').append(boxhtml);
		}
		imgchecksite();
		$(window.parent.document).find('.frame').css('height',$('.page').height() + 50);
	 }, getContextPath() + ' /production/studio/list');
}
function getlistdatad(){
	$('.setCard').text('');
	loadData(function(res){	
		if (res.length==0){
			$('.writepng').show();
		}else {
			$('.writepng').hide();
		}
		for(var i=0;i<res.length;i++){
			console.log(res[i].photo);
			var boxhtmland;
			if (res[i].photo==null){
//				boxhtmland= "<div class='and'>"+res[i].name+"</div>";
				boxhtmland= "<img class='endimg' src='/resources/images/supplier/endimg.jpg'><div class='and'>"+res[i].name+"</div>";
			}else {
				boxhtmland= "<img class='imgs"+i+"' src="+getResourcesName()+res[i].photo+">";
			}
			var boxhtmlend="<div class='shade  idcard-facilitys' style='display: none;'>"
	            +"<img class='read' src='/resources/images/supplier/read.png'>"
	            +"<img class='select' src='/resources/images/supplier/select.png'>"
	            +"</div>"
	            +"<div class='linebox linebox-facility'>"
	            +"<span class='name three'>"+res[i].name+"</span>"
	            +"<p class='price'>"+res[i].price+"</p>"
	            +"<div class='addprice'>元/天</div>"
	            +"</div>"
	            +"</div>";
			var boxhtmlbegin="<div class='idcard  idcard-facility' id ="+res[i].id+" identity="+res[i].identity+">";
         
            var boxhtml=boxhtmlbegin+boxhtmland+boxhtmlend;
            
            
			$('.setCard').append(boxhtml);
			//图片处理
			var img=new Image();
			img.src=$('.imgs'+i).attr('src');
			if (img.complete){
				if (img.width/img.height<=1){
					$('.imgs'+i).attr('style','width:auto;height:100%');
				}else {
					$('.imgs'+i).attr('style','width:100%;height:auto;');
				}
				img=null;
			}else {
				img.onload=function(){
					img=null;
				}
			}
		}
		imgchecksite();
		$(window.parent.document).find('.frame').css('height',$('.page').height() + 50);
	 }, getContextPath() + ' /production/device/list');	
}
//下拉的城市的接口
function listcitydata(){
	loadData(function(res){	
		for(var i=0;i<res.length;i++){
			var phtml="<p cityId="+res[i].cityID+">"+res[i].city+"</p>";
			$('.citycheck').append(phtml);
		}
	 }, getContextPath() + '/all/citys');
}
//演员导演的dropdown 获取
function listpeopledata(type){
	loadData(function(res){	
		$('.skillcheck').empty();
		if (type=='director'){
			if ($('.skilldir').attr('value')==undefined){
				for(var i=0;i<res.specialtyList.length;i++){
					var phtml="<p  value="+res.specialtyList[i].value+">"+res.specialtyList[i].text+"</p>";
					$('.skillcheck').append(phtml);
				}
			}else {
				var num=$('.skilldir').attr('value');//1,1,2,3
				num=num.split(",");
				var blok=true;
				for(var i=0;i<res.specialtyList.length;i++){
					for (var j=0;j<num.length;j++){
						if (num[j]==res.specialtyList[i].value){
							var phtml="<p class='pickme' value="+res.specialtyList[i].value+">"+res.specialtyList[i].text+"</p>";
							$('.skillcheck').append(phtml);
							blok=false;
						}
					}
					if (blok){
						var phtml="<p value="+res.specialtyList[i].value+">"+res.specialtyList[i].text+"</p>";
						$('.skillcheck').append(phtml);
					}else {
						blok=true;
					}
					
				}
			}
			
			
		}else {
			for(var i=0;i<res.zoneList.length;i++){
				var phtml="<p value="+res.zoneList[i].value+">"+res.zoneList[i].text+"</p>";
				$('.racecheck').append(phtml);
			}
		}
	 }, getContextPath() + "/production/"+type+"/parameter");
}

//获取 people 列表
function getpeople(id,type){
	if (type=='actor'){
		$('.staffbox').show();
		loadData(function(res){	
			listpeopledata('actor');
//			console.log('修改演员');
//			console.log(res);
			$('.staffbox .stafftitle span').text('修改演员');
			$('.staffbox').attr('id',id);
			$('.staffbox').attr('identity',type);
			$('.namegather').val(res.name);
			$('.pricegather').val(res.price);
			$('.remarkgather').val(res.remark);
			//图片处理
			$('.showimages').empty();
			$('.showimages').hide();
			$('#filePicker1 .fileimg').attr('data-value',res.mainPhoto);
			$('#filePicker1 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
			
			$('.addimgs,.clickimg').hide();
			if($('.reupload').length<=0){
				$('#filePicker1 .updateimg').after("<div class='reupload'>重新上传</div>");
			}
			
			var photo=res.photo;
			if (res.photo!='null'){
				
				$('.showimages').show();
				photo=photo.split(';');
				for (var i=0;i<photo.length;i++){
					var addimagebox="<div class='imgsboxs '>"
	      				+"<img class='imgsfive1' data-value="+photo[i]+" src="+getResourcesName()+photo[i]+">"
	      				+"<div class='imgshade '>"
	      				+"<img class='select' src='/resources/images/supplier/select.png'>"
	      				+"</div></div>";
		
					$('.showimages').append(addimagebox);
				}
				if (photo.length>=5){
					console.log(photo.length);
					$('#filePicker2').attr("style","background: #ebebeb;");
					$('#filePicker2').removeClass('webuploader-container');
					
				}else {
					$('#filePicker2').removeAttr("style");
					$('#filePicker2').addClass('webuploader-container');
				}
			}
			
			if (res.sex=='1'){
				$('.gendergather').text('男');
			}else {
				$('.gendergather').text('女');
			}
			$('.gendergather').attr('key',res.sex);
			
			$('.oldgather').val(res.birthDay);
			var zone=res.zone;
			$('.racegather').attr('value',zone);
			loadData(function(res){
				for(var i=0;i<res.zoneList.length;i++){
					if (zone==res.zoneList[i].value){
						$('.racegather').text(res.zoneList[i].text);
					}
				}
			 }, getContextPath() + '/production/actor/parameter' );
			var city=res.city;
			$('.citygather').attr('cityid',city);
			loadData(function(res){
				console.log(res);
				for(var i=0;i<res.length;i++){
					if (city==res[i].cityID){
						$('.citygather').text(res[i].city);
					}
				}
			 }, getContextPath() + '/all/citys');
			
		 }, getContextPath() + '/production/actor/get', $.toJSON({						
			 id:id,//	主键
		}));
	}else {
		//导演的数据
		$('.directorbox').show();
		loadData(function(res){		
			
//			console.log(res);
			$('.directorbox .directortitle span').text('修改导演');
			$('.directorbox').attr('id',id);
			$('.directorbox').attr('identity',type);
			$('.namedir').val(res.name);
			$('#filePicker3 .fileimg').attr('data-value',res.photo);
			$('#filePicker3 .fileimg').attr('src',getResourcesName()+res.photo);
			$('.addimgs,.clickimg').hide();
			if($('.reupload').length<=0){
				$('#filePicker3 .updateimg').after("<div class='reupload'>重新上传</div>");
			}
			var specialty=res.specialty;//1,2,3
			$('.skilldir').attr('value',specialty);
			specialty=specialty.split(",");
			listpeopledata('director');
	
			loadData(function(res){
				
				for(var j=0;j<specialty.length;j++){
					for(var i=0;i<res.specialtyList.length;i++){
						if (specialty[j]==res.specialtyList[i].value){
							
							var texs=specialty[j];
							if ($('.skilldir').text()=='请选择'){
								$('.skilldir').text(res.specialtyList[i].text);
							}else{
								$('.skilldir').text($('.skilldir').text()+","+res.specialtyList[i].text);
							}
						}
					}
					
				}
				
			 }, getContextPath() + '/production/director/parameter');
			var city=res.city;
			$('.citydir').attr('cityid',city);
			loadData(function(res){
				for(var i=0;i<res.length;i++){
					if (city==res[i].cityID){
						$('.citydir').text(res[i].city);
					}
				}
			 }, getContextPath() + '/all/citys');
			$('.pricedir').val(res.price);
			$('.remarkdirector').val(res.remark);
		 }, getContextPath() + '/production/director/get', $.toJSON({						
			 id:id,//	主键
		}));
	}
}
function btnfocus(){
	$('body').off('click').on('click',function(e){
		 $('.odbox').removeClass('reilef');
		 $('.ods').removeClass('Color');
		 $('.twocheck ').removeClass('reilef');
		 $('.gendergather').removeClass('Color');
		 
		 $('.racecheck').removeClass('reilef');
		 $('.racegather ').removeClass('Color');
		 
		 $('.citycheck ').removeClass('reilef');
		 $('.citygather').removeClass('Color');
		 
		 $('.skillcheck ').removeClass('reilef');
		 $('.skilldir').removeClass('Color');
		
		 $('.citycheck ').removeClass('reilef');
		 $('.citydir').removeClass('Color');
		 
		 $('.typecheck ').removeClass('reilef');
		 $('.typesite').removeClass('Color');
		 $('.citycheck ').removeClass('reilef');
		 $('.citysite').removeClass('Color');
		 
		 
		 $('.typecheck ').removeClass('reilef');
		 $('.typeequip').removeClass('Color');
		 $('.namecheck ').removeClass('reilef');
		 $('.nameequip').removeClass('Color');
		 
		 $('.citycheck ').removeClass('reilef');
		 $('.cityequip').removeClass('Color');
		 
		 event.stopPropagation();
	});
	$('.ods,.ct').off('click').on('click',function(e){
		 $('.odbox').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.odbox').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.ods').removeClass('Color');
			$(this).find('.odbox').addClass('reilef');
			$(this).addClass('Color');
		}
		event.stopPropagation();
	});
	$('.odbox boxs').off('click').on('click',function(e){
		$('.ods').val($(this).text());
	   	$('.odbox').removeClass('reilef');
	   	$('.ods').removeClass('Color');
	     event.stopPropagation();
	});
	//性别
	$('.gendergather,.genderimg').off('click').on('click',function(e){
		 $('.twocheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.twocheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else{
			$('.gendergather').removeClass('Color');
			$(this).find('.twocheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.racecheck').removeClass('reilef');
	   	$('.racegather').removeClass('Color');
		$('.citycheck').removeClass('reilef');
	   	$('.citygather').removeClass('Color');
		event.stopPropagation();
	});
	$('.twocheck p').off('click').on('click',function(e){
		$('.gendergather').attr('key',$(this).attr('key'));
		$('.gendergather').text($(this).text());
	   	$('.twocheck').removeClass('reilef');
	   	$('.gendergather').removeClass('Color');
	     event.stopPropagation();
	});
//种族
	$('.racegather,.raceimg').off('click').on('click',function(e){
		 $('.racecheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.racecheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else{
			$('.racegather').removeClass('Color');
			$(this).find('.racecheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.twocheck').removeClass('reilef');
	   	$('.gendergather').removeClass('Color');
		$('.citycheck').removeClass('reilef');
	   	$('.citygather').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.racecheck p',function(){
		$('.racegather').attr('value',$(this).attr('value'));
		$('.racegather').text($(this).text());
	   	$('.racecheck').removeClass('reilef');
	   	$('.racegather').removeClass('Color');
	     event.stopPropagation();
	});
	//城市
	$('.citygather,.cityimg').off('click').on('click',function(e){
		 $('.citycheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.citycheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else{
			$('.citygather').removeClass('Color');
			$(this).find('.citycheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.twocheck').removeClass('reilef');
	   	$('.gendergather').removeClass('Color');
	   	$('.racecheck').removeClass('reilef');
	   	$('.racegather').removeClass('Color');
		event.stopPropagation();
	});
	
	$('body').on('click','.citycheck p',function(){
		$('.citygather').attr('cityid',$(this).attr('cityid'));
		$('.citygather').text($(this).text());
	   	$('.citycheck').removeClass('reilef');
	   	$('.citygather').removeClass('Color');
	     event.stopPropagation();
	});
	//领域
	$('.skilldir,.skillimg').off('click').on('click',function(e){
		 $('.skillcheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.skillcheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.skilldir').removeClass('Color');
			$(this).find('.skillcheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.citycheck').removeClass('reilef');
	   	$('.citydir').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.skillcheck p',function(){
		var time=$(this).text();
		if ($('.skilldir').text()=='请选择'){
			$('.skilldir').attr('value',$(this).attr('value'));
			$('.skilldir').text($(this).text());
			$(this).addClass('pickme');
		}else if ($(this).hasClass('pickme')){
			$(this).removeClass('pickme');
			var val=$('.skilldir').attr('value');//1,2,3
			var tex=$('.skilldir').text();// 广告,广告,摄影
			var vals=$(this).attr('value');
			var texs=$(this).text();
			var vv,tt;
			val=val.split(",");
			for(var i=0;i<val.length;i++){
				if (vals==val[i]){
					if (val.length==1){
						vv='';
					}else{
						vv=vv;
					}
				}else{
					if (vv==undefined||vv==null){
						vv=val[i]
					}else{
						vv=vv+","+val[i];
					}
				}
			}
			tex=tex.split(",");
			for(var i=0;i<tex.length;i++){
				if (texs==tex[i]){
					tt=tt;
					if (tex.length==1){
						tt='请选择';
					}else {
						tt=tt;
					}
				}else{
					if (tt==undefined||tt==null){
						tt=tex[i]
					}else{
						tt=tt+","+tex[i];
					}
				}
			}
			$('.skilldir').attr('value',vv);
			$('.skilldir').text(tt);
		}else {
			$('.skilldir').attr('value',$('.skilldir').attr('value')+","+$(this).attr('value'));
			$('.skilldir').text($('.skilldir').text()+","+$(this).text());
			$(this).addClass('pickme');
		}
	    return false;
	});
//城市
	$('.citydir,.cityimg').off('click').on('click',function(e){
		 $('.citycheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.citycheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.citydir').removeClass('Color');
			$(this).find('.citycheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.skillcheck').removeClass('reilef');
	   	$('.skilldir').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.citycheck p',function(){
		$('.citydir').attr('cityid',$(this).attr('cityid'));
		$('.citydir').text($(this).text());
	   	$('.citycheck').removeClass('reilef');
	   	$('.citydir').removeClass('Color');
	     event.stopPropagation();
	});
	
	
//	场地类型
	$('.typesite,.typeimg').off('click').on('click',function(e){
		 $('.typecheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.typecheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.typesite').removeClass('Color');
			$(this).find('.typecheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.citycheck').removeClass('reilef');
	   	$('.citysite').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.typecheck p',function(){
		$('.typesite').attr('key',$(this).attr('key'));
		$('.typesite').text($(this).text());
	   	$('.typecheck').removeClass('reilef');
	   	$('.typesite').removeClass('Color');
	     event.stopPropagation();
	});
	//所在城市
	$('.citysite,.cityimg').off('click').on('click',function(e){
		 $('.citycheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.citycheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.citysite').removeClass('Color');
			$(this).find('.citycheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.typecheck').removeClass('reilef');
	   	$('.typesite').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.sitebox .citycheck p',function(){
		$('.citysite').attr('cityid',$(this).attr('cityid'));
		$('.citysite').text($(this).text());
	   	$('.citycheck').removeClass('reilef');
	   	$('.citysite').removeClass('Color');
	     event.stopPropagation();
	});
	///设备类型
	$('.typeequip,.typeimg').off('click').on('click',function(e){
		 $('.typecheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.typecheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.typeequip').removeClass('Color');
			$(this).find('.typecheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.namecheck').removeClass('reilef');
	   	$('.nameequip').removeClass('Color');
	   	$('.citycheck').removeClass('reilef');
	   	$('.cityequip').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.typecheck p',function(){
		$('.typeequip').attr('key',$(this).attr('key'));
		$('.typeequip').text($(this).text());
		$('.nameequip').val('');
	   	$('.typecheck').removeClass('reilef');
	   	$('.typeequip').removeClass('Color');
	   	droplink('device',$('.typeequip').attr('key'));
	     event.stopPropagation();
	});
	
	//名称
	$('.nameequip,.nameimg').off('click').on('click',function(e){
		if($('.typeequip').text()!='请选择'){
			$('.namecheck').addClass('reilef');
			if($(this).hasClass('Color')){
				 $('.namecheck').removeClass('reilef');
				$(this).removeClass('Color');
			}
			else
			{
				$('.nameequip').removeClass('Color');
				$(this).find('.namecheck').addClass('reilef');
				$(this).addClass('Color');
			}
			
			event.stopPropagation();
		}
		$('.citycheck').removeClass('reilef');
	   	$('.cityequip').removeClass('Color');
		$('.typecheck').removeClass('reilef');
	   	$('.typeequip').removeClass('Color');
		 
	});
	$('body').on('click','.namecheck p',function(){
		$('.nameequip').val($(this).text());
		$('.nameequip').attr('key',$(this).attr('key'));
	   	$('.namecheck').removeClass('reilef');
	   	$('.nameequip').removeClass('Color');
	     event.stopPropagation();
	});
	//所在城市
	$('.cityequip,.cityimg').off('click').on('click',function(e){
		 $('.citycheck').addClass('reilef');
		if($(this).hasClass('Color')){
			 $('.citycheck').removeClass('reilef');
			$(this).removeClass('Color');
		}
		else
		{
			$('.cityequip').removeClass('Color');
			$(this).find('.citycheck').addClass('reilef');
			$(this).addClass('Color');
		}
		$('.namecheck').removeClass('reilef');
	   	$('.nameequip').removeClass('Color');
		$('.typecheck').removeClass('reilef');
	   	$('.typeequip').removeClass('Color');
		event.stopPropagation();
	});
	$('body').on('click','.equipbox .citycheck p',function(){
		$('.cityequip').attr('cityid',$(this).attr('cityid'));
		$('.cityequip').text($(this).text());
	   	$('.citycheck').removeClass('reilef');
	   	$('.cityequip').removeClass('Color');
	     event.stopPropagation();
	});
	
}



