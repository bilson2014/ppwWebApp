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
		$('.citycheck').hide();
		$('.namecheck').hide();
		$('.typecheck').show();	
		$('.typeequipp').hide();
	
	});
	
	$('body').on('click','.typecheck p',function(){
		
		$('.typeequip').text($(this).text());
		$('.typeequip').attr('value',$(this).attr('value'));
		$('.typecheck').hide();
		droplink('device',$('.typeequip').attr('value'));
		
	});
	$('.equipleft .nameequip,.equipleft .nameimg').off('click').on('click',function(){
		$('.citycheck').hide();
		$('.typecheck').hide();	
		if($('.typeequip').text()!='请选择设备类型') {
			$('.namecheck').show();	
		}else {
			$('.typeequipp').show();
		
			
		}
		
	});
	
	$('body').on('click','.namecheck p',function(){
		$('.nameequip').val($(this).text());
		$('.namecheck').hide();
	});
	
	$('.equipleft .cityequip,.equipleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();	
		$('.namecheck').hide();
		$('.typecheck').hide();	
		
	});
	
	$('body').on('click','.citycheck p',function(){
		$('.cityequip').text($(this).text());
		$('.citycheck').hide();
	});
	$('.equipleft .numequip,.equipleft .priceequip').off('click').on('click',function(){
		$('.citycheck').hide();
		$('.namecheck').hide();
		$('.typecheck').hide();	
		
	
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
		var nameequip=$('.nameequip').val();
		var numequip=$('.numequip').val();
		var priceequip=$('.priceequip').val();
		var cityequip=$('.cityequip').text();
		
		var equipremark=$('.equipremark').val();
		
		$('.typeequipp').hide();
		$('.nameequipp').hide();
		$('.numequipp').hide();
		$('.priceequipp').hide();
		$('.cityequipp').hide();
		
		
		if (typeequip=='请选择设备类型'){
			$('.typeequipp').show();
			return false;
		}else if (nameequip==undefined||nameequip==null||nameequip==''){
			$('.nameequipp').show();
			return false;
		}else if(numequip==undefined||numequip==null||numequip==''){
			$('.numequipp').show();
			return false;
		}else if(priceequip==undefined||priceequip==null||priceequip==''){
			$('.priceequipp').show();
			return false;
		}else if(cityequip=='请选择城市'){
			$('.cityequipp').show();
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
		 name: $('.nameequip').val(),	//名称
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
		$('.nameequip').val(res.name);
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
	$('.nameequip').val('');
	$('.numequip').val('');
	$('.priceequip').val('');
	$('.cityequip').text('请选择城市');
	$('.equipremark').val('');
	
	$('.typeequipp').hide();
	$('.nameequipp').hide();
	$('.numequipp').hide();
	$('.priceequipp').hide();
	$('.cityequipp').hide();
	
	$('.typecheck').hide();
	$('.namecheck').hide();
	$('.citycheck').hide();
		
}
function dropdowndata(){
	$('.equipleft .typecheck').text('');
	loadData(function(res){	
		console.log(res);
		console.log(res.deviceTypes.length);
//		for(var i=0;i<res.deviceTypes.length;i++){
//		
//			var phtml="<p value="+res.deviceTypes[i].value+">"+res.deviceTypes[i].text+"</p>";
//			$('.equipleft .typecheck').append(phtml);
//		}
		
	/* }, getContextPath() + '/production/device/parameter');*/
	 }, getContextPath() + '/quotationtype/production/children?productionType=device');
	
}
function droplink(type,val){
	$('.equipleft .namecheck').text('');
	loadData(function(res){	

		for(var i=0;i<res.length;i++){

			var phtml="<p id="+res[i].id+" pid="+res[i].pid+">"+res[i].text+"</p>";
			if (type=='device'){
				$('.equipleft .namecheck').append(phtml);
			}else if (type=='device'){
				console.log('未出现');
			}
			
		}
		
	 }, getContextPath() + "/quotationtype/production/select?productionType="+type+"&subType="+val);
	
}

