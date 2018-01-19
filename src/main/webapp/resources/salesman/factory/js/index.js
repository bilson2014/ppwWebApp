jQuery(function($){
	$('#slideBox').attr('style','');
	handover();
	
//	$('.slideBox .bd img').height;
//	console.log('wwq');
//	console.log($('.slideBox .bd li').height());
//	var hei=$('.slideBox .bd li').height();
//	$('#slideBox').attr('style','height: '+hei+'px !important;	');
	
	
	var wei=$(window).width(); 
//	console.log(wei);
	var heis=wei*660/1920;
//	console.log(heis);
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
			$('.boxs').attr('style','background: url(images/base1.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='b'){			
			$('.boxs').attr('style','background: url(images/base2.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='c'){			
			$('.boxs').attr('style','background: url(images/base3.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='d'){
			$('.boxs').attr('style','background: url(images/base4.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='e'){
			$('.boxs').attr('style','background: url(images/base5.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='f'){
			$('.boxs').attr('style','background: url(images/base6.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='g'){
			$('.boxs').attr('style','background: url(images/base7.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='h'){
			$('.boxs').attr('style','background: url(images/base8.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='i'){
			$('.boxs').attr('style','background: url(images/base9.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='j'){
			$('.boxs').attr('style','background: url(images/base10.png) no-repeat;background-size: 100%;');
		}else if ($(this).attr('content')=='k'){
			$('.boxs').attr('style','background: url(images/base11.png) no-repeat;background-size: 100%;');
		}else{
			$('.boxs').attr('style','background: url(images/base12.png) no-repeat;background-size: 100%;');
		}
		
		
	})
}
//行业大咖 鼠标上移
function appear(){
//	$('.bigbox .smallbox').mouseover(function(){
//		$(this).find('.hides').attr('')
//	})
}


















