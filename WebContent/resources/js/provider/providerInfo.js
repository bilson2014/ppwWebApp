
$().ready(function(){
	
	providerInfo.init();

	
});


var providerInfo = {
		
		init : function(){
			
			providerInfo.controlTag();
		},
		
		controlTag : function(){
			
			var tagList = $.parseJSON($('#provderTags').text());
			var tagLength =tagList.length;
			var provderTagWidth =0; 
			for(i=0;i<tagList.length;i++){
				$("#provderTagId").append(
						'<div class="warn">'+tagList[i]+'</div>'
						);
			}
			
		
			if(count==1){
				provderTagWidth = 150;
			}
			else if(count>1){
				provderTagWidth=(125*tagList.length)+17*(tagList-1);
			}
//			else if(count > 2){
//				provderTagWidth=(125*tagList.length)+17*(tagList-1);
//			}
			$("#provderTagId").css("width",width);
			
			
          } 
};
	