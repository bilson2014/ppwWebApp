var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var userName;
var teamName;
$().ready(function() {
	setInputErrorStyle();
	showRecommend();
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
		$("#div-projectId").removeClass('has-error');
		$("#error-projectId").hide();
	});
	$(".projectName").on('change',function(){
		$("#div-projectName").removeClass('has-error');
		$("#error-projectName").hide();
	});
	$("#projectSource").on('change',function(){
		$("#div-projectSource").removeClass("has-error");
		$("#error-projectSource").hide();
	});
	$("#userName").on('change',function(){
		$("#div-userName").removeClass('has-error');
		$("#error-userName").hide();
	});
	$(".userContact").on('change',function(){
		$("#div-userContact").removeClass('has-error');
		$("#error-userContact").hide();
	});
	//this class lost a .
/*	$(".userPhone").on('change',function(){
		$(".userPhone").removeClass("border-red");
		$(".userPhone").addClass("border-gray");
		$("#error-userPhone").hide();
	});*/
	$(".userPhone").on('change',function(){
		$("#div-userPhone").removeClass('has-error');
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
		$("#div-gtstarttime").removeClass('has-error');
		$("#error-gtstarttime").hide();
	});
	$("#fastarttime").on('blur',function(){
		$("#div-fastarttime").removeClass('has-error');
		$("#error-fastarttime").hide();
	});
	$("#swstarttime").on('blur',function(){
		$("#div-swstarttime").removeClass('has-error');
		$("#error-swstarttime").hide();
	});
	$("#zzstarttime").on('blur',function(){
		$("#div-zzstarttime").removeClass('has-error');
		$("#error-zzstarttime").hide();
	});
	$("#jfstarttime").on('blur',function(){
		$("#div-jfstarttime").removeClass('has-error');
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
				var id=jQuery(this).attr('data-id');
				$(".teamContact").val(contact);
				$(".teamPhone").val(phone);
				$(".teamId").val(id);
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
				var id=jQuery(this).attr('data-id');
				$(".userContact").val(contact);
				$(".userPhone").val(phone);
				$(".userId").val(id);
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
		$(".teamId").val("");
		$(".userId").val("");
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
		$(".teamId").val(msg.teamId);
		$(".userId").val(msg.customerId);
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
	
	var teamId= $(".teamId").val();
	var customerId= $(".userId").val();
	
	var description = $(".description").val().trim();
	var gtstarttime = $(".gtstarttime").val().trim();
	var fastarttime = $(".fastarttime").val().trim();
	var swstarttime = $(".swstarttime").val().trim();
	var zzstarttime = $(".zzstarttime").val().trim();
	var jfstarttime = $(".jfstarttime").val().trim();

	loadData(function(msg) {
		if (msg) {
			//window.location.href = getContextPath() + "/mgr/projects/flow-index";
			submitForm();
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
		teamId:teamId,
		customerId:customerId,
		time : {
			gt : gtstarttime,
			fa : fastarttime,
			sw : swstarttime,
			zz : zzstarttime,
			jf : jfstarttime
		}
	}));
}
function submitForm(){
	var key=getCurrentProject();
	//var body=$("body");
	var path=getContextPath()+ "/mgr/projects/flow-index";
	var form=$("<form action='"+path+"' method='post' id='submitkey' style='display: none;'></form>");
	var input=$("<input type=\"text\" name=\"key\" style=\"display: none\">");
	input.val(key);
	form.append(input);
	form.submit();
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
		return;
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
	var teamId= $(".teamId").val();
	var customerId= $(".userId").val();
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
		teamId:teamId,
		customerId:customerId,
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
		var input=$("<input type=\"text\" class=\"pirce-input form-control finishInput\"> 元");
		if(price!=null)
		$(input).val(price);
		rootDiv.append(input);
		$(".finishInput").on('blur',function(){
			priceVerifyInputNotNull();
		});
	}else{
		title.text('项目预算价格');
		var first=$("<input type=\"text\" class=\"pirce-input form-control firstinput\">");
		var midline=$("<input readonly=\"readpnly\" class=\"midinput\">");
		var last=$("<input type=\"text\" class=\"pirce-input form-control lastinput\"> 元");
   
		if(price!=null){
			var strarray=price.split('~');
			first.val(strarray[0]);
			last.val(strarray[1]);
		}
		rootDiv.append(first);
		rootDiv.append(midline);
		rootDiv.append(last);
	
		$(".firstinput").on('blur',function(){
			priceVerifyInputNotNull();
		});
		$(".lastinput").on('blur',function(){
			priceVerifyInputNotNull();
		});
	}
	rootDiv.append(' 元');
	
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
						var div=$(time[int]).parent();
						div.addClass('has-error');
						$("#error-"+time[int].id).show();
						return false;
					}else{
						var div=$(time[int]).parent();
						div.removeClass('has-error');
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
	if(state){
		var finish=$(".finishInput");
		if(verifyInputNotNull(finish)){
			if(!checkNumber(finish.val())){
				finish.val("");
				finish.focus();
				var div=finish.parent();
				div.addClass('has-error');
				$("#error-radio-price").show();
				return false;
			}else{
				var div=finish.parent();
				div.removeClass('has-error');
				$("#error-radio-price").hide();
				return true;
			}
		}else{
			return false;
		}
	}else{
		var first=$(".firstinput");
		var last=$(".lastinput");
		if(!verifyInputNotNull(first))return false;
		if(!checkNumber(first.val())){
			first.val("");
			first.focus();
			var div=first.parent();
			div.addClass('has-error');
			$("#error-radio-price").show();
			return false;
		}else{
			var div=first.parent();
			div.removeClass('has-error');
		}
		if(!verifyInputNotNull(last))return false;
		if(!checkNumber(last.val())){
			last.val("");
			last.focus();
			var div=last.parent();
			div.addClass('has-error');
			$("#error-radio-price").show();
			return false;
		}else{
			var div=last.parent();
			div.removeClass('has-error');
		}
		if(parseInt(first.val())>parseInt(last.val())){
			last.val("");
			last.focus();
			var div=last.parent();
			div.addClass('has-error');
			$("#error-radio-price").show();
			return false;
		}else{
			var div=last.parent();
			div.removeClass('has-error');
		}
		$("#error-radio-price").hide();
		return true;
	}
}

function verifyInputNotNull(input) {
	if(input.val()==null||input.val()==""){
		var div=input.parent();
		div.addClass('has-error');
		input.focus();
		return false;
	}else{
		var div=input.parent();
		div.removeClass('has-error');
		return true;
	}
}
function getCurrentProject() {
	//return $.cookie('currentproject');
	return $("#key").val();
}
function clearProject() {
	$("#key").val("");
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
//友情推荐
//20160509 卢涛添加
function showRecommend(){

   $("#projectSource").on('change',function(){
   	     if($("#projectSource").val()=='友情推荐'){
		 $("#div-friendship").removeClass('hide');
	     }
         else{
         $("#div-friendship").addClass('hide');
         }
	});
}

