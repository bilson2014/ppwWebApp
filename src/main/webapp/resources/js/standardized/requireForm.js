$().ready(function() {
	
	initView();
	
	
	var require = $('#require').text();
	if(require != undefined && require != '' && require != null){
		alert('没做回显处理！~~  ' + require.trim());
	}
	$('#submit').on('click', function() {
		// 适用场景
		var scene = new Array();
		// 受众
		var audience = new Array();
		// 核心信息
		var coreMessage = new Array();
		// 时长
		var time = new Array();
		// 预算
		var budget = new Array();
		// 案例
		var sample = new Array();
		// 调性
		var tonal = new Array();
		$('#fm input:checkbox[name=scene]:checked').each(function(i) {
			scene.push($(this).val());
		});
		$('#fm input:checkbox[name=audience]:checked').each(function(i) {
			audience.push($(this).val());
		});
		$('#fm input:checkbox[name=coreMessage]:checked').each(function(i) {
			coreMessage.push($(this).val());
		});
		$('#fm input:checkbox[name=time]:checked').each(function(i) {
			time.push($(this).val());
		});
		$('#fm input:checkbox[name=budget]:checked').each(function(i) {
			budget.push($(this).val());
		});
		$('#fm input:checkbox[name=sample]:checked').each(function(i) {
			sample.push($(this).val());
		});
		$('#fm input:checkbox[name=tonal]:checked').each(function(i) {
			tonal.push($(this).val());
		});
		var require = new RequireEntity(scene, audience, coreMessage, time, budget, sample, tonal);
		var indentId = $('#indentId').val();
		$.ajax({
			  type: 'POST',
			  url: getContextPath() + '/require/save',
			  data: {"indentId":indentId,
					"requireJson": $.toJSON(require),
					"requireFlag" : 0,
					"indentId" : $('#indentId').val()
					},
			  success: function (res) {
				  if(res.errorCode == 200){
					  alert(res.errorMsg);
				  }else{
					  alert(res.errorMsg);
				  }
			  }
		});
		
	});
});

function RequireEntity(scene, audience, coreMessage, time, budget, sample,
		tonal) {
	this.scene = scene;
	this.audience = audience;
	this.coreMessage = coreMessage;
	this.time = time;
	this.budget = budget;
	this.sample = sample;
	this.tonal = tonal;
}
var rowType = {
		select : "select",
		datepicker : "datepicker",
		textarea :"textarea"
		};

var optionType = {
		checkbox:"checkbox",
		text:"text"
		};

function initView(){
	var view = $('#fm');
	syncLoadData(function (res){
		var obj = $.evalJSON(res.result);
		var rows = obj.rows;
		if(rows != null && rows.length > 0){
			for (var int = 0; int < rows.length; int++) {
				var row = rows[int];
				var type = row.type;
				var html = '';
				switch (type) {
				case rowType.select:
					html = buildSelect(row);
					break;
				case rowType.datepicker:
					html = buildDatepicker(row);
					break;
				case rowType.textarea:
					html = buildTextarea(row);
					break;
				}
				view.append(html);
			}
			$("._datepicker").datepicker({
				language: 'zh',
				dateFormat:'yyyy-MM-dd' 
			});
		}
	}, getContextPath() + '/require/config', null);
}

function buildSelect(obj){
	var html = $('<div></div>');
	html.append(obj.title);
	var items = $('<div></div>');
	var options = obj.options;
	if(options != null && options.length > 0){
		for (var int = 0; int < options.length; int++) {
			var option = options[int];
			var type = option.type;
			switch (type) {
			case optionType.checkbox:
				items.append('<input type="checkbox" name="'+obj.name+'" value="'+option.value+'">'+option.text+' &nbsp;');
				break;
			case optionType.text:
				items.append(option.text + '<input type="text" name = "'+obj.name+'" />');
				break;
			}
		}
	}
	html.append(items);
	return html;
}
function buildDatepicker(obj){
	var html = $('<div></div>');
	html.append(obj.title);
	var items = $('<div><input class="_datepicker" name="'+obj.name+'" /></div>');
	html.append(items);
	return html;
}
function buildTextarea(obj){
	var html = $('<div></div>');
	html.append(obj.title);
	var items = $('<div><textarea rows="6" name="'+obj.name+'" cols="40"></textarea></div>');
	html.append(items);
	return html;
}




