$().ready(function() {
	
	init();
	imgcheckpeople();
	newbutton();
	
	
	listcitydata();
	
//	listpeopledata('director');

});
//图片尺寸的显示处理竖版
function imgcheckpeople(){
	for (var i=1;i<=10000;i++){
		var img=new Image();
		img.src=$('.imgs'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
//				console.log(img.width);
//				console.log(img.height);
				$('.imgs'+i).attr('style','width:auto;height:100%');
			}else {
//				console.log(img.width);
//				console.log(img.height);
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
//图片尺寸的显示处理竖版
function imgcheckpeoplefive(){
	for (var i=1;i<=6;i++){
		var img=new Image();
		img.src=$('.imgsfive'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
//				console.log(img.width);
//				console.log(img.height);
				$('.imgsfive'+i).attr('style','width:auto;height:100%');
			}else {
//				console.log(img.width);
//				console.log(img.height);
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
	
	//图片删除共同dels  修改
	$('body').on('click','.idcard .select',function(){
		var id=$(this).parent().parent().attr('id');
		if ($('.showimages').children().length==1){
			$(this).parent().parent().remove();
			$('.showimages').hide();
			
		}else {
			$(this).parent().parent().remove();
			
		}
		
		if ($('.top .people').hasClass('top-text')){
			delstudio(id);
		
		}else if($('.top .sitett').hasClass('top-text')){
			delstudio(id);
			
		}else if($('.top .facility').hasClass('top-text')){
			deldevice(id);
		}
		
	});
	$('body').on('click','.idcard .read',function(){
		$(this).find('.shade').hide();
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
		getlistdata('people');//获取人数据
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').removeClass('idcard-site ');
		$('.setCard').find('.shade').removeClass('idcard-site ');
		$('.setCard').find('.linebox ').removeClass('linebox-site');
		$('.setCard').find('.idcard').removeClass('idcard-facility ');
		$('.setCard').find('.shade').removeClass('idcard-facility ');
		$('.setCard').find('.linebox ').removeClass('linebox-facility');
		imgcheckpeople();
		
	});
	$('.sitett').off('click').on('click',function(){
		
		getlistdata('studio');//获取场地数据
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').addClass('idcard-site ');
		$('.setCard').find('.shade').addClass('idcard-site ');
		$('.setCard').find('.linebox ').addClass('linebox-site');
		$('.setCard').find('.idcard').removeClass('idcard-facility ');
		$('.setCard').find('.shade').removeClass('idcard-facility ');
		$('.setCard').find('.linebox ').removeClass('linebox-facility');
		imgchecksite();
	});
	$('.facility').off('click').on('click',function(){
		getlistdata('device');//获取设备数据
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').addClass('idcard-facility ');
		$('.setCard').find('.shade').addClass('idcard-facility ');
		$('.setCard').find('.linebox ').addClass('linebox-facility');
		$('.setCard').find('.idcard').removeClass('idcard-site ');
		$('.setCard').find('.shade').removeClass('idcard-site ');
		$('.setCard').find('.linebox ').removeClass('linebox-site');
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
		
		}else if($('.top .sitett').hasClass('top-text')){
			$('.sitebox').show();
			$('.sitebox .sitetitle span').text('添加场地');
			$('.sitebox').attr('id','');
			
			
			
		}else if($('.top .facility').hasClass('top-text')){
			$('.equipbox').show();
			$('.equipbox .equiptitle span').text('添加设备');
			$('.equipbox').attr('id','');
			cleandevdata();
			
			
			dropdowndata();
			
			
		}
		

		 
	});
}



function getlistdata(type){
	loadData(function(res){	
		
		if (type=="people"){
			$('.setCard').text('');
			for(var i=0;i<res.length;i++){
				var boxhtml="<div class='idcard  ' id ="+res[i].id+" identity="+res[i].identity+">"
	            +"<img class='imgs"+i+"' src="+res[i].photo+">"
	            +"<div class='shade  ' style='display: none;'>"
	            +"<img class='read' src='/resources/images/supplier/read.png'>"
	            +"<img class='select' src='/resources/images/supplier/select.png'>"
	            +"</div>"
	            +"<div class='linebox '>"
	            +"<span class='name'>"+res[i].name+"</span>"
	            +"<p class='price'>"+res[i].price+"</p>"
	            +"</div>"
	            +"</div>";
				$('.setCard').append(boxhtml);
				
			}
		}else if(type=='studio'){
			$('.setCard').text('');
			for(var i=0;i<res.length;i++){
				var boxhtml="<div class='idcard  idcard-site' id ="+res[i].id+" identity="+res[i].identity+">"
	            +"<img class='imgs"+i+"' src="+res[i].photo+">"
	            +"<div class='shade  idcard-site' style='display: none;'>"
	            +"<img class='read' src='/resources/images/supplier/read.png'>"
	            +"<img class='select' src='/resources/images/supplier/select.png'>"
	            +"</div>"
	            +"<div class='linebox linebox-site'>"
	            +"<span class='name'>"+res[i].name+"</span>"
	            +"<p class='price'>"+res[i].price+"</p>"
	            +"</div>"
	            +"</div>";
				$('.setCard').append(boxhtml);
				
			}
			
		}else if(type=="device"){
			$('.setCard').text('');
			var htt=$('#storage_node').val();
			for(var i=0;i<res.length;i++){
				var boxhtml="<div class='idcard  idcard-facility' id ="+res[i].id+" identity="+res[i].identity+">"
	            +"<img class='imgs"+i+"' src="+htt+res[i].photo+">"
	            +"<div class='shade  idcard-facility' style='display: none;'>"
	            +"<img class='read' src='/resources/images/supplier/read.png'>"
	            +"<img class='select' src='/resources/images/supplier/select.png'>"
	            +"</div>"
	            +"<div class='linebox linebox-facility'>"
	            +"<span class='name'>"+res[i].name+"</span>"
	            +"<p class='price'>"+res[i].price+"</p>"
	            +"</div>"
	            +"</div>";
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
//			 imgchecksite();
			
		}
	
		
		
	 }, getContextPath() + ' /production/'+type+'/list', $.toJSON({						
 
		 
	}));
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
		console.log(res.specialtyList);
		if (type=='director'){
			for(var i=0;i<res.specialtyList.length;i++){
				var phtml="<p value="+res.specialtyList[i].value+">"+res.specialtyList[i].text+"</p>";
				$('.skillcheck').append(phtml);
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
	
	 city:$('.citygather').attr('cityid'),//城市(编码)
	 price:pricegather,//价格
	 remark:remarkgather,//备注
	 sex:$('.gendergather').attr('key'),//性别(1,2)

	 
	 
	if (type=='actor'){
		$('.staffbox').show();
		loadData(function(res){	
			console.log('修改演员');
			console.log(res);
			$('.staffbox .stafftitle span').text('修改演员');
			$('.staffbox').attr('id',id);
			$('.namegather').val(res.name);
			if (res.sex=='1'){
				$('.gendergather').text('男');
			}else {
				$('.gendergather').text('女');
			}
			$('.oldgather').val(res.birthDay);
			var zone=res.zone;
			loadData(function(res){
				for(var i=0;i<res.zoneList.length;i++){
					if (zone==res.zoneList[i].value){
						$('.racegather').text(res.zoneList[i].text);
					}
				}
			 }, getContextPath() + '/production/actor/parameter');
			var city=res.city;
			loadData(function(res){
				for(var i=0;i<res.length;i++){
					if (city==res[i].cityID){
						$('.citygather').text(res[i].city);
					}
				}
			 }, getContextPath() + '/all/citys');
			
			========================================
			
//			$('.pricesite').val(res.price);
//			$('.locationsite').val(res.address);
//			$('.siteremark').val(res.remark);
//			var cities=res.city;
//			loadData(function(res){
//				for(var i=0;i<res.length;i++){
//					if (cities==res[i].cityID){
//						$('.citysite').text(res[i].city);
//					}
//				}
//			 }, getContextPath() + '/all/citys');
			
		 }, getContextPath() + '/production/actor/get', $.toJSON({						
			 id:id,//	主键
		}));
	}else {
		//导演的数据
	}
	
}