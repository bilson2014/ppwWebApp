$().ready(function() {
	pSet.init();
});

/**
 * 主页业务处理部分
 */
var pSet= {
	init:function(){
		this.initOption();
	},
	initOption:function(){
	    $('.cardContent').off('click').on('click',function(){
	    	$('.cardContent').removeClass('active');
	    	$(this).addClass('active');
	    });
	    
	    $('.timeCard').off('click').on('click',function(){
	    	$('.timeCard').removeClass('active');
	    	$(this).addClass('active');
	    });
	    
	    $('.setItem').off('click').on('click',function(){
	    	$('.setItem').removeClass('active');
	    	$(this).addClass('active');
	    });
	    
	},
	
}