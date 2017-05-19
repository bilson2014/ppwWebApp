var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;
$().ready(function() {
	pOrder.init();
	//initProduct();
});


/**
 * 主页业务处理部分
 */
var pOrder= {
	init:function(){
		this.initOption();
	},
	initOption:function(){
	    $('.mealCard li').off('click').on('click',function(){
	    	$('.mealCard li').removeClass('active');
	    	$(this).addClass('active');
	    });	    
	    $('.timeCard li').off('click').on('click',function(){
	    	$('.timeCard li').removeClass('active');
	    	$(this).addClass('active');
	    });	    
	    $('.moreCard li').off('click').on('click',function(){
	    	$('.moreCard li').removeClass('active');
	    	$(this).addClass('active');
	    });
	    $('.checkOrder').off('click').on('click',function(){
	    	var cId = $('#configId').val();
	    	var tId = $('#timeId').val();
	    	var subId = $('#subJoin').val();
	    	if(subId == undefined){
	    		subId = "";
	    	}
	    loadData(function(res){
	    	if(res.errorCode == 500){
	    		window.location.href='/mgr/login';
	    	}else{
		    	$('.orderContent').addClass('hide');
		    	$('.orderSuccess').removeClass('hide');
		    	InterValObj = window.setInterval(showSuccess, 1000);
	    	}
			}, getContextPath()+'/product/confirm/indent?configId='+cId +'&timeId='+tId +'&subJoin='+subId, null);
	    });
	},
}

function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(successIntervalObj);
		$('.showSuccess').remove();
		window.location.href='/';
	} else {
		$('#last3').text(initM--);
	}
}

function initProduct(){
	var productId = $('#productId').val();
	loadData(
			function(res) 
			         {
						for (var int = 0; int < res.length; int++) {
							$('#productImg').attr('src',getDfsHostName() + rr.product.picLDUrl);
							break;
						}
			}, getContextPath() + '/product/case?productId=' + productId, null);
}