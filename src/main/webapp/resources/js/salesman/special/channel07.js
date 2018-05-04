$().ready(function() {
		
	$('.findPage').off('click').on('click',function(){
		  var code = $(this).attr('data-id');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
		  if(code == 1){
			  $('.pageAni .kk a').removeClass('setHeight');
			  $('.pageAni').removeClass('setHeight');
		  }else{
			  $('.pageAni .kk a').addClass('setHeight');
			  $('.pageAni').addClass('setHeight');
			  $('.page'+code+' .kk a').removeClass('setHeight');
			  $('.page'+code+'').removeClass('setHeight');
		  }
	});
	
	
	
	
	/*$('#findPage1').off('click').on('click',function(){
		  
		  $('.page1 .kk a').removeClass('setHeight');
		  $('.page2 .kk a').removeClass('setHeight');
		  $('.page3 .kk a').removeClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $('.channel li').addClass('setHeight');
		  $('.page1').removeClass('setHeight');
		  $(this).addClass('activeMenu');
	});
	$('#findPage2').off('click').on('click',function(){
		  $('.page1 .kk a').removeClass('setHeight');
		  $('.page2 .kk a').addClass('setHeight');
		  $('.page3 .kk a').addClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $('.channel li').addClass('setHeight');
		  $('.page2').removeClass('setHeight');
		  $(this).addClass('activeMenu');
		  
	});
	$('#findPage3').off('click').on('click',function(){
		  $('.page1 .kk a').addClass('setHeight');
		  $('.page2 .kk a').removeClass('setHeight');
		  $('.page3 .kk a').addClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $('.channel li').addClass('setHeight');
		  $('.page3').removeClass('setHeight');
		  $(this).addClass('activeMenu');
		  
	});
	$('#findPage4').off('click').on('click',function(){
		  $('.page1 .kk a').addClass('setHeight');
		  $('.page2 .kk a').addClass('setHeight');
		  $('.page3 .kk a').removeClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $('.channel li').addClass('setHeight');
		  $('.page4').removeClass('setHeight');
		  $(this).addClass('activeMenu');
	});*/
	
	 $('.banner').flexslider({
         directionNav: true,
		 slideshowSpeed: 5000,
         pauseOnAction: false
     });
	 
	 
	 var aHeight = $('.kk a').height();
	 $('.kk a').css('height',aHeight);
	 $('.channel li').css('height',aHeight + 40)

});


