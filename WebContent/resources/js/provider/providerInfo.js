
$().ready(function(){
	
	providerInfo.init();

	
});


var providerInfo = {
		
		init : function(){
			
			this.controlTag();
		},
		
		controlTag : function(){
			
			var tagList = $.parseJSON($('#provderTags').val());
			alert(tagList.length);
			
			for(i=0;i<tagList.length;i++){
				$("#provderTags").append('<div class="warn">'+tagList[i]+'</div>');
			}
			
          } 
};
	