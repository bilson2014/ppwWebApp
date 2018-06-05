$().ready(function() {
	
	init();
	imgcheckpeople();
	newbutton();
	
	
	gathermethod();
});
//图片尺寸的显示处理竖版
function imgcheckpeople(){
	for (var i=1;i<=10000;i++){
		var img=new Image();
		img.src=$('.imgs'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				console.log(img.width);
				console.log(img.height);
				$('.imgs'+i).attr('style','width:auto;height:100%');
			}else {
				console.log(img.width);
				console.log(img.height);
				$('.imgs'+i).attr('style','width:100%;height:auto;position: absolute;top: 60%;margin-top: -50%;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
//图片尺寸的显示处理竖版
function imgcheckpeoplefive(){
	for (var i=1;i<=6;i++){
		var img=new Image();
		img.src=$('.imgsfive'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				console.log(img.width);
				console.log(img.height);
				$('.imgsfive'+i).attr('style','width:auto;height:100%');
			}else {
				console.log(img.width);
				console.log(img.height);
				$('.imgsfive'+i).attr('style','width:100%;height:auto;position: absolute;top: 60%;margin-top: -50%;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
//图片尺寸的显示处理横版
function imgchecksite(){
	for (var i=1;i<=8;i++){
		var img=new Image();
		img.src=$('.imgs'+i).attr('src');
		if (img.complete){
			if (img.width/img.height<=1){
				$('.imgs'+i).attr('style','width:auto;height:100%');
			}else {
				$('.imgs'+i).attr('style','width:100%;height:auto;');
			}
			img=null;
		}else {
			img.onload=function(){
				img=null;
			}
		}
	}
}
function init(){
	$('.shade').hide();
	$('.idcard').off('mouseover').on('mouseover',function(){
		$(this).find('.shade').show();
	})
	$('.idcard').off('mouseout').on('mouseout',function(){
		$(this).find('.shade').hide();
	})
	//tab 切换
	$('.people').off('click').on('click',function(){
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').removeClass('idcard-site ');
		$('.setCard').find('.shade').removeClass('idcard-site ');
		$('.setCard').find('.linebox ').removeClass('linebox-site');
		$('.setCard').find('.idcard').removeClass('idcard-facility ');
		$('.setCard').find('.shade').removeClass('idcard-facility ');
		$('.setCard').find('.linebox ').removeClass('linebox-facility');
		imgcheckpeople();
		
	});
	$('.site').off('click').on('click',function(){
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').addClass('idcard-site ');
		$('.setCard').find('.shade').addClass('idcard-site ');
		$('.setCard').find('.linebox ').addClass('linebox-site');
		$('.setCard').find('.idcard').removeClass('idcard-facility ');
		$('.setCard').find('.shade').removeClass('idcard-facility ');
		$('.setCard').find('.linebox ').removeClass('linebox-facility');
		imgchecksite();
	});
	$('.facility').off('click').on('click',function(){
		$(this).addClass('top-text ');
		$(this).siblings('div').removeClass('top-text ');
		$('.setCard').find('.idcard').addClass('idcard-facility ');
		$('.setCard').find('.shade').addClass('idcard-facility ');
		$('.setCard').find('.linebox ').addClass('linebox-facility');
		$('.setCard').find('.idcard').removeClass('idcard-site ');
		$('.setCard').find('.shade').removeClass('idcard-site ');
		$('.setCard').find('.linebox ').removeClass('linebox-site');
		imgchecksite();
	});
	//图片删除共同dels并 空位
	$('.select').off('click').on('click',function(){
		if ($('.showimages').children().length==1){
			$(this).parent().parent().remove();
			$('.showimages').hide();
		}else {
			$(this).parent().parent().remove();
		}
	});
	
}
function newbutton(){
	$('.newbox').off('click').on('click',function(){
		$('.setting').show();
		$('.addpeople').hide();
		
		if ($('.top .people').hasClass('top-text')){
			$('.addpeople').show();
		
		}else if($('.top .site').hasClass('top-text')){
			console.log('2');
		}else if($('.top .facility').hasClass('top-text')){
			console.log('3');
		}
		
		
		 peoplechengck();
		 
	});
}
//角色选择
function peoplechengck(){
	$('.check').off('click').on('click',function(){
		$('.morecheck').show();
	});
	$('.more').off('click').on('click',function(){
		$('.morecheck').show();
	});

	$('.morecheck span').off('click').on('click',function(){
		$('.morecheck').hide();
		$('.check').text($(this).text());
	});
	//addpeople的确认 和取消
	$('.addpeople .sure').off('click').on('click',function(){
		console.log($('.check').text());
		if($('.check').text()!='请选择'){
			$('.addpeople').hide();
		}
		
	});
	$('.addpeople .cancel').off('click').on('click',function(){
		$('.setting').hide();
	});
	
}
//创建演员
function gathermethod(){
	imgcheckpeoplefive();
	//关闭弹框
	$('.stafftitle img').off('click').on('click',function(){
		$('.setting').hide();
		$('.staffbox').hide();	
	});
	//下拉框出现(性别、种族、城市)
	$('.gatherleft .gendergather,.gatherleft .genderimg').off('click').on('click',function(){
		$('.twocheck').show();	
	});
	$('.twocheck p').off('click').on('click',function(){
		$('.gendergather').text($(this).text());
		$('.twocheck').hide();
	});
	$('.gatherleft .racegather,.gatherleft .raceimg').off('click').on('click',function(){
		$('.racecheck').show();
	});
	$('.racecheck p').off('click').on('click',function(){
		$('.racegather').text($(this).text());
		$('.racecheck').hide();
	});
	$('.gatherleft .citygather,.gatherleft .cityimg').off('click').on('click',function(){
		$('.citycheck').show();
	});
	$('.citycheck p').off('click').on('click',function(){
		$('.citygather').text($(this).text());
		$('.citycheck').hide();
	});
	//图片的操作
	$('.imgsboxs').off('mouseover').on('mouseover',function(){
		$(this).find('.imgshade ').show();
		$
	})
	$('.imgsboxs').off('mouseout').on('mouseout',function(){
		$(this).find('.imgshade ').hide();
	})
	
	
}















