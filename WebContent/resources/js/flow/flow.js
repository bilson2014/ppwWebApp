var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var currentIndex;
var hasClick =false;
var nowImg=2;
var countCheck = 0;


// add by guoyang, 2016-04-19 03:17 begin
// -> 添加时间变量
var oTimer;
//add by guoyang, 2016-04-19 03:17 end



$().ready(
		function() {

			init();
			showOrderTime();
			loadprojecctlist();
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

			$("#upload-info-btn-id").on("click",function() {
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
			
			$(".prev-task").on("click",function(){
				PrevTaskBtn();
			});
			
			ControlPay.initControlPay();
			
			
			
		});

function submitForm(){
	var key=getCurrentProject();
	var path=getContextPath()+ "/mgr/projects/upadte-view";
	var formBody = '<form action="'+path+'" method="post" oncomplete="false" id="submitkey" style="display: none;">';
	formBody += '<input type="text" name="key" value="'+ key +'" style="display: none">';
	formBody += '</form>';
	$('#upload-info-btn-id').append(formBody);
	$('#submitkey').submit().remove();
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
	if(key != null ){
		loadData(function(msg) {
			loadprojecctlist();
			$("#toolbar-check").modal('hide');
		}, getContextPath() + '/mgr/flow/completeTask', $.toJSON({
			id : key
		}));
	}
}
function setModalEvent(Confirm){
	$(".sure-margin").off('click');
	$(".sure-margin").on('click',Confirm);
}
function getBtnWidth(){
	  //var select_btn = document.getElementById("btndiv-id").getElementsByTagName("button");
	var select_btn = $('#btndiv-id').find('button');
	var count=0;
	for (var int = 0; int < select_btn.length; int++) {
		var value=$(select_btn[int]).css('display');
		if(value!='none')
			count++;
	}
	var width = 0;
	if(count==1){
		width = 105;
	}
	else if(count == 2){
		width=108*count+24*(count - 1) + 30;
	}
	else if(count > 2){
		width=108*count+24*(count - 1) + 4;
	}
	$(".flowbtndiv").css("width",width);
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
	noWorkproject=false;
	setModalEvent(cancel);
}
function cancel() {
	var key = getCurrentProject();
	if(key != null ){
		loadData(function(msg) {
			$("#toolbar-check").modal('hide');
			loadprojecctlist();
		}, getContextPath() + '/mgr/projects/cancelProject', $.toJSON({
			id : key
		}));
	}
}
function PrevTaskBtn() {
	$("#toolbar-check").modal('show');
	$(".check-step").text("您确定要回退到上一步吗？");
	setModalEvent(PrevTask);
}
function PrevTask(){
	var key=getCurrentProject();
	if(key != null ){
		loadData(function(msg) {
			loadprojecctlist();
			$("#toolbar-check").modal('hide');
		}, getContextPath() + '/mgr/flow/jumpPrevTask', $.toJSON({
			id : key
		}));
	}
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
	if(key != null ){
		loadData(function(msg) {
			$(".flowbtn").hide();
			$(".prev-task").hide();
			getBtnWidth();
			$("#toolbar-check").modal('hide');
			loadprojecctlist();
		}, getContextPath() + '/mgr/flow/suspendProcess', $.toJSON({
			id : key
		}));
	}
}
function resume() {
	var key = getCurrentProject();
	if(key != null ){
		loadData(function(msg) {
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
			$(".flowbtn").show();
			$(".prev-task").show();
			getBtnWidth();
			$("#toolbar-check").modal('hide');
			loadprojecctlist();
		}, getContextPath() + '/mgr/flow/resumeProcess', $.toJSON({
			id : key
		}));
	}
}

//提交评论
function submitcomment() {
	var key = getCurrentProject();
	if(key != null ){
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
}
//加载流程模块
function loadflowdata() {
	var key = getCurrentProject();
	if(key != null){
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
						}else{
							$("#et_" + msg[i].taskDefinitionKey).text(
									'未设置');
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
						$("#stepword_" + msg.taskDefinitionKey).text("进行中");
						var et_date = $("#et_" + msg.taskDefinitionKey)
								.text();
						var overdue = dateCompare(getCurrentTime(), et_date);
						if (overdue) {
							resetTime('curr');
							$("#stepword_" + msg.taskDefinitionKey).addClass(
									'timeout');
						}else{
							resetTime('curr');
	                        $("#stepword_" + msg.taskDefinitionKey).addClass(
									'doing');
						}
						
						//设置步骤状态
						var lablearray=$("li[id^='stepword_']");
						for (var int = 0; int < lablearray.length; int++) {
							var currLable=lablearray[int];
							var id='stepword_'+msg.taskDefinitionKey;
							if(id==currLable.id){
								break;
							}
							$(currLable).text('完成');
						}
						
						var times=$("li[id^='cu_']");
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
								if(parseInt(num)==1){
									$('.prev-task').addClass('hide');
								}else{
									$('.prev-task').removeClass('hide');
								}
								StepTool.drawStep(num, stepListJson);
								currentIndex = num;
							    
								//TODO:lt add payList beigin 20160622
								
								if(currentIndex==3||currentIndex==5){
								$('#managerId').removeClass('hide')
								$('#cusId').removeClass('hide');
								}
								else{
									$('#managerId').addClass('hide')
									$('#cusId').addClass('hide');
									$('#payListPage').html('');
									$('#payInfo').slideUp('');
									
								}
								//end
								
								return;
							}
						});
						//暂停状态
						if (msg.suspended) {
							$(".flowbtn").hide();
							$(".prev-task").hide();
							$(".pausebtn").text("恢复");
							$(".flowbtn").removeClass('red-btn');
							$(".pausebtn").removeClass('gray-btn');
							$(".pausebtn").addClass('red-btn');
							$(".flowbtn").addClass('gray-btn');
							$(".pausebtn").off("click");
							//配置按钮功能为恢复项目运行
							$(".pausebtn").on("click", function() {
								resumeBtn();
							});
						}else{
							$(".flowbtn").show();
							$(".prev-task").show();
							$(".pausebtn").text("暂停");
							$(".flowbtn").removeClass('gray-btn');
							$(".pausebtn").removeClass('red-btn');
							$(".pausebtn").addClass('gray-btn');
							$(".flowbtn").addClass('red-btn');
							$(".pausebtn").off("click");
							$(".pausebtn").on("click", function() {
								pauseBtn();
							});
						}
						getBtnWidth();
						if (msg.name.trim() == '任务不存在') {
							StepTool.drawStep(num, stepListJson);
							currentIndex = num;
							finish();
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
}

function resetTime(mode) {
	if(mode!='curr'){
		$("dd[id^='et_']").html("");
		$("dd[id^='cu_']").html("");
		$("li[id^='stepword_']").html('未完成');
		$("li[id^='stepword_']").removeClass('timeout');
		$("li[id^='stepword_']").removeClass('doing');
	}else{
		
		$("li[id^='stepword_']").removeClass('timeout');
		$("li[id^='stepword_']").removeClass('doing');
		
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
			// delete by guoyang, 2016-04-19 04:19 end
			loadfiledata(false);
			loadcommentdata(false);
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
	if(key != null ){
		loadData(function(msg) {
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
				var lookA=$("<a href='javascript:void(0);' target='_blank' ></a>");
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
				//chakan.unbind('click');
				chakan.bind('click',function(){
					var state=jQuery(this).attr("data-state");
					var fileId=jQuery(this).attr("data-url");
					var key=getCurrentProject();
					var a=jQuery(this).parent();
					var self=jQuery(this);
					a.unbind('click');
					switch (state) {
					case 'transformation':
						syncLoadData(function(msg){
							switch (msg.state) {
							case 'transformation':
								a.bind('click',function(){
									return false;
								});
								a.attr('href','javascript:void(0);');
								showAlert(errorTransformation);
								break;
							case 'finish':
								var state=self.attr("data-state","finish");

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
					var self=jQuery(this);
					switch (state) {
					case 'transformation':
						syncLoadData(function(msg){
							switch (msg.state) {
							case 'transformation':
								showAlert(errorTransformation);
								break;
							case 'finish':
								var state=self.attr("data-state","finish");

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
	if(key != null ){
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
}
var firstClick=false;
var  noWorkproject=true;
//加载项目列表
function loadprojecctlist() {

	loadData(function(msg) {
		// 获取页面控件
		
		var doing = $("#myProjectId");
		var help=$("#helpProjectId");
		var pause=$("#pauseProjectId");
		var history=$("#historyProjectId");
		
		// 清空控件内容
		doing.html('');
		help.html('');
		pause.html('');
		history.html('');
		// 检测该管家是否拥有属于自己的项目（非协同项目以外的）
		
	    
		
		// 优先加载 协同人
		loadSynerhyList();
		var help=$("#helpProjectId").find('a');
		
		if(msg.length <= 0 &&  help.length <= 0){
			// ‘正常项目’ 和‘ 协同项目’ 都没有  --->隐藏全部内容，显示请新建项目
			$(".left-page").hide();
			$(".right-page").hide();
			$(".noproject").removeClass('hide');
			$(".noproject").removeClass('set-width');
			return ;
		}
		
		
		else{
			$(".noproject").addClass('hide');
		}
		// 遍历返回数据
		var currentprojectkey = '';
		var selectFirst=false;
		var state =false;
		
		if(help.length > 0){
			noWorkproject = true ;
		}
		
		
		// 加载属于我的项目 
		for (var i = 0; i < msg.length; i++) {
			var stateStr=msg[i].state;

			// 默认第一次选中
			// 当没有选中过项目，并且遍历的项目为正长状态下的第一个项目为默认选中项目
			if (!selectFirst  && getCurrentProject() == null && stateStr==0) {
				currentprojectkey = msg[i].id + '';
				//隐藏域 内储存ID
				putCurrentProject(currentprojectkey);
				selectFirst=true;
				noWorkproject =false;
				show();// 显示所有按钮

			}else if(msg[i].id==getCurrentProject()){
				
				
				//判断当前项目是历史项目
				if(stateStr == 1 || stateStr == 2){
					//确定当前状态觉决定是否显示
					finish();// 禁用所有按钮
				}
				
				else{
					noWorkproject =false;
					show();// 显示所有按钮
				}
			}
			//构造控件
			var liStar = $('<li></li>')
			var a = $('<a class="indent-a title-content" data-state=' + msg[i].state
					+ ' data-value="' + msg[i].id + '">'+msg[i].projectName+'</a>');
			//绑定点击事件
			$(a).on("click", function() {
				firstClick=true;
				// 取出ID
				var key = $(this).attr("data-value");
				// 设置当前选中项目ID
				putCurrentProject(key);
				
				var state=jQuery(this).attr('data-state');
				loadprojecctlist();
			});
			liStar.append(a);
			// 选择添加到那个view
			switch (msg[i].state) {
			case 0:
				doing.append(liStar);
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
		//if has histroy project but no working project show window（！）
		
		
		//TODO:
	//选中第一个项目 负责》暂停》协同 lt 20160608
	//begin	
	 if(!hasClick){
	   var myList = $('#myProjectId li').length;
	   if(myList==0||myList==undefined){
		   var nowContent;
		   var pauseList = $('#pauseProjectId li').length;
		   var helpList = $('#helpProjectId li').length;
             if(pauseList>0){
              
			   var nowContent=$('#pauseProjectId li').first();
			   nowContent.find('a').click();
		       ControlTree.OpenPauseProjectTree();
			   hasClick=true;
			   nowImg=1;
		   }
             else if(helpList>0){
            	 var nowContent=$('#helpProjectId li').first();
  			   nowContent.find('a').click();
  		       ControlTree.OpenHelpProjectTree();
  			   hasClick=true;
  			   nowImg=0;
            	 
             }
	   }
	 }
	 //end
       if(noWorkproject && !firstClick){
	        $(".right-page").addClass('hide');
			$(".noproject").removeClass('hide');
			$(".noproject").addClass('set-width');
			//$(".indentlisthistory").show();
			//$(".indent-more-add").removeClass('circle-180');
       }else{
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
//加载项目列表视图
function updateProjectTreeView() {
	
   	$("#menuId ul li a").each(function(index,item) {
		var num = jQuery(item).attr("data-value");
		var key = getCurrentProject();
		if(key != null ){
			if (num == key) {
	              $(item).addClass('indent-selected');
	              $(item).prepend('<label class="border-select"></label>');
			} else {
				$(item).removeClass("class", "indent-selected");
			}
		}
	});
   	
    $(".menu ul li").menu({
         autohide: 0
	 });
//	$("#doingProject").click();
//	$("#myProjectId").slideDown();
	//TODO:
  
    if(countCheck==0){
    	$("#doingProject").click();
    	$("#myProjectId").slideDown();
    	countCheck++;
    }
    
	//ControlTree.showTreeImg();
   	
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
			//暂时显示预计价格
			$(viedoPrice).text(msg.priceFirst+'~'+msg.priceLast+ '元');
			
			$(description).text(msg.description);

		}, getContextPath() + '/mgr/projects/get-projectInfo', $.toJSON({
			id : key
		}));
	}
}

//添加协同人

function loadSynerhyList(){
	var key=getCurrentProject();
	
	syncLoadData(function(msg) {
		if(msg.length <=0){
			
		}else{
			var help=$("#helpProjectId");
			help.html('');
			for (var i = 0; i < msg.length; i++){
			var liStar = $('<li></li>')
			var a = $('<a class="indent-a title-content" data-state=' + msg[i].state
					+ ' data-value="' + msg[i].id + '">'+msg[i].projectName+'</a>');
			$(a).on("click", function() {
				firstClick=true;
				var key = $(this).attr("data-value");
				putCurrentProject(key);
				var state=jQuery(this).attr('data-state');
				loadprojecctlist();
			});
			liStar.append(a);
			help.append(liStar);
			}
		}
	}, getContextPath() + '/mgr/projects/get/synergys', $.toJSON({
		id : key
	}));
}


//完成项目页面样式
function finish() {
	$("#btndiv-id").hide();
	$("#upload-info-btn-id").hide();
	$("#upload-file-btn-id").hide();
	$(".comment").hide();
	$(".comment-btn").hide();
	
	$(".more-file-btn").show();
	$(".more-comment").show();
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
	if(service_val==null||service_val==''){
		return null;
	}else{
		return service_val;
	}
}
//设置当前项目
function putCurrentProject(key) {
	//$.cookie("currentproject", key + '');
	$("#service-key").val(key+"");
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
	
	if (date1.getTime() > date2.getTime())
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
// add by lt, 2016-05-11 14:56 begin
// -> 添加hover显示时间
function showOrderTime(){

	$('#stepword_gt').mouseover(function(){
          $('#div_gt').removeClass('opacity-li');
	});

	$('#stepword_gt').mouseout(function(){
          $('#div_gt').addClass('opacity-li');
	});
	
	$('#stepword_fa').mouseover(function(){
          $('#div_fa').removeClass('opacity-li');
	});

	$('#stepword_fa').mouseout(function(){
          $('#div_fa').addClass('opacity-li');
	});
    $('#stepword_sw').mouseover(function(){
          $('#div_sw').removeClass('opacity-li');
	});

	$('#stepword_sw').mouseout(function(){
          $('#div_sw').addClass('opacity-li');
	});

	  $('#stepword_zz').mouseover(function(){
          $('#div_zz').removeClass('opacity-li');
	});

	$('#stepword_zz').mouseout(function(){
          $('#div_zz').addClass('opacity-li');
	});

	$('#stepword_jf').mouseover(function(){
          $('#div_jf').removeClass('opacity-li');
	});

	$('#stepword_jf').mouseout(function(){
          $('#div_jf').addClass('opacity-li');
	});
}



//支付
var ControlPay ={
		
		clickOnLine:function(){
			
			$('#Online').on('click',function(){
				ControlPay.showOnlineInfo();
			});
		},
		showOnlineInfo:function(){
			$('#payInfo').slideDown();
			ControlPay.initOnlineInfo();
		},
		
		initOnlineInfo:function(){
			var mydate = new Date();
			var t= formatterDateTime(mydate);
			//var t=mydate.toLocaleString();
			$('#checkWay').val("1");
			$('#Online').addClass('pay-click-btn');
			$('#Online').removeClass('pay-btn');
			$('#Outline').removeClass('pay-click-btn');
			$('#Outline').addClass('pay-btn');
			$('#pay-time').text('发起收款时间');
			$('#pay-people').text('付款方');
			$('#OnlineInfo').removeClass('hide');
			$('#payTime-online').removeClass('hide');
			$('#payTime-online').val(t);
			$('#payTime-outline').addClass('hide');
			$('#order-online').removeClass('hide');
			$('#order-outline').addClass('hide');
			$('#pay-sure').text('确认');
			$('#link').addClass('hide');
			ControlPay.initBillNo();
			checkPayList.checkOnBlur();
		},
		initBillNo:function(){
			var key = getCurrentProject();
			loadData(function(msg){
				$("#order-online").val(msg.billNo);
				$("#projectName").val(msg.projectName);
				$("#cusName").val(msg.userName);
				$("#payMoney").val(msg.payPrice);
			}, getContextPath() + '/pay/get/billno', $.toJSON({
				projectId : key
			}));
		},
        clickOutLine:function(){
			$('#Outline').on('click',function(){
				ControlPay.showOutlineInfo();
			});
		},
		
		showOutlineInfo:function(){
			$('#payInfo').slideDown();
			ControlPay.initOutlineInfo();
		},
		
		initOutlineInfo:function(){
			$('#checkWay').val("2");
			$('#Outline').addClass('pay-click-btn');
			$('#Outline').removeClass('pay-btn');
			$('#Online').removeClass('pay-click-btn');
			$('#Online').addClass('pay-btn');
			$('#pay-time').text('收款时间');
			$('#pay-people').text('客户名称');
			$('#OnlineInfo').removeClass('hide');
			$('#payTime-online').addClass('hide');
			$('#payTime-outline').removeClass('hide');
			$('#order-online').addClass('hide');
			$('#order-outline').removeClass('hide');
			$('#pay-sure').text('确认');
			$('#link').addClass('hide');
			$('#payTime-outline').datepicker({
				language: 'zh',
				dateFormat:'yyyy-MM-dd ',
				minDate: new Date() 
		});
			
			checkPayList.checkOutBlur();
		},
		clickpay:function(){
				
				$('#pay-sure').on('click',function(){
					ControlPay.initPayInfo();
				});
				
			},
			// TODO:
			initPayInfo:function(){
				var check=$('#checkWay').val();
				if(check == "1"){
					
					var orderId = $("#order-online").val().trim();
					var projectName = $("#projectName").val().trim();
					var cusName = $("#cusName").val().trim();
					var payMoney = $("#payMoney").val().trim();
					var projectId = getCurrentProject();
					// 发起线上支付
					loadData(function(msg){
						
						
						if(checkPayList.checkOnLinePayList()){
						if(msg.errorCode == 200){
							var url =  msg.result;
							$("#shareLink").val(getHostName()+url);
						
								  $('#pay-sure').text('返回');
								  $('#checkWay').val('3');
								  $('#OnlineInfo').addClass('hide');
								  $('#link').removeClass('hide');
								  ZeroClipboard.config({hoverClass: "hand"});
								  var client = new ZeroClipboard($("#copyLink"));

								 
						}else{
							alert("出错啦");
						}
						}
					},  getContextPath() + '/pay/sendpay',$.toJSON({
						billNo:orderId,
						projectName:projectName,
						userName:cusName,
						payPrice:payMoney,
						projectId:projectId
					}));
				}
				else if(check=="2"){
					var key = getCurrentProject();
					var outlineTime = $("#payTime-outline").val().trim();
					var orderOutLine = $("#order-outline").val().trim();
					var projectName = $("#projectName").val().trim();
					var cusName = $("#cusName").val().trim();
					var payMoney = $("#payMoney").val().trim();
					
					loadData(function(msg){
						
						if(checkPayList.checkOutLinePayList()){
							ControlPay.openHistory();
						}
					}, getContextPath()+'/pay/offline/save', $.toJSON({
						projectId : key,
						payTime : outlineTime,
						billNo : orderOutLine,
						projectName : projectName,
						userName : cusName,
						payPrice : payMoney
					}));
				}
				else if(check=="3"){
					  $('#pay-sure').text('确认');
					  $('#checkWay').val('1');
					  $('#OnlineInfo').removeClass('hide');
					  $('#link').addClass('hide');
				}
			},
			  clickPayOpenHistory:function(){
				   
					//立即前往
					$('#openHistory').on('click',function(){
						if($('#payHistoryBtnOrder').hasClass('payBtnPosClick')){
                        	ControlPay.closeList();
					  }else{
						  ControlPay.openHistory();
						  $("#payHistoryBtnOrder").addClass('payBtnPosClick');
						  var base_Card = $("div[class^=payCard]");
					      payList();
					  }
						
					});
					//管家历史按钮
					$('#payHistory').on('click',function(){
						
						
						  if($(this).hasClass('payBtnPosClick')){
							  ControlPay.closeList();
						  }else{
							  ControlPay.openHistory();
							  $("#payHistory").addClass('payBtnPosClick');
							  var base_Card = $("div[class^=payId]");
						      payList();
						  }
						
					});
					//客户历史按钮
					$('#payHistoryBtnOrder').on('click',function(){
						
                          if($(this).hasClass('payBtnPosClick')){
                            	ControlPay.closeList();
						  }else{
							  ControlPay.openHistory();
							  $("#payHistoryBtnOrder").addClass('payBtnPosClick');
							  var base_Card = $("div[class^=payCard]");
						      payList();
						  }
						
					});
				},
				
				  clickPayHistoryClose:function(){
						$('#payHistoryClose').on('click',function(){
							ControlPay.closeList();
						});
						
					},
			          
					closeList:function(){
						$("#payHistoryList").slideUp();
						$('#payHistory').removeClass('payBtnPosClick');
						$('#payHistoryBtnOrder').removeClass('payBtnPosClick');
						$("#payListPage").html('');
					},
					
					
					openHistory:function(){
						$("#payHistoryList").slideDown();
						
					},
					
					copyLink:function(){
						$('#copyLink').on('click',function(){

						});
					},

					
		
		initControlPay:function(){
			ControlPay.clickOnLine();
			ControlPay.clickOutLine();
			ControlPay.clickpay();
			ControlPay.clickPayOpenHistory();
			ControlPay.clickPayHistoryClose();
			ControlPay.copyLink();
			
	
		}
		
		
		
}


var checkPayList = {
		
		//支付验证线下
		
		checkOutLinePayList:function(){
			
			var payTime =$('#payTime-outline'); 
			var payorder =$('#order-outline'); 
			var projectName =$('#projectName');
			var cusName =$('#cusName');
			var payMoney =$('#payMoney');

			var payTimeError =$('#payTime-outlineError'); 
			var payorderError =$('#order-outlineError'); 
			var projectNameError =$('#projectNameError');
			var cusNameError =$('#cusNameError');
			var payMoneyError =$('#payMoneyError');

			var payTimeDiv =$('#payTime-outlineDiv'); 
			var payorderDiv =$('#order-outlineDiv'); 
			var projectNameDiv =$('#projectNameDiv');
			var cusNameDiv =$('#cusNameDiv');
			var payMoneyDiv =$('#payMoneyDiv'); 
	

			if(payTime.val()==''||payTime.val()==null){
				payTime.focus();
				payTimeDiv.addClass('has-error');
				payTimeError.removeClass('hide');
				payTimeError.text('请填写时间');
				return false;
			}else{
				payTimeDiv.removeClass('has-error');
				payTimeError.addClass('hide');
			}
			if(payorder.val()==''||payorder.val()==null){
				payorder.focus();
				payorderDiv.addClass('has-error');
				payorderError.removeClass('hide');
				payorderError.text('请填写单号');
				return false;
			}else{
				payorderDiv.removeClass('has-error');
				payorderError.addClass('hide');
			}
			
			if(projectName.val()==''||projectName.val()==null){
				projectName.focus();
				projectNameDiv.addClass('has-error');
				projectNameError.removeClass('hide');
				projectNameError.text('请填写项目名');
				return false;
			}else{
				projectNameDiv.removeClass('has-error');
				projectNameError.addClass('hide');
			}
			
			if(cusName.val()==''||cusName.val()==null){
				cusName.focus();
				cusNameDiv.addClass('has-error');
				cusNameError.removeClass('hide');
				cusNameError.text('请填写客户名称');
				return false;
			}else{
				cusNameDiv.removeClass('has-error');
				cusNameError.addClass('hide');
			}
			
			if(payMoney.val()==''||payMoney.val()==null){
				payMoney.focus();
				payMoneyDiv.addClass('has-error');
				payMoneyError.removeClass('hide');
				payMoneyError.text('请填写支付金额');
				return false;
			}
			else if(!checkNumber(payMoney.val())){
				payMoney.focus();
				payMoneyDiv.addClass('has-error');
				payMoneyError.removeClass('hide');
				payMoneyError.text('请输入数字');
				return false;
			}  
			
			else{
				payMoneyDiv.removeClass('has-error');
				payMoneyError.addClass('hide');
			}
			
			return true;
			
		},
		
		
		checkOutBlur:function(){
			
			
			var payTime =$('#payTime-outline'); 
			var payorder =$('#order-outline'); 
			var projectName =$('#projectName');
			var cusName =$('#cusName');
			var payMoney =$('#payMoney');

			var payTimeError =$('#payTime-outlineError'); 
			var payorderError =$('#order-outlineError'); 
			var projectNameError =$('#projectNameError');
			var cusNameError =$('#cusNameError');
			var payMoneyError =$('#payMoneyError');

			var payTimeDiv =$('#payTime-outlineDiv'); 
			var payorderDiv =$('#order-outlineDiv'); 
			var projectNameDiv =$('#projectNameDiv');
			var cusNameDiv =$('#cusNameDiv');
			var payMoneyDiv =$('#payMoneyDiv'); 
			
			
			$(payTime).on('blur',function(){
				payTimeDiv.removeClass('has-error');
				payTimeError.addClass('hide');
			});
			
			$(payorder).on('blur',function(){
				payorderDiv.removeClass('has-error');
				payorderError.addClass('hide');
			});
			
			$(projectName).on('blur',function(){
				projectNameDiv.removeClass('has-error');
				projectNameError.addClass('hide');
			});
			
			$(cusName).on('blur',function(){
				cusNameDiv.removeClass('has-error');
				cusNameError.addClass('hide');
				
			});
			
			$(payMoney).on('blur',function(){
				payMoneyDiv.removeClass('has-error');
				payMoneyError.addClass('hide');
			});
		},
		

		checkOnBlur:function(){
			
			var projectName =$('#projectName');
			var cusName =$('#cusName');
			var payMoney =$('#payMoney');
			
			var projectNameError =$('#projectNameError');
			var cusNameError =$('#cusNameError');
			var payMoneyError =$('#payMoneyError');
			
			var projectNameDiv =$('#projectNameDiv');
			var cusNameDiv =$('#cusNameDiv');
			var payMoneyDiv =$('#payMoneyDiv'); 
			
			$(projectName).on('blur',function(){
				projectNameDiv.removeClass('has-error');
				projectNameError.addClass('hide');
			});
			
			$(cusName).on('blur',function(){
				cusNameDiv.removeClass('has-error');
				cusNameError.addClass('hide');
			});
			
			$(payMoney).on('blur',function(){
				payMoneyDiv.removeClass('has-error');
				payMoneyError.addClass('hide');
			});
		},
		
		//线上
		checkOnLinePayList:function(){
	
			var projectName =$('#projectName');
			var cusName =$('#cusName');
			var payMoney =$('#payMoney');
			
			var projectNameError =$('#projectNameError');
			var cusNameError =$('#cusNameError');
			var payMoneyError =$('#payMoneyError');
			
			var projectNameDiv =$('#projectNameDiv');
			var cusNameDiv =$('#cusNameDiv');
			var payMoneyDiv =$('#payMoneyDiv'); 
	
			if(projectName.val()==''||projectName.val()==null){
				projectName.focus();
				projectNameDiv.addClass('has-error');
				projectNameError.removeClass('hide');
				projectNameError.text('请填写项目名');
				return false;
			}else{
				projectNameDiv.removeClass('has-error');
				projectNameError.addClass('hide');
			}
			if(cusName.val()==''||cusName.val()==null){
				cusName.focus();
				cusNameDiv.addClass('has-error');
				cusNameError.removeClass('hide');
				cusNameError.text('请填写付款方');
				return false;
			}else{
				cusNameDiv.removeClass('has-error');
				cusNameError.addClass('hide');
			}
			if(payMoney.val()==''||payMoney.val()==null){
				payMoney.focus();
				payMoneyDiv.addClass('has-error');
				payMoneyError.removeClass('hide');
				payMoneyError.text('请填写支付金额');
				return false;
			}
			else if(!checkNumber(payMoney.val())){
				payMoney.focus();
				payMoneyDiv.addClass('has-error');
				payMoneyError.removeClass('hide');
				payMoneyError.text('请输入数字');
				return false;
			}
			else{
				payMoneyDiv.removeClass('has-error');
				payMoneyError.addClass('hide');
			}
			return true;
		}
		
}



function payList(){
	var listnode = $("#payListPage");
	var key = getCurrentProject();
	loadData(function(msg){
		if(msg != null ){
			msg.forEach(function(deal){
				
				var backgruond = "";
				var btn_shareLink = "";
				var btn_goPay = "";
				var left_time ="";
				var right_time ="";
				var type = $("#type").val();
				switch (deal.dealStatus) {
				case 0: // 正常
					backgruond ='	<div class="payCard-info backgroundWait">';
					if(type == "customer"){
						btn_shareLink = '<button class="info-btn red-btn" name="toPay" data-token="'+deal.token+'">去支付</button>';
					}else{
					btn_shareLink = '<button class="info-btn red-btn" name="toShare" data-token="'+deal.token+'">分享支付链接</button>';
					}
					btn_goPay = 	'<button class="info-btn red-btn" name="toPay">去支付</button>';
					left_time = '<li><div class="smallWord">发起时间</div><div class="smallWord">'+deal.createTime+'</div></li>';
					right_time = '<li><div class="smallWord">逾期时间</div><div class="smallWord">'+deal.payTime+'</div></li>';
					break;
				case 1: // 完成
					backgruond ='	<div class="payCard-info backgroundFinish">';
					left_time = '<li><div class="smallWord">发起时间</div><div class="smallWord">'+deal.createTime+'</div></li>';
					right_time = '<li><div class="smallWord">完成时间</div><div class="smallWord">'+deal.payTime+'</div></li>';
					break;
				case 2: // 支付关闭
					backgruond ='	<div class="payCard-info backgroundFail">';
					left_time = '<li><div class="smallWord">发起时间</div><div class="smallWord">'+deal.createTime+'</div></li>';
					right_time = '<li><div class="smallWord">失败时间</div><div class="smallWord">'+deal.payTime+'</div></li>';
					break;
				}
				
				
				if(deal.dealLogSource == 0){
					//线上
					var $body=
						'<div class="payId payCard">'+
						'	<div class="payCard-top">'+
						'		<div class="cardLeftStatue payInline">线上支付</div>'+
						'	</div>';
					    $body+= backgruond;
						$body+=
						'		<div class="info-left">'+
						'			<div class="infoTitle" id="project">'+deal.projectName+'</div>';
						
						$body+=btn_shareLink;
						$body+='		</div>'+
						'		<div class="info-right">'+
						'			<ul class="payInline">'+
						'				<li><div class="contentTitle">支付方</div><div class="contentWord ">'+deal.userName+'</div></li>'+
						'				<li><div class="contentTitle">支付金额</div><div class="contentWord " >'+deal.payPrice+'元</div></li>';
						$body+=left_time;
						$body+='			</ul>'+
						'			<ul class="rightUl payInline">'+
						'				<li><div class="contentTitle">收款方</div><div class="contentWord order">'+deal.proceedsSide+'</div></li>'+
						'				<li><div class="contentTitle ">订单号</div><div class="contentWord order">'+deal.billNo+'</div></li>';
						$body+=right_time;
						$body+='			</ul>'+
						'		</div>'+
						'	</div>'+
						'</div>';
				}else{
					//线下
					var $body=
						'<div class="payId payCard">'+
						'	<div class="payCard-top">'+
						'		<div class="cardLeftStatue payInline">线下支付</div>'+
						'	</div>';
					    $body+= backgruond;
						$body+=
						'		<div class="info-left">'+
						'			<div class="infoTitle" id="project">'+deal.projectName+'</div>';
						$body+='		</div>'+
						'		<div class="info-right">'+
						'			<ul class="payInline">'+
						'				<li><div class="contentTitle">支付方</div><div class="contentWord">'+deal.userName+'</div></li>'+
						'				<li><div class="contentTitle">支付金额</div><div class="contentWord">'+deal.payPrice+'</div></li>';
						$body+=left_time;
						$body+='			</ul>'+
						'			<ul class="rightUl payInline">'+
						'				<li><div class="contentTitle">收款方</div><div class="contentWord">'+deal.proceedsSide+'</div></li>'+
						'				<li><div class="contentTitle ">订单号</div><div class="contentWord order">'+deal.billNo+'</div></li>';
						$body+='			</ul>'+
						'		</div>'+
						'	</div>'+
						'</div>';
				}
				
				
					listnode.append($body);
					ZeroClipboard.config({hoverClass: "hand"});
					var client = new ZeroClipboard($("#toShare"));
					toShare();
					toPay();
			});
		}
	}, getContextPath()+'/pay/get/deallogs', $.toJSON({
		projectId:key
	}));
}

function toShare(){
	var deleteSynergys=$("[name^=toShare]");
	deleteSynergys.off('click');
	var cout=deleteSynergys.length;
	deleteSynergys.on('click',function(){
		
		var token=$(this).attr("data-token");
		getData(function(msg){
			if(msg.errorCode == 200){
				    $('#shareLinkList').val(getHostName()+msg.result);
					ZeroClipboard.config({hoverClass: "handShare"});
					var clientShare = new ZeroClipboard($("#copyShareLink"));
					$('#toolbar-share').modal('show');
					shareSpace();
			}
			else{
				alert(msg.errorMsg);
			}
		}, getContextPath()+'/pay/shareurl?token='+token);

	});
}


function toPay(){
	var deleteSynergys=$("[name^=toPay]");
	deleteSynergys.off('click');
	var cout=deleteSynergys.length;
	deleteSynergys.on('click',function(){
		var token=$(this).attr("data-token");
		getData(function(msg){
		if(msg.errorCode == 200){
			var url = getHostName() + msg.result;
			window.location.href = url;
		}
		else{
			alert(msg.errorMsg);
		}
		}, getContextPath() + '/pay/shareurl?token='+token);
	});
}


function shareSpace(){ // 分享
	$('.share').on('click',function(){
		var shareUrl = getHostName() + getContextPath() + '/phone/play/' + $(this).data('no');
		var share_title = $(this).parent().parent().parent().find('.media-heading').text().split('标题：')[1];
		var imgUrl = $(this).parent().parent().parent().parent().find('.media-object').attr('src');
		var imgPath = '';
		if(imgUrl != undefined && imgUrl != null){
			var img_Name = getFileName(imgUrl);
			imgPath = getHostName() + '/product/img/' + img_Name;
		}
		share.init(shareUrl, share_title, imgPath);
	});
}


//var ControlTree = {
//		CommonDoingProjectTree : function(){
//			$('#doingProjectId').slideDown();
//			
//		},
//		OpenDoingProjectTree : function(){
//			$('#doingProject').removeClass('inactive');
//			$('#doingProject').addClass('active');
//			$('#doingProjectId').slideDown();
//			
//		},
//		OpenMyProjectTree : function(){
//			ControlTree.CommonDoingProjectTree();
//			$('#myProject').removeClass('inactive');
//			$('#myProject').addClass('active');
//		    $('#myProjectId').slideDown();
//		},
//		OpenHelpProjectTree : function(){
//			ControlTree.CommonDoingProjectTree();
//
//			$('#helpProject').removeClass('inactive');
//			$('#helpProject').addClass('active');
//			$('#helpProjectId').slideDown();
//		},
//		OpenPauseProjectTree : function(){
//			ControlTree.CommonDoingProjectTree();
//		
//			$('#pauseProject').removeClass('inactive');
//			$('#pauseProject').addClass('active');
//			$('#pauseProjectId').slideDown();
//		},
//		OpenHistoryProjectTree : function(){
//			$('#historyProject').removeClass('inactive');
//			$('#historyProject').addClass('active');
//			$('#historyProjectId').slideDown();
//		},
//		CloseDoingProjectTree : function(){
//			$('#doingProject').removeClass('active');
//			$('#doingProject').addClass('inactive');
//    	    $('#doingProjectId').slideUp();
//       },
//       CloseMyProjectTree : function(){
//    	   $('#myProject').removeClass('active');
//		   $('#myProject').addClass('inactive');
//    	   $('#myProjectId').slideUp();
//       },
//       CloseHelpProjectTree : function(){
//    	   $('#helpProject').removeClass('active');
//		   $('#helpProject').addClass('inactive');
//    	   $('#helpProjectId').slideUp();
//       },
//       ClosePauseProjectTree : function(){
//    	   $('#pauseProject').removeClass('active');
//		   $('#pauseProject').addClass('inactive');
//    	   $('#pauseProjectId').slideUp();
//       },
//       CloseHistoryProjectTree : function(){
//    	   $('#historyProject').removeClass('active');
//		   $('#historyProject').addClass('inactive');
//    	   $('#historyProjectId').slideUp();
//       },
//       
//       showTreeImg : function(){
//    	 if(nowImg==0){
// 			$('#helpProject').removeClass('inactive');
// 			$('#helpProject').addClass('active');
//    	 }
//    	 
//    	 else if(nowImg==1){
//  			$('#pauseProject').removeClass('inactive');
//  			$('#pauseProject').addClass('active');
//    	 }
//    	 
//    	 else if(nowImg==2){
//   			$('#myProject').removeClass('inactive');
//   			$('#myProject').addClass('active');
//     	 }
//    	   
//    	   
//       },
//       
//       shutMyProject : function(){
//    	 $('#myProjectId').on('click',function(){
//    		if(('#myProject').attr('class')=='active'){
//    		    CloseMyProjectTree();
//    		} 
//    		else if(('#myProject').attr('class')=='inactive'){
//    			OpenMyProjectTree();
//    		}
//    	 });
//    	   
//       }
//       
//
//}

function formatterDateTime (date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}



