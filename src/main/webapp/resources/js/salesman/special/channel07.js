$().ready(function() {
	
	
	
	  window.onload = function(){  
		     var aHeight = $('.kk a span img').height();
			 $('.kk a').css('height',aHeight + 50);
			 $('.channel li').css('height',aHeight + 100)
      }  
	
	$('.setShare').click(function(){
		var title = '区块链宣传片制作_区块链项目路演视频_区块链是什么_区块链技术-拍片网';
		var url = 'https://www.apaipian.com/special/channel01.html';
		var img_path = 'https://www.apaipian.com//resources/images/salesman/special/banner01.jpg';
		share.init(url,title,img_path);
	});
		
	$('.findPage').off('click').on('click',function(){
		  var code = $(this).attr('data-id');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
		  if(code == 0){
			  $('.pageAni .kk a').removeClass('setHeight');
			  $('.pageAni').removeClass('setHeight');
		  }else{
			  $('.pageAni .kk a').addClass('setHeight');
			  $('.pageAni').addClass('setHeight');
			  $('.page'+code+' .kk a').removeClass('setHeight');
			  $('.page'+code+'').removeClass('setHeight');
		  }
	});
	
	
/*	var height = $(window).height() /2; 
	var width = $(window).width()/2; 
	var nowX = 200;
	var nowY = 100;
	
	$(document).mousemove(function(e){
		var X = e.pageX;
		var Y = e.pageY;
		
		  $(".aa").css("left",X).css("top",Y);
		  if(X > width){
			  $(".aa").css("left",200 - (X - width));
		  }else{
			  $(".aa").css("left",200 + (width - X));
		  }
		  
		  if(Y > height){
			  $(".aa").css("top",100 - (Y - height));
		  }else{
			  $(".aa").css("top",100 + (height - Y));
		  }
		  
		  
		  
		  console.log('x='+e.pageX);
		  console.log('y='+e.pageY);
     });*/
	
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
	 
	 
	

});


