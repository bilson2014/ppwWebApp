var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
//var Url = "http://www.apaipian.com:8087/";
//var Url = "http://localhost:8080/";
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
	//收藏和安全頁面高亮和切換
	$('#safe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/safeInfo");
		 $('#shortMenu .safe').addClass('open');
		 $('#shortMenu .save').removeClass('open');
		
	})
	$('#toSave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/favourites");
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').addClass('open');
		
	})
	$('#minsave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/favourites");
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').addClass('open');
	})

	$('#minsafe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/safeInfo");
		 $('#shortMenu .safe').addClass('open');
		 $('#shortMenu .save').removeClass('open');
	})
	
	//特换到小菜单
	$('#toMin').off('click').on('click',function(){
		$($('.frame').prop('contentWindow').document).find('.cardItem').removeClass('cardBig');
	    $($('.frame').prop('contentWindow').document).find('.cardItem').addClass('cardSmall');
		$('.flowMenu').addClass('changeMenu');
		$('.page').addClass('toMinLeft');
		if($('#toSave').hasClass('treeitemRed')){
			$('#minSave').addClass('open');
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