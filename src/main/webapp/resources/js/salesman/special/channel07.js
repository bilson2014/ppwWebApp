$().ready(function() {
	
	$('#findPage1').off('click').on('click',function(){
		  $('.page1 .kk a').removeClass('setHeight');
		  $('.page2 .kk a').removeClass('setHeight');
		  $('.page3 .kk a').removeClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
	});
	$('#findPage2').off('click').on('click',function(){
		  $('.page1 .kk a').removeClass('setHeight');
		  $('.page2 .kk a').addClass('setHeight');
		  $('.page3 .kk a').addClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
		  
	});
	$('#findPage3').off('click').on('click',function(){
		  $('.page1 .kk a').addClass('setHeight');
		  $('.page2 .kk a').removeClass('setHeight');
		  $('.page3 .kk a').addClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
		  
	});
	$('#findPage4').off('click').on('click',function(){
		  $('.page1 .kk a').addClass('setHeight');
		  $('.page2 .kk a').addClass('setHeight');
		  $('.page3 .kk a').removeClass('setHeight');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
	});
	
	 $('.banner').flexslider({
         directionNav: true,
		 slideshowSpeed: 5000,
         pauseOnAction: false
     });
	 
	 
	 var aHeight = $('.kk a').height();
	 $('.kk a').css('height',aHeight);

});


