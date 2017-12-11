var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
$().ready(function() {	
	document.domain = getUrl();	
	var carNum = $('.cardNum');
	if(carNum.length == null || carNum.length=="" ){
		$('#cardNum').hide();
	}else{
		$('#cardNum').text(carNum.length);
	}
	initMenuEven();
	$('#productList').show();
	$('#myPro').addClass('open');
	$('#shortMenu .myPro').addClass('open');
	$('#nowDoing').addClass('checkLi');
	$('#setRealName').text($('#realName').val());
	var url = $('#photo').val();
	if(url != null && url !=""  && url !=undefined)
	$('#newMenuLogo').attr('src',getDfsHostName()+url );
	
	doing();
	doPasue();
	doFinish();
	toSave();
	toQuotition();
	$('#toCreate').parent().attr('href',getUrlTask() + "project/start/project")
	checkState();
//	numberfont();
});
//function numberfont(){
//	var num=$('.otherWork .setCard .otherCard .cardContent .setContent .listName').val();
//	console.log(num);
//}
function checkState(){
	 var href = window.location.href;
	 var state = href.substr(href.lastIndexOf("?")+1,href.length);
	       $('.frame').attr('src',getUrlTask() + "project/running-doing");
		    if(state.trim() == "save"){
		    	checkClear(0);
		    }
		    if(state.trim() == "safe"){
		    	checkClear(1);
		    }
		    if(state.trim() == "order"){
		    	checkClear(2);
		    }
}
//右侧地址方法的判断
function checkClear(who){
	$('.treeitem').removeClass('treeitemRed');
	$('#productList').hide();
	$('#myPro').removeClass('open');
	$('#shortMenu .myPro').addClass('open');
	$('#nowDoing').removeClass('checkLi');
	if(who == 0){
		$('#toSave').addClass('treeitemRed');
		$('.frame').attr('src',"/mgr/favourites"); 
	}else if (who==1){
		$('.frame').attr('src',"/mgr/safeInfo");
		$('#safe').addClass('treeitemRed');
	}else{
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
		$('#shortMenu .myPro').removeClass('open');
		//点击右侧 出现
		$('#myOrder').addClass('open');
		$('#myPro').removeClass('open');
		$('#productList').slideUp();
		$('#orderList').slideDown();		
	}
}
function initMenuEven(){
	$('#myPro').off('click').on('click',function(){
		var nThis = $(this);
		 if($(this).hasClass('open')){
			 nThis.removeClass('open');
			 $('#productList').slideUp();
		 }
		 else
		 {
			 nThis.addClass('open');
			 $('#productList').slideDown();
		 }
	});
	$('#minSave').off('click').on('click',function(){
		$('.menuItem div').removeClass('open');
		$(this).addClass('open');
        $('.frame').attr('src',"/mgr/favourites");
	});
	//特换到小菜单
	$('#toMin').off('click').on('click',function(){
		$('.flowMenu').addClass('changeMenu');
		$('.page').addClass('toMinLeft');
		if($('#myPro').hasClass('open')){
			$('#minMyPro').addClass('open');
		}else{
			$('#minMyPro').removeClass('open');
		}
		$('.cardItem').addClass('rightsize');
	});
	//切换回大菜单
	$('#menuHead').off('click').on('click',function(){
		$('.flowMenu').removeClass('changeMenu');
		$('.page').removeClass('toMinLeft');
	});
	
}

function doing(){
	$('#nowDoing').off('click').on('click',function(){	
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').addClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#shortMenu .myPro').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
        $(this).addClass('checkLi');
        $('#hideDiv').show();
        $('.frame').attr('src',getUrlTask() + "project/running-doing");
       
	});
}

function doPasue(){
	$('#pause').off('click').on('click',function(){
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').addClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('#shortMenu .myPro').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');	
		$('#shortMenu .orderList ').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
        $(this).addClass('checkLi');
        $('#hideDiv').hide();
        $('.frame').attr('src',getUrlTask() + "project/suspend-task");
	});
}

function doFinish(){
	$('#finish').off('click').on('click',function(){
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').addClass('checkLi');
		$('#shortMenu .myPro').addClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').removeClass('open');
		$('#shortMenu .orderList ').removeClass('open');
		$('#safe .title').removeClass('treebtu');
		$('#toSave .title').removeClass('treebtu');
		$('#safe .safe').removeClass('treepic ');
		$('#toSave .save').removeClass('treepic ');
		$('#toSave').removeClass('treeitemRed');
		$('#safe').removeClass('treeitemRed ');
        $(this).addClass('checkLi');
        $('#hideDiv').show();
        $('.frame').attr('src', getUrlTask() + "project/finished/list");
	});
}

function toSave(){
	$('#toSave').off('click').on('click',function(){
		$('#orderIndex').removeClass('checkLi');
		$('#orderSub').removeClass('checkLi');
		$('#orderCancle').removeClass('checkLi');
		$('#nowDoing').removeClass('checkLi');
		$('#pause').removeClass('checkLi');
		$('#finish').removeClass('checkLi');
		$('.treeitem').removeClass('treeitemRed');
		$('#shortMenu .myPro').removeClass('open');
		$('#shortMenu .safe').removeClass('open');
		$('#shortMenu .save').addClass('open');
		$('#shortMenu .orderList ').removeClasss('open');
		$(this).addClass('treeitemRed');
        $('.frame').attr('src',"/mgr/favourites");
	});	
}

function toQuotition(){
	$('#toSave').off('click').on('click',function(){
		$(this).addClass('treeitemRed');		
		$('.frame').attr('src', getUrlTask() + "quotation/info");
	});	
}




