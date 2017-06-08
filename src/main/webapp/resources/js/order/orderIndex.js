var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var InterValObj;
var initM = 3;

$().ready(function() {
	$("input[name$='time']").datepicker({
		language: 'zh',
		dateFormat:'yyyy-MM-dd',
		minDate: new Date() 
     });
	$('.orderIndex').addClass('active');
	orderIndex.init();
});

var orderIndex = {
		init:function(){
			orderIndex.controlSelect();
			orderIndex.controlModel();
			InterValObj = window.setInterval(showSuccess, 1000);
		},
		pagination:function(){
			$(".pagination").createPage({
				pageCount: Math.ceil($('#total').val() / pageSize),
				current: 1,
				backFn:function(p){
					// 点击 翻页，查询符合条件的视频
					loadProduction((p - 1) * pageSize);
					currentSize = (p - 1) * pageSize;
				}
			});
		},
		controlSelect:function(){
			$('.orderSelect').on('click',function(){
				$('.oSelect').slideUp();
				$(this).find('.oSelect').slideDown();
				event.stopPropagation();
			});
			$('.oSelect li').on('click',function(){
			   	 $(this).parent().parent().find('div').text($(this).text());
			   	 $(this).parent().slideUp();
			   	 event.stopPropagation();
			});
			$('body').on('click',function(){
				$('.oSelect').slideUp();
			});
		},
		controlModel:function(){	
			$('.submit').on('click',function(){
				$('#successModel').show();
			});
			$('.cancle').on('click',function(){
				$('#sureModel').show();
			});
			$('#noReal').on('click',function(){
				$('.modelPage').hide();
				$('#checkSureModel').show();
				$('#setColor').removeClass('greenColor');
				$('#setColor').addClass('redColor');
				$('#setColor').text('虚假');
			});
			$('#real').on('click',function(){
				$('.modelPage').hide();
				$('#checkSureModel').show();
				$('#setColor').removeClass('redColor');
				$('#setColor').addClass('greenColor');
				$('#setColor').text('真实');
			});			
			$('.closeBtn').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
			});
			$('.descBot').on('click',function(){
				$('.modelPage').hide();
				initM = 3;
			});
		},
};

function showSuccess(){
	if (initM < 0) {
		$('#last3').text('0');
		clearInterval(successIntervalObj);
		$('#successModel').hide();
		initM = 3;
	} else {
		$('#last3').text(initM--);
	}
}



