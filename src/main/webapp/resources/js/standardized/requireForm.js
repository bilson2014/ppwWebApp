$().ready(function() {
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
			  url: getContextPath() + '/std/require/save',
			  data: {"indentId":indentId,
					"requireJson": $.toJSON(require),
					"requireFlag" : 0
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