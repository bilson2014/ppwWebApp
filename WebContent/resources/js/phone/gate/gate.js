
var topBtn =0;
var midBtn =0;
var botBtn =0;
var btnMove =0;

$().ready(function(){
	
	
	
	$('#button').on("mousemove",function(e){
		
		$(this).on('selectstart',function(){return false;});
		var _x = e.pageX - x;//获得X轴方向移动的值
		var _y = e.pageY - y;//获得Y轴方向移动的值
		$('#button').css({'left':_x+"px",'top':_y+"px"});
		alert(_x);
		alert(_y);
		});
	
	topBtn=$('#topBtn').position().top;
	midBtn=$('#button').position().top;
	botBtn=$('#botBtn').offset().top;  
	 $("span").text(btnMove + ", " + topBtn+"bot"+botBtn);	
	  
	 $(document).mousemove(function(e){
		    $('#button').css({'top':e.pageY+"px"});
		    btnMove =$('#button').position().top;
		    $("span").text(btnMove + ", " + topBtn+"bot"+botBtn);
		    if(btnMove<=topBtn){
		    	$("span").text("yes");
		    }
		    
		    if((btnMove)>=botBtn){
		    	$("span").text("yesBot");
		    }
		    
		  });
	 

	 
	 
	  
	  $(document).on('touchmove',function(e){
		    e.preventDefault();
			var touch = event.touches[0];; 
		    $('#button').css({'top':touch.pageY-50 + 'px'});
		    btnMove =$('#button').position().top;
		    $("span").text(btnMove + ", " + topBtn+"bot"+botBtn);	    
		    if((btnMove)<=topBtn){
		    	alert('碰');
		    }
		    if((btnMove)>=botBtn){
		    	alert('碰');
		    }
	
		  });
	  
	  
	  $(document).on('touchend',function(){
		  var touch = event.touches[0];; 
		
	  });
	
});

function moveUPInit(){
	
}

	

