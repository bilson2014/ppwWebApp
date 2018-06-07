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
	});
	$('.typecheck p').off('click').on('click',function(){
		$('.typesite').text($(this).text());
		$('.typecheck').hide();
	});
	$('.siteleft .citysite,.siteleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();	
	});
	$('.citycheck p').off('click').on('click',function(){
		$('.citysite').text($(this).text());
		$('.citycheck').hide();
	});
	

	//图片的操作
//	$('.imgsboxs').off('mouseover').on('mouseover',function(){
//		$(this).find('.imgshade ').show();
//	});
//	$('.imgsboxs').off('mouseout').on('mouseout',function(){
//		$(this).find('.imgshade ').hide();
//	});
	
	
	
	
	//提交
	$('.sitebox .gatherbut .sure').off('click').on('click',function(){
	
		var namesite=$('.namesite').val();
		var msite=$('.msite').val();
		var typesite=$('.typesite').text();
		var pricesite=$('.pricesite').val();
		var locationsite=$('.locationsite').val();
		var citysite=$('.citysite').text();
		
		var siteremark=$('.siteremark').val();
		
		$('.namesitep').text('');
		$('.msitep').text('');
		$('.typesitep').text('');
		$('.pricesitep').text('');
		$('.locationsitep').text('');
		$('.citysitep').text('');
		
		
		if (namesite==undefined||namesite==null||namesite==''){
			$('.namesitep').text('*名称不能为空');
			return false;
		}else if (msite==undefined||msite==null||msite==''){
			$('.msitep').text('*面积不能为空');
			return false;
		}else if(typesite=='请选择场地类型'){
			$('.typesitep').text('*请选择场地类型');
			return false;
		}else if(pricesite==undefined||pricesite==null||pricesite==''){
			$('.pricesitep').text('*数字不能为空');
			return false;
		}else if(citysite=='请选择城市'){
			$('.citysitep').text('*请选择城市');
			return false;
		}else if (locationsite==undefined||locationsite==null||locationsite==''){
			$('.locationsitep').text('*地址不能为空');
			return false;
		}else {
			console.log('验证正确');
			var biao=$('.sitebox .sitetitle span').text();
			if (biao=='修改场地'){
				var id=$('.sitebox').attr('id');
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdata('studio');//获取场地数据
				 }, getContextPath() + '/production/studio/update', $.toJSON({						
					 address: locationsite,//地址
					 area: msite,//面积
//					 delImg:,//待删除图片
					 id:id,//	主键
//					 mainPhoto:,//主图
					 name: namesite,	//名称
//					 photo:,//	其他照片
					 price: pricesite,//	价格
					 remark:siteremark,//	备注
					 type:typesite,//场地类型
					 citysite:citysite,//城市类型 -----
					
				}));
			}else{
				loadData(function(result){	
					cleandata();
					$('.setting').hide();
					$('.sitebox').hide();
					getlistdata('studio');//获取场地数据
				 }, getContextPath() + '/production/studio/save', $.toJSON({						
					 address: locationsite,//地址
					 area: msite,//面积
//					 delImg:,//待删除图片
//					 id:,//	主键
//					 mainPhoto:,//主图
					 name: namesite,	//名称
//					 photo:,//	其他照片
					 price: pricesite,//	价格
					 remark:siteremark,//	备注
					 type:typesite,//场地类型
					 citysite:citysite,//城市类型 -----
					 
					 
					 
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
		$('.typesite').text(res.type);
		$('.pricesite').val(res.price);
		$('.citysite').text(res.citysite);
		$('.locationsite').val(res.address);
		$('.siteremark').val(res.remark);
		
	 }, getContextPath() + '/production/studio/get', $.toJSON({						
		 id:id,//	主键
	}));
	
}
//删除
function delstudio(id){
	loadData(function(res){	
		console.log(id+'删除了,之后获取了新的 数据');
		getlistdata('studio');//获取场地数据
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
	$('.typesite').text('请选择场地类型');
	$('.pricesite').val('');
	$('.citysite').text('请选择城市');
	$('.locationsite').val('');
	$('.siteremark').val('');
	
}