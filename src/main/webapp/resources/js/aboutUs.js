$().ready(function() {
    
	
	initVideo();
	initImg();
	window.onresize = function(){
		 initVideo();
	    };
	    
	    setTimeout(function() {
	    	   document.getElementById('playVideos').play();
         }, 2000);
	 

});

function initVideo(){
	var screenWidth = document.documentElement.clientWidth;
    var videoHeight = screenWidth/1920*900;
    var top = (videoHeight - 540)/2;
    if(screenWidth<=1276){
    	 videoHeight = screenWidth/1920*1080;
    	 top = (videoHeight - 540)/2;
    }
    $('.banner').css('height',videoHeight);
    
    if(screenWidth<=960){
        $('.banner').css('height','540px');
    }
    
    if(videoHeight>540){
    	$('.video-div').css('top',top);
    }
   
}

function initImg(){
	 $(document).on('mousemove',function(e){
			
		    var height = document.getElementById('video').getBoundingClientRect().top;
		    console.info(height);
		    if(height<0){
		    	$('#icon').hide();
		    }else{
		    	$('#icon').show();
		    }
          
		  });
}