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
	$('body').on('click','.citycheck p',function(){
		$('.citysite').text($(this).text());
		$('.citysite').attr('cityid',$(this).attr('cityid'));
		$('.citycheck').hide();
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
		}else if (fileimg==undefined||fileimg==null||fileimg==''){
			$('.siteright .addboxs span').attr("style","color: red;");
			return false;
		}else {
		
			var biao=$('.sitebox .sitetitle span').text();
			if (biao=='修改场地'){
				var id=$('.sitebox').attr('id');
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdatas();//获取场地数据
				 }, getContextPath() + '/production/studio/update', $.toJSON({						
					 address: locationsite,//地址
					 area: msite,//面积
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片
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
					 delImg:$('.sitebox .siteimages').attr('data-value'),//待删除图片
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
		$('.sitebox .sitetitle span').text('修改场地');
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
		if (photo!='null'){
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
				$('#filePicker5').removeClass('webuploader-container');
			}else {
				$('#filePicker5').removeAttr("style");
				$('#filePicker5').addClass('webuploader-container');
			}
		}
		
		
		
		if (res.type=='1'){
			$('.typesite').text('内景');
		}else {
			$('.typesite').text('外景');
		}
		$('.pricesite').val(res.price);
		$('.locationsite').val(res.address);
		$('.siteremark').val(res.remark);
		var cities=res.city;
		loadData(function(res){
			for(var i=0;i<res.length;i++){
				if (cities==res[i].cityID){
					$('.citysite').text(res[i].city);
				}
			}
		 }, getContextPath() + '/all/citys');
		
	 }, getContextPath() + '/production/studio/get', $.toJSON({						
		 id:id,//	主键
	}));
}
//删除
function delstudio(id){
	loadData(function(res){	
		console.log(id+'删除了,之后获取了新的 数据');
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
	$('.pricesite').val('');
	$('.citysite').text('请选择');
	$('.locationsite').val('');
	$('.siteremark').val('');
	
	$('.typecheck').hide();
	$('.citycheck').hide();
	
	$('#filePicker4').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加封面</p>");
	$('.addboxs span').removeAttr("style");
	$('#filePicker5').removeAttr("style");
	$('#filePicker5').addClass('webuploader-container');
	$('#filePicker4 .fileimg').removeAttr('data-value');
	$('#filePicker4 .fileimg').removeAttr('src');
	$('#filePicker4 .reupload').remove();
	$('#filePicker4 .addimgs,#filePicker4 .clickimg').show();
	$('.siteimages').hide();
	$('.siteimages').empty();
	
}