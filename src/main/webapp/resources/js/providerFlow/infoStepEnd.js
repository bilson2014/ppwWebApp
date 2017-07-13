
$().ready(function(){
	initEven();
});

function initEven(){
	$('#step4Next').off('click').on('click',function(){
		   $('#successCheck').hide();
		   $('#success').show();
		   $(document).scrollTop(0);
	});	
}

