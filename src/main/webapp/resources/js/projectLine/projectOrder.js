var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var initM = 3;
$().ready(function() {
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
	    	successIntervalObj = window.setInterval(pOrder.showSuccess, 1000);
	    	$('.orderContent').addClass('hide');
	    	$('.orderSuccess').removeClass('hide');
	    });
	},
	showSuccess:function(){
		
			if (initM < 0) {
				$('#last3').text('0');
				//window.location.href = getContextPath() + '/';
				clearInterval(successIntervalObj);
				$('.showSuccess').remove();
			} else {
				$('#last3').text(initM--);
			}
		
	}
}