$().ready(function(){
	
	submitEventCreate();
	editEvent();
	
	var title = $('#tableTitle');
	$('#new').on('click',function(){
		readMore(0); // 新订单
		title.text('新订单');
	});
	$('#bp').on('click',function(){
		readMore(1); // 处理中
		title.text('处理中');
	});
	$('#sub').on('click',function(){
		readMore(2); // 完成
		title.text('完成');
	});
	$('#des').on('click',function(){
		readMore(6); // 虚假
		title.text('虚假');
	});
	
});

function subBtn(){
	$('#bbbb').hide();
}

function readMore(flag){
	var page = 1;
	var rows = 20;
	loadData(function (res){
		if(res != null && res != undefined){
			var rows =  res.rows;
			// 数据填充！
			console.log(rows);
			var root = $("#tableList");
			root.html("");
			root.append(titleTR());
			for (var int = 0; int < rows.length; int++) {
				var row = rows[int];
				var html = TRCreate(row);
				root.append(html);
			}
			submitEventCreate();
			editEvent();
		}
	}, getContextPath() + '/order/list/page', $.toJSON({
		"page":page,
		"rows" : rows,
		"indentType" : flag
	}));
}

function titleTR(){
	var html = [
				'<tr>',
					'<td>订单ID</td>',
					'<td>联系人</td>',
					'<td>联系电话</td>',
					'<td>公司</td>',
					'<td>微信</td>',
					'<td>下单时间</td>',
					'<td>备注</td>',
					'<td>状态</td>',
					'<td>按钮</td>',
				'</tr>'
	            ].join('');
	return html;
}

function TRCreate(obj){
	var btn = '';
	if(obj.indentType == 0 || obj.indentType == 1 ){
		btn = '<td><button class="edit">编辑</button> <button class="editRequire" data-id="'+obj.id +'">填写需求</button></td>';
	}else{
		btn = '';
	}
	
	var html = [
				'<tr>',
					'<td class="id" data-indentName = "'+obj.indentName+'">'+obj.id+'</td>',
					'<td class="realName">'+(obj.realName == null ? "":obj.realName) +'</td>',
					'<td class="indent_tele">'+(obj.indent_tele == null ? "":obj.indent_tele) +'</td>',
					'<td class="userCompany">'+(obj.userCompany == null ? "":obj.userCompany) +'</td>',
					'<td class="wechat">'+(obj.wechat == null ? "":obj.wechat) +'</td>',
					'<td class="orderDate">'+(obj.orderDate == null ? "":obj.orderDate) +'</td>',
					'<td class="indent_recomment">'+(obj.indent_recomment == null ? "":obj.indent_recomment) +'</td>',
					'<td class="indentType">'+(obj.indentType == null ? "":obj.indentType) +'</td>',
					btn,
				'</tr>'
				].join('');
	return html;
}

function submitEventCreate(){
	$('.edit').off('click').on('click',function(){
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
		
		var data_indentName = $(id).attr('data-indentName');
		
		$('#formId').val($(id).text().trim());
		$('#formrealName').val($(realName).text().trim());
		$('#formindent_tele').val($(indent_tele).text().trim());
		$('#userCompany').val($(userCompany).text().trim());
		$('#wechat').val($(wechat).text().trim());
		$('#formorderDate').val($(orderDate).text().trim());
		$('#formindent_recomment').val($(indent_recomment).text().trim());
		$('#formindentType').val($(indentType).text().trim());
		$('#indentName').val(data_indentName);
	});
}

function editEvent(){
	$('.editRequire').on('click',function(){
		var id = $(this).attr('data-id');
		location.href  = '/require?indentId='+id;
	});
}