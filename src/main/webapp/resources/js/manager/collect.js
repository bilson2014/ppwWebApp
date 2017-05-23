$().ready(function(){
	showCollect.init();
});

var showCollect = {
     init:function(){
    	this.control();   
     },
     control:function(){
    		$('.delBtn').off('click').on('click',function(){
    			$(this).parent().parent().parent().find('.modCheck').show();
    		});
    		$('.delItem').off('click').on('click',function(){
    			
    			loadData(function(flag){
    				if(flag){
    					$(this).parent().parent().remove();
    				}
    			}, getContextPath() + '/mgr/favourites/remove/' + $(this).attr('id'), null);
    			
    		});
    		$('.cancle').off('click').on('click',function(){
    			$('.modCheck').hide();
    		});
     }
}
