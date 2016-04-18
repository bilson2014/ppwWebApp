var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var currentIndex;
$().ready(
		function() {
			init();
			loadprojecctlist(false,false);
			$(".flowbtn").on("click", function() {
				$("#toolbar-check").modal('show');
				setModalEvent(nextFlow());
			});
			$(".cancle-margin").on("click",function(){
				$("#toolbar-check").modal('hide');
			});
			$(".more-file-btn").on("click", function() {
				loadfiledata(true);
				$(".more-file-btn").hide();
			});
			$(".comment-btn").on("click", function() {
				submitcomment();
			});
			$(".more-comment").on("click", function() {
				loadcommentdata(true);
				$(".more-comment").hide();
			});

			$(".newBtn").on(
					"click",
					function() {
						window.location.href = getContextPath()
								+ "/mgr/flow/add-view";
					});

			$(".pausebtn").on("click", function() {
				pauseBtn();
			});
			$(".cancelbtn").on("click", function() {
				cancelBtn();
			});

			$("#upload-info-btn-id").on(
					"click",
					function() {
						window.location.href = getContextPath()
								+ "/mgr/projects/upadte-view";
			});
		});
function init() {
	$('.circle-div').hide();
	$('.circle-img').hide();
	
	$("#input-value").click(function() {
		var select_lis = document.getElementById("ul-select")
				.getElementsByTagName("li");
		$("#ul-select").css("visibility", "visible");
		isShow = true;
		for (i = 0; i < select_lis.length; i++) {
			select_lis[i].onclick = function() {
				document.getElementById("input-value").value = this.innerHTML;
				$("#ul-select").css("visibility", "hidden");
			}
		}
	});

	$("#upload-btn-id").click(function() {
		$("#addfile").click();
		$("#addfile").change(function() {
			var file = $("#addfile").val();
			var fileName = getFileName(file);
			// $("#upload-file-name").var(fileName)
			document.getElementById("upload-file-name").value = fileName;
			// uploadfile();
		});
	});
	$(".select-true-btn").on('click', function() {
		$('.circle-div').show();
		$('.circle-img').show();
		var file = $("#addfile").val();
		var tag = $("#input-value").val();
		if (file != null && tag != '未选择') {
			uploadfile();
		} else {
			alert("请完善信息");
		}
	});
	
	function getFileName(o) {
		var pos = o.lastIndexOf("\\");
		return o.substring(pos + 1);
	}
	$("#upload-file-btn-id").click(function() {
		$('#toolbar-modal').modal('show');
	});

	$('#cancle-btn').click(function() {
		$('#toolbar-modal').modal('hide');
	});

	$('#cancle-img').click(function() {
		$('#toolbar-modal').modal('hide');
	});
	$('.modal').on('click', function() {
		if (checkHidden) {
			checkHidden = false;
			$("#ul-select").css("visibility", "hidden");
		}
		if (isShow) {
			isShow = false;
			checkHidden = true;
		}
	});
	
	loadFileTags();
	getBtnWidth();
}
function nextFlow(){
	var key = getCurrentProject();
	loadData(function(msg) {
		loadprojecctlist(false,false);
	}, getContextPath() + '/mgr/flow/completeTask', $.toJSON({
		id : key
	}));
}
function setModalEvent(Confirm){
	$(".sure-margin").off('click');
	$(".sure-margin").on('click',Confirm);
}
function getBtnWidth(){
	  //var select_btn = document.getElementById("btndiv-id").getElementsByTagName("button");
var select_btn = $('#btndiv-id').find('button');
	if(select_btn.length==1){
		$(".flowbtndiv").css("width","105");
	}
	else if(select_btn.length>1){
		var width=110*select_btn.length+20*(select_btn.length-1);
		$(".flowbtndiv").css("width",width);
	}
}
//加载文件类型
function loadFileTags() {
	loadData(function(msg) {
		var ul = $("#ul-select");
		$(ul).html("");
		for (var int = 0; int < msg.length; int++) {
			var li = $("<li>" + msg[int] + "</li>");
			$(ul).append(li);
		}
	}, getContextPath() + '/mgr/comment/getTags', $.toJSON({}));
}
//取消按钮
function cancelBtn() {
	var key = getCurrentProject();
	loadData(function(msg) {
		alert(msg);
		loadprojecctlist(false,true);
	}, getContextPath() + '/mgr/projects/cancelProject', $.toJSON({
		id : key
	}));
}
//暂停按钮
function pauseBtn() {
	var key = getCurrentProject();
	loadData(function(msg) {
		loadflowdata();
	}, getContextPath() + '/mgr/flow/suspendProcess', $.toJSON({
		id : key
	}));
}
//恢复按钮
function resumeBtn() {
	var key = getCurrentProject();
	loadData(function(msg) {
		loadflowdata();
	}, getContextPath() + '/mgr/flow/resumeProcess', $.toJSON({
		id : key
	}));
}
//提交评论
function submitcomment() {
	var key = getCurrentProject();
	var comment = $(".comment").val();
	if (comment == null || comment == '') {
		alert("不能为空")
		return;
	}
	loadData(function(msg) {
		$(".comment").val("");
		loadcommentdata(false);
	}, getContextPath() + '/mgr/comment/addComment', $.toJSON({
		icContent : comment,
		icIndentId : key
	}));
}
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
										$(".description-c").html("<p>"+ text+ "</p>");
										$(".content-title").html("<p>"+ jQuery(this.target).text()+ "阶段</p>");
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
function resetTime(mode) {
	if(mode!='curr'){
		$("div[id^='et_']").html("");
		$("div[id^='cu_']").html("");
		$("div[id^='cu_']").removeClass('get-step');
	}else{
		$("div[id^='cu_']").removeClass('get-step');
	}
}
//上传文件
function uploadfile() {
	var key = getCurrentProject();
	var tag = $("#input-value").val();
	$.ajaxFileUpload({
		url : getContextPath() + '/mgr/resource/addResource',
		secureuri : true,
		fileElementId : [ 'addfile' ],
		dataType : 'text/html',
		data : {
			id : key,
			tag : tag
		},
		success : function(data) {
			$('.circle-div').hide();
			$('.circle-img').hide();
			$('#toolbar-modal').modal('hide');
			loadfiledata(false);
		},
		error : function(data, status, e) {
			alert(data);
		}
	});

}
//加载文件模块
function loadfiledata(more) {
var key = getCurrentProject();
loadData(
	function(msg) {
		var tab = $(".file-table");
		tab.html("");
		for (var i = 0; i < msg.length; i++) {
			var name=msg[i].irOriginalName;
			var divRoot=$("<div class=\"file-div\"></div>");
			var fileName=name.lastIndexOf(".");
			var finalName=name.substring(fileName+1);
			var src='/resources/img/flow/';
			switch (finalName) {
				case 'doc':
				case 'docx':
					src+='doc.png';
					break;
				case 'xls':
				case 'xlsx':
					src+='xls.png';
					break;
				case 'ppt':
				case 'pptx':
					src+='';
					break;
				case 'pdf':
					src+='pdf.png';
					break;
				case 'txt':
					src+='txt.png';
					break;
					
				case 'avi':
					src+='avi.png';
					break;
				case 'esp':
					src+='esp.png';
					break;	
				case 'jpg':
					src+='jpg.png';
					break;	
				case 'mov':
					src+='mov.png';
					break;
				case 'mp3':
					src+='mp3.png';
					break;
				case 'mp4':
					src+='mp4.png';
					break;
				case 'png':
					src+='png.png';
					break;
				case 'rar':
					src+='rar.png';
					break;
				case 'wav':
					src+='wav.png';
					break;
				case 'zip':
					src+='zip.png';
					break;
				default:
					src+='file.png';
					break;
			}
			var fileimg=$("<img class=\"img-icon\" id=\"img-icon-id\"src='"+src+"'>");
			var div1=$("<div class=\"file-icon div-table\"></div>");
			div1.append(fileimg);
			var div2=$("	<div class=\"div-table\"><div class=\"file-name\">"+ msg[i].irOriginalName +
					"</div><div class=\"file-type\">"+msg[i].irtype+"</div></div>");
			var userNameView="";
			if(msg[i].userViewModel!=null){
				userNameView=msg[i].userViewModel.userName;
			}else{
				userNameView="";
			}
			var chakan=$("<img class=\"qrcode-img div-table img-look\"" +
					"src=\"/resources/img/flow/look.png\"  data-url='"+msg[i].irId+"'  id='chakan"+msg[i].irId+"'>");
			var fenxiang=$("<img class=\"qrcode-img div-table img-margin img-share \"" +
					"src=\"/resources/img/flow/share.png\" data-url='"+msg[i].irId+"' />");
			var xiazai=$("<img src=\"/resources/img/flow/download.png\"/>");
			
			chakan.on("mouseenter",function(){
				jQuery(this).attr("src",'/resources/img/flow/lookbg.png');
			});
			chakan.on("mouseleave",function(){
				jQuery(this).attr("src",'/resources/img/flow/look.png');
			});
			chakan.on('click',function(){
				var fileId=jQuery(this).attr("data-url");
				loadData(function(msg) {
					var link="/portal/project/doc/"+msg.url;
					window.location.href = link;
				}, getContextPath() + '/mgr/doc/getDocView', $.toJSON({
					irId : fileId
				}));
			});
			
			fenxiang.on("mouseenter",function(){
				jQuery(this).attr("src",'/resources/img/flow/sharebg.png');
			});
			fenxiang.on("mouseleave",function(){
				jQuery(this).attr("src",'/resources/img/flow/share.png');
			});
			fenxiang.on("click",function(){
				var fileId=jQuery(this).attr("data-url");
				loadData(function(msg) {
					var link= getHostName() + getContextPath() + "/portal/project/doc/"+msg.url;
					$('#share-open').click();
					share.init(link, 'hehe', getContextPath() + '/resources/banner/flex1.jsp');
				}, getContextPath() + '/mgr/doc/getDocView', $.toJSON({
					irId : fileId
				}));
			});
			xiazai.on("mouseenter",function(){
				jQuery(this).attr("src",'/resources/img/flow/downloadbg.png');
			});
			xiazai.on("mouseleave",function(){
				jQuery(this).attr("src",'/resources/img/flow/download.png');
			});
			
			var div3=$("<div class=\"div-table div-table-margin\"><p class=\"file-user-name\">"+userNameView+
					"</p><p class=\"file-time\">上传于<strong>"+ msg[i].irCreateDate+"</strong></p></div>");
			var div4=$("<div class=\"qrcode-td div-table\"></div>");
			div4.append(chakan);
			div4.append(fenxiang);
			var div5=$("<div class=\"div-table\"></div>");
			var downloada=$("<a href=\""
					+ getContextPath()
					+ '/mgr/getFile/'
					+ msg[i].irId
					+ "\"></a>");
			downloada.append(xiazai);
			div5.append(downloada);
			divRoot.append(div1);
			divRoot.append(div2);
			divRoot.append(div3);
			divRoot.append(div4);
			divRoot.append(div5);
			tab.append(divRoot);
		}
	}, getContextPath() + '/mgr/comment/getResourceList', $.toJSON({
				id : key
}));
}
//加载评论模块
function loadcommentdata(more) {
	var key = getCurrentProject();
	loadData(
		function(msg) {
			var tab = $(".message-table");
			tab.html("");
			for (var i = 0; i < msg.length; i++) {
				var tr = $("<tr></tr>");
				var imgx=$("<img class=\"message-portrait-img\""
						+ " src=\"/resources/img/flow/file.png\">");
				var td1 = $("<td class=\"message-portrait\" rowspan=\"2\"></td>");

				var user = msg[i].userViewModel;
				var text = "未知";
				if (user != null) {
					imgx.attr("src",user.imgUrl);
					text = user.userName;
				}
				td1.append(imgx);
				var td2 = $("<td><label class=\"msg-comm-name\">"
						+ text
						+ "</label><label class=\"msg-comm-time\">1个小时前</label></td>");
				tr.append(td1);
				tr.append(td2);
				tab.append(tr);

				var tr2 = $("<tr></tr>");
				var td2_1 = ("<td>" + msg[i].icContent + "</tf>");
				tr2.append(td2_1);

				tab.append(tr2);

				if (!more && i == 2)
					break;
			}
		}, getContextPath() + '/mgr/comment/getAllComment', $.toJSON({
			id : key
	}));
}
//加载项目列表
function loadprojecctlist(more,state) {
	loadData(function(msg) {
		var tab = $(".indentlist");
		tab.html("");
		var currentprojectkey = '';
		for (var i = 0; i < msg.length; i++) {
			var tr = $("<tr></tr>");
			var td = $("<td ></td>");
			if (i == 0 && !more && getCurrentProject() == null) {
				putCurrentProject(msg[i].id);
				currentprojectkey = msg[i].id + '';
				var stateStr=msg[i].state;
				if(stateStr == 1 || stateStr == 2)
					state=true;
			}else if(msg[i].id==getCurrentProject()){
				var stateStr=msg[i].state;
				if(stateStr == 1 || stateStr == 2)
					state=true;
			}
			var a = $("<a class=\"indent-a\" data-state=" + msg[i].state
					+ " data-value=" + msg[i].id + ">");
			$(a).on("click", function() {
				var key = $(this).attr("data-value");
				putCurrentProject(key);
				var state=jQuery(this).attr('data-state');
				if (state == 1 || state == 2)
				{
					loadprojecctlist(false,true);
				}else{
					loadprojecctlist(false,false);
				}
			});
			a.append("&nbsp;&nbsp;");
			a.append(msg[i].projectName);
			td.append(a);
			tr.append(td);
			tab.append(tr);
			if (!more && i == 10) {
				break;
			}
		}
	// load more component
	resetTime('');
	loadflowdata();
	loadfiledata(false);
	loadcommentdata(false);
	loadIndentInfo();
	updateProjectTreeView();
	if(state) finish(); else show();
	}, getContextPath() + '/mgr/projects/all-project', $.toJSON({}));

}
//加载项目列表视图
function updateProjectTreeView() {
	$(".indentlist tr td a").each(function(index) {
		num = jQuery(this).attr("data-value");
		var key = getCurrentProject();
		if (num == key) {
			jQuery(this).attr("class", "indent-selected");

			// var editImg = $("<img class='indent-ednt-btn'
			// src=\"/resources/img/flow/edit.png\"/>");
		} else {
			jQuery(this).attr("class", "indent-a");
			jQuery(this).next().remove();
		}
	});
}
//加载项目基础信息
function loadIndentInfo() {
	var key = getCurrentProject();
	if (key != null && key != undefined && key != '') {

		loadData(function(msg) {
			// get
			var projectId = $(".projectId");
			var projectName = $(".projectName");
			var userName = $(".userName");
			var teamName = $(".teamName");
			var userContact = $(".userContact");
			var teamContact = $(".teamContact");
			var userPhone = $(".userPhone");
			var teamPhone = $(".teamPhone");
			var viedoPrice = $(".viedoPrice");
			var description=$(".indent-area");
			// clear
			$(projectId).text("");
			$(projectName).text("");
			$(userName).text("");
			$(teamName).text("");
			$(teamContact).text("");
			$(userContact).text("");
			$(userPhone).text("");
			$(teamPhone).text("");
			$(viedoPrice).text("");
			// assignment
			$(projectId).text(msg.serial);
			$(projectName).text(msg.projectName);
			$(userName).text(msg.userName);
			$(teamName).text(msg.teamName);
			$(teamContact).text(msg.teamContact);
			$(userContact).text(msg.userContact);
			$(userPhone).text(msg.userPhone);
			$(teamPhone).text(msg.teamPhone);
			$(viedoPrice).text(msg.price + '万元');
			$(description).text(msg.description);

		}, getContextPath() + '/mgr/projects/get-projectInfo', $.toJSON({
			id : key
		}));
	}
}
//完成项目页面样式
function finish() {
	$(".flowbtn").hide();
	$(".pausebtn").hide();
	$(".cancelbtn").hide();
	$("#upload-info-btn-id").hide();
	$("#upload-file-btn-id").hide();
	$(".comment").hide();
	$(".comment-btn").hide();
}
//未完成项目样式
function show() {
	$(".flowbtn").show();
	$(".pausebtn").show();
	$(".cancelbtn").show();
	$("#upload-info-btn-id").show();
	$("#upload-file-btn-id").show();
	$(".comment").show();
	$(".comment-btn").show();
}
//获取当前进行中的项目 cookie-->currentproject
function getCurrentProject() {
	return $.cookie('currentproject');
}
//设置当前项目
function putCurrentProject(key) {
	$.cookie("currentproject", key + '');
}
/**
 * 
 * 流程相关回掉实现
 */
// 点击
function mycall(restult) {
	// alert("mycall"+result.value+":"+result.text);
	StepTool.drawStep(result.value, stepListJson);
}
// 移入
function mouseenter(restult) {
	console.log("in" + restult.value);
}
// 移出
function mouseleave(restult) {
	console.log("out" + restult.value);
}
// 获取当前时间
function getCurrentTime() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + day;
}
//时间比较
function dateCompare(date1, date2) {
	var time1 = date1.replace(/-/g, "/");
	var date1 = new Date(time1);
	var time2 = date2.replace(/-/g, "/");
	var date2 = new Date(time2);
	if (date1.getTime() >= date2.getTime())
		return true;
	else
		return false;
}
