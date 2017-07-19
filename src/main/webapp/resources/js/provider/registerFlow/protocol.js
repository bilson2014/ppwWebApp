$().ready(function(){

});

function checkAgree(){
		if($("#isAgree[type='checkbox']").is(':checked')){
			  $('#agree').prop("type","submit");
		}else{
			$('#showErrorAgree').show();
			
		}
}

	