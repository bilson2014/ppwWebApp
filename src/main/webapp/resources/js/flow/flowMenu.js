var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
$().ready(function() {
	initMenuEven();
});

function initMenuEven(){
	
	$('#myPro').off('click').on('click',function(){
		var nThis = $(this);
		 if($(this).hasClass('open')){
			 nThis.removeClass('open');
			 $('#productList').slideUp();
		 }else{
			 nThis.addClass('open');
			 $('#myOrder').removeClass('open');
			 $('#orderList').slideUp();
			 $('#productList').slideDown();
		 }
	});
	
	$('#myOrder').off('click').on('click',function(){
		var nThis = $(this);
		 if($(this).hasClass('open')){
			 nThis.removeClass('open');
			 $('#orderList').slideUp();
		 }else{
			 nThis.addClass('open');
			 $('#myPro').removeClass('open');
			 $('#productList').slideUp();
			 $('#orderList').slideDown();
		 }
	});
	$('#safe').off('click').on('click',function(){
		$('#safe .safe').attr('style','background-position:0 14px');
		$('#safe .title').addClass('checkLi');
	})

/*	$('.productList li').off('click').on('click',function(){
               $('.productList li').removeClass('checkLi');
               $(this).addClass('checkLi');
	});*/
	
	//特换到小菜单
	$('#toMin').off('click').on('click',function(){
//	$($('.frame').prop('contentWindow').document).find('.cardItem').css('width','292px');
		$($('.frame').prop('contentWindow').document).find('.cardItem').removeClass('cardBig');
	$($('.frame').prop('contentWindow').document).find('.cardItem').addClass('cardSmall');
	
		$('.flowMenu').addClass('changeMenu');
		$('.page').addClass('toMinLeft');
		if($('#myPro').hasClass('open')){
			$('#minMyPro').addClass('open');
		}else{
			$('#minMyPro').removeClass('open');
		}
		
		

		
		
	});
	
	//切换回大菜单
	$('#menuHead').off('click').on('click',function(){
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
		$($('.frame').prop('contentWindow').document).find('.cardItem').addClass('cardBig');
		$($('.frame').prop('contentWindow').document).find('.cardItem').removeClass('cardSmall');

	
		
	
	});

	$('#minMyPro').off('click').on('click',function(){
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
		if(!$('.productList li').hasClass('checkLi')){
			$('#myPro').addClass('open');
			$('#nowDoing').addClass('checkLi');
		}
		$('#productList').slideDown();
		
		
	});
}