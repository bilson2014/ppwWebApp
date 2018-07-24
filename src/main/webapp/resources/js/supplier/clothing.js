$().ready(function() {	
	clothingmethod();	 
});

//添加场地
function clothingmethod(){

	//关闭弹框
	$('.clothingtitle img,.clothingbox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.clothingbox').hide();	
		$('.customeRole').hide();
		cleanclodata();
	});

	//提交
	$('.clothingbox .gatherbut .sure').off('click').on('click',function(){
	
		var type=$('.typeclo').attr('key');
		var name=$('.nameclo').val();
		var accredit=$('.accreditclo').attr('key');
		var stockNumber=$('.stockNumberclo').val();
		var price=$('.priceclo').val();	
		var city=$('.cityclo').attr('cityid');		
		var remark=$('.remarkclo').val();
		
		var fileimg=$('#filePicker8 .fileimg').attr('src');
	
		$('.typeclop').text('');
		$('.nameclop').text('');
		$('.accreditclop').text('');
		$('.stockNumberclop').text('');
		$('.priceclop').text('');
		$('.cityclop').text('');
		
		
		if (type==undefined||type==null||type==''){
			$('.typeclop').text('*请选择服装类别');
			return false;
		}else if (name==undefined||name==null||name==''){
			$('.nameclop').text('*请填写服装名称');
			return false;
		}else if(accredit==undefined||accredit==null||accredit==''){
			$('.accreditclop').text('*请选择授权方式');
			return false;
		}else if(stockNumber==undefined||stockNumber==null||stockNumber==''){
			$('.stockNumberclop').text('*请填写库存');
			return false;	
		}else if (price==undefined||price==null||price==''){
			$('.priceclop').text('*请填写价格');
			return false;
		}else if(city==undefined||city==null||city==''){
			$('.cityclop').text('*请选择城市');
			return false;
		}else if (fileimg=='/resources/images/supplier/site.png'){
			$('.clothingr .addboxs span').attr("style","color: red;");
			return false;
		}else {
		
			var biao=$('.clothingbox .clothingtitle span').text();
			if (biao=='修改服装'){
				var id=$('.clothingbox').attr('id');
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatac();//获取场地数据
				 }, getContextPath() + '/production/costume/update', $.toJSON({
					 nature:'clothing',
					 id:id,//	主键
					 type:type,
					 name: name,
					 accredit:accredit,
					 stockNumber:stockNumber,
					 price:price,
					 city:city,
					 remark:remark,
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片				
					 mainPhoto:$('#filePicker8 .fileimg').attr('data-value') ,//主图
//					 photo:endimg,//更多图片
					
				}));
			}else{
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatac();//获取场地数据
				 }, getContextPath() + '/production/costume/save', $.toJSON({	
					 nature:'clothing',
					 type:type,
					 name: name,
					 accredit:accredit,
					 stockNumber:stockNumber,
					 price:price,
					 city:city,
					 remark:remark,
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片				
					 mainPhoto:$('#filePicker8 .fileimg').attr('data-value') ,//主图
				}));
			}
			
		}
	});
	
}

//获取
function getclothing(id){
	$('.clothingbox .clothingtitle span').text('修改服装');
	loadData(function(res){	
		$('.clothingbox').attr('id',id);
		$('.nameclo').val(res.name);
		$('.stockNumberclo').val(res.stockNumber);
		$('.priceclo').val(res.price);
		$('.remarkclo').val(res.remark);
		
		//图片处理
//		$('.siteimages').empty();
		$('#filePicker8 .fileimg').attr('data-value',res.mainPhoto);
		$('#filePicker8 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
		
		$('.addimgs,.clickimg').hide();
		if($('.reupload').length<=0){
			$('#filePicker8 .updateimg').after("<div class='reupload'>重新上传</div>");
		}
		
		
		$('.typeclo').attr('key',res.type);
		
		for(var i=0;i<clothingTypeList.length;i++){
			if (res.type==clothingTypeList[i].value){
				$('.typeclo').text(clothingTypeList[i].text);
			}
		}
		
		
		$('.accreditclo').attr('key',res.accredit);
		
		for(var i=0;i<accreditList.length;i++){
			if (res.accredit==accreditList[i].value){
				$('.accreditclo').text(accreditList[i].text);
			}
		}
				
		
		var city=res.city;
		$('.cityclo').attr('cityid',city);
		for(var i=0;i<cities.length;i++){
			if (city==cities[i].cityID){
				$('.cityclo').text(cities[i].city);
				break;
			}
		}
		
	 }, getContextPath() + '/production/costume/get', $.toJSON({						
		 id:id,//	主键
	}));
}
//删除
function delCustome(id){
	loadData(function(res){	
		getlistdatac();//获取场地数据
	 }, getContextPath() + '/production/costume/delete', $.toJSON({						
		 id:id,//	主键
	}));
}
function cleanclodata(){
	$('.typeclop').text('');
	$('.nameclop').text('');
	$('.accreditclop').text('');
	$('.stockNumberclop').text('');
	$('.priceclop').text('');
	$('.cityclop').text('');
	
	
	$('.typeclo').text('请选择类别');
	$('.nameclo').val('');
	$('.accreditclo').text('请选择授权方式');
	$('.stockNumberclo').val('');
	$('.priceclo').val('');
	$('.cityclo').text('请选择城市');
	$('.remarkclo').val('');
	
	$('.typeclocheck').hide();
	$('.accreditclocheck').hide();
	$('.citycheck').hide();
	
	$('.addboxs span').removeAttr("style");
	/*$('#filePicker8').removeAttr("style");
	$('#filePicker8').addClass('webuploader-container');*/
	
	$('#filePicker8 .fileimg').attr('src','/resources/images/supplier/site.png');
	$('#filePicker8 .fileimg').attr('data-value','/resources/images/supplier/site.png');
	$('#filePicker8 .reupload').remove();
	
}

//添加服装弹出框
function clothingboxshow(){
	listpeopledata('clothing');//TODO 获取参数
	cleanclodata();
	$('.clothingbox .clothingtitle span').text('添加服装');
	var hasCity = $('.citycheck p');
	if(!hasCity > 0){
		listcitydata();
	}
	
}

//修改服装道具
function getcostume(id,type){
	
	if (type=='clothing'){
		$('.customeRole').addClass('pickroleclo');
		
		$('.clothingbox').show();
		$('.clothingbox').addClass('pickborder');
		
		clothingboxshow();
		getclothing(id);
		
	}else if (type=='props'){
		$('.customeRole').addClass('pickroleclo');
		$('.propsbox').show();
		$('.propsbox').addClass('pickborder');
		directorboxshow();
		getprops(id);
	}
}