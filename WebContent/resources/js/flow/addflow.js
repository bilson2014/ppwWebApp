var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var userName;
var teamName;
$().ready(function() {
	setInputErrorStyle();
	$(".error-label").hide();
	$(".username-error-label").hide();
	//change final price label by lt
	$('.final-price-label').hide();
	//end
	$(".tableinput-error").hide();
	
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
function setInputErrorStyle(){
	$(".projectId").on('change',function(){
		$(".projectId").removeClass("border-red");
		$(".projectId").addClass("border-gray");
		$("#error-projectId").hide();
	});
	$(".projectName").on('change',function(){
		$(".projectName").removeClass("border-red");
		$(".projectName").addClass("border-gray");
		
		$("#error-projectName").hide();
	});
	$("#projectSource").on('change',function(){
		$("#projectSource").removeClass("border-red");
		$("#projectSource").addClass("border-gray");
	
		$("#error-projectSource").hide();
	});
	$("#userName").on('change',function(){
		$("#userName").removeClass("border-red");
		$("#userName").addClass("border-gray");
		
		$("#error-userName").hide();
	});
	$(".userContact").on('change',function(){
		$(".userContact").removeClass("border-red");
		$(".userContact").addClass("border-gray");
		
		$("#error-userContact").hide();
	});
	//this class lost a .
/*	$(".userPhone").on('change',function(){
		$(".userPhone").removeClass("border-red");
		$(".userPhone").addClass("border-gray");
		$("#error-userPhone").hide();
	});*/
	$(".userPhone").on('change',function(){
		$(".userPhone").removeClass("border-red");
		$(".userPhone").addClass("border-gray");
		$("#error-userPhone").hide();
	});
	//add a new for finalprice by lt
	$("#radio-price").on('change',function(){
		$(".radio-price").removeClass("border-red");
		$(".radio-price").addClass("border-gray");
		$("#error-radio-price").hide();
	});
	//end
	
	
	$("#gtstarttime").on('blur',function(){
		$("#gtstarttime").removeClass("border-red");
		$("#gtstarttime").addClass("border-gray");
		$("#error-gtstarttime").hide();
	});
	$("#fastarttime").on('blur',function(){
		$("#fastarttime").removeClass("border-red");
		$("#fastarttime").addClass("border-gray");
		$("#error-fastarttime").hide();
	});
	$("#swstarttime").on('blur',function(){
		$("#swstarttime").removeClass("border-red");
		$("#swstarttime").addClass("border-gray");
		$("#error-swstarttime").hide();
	});
	$("#zzstarttime").on('blur',function(){
		$("#zzstarttime").removeClass("border-red");
		$("#zzstarttime").addClass("border-gray");
		$("#error-zzstarttime").hide();
	});
	$("#jfstarttime").on('blur',function(){
		$("#jfstarttime").removeClass("border-red");
		$("#jfstarttime").addClass("border-gray");
		$("#error-jfstarttime").hide();
	});
	
}
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
	
	if(!verifyInputNotNull(userphone)) return;
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
function setTimeEvent() {}
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
	if(!VerifyTime())return;
	if(!verifyInputNotNull($(".projectId"))) {
		$("#error-projectId").show();
		return;
	}
	if(!verifyInputNotNull($(".projectName"))) {
		$("#error-projectName").show();
		return;
	}
	if($("#projectSource").val()=='')
	{
		$("#projectSource").focus();
		$("#projectSource").removeClass("border-gray");
		$("#projectSource").addClass("border-red");
		$("#error-projectSource").show();
		return;
	}else{
		$("#projectSource").removeClass("border-red");
		$("#projectSource").addClass("border-gray");
	}
	if(!verifyInputNotNull( $("#userName"))) {
		$("#error-userName").show();
	}
	if(!verifyInputNotNull($(".userContact"))){
		$("#error-userContact").show();
		 return;
	}
	if(!verifyInputNotNull($(".userPhone"))) {
		$("#error-userPhone").show();
		return;
	}
	
	if(!priceVerifyInputNotNull()){
		$("#error-radio-price").show();
		return;
	}
	
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
	if(!verifyInputNotNull($(".projectId"))) {
		$("#error-projectId").show();
		return;
	}
	if(!verifyInputNotNull($(".projectName"))) {
		$("#error-projectName").show();
		return;
	}
	if($("#projectSource").val()=='')
	{
		$("#projectSource").focus();
		$("#projectSource").removeClass("border-gray");
		$("#projectSource").addClass("border-red");
		$("#error-projectSource").show();
		return;
	}else{
		$("#projectSource").removeClass("border-red");
		$("#projectSource").addClass("border-gray");
	}
	if(!verifyInputNotNull( $("#userName"))) {
		$("#error-userName").show();
	}
	if(!verifyInputNotNull($(".userContact"))){
		$("#error-userContact").show();
		 return;
	}
	if(!verifyInputNotNull($(".userPhone"))) {
		$("#error-userPhone").show();
	}
	
	if(!priceVerifyInputNotNull()){
		$("#error-radio-price").show();
		return;
	}
	
	if(!VerifyTime())return;
	
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
			clearProject();
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
		var select=$("#projectSource");
		for (var int = 0; int < msg.length; int++) {
			var li=$("<option>"+msg[int]+"</option>");
			select.append(li);
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
		title.text('项目报价');
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
	rootDiv.append(' 万');
	
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
function VerifyTime(){
	var time=$("input[id$='time']");
	for (var int = time.length-1; int >=0 ; int--) {
		var currTime=$(time[int]).val();
		if(currTime!=''){
			for (var int2 = int; int2 >=0 ; int2--) {
				var currafter=$(time[int2]).val();
				if(currafter!=''){
					//第一个比第二个大返回true
					if(!dateCompare(currTime,currafter)){
						$(time[int]).addClass('border-red');
						$(time[int]).removeClass("border-gray");
						$("#error-"+time[int].id).show();
						return false;
					}else{
						$(time[int]).removeClass('border-red');
						$(time[int]).addClass("border-gray");
						$("#error-"+time[int].id).hide();
					}
				}
			}
		}
	}
	return true;
}
function priceVerifyInputNotNull() {
	var state=$("#radio-price").is(':checked');
	var res=false;
	if(state){
		res=verifyInputNotNull($(".finishInput"));
	}else{
		var first=$(".firstinput");
		var last=$(".lastinput");
		res=verifyInputNotNull(first);
		if(!res)return false;
		res=verifyInputNotNull(last);
	}
	return res;
}

function verifyInputNotNull(input) {
	if(input.val()==null||input.val()==""){
		input.addClass('border-red');
		input.removeClass("border-gray");
		input.focus();
		return false;
	}else{
		input.removeClass('border-red');
		input.addClass("border-gray");
	}
	return true;
	
}
function getCurrentProject() {
	return $.cookie('currentproject');
}
function clearProject() {
	$.cookie("currentproject",null);
}
// 获取当前时间
function getCurrentTime() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	return year + '-' + month + '-' + day;
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
