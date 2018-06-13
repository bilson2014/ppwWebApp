$().ready(function() {

	dirmethod();
//	userpicInfo();
});

//创建演员
function dirmethod(){
	//关闭弹框
	$('.directortitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.directorbox').hide();
		cleadirectordata();
		
	});
	//下拉框出现(性别、种族、城市)$('body').on('click','.citycheck p',function(){
	$('.directorl .skilldir,.directorl .skillimg').off('click').on('click',function(){
		$('.skillcheck').show();	
		$('.citycheck').hide();
	});
	$('body').on('click','.skillcheck p',function(){
		$('.skilldir').attr('value',$(this).attr('value'));
		$('.skilldir').text($(this).text());
		$('.skillcheck').hide();
	});
	
	$('.directorl .citydir,.directorl .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
		$('.skillcheck').hide();
	});
	$('body').on('click','.citycheck p',function(){
		$('.citydir').text($(this).text());
		$('.citydir').attr('cityid',$(this).attr('cityid'));
		$('.citycheck').hide();
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
		$('.namedirp').text('');
		$('.skilldirp').text('');
		$('.citydirp').text('');
		$('.pricedirp').text('');
		if (namedir==undefined||namedir==null||namedir==''){
			$('.namedirp').text('*姓名不能为空');
			return false;
		}else if( skilldir=='请选择擅长领域'){
			$('.skilldirp').text('*请选择擅长领域');
			return false;
		}else if(citydir=='请选择城市'){
			$('.citydirp').text('*请选择城市');
			return false;
		}else if (pricedir==undefined||pricedir==null||pricedir==''){
			$('.pricedirp').text('*价格不能为空');
			return false;
		}else {
			var biao=$('.directorbox .directortitle span').text();
			console.log(biao);
			if(biao=='修改导演'){
				var biaoID=$('.directorbox').attr('id');
				loadData(function(result){	
					cleadirectordata()
					$('.setting').hide();
					$('.directorbox').hide();
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/director/update', $.toJSON({						
					 id:biaoID,//获取的id
					 name:namedir,//姓名
					 city:$('.citydir').attr('cityid'),//城市(编码)
//					 delImg:,//待删除图片
//					 photo:,//照片
					 specialty:$('.skilldir').attr('value'),//擅长领域
					 price: pricedir,//价格
					 remark:remarkdirector,//备注
				}));
			}else{
				loadData(function(result){	
					console.log(result);
					cleadirectordata()
					$('.setting').hide();
					$('.directorbox').hide();
					getlistdatap();//获取人数据
				 }, getContextPath() + '/production/director/save', $.toJSON({
					 name:namedir,//姓名
					 city:$('.citydir').attr('cityid'),//城市(编码)
//					 delImg:,//待删除图片
					 photo:'https://filed.apaipian.com/group1/M00/00/F6/CgpmTlqxyFWAS5iFAAIhkPiowTU667.jpg',//照片
					 specialty:$('.skilldir').attr('value'),//擅长领域
					 price: pricedir,//价格
					 remark:remarkdirector,//备注
				}));
			}
		}
	});	
}
//清楚数据
function cleadirectordata(){
	$('.namedirp').text('');
	$('.skilldirp').text('');
	$('.citydirp').text('');
	$('.pricedirp').text('');
	
	
	$('.namedir').val('');
	$('.skilldir').text('请选择擅长领域');
	$('.citydir').text('请选择城市');
	$('.pricedir').val('');
	$('.remarkdirector').val('');
	
	$('.skillcheck').hide();
	$('.citycheck').hide();
}

