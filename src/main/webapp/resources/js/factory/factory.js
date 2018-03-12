$().ready(function() {
	 //背景图自动轮播
    jQuery(".slideBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000,});  
    function openwin() {
        window.open("http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165","newwindow","width=600,height=600,left=400,top=100,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no")
    }
    	
    $(document).ready(function(e){
    	var subNav_active = $(".adv_active");
    	var subNav_scroll = function(target){
        subNav_active = target.parent();
    };
         		
    var winwith=document.body.clientWidth;
    var imgheight=winwith/3;
    $(window).resize(function(){
    	var winwith=document.body.clientWidth;
    	var imgheight=winwith/3;	
    });
    }());
});