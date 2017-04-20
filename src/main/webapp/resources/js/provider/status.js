$().ready(function(){
	var status = $('#company-status').val();
	$('#mainPage').hide();
	
	if(status != '' && status != null && status != undefined){
		status = Number(status);
		switch(status){
			case 0: // 审核中
				$('#process-0').removeClass('hide');
				$('.btn').unbind('click');
				break;
			case 1: // 审核通过
				$('#process-1').removeClass('hide');
				$('.btn').unbind('click');
				// 显示主页信息
				$('#mainPage').show();
				$('#myPage').attr('href',getContextPath() + '/provider/info_' + $('#company-key').val()+'.html');
				break;
			case 2: // 未审核通过
				$('#process-2').removeClass('hide');
				var recomment = $('#company-recomment').val().trim();
				if(recomment == '' || recomment == null){
					$('#company-recomment').val('请完善信息后提交审核!');
				}
				$('.btn').on('click',submitCheck);
				break;
			case 3: // 未提交
				$('#process-3').removeClass('hide');
				$('.btn').on('click',submitCheck);
				break;
			default:
				break;
		}
		
	}
});

// 提交按钮 点击事件
function submitCheck(){
	var type = $('#company-status').val();
	if(type != '' && type != null && type != undefined){
		if(type == 2 || type == 3){
			// 更改状态
			loadData(function(flag){
				if(flag){
					$('#process-2').addClass('hide');
					$('#process-3').addClass('hide');
					$('#process-0').removeClass('hide');
				}else{
					alert('请重新登录');
				}
			}, getContextPath() + '/provider/change/status', $.toJSON({
				teamId : $('#company-key').val()
			}));
		}
	}
}