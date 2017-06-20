
$().ready(function() {
	orderList.init();
});

var orderList = {
		init:function(){
			orderList.controlItem();
		},
		controlItem:function(){	
			$('.optionItem div').on('click',function(){
				$(this).parent().find('div').removeClass('active');
				$(this).parent().parent().find('.otherInfo').hide();
				$(this).addClass('active');
			});
			$('.other').on('click',function(){
				$(this).parent().parent().find('.otherInfo').show();
			});
		},
};
