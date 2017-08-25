var InterValObj; // timer变量，控制时间  
var count = 120; // 间隔函数，1秒执行  
var curCount; // 当前剩余秒数 
$().ready(function() {
	initSelect();
	initMultSelect();
});

function initMultSelect(){

	$('.orderMultSelect').off('click').on('click',function(e){
		if(!$('.multSelect').hasClass('selectColor')){
			$('.orderMultSelect').removeClass('selectColor');
			$(this).find('.multSelect').slideDown();
			$(this).addClass('selectColor');
		}
		e.stopPropagation();
	});
	$('.multSelect li input').off('click').on('click',function(e){
		 var nowThis = $('.multSelect li input');
		 var checkInfo = $('#multInfo').text();
		 var multInfo = '';
		 var multID = '';
		 for (var int = 0; int < nowThis.length; int++) {
			 if($(nowThis[int]).is(':checked')){
				   if(multInfo == null||multInfo == ""){
					   multInfo = multInfo + $(nowThis[int]).parent().find('div').text();
					   multID = multID + $(nowThis[int]).attr('data-id');
				   }else{
					   multInfo = multInfo +"+"+ $(nowThis[int]).parent().find('div').text();
					   multID = multID +","+$(nowThis[int]).attr('data-id');
				   }
			 }
		}
		 $('#multInfo').text(multInfo);
		 $('#multInfo').attr('data-id',multID);
		 var id = $(this).attr('data-id');
		 var multInfo = $('#multInfo').text();
	});
	$('body').off('click').on('click',function(e){
		 $('.multSelect').slideUp();
		 $('.oSelect').slideUp();
		 $('.orderSelect').removeClass('selectColor');
		 $('.orderMultSelect').removeClass('selectColor');
		 e.stopPropagation();
	});
	
}






