var StepTool;
var stepListJson;
var isShow = false;
var checkHidden = false;
var userName;
var teamName;
var referrerList;
var isMore = true;
var angle = 0;
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
		$('#helpLabel').hide();
		
		addSynergy();
	});
	//add Synergy by laowng end 2016-5-25 12:35
	
	$("#open-div").on('click',function(){
		isMoreShow();
	});
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
function getReferrerData(name){
		syncLoadData(function(msg) {
			referrerList=msg;
		}, getContextPath() + '/mgr/projects/search/employee/list', $.toJSON({
			name:name
		}));
}
//推荐人检索
function searchReferrer(inputString) {
	//getReferrerData();
	loadData(function (msg){
		var table=$("#ul-select-referrer");
		table.html("");
		msg.forEach(function(referrer){
			var name=referrer.employeeRealName+''.trim();
				var li=$("<li data-id='"+referrer.employeeId+"' data-name='"+referrer.employeeRealName+"'>"+referrer.employeeRealName+"</li>");
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
		});
	}, getContextPath() + '/mgr/projects/search/employee/list', $.toJSON({
		name:inputString
	}));
}
//协同人
function searchSynergy(input) {
	loadData(function (msg){
		var inputString=input.val().trim();
		var div=$(input).parent().parent();
		var table=div.find("ul#ul-select-synergy");
		table.html("");
		msg.forEach(function(referrer){
			var li=$("<li data-id='"+referrer.employeeId+"' data-name='"+referrer.employeeRealName+"'>"+referrer.employeeRealName+"</li>");
			li.on("click",function(){
				var name=jQuery(this).attr('data-name');
				var id=jQuery(this).attr('data-id');
				isShow = false;
				table.html("");
				table.hide();
				//详细业务相关
				div.find("input#name").val(name);
				div.find("input#user-id").val(id);
				clearError(div.find("input#name"));
				$('#error-Synergy').hide();
			});
			table.append(li);
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
	}, getContextPath() + '/mgr/projects/search/employee/list', $.toJSON({
		name:input.val().trim()
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
		$("#userinput").val("");
		$("#providerInput").val("");
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
		if($("#projectSource").val().trim()=='个人信息下单'){
			$("#div-friendship").removeClass('hide');
			$("#referrer-Id-hidden").val(msg.referrerId);
			$("#input-referrer").val(msg.referrerName);
		}
		
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
				$('#helpLabel').hide();
<<<<<<< HEAD
=======
				
				//addSynergy(item.userName,(item.radio * 100),item.userId,item.synergyId);
>>>>>>> afa2e1b85b5bd1d834f2ca7629add287d012b09b
				addSynergy(item.userName,(parseFloat(item.ratio) * 100).toFixed(0),item.userId,item.synergyId);
			});
		}
		if(msg.customerPayment+'' == '0.0')
			$("#userinput").val('0');
		else
			$("#userinput").val(msg.customerPayment);
		if(msg.providerPayment+'' == '0.0')
			$("#providerInput").val('0');
		else
			$("#providerInput").val(msg.providerPayment);
		
		hasPirce();
		
	}, getContextPath() + '/mgr/projects/get-redundantProject', $.toJSON({
		id : currentProject
	}));
}

function updateProjectajax() {
	//解绑事件防止多次点击
	disableSubmitBtnEnent(0);
	if(!verifyFrom()){
		//验证错误，恢复事件
		enableSubmitBtnEnent();
		return;
	}

	var projectSerial = $(".projectId").val().trim();
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
	
	//add laowng
	var customerPayment=$("#userinput").val().trim();
	var providerPayment=$("#providerInput").val().trim();
	if(providerPayment == ''){
		providerPayment =0;
	}
	if(customerPayment == ''){
		customerPayment= 0;
	}
	
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
		synergys:getViewSynerhy(),
		providerPayment:providerPayment,
		customerPayment:customerPayment
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
	disableSubmitBtnEnent(0);
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
	//add laowng
	var customerPayment=$("#userinput").val().trim();
	var providerPayment=$("#providerInput").val().trim();
	
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
		synergys:getViewSynerhy(),
		providerInput:providerInput,
		customerPayment:customerPayment
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
			 getReferrerData(referrerInput.val().trim());
			 var error=true;
			 for (var int = 0; int < referrerList.length; int++) {
				 var referrer=referrerList[int];
				 if(referrer.employeeId == id ){
					 if(referrerInput.val().trim() == referrer.employeeRealName+''.trim() ){
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
//function initReferrer(sourece,referrerId) {
//	 if(sourece!=null && sourece!='' && sourece.trim()=='个人信息下单'){
//		 $("#div-friendship").removeClass('hide');
//		 $("#referrer-Id-hidden").val(referrerId);
//		 loadData(function(msg) {
//				referrerList=msg;
//				
//				referrerList.forEach(function(referrer){
//					var staffId=referrer.employeeId+''.trim();
//					if(staffId==referrerId){
//						$("#referrer-Id-hidden").val(staffId);
//						$("#input-referrer").val(referrer.staffName);
//					}
//				});
//				
//		 }, getContextPath() + '/mgr/projects/search/employee/list', null);
//	 }
//	 else{
//		 $("#div-friendship").addClass('hide');
//		 $("#input-referrer").val("");
//		 $("#referrer-Id-hidden").val("");
//	 }
//}
function enableSubmitBtnEnent(){
	var state=$(".state").text().trim();
	disableSubmitBtnEnent();
	
	if(state=='update'){
		$("#indent-btn").on('click',function(){
			updateProjectajax();
			//$("#isShow").modal('show');
			
		});
	}else{
		$("#indent-btn").on('click',function(){
			addProject();
		});
	}
	$('.bottom-div').hide();
	
	
}
function disableSubmitBtnEnent(check){
	$("#indent-btn").off('click');

	if(check!=undefined){
		$('.bottom-div').show();
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
			var x=$(this).parent().find("input#synergy-id");
			if(x.val().trim() != ''){
				removeSynergy($(x).val().trim());
			}
			$(this).parent().remove();
		}	
		
		var deleteSecondSynergys=$("[id^=deleteSynergy]");
		var couts=deleteSecondSynergys.length;
		
		if(couts==0){
			
			$('.cooperative').css('visibility','hidden');
			$('#helpLabel').show();
			
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
	var $body='<div id="Synergy-info">'+
		'<div id="select" style="display:inline-block;margin-left:48px">'+
		'  <input  class="cooperative-input cooperative-input border-gray form-control" type="text" id="name" value="'+name+'" />'+

		'  <ul class="ul-option-common" id="ul-select-synergy" style="position: absolute;z-index:999; overflow: auto; overflow: hidden; background-color: white;"  > </ul>  '+
		'  <label  class="synergy synergy-left visible" id="name-error" >请选择协同人</label>'+

		' <input type="hidden" id="user-id"  value="'+userid+'"  />' +
		'</div>'+
		'<div style="display:inline-block;margin-left:48px">'+
		'  <input class="cooperative-input cooperative-input border-gray form-control" type="text" id="ratio"  value="'+ratio+'" />&nbsp%'+
		'  <label  class="synergy synergy-right visible" id="proportionError">比例错误</label>'+
		'</div>' +
		' <input type="hidden" id="synergy-id"  value="'+synergyid+'"  /> '+
		' <button class="glyphicon glyphicon-minus " id = "deleteSynergy" ></button>';
		$body+='</div>';

	return $body;
}

function getViewSynerhy() {
	var base_Synergy = $("div[id^=Synergy-info]");
	var currCount=base_Synergy.length;
	var synergys = new Array(currCount);
	var index =0 ;
	for (var i = 0; i < synergys.length; i++) {
		var synergy=base_Synergy[i];
		var userId=$(synergy).find("input#user-id").val();
		var ratio=$(synergy).find("input#ratio").val().trim();
		var userName=$(synergy).find("input#name").val().trim();
		var synergyId=$(synergy).find("input#synergy-id").val().trim();
		if(userId == null || userId == '' || userId == undefined )
			continue ;
		synergys[index] = {
				userId:userId,
				userName:userName,
				ratio:(ratio / 100),
				synergyId:synergyId
		};
		index++;
	}
	return synergys;
}
function verifySynerhy(){
	var dbUser = '';
	var totalPrice = 0 ;

	var base_Synergy = $("div[id^=Synergy-info]");
	if(base_Synergy  != null && base_Synergy.length > 0){
		var hasError=false;
		var baseRatio = 0;
		for (var ix = 0; ix < base_Synergy.length; ix++) {
			var item = base_Synergy[ix];
			var userId = $(item).find("input#user-id").val().trim();
			var userName = $(item).find("input#name").val().trim();
			var ratio = $(item).find("input#ratio").val().trim();
			var ratioName =$(item).find("input#ratio");
			var nameError=$(item).find("label#name-error");
			var proportionError=$(item).find("label#proportionError");
			
			/*$(item).find("input#name").on('change',function(){
				nameError.addClass("visible");
			});
			
            $(item).find("input#ratio").on('change',function(){
            	proportionError.addClass("visible");
			});*/
			
			$("input#name").on('click',function(){
				 $("label#name-error").addClass("visible");
				});
			
           $(item).find("input#ratio").on('change',function(){
           	proportionError.addClass("visible");
			});
			
            if(userName!='' || ratioName.val().trim() !='' ){// 如果填写的价格，那么联系人必须通过验证
            	getReferrerData(userName);//获取数据库模糊查询用户名字相同的协助人
    			if(referrerList != ''){
    				for (var int = 0; int < referrerList.length; int++) {
    					var referrer = referrerList[int];
    					var name=referrer.employeeRealName+''.trim();
    					var id=referrer.employeeId;
    					if(userId == id && name == userName){
    						hasError =false;
    						break;
    					}else{
    						hasError =true;
    					}
    				}
    			}else{

    				 //输入的信息数据库里不存在
    				hasError =true;
    			}
   			
    			
    			if(hasError){
    				$(item).find("input#name").focus();
    				nameError.removeClass("visible");
    				setError($(item).find("input#name"));
    			}
    			// 继续验证价格
    			var res = verifySynerhyRatio(ratio,baseRatio);
    			
    			if(res.str != 'ok'){
    				//价格发生问题
    				proportionError.text(res.str);
    				proportionError.removeClass('visible');
    				ratioName.focus();
    				setError(ratioName);
    				hasError =true;
    				break;
    			}
    			baseRatio=res.baseRatio;
           }

		}
		
		return hasError ? true : false;
	}
}

function verifySynerhyRatio(ratio,baseRatio){
	/**
	 * 1.验证是否非空
	 * 2.验证输入是否为数字
	 * 3.验证价格是否超过100
	 * 4.协调输出错误信息
	 */
	var res ="ok";
	baseRatio = Number(baseRatio)+Number(ratio);
	if(ratio == null || ratio == undefined || ratio == '' ){
		res = "请填写占有比例";
	} else if(!checkNumber(ratio)){
		res = "只能输入数字呦";
	}else if(baseRatio >= 100 || baseRatio < 1 ){
		res = "输入的比例过大";
	}
	return {str:res,baseRatio:baseRatio};
}

//add Synergy by laowang end 2016-5-25 12:35

//add showMore by lt end 2016-6-2 12:35
function isMoreShow(){
	
    if(isMore)
        {
    		$("#close-div").slideDown(10);
    		$('#loadWord').text('收起');
    		$('#circleImg').addClass('circle-180');
    		isMore=false;
        }   
    
      else
           {
    		$("#close-div").slideUp(10);
    		$('#loadWord').text('展开更多');
    		$('#circleImg').removeClass('circle-180');
    		isMore=true;
          }	
	
}
//end

//add checkHasPirce by lt end 2016-6-2 12:35
function hasPirce(){
	
	var userPrirce =$("#userinput").val().trim();
	var providerPrice =$('#providerInput').val().trim();
	
	if(userPrirce!=0||providerPrice!=0){
		$("#close-div").slideDown(10);
		$('#loadWord').text('收起');
		$('#circleImg').addClass('circle-180');
		isMore=false;
	}
	else{
		$("#close-div").slideUp(10);
		$('#loadWord').text('展开更多');
		$('#circleImg').removeClass('circle-180');
		isMore=true;
	}
	
	
}

