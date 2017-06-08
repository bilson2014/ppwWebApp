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
			$('.closeBtn').on('click',function(){
				$('#successModel').hide();
			});
			$('.descBot').on('click',function(){
				$('#successModel').hide();
			});
		}
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



