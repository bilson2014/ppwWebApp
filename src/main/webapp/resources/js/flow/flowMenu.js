var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
//var Url = "http://www.apaipian.com:8087/";
var Url = "http://localhost:7070/";
//var Url = "http://test.apaipian.com:7070/";

$().ready(function() {
	document.domain = getUrl();
	initMenuEven();
	var p = $('#getImgUrlMenu').attr('data-value');
	if(p!=null && p!=''){
		if(p.indexOf("/resources/") == -1){
			$('#getImgUrlMenu').attr('src',getDfsHostName() + p);
		}
	}else{
		$('#getImgUrlMenu').attr('src','/resources/images/flow/def.png');
	}
	$('#setRealName').text($('#setRealName').attr('data-value'));
});

function initMenuEven(){
	//项目页面的样式改变 按钮样式  相应式
	$('#myPro').off('click').on('click',function(){
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
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
		} else {
			nThis.addClass('open');
			$('#myOrder').removeClass('open');
			$('#orderList').slideUp();
			$('#productList').slideDown();
		}
	});
	//订单页面的样式改变  按钮样式   响应式
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
	//安全頁面样式改变  按钮样式   响应式
	$('#safe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/safeInfo");
		$('#shortMenu .safe').addClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#shortMenu .orderList ').removeClass('open');
		$('#safe .title').addClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').addClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');	
	})
	//收藏页面的样式改变  按钮样式   响应式
	$('#toSave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/favourites");
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').addClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').addClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').addClass('treepic ');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
	})
	//左侧变小之后订单页面的样式改变  按钮样式   响应式
	$('#minorder').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?1");	
		$($('.frame').prop('contentWindow').document).find('.tableList').addClass('tableLists');
		$($('.frame').prop('contentWindow').document).find('.tableList').removeClass('tableList');
		$($('.frame').prop('contentWindow').document).find('#toClean').addClass('btnclen');
		$($('.frame').prop('contentWindow').document).find('#toSearch').addClass('btnsearch');
		$($('.frame').prop('contentWindow').document).find('.searchInfo').addClass('searchIn');
		$($('.frame').prop('contentWindow').document).find('#daySearch').addClass('daySearch');
		$($('.frame').prop('contentWindow').document).find('table').addClass('mTop');
		$('#minorder .orderList').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#orderIndex').addClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
	})
	//左侧变小之后收藏页面的样式改变  按钮样式   响应式
	$('#minsave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/favourites");
		$('#minorder .orderList').removeClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').addClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').addClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').addClass('treepic ');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
	})
	//左侧变小之后安全页面的的样式改变  按钮样式   响应式
	$('#minsafe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/safeInfo");
		$('#minorder .orderList').removeClass('open');
		$('#shortMenu .safe').addClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#safe .title').addClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').addClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
	})
	//特换到小菜单 以及对应的相应式的类
	$('#toMin').off('click').on('click',function(){
		$($('.frame').prop('contentWindow').document).find('.cardItem').removeClass('cardBig');
	    $($('.frame').prop('contentWindow').document).find('.cardItem').addClass('cardSmall');
		$('.flowMenu').addClass('changeMenu');
		$('.page').addClass('toMinLeft');
		if($('#toSave').hasClass('treeitemRed')){
			$('#minSave').addClass('open');
		}
		$($('.frame').prop('contentWindow').document).find('.tableList').addClass('tableLists');
		$($('.frame').prop('contentWindow').document).find('.tableList').removeClass('tableList');
		$($('.frame').prop('contentWindow').document).find('#toClean').addClass('btnclen');
		$($('.frame').prop('contentWindow').document).find('#toSearch').addClass('btnsearch');
		$($('.frame').prop('contentWindow').document).find('.searchInfo').addClass('searchIn');
		$($('.frame').prop('contentWindow').document).find('#daySearch').addClass('daySearch');
		$($('.frame').prop('contentWindow').document).find('table').addClass('mTop');
	});
	//切换回大菜单 以及对应的相应式的类
	$('#menuHead').off('click').on('click',function(){
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
		$($('.frame').prop('contentWindow').document).find('.cardItem').addClass('cardBig');
		$($('.frame').prop('contentWindow').document).find('.cardItem').removeClass('cardSmall');
		$($('.frame').prop('contentWindow').document).find('.tableLists').addClass('tableList');
		$($('.frame').prop('contentWindow').document).find('.tableLists').removeClass('tableLists');
		$($('.frame').prop('contentWindow').document).find('#toClean').removeClass('btnclen');
		$($('.frame').prop('contentWindow').document).find('#toSearch').removeClass('btnsearch');
		$($('.frame').prop('contentWindow').document).find('.searchInfo').removeClass('searchIn');
		$($('.frame').prop('contentWindow').document).find('#daySearch').removeClass('daySearch');
		$($('.frame').prop('contentWindow').document).find('table').removeClass('mTop');
	});
	//小的 项目样式改变 以及响应式
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
	//小的 收藏页面 样式改变 以及响应式
	$('#minSave').off('click').on('click',function(){
	    $('.menuItem div').removeClass('open');
        $(this).addClass('open');
        $('.frame').attr('src',"/mgr/favourites");
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
    });
	//小的 订单  处理中  样式改变 以及响应式
	$('#orderIndex').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?1");	
		$('#orderIndex').addClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');
	});
	//小的 订单  已提交  样式改变 以及响应式
	$('#orderSub').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?2");
		$('#orderSub').addClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');
	});
	//小的 订单  无效订单  样式改变 以及响应式
	$('#orderCancle').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?3");
		$('#orderCancle').addClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');		
	});
}