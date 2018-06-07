$().ready(function() {	
	devicemethod();	 
	
	
});



//添加设备
function devicemethod(){

	//关闭弹框
	$('.equiptitle img,.equipbox .cancel').off('click').on('click',function(){
		$('.setting').hide();
		$('.equipbox').hide();	
		cleandevdata();
	});
	//下拉框出现(类型)
	$('.equipleft .typeequip,.equipleft .typeimg').off('click').on('click',function(){
		$('.typecheck').show();	
	});
	$('.typecheck p').off('click').on('click',function(){
		$('.typeequip').text($(this).text());
		$('.typecheck').hide();
	});
	$('.equipleft .nameequip,.equipleft .nameimg').off('click').on('click',function(){
		$('.namecheck').show();	
	});
	$('.namecheck p').off('click').on('click',function(){
		$('.nameequip').text($(this).text());
		$('.namecheck').hide();
	});
	$('.equipleft .cityequip,.equipleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();	
	});
	$('.citycheck p').off('click').on('click',function(){
		$('.cityequip').text($(this).text());
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
	$('.equipbox .gatherbut .sure').off('click').on('click',function(){
	
		var typeequip=$('.typeequip').text();
		var nameequip=$('.nameequip').text();
		var numequip=$('.numequip').val();
		var priceequip=$('.priceequip').val();
		var cityequip=$('.cityequip').text();
		
		var equipremark=$('.equipremark').val();
		
		$('.typeequipp').text('');
		$('.nameequipp').text('');
		$('.numequipp').text('');
		$('.priceequipp').text('');
		$('.cityequipp').text('');
		
		
		if (typeequip=='请选择设备类型'){
			$('.typeequipp').text('*请选择设备类型');
			return false;
		}else if (nameequip=='请选择设备名称'){
			$('.nameequipp').text('*请选择设备名称');
			return false;
		}else if(numequip==undefined||numequip==null||numequip==''){
			$('.numequipp').text('*数字不能为空');
			return false;
		}else if(priceequip==undefined||priceequip==null||priceequip==''){
			$('.priceequipp').text('*价格不能为空');
			return false;
		}else if(cityequip=='请选择城市'){
			$('.cityequipp').text('*请选择城市');
			return false;
		}else {
			console.log('验证正确');
			var biao=$('.equipbox .equiptitle span').text();
			if (biao=='修改设备'){
//				var id=$('.equipbox').attr('id');
				datadevice('update');
			}else{
				datadevice('save');				
			}

		}
		
	});
	
	
}
function datadevice(type){
	loadData(function(result){	
		cleandata();
		$('.setting').hide();
		$('.equipbox').hide();
		getlistdata('device');//获取设备数据
	 }, getContextPath() + "/production/device/"+type+"", $.toJSON({						
//		 createTime: ,//创建时间
		 id:$('.equipbox').attr('id'),//	主键
		 name: $('.nameequip').text(),	//名称
//		 Photo:,//照片
		 price: $('.priceequip').val(),//	价格
		 quantity:$('.numequip').val(),//数量
		 remark:$('.equipremark').val(),//	备注
		 type:$('.typeequip').text(),//设备类型
//		 typeId:,//标准化元素
		 city:$('.cityequip').text(),//待修改的 字段
		
	}));
}


//获取
function getdevice(id){
	loadData(function(res){	
		$('.equipbox .equiptitle span').text('修改设备');
		$('.equipbox').attr('id',id);
		
		$('.typeequip').text(res.type);
		$('.nameequip').text(res.name);
		$('.numequip').val(res.quantity);
		$('.priceequip').val(res.price);
		$('.cityequip').text(res.city);
		$('.equipremark').val(res.remark);
	
		
	 }, getContextPath() + '/production/device/get', $.toJSON({						
		 id:id,//	主键
	}));
	
}
//删除
function deldevice(id){
	loadData(function(res){	
		console.log(id+'删除了,之后获取了新的 数据');
		getlistdata('device');//获取设备数据
	 }, getContextPath() + '/production/device/delete', $.toJSON({						
		 id:id,//	主键
	}));
	
}
function cleandevdata(){
	$('.typeequip').text('请选择设备类型');
	$('.nameequip').text('请选择设备名称');
	$('.numequip').val('');
	$('.priceequip').val('');
	$('.cityequip').text('请选择城市');
	$('.equipremark').val('');
	
	$('.typeequipp').text('');
	$('.nameequipp').text('');
	$('.numequipp').text('');
	$('.priceequipp').text('');
	$('.cityequipp').text('');
		
}
function dropdowndata(){
	loadData(function(res){	
		console.log(res);
		for(var i=0;i<res.length;i++){
			console.log(res.deviceTypes[i].text);
			console.log(res.deviceTypes[i].value);
		}
		
	 }, getContextPath() + '/production/device/parameter');
	
}
function droplink(type,val){
	loadData(function(res){	
		console.log(res);
//		for(var i=0;i<res.length;i++){
//			console.log(res.deviceTypes[i].text);
//			console.log(res.deviceTypes[i].value);
//		}
		
	 }, getContextPath() + "/quotationtype/production/select?productionType="+type+"&subType="+val);
	
}