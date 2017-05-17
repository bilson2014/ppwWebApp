$().ready(function(){
	$('.edit').on('click',function(){
		$('#bbbb').show();
		var tr = $(this).closest('tr');
		var id = $(tr).find('.id');
		var realName = $(tr).find('.realName');
		var indent_tele = $(tr).find('.indent_tele');
		var userCompany = $(tr).find('.userCompany');
		var wechat = $(tr).find('.wechat');
		var orderDate = $(tr).find('.orderDate');
		var indent_recomment = $(tr).find('.indent_recomment');
		var indentType = $(tr).find('.indentType');
		
		$('#formId').val($(id).text().trim());
		$('#formrealName').val($(realName).text().trim());
		$('#formindent_tele').val($(indent_tele).text().trim());
		$('#userCompany').val($(userCompany).text().trim());
		$('#wechat').val($(wechat).text().trim());
		$('#formorderDate').val($(orderDate).text().trim());
		$('#formindent_recomment').val($(indent_recomment).text().trim());
		$('#formindentType').val($(indentType).text().trim());
	});
});

function subBtn(){
	$('#bbbb').hide();
	location.reload();
	
	
}