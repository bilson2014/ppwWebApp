jQuery(function($){
	$('#slideBox').attr('style','');
	handover();
	var wei=$(window).width(); 
	var heis=wei*660/1920;
	$('.main_5  #slideBox').attr('style','height: '+heis+'px !important;	');
	
});
//点击切换
function handover(){
	
	$('.boxs ul li').click(function(){
		$(this).parent().parent().find('li span').removeClass('flowes');
		$(this).parent().parent().find('li').removeClass('flower');
		$(this).addClass('flower');
		$(this).find('span').addClass('flowes');
		if ($(this).attr('content')=='a'){		
			$('.boxs').attr('style','background: url(/resources/images/factory/base1.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='b'){			
			$('.boxs').attr('style','background: url(/resources/images/factory/base2.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='c'){			
			$('.boxs').attr('style','background: url(/resources/images/factory/base3.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='d'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base4.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='e'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base5.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='f'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base6.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='g'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base7.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='h'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base8.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='i'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base9.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='j'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base10.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='k'){
			$('.boxs').attr('style','background: url(/resources/images/factory/base11.png) no-repeat;background-size: 100%;');
		}else{
			$('.boxs').attr('style','background: url(/resources/images/factory/base12.png) no-repeat;background-size: 100%;');
		}
		
		
	})
}


















