var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var currentIndex;

// add by guoyang, 2016-04-19 03:17 begin
// -> 添加时间变量
var oTimer;
//add by guoyang, 2016-04-19 03:17 end

$().ready(
		function() {
			init();
			loadprojecctlist(false,false);
			$(".flowbtn").on("click", function() {
				$("#toolbar-check").modal('show');
				$(".check-step").html("请确认本阶段所有步骤已经完成<br/>即将进入下个阶段,您确定吗？");
				setModalEvent(nextFlow);
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

			$(".newBtn").on("click",function() {
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
//						window.location.href = getContextPath()
//								+ "/mgr/projects/upadte-view";
						submitForm();
			});
			$("#canclestep").on('click',function(){
				$("#toolbar-check").modal('hide');
			});
			$("#new-project").on('click',function(){
				window.location.href = getContextPath()
				+ "/mgr/flow/add-view";
			});
			$("#project-report").on('click',function(){
				window.location.href = getContextPath()
				+ "/mgr/projects/get/report";
			});
			$(".canclemodal").on('click',function(){
				$('#toolbar-modal').modal('hide');
			});
			$("#toolbar-no-message-btn").on('click',function(){
				$("#toolbar-no-message").modal('hide');
				$(".check-message").text("错误！");
			});
		});

function submitForm(){
	var key=getCurrentProject();
	//var body=$("body");
	var path=getContextPath()+ "/mgr/projects/upadte-view";
	var form=$("<form action='"+path+"' method='post' id='submitkey' style='display: none;'></form>");
	var input=$("<input type=\"text\" name=\"key\" style=\"display: none\">");
	input.val(key);
	form.append(input);
	form.submit().remove();
}
function init() {
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
		//添加文件验证
		// office doc docx xls xlsx ppt pptx pdf
		// mp4 avi txt esp jpg mov mp3 png rar wav zip
		
		//添加文件验证
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
		var file = $("#addfile").val();
		var tag = $("#input-value").val();
		if (file != null&&file!='' && tag != '') {
			var res=uploadfile();
			// modify by guoyang, 2016-04-19 03:11 begin
			$('#toolbar-modal').modal('hide');
			$("#upload-file-name").val("");
			oTimer = setInterval("getProgress()", 500);
			$('.progress-bar-success').text('0')
			$('.progress-bar-success').attr('aria-valuenow','0').css({"width":'0%'});
			$('#mymodal').modal('show');
			// modify by guoyang, 2016-04-19 03:11 end
		} else {
			showAlert(errorNotNull);
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
	$("#upload-file-name").val("");
	$("#input-value").val("");
});

$('#cancle-img').click(function() {
	$('#toolbar-modal').modal('hide');
	$("#upload-file-name").val("");
	$("#input-value").val("");
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
		$("#toolbar-check").modal('hide');
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
	$("#toolbar-check").modal('show');
	$(".check-step").text("您确定要取消项目吗？");
	setModalEvent(cancel);
}
function cancel() {
	var key = getCurrentProject();
	loadData(function(msg) {
		$("#toolbar-check").modal('hide');
		loadprojecctlist(false,true);
	}, getContextPath() + '/mgr/projects/cancelProject', $.toJSON({
		id : key
	}));
}
//暂停按钮
function pauseBtn() {
	$("#toolbar-check").modal('show');
	$(".check-step").text("您确定要暂停项目吗？");
	setModalEvent(pause);
}
//恢复按钮
function resumeBtn() {
	$("#toolbar-check").modal('show');
	$(".check-step").text("您确定要恢复项目吗？");
	setModalEvent(resume);
}
function pause() {
	var key = getCurrentProject();
	loadData(function(msg) {
		$("#toolbar-check").modal('hide');
		loadflowdata();
	}, getContextPath() + '/mgr/flow/suspendProcess', $.toJSON({
		id : key
	}));
}
function resume() {
	var key = getCurrentProject();
	loadData(function(msg) {
		$("#toolbar-check").modal('hide');
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
		showAlert(errorNotNull);
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
			// delete by guoyang, 2016-04-19 04:19 begin
			//$('.circle-div').hide();
			//$('.circle-img').hide();
			//$('#toolbar-modal').modal('hide');
			// delete by guoyang, 2016-04-19 04:19 end
			loadfiledata(false);
			// add by guoyang, 2016-04-19 03:19 begin
			// -> 停止计时器
			window.clearInterval(oTimer); // 停止计时器
			$('#mymodal').modal('hide');
			$("#input-value").val("");
			$("#upload-file-name").val("");
			// add by guoyang, 2016-04-19 03:19 end
		},
		error : function(data, status, e) {
		}
	});
	return true;

}
//加载文件模块
function loadfiledata(more) {
var key = getCurrentProject();
loadData(
	function(msg) {
		var tab = $(".file-table");
		tab.html("");
		if(msg.length==0){
			tab.html("<div class=\"file-div\"><img  class=\"nofile\" src=\"/resources/img/flow/nofile.png\"/></div>");
			$(".more-file-btn").hide();
		}
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
					src+='ppt.png';
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
			var div2=$("	<div class=\"div-table-file-type\"><div class=\"file-name\">"+ msg[i].irOriginalName +
					"</div><div class=\"file-type\">"+msg[i].irtype+"</div></div>");
			var userNameView="";
			if(msg[i].userViewModel!=null){
				userNameView=msg[i].userViewModel.userName;
			}else{
				userNameView="";
			}
			var lookA=$("<a href='javascript:void(0);' target='_blank'></a>");
			var chakan=$("<img class=\"qrcode-img div-table img-look\"" +
					"src=\"/resources/img/flow/look.png\" data-state='"+msg[i].state+"'  data-url='"+msg[i].irId+"'  id='chakan"+msg[i].irId+"'>");
			lookA.append(chakan);
			var fenxiang=$("<img class=\"qrcode-img div-table img-margin img-share \"" +
					"src=\"/resources/img/flow/share.png\" data-state='"+msg[i].state+"' data-url='"+msg[i].irId+"' />");
			var xiazai=$("<img src=\"/resources/img/flow/download.png\"/>");
			
			lookA.on("mouseenter",function(){
				jQuery(this).find("img").attr("src",'/resources/img/flow/lookbg.png');
			});
			lookA.on("mouseleave",function(){
				jQuery(this).find("img").attr("src",'/resources/img/flow/look.png');
			});
			chakan.on('click',function(){
				var self=jQuery(this);
				var state=jQuery(this).attr("data-state");
				var fileId=jQuery(this).attr("data-url");
				var key=getCurrentProject();
				var a=jQuery(this).parent();
				switch (state) {
				case 'transformation':
					syncLoadData(function(msg){
						switch (msg.state) {
						case 'transformation':
							a.attr('href','javascript:void(0);');
							showAlert(errorTransformation);
							break;
						case 'finish':
							var state=jQuery(this).attr("data-state","finish");
							self.next().attr("data-state","finish");
							jumpView(fileId,a);
							break;
						case 'fail':
							break;
						}
					}, getContextPath() + '/mgr/resource/get/state', $.toJSON({
						irId : fileId,
						irIndentId:key
					}));
					break;
				case 'finish':
					jumpView(fileId,a);
					break;
				case 'fail':
					break;
				}
			});
			
			fenxiang.on("mouseenter",function(){
				jQuery(this).attr("src",'/resources/img/flow/sharebg.png');
			});
			fenxiang.on("mouseleave",function(){
				jQuery(this).attr("src",'/resources/img/flow/share.png');
			});
			fenxiang.on("click",function(){
				var self=jQuery(this);
				var state=jQuery(this).attr("data-state");
				var fileId=jQuery(this).attr("data-url");
				var key=getCurrentProject();
				switch (state) { 
				case 'transformation':
					syncLoadData(function(msg){
						switch (msg.state) {
						case 'transformation':
							showAlert(errorTransformation);
							break;
						case 'finish':
							var state=jQuery(this).attr("data-state","finish");
							self.prev().attr("data-state","finish");
							jumpShare(fileId);
							break;
						case 'fail':
							break;
						}
					}, getContextPath() + '/mgr/resource/get/state', $.toJSON({
						irId : fileId,
						irIndentId:key
					}));
					break;
				case 'finish':
					jumpShare(fileId);
					break;
				case 'fail':
					break;
				}
			});
			xiazai.on("mouseenter",function(){
				jQuery(this).attr("src",'/resources/img/flow/downloadbg.png');
			});
			xiazai.on("mouseleave",function(){
				jQuery(this).attr("src",'/resources/img/flow/download.png');
			});
			
			var div3=$("<div class=\"div-table \"><p class=\"file-user-name\">"+userNameView+
					"</p><p class=\"file-time\">上传于<strong>"+ msg[i].irCreateDate+"</strong></p></div>");
			var div4=$("<div class=\"qrcode-td div-table\"></div>");
			div4.append(lookA);
			div4.append(fenxiang);
			var div5=$("<div class=\"div-download\"></div>");
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
			
			if(!more && i>=4){
				break;
			}
		}
	}, getContextPath() + '/mgr/comment/getResourceList', $.toJSON({
				id : key
}));
}
function jumpView(fileId,a) {
	var link= getHostName() + getContextPath();
	syncLoadData(function(msg) {
		link+="/portal/project/doc/"+msg.url;
		a.attr("href",link);
	}, getContextPath() + '/mgr/doc/getDocView', $.toJSON({
		irId : fileId
	}));
}
function jumpShare(fileId) {
	syncLoadData(function(msg) {
		var fileName=msg.url;
		var extName=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
		var link= getHostName() + getContextPath();
		if(extName=='mp4'){
			link+="/mgr/doc/video/"+msg.url;
		}else{
			link+="/portal/project/doc/"+msg.url;
		}
		$('#share-open').click();
		share.init(link, 'hehe', getContextPath() + '/resources/banner/flex1.jsp');
	}, getContextPath() + '/mgr/doc/getDocView', $.toJSON({
		irId : fileId
	}));
}
//加载评论模块
function loadcommentdata(more) {
	var key = getCurrentProject();
	loadData(
		function(msg) {
			var tab = $(".message-table");
			tab.html("");
			if(msg.length==0){
				tab.html(" <img  class=\"nomessage\" src=\"/resources/img/flow/nomessage.png\"/>");
				$(".more-comment").hide();
			}
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
						+ "</label><label class=\"msg-comm-time\">"+msg[i].icCreateDate.split(' ')[0]+"</label></td>");
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
		var tab2=$(".indentlisthistory");
		tab.html("<tr><td class='indent-more'>正在进行</td></tr>");
		tab2.html("");
		var currentprojectkey = '';
		if(msg.length<=0){
			$(".left-page").hide();
			$(".right-page").hide();
			$(".noproject").removeClass('hide');
		}else{
			$(".left-page").show();
			$(".right-page").show();
			$(".noproject").addClass('hide');
		}
		for (var i = 0; i < msg.length; i++) {
			var tr = $("<tr></tr>");
			var td = $("<td ></td>");
			var stateStr=msg[i].state;
			if (i == 0 && !more && getCurrentProject() == null&&stateStr==0) {
				putCurrentProject(msg[i].id);
				currentprojectkey = msg[i].id + '';
				if(stateStr == 1 || stateStr == 2)
					state=true;
			}else if(msg[i].id==getCurrentProject()){
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
			if(msg[i].state)
				tab2.append(tr);
			else
				tab.append(tr);	
		}
		var tr = $("<tr></tr>");
		var td = $("<td class='indent-more'>历史回顾</td>");
		//change + to big by lt 
		//var tdimg = $("<td class='indent-more-icon'>+</td>");
		//
        var tdimg = $("<td class='indent-more-add'>+</td>");

        tr.on('click',function(){
			var tlist=$(".indentlisthistory");
			var display=$(tlist).css('display');
			if(display=='none'){
				tlist.show();
				$(".indent-more-add").html('-');
			}else{
				tlist.hide();
				$(".indent-more-add").html('+');
			}
		});
		tr.append(td);
		tr.append(tdimg);
		tab.append(tr);
		
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
	$(".indentlisthistory tr td a").each(function(index) {
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
	$("#btndiv-id").hide();
	$("#upload-info-btn-id").hide();
	$("#upload-file-btn-id").hide();
	$(".comment").hide();
	$(".comment-btn").hide();
	
	$(".more-file-btn").shwo();
	$(".more-comment").shwo();
}
//未完成项目样式
function show() {
	$("#btndiv-id").show();
	$("#upload-info-btn-id").show();
	$("#upload-file-btn-id").show();
	$(".comment").show();
	$(".comment-btn").show();
}
//获取当前进行中的项目 cookie-->currentproject
function getCurrentProject() {
	//return $.cookie('currentproject');
	var service_val=$("#service-key").val();
	var loca_val=$("#loca-key").val();
	if(service_val==null||service_val==''){
		if(loca_val!=null&&loca_val!=''){
			putCurrentProject(loca_val);
			return loca_val;
		}else{
			return null;
		}
	}else{
		return service_val;
	}
}
//设置当前项目
function putCurrentProject(key) {
	//$.cookie("currentproject", key + '');
	$("#service-key").val(key+"");
	$("#loca-key").val(key+"");
}
/**
 * 
 * 流程相关回掉实现
 */
// 点击
function mycall(restult) {
	// alert("mycall"+result.value+":"+result.text);
	//StepTool.drawStep(result.value, stepListJson);
}
// 移入
function mouseenter(restult) {
	//console.log("in" + restult.value);
}
// 移出
function mouseleave(restult) {
	//console.log("out" + restult.value);
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
var errorTransformation='文档转换中，请稍后！';
var errorNotNull='输入内容不能为空';
var errorNotNull='输入内容不能为空';
function showAlert(message){
	$(".check-message").text(message);
	$("#toolbar-no-message").modal('show');
}
// add by guoyang, 2016-04-19 03:14 begin
// -> 添加进度条显示
function getProgress() {
	var now = new Date();
	loadData(function(data){
		var progress = Number((data.pBytesRead / data.pContentLength) * 100).toFixed(0) + '%';
		$('.progress-bar-success').text('已完成' + progress)
		$('.progress-bar-success').attr('aria-valuenow',progress).css({"width":progress});
	}, getContextPath() + '/upfile/progress', now.getTime());
}
// add by guoyang, 2016-04-19 03:14 end
Array.prototype.contains = function(element) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == element) {  
            return true;  
        }  
    }  
    return false;  
}
