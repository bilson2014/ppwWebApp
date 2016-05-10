$().ready(
		function() {

loadflowdata(); 



});


//加载流程模块
function loadflowdata() {
	var key = getCurrentProject();
	loadData(
		function(msg) {
			//构建流程结构对象，填充流程时间信息
			stepListJson = new Array(msg.length);
			for (var i = 0; i < msg.length; i++) {
				stepListJson[i] = {
					StepNum : (i + 1),
					StepText : msg[i].name,
					StepDescription : msg[i].description
				};
				var time = msg[i].scheduledTime;
				//填充预计时间
				if (time != null) {
					if (time.fdStartTime != null && time.fdStartTime != '') {
						$("#et_" + msg[i].taskDefinitionKey).text(
								time.fdStartTime);
					}
				}
				//填充实际时间
				if (msg[i].createTime != null && msg[i].createTime != '') {
					$("#cu_" + msg[i].taskDefinitionKey).text(
							msg[i].createTime.split(' ')[0]);
				}
			}
			// 当前进行到第几步；默认为第一步
			var currentStep = 1;
			//创建流程结构对象
			StepTool = new Step_Tool_dc("test", "mycall");
			// 使用工具对，页面绘制相关流程步骤图形显示
			StepTool.drawStep(currentStep, stepListJson);
			//配置当前正在执行中的任务
			loadData(
				function(msg) {
					// 时间逻辑！检测任务是否超时，设置状态提示
					$("#cu_" + msg.taskDefinitionKey).text(
							getCurrentTime());
					var et_date = $("#et_" + msg.taskDefinitionKey)
							.text();
					var overdue = dateCompare(getCurrentTime(), et_date);
					if (overdue) {
						resetTime('curr');
						$("#cu_" + msg.taskDefinitionKey).addClass(
								'get-step');
					}
					
					var times=$("div[id^='cu_']");
					var isEnd=false;
					for (var int = 0; int < times.length; int++) {
						var item=times[int];
						var id=item.id;
						var taskKey;
						if(id!=null&&id!=''&&(id.indexOf('_')!=-1)){
							var idarray=id.split('_');
							taskKey=idarray[1];
						}
						if(isEnd){
							$(item).text("");
						}
						if(taskKey==msg.taskDefinitionKey)
							isEnd=true;
					}
					
					//填充当前任务描述信息
					$(".description-text").text(msg.description);
					//迁移节点
					var num;
					$(".test ul li").each(function(index) {
						num = jQuery(this).attr("data-value");
						var text = jQuery(this).attr("data-text");
						if (text.trim() == msg.name.trim()) {
							StepTool.drawStep(num, stepListJson);
							currentIndex = num;
							return;
						}
					});
					//暂停状态
					if (msg.suspended) {
						$(".pausebtn").text("恢复");
						$(".flowbtn").removeClass('red-btn');
						$(".pausebtn").removeClass('gray-btn');
						$(".pausebtn").addClass('red-btn');
						$(".flowbtn").addClass('gray-btn');
						$(".pausebtn").off("click");
						//配置按钮功能为恢复项目运行
						$(".pausebtn").on("click", function() {
							resumeBtn();
							$(".pausebtn").text("暂停");
							$(".flowbtn").removeClass('gray-btn');
							$(".pausebtn").removeClass('red-btn');
							$(".pausebtn").addClass('gray-btn');
							$(".flowbtn").addClass('red-btn');
							$(".pausebtn").off("click");
							$(".pausebtn").on("click", function() {
								pauseBtn();
								loadflowdata();
							});
						});
					}
					if (msg.name.trim() == '任务不存在') {
						StepTool.drawStep(num, stepListJson);
						currentIndex = num;
						return;
					}
					//添加特效时间
					$(".drop-content a").each(function(index) {
						$(this).css({
							'animation-delay' : (index / 10) + 's'
						});
					});
					//配置弹出信息
					(function() {
						var init, isMobile, setupExamples, setupHero, _Drop
						_Drop = Drop.createContext({
							classPrefix : 'drop'
						});
						init = function() {
							return setupExamples();
						};
						setupExamples = function() {
							return $('.test').each(function() {
								var $example, $target, content, drop, openOn, theme;
								$example = $(this);
								theme = $example
										.data('theme');
								openOn = $example
										.data('open-on')
										|| 'click';
								$target = $example
										.find('.drop-target');
								$target.addClass(theme);
								content = function() {
									return $('.drop-content').html();
								};
								for (var int = 0; int < $target.length; int++) {
									drop = new _Drop(
									{
										target : $target[int],
										classes : theme,
										position : 'bottom right',
										constrainToWindow : true,
										constrainToScrollParent : false,
										openOn : openOn,
										content : content
									});
									//设置弹出框内部信息
									drop.on("open",function() {
										var text = jQuery(this.target).attr("data-description");
										$(".description-c").html("<span class='word-size'>"+ text+ "</span>");
										$(".content-title").html("<p class='word-title'>"+ jQuery(this.target).text()+ "阶段</p>");
									});
								}
							});
						};
						init();
					}).call(this);
				}, getContextPath() + '/mgr/flow/getCurrectTask', $
						.toJSON({
							id : key
				}));
			}, getContextPath() + '/mgr/flow/getnodes', $.toJSON({
				id : key
			}));
}