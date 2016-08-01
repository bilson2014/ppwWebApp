
$().ready(function(){
	providerInfo.init();
});

var ProductTree = {
		loadDatas:function(){
			var teamId = $("#teamId").val();
			getData(function (msg){
				
			}, getContextPath()+'/product/loadWithTeam/'+teamId);
		}
	}


var providerInfo = {
		
		init : function(){
			
			this.controlTag();
			this.controlSpecialVideo();
		},
		
		controlTag : function(){
			var tagList = $.parseJSON($('#provderTags').text());
			var tagLength =tagList.length;
			var provderTagWidth =0; 
			for(i=0;i<tagList.length;i++){
				var formBody ='<div class="card">';
				formBody +='<div class="controlCard">';
				formBody +='<div class="pencil"></div>';
				formBody +='<div class="cardWord">'+tagList[i]+'</div>';
				formBody += '</div>';
				formBody += '</div>';
				$("#provderTagId").append(formBody);
			}
			if(tagLength==1){
				provderTagWidth = 150;
			}
			else if(tagLength>1){
				provderTagWidth=(125*tagList.length)+17*(tagLength-1);
			}
			$("#provderTagId").css("width",provderTagWidth);
          },
          controlSpecialVideo : function(){
        	 
        	  var yk =  $('#ykVideoUrl').val();
        	  var local = $('#localVideoUrl').val();
        	  var localImg = $('#localVideoImgUrl').val();
        	 
        	  if(yk!=undefined&&yk!=null&&yk!=""){
        		  makePlayer('showVideo', yk);
        	  }
        	  else{
        		  var formBody =' <video class="showVideo" controls src="'+local+'" preload="auto" poster="'+localImg+'"></video>';
        		  $("#showVideo").append(formBody);
        		//  <video class="showVideo" controls src="'+local+'" preload="auto" poster=''></video>
        	  }
        	  
          }
};
	

