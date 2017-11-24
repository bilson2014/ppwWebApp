// JavaScript Document

jQuery(function($){
	
	
	
	
	var index = 0;
	var maximg = 23;
	//$('<div id="flow"></div>').appendTo("#myjQuery");
	//自动播放
	var MyTime = setInterval(function(){
		ShowjQueryFlash(index);
		if(index<maximg){
		index++;}else if(index>=maximg){index=-1;index++}
	} , 7500);
});

function ShowjQueryFlash(i) {

$("#myJJ li").eq(i).addClass("current").siblings().removeClass("current");

}


















