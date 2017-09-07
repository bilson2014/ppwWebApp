$().ready(function(){
	document.domain = getUrl();
	showCollect.init();
	$(window.parent.document).find('.frame').css('height',$('.page').height() + 300);
	console.info($('.page').height() + 300);
	$('.managerCard').css('height',$('.page').height()+300);
});
var showCollect = {
     init:function(){
    	this.control();   	
     },
     control:function(){
    		$('.delBtn').off('click').on('click',function(){
    			$('.modCheck').hide();
    			$(this).parent().parent().parent().find('.modCheck').show();
    		});
    		$('.delItem').off('click').on('click',function(){
    			var thisItem = $(this);
    			loadData(function(flag){
    				if(flag.result){
    					thisItem.parent().parent().remove();
    				}
    			}, getContextPath() + '/mgr/favourites/remove/' + $(this).attr('id'), null);
    			
    		});
    		$('.cancle').off('click').on('click',function(){
    			$('.modCheck').hide();
    		});
     }
}
