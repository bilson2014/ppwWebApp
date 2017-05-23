var page = 1;
var rows = 100000;
$().ready(function() {
	loadData(function(res){
		var root = $('#list');
		if(res != null && res.rows.length > 0){
			var rows = res.rows;
			for (var int = 0; int < rows.length; int++) {
				var html = createTR(rows[int]);
				root.append(html);
			}
		}
		$('.tt').on('click',function(){
			var reId = $(this).attr('data-id');
			var productList = $('#productList');
			productList.html('');
			loadData(function(res){
				if(res!=null){
					var rows = res.rows;
					for (var int2 = 0; int2 < rows.length; int2++) {
						var r = rows[int2];
						var html = [
									'<a href = "/product/index?chanpinId='+r.chanpinId+'&requireId='+reId+'">',
									'<div>',
									'	<img src="'+getDfsHostName() + r.chanpinPicLDUrl +'" style="width: 50px;height:50px ">',
									'	<label>'+r.chanpinName+'</label>',
									'</div>',
									'</a>',
									'<br/>'
						           ].join('');
						productList.append(html);
					}
				}
			}, getContextPath() +'/product/list', null);
			$('#myModal').modal('show');
		});
	}, getContextPath() +'/require/list', $.toJSON({
		"page":page,
		"rows":rows
	}));
});

function createTR(obj){
	
	var json = $.evalJSON(obj.requireJson);
	var jsonHtml = '';
	jsonHtml += "适用场景："+json.scene + '<br/>';
	jsonHtml += "受众："+json.audience+ '<br/>';
	jsonHtml += "核心信息："+json.coreMessage+ '<br/>';
	jsonHtml += "时长："+json.time+ '<br/>';
	jsonHtml += "预算："+json.budget+ '<br/>';
	jsonHtml += "是否有样片："+json.sample+ '<br/>';
	jsonHtml += "调性："+json.tonal;
	var html = [
				'<tr>',
				'<td>'+obj.requireId+'</td>',
				'<td>'+obj.indentId+'</td>',
				'<td>'+jsonHtml+'</td>',
				'<td>'+obj.requireFlag+'</td>',
				'<td><button class="tt" data-id="'+obj.requireId+'">推荐产品</button></td>',
				'</tr>'
	           ].join('');
	return html;
}