var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
//var Url = "http://www.apaipian.com:8087/";
//var Url = "http://localhost:8080/";
$().ready(function() {
	initMenuEven();
	var p = $('#getImgUrlMenu').attr('data-value');
	if(p!=null && p!=''){
		if(p.indexOf("/resources/") == -1){
			$('#getImgUrlMenu').attr('src',getDfsHostName() + p);
		}
	}
});

function initMenuEven(){
	
	$('#myPro').off('click').on('click',function(){
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
//		 $('.frame').attr('src',"/mgr/safeInfo");
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').removeClass('open');
		 $('#safe .title').removeClass('treebtu');
		 $('#toSave .title').removeClass('treebtu');
		 $('#safe .safe').removeClass('treepic ');
		 $('#toSave .save').removeClass('treepic ');
		 
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
		 $('#safe .title').addClass('treebtu');
		 $('#toSave .title').removeClass('treebtu');
		 $('#safe .safe').addClass('treepic ');
		 $('#toSave .save').removeClass('treepic ');
		
	})
	$('#toSave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/favourites");
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').addClass('open');		 
		 $('#safe .title').removeClass('treebtu');
		 $('#toSave .title').addClass('treebtu');
		 $('#safe .safe').removeClass('treepic ');
		 $('#toSave .save').addClass('treepic ');
		
	})
	$('#minsave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/favourites");
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').addClass('open');
		 $('#safe .title').removeClass('treebtu');
		 $('#toSave .title').addClass('treebtu');
		 $('#safe .safe').removeClass('treepic ');
		 $('#toSave .save').addClass('treepic ');
	})

	$('#minsafe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		 $('.frame').attr('src',"/mgr/safeInfo");
		 $('#shortMenu .safe').addClass('open');
		 $('#shortMenu .save').removeClass('open');
		 $('#safe .title').addClass('treebtu');
		 $('#toSave .title').removeClass('treebtu');
		 $('#safe .safe').addClass('treepic ');
		 $('#toSave .save').removeClass('treepic ');
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
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		 $('#shortMenu .safe').removeClass('open');
		 $('#shortMenu .save').removeClass('open');
		 $('#safe .title').removeClass('treebtu');
		 $('#toSave .title').removeClass('treebtu');
		 $('#safe .safe').removeClass('treepic ');
		 $('#toSave .save').removeClass('treepic ');
		 
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
		if(!$('.productList li').hasClass('checkLi')){
			$('#myPro').addClass('open');
			$('#nowDoing').addClass('checkLi');
		}
		$('#productList').slideDown();
	});
	
	$('#minSave').off('click').on('click',function(){
	    $('.menuItem div').removeClass('open');
        $(this).addClass('open');
        $('.frame').attr('src',"/mgr/favourites");
    });
	
	
	
}