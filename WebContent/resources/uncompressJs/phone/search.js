$().ready(function(){
	
	initData();
	
	$('nav#menu').mmenu({
		"offCanvas" : {
			"position": "left"
		},
		navbar : {
			title : '视频分类'
		}
	});
	
	if($('#sequence').val() != null && $('#sequence').val() != '' && $('#sequence').val() != undefined){
		var iName = 'unchange.png';
		if($('#sortord').val() == 0){ // 升序
			iName = 'asc-icon.png';
		}else{ // 降序
			iName = 'desc-icon.png';
		}
		$('#' + $('#sequence').val() + '-img').attr('src',getContextPath() + '/resources/img/icons/' + iName);
		$('#' + $('#sequence').val() + '-lb').css('color',"#fe5453");
	}
	
	$('.condition-section').children('label').on('click',function(){
		var q = $('#q').val().trim();
		var sequence = $(this).data('sequence');
		
		if(q != null && q != '' && q != undefined){
			// 查询条件不为空,则执行相应的操作
			var sortord = $(this).data('sortord');
			if(sortord == 0){
				$(this).data('sortord',1);
				sortord = 1;
			}else {
				$(this).data('sortord',0);
				sortord = 0;
			}
			
			if(sequence != null && sequence != '' && sequence != undefined) {
				$('#search-sortord').val(sortord);
				$('#search-sequence').val(sequence);
				
				$('#s-form').submit(); // 提交
			}
			return false;
		}
	});
});

function initData(){
	loadData(function(itemList){
		var $ibody = '';
		$ibody += '<li><a href="'+ getContextPath() + '/phone/search?q=' + $('#q').val() + '&item=*' + '&sortord=0' + '">全部</a></li>';
		$.each(itemList,function(i,item){
			$ibody += '<li>';
			$ibody += '<a href="'+ getContextPath() + '/phone/search?q=' + $('#q').val() + '&item=' + item.itemId + '&sortord=0' + '">';
			$ibody += item.itemName;
			$ibody += '</a>';
			$ibody += '</li>';
		});
		$('.mm-listview').append($ibody);
	}, getContextPath() + '/item/list', null);
}