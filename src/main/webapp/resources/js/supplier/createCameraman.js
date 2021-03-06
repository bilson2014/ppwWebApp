$().ready(function() {

	cammethod();
});

//创建摄影师
function cammethod(){
	//关闭弹框
	$('.cameramantitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.cameramanbox').hide();
		$('.role').hide();
//		$('.staffbox').removeClass('pickborder');
//		$('.directorbox').removeClass('pickborder');
		cleancameramandata();
		
	});

	//提交
	$('.cameramanbox .gatherbut .sure').off('click').on('click',function(){
		var nameca=$('.nameca').val();
		var specialSkill=$('.specialSkill').val();
		var cityca=$('.cityca').text();
		var priceca=$('.priceca').val();
		var remarkca=$('.remarkca').val();
		var fileimg=$('#filePicker7 .updateimg .fileimg').attr('src');
		var phone = $('.capPhone').val();
		$('.namecap').text('');
		$('.specialSkillp').text('');
		$('.citycap').text('');
		$('.pricecap').text('');
		$('.phonecape').text('');
				
		if(phone!=''&&phone!=null&&phone!=undefined){
			if(!checkMobile(phone)){
				$('.phonecape').text('手机号错误');
				return false;
			}
		}
		
		if (nameca==undefined||nameca==null||nameca==''){
			$('.namecap').text('*请填写摄影师姓名');
			return false;
//		}else if( specialSkill=='请选择'){
//			$('.specialSkillp').text('*请选择特殊技能');
//			return false;
		}else if(cityca=='请选择'){
			$('.citycap').text('*请选择城市');
			return false;
		}else if (priceca==undefined||priceca==null||priceca==''){
			$('.pricecap').text('*请填写价格');
			return false;
		}else if (fileimg=='/resources/images/supplier/people.png'){
			$('.cameraman .addboxs span').attr("style","color: red;");
			return false;
		}else {
			var biao=$('.cameramanbox .cameramantitle span').text();
//			console.log(biao);
			if(biao=='更新摄影师信息'){
				var biaoID=$('.cameramanbox').attr('id');
				loadData(function(result){	
					cleancameramandata()
					$('.setting').hide();
					$('.cameramanbox').hide();
					$('.role').hide();
//					$('.staffbox').removeClass('pickborder');
//					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/cameraman/update', $.toJSON({						
					 id:biaoID,//获取的id
					 name:nameca,//姓名
					 city:$('.cityca').attr('cityid'),//城市(编码)
					 mainPhoto:$('#filePicker7 .fileimg').attr('data-value'),//照片
					 specialSkill:$('.specialSkill').attr('key'),//特殊技能
					 price: priceca,//价格
					 remark:remarkca,//备注
					 phone:phone
				}));
			}else{
				loadData(function(result){	
//					cleancameramandata()
					$('.setting').hide();
					$('.cameramanbox').hide();
					$('.role').hide();
//					$('.staffbox').removeClass('pickborder');
//					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/cameraman/save', $.toJSON({
					 name:nameca,//姓名
					 city:$('.cityca').attr('cityid'),//城市(编码)
					 mainPhoto:$('#filePicker7 .fileimg').attr('data-value'),//照片
					 specialSkill:$('.specialSkill').attr('key'),//特殊技能
					 price: priceca,//价格
					 remark:remarkca,//备注
					 phone:phone
				}));
			}
		}
	});	
}

//获取
function getCameraman(id){
	loadData(function(res){	
		$('.cameramanbox .cameramantitle span').text('更新摄影师信息');
		$('.cameramanbox').attr('id',id);
		$('.nameca').val(res.name);
		$('.remarkca').val(res.remark);
		$('.capPhone').val(res.phone);
		
		//图片处理
		$('#filePicker7 .fileimg').attr('data-value',res.mainPhoto);
		$('#filePicker7 .fileimg').attr('src',getResourcesName()+res.mainPhoto);
		
		$('.addimgs,.clickimg').hide();
		if($('.reupload').length<=0){
			$('#filePicker7 .updateimg').after("<div class='reupload'>重新上传</div>");
		}	
		
		$('.priceca').val(res.price);
		
		if(res.specialSkill=='1'){
			$('.specialSkill').val('水下拍摄');
		}else if(res.specialSkill=='2'){
			$('.specialSkill').val('航拍');
		}else{
			$('.specialSkill').val('请选择');
		}
		
		$('.specialSkill').attr('key',res.specialSkill);
		
		var city=res.city;
		$('.cityca').attr('cityid',city);
		for(var i=0;i<cities.length;i++){
			if (city==cities[i].cityID){
				$('.cityca').text(cities[i].city);
				break;
			}
		}
	 }, getContextPath() + '/production/cameraman/get', $.toJSON({						
		 id:id,//	主键
	}));
}

//清除数据
function cleancameramandata(){
	$('.cameramanbox').removeClass('pickborder');
	
	$('.namecap').text('');
	$('.specialSkillp').text('');
	$('.citycap').text('');
	$('.citycap').attr('cityid','');
	$('.pricecap').text('');
	$('.capPhone').val('');
	$('.errorp').text('');
	
	$('.nameca').val('');
	$('.specialSkill').val('');
	$('.specialSkill').attr('key','');
	
	$('.specialSkillcheck p').removeClass('pickme');
	$('.cityca').text('请选择');
	$('.priceca').val('');
	$('.remarkca').val('');
	
	$('.specialSkillcheck').hide();
	$('.citycheck').hide();
	
	$('.addboxs span').removeAttr("style");
	
	$('#filePicker7 .fileimg').attr('src','/resources/images/supplier/people.png');
	$('#filePicker7 .fileimg').attr('data-value','/resources/images/supplier/people.png');
	
	$('#filePicker7 .reupload').remove();
	
}
