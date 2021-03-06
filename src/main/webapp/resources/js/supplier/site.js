$().ready(function() {	
	sitemethod();	 
	
	
});

//添加场地
function sitemethod(){

	//关闭弹框
	$('.sitetitle img,.sitebox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.sitebox').hide();	
		cleandata();
	});
	//下拉框出现(类型)
	$('.siteleft .typesite,.siteleft .typeimg').off('click').on('click',function(){
		$('.typecheck').show();	
		$('.citycheck').hide();
	});
	$('body').on('click','.typecheck p',function(){
	
		$('.typesite').text($(this).text());
		$('.typesite').attr('key',$(this).attr('key'));
		$('.typecheck').hide();
	});
	$('.siteleft .citysite,.siteleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();	
		$('.typecheck').hide();
	});

	$('.siteleft .namesite,.siteleft .msite,.siteleft .pricesite,.siteleft .locationsite').off('click').on('click',function(){
		$('.citycheck').hide();	
		$('.typecheck').hide();
	});
	
	//提交
	$('.sitebox .gatherbut .sure').off('click').on('click',function(){
	
		var namesite=$('.namesite').val();
		var msite=$('.msite').val();
		var typesite=$('.typesite').text();
		var pricesite=$('.pricesite').val();
		var locationsite=$('.locationsite').val();
		var citysite=$('.citysite').text();
		
		var siteremark=$('.siteremark').val();
		
		var fileimg=$('#filePicker4 .fileimg').attr('src');
		console.log(fileimg);
		
		
		var endimg;
		$('.siteimages .imgsboxs').children('img').each(function(){
			var moreimg=$(this).attr('data-value');
			if (endimg==null||endimg==undefined||endimg==''){
				endimg=moreimg;
			}else {
				endimg=endimg+";"+moreimg;
			}
		})
		
		
		$('.namesitep').text('');
		$('.msitep').text('');
		$('.typesitep').text('');
		$('.pricesitep').text('');
		$('.locationsitep').text('');
		$('.citysitep').text('');
		
		
		if (namesite==undefined||namesite==null||namesite==''){
			$('.namesitep').text('*请填写场地名称');
			return false;
		}else if (msite==undefined||msite==null||msite==''){
			$('.msitep').text('*请填写面积');
			return false;
		}else if(typesite=='请选择'){
			$('.typesitep').text('*请选择场地类型');
			return false;
		}else if(pricesite==undefined||pricesite==null||pricesite==''){
			$('.pricesitep').text('*请填写价格');
			return false;
		}else if(citysite=='请选择'){
			$('.citysitep').text('*请选择城市');
			return false;
		}else if (locationsite==undefined||locationsite==null||locationsite==''){
			$('.locationsitep').text('*请填写详细地址');
			return false;
		}else if (fileimg=='/resources/images/supplier/site.png'){
			$('.siteright .addboxs span').attr("style","color: red;");
			return false;
		}else {
		
			var biao=$('.sitebox .sitetitle span').text();
			if (biao=='更新场地信息'){
				var id=$('.sitebox').attr('id');
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatas();//获取场地数据
				 }, getContextPath() + '/production/studio/update', $.toJSON({						
					 address: locationsite,//地址
					 area: msite,//面积
					 delImg:setDel,//待删除图片
					 id:id,//	主键
					 mainPhoto:$('#filePicker4 .fileimg').attr('data-value') ,//主图
					 name:namesite,	//名称
					 photo:endimg,//更多图片
					 price:pricesite,//	价格
					 remark:siteremark,//	备注
					 type:$('.typesite').attr('key'),//场地类型
					 city:$('.citysite').attr('cityid'),//城市类型
					
				}));
			}else{
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatas();//获取场地数据
				 }, getContextPath() + '/production/studio/save', $.toJSON({						
					 address: locationsite,//地址
					 area: msite,//面积
					 delImg:setDel,//待删除图片
					 mainPhoto:$('#filePicker4 .fileimg').attr('data-value') ,//主图
					 name: namesite,	//名称
					 photo:endimg,//更多图片
					 price: pricesite,//	价格
					 remark:siteremark,//	备注
					 type:$('.typesite').attr('key'),//场地类型
					 city:$('.citysite').attr('cityid'),//城市类型
					 
				}));
			}
			
		}
	});
	
}

//获取
function getstudio(id){
	loadData(function(res){	
		$('.sitebox .sitetitle span').text('更新场地信息');
		$('.sitebox').attr('id',id);
		$('.namesite').val(res.name);
		$('.msite').val(res.area);
		
		//图片处理
		$('.siteimages').empty();
		$('#filePicker4 .fileimg').attr('data-value',res.mainPhoto);
		$('#filePicker4 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
		
		$('.addimgs,.clickimg').hide();
		if($('.reupload').length<=0){
			$('#filePicker4 .updateimg').after("<div class='reupload'>重新上传</div>");
		}
				
		var photo=res.photo;
		if (photo!='null' && photo!=null){
			$('.siteimages').show();
			photo=photo.split(';');
			for (var i=0;i<photo.length;i++){
				var addimagebox="<div class='imgsboxs '>"
      				+"<img class='imgsfive1' data-value="+photo[i]+" src="+getResourcesName()+photo[i]+">"
      				+"<div class='imgshade '>"
      				+"<img class='select' src='/resources/images/supplier/select.png'>"
      				+"</div></div>";
	
				$('.siteimages').append(addimagebox);
			}
			if (photo.length>=3){
				$('#filePicker5').attr("style","background: #ebebeb;");
				$('#filePicker5').addClass('webuploader-element-invisible');
			}else {
				$('#filePicker5').removeAttr("style");
				$('#filePicker5').removeClass('webuploader-element-invisible');
			}
		}
		
		
		$('.typesite').attr('key',res.type);
		if (res.type=='1'){
			$('.typesite').text('内景');
		}else {
			$('.typesite').text('外景');
		}
		$('.pricesite').val(res.price);
		$('.locationsite').val(res.address);
		$('.siteremark').val(res.remark);
		var cities=res.city;
		reSetCity($('.citysite'),cities);		
	 }, getContextPath() + '/production/studio/get', $.toJSON({						
		 id:id,//	主键
	}));
}
//删除
function delstudio(id){
	loadData(function(res){	
		getlistdatas();//获取场地数据
	 }, getContextPath() + '/production/studio/delete', $.toJSON({						
		 id:id,//	主键
	}));
}
function cleandata(){
	
	$('.namesitep').text('');
	$('.msitep').text('');
	$('.typesitep').text('');
	$('.pricesitep').text('');
	$('.locationsitep').text('');
	$('.citysitep').text('');
	
	$('.namesite').val('');
	$('.msite').val('');
	$('.typesite').text('请选择');
	$('.typesite').attr('key','');
	$('.pricesite').val('');
	$('.citysite').text('请选择');
	$('.cityValue').attr('cityid','');
	
	$('.locationsite').val('');
	$('.siteremark').val('');
	
	$('.typecheck').hide();
	$('.citycheck').hide();

	$('.addboxs span').removeAttr("style");
	$('#filePicker5').removeAttr("style");                 
	$('#filePicker5').removeClass('webuploader-element-invisible');

	$('#filePicker4 .fileimg').attr('src','/resources/images/supplier/site.png');
	$('#filePicker4 .fileimg').attr('data-value','/resources/images/supplier/site.png');
	
	$('#filePicker4 .reupload').remove();
	
	$('.siteimages').hide();
	$('.siteimages').empty();
	
}