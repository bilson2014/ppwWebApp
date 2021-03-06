var fileimg;
var setDel='';
$().ready(function() {	
	peoplemethod();
});

//添加人员
function peoplemethod(){
     
	//关闭弹框--这两个监听好像并没有用
	$('.peopletitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.peoplebox').hide();	
		$('.role').hide();
		$('.staffbox').removeClass('pickborder');
		$('.directorbox').removeClass('pickborder');
		$('.peoplebox').removeClass('pickborder');
		cleanpeopledata();
	});
	//下拉框
	$('.peoplel .citypeo,.peoplel .cityimg').off('click').on('click',function(){
		$('.citycheck').show();	
	});

	$('.peoplel .namepeo,.peoplel .pricepeo,.peoplel .remark').off('click').on('click',function(){
		$('.citycheck').hide();	
	});
	
	//提交
	$('.peoplebox .gatherbut .sure').off('click').on('click',function(){
	
		var namepeo=$('.namepeo').val();
		var citypeo=$('.citypeo').text();
		var pricepeo=$('.pricepeo').val();
		var remarkpeople=$('.remarkpeople').val();
		var professionpeo=$('#professionpeo').val();
		var fileimg=$('#filePicker6 .fileimg').attr('src');//图片
        var phone = $('.peoPhone').val();
				
		$('.namepeop').text('');
		$('.pricepeop').text('');
		$('.citypeop').text('');		
		$('.citypeop').attr('cityid','');
		$('.phonepeop').text('');
		
		if(phone!=''&&phone!=null&&phone!=undefined){
			if(!checkMobile(phone)){
				$('.phonepeop').text('手机号错误');
				return false;
			}
		}
		
		if (namepeo==undefined||namepeo==null||namepeo==''){
			$('.namepeop').text('*请填写场地名称');
			return false;
		}else if(pricepeo==undefined||pricepeo==null||pricepeo==''){
			$('.pricepeop').text('*请填写价格');
			return false;
		}else if(citypeo=='请选择'){
			$('.citypeop').text('*请选择城市');
			return false;
		}else if (fileimg=='/resources/images/supplier/site.png'){
			$('.peopler .addboxs span').attr("style","color: red;");
			return false;
		}else {
					
			var biao=$('.peoplebox .peopletitle span').text();
			if (biao.indexOf('更新') != -1){
				var id=$('.peoplebox').attr('id');
				loadData(function(result){	
					cleanpeopledata();
					$('.setting').hide();
					$('.peoplebox').hide();
					getlistdatap();//列表刷新
				 }, getContextPath() + '/production/personnel/update', $.toJSON({						
					 delImg:setDel,//待删除图片
					 id:id,//	主键
					 mainPhoto:$('#filePicker6 .fileimg').attr('data-value') ,//主图
					 name:namepeo,	//名称
					 price:pricepeo,//	价格
					 remark:remarkpeople,//	备注
					 city:$('.citypeo').attr('cityid'),//城市类型
					 profession:professionpeo,//职业
					 phone:phone
					
				}));
			}else{
				loadData(function(result){	
					cleanpeopledata();
					$('.setting').hide();
					$('.peoplebox').hide();
					getlistdatap();//列表刷新
				 }, getContextPath() + '/production/personnel/save', $.toJSON({						
					 delImg:setDel,//待删除图片
					 mainPhoto:$('#filePicker6 .fileimg').attr('data-value') ,//主图
					 name: namepeo,	//名称
					 price: pricepeo,//	价格
					 remark:remarkpeople,//	备注
					 city:$('.citypeo').attr('cityid'),//城市类型
					 profession:professionpeo,//职业
					 phone:phone
					 
				}));
			}	
		}
	});	
}

//获取
function getPeopleByProfession(id,profession,professionName){
	loadData(function(res){	
		$('.peoplebox .peopletitle span').text('更新'+professionName+'信息');
		$('.peoplebox').attr('id',id);
		$('.namepeo').val(res.name);
		$('#professionpeo').val(res.profession);
		$('.remarkpeople').val(res.remark);
		$('.peoPhone').val(res.phone);
		
		//图片处理
		$('#filePicker6 .fileimg').attr('data-value',res.mainPhoto);
		$('#filePicker6 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
		
		$('.addimgs,.clickimg').hide();
		if($('.reupload').length<=0){
			$('#filePicker6 .updateimg').after("<div class='reupload'>重新上传</div>");
		}	
		
		$('.pricepeo').val(res.price);
		
		var city=res.city;
		
		reSetCity($('.citypeo'),city);
		
	 }, getContextPath() + '/production/personnel/get', $.toJSON({						
		 id:id,//	主键
	}));
	
}

function cleanpeopledata(){
	
	$('.namepeop').text('');
	$('.pricepeop').text('');
	$('.citypeop').text('');
	$('.peoPhone').val('');
	$('.errorp').text('');
	
	$('.namepeo').val('');
	$('.pricepeo').val('');
	$('.citypeo').text('请选择');
	$('.cityValue').attr('cityid','');
	
	$('.remarkpeople').val('');
	$('.citycheck').hide();
	
	$('#filePicker6').removeAttr("style");
	$('#filePicker6').addClass('webuploader-container');
	
	$('#filePicker6 .fileimg').attr('src','/resources/images/supplier/people.png');
	$('#filePicker6 .fileimg').attr('data-value','/resources/images/supplier/people.png');
	
}