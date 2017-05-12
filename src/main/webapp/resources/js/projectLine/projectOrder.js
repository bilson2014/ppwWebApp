var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;
$().ready(function() {
	pOrder.init();
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
	    	$('.orderContent').addClass('hide');
	    	$('.orderSuccess').removeClass('hide');
	    	InterValObj = window.setInterval(showSuccess, 1000);
	    });
	    $('.renturnEdit').off('click').on('click',function(){
	    	window.history.back();
	    });
	},

}

function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(successIntervalObj);
		$('.showSuccess').remove();
		$('.checkOrder').attr('type','submit');
		$('.checkOrder').click();
	} else {
		$('#last3').text(initM--);
	}
}