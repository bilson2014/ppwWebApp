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
	$('#error-user-price').hide();
	$('#error-provider-price').hide();
	$('#error-Synergy').hide();
	//end
	$(".tableinput-error").hide();
	loadSource();
	$("#ul-select").hide();
	$("#ul-select-team").hide();
	$("#ul-select-referrer").hide();
	$("#").hide();
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
	
//	$("#add-user").click(function() {
//		$('#toolbar-modal').modal('show');
//	});
	
//	$("#hide-btn").click(function() {
//		$('#toolbar-modal').modal('hide');
//	});
	
	$("input[id$='time']").datepicker({
			language: 'zh',
			dateFormat:'yyyy-MM-dd',
			minDate: new Date() 
	});

	$("input[name$='time']").val("请选择日期");
	$('#gtstarttime').val(getCurrentTime());
	enableSubmitBtnEnent();
	var state=$(".state").text().trim()
	if(state=='update'){
		updateProject_ViewInit();
	}else{
		//新增模式，生成序列号
		fillSerialID();
	}
	$("input[name$='time']").val("请选择日期");
	$('#gtstarttime').val(getCurrentTime());
	$("#user-info-btn-finish").on('click',function(){
		addUser();
	});
	
	initUserInput();
	initTeamInput();
	initReferrerInput();
	//add Synergy by laowng begin 2016-5-25 12:35 
	$("#add-Synergy").on('click', function() {
		$('.cooperative').css('visibility','visible');
		addSynergy();
	});
	//add Synergy by laowng end 2016-5-25 12:35
});
//设置验证错误提示
function setInputErrorStyle(){
	$(".projectId").on('change',function(){
		clearError($(".projectId"));
		$("#error-projectId").hide();
	});
	$(".projectName").on('change',function(){
		clearError($(".projectName"));
		$("#error-projectName").hide();
	});
	$("#projectSource").on('change',function(){
		clearError($("#projectSource"));
		$("#error-projectSource").hide();
	});
	$("#userName").on('change',function(){
		clearError($("#userName"));
		$("#error-userName").hide();
	});
	
	$("#teamName").on('change',function(){
		clearError($("#teamName"));
		$("#error-teamName").hide();
	});
	
	$(".userContact").on('change',function(){
		clearError($(".userContact"));
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
			clearError($("#firstinput"));
			$("#error-radio-price").hide();
		}
	});
	//modify wangliming 5.9 end
	
	$("#lastinput").on('change',function(){
		var res=priceVerifyInputNotNull();
		if(res){
			clearError($("#lastinput"));
			$("#error-radio-price").hide();
		}
	});
	
	$("#finishInput").on('change',function(){
		checkFinishPrice();
	});
	
	
  
	
	//add by lt 2016-5-31 18:50 begin
	//-->添加 用户 供应商错误消息
	$("#userinput").on('change',function(){
		checkUserPrice();
	});
	
	$("#providerInput").on('change',function(){
		checkProviderPrice();
	});
	
	//end
	//5.9 修改 end
	
	//add by wangliming 2016-5-10 11:00 begin
	//-->添加 验证推荐人
	$("#input-referrer").on('change',function(){
		var id=$("#referrer-Id-hidden").val();
		if($(this).val()!='' && id!=null && id!=''){
			$("#error-input-referrer").hide();
			clearError($("#input-referrer"));
		}
	});
	//add by wangliming 2016-5-10 end
	$("#gtstarttime").on('blur',function(){
		clearError($("#gtstarttime"));
		$("#error-gtstarttime").hide();
	});
	$("#fastarttime").on('blur',function(){
		clearError($("#fastarttime"));
		$("#error-fastarttime").hide();
	});
	$("#swstarttime").on('blur',function(){
		clearError($("#swstarttime"));
		$("#error-swstarttime").hide();
	});
	$("#zzstarttime").on('blur',function(){
		clearError($("#zzstarttime"));
		$("#error-zzstarttime").hide();
	});
	$("#jfstarttime").on('blur',function(){
		clearError($("#jfstarttime"));
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
			$("#ul-select").show();
			isShow = true;
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
			$("#ul-select-team").show();
			isShow = true;
		}
		
	});
}
function initReferrerInput(){
	$("#input-referrer").on('keydown', function() {
		userName = $('#input-referrer').val().trim();
	});
	$("#input-referrer").on('keyup', function() {
		if (userName != $('#input-referrer').val().trim()) {
			var inputString=$('#input-referrer').val().trim();
			searchReferrer(inputString);
			isShow = true;
			$("#ul-select-referrer").show();
		}
	});
}

function initSynergy(input_div){
	var input=$(input_div).find("input#name");
	$(input).off('keydown');
	$(input).off('keyup');
	$(input).on('keydown', function() {
		userName = $(input).val().trim();
	});
	$(input).on('keyup', function() {
		if (userName != $(input).val().trim()) {
			isShow = true;
			searchSynergy($(input));
			input_div.find("ul#ul-select-synergy").show();
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
//		if(msg.length > 0){
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
//		}else{
//			var li=$("<li>没有搜索到</li>");
//		}
	}, getContextPath() + '/mgr/projects/user/search/info', $.toJSON({
		userName : userName
	}));
}
function getReferrerData(){
	if(referrerList==null||referrerList==''){
		syncLoadData(function(msg) {
			referrerList=msg;
		}, getContextPath() + '/mgr/projects/staff/static/list', null);
	}
}
//推荐人检索
function searchReferrer(inputString) {
	getReferrerData();
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
				isShow = false;
				table.html("");
				$("#error-input-referrer").hide();
				//详细业务相关
				
				$("#referrer-Id-hidden").val(id);
				$("#input-referrer").val(name);
				$("#ul-select-referrer").hide();
				clearError($("#input-referrer"));
			});
			table.append(li);
		}
	});
}
//协同人
function searchSynergy(input) {
	var inputString=input.val().trim();
	var div=$(input).parent().parent();
	getReferrerData();
	var index=0;
	var table=div.find("ul#ul-select-synergy");
	table.html("");
	referrerList.forEach(function(referrer){
		var name=referrer.staffName+''.trim();
		if(name.indexOf(inputString)>-1){
			index++;
			var li=$("<li data-id='"+referrer.staffId+"' data-name='"+referrer.staffName+"'>"+referrer.staffName+"</li>");
			li.on("click",function(){
				var name=jQuery(this).attr('data-name');
				var id=jQuery(this).attr('data-id');
				isShow = false;
				table.html("");
				table.hide();
				//详细业务相关
				div.find("input#name").val(name);
				div.find("input#user-id").val(id);
			});
			table.append(li);
		}
	});
	var hover=false;
	$(table).hover(function(){
			hover=true;
	 },function(){
	    	hover=false;
	  });
	$(input).on('blur',function(){
		if(!hover){
			table.html("");
			table.hide();
		}
	});
}
////添加用户
//function addUser(){
//	//验证
//	var username=$("#add_username");
//	var contactname=$("#add_contactname");
//	var userphone=$("#add_userphone");
//
//	if(!verifyInputNotNull(username)) return;
//	
//	if(!verifyInputNotNull(contactname)) return;
//	
//	if(!verifyInputNotNull(userphone)) return;
//	var usernameValue=username.val().trim();
//	var contactnameValue=contactname.val().trim();
//	var userphoneValue=userphone.val().trim();
//	
//	loadData(function(msg) {
//		if (msg) {
//			$('#toolbar-modal').modal('hide');
//			$("#toolbar-modal").clearQueue();
//		} else {
//			alert('error:' + msg);
//		}
//	}, getContextPath() + '/mgr/projects/user/save/simple', $.toJSON({
//		userName:usernameValue,
//		realName:contactnameValue,
//		telephone:userphoneValue
//	}));
//	
//}
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
			enableSubmitBtnEnent();
			
		// 初始化协同人
		var synergys = msg.synergys;
		$("#Synergy-root").html("");
		if(synergys != null && synergys.length > 0){
			$.each(synergys,function(i,item){
				$('.cooperative').css('visibility','visible');
				addSynergy(item.userName,item.ratio,item.userId,item.synergyId);
			});
		}
	}, getContextPath() + '/mgr/projects/get-redundantProject', $.toJSON({
		id : currentProject
	}));
}

function updateProjectajax() {
	//解绑事件防止多次点击
	disableSubmitBtnEnent();
	if(!verifyFrom()){
		//验证错误，恢复事件
		enableSubmitBtnEnent();
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
	
	//获取推荐人，是友情推荐时为 “人名” 否则为 ‘’
	var referrerId=getReferrer();
	
	loadData(function(msg) {
		if (msg) {
			//window.location.href = getContextPath() + "/mgr/projects/flow-index";
			submitForm();
		} else {
			alert('error:' + msg);
		}
		//提交完成，恢复事件
		enableSubmitBtnEnent();
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
		},
		synergys:getViewSynerhy()
	}));
}
function submitForm(){
	var key=getCurrentProject();
	//var body=$("body");
	var path=getContextPath()+ "/mgr/projects/flow-index";
	var formBody = '<form action="'+path+'" method="post" oncomplete="false" id="submitkey" style="display: none;">';
	formBody += '<input type="text" name="key" value="'+ key +'" style="display: none">';
	formBody += '</form>';
	$('#indent-btn').append(formBody);
	$('#submitkey').submit().remove();
	/*var form=$("<form action='"+path+"' method='post' id='submitkey' style='display: none;'></form>");
	var input=$("<input type=\"text\" name=\"key\" style=\"display: none\">");
	input.val(key);
	form.append(input);
	$('#upload-info-btn-id').append(form);*/
	form.submit();
}
function addProject() {
	//取消事件防止多次点击
	disableSubmitBtnEnent();
	if(!verifyFrom()){
		//验证错误，恢复事件
		enableSubmitBtnEnent();
		return;
	}
	
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
		//恢复事件
		enableSubmitBtnEnent();
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
		},
		synergys:getViewSynerhy()
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
		 }else{
			 //继续验证输入框，和人员id是否一致
			 getReferrerData();
			 var error=true;
			 for (var int = 0; int < referrerList.length; int++) {
				 var referrer=referrerList[int];
				 if(referrer.staffId == id ){
					 if(referrerInput.val().trim() == referrer.staffName+''.trim() ){
						 error=false;
						 break;
					 }else{
						 error=true;
					 }
				 }
			 }
			 if(error){
				 setError(referrerInput);
				 $("#error-input-referrer").show();
				 return false;
			 }
		 }
	 }
	//add by wangliming 2016-5-10 end
	if(!verifyInputNotNull( $("#userName"))) {
		$("#error-userName").show();

		 return false;
	}else{
		if(!verifyUser()){
			setError($("#userName"));
			$("#error-userName").show();
			return false;
		}
	}
	
	if(!verifyTeam()){
		setError($("#teamName"));
		$("#error-teamName").show();
		return false;
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
	
	
	
	
	if(!VerifyTime()) 
		return false;
	
	if(verifySynerhy())
		return false;
	

	//新增错误判断
	if(!checkUserPrice()){
		$("#error-user-price").show();
		return false;
	}
	
	if(!checkProviderPrice()){
		$("#error-provider-price").show();
		return false;
	}
	//
	
	
	
	
	
	
	
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
			setError(last);
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

////验证客户支付价格
function checkUserPrice() {
	var text=$("#userinput").val();
	if(text == null ||text=='' || text=='0')
		
		return true;
	if(!checkNumber(text)){
		$("#userinput").val("");
		$("#userinput").focus();
		var div=$("#userinput").parent();
		div.addClass('has-error');
		$("#error-user-price").show();
		return false;
	}else{
		var div=$("#userinput").parent();
		div.removeClass('has-error');
		$("#error-user-price").hide();
		
		if(text=="0.0"){
			$("#userinput").val("0");
		}
		return true;
	}
}

////验证供应商支付价格
function checkProviderPrice() {
	var text=$("#providerInput").val();
	if(text == null ||text=='' || text=='0')
	
		return true;
	if(!checkNumber(text)){
		$("#providerInput").val("");
		$("#providerInput").focus();
		var div=$("#providerInput").parent();
		div.addClass('has-error');
		$("#error-provider-price").show();
		return false;
	}else{
		var div=$("#providerInput").parent();
		div.removeClass('has-error');
		$("#error-provider-price").hide();
		if(text=="0.0"){
			$("#providerInput").val("0");
		}
		return true;
	}
}

////验证比例
function checkBiliPrice(text) {
	var bili=text;
     if(!checkNumber(text)){
    	 return false;
     }
     else{
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
function verifyUser(){
	var text=$("#userName").val();
	var hidden=$("#userId").val();
	var state=false;
	syncLoadData(function(msg) {
		for (var int = 0; int < msg.length; int++) {
			var user = msg[int];
			if(user.id+''.trim() == hidden.trim()){
				if(user.userName.trim() == text.trim()){
					state= true;
				}else{
					state= false;
				}
				break;
			}
		}
	}, getContextPath() + '/mgr/projects/user/search/info', $.toJSON({
		userName : text
	}));
	return state;
}
function verifyTeam(){
	var text=$("#teamName").val();
	var hidden=$("#teamId").val();
	var state=false;
	if(text.trim() == '' ){
		return true;
	}else{
		syncLoadData(function(msg) {
			for (var int = 0; int < msg.length; int++) {
				var team = msg[int];
				if(team.teamId+''.trim() == hidden.trim()){
					if(team.teamName.trim() == text.trim()){
						state= true;
					}else{
						state= false;
					}
					break;
				}
			}
		}, getContextPath() + '/mgr/projects/team/search/info', $.toJSON({
			teamName : text
		}));
	}
	return state;
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
			 $("#div-friendship").addClass('hide');
		 }
		 //清空数据
		 $("#input-referrer").val("");
		 $("#referrer-Id-hidden").val("");
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
//-->添加推荐人相关处理
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
function enableSubmitBtnEnent(){
	var state=$(".state").text().trim();
	disableSubmitBtnEnent();
	if(state=='update'){
		$("#indent-btn").on('click',function(){
			updateProjectajax();
		});
	}else{
		$("#indent-btn").on('click',function(){
			addProject();
		});
	}
}
function disableSubmitBtnEnent(){
	$("#indent-btn").off('click');
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
////////////////////////////////////////////////////////////////////////
//add Synergy by laowang begin 2016-5-25 12:35
function addSynergy(name,ratio,userid,synergyid){
	var currCount=$("div[id^=Synergy-info]").length;
	if(currCount<3){
		var html = createSynergyView(name == undefined ? "" : name,
				ratio == undefined ? "" : ratio,userid == undefined ? "" : userid,
				synergyid == undefined ? "" : synergyid);
		$("#Synergy-root").append(html);
		setSynergyEvent();
	}else{
		$('#error-Synergy').text('不能多于3个协同人');
		$('#error-Synergy').show();
	}
}

function setSynergyEvent(){
	var deleteSynergys=$("[id^=deleteSynergy]");
	deleteSynergys.off('click');
	var cout=deleteSynergys.length;
	deleteSynergys.on('click',function(){
		if(cout != 0){
			var x=$(this).parent().parent().find("input#synergy-id");
			if(x.val().trim() != ''){
				
				removeSynergy($(x).val().trim());
				
			}
			$(this).parent().remove();
		}				
	});
	$.each(deleteSynergys,function(i,item){
		var x2=$(item).parent();
		//var x3=x2.find("input#name")
		initSynergy(x2);
	});
}
function removeSynergy(id){
	loadData(null, getContextPath() + '/mgr/projects/remove/synergy', $.toJSON({
		name:id
	}));
}

function createSynergyView(name,ratio,userid,synergyid){
	var $body='<div id="Synergy-info">';
	$body+=
	'<div id="select" style="display: inline-block;">'+
	' <input  class="cooperative-input cooperative-input border-gray form-control" type="text" id="name" value="'+name+'" />'+
	' <ul id="ul-select-synergy" style="position: absolute;left:200px; overflow: auto;width:160px; overflow: hidden; background-color: white;"  > </ul>  '+
	'</div>'+
	' <input class="cooperative-input cooperative-input border-gray form-control" type="text" id="ratio"  value="'+ratio+'" />&nbsp%'+
	' <input type="hidden" id="user-id"  value="'+userid+'"  /> '+
	' <input type="hidden" id="synergy-id"  value="'+synergyid+'"  /> '+
	' <button class="glyphicon glyphicon-minus" id = "deleteSynergy" ></button>';
	$body+='</div>';
	return $body;
}

function getViewSynerhy() {
	var base_Synergy = $("div[id^=Synergy-info]");
	var currCount=base_Synergy.length;
	var synergys = new Array(currCount);
	for (var i = 0; i < synergys.length; i++) {
		var synergy=base_Synergy[i];
		var userId=$(synergy).find("input#user-id").val();
		var ratio=$(synergy).find("input#ratio").val().trim();
		var userName=$(synergy).find("input#name").val().trim();
		var synergyId=$(synergy).find("input#synergy-id").val().trim();
		synergys[i] = {
				userId:userId,
				userName:userName,
				ratio:ratio,
				synergyId:synergyId
		};
	}
	return synergys;
}
function verifySynerhy(){
	var dbUser = '';
	var totalPrice='';

	var base_Synergy = $("div[id^=Synergy-info]");
	if(base_Synergy  != null && base_Synergy.length > 0){
		
		
		
		var hasError=false;
		$.each(base_Synergy,function(i,item){
			//1.用户身份服务器验证
			//2.占有比例
			var userId = $(item).find("input#user-id").val().trim();
			var userName = $(item).find("input#name").val().trim();
			var ratio = $(item).find("input#ratio").val().trim();
			syncLoadData(function(msg) {
				dbUser=msg;
			}, getContextPath() + '/mgr/projects/staff/static/list', null);
			
			if(dbUser != ''){
				var verifyTrue =false;
				for (var int = 0; int < dbUser.length; int++) {
					var referrer = dbUser[int];
					var name=referrer.staffName+''.trim();
					var id=referrer.staffId;
					if(userId == id && name == userName){
						verifyTrue =true;
						break;
					}else{
						verifyTrue =false;
						$(item).find("input#name").focus();
						$('#error-Synergy').text('协同人不正确');
					}
				}
				
				$(item).find("input#name").on('click',function(){
					$('#error-Synergy').hide();
				});
				
			//验证比例
				if(checkBiliPrice(ratio)){
					
						totalPrice = totalPrice+ratio;
						if(totalPrice>=100||totalPrice<0){
							verifyTrue =false;
							$(item).find("input#ratio").focus();
							$('#error-Synergy').text('比例总和不能大于100');
						}
				}
				
				else{
					$('#error-Synergy').text('请填写数字');
				}
				$('#error-Synergy').hide();
			//	
				if(!verifyTrue){
					hasError=true;
					
					$('#error-Synergy').show();
				}
				else{
					$('error-Synergy').hide();
				}
			}
		});
		return hasError;
		
	}
}

//add Synergy by laowang end 2016-5-25 12:35
