var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var userName;
var teamName;
$().ready(function() {
	loadSource();
	priceModel(null);
	$("#ul-select").hide();
	$("#ul-select-team").hide();
	$("#ul-select-source").hide();
	$('.page').on('click', function() {
		if(checkHidden) {
			checkHidden = false;
			$("#ul-select").hide();
			$("#ul-select-team").hide();
			$("#ul-select-source").hide();
			isShow = false;
		}
		if(isShow) {
			isShow = false;
			checkHidden = true;
		}
	});
	
	$("#add-user").click(function() {
		$('#toolbar-modal').modal('show');
	});
	
	$("#hide-btn").click(function() {
		$('#toolbar-modal').modal('hide');
	});
	
	$("input[id$='time']").datepicker({
			language: 'zh',
			dateFormat:'yyyy-MM-dd',
			minDate: new Date() 
	});

	$("input[name$='time']").val("请选择日期");
	$('#gtstarttime').val(getCurrentTime());

	$(".indent-btn").on("click", function() {
		addProject();
	});
	$(".pirce-btn").on("click", function() {
		
	});
	var state=$(".state").text().trim()
		if(state=='update'){
			updateProject();
		}

	
			//输入弹出框新添项目来源
	$("#projectSource-id").click(function() {
		var select_lis = document.getElementById("ul-select-source").getElementsByTagName("li");
		$("#ul-select-source").show();
		isShow = true;
		for(i=0;
		i<select_lis.length;
		i++) {
			select_lis[i].onclick = function() {
				document.getElementById("projectSource").value=this.innerHTML;
				$("#ul-select-source").hide();
			}
		}
	});

   $("#radio-price").on("click",function(){
	   priceModel(null);
   });
	
	setTimeEvent();
	$("input[name$='time']").val("请选择日期");
	$('#gtstarttime').val(getCurrentTime());

	$(".pirce-btn").on("click", function() {
		formatPrice();
	});

	$("#user-info-btn-finish").on('click',function(){
		addUser();
	});
	var state = $(".state").text().trim()
	if (state == 'update') {
		updateProject();
	}
	
	initUserBox();
	initTeamBox();
	
});

function initUserBox(){
	$('#userName').on('keydown', function() {
		userName = $('.userName').val().trim();
	});
	$('#userName').on('keyup', function() {
		if (userName != $('#userName').val().trim()) {
			searchUser();
			var select_lis = document.getElementById("ul-select").getElementsByTagName("li");
			$("#ul-select").show();
			isShow = true;
			for(i=0;i<select_lis.length;i++) {
				select_lis[i].onclick = function() {
					document.getElementById("teamName").value=this.innerHTML;
					$("#ul-select").hide();
				}
			}
		}
		
	});
}
function initTeamBox(){
	$('#teamName').on('keydown', function() {
		teamName = $('#teamName').val().trim();
	});
	$('#teamName').on('keyup', function() {
		if (teamName != $('#teamName').val().trim()) {
			searchTeam();
			var select_lis = document.getElementById("ul-select-team").getElementsByTagName("li");
			$("#ul-select-team").show();
			isShow = true;
			for(i=0;i<select_lis.length;i++) {
				select_lis[i].onclick = function() {
					document.getElementById("teamName").value=this.innerHTML;
					$("#ul-select-team").hide();
				}
			}
		}
		
	});
}
function searchTeam() {
	var teamName = $("#teamName").val();
	loadData(function(msg) {
		var table=$("#ul-select-team");
		table.html("");
		for (var int = 0; int < msg.length; int++) {
			var li=$("<li data-id='"+msg[int].teamId+"' data-contact='"+msg[int].loginName+"' data-phone='"+msg[int].phoneNumber+"' >"+msg[int].teamName+"</li>");
			li.on("click",function(){
				var contact=jQuery(this).attr('data-contact');
				var phone=jQuery(this).attr('data-phone');
				$(".teamContact").val(contact);
				$(".teamPhone").val(phone);
				document.getElementById("teamName").value=this.innerHTML;
				$("#ul-select").hide();
				isShow = false; 
				table.html("");
			});
			table.append(li);
		}
	}, getContextPath() + '/mgr/projects/team/search/info', $.toJSON({
		teamName : teamName
	}));
}
function searchUser() {
	var userName = $("#userName").val();
	loadData(function(msg) {
		var table=$("#ul-select");
		table.html("");
		for (var int = 0; int < msg.length; int++) {
			var li=$("<li data-id='"+msg[int].id+"' data-contact='"+msg[int].realName+"' data-phone='"+msg[int].telephone+"' >"+msg[int].userName+"</li>");
			li.on("click",function(){
				var contact=jQuery(this).attr('data-contact');
				var phone=jQuery(this).attr('data-phone');
				$(".userContact").val(contact);
				$(".userPhone").val(phone);
				document.getElementById("userName").value=this.innerHTML;
				$("#ul-select").hide();
				isShow = false;
				table.html("");
			});
			table.append(li);
		}
	}, getContextPath() + '/mgr/projects/user/search/info', $.toJSON({
		userName : userName
	}));
}
function addUser(){
	//验证
	var username=$("#add_username");
	var contactname=$("#add_contactname");
	var userphone=$("#add_userphone");
	

	if(!verifyInputNotNull(username)) return;
	
	if(!verifyInputNotNull(contactname)) return;
	
	if(!verifyInputNotNull(contactname)) return;
	var usernameValue=username.val().trim();
	var contactnameValue=contactname.val().trim();
	var userphoneValue=userphone.val().trim();
	
	loadData(function(msg) {
		if (msg) {
			$('#toolbar-modal').modal('hide');
			$("#toolbar-modal").clearQueue();
		} else {
			alert('error:' + msg);
		}
	}, getContextPath() + '/mgr/projects/user/save/simple', $.toJSON({
		userName:usernameValue,
		realName:contactnameValue,
		telephone:userphoneValue
	}));
	
}
function setTimeEvent() {
	$(".gtstarttime").on('click', function() {
		WdatePicker({
			dateFmt : 'yyyy-MM-dd',
			minDate : '2015-01-01',
			maxDate : '2050-12-01'
		})
	});
	$(".fastarttime").on('click', function() {
		var text = $(".gtstarttime").val();
		if (text != null && text != '' && text != '请选择日期') {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd',
				minDate : text,
				maxDate : '2050-12-01'
			})
		} else {
			alert("请选择上一阶段时间！")
		}

	});
	$(".swstarttime").on('click', function() {
		var text = $(".fastarttime").val();
		if (text != null && text != '' && text != '请选择日期') {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd',
				minDate : text,
				maxDate : '2050-12-01'
			})
		} else {
			alert("请选择上一阶段时间！")
		}
	});
	$(".zzstarttime").on('click', function() {
		var text = $(".swstarttime").val();
		if (text != null && text != '' && text != '请选择日期') {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd',
				minDate : text,
				maxDate : '2050-12-01'
			})
		} else {
			alert("请选择上一阶段时间！")
		}
	});
	$(".jfstarttime").on('click', function() {
		var text = $(".zzstarttime").val();
		if (text != null && text != '' && text != '请选择日期') {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd',
				minDate : text,
				maxDate : '2050-12-01'
			})
		} else {
			alert("请选择上一阶段时间！")
		}
	});
}
function updateProject() {
	var currentProject = getCurrentProject();
	loadData(function(msg) {
		$(".projectId").val("");
		$(".projectName").val("");
		$("#userName").val("");
		$(".userContact").val("");
		$(".userPhone").val("");
		$("#teamName").val("");
		$(".teamContact").val("");
		$(".teamPhone").val("");
		var str = String(msg.price);
		var strarray = str.split('~');
		$(".firstinput").val("");
		$(".lastinput").val("");
		$(".description").val("");
		$(".gtstarttime").val("");
		$(".fastarttime").val("");
		$(".swstarttime").val("");
		$(".zzstarttime").val("");
		$(".jfstarttime").val("");
		// put data
		$(".projectId").val(msg.serial);
		$(".projectName").val(msg.projectName);
		$("#userName").val(msg.userName);
		$(".userContact").val(msg.userContact);
		$(".userPhone").val(msg.userPhone);
		$("#teamName").val(msg.teamName);
		$(".teamContact").val(msg.teamContact);
		$(".teamPhone").val(msg.teamPhone);
		$("#projectSource").val(msg.source);
		////////////
		var price=msg.price;
		var strarray;
		if(price!=null&&price!=''){
			strarray=price.split('~');
			if(strarray.length==1){
				$("#radio-price").attr("checked",'checked');
			}
		}
		priceModel(price);
		$(".description").val(msg.description);
		$(".gtstarttime").val(msg.time.gt);
		$(".fastarttime").val(msg.time.fa);
		$(".swstarttime").val(msg.time.sw);
		$(".zzstarttime").val(msg.time.zz);
		$(".jfstarttime").val(msg.time.jf);
		$(".page-title-title").text("项目信息修改");
		$(".indent-btn").off("click");
		$(".indent-btn").on("click", function() {
			updateProjectajax();
		});
	}, getContextPath() + '/mgr/projects/get-redundantProject', $.toJSON({
		id : currentProject
	}));
}

function updateProjectajax() {
	var currentProject = getCurrentProject();
	var projectSerial = $(".projectId").val().trim();
	var projectName = $(".projectName").val().trim();
	var userName = $("#userName").val().trim();
	var userContact = $(".userContact").val().trim();
	var userPhone = $(".userPhone").val().trim();
	var teamName = $("#teamName").val().trim();
	var teamContact = $(".teamContact").val().trim();
	var teamPhone = $(".teamPhone").val().trim();
	var source=$("#projectSource").val().trim();
	var price=getPrice();
	var description = $(".description").val().trim();
	var gtstarttime = $(".gtstarttime").val().trim();
	var fastarttime = $(".fastarttime").val().trim();
	var swstarttime = $(".swstarttime").val().trim();
	var zzstarttime = $(".zzstarttime").val().trim();
	var jfstarttime = $(".jfstarttime").val().trim();

	loadData(function(msg) {
		if (msg) {
			window.location.href = getContextPath() + "/mgr/projects/flow-index";
		} else {
			alert('error:' + msg);
		}
	}, getContextPath() + '/mgr/projects/update-indentProject', $.toJSON({
		id : currentProject,
		serial : projectSerial,
		projectName : projectName,
		userName : userName,
		userContact : userContact,
		userPhone : userPhone,
		teamName : teamName,
		teamContact : teamContact,
		teamPhone : teamPhone,
		price : price,
		description : description,
		source:source,
		time : {
			gt : gtstarttime,
			fa : fastarttime,
			sw : swstarttime,
			zz : zzstarttime,
			jf : jfstarttime
		}
	}));
}

function addProject() {
	var projectSerial = $(".projectId").val().trim();
	var projectName = $(".projectName").val().trim();
	var userName = $("#userName").val().trim();
	var userContact = $(".userContact").val().trim();
	var userPhone = $(".userPhone").val().trim();
	var teamName = $("#teamName").val().trim();
	var teamContact = $(".teamContact").val().trim();
	var teamPhone = $(".teamPhone").val().trim();
	var source=$("#projectSource").val().trim();
	var price =getPrice();
	var description = $(".description").val().trim();
	var gtstarttime = $(".gtstarttime").val().trim();
	var fastarttime = $(".fastarttime").val().trim();
	var swstarttime = $(".swstarttime").val().trim();
	var zzstarttime = $(".zzstarttime").val().trim();
	var jfstarttime = $(".jfstarttime").val().trim();
	
	loadData(function(msg) {
		if (msg) {
			window.location.href = getContextPath() + "/mgr/projects/flow-index";
		} else {
			alert('error:' + msg);
		}
	}, getContextPath() + '/mgr/projects/save', $.toJSON({
		serial : projectSerial,
		projectName : projectName,
		userName : userName,
		userContact : userContact,
		userPhone : userPhone,
		teamName : teamName,
		teamContact : teamContact,
		teamPhone : teamPhone,
		price : price,
		description : description,
		source:source,
		time : {
			gt : gtstarttime,
			fa : fastarttime,
			sw : swstarttime,
			zz : zzstarttime,
			jf : jfstarttime
		}
	}));
}
function loadSource() {
	loadData(function(msg) {
		var table=$("#ul-select-source");
		for (var int = 0; int < msg.length; int++) {
			var li=$("<li>"+msg[int]+"</li>");
			table.append(li);
		}
	}, getContextPath() + '/mgr/projects/getProjectTags', null);
}
function priceModel(price) {
	var title=$(".pirce-title");
	var rootDiv=$(".pirce-div");
	var state=$("#radio-price").is(':checked');
	rootDiv.html("");
	//选中为最终价格
	if(state){
		title.text('项目最终价格');
		var input=$("<input type=\"text\" class=\"pirce-input finishInput\"> 万");
		if(price!=null)
		$(input).val(price);
		rootDiv.append(input);
	}else{
		title.text('项目预算价格');
		var first=$("<input type=\"text\" class=\"pirce-input firstinput\">");
		var last=$("<input type=\"text\" class=\"pirce-input lastinput\"> 万");
		if(price!=null){
			var strarray=price.split('~');
			first.val(strarray[0]);
			last.val(strarray[1]);
		}
		rootDiv.append(first);
		rootDiv.append('~');
		rootDiv.append(last);
	}
}
function getPrice() {
	var state=$("#radio-price").is(':checked');
	var price;
	if(state){
		price=$(".finishInput").val().trim();
	}else{
		var first=$(".firstinput").val().trim();
		var last=$(".lastinput").val().trim();
		price=first+'~'+last;
	}
	return price;
}
function verifyInputNotNull(input) {
	if(input.val()==null||input.val()==""){
		input.focus();
		return false;
	}
	return true;
	
}
function getCurrentProject() {
	return $.cookie('currentproject');
}
// 获取当前时间
function getCurrentTime() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + month + '-' + day;
}