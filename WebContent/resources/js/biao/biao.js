var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var currentIndex;
var hasClick =false;
var nowImg=2;
var countCheck = 0;
var isHistory=false;

$().ready(function() {
	
	$('#openList').on('click',function(){
		
		    if($('#showList').hasClass('open')){
		    	$('#showList').slideDown();
		    	$('#showList').removeClass('open');
		    }else{
		    	$('#showList').slideUp();
		    	$('#showList').addClass('open');
		    }
		
	});
	
	$('#openSet').on('click',function(){
		
	    if($('#setOpen').hasClass('open')){
	    	$('#setOpen').slideDown();
	    	$('#setOpen').removeClass('open');
	    }else{
	    	$('#setOpen').slideUp();
	    	$('#setOpen').addClass('open');
	    }
	
});

	
	
	
	
});