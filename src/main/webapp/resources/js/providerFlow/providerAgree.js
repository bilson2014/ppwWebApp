$().ready(function(){
	$('#agree').off('click').on('click',function(){
		if($("#isAgree[type='checkbox']").is(':checked')){
/*			 $('#agreement').hide();
			 $('.step').show();
			 $('#step1').show();*/
			 $(document).scrollTop(0);
		}else{
			$('#showErrorAgree').show();
		}
	});
});

	