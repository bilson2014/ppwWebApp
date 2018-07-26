$().ready(function() {	
	propsmethod();	 
	
	
});

//添加场地
function propsmethod(){

	//关闭弹框
	$('.propstitle img,.propsbox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.propsbox').hide();	
		$('.customeRole').hide();
		$('.role').hide();
		cleanpropdata();
	});	
	
	//提交
	$('.propsbox .gatherbut .sure').off('click').on('click',function(){
	
		var type=$('.typepro').attr('key');
		var name=$('.namepro').val();
		var accredit=$('.accreditpro').attr('key');
		var stockNumber=$('.stockNumberpro').val();
		var price=$('.pricepro').val();	
		var city=$('.citypro').attr('cityid');		
		var remark=$('.remarkpro').val();
		
		var fileimg=$('#filePicker9 .fileimg').attr('src');
	
		$('.typeprop').text('');
		$('.typeprop').attr('key','');
		$('.nameprop').text('');
		$('.accreditprop').text('');
		$('.accreditpro').attr('key','');
		
		$('.stockNumberprop').text('');
		$('.priceprop').text('');
		$('.cityprop').text('');
		$('.cityValue').attr('cityid','');
		
		
		
		if (type==undefined||type==null||type==''){
			$('.typeprop').text('*请选择道具类别');
			return false;
		}else if (name==undefined||name==null||name==''){
			$('.nameprop').text('*请填写道具名称');
			return false;
		}else if(accredit==undefined||accredit==null||accredit==''){
			$('.accreditprop').text('*请选择授权方式');
			return false;
		}else if(stockNumber==undefined||stockNumber==null||stockNumber==''){
			$('.stockNumberprop').text('*请填写数量');
			return false;	
		}else if (price==undefined||price==null||price==''){
			$('.priceprop').text('*请填写价格');
			return false;
		}else if(city==undefined||city==null||city==''){
			$('.cityprop').text('*请选择城市');
			return false;
		}else if (fileimg=='/resources/images/supplier/site.png'){
			$('.propsr .addboxs span').attr("style","color: red;");
			return false;
		}else {
		
			var biao=$('.propsbox .propstitle span').text();
			if (biao=='更新道具信息'){
				var id=$('.propsbox').attr('id');
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatac();//获取场地数据
				 }, getContextPath() + '/production/costume/update', $.toJSON({
					 nature:'props',
					 id:id,//	主键
					 type:type,
					 name: name,
					 accredit:accredit,
					 stockNumber:stockNumber,
					 price:price,
					 city:city,
					 remark:remark,
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片				
					 mainPhoto:$('#filePicker9 .fileimg').attr('data-value') ,//主图
//					 photo:endimg,//更多图片
					
				}));
			}else{
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatac();
				 }, getContextPath() + '/production/costume/save', $.toJSON({	
					 nature:'props',
					 type:type,
					 name: name,
					 accredit:accredit,
					 stockNumber:stockNumber,
					 price:price,
					 city:city,
					 remark:remark,
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片				
					 mainPhoto:$('#filePicker9 .fileimg').attr('data-value') ,//主图
				}));
			}
			
		}
	});
	
}

//获取
function getprops(id){
	
	$('.propsbox .propstitle span').text('更新道具信息');
	listpeopledata('props');
	loadData(function(res){	
		$('.propsbox').attr('id',id);
		$('.namepro').val(res.name);
		$('.stockNumberpro').val(res.stockNumber);
		$('.pricepro').val(res.price);
		$('.remarkpro').val(res.remark);
		
		//图片处理
//		$('.siteimages').empty();
		$('#filePicker9 .fileimg').attr('data-value',res.mainPhoto);
		$('#filePicker9 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
		
		$('.addimgs,.clickimg').hide();
		if($('.reupload').length<=0){
			$('#filePicker9 .updateimg').after("<div class='reupload'>重新上传</div>");
		}
		
		
		$('.typepro').attr('key',res.type);
		for(var i=0;i<propsTypeList.length;i++){
			if (res.type==propsTypeList[i].value){
				$('.typepro').text(propsTypeList[i].text);
			}
		}
		
		
		$('.accreditpro').attr('key',res.accredit);
		for(var i=0;i<accreditList.length;i++){
			if (res.accredit==accreditList[i].value){
				$('.accreditpro').text(accreditList[i].text);
			}
		}
				
		
		var city=res.city;
		$('.citypro').attr('cityid',city);
		for(var i=0;i<cities.length;i++){
			if (city==cities[i].cityID){
				$('.citypro').text(cities[i].city);
				break;
			}
		}
		
	 }, getContextPath() + '/production/costume/get', $.toJSON({						
		 id:id,//	主键
	}));
}

function cleanpropdata(){
	$('.typeprop').text('');
	$('.nameprop').text('');
	$('.accreditprop').text('');
	$('.stockNumberprop').text('');
	$('.priceprop').text('');
	$('.cityprop').text('');
	
	
	$('.typepro').text('请选择类别');
	$('.namepro').val('');
	$('.accreditpro').text('请选择授权方式');
	$('.stockNumberpro').val('');
	$('.pricepro').val('');
	$('.citypro').text('请选择城市');
	$('.remarkpro').val('');
	
	$('.typeprocheck').hide();
	$('.accreditprocheck').hide();
	$('.citycheck').hide();
	
	$('.addboxs span').removeAttr("style");
//	$('#filePicker9').removeAttr("style");
//	$('#filePicker9').addClass('webuploader-container');
	
	$('#filePicker9 .fileimg').attr('src','/resources/images/supplier/site.png');
	$('#filePicker9 .fileimg').attr('data-value','/resources/images/supplier/site.png');
	$('#filePicker9 .reupload').remove();
	
}

function propsboxshow(){
	listpeopledata('props');//TODO 获取参数
	cleanpropdata();
	$('.propsbox .propstitle span').text('添加道具');
	var hasCity = $('.citycheck p');
	if(!hasCity.length > 0){
		listcitydata();
	}
}