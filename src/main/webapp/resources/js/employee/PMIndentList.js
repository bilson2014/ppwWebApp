$().ready(function() {
	loadData(function(res) {
		console.log(res);
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
			require();
		}
	}, getContextPath() + '/mgr/get/indent/list', null);
});

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
					'<td> <button class="look" data-id="'+obj.requireId+'">查看文档</button> </td>',
				'</tr>'
				].join('');
	return html;
}
function require(){
	$('.look').on('click',function (){
		var id = $(this).attr('data-id');
		location.href  = '/require?requireId='+id;
	});
}
