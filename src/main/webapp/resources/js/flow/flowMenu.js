var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 

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
	var hasCus = $('#setRealName').text();
	if(hasCus == undefined || hasCus == null || hasCus == ""){
		window.location.href=getContextPath()+ '/';
	}
});

function initMenuEven(){
	//项目页面的样式改变 按钮样式  相应式
	$('#myPro').off('click').on('click',function(){
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#shortMenu .orderList ').removeClass('open');
		$('#shortMenu .myPro').addClass('open');
		$('#minboxs .boxs').removeClass('open');
		
		
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		
		
//		$('#myboxs').removeClass('open');
		$('#myOrder').addClass('open');
		$('#myboxs').addClass('open');
		var nThis = $(this);
		if($(this).hasClass('open')){
			nThis.removeClass('open');
			$('#productList').slideUp();			
			$('#shortMenu .myPro').addClass('open');
		} else {
			nThis.addClass('open');
			$('#orderList').slideUp();
			$('#boxsList').slideUp();
			$('#productList').slideDown();
		}
	});
	//订单页面的样式改变  按钮样式   响应式
	$('#myOrder').off('click').on('click',function(){
		
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#shortMenu .orderList ').addClass('open');
		$('#shortMenu .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');
		$('#myPro').addClass('open');
		$('#myboxs').addClass('open');
		var nThis = $(this);
		if($(this).hasClass('open')){
			nThis.removeClass('open');
			$('#orderList').slideUp();
			
		}else{
			nThis.addClass('open');
			$('#shortMenu .myPro').addClass('open');
			$('#productList').slideUp();
			$('#boxsList').slideUp();
			$('#orderList').slideDown();
			
		}
	});
	
	//工具箱页面的样式改变按钮样式 响应式
	$('#myboxs').off('click').on('click',function(){
		console.log('烟火');
		
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#shortMenu .orderList ').removeClass('open');
		$('#shortMenu .myPro').removeClass('open');
		$('#minboxs .boxs').addClass('open');
		$('#myPro').addClass('open');
		$('#myOrder').addClass('open');
		var nThis = $(this);

		if($(this).hasClass('open')){
			
			nThis.removeClass('open');
			$('#boxsList').slideUp();	
//			$('#orderList').slideUp();
		}else{
			nThis.addClass('open');
//			$('#shortMenu .myPro').addClass('open');
			$('#productList').slideUp();
			$('#orderList').slideUp();
			$('#boxsList').slideDown();
			
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
		$('#shortMenu .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');
		$('#safe .title').addClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').addClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#myOrder').addClass('open');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	})
	//收藏页面的样式改变  按钮样式   响应式
	
	$('#toSave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/favourites");
		
		$('#myOrder').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').addClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#shortMenu .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').addClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').addClass('treepic ');
		
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
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
		
		$('#boxsList').slideUp();
		$('#orderList').slideDown();
		$('#productList').slideUp();
		
		$('#minboxs .boxs').removeClass('open');
		$('#minorder .orderList').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		
		$('#orderIndex').addClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	})
	//左侧变小之后收藏页面的样式改变  按钮样式   响应式
	$('#minsave').off('click').on('click',function(){
		$('#toSave').addClass('treeitemRed');
		$('#safe').removeClass('treeitemRed');
		$('.frame').attr('src',"/mgr/favourites");
		$('#minboxs .boxs').removeClass('open');
		$('#minorder .orderList').removeClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').addClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').addClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').addClass('treepic ');
		
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	})
	//左侧变小之后安全页面的的样式改变  按钮样式   响应式
	$('#minsafe').off('click').on('click',function(){
		$('#safe').addClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		
		$('.frame').attr('src',"/mgr/safeInfo");
		
		$('#minboxs .boxs').removeClass('open');
		$('#minorder .orderList').removeClass('open');
		$('#shortMenu .safe').addClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#safe .title').addClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').addClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
	    $('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	})
	//左侧变小之后工具箱页面的样式改变  按钮样式   响应式!!!!!!!!!!!!!!!!!!!
	$('#minboxs').off('click').on('click',function(){
		$('.frame').attr('src',getUrlTask() + "quotation/info");
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		
		$('#minboxs .boxs').addClass('open');	
		$('#minMyPro .myPro').removeClass('open');
		$('#shortMenu .orderList').removeClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');		
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');	
		
		$('#boxsList').slideDown();
		$('#orderList').slideUp();
		$('#productList').slideUp();
		
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#boxsIndex').addClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
		
	})
	//特换到小菜单 以及对应的相应式的类
	$('#toMin').off('click').on('click',function(){
		$($('.frame').prop('contentWindow').document).find('.pages').addClass('toChange');
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
		$($('.frame').prop('contentWindow').document).find('.pages').removeClass('toChange');
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
		$('#minMyPro .myPro').addClass('open');
		$('#shortMenu .orderList').removeClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');		
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');			
		$('#orderList').slideUp();
		$('#productList').slideDown();
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').addClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
		
		$('.frame').attr('src',getUrlTask() + "project/running-doing");
		
//		$('.flowMenu').removeClass('changeMenu');
//		$('.page').removeClass('toMinLeft');
//		if(!$('.productList li').hasClass('checkLi')){
//			$('#myPro').addClass('open');
//			$('#nowDoing').addClass('checkLi');
//		}
//		$('#productList').slideDown();
	});
	//小的 订单  处理中  样式改变 以及响应式
	$('#orderIndex').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?1");	
		$('#orderIndex').addClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');	
		
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	});
	//小的 订单  已提交  样式改变 以及响应式
	$('#orderSub').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?2");
		$('#orderSub').addClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	});
	//小的 订单  无效订单  样式改变 以及响应式
	$('#orderCancle').off('click').on('click',function(){
		$('.frame').attr('src',"/order/myOrder?3");
		$('#orderCancle').addClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');	
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').addClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').removeClass('open');
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
	});
	
//    <li id='boxsIndex' data-value="0">报价单生成器</li>
//    <li id='boxsSub' data-value="1">烟火</li>
//    <li id='boxsCancle' data-value="2">星光喽</li>

	//工具箱样式修改

	$('#boxsIndex').off('click').on('click',function(){
		$('.frame').attr('src', getUrlTask() + "quotation/info");
		$('#boxsIndex').addClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').addClass('open');	
		$(this).addClass('treeitemRed');		
		
	});
	$('#boxsSub').off('click').on('click',function(){
		$('.frame').attr('src',"/order/box?2");	
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').addClass('checkLi');
		$('#boxsCancle').removeClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		
		
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').addClass('open');
		
	});
	
	$('#boxsCancle').off('click').on('click',function(){
		$('.frame').attr('src',"/order/box?3");	
		$('#boxsIndex').removeClass('checkLi');
		$('#boxsSub').removeClass('checkLi');
		$('#boxsCancle').addClass('checkLi');
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		
		
		$('#safe').removeClass('treeitemRed');
		$('#toSave').removeClass('treeitemRed');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#minMyPro .myPro').removeClass('open');
		$('#minboxs .boxs').addClass('open');
		
	});
}