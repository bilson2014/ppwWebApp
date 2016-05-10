var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var userName;
var teamName;
var referrerList;
$().ready(function() {
	setInputErrorStyle();
	showRecommend();
	$(".error-label").hide();
	$(".username-error-label").hide();
	//change final price label by lt
	$('.final-price-label').hide();
	$('.final-price-left-label').hide();
	//end
	$(".tableinput-error").hide();
	
	loadSource();
	$("#ul-select").hide();
	$("#ul-select-team").hide();
	$("#ul-select-referrer").hide();
	$('.page').on('click', function() {
		if(checkHidden) {
			checkHidden = false;
			$("#ul-select").hide();
			$("#ul-select-team").hide();
			$("#ul-select-referrer").hide();
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
			updateProject_ViewInit();
		}else{
			//新增模式，生成序列号
			fillSerialID();
		}
	$("input[name$='time']").val("请选择日期");
	$('#gtstarttime').val(getCurrentTime());

	$(".pirce-btn").on("click", function() {
		formatPrice();
	});

	$("#user-info-btn-finish").on('click',function(){
		addUser();
	});
	
	initUserInput();
	initTeamInput();
	initReferrerInput();
	
});
//设置验证错误提示
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
	$(".userPhone").on('change',function(){
		var phone=$(".userPhone").val();
		if(!checkMobile(phone)){
			$("#error-userPhone").show();
			setError($(".userPhone"));
			return false;
		}else{
			clearError($(".userPhone"));
			$("#error-userPhone").hide();
		}
	});
	//modify wangliming 5.9 begin 
	//--> 增加预计价格验证
	$("#firstinput").on('change',function(){
		var res=priceVerifyInputNotNull();
		if(res){
			$("#mleft").removeClass('has-error');
			$("#error-radio-price").hide();
		}else{
			$("#mleft").addClass('has-error');
			$("#error-radio-price").show();
		}
	});
	//modify wangliming 5.9 end
	
	$("#lastinput").on('change',function(){
		var res=priceVerifyInputNotNull();
		if(res){
			$("#mleft").removeClass('has-error');
			$("#error-radio-price").hide();
		}else{
			$("#mleft").addClass('has-error');
			$("#error-radio-price").show();
		}
	});
	
	$("#finishInput").on('change',function(){
		checkFinishPrice();
	});
	//5.9 修改 end
	
	//add by wangliming 2016-5-10 11:00 begin
	//-->添加 验证推荐人
	$("#input-referrer").on('change',function(){
		var id=$("#referrer-Id-hidden").val();
		if($(this).val()!='' && id!=null && id!=''){
		$("#error-input-referrer").hide();
			$("#div-friendship").removeClass('has-error');
		}
	});
	//add by wangliming 2016-5-10 end
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
//初始化用户搜索框
function initUserInput(){
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
//初始化供应商搜索框
function initTeamInput(){
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
function initReferrerInput(){
	$("#input-referrer").on('keydown', function() {
		userName = $('#input-referrer').val().trim();
	});
	$("#input-referrer").on('keyup', function() {
		if (userName != $('#input-referrer').val().trim()) {
			searchReferrer();
			var select_lis = document.getElementById("ul-select-referrer").getElementsByTagName("li");
			$("#ul-select-referrer").show();
			isShow = true;
			for(i=0;i<select_lis.length;i++) {
				select_lis[i].onclick = function() {
					//document.getElementById("teamName").value=this.innerHTML;
					$("#ul-select-referrer").hide();
				}
			}
		}
	});
}
//团队搜索方法 
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
//用户搜索方法
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

//推荐人检索
function searchReferrer() {
	var inputString=$('#input-referrer').val().trim();
	if(referrerList==null||referrerList==''){
		syncLoadData(function(msg) {
			referrerList=msg;
		}, getContextPath() + '/mgr/projects/staff/static/list', null);
	}
	var index=0;
	var table=$("#ul-select-referrer");
	table.html("");
	referrerList.forEach(function(referrer){
		var name=referrer.staffName+''.trim();
		if(name.indexOf(inputString)>-1){
			index++;
			
			var li=$("<li data-id='"+referrer.staffId+"' data-name='"+referrer.staffName+"'>"+referrer.staffName+"</li>");
			li.on("click",function(){
				var name=jQuery(this).attr('data-name');
				var id=jQuery(this).attr('data-id');
				$("#referrer-Id-hidden").val(id);
				$("#input-referrer").val(name);
				$("#ul-select-referrer").hide();
				isShow = false;
				table.html("");
				clearError($("#input-referrer"));
				$("#error-input-referrer").hide();
			});
			table.append(li);
		}
	});
}
//添加用户
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
//本页作为更新页面时，填充页面数据方法
function updateProject_ViewInit() {
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
		$("#firstinput").val("");
		$("#lastinput").val("");
		$("#finishInput").val("");
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
		//add wangliming 2016.5.10 11:28 begin
		//-->添加推荐人
		initReferrer(msg.source,msg.referrerId);
		//add wangliming 2016.5.10 11:29 end
		$(".teamId").val(msg.teamId);
		$(".userId").val(msg.customerId);
		
		$("#firstinput").val(msg.priceFirst);
		$("#lastinput").val(msg.priceLast);
		$("#finishInput").val(msg.priceFinish);
		////////////
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
	if(!verifyFrom())
		return;
	
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
	var priceFirst=$("#firstinput").val().trim();
	var priceLast=$("#lastinput").val().trim();
	var priceFinish=$("#finishInput").val().trim();
	var teamId= $(".teamId").val();
	var customerId= $(".userId").val();
	
	var description = $(".description").val().trim();
	var gtstarttime = $(".gtstarttime").val().trim();
	var fastarttime = $(".fastarttime").val().trim();
	var swstarttime = $(".swstarttime").val().trim();
	var zzstarttime = $(".zzstarttime").val().trim();
	var jfstarttime = $(".jfstarttime").val().trim();
	
	//获取推荐人，是友情推荐时为“人名”否则为 ‘’
	var referrerId=getReferrer();
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
		priceFirst:priceFirst,
		priceLast:priceLast,
		priceFinish:priceFinish,
		description : description,
		source:source,
		teamId:teamId,
		customerId:customerId,
		referrerId : referrerId,
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
	if(!verifyFrom())
		return;
	
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
	var priceFirst=$("#firstinput").val().trim();
	var priceLast=$("#lastinput").val().trim();
	var priceFinish=$("#finishInput").val().trim();
	var description = $(".description").val().trim();
	var gtstarttime = $(".gtstarttime").val().trim();
	var fastarttime = $(".fastarttime").val().trim();
	var swstarttime = $(".swstarttime").val().trim();
	var zzstarttime = $(".zzstarttime").val().trim();
	var jfstarttime = $(".jfstarttime").val().trim();
	//获取推荐人，是友情推荐时为“人名”否则为 ‘’
	var referrerId=getReferrer();
	
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
		priceFirst : priceFirst,
		priceLast : priceLast,
		priceFinish : priceFinish,
		description : description,
		source : source,
		teamId : teamId,
		customerId : customerId,
		referrerId : referrerId,
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
			var li=$("<option>"+msg[int].name+"</option>");
			select.append(li);
		}
	}, getContextPath() + '/mgr/projects/getProjectTags', null);
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
function verifyFrom(){
	if(!verifyInputNotNull($(".projectId"))) {
		$("#error-projectId").show();
		return false;
	}
	if(!verifyInputNotNull($(".projectName"))) {
		$("#error-projectName").show();
		return false;
	}
	if($("#projectSource").val()=='')
	{
		$("#projectSource").focus();
		$("#projectSource").removeClass("border-gray");
		$("#projectSource").addClass("border-red");
		$("#error-projectSource").show();
		return false;
	}else{
		$("#projectSource").removeClass("border-red");
		$("#projectSource").addClass("border-gray");
	}
	//add by wangliming 2016-5-10 11:00 begin
	//-->添加 验证推荐人
	if($("#projectSource").val().trim()=='个人信息下单'){
		 var referrerInput=$("#input-referrer");
		 var id=$("#referrer-Id-hidden").val();
		 if(!verifyInputNotNull(referrerInput) || id==null || id== ''){
			 setError(referrerInput);
			 $("#error-input-referrer").show();
			 return false;
		 }
	 }
	//add by wangliming 2016-5-10 end
	if(!verifyInputNotNull( $("#userName"))) {
		$("#error-userName").show();
	}
	if(!verifyInputNotNull($(".userContact"))){
		$("#error-userContact").show();
		 return false;
	}
	if(!verifyInputNotNull($(".userPhone"))) {
		$("#error-userPhone").show();
		return false;
	}else{
		var phone=$(".userPhone").val();
		if(!checkMobile(phone)){
			$("#error-userPhone").show();
			setError($(".userPhone"));
			return false;
		}else{
			$("#error-userPhone").hide();
		}
	}
	
	if(!priceVerifyInputNotNull()){
		$("#error-radio-price").show();
		return false;
	}
	if(!checkFinishPrice()){
		$("#error-finishInput").show();
		return false;
	}
	if(!VerifyTime()) return false;
	 return true;
}
//验证预计价格
function priceVerifyInputNotNull() {
		var first=$(".firstinput");
		var last=$(".lastinput");
		if(!verifyInputNotNull(first))return false;
		if(!checkNumber(first.val())){
			first.val("");
			setError(first);
			$("#error-radio-price").show();
			return false;
		}else{
			var div=first.parent();
			div.removeClass('has-error');
		}
		if(!verifyInputNotNull(last))return false;
		
		if(!checkNumber(last.val())){
			last.val("");
			setError(last);
			$("#error-radio-price").show();
			return false;
		}else{
			var div=last.parent();
			div.removeClass('has-error');
		}
		if(parseInt(first.val())>parseInt(last.val())){
			last.val("");
			last(last);
			$("#error-radio-price").show();
			return false;
		}else{
			var div=last.parent();
			div.removeClass('has-error');
		}
		$("#error-radio-price").hide();
		return true;
	}
//验证最终价格
function checkFinishPrice() {
	var text=$("#finishInput").val();
	if(text == null ||text=='' || text=='0')
		return true;
	if(!checkNumber(text)){
		$("#finishInput").val("");
		$("#finishInput").focus();
		var div=$("#finishInput").parent();
		div.addClass('has-error');
		$("#error-finishInput").show();
		return false;
	}else{
		var div=$("#finishInput").parent();
		div.removeClass('has-error');
		$("#error-finishInput").hide();
		return true;
	}
}
//填充序列号
function fillSerialID() {
	loadData(function(msg) {
		var id=msg.serial;
		$(".projectId").val(id);
	}, getContextPath() + '/mgr/projects/get/SerialID', null);
}
//验证输入框是否合法
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
		 if($("#projectSource").val().trim()=='个人信息下单'){
			 $("#div-friendship").removeClass('hide');
		 }
		 else{
			 //选择其他选项需要清空
			 // $("#input-referrer").val('');
			 $("#div-friendship").addClass('hide');
		 }
   });
}
function setError(input){
	var div=input.parent();
	div.addClass('has-error');
	input.focus();
}

function clearError(input){
	var div=input.parent();
	div.removeClass('has-error');
}
//add wangliming 2016.5.10 11:00 begin
//-->添加联系人相关处理
function initReferrer(sourece,referrerId) {
	 if(sourece!=null && sourece!='' && sourece.trim()=='个人信息下单'){
		 $("#div-friendship").removeClass('hide');
		 $("#referrer-Id-hidden").val(referrerId);
		 loadData(function(msg) {
				referrerList=msg;
				
				referrerList.forEach(function(referrer){
					var staffId=referrer.staffId+''.trim();
					if(staffId==referrerId){
						$("#referrer-Id-hidden").val(staffId);
						$("#input-referrer").val(referrer.staffName);
					}
				});
				
		 }, getContextPath() + '/mgr/projects/staff/static/list', null);
	 }
	 else{
		 $("#div-friendship").addClass('hide');
		 $("#input-referrer").val("");
		 $("#referrer-Id-hidden").val("");
	 }
}
function getReferrer() {
	if($("#projectSource").val().trim()=='个人信息下单'){
		 return  $("#referrer-Id-hidden").val();
	 }
	 else{
		 return '0';
	 }
}
//add wangliming 2016.5.10 11:00 end
