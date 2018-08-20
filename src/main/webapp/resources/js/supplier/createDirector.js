$().ready(function() {

	dirmethod();
});

//创建演员
function dirmethod(){
	//关闭弹框
	$('.directortitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.directorbox').hide();
		$('.role').hide();
		$('.staffbox').removeClass('pickborder');
		$('.directorbox').removeClass('pickborder');
		cleadirectordata();
		
	});
	//下拉框出现(性别、种族、城市)$('body').on('click','.citycheck p',function(){
	$('.directorl .skilldir,.directorl .skillimg').off('click').on('click',function(){
		$('.skillcheck').show();	
		$('.citycheck').hide();
	});
	
	$('.directorl .citydir,.directorl .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
		$('.skillcheck').hide();
	});

	$('.directorl .namedir,.directorl .pricedir,.directorbox .remarkdirector').off('click').on('click',function(){
		$('.skillcheck').hide();
		$('.citycheck').hide();
	});
	//图片的操作
	$('.imgsboxs').off('mouseover').on('mouseover',function(){
		$(this).find('.imgshade ').show();
	});
	$('.imgsboxs').off('mouseout').on('mouseout',function(){
		$(this).find('.imgshade ').hide();
	});
	//提交
	$('.directorbox .gatherbut .sure').off('click').on('click',function(){
		var namedir=$('.namedir').val();
		var skilldir=$('.skilldir').text();
		var citydir=$('.citydir').text();
		var pricedir=$('.pricedir').val();
		var remarkdirector=$('.remarkdirector').val();
		var fileimg=$('#filePicker3 .updateimg .fileimg').attr('src');
		var phone = $('.dirPhone').val();
		$('.namedirp').text('');
		$('.skilldirp').text('');
		$('.citydirp').text('');
		$('.pricedirp').text('');
		$('.phonedirp').text('');
		
		if(phone!=''&&phone!=null&&phone!=undefined){
			if(!checkMobile(phone)){
				$('.phonedirp').text('手机号错误');
				return false;
			}
		}
		
		if (namedir==undefined||namedir==null||namedir==''){
			$('.namedirp').text('*请填写导演姓名');
			return false;
		}else if( skilldir=='请选择'){
			$('.skilldirp').text('*请选择擅长领域');
			return false;
		}else if(citydir=='请选择'){
			$('.citydirp').text('*请选择城市');
			return false;
		}else if (pricedir==undefined||pricedir==null||pricedir==''){
			$('.pricedirp').text('*请填写价格');
			return false;
		}else if (fileimg=='/resources/images/supplier/people.png'){
			$('.directorr .addboxs span').attr("style","color: red;");
			return false;
		}else if (fileimg=='/resources/images/supplier/people.png'){
			$('.directorr .addboxs span').attr("style","color: red;");
			return false;
		}else {
			var biao=$('.directorbox .directortitle span').text();
//			console.log(biao);
			if(biao=='更新导演信息'){
				var biaoID=$('.directorbox').attr('id');
				loadData(function(result){	
					cleadirectordata()
					$('.setting').hide();
					$('.directorbox').hide();
					$('.role').hide();
					$('.staffbox').removeClass('pickborder');
					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/director/update', $.toJSON({						
					 id:biaoID,//获取的id
					 name:namedir,//姓名
					 city:$('.citydir').attr('cityid'),//城市(编码)
					 photo:$('#filePicker3 .fileimg').attr('data-value'),//照片
					 specialty:$('.skilldir').attr('value'),//擅长领域
					 price: pricedir,//价格
					 remark:remarkdirector,//备注
					 phone:phone
				}));
			}else{
				loadData(function(result){	
//					console.log(result);
					cleadirectordata()
					$('.setting').hide();
					$('.directorbox').hide();

					$('.role').hide();
					$('.staffbox').removeClass('pickborder');
					$('.directorbox').removeClass('pickborder');
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/director/save', $.toJSON({
					 name:namedir,//姓名
					 city:$('.citydir').attr('cityid'),//城市(编码)
					 photo:$('#filePicker3 .fileimg').attr('data-value'),//照片
					 specialty:$('.skilldir').attr('value'),//擅长领域
					 price: pricedir,//价格
					 remark:remarkdirector,//备注
					 phone:phone
				}));
			}
		}
	});	
}
//清除数据
function cleadirectordata(){
	$('.staffbox').removeClass('pickborder');
	$('.namedirp').text('');
	$('.skilldirp').text('');
	$('.citydirp').text('');
	$('.pricedirp').text('');
	$('.dirPhone').val('');
	
	$('.namedir').val('');
	$('.skilldir').text('请选择');
	$('.skilldir').attr('value','');
	$('.skillcheck p').removeClass('pickme');
	$('.citydir').text('请选择');
	$('.pricedir').val('');
	$('.remarkdirector').val('');
	
	$('.skillcheck').hide();
	$('.citycheck').hide();
//	$('#filePicker3').append("<img class='addimgs' alt='点击添加图片' src='/resources/images/supplier/adds.png'/><p class='clickimg'>点击添加封面</p>");
	$('.addboxs span').removeAttr("style");
//	$('#filePicker3 .fileimg').removeAttr('data-value');
//	$('#filePicker3 .fileimg').removeAttr('src');
	$('#filePicker3 .fileimg').attr('src','/resources/images/supplier/people.png');
	$('#filePicker3 .fileimg').attr('data-value','/resources/images/supplier/people.png');
	
	$('#filePicker3 .reupload').remove();
//	$('#filePicker3 .addimgs,#filePicker3 .clickimg').show();
	
	
}
//文件批量上传
