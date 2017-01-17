function loadprojecctlist() {
	loadData(function(msg) {
		// 获取页面控件 -----------------------------init--------------------------
		var doing = $("#myProjectId");
		var help = $("#helpProjectId");
		var pause = $("#pauseProjectId");
		var history = $("#historyProjectId");
		// 清空控件内容
		doing.html('');
		help.html('');
		pause.html('');
		history.html('');
		// --------------------------------------分组数据------------------------------------
		if (msg != null && msg.length > 0) {
			for (var i = 0; i < msg.length; i++) {
				
				// 构造控件
				var liStar = $('<li></li>')
				var a = $('<a class="indent-a title-content" data-state='
						+ msg[i].state + ' data-value="' + msg[i].id + '">'
						+ msg[i].projectName + '</a>');
				// 绑定点击事件
				$(a).on("click", function() {
					firstClick = true;
					// 取出ID
					var key = $(this).attr("data-value");
					// 设置当前选中项目ID
					putCurrentProject(key);
					var state = jQuery(this).attr('data-state');
					loadprojecctlist();
					ControlPay.closeList();
					var type = $("#type").val();
					if (type == "customer") {
						checkHasList();
						checkHasNoPayList();
					}
					// if(type=="employee"){
					// checkHasListForEm();
					// }
				});
				liStar.append(a);
				
				switch (msg[i].state) {
				case 0: // --- 正常
					doing.append(liStar);
					break;
				case 1: // --- 完成
				case 2: // --- 取消
					history.append(liStar);
					break;
				case 3: // --- 暂停
					pause.append(liStar);
					break;
				}
			}
			// 数据分发完成 ---》根据角色调整view
			
			var type = $("#type").val();
			
			switch (type) {
			case 'customer':
				var pauseLi = $(pause).find('li');
				$(doing).append(pauseLi);
				break;
			case 'provider':
				var pauseLi = $(pause).find('li');
				$(doing).append(pauseLi);
				
				break;
			case 'employee':
		        loadSynerhyList();
				break;
			}
			
		}

		// 检测该管家是否拥有属于自己的项目（非协同项目以外的）
		// 优先加载 协同人
		loadSynerhyList();
		var help = $("#helpProjectId").find('a');
		if (msg.length <= 0 && help.length <= 0) {
			// ‘正常项目’ 和‘ 协同项目’ 都没有 --->隐藏全部内容，显示请新建项目
			$(".left-page").hide();
			$(".right-page").hide();
			$(".noproject").removeClass('hide');
			$(".noproject").removeClass('set-width');
			return;
		} else {
			$(".noproject").addClass('hide');
		}
		// 遍历返回数据
		var currentprojectkey = '';
		var selectFirst = false;
		var state = false;

		if (help.length > 0) {
			noWorkproject = true;
		}
		var userId = $('#userId').val();
		var currIsSynergy = false;
		// 加载属于我的项目
		for (var i = 0; i < msg.length; i++) {
			var stateStr = msg[i].state;
			// 默认第一次选中
			// 当没有选中过项目，并且遍历的项目为正长状态下的第一个项目为默认选中项目
			if (!selectFirst && getCurrentProject() == null && stateStr == 0) {
				currentprojectkey = msg[i].id + '';
				// 隐藏域 内储存ID
				putCurrentProject(currentprojectkey);
				selectFirst = true;
				noWorkproject = false;
				show(true); // 显示所有按钮
			} else if (msg[i].id == getCurrentProject()) {
				// 判断当前项目是历史项目
				if (stateStr == 1 || stateStr == 2) {
					// 确定当前状态觉决定是否显示
					finish(); // 禁用所有按钮
					isHistory = true;
				} else {
					if (userId == msg[i].userId) {
						show(true); // 显示所有按钮
					} else {
						show(true); // 显示所有按钮
					}
					noWorkproject = false;
					isHistory = false;
				}
			}
			// 选择添加到那个view
			switch (msg[i].state) {
			case 0:
				if (type == "employee" && userId == msg[i].userId) {
					doing.append(liStar);
				} else {
					doing.append(liStar);
				}
				break;
			case 1:
			case 2:
				history.append(liStar);
				break;
			case 3:
				pause.append(liStar);
				break;
			}
		}
		// if has histroy project but no working project show window（！）
		// TODO:
		// 选中第一个项目 负责》暂停》协同 lt 20160608
		// begin
		if (!hasClick) {
			var myList = $('#myProjectId li').length;
			if (myList == 0 || myList == undefined) {
				var nowContent;
				var pauseList = $('#pauseProjectId li').length;
				var helpList = $('#helpProjectId li').length;
				if (pauseList > 0) {
					var nowContent = $('#pauseProjectId li').first();
					nowContent.find('a').click();
					ControlTree.OpenPauseProjectTree();
					hasClick = true;
					nowImg = 1;
				} else if (helpList > 0) {
					var nowContent = $('#helpProjectId li').first();
					nowContent.find('a').click();
					hasClick = true;
					nowImg = 0;
				}
			}
		}
		// end
		if (noWorkproject && !firstClick) {
			$(".right-page").addClass('hide');
			$(".noproject").removeClass('hide');
			$(".noproject").addClass('set-width');
			// $(".indentlisthistory").show();
			// $(".indent-more-add").removeClass('circle-180');
		} else {
			$(".noproject").addClass('hide');
			$(".right-page").removeClass('hide');
		}
		// load more component
		resetTime('');
		loadflowdata();
		loadfiledata(false);
		loadcommentdata(false);
		loadIndentInfo();
		loadSynerhyList();
		updateProjectTreeView();
	}, getContextPath() + '/mgr/projects/all-project', $.toJSON({}));
}