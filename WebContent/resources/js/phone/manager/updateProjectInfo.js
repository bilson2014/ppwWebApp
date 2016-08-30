var PopInterValObj,oTimer,successIntervalObj
$().ready(function(){
	
	projectSource.init();
	synergy.init();
	user.init();
	provider.init();
	price.init();
	time.init();
	
	
	$('#commit').on('click',function(){
		checkInfo.init();
		
	});

});


var projectSource ={
		
		    init:function(){
		    	this.showReferrer();
		    	this.initReferrerInput();
		    },  
		    showReferrer:function(){
		    	$("#projectSource").on('change',function(){
		   		 if($("#projectSource").val().trim()=='个人信息下单'){
		   			 $("#referrer").removeClass('hide');
		   		 }
		   		 else{
		   			 $("#referrer").addClass('hide');
		   		 }
		   		 //清空数据
//		   		 $("#input-referrer").val("");
//		   		 $("#referrer-Id-hidden").val("");
		      });
		    },
		    initReferrerInput:function (){
		    	$("#input-referrer").on('keydown', function() {
		    		userName = $('#input-referrer').val().trim();
		    	});
		    	$("#input-referrer").on('keyup', function() {
		    		if (userName != $('#input-referrer').val().trim()) {
		    			var inputString=$('#input-referrer').val().trim();
		    			projectSource.searchReferrer(inputString);
		    			isShow = true;
		    			$("#ul-select-referrer").show();
		    		}
		    	});
		    },
		  //推荐人检索
		    searchReferrer:function (inputString) {
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
		    	}, getContextPath() + '/mgr/projects/get/reffers', $.toJSON({
		    		name:inputString
		    	}));
		    }
		
}


var synergy ={
		init:function(){
			this.addSynergy();
			this.initSynergy();
		},
		initSynergy:function(input_div){
			var input=$(input_div).find("input#name");
			$(input).off('keydown');
			$(input).off('keyup');
			$(input).on('keydown', function() {
				userName = $(input).val().trim();
			});
			$(input).on('keyup', function() {
				if (userName != $(input).val().trim()) {
					isShow = true;
					synergy.searchSynergy($(input));
				}
			});
		},
		setSynergyEvent:function(){
			var deleteSynergys=$("[name^=delSynergy]");
			deleteSynergys.off('click');
			var cout=deleteSynergys.length;
			$.each(deleteSynergys,function(i,item){
				var x2=$(item).parent();
				synergy.initSynergy(x2);
			});
		},
		addSynergy:function(name,ratio,userid,synergyid){
			$('#addSynergy').on('click',function(){
				var currCount=$("div[name^=Synergy-info]").length;
				if(currCount<3){
					synergy.showOpenView();
					var html = synergy.createSynergyView();
					$("#synergy").append(html);
					synergy.setSynergyEvent();
					synergy.delSynergyView();
				}else{
					 successToolTipShow('不能多于3个协同人');
				}
			});
		},
		createSynergyView:function(name,ratio,userid,synergyid){
			var $body='<div class="autoContent" name="Synergy-info">'+
				'<div class="divPosition">'+
						'<input placeholder="协同人名称"class="name" id="name">'+
						'<input placeholder="比例" class="bl" id="ratio">'+
						'<span name="delSynergy"><div></div></span>'+
						'<span>%</span>'+
						'<input type="hidden" id="synergy-id"  value="'+1+'"/>'+
						'<input type="hidden" id="user-id"  value="'+userid+'"  />'+
						'<input type="hidden" id="synergy-id"  value="'+synergyid+'"  /> '+
						'<ul class="ul-option-common" id="ul-select-synergy"></ul>'+
				'</div>';
				$body+='</div>';
			return $body;
		},
		delSynergyView:function(){
			var deleteSynergys=$("[name^=delSynergy]");
			var cout=deleteSynergys.length;
			deleteSynergys.on('click',function(){
				if(cout != 0){
					var x=$(this).parent().find("input#synergy-id");
					if(x.val().trim() != ''){
						//removeSynergy($(x).val().trim());
					}
					$(this).parent().parent().remove();
				}
				var deleteSecondSynergys=$("[name^=delSynergy]");
				var couts=deleteSecondSynergys.length;
				if(couts==0){
					synergy.showCloseView();
				}
			});
		},
		removeSynergy:function(id){
			loadData(function(){
				
			}, getContextPath() + '/mgr/projects/remove/synergy', $.toJSON({
				name:id
			}));
		},
		verifySynerhyRatio:function(ratio,baseRatio){
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
			} else if(!checkDecimal(ratio)){
				res = "只能输入数字呦";
			}else if(baseRatio >= 100 || baseRatio < 1 ){
				res = "所有协同人比例之和小于100%";
			}
			return {str:res,baseRatio:baseRatio};
		},
		getReferrerData:function(name){
			syncLoadData(function(msg) {
				referrerList=msg;
			}, getContextPath() + '/mgr/projects/search/employee/list', $.toJSON({
				name:name
			}));
	},
		checkSynerhy:function(){
			var dbUser = '';
			var totalPrice = 0 ;
			var base_Synergy = $("div[name^=Synergy-info]");
			if(base_Synergy  != null && base_Synergy.length > 0){
				var hasError=false;
				var baseRatio = 0;
				var userIdArray = new Array();
				for (var ix = 0; ix < base_Synergy.length; ix++) {
					var item = base_Synergy[ix];
					var userId = $(item).find("input#user-id").val().trim();
					var userName = $(item).find("input#name").val().trim();
					var ratio = $(item).find("input#ratio").val().trim();
					var ratioName =$(item).find("input#ratio");
					userIdArray.push(userId);
//					 $("input#name").on('click',function(){
//						 //$("label#name-error").addClass("visible");
//						});
//		            $(item).find("input#ratio").on('change',function(){
//		            	//proportionError.addClass("visible");
//					});
		            if(userName!='' || ratioName.val().trim() !='' ){// 如果填写的价格，那么联系人必须通过验证
		            	synergy.getReferrerData(userName);//获取数据库模糊查询用户名字相同的协助人
		    			if(referrerList != ''){
		    				for (var int = 0; int < referrerList.length; int++) {
		    					var referrer = referrerList[int];
		    					var name=referrer.employeeRealName+''.trim();
		    					var id=referrer.employeeId;
		    					if(userId == id && name == userName){
		    						hasError =false;
		    						break;
		    					}else{
		    						$(item).find("input#user-id").val('');
		    						hasError =true;
		    					}
		    				}
		    			}else{
		    				 //输入的信息数据库里不存在
		    				hasError =true;
		    				
		    			}
		    			if(hasError){
		    				$(item).find("input#name").focus();
		    				successToolTipShow('推荐人不正确');
		    				return false;
		    			}
		    			// 继续验证价格
		    			var res = synergy.verifySynerhyRatio(ratio,baseRatio);
		    			
		    			if(res.str != 'ok'){
		    				//价格发生问题

		    				successToolTipShow(res.str);
		    				ratioName.focus();
		    				hasError =true;
		    				return false;
		    			}
		    			baseRatio=res.baseRatio;
		           }
		            //add same people check by lt 20160606
		            //begin
		            var userId = $(item).find("input#user-id").val().trim();
		            var s =userIdArray.length;
		            if(userIdArray.length!=1){
		            	
		            for(var i=0;i<userIdArray.length-1;i++)
		            {
		                    for(var j=1;j<userIdArray.length;j++)
		                    {
		                    	   if(userIdArray[i]==userIdArray[j]&&i!=j)
		                            {
		                    		    successToolTipShow('协同人重复了');
		                				$(item).find("input#name").focus();
		                                return false;
		                            }
		                    }
		                 }
		            }
				}
				 if(userId==''){
		         	successToolTipShow('协同人不存在');
		         	$(item).find("input#name").focus();
		         	 return false;
		         }
					var logiNname = $("#logiNname").val();
					if(logiNname == userName){
						successToolTipShow('自己不能是协同人');
						$(item).find("input#name").focus();
						 return false;
					}
				//end
				return true;
			}
			
			
		},
		showOpenView:function(){
			$("#synergy").removeClass('hide');
			$('#synergyInfo').addClass('white');
			$('#synergyTopLine').addClass('hide');
			$('#synergyBottomLine').addClass('hide');
		},
		showCloseView:function(){
			$("#synergy").addClass('hide');
			$('#synergyInfo').removeClass('white');
			$('#synergyTopLine').removeClass('hide');
			$('#synergyBottomLine').removeClass('hide');
		},
		searchSynergy:function(input) {
			loadData(function (msg){
				var inputString=input.val().trim();
				var div=$(input).parent();
				var table=div.find("ul#ul-select-synergy");
				table.html("");
				table.show();
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
}

var user ={
		init:function(){
			
			this.showUser();
			this.initUserInput();
			
		},
		showUser:function(){
			$('#userOpen').on('click',function(){
				 
				  if($('#userInfo').hasClass("white")){
					  user.showCloseView();
				  }else{
					  user.showOpenView();
				  }
				
			});
		},
		showOpenView:function(){
			$('#userOpenIcon').addClass('transform');
			$("#user").removeClass('hide');
			$('#userInfo').addClass('white');
			$('#userBottomLine').addClass('hide')
		},
		showCloseView:function(){
			$('#userOpenIcon').removeClass('transform');
			$("#user").addClass('hide');
			$('#userInfo').removeClass('white');
			$('#userBottomLine').removeClass('hide')
		},
		//初始化用户搜索框
		initUserInput:function(){
			$('#userName').on('keydown', function() {
				userName = $('#userName').val().trim();
			});
			$('#userName').on('keyup', function() {
				if (userName != $('#userName').val().trim()) {
					user.searchUser();
					$("#ul-select").show();
					isShow = true;
				}
				
			});
		},
		//用户搜索方法
		searchUser:function() {
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
							$("#userContact").val(contact);
							$("#userPhone").val(phone);
							$("#userId").val(id);
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
}

var provider ={
		init:function(){
			this.showProvider();
			this.initTeamInput();
		},
		showProvider:function(){
			$('#providerOpen').on('click',function(){
				  if($('#providerInfo').hasClass("white")){
					  provider.showCloseView();
				  }else{
					  provider.showOpenView();
				  }
			});
		},
		showOpenView:function(){
			$('#providerOpenIcon').addClass('transform');
			$("#provider").removeClass('hide');
			$('#providerInfo').addClass('white');
			$('#providerBottomLine').addClass('hide')
		},
		showCloseView:function(){
			$('#providerOpenIcon').removeClass('transform');
			$("#provider").addClass('hide');
			$('#providerInfo').removeClass('white');
			$('#providerBottomLine').removeClass('hide')
		},
		//初始化供应商搜索框
		initTeamInput:function(){
			$('#teamName').on('keydown', function() {
				teamName = $('#teamName').val().trim();
			});
			$('#teamName').on('keyup', function() {
				if (teamName != $('#teamName').val().trim()) {
					provider.searchTeam();
					$("#ul-select-team").show();
					isShow = true;
				}
				
			});
		},
		//团队搜索方法 
		searchTeam:function() {
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
						$("#teamContact").val(contact);
						$("#teamPhone").val(phone);
						$("#teamId").val(id);
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
}

var price ={
		init:function(){
			this.showPrice();
		},
		showPrice:function(){
			$('#priceOpen').on('click',function(){
				  if($('#priceInfo').hasClass("white")){
					  price.showCloseView();
				  }else{
					  price.showOpenView();
				  }
			});
		},
		showOpenView:function(){
			$('#priceOpenIcon').addClass('transform');
			$("#price").removeClass('hide');
			$('#priceInfo').addClass('white');
			$('#priceBottomLine').addClass('hide')
		},
		showCloseView:function(){
			$('#priceOpenIcon').removeClass('transform');
			$("#price").addClass('hide');
			$('#priceInfo').removeClass('white');
			$('#priceBottomLine').removeClass('hide')
		},
		//验证预计价格
		priceVerifyInputNotNull:function() {
				var first=$("#firstinput");
				var last=$("#lastinput");
				if(!checkNumber(first.val())){
					first.val("");
					successToolTipShow('请填写价格范围');
					price.showOpenView();
					first.focus();
					return false;
				}
				
				if(!checkNumber(last.val())){
					last.val("");
					successToolTipShow('价格范围出错');
					price.showOpenView();
					last.focus();
					return false;
				}
				
				if(first.val()=="0"){
					first.val('0');
				}
				if(last.val()=="0"){
					last.val('0');
				}
				
				if(parseInt(first.val())>parseInt(last.val())){
					last.val("");
					successToolTipShow('价格范围出错');
					return false;
				}
				return true;
		},
		//验证最终价格
		checkFinishPrice:function() {
			var text=$("#finishInput").val();
			if(text == null ||text=='' || text=='0'){
				$("#finishInput").val("");
				$("#finishInput").focus();
				successToolTipShow('请填写最终价格');
			}
				
			if(!checkNumber(text)){
				$("#finishInput").val("");
				$("#finishInput").focus();
				successToolTipShow('最终价格有误');
				return false;
			}
			
			return true;
		},
		  priceCheck:function(){
				$("#firstinput").on('change',function(){
	 				var res=price.priceVerifyInputNotNull();
	 			});
	 			
	 			$("#lastinput").on('change',function(){
	 				var res=price.priceVerifyInputNotNull();
	 			});
	 			
	 			$("#finishInput").on('change',function(){
	 				price.checkFinishPrice();
	 			});
		  }
}

var time ={
		init:function(){
			this.showTime();
			this.datepick();
		},
		showTime:function(){
			$('#timeOpen').on('click',function(){
				  if($('#timeInfo').hasClass("white")){
					  time.showCloseView();
				  }else{
					  time.showOpenView();
				  }
			});
		},
		showOpenView:function(){
			$('#timeOpenIcon').addClass('transform');
			$("#time").removeClass('hide');
			$('#timeInfo').addClass('white');
			$('#timeBottomLine').addClass('hide');
			$('#timetopLine').addClass('hide');
		},
		showCloseView:function(){
			$('#timeOpenIcon').removeClass('transform');
			$("#time").addClass('hide');
			$('#timeInfo').removeClass('white');
			$('#timeBottomLine').removeClass('hide');
			$('#timetopLine').addClass('hide');
		},
		datepick:function(){	
			$("input[id$='time']").datepicker({
				language: 'zh',
				dateFormat:'yyyy-MM-dd',
				minDate: new Date() 
		   });
		},
		VerifyTime:function(){
			var time=$("input[id$='time']");
			for (var int = time.length-1; int >=0 ; int--) {
				var currTime=$(time[int]).val();
				if(currTime!=''){
					for (var int2 = int; int2 >=0 ; int2--) {
						var currafter=$(time[int2]).val();
						if(currafter!=''){
							//第一个比第二个大返回true
							if(!dateCompare(currTime,currafter)){
								$(time[int]).focus();
								successToolTipShow('时间有误');
								return false;
							}
						}
					}
				}
			}
			return true;
		}
}

var checkInfo = {
		 init:function(){
			 this.check();
		 },

         check:function(){
        	 var error =$('#errorDiv');
        	 var projectName = $('#projectName');
        	 
        	 var userName = $('#userName');
        	 var userContact = $('#userContact');
        	 var userTel = $('#userPhone');
        	 
        	 var providerName = $('#teamName');
        	 var providerContact = $('#teamContact');
        	 var providerTel = $('#teamPhone');
        	 
        	    var gtstarttime = $("#gtstarttime").val().trim();
        		var fastarttime = $("#fastarttime").val().trim();
        		var swstarttime = $("#swstarttime").val().trim();
        		var zzstarttime = $("#zzstarttime").val().trim();
        		var jfstarttime = $("#jfstarttime").val().trim();
        		
        		
        		var res=synergy.checkSynerhy();
        		return;
        	 
        	 if(projectName.val()==null||projectName.val()==""){
        		 successToolTipShow('请填写项目名');
        		 projectName.focus();
        		 return;
        	 }
        	 
 			 if(userName.val()==null||userName.val()==""){
 				 if(!$('#userInfo').hasClass("white")){
 					user.showOpenView();
				  }
        		 successToolTipShow('请填写客户');
        		 userName.focus();
        		 return;
        	 }
 			 
 			 if(userContact.val()==null||userContact.val()==""){
        		 successToolTipShow('请填写客户联系人');
        		 userContact.focus();
        		 return;
        	 }
 			 
 			 if(userTel.val()==null||userTel.val()==""){
        		 successToolTipShow('请填写客户电话');
        		 userTel.focus();
        		 return;
        	 }
 			 
 			 if(providerName.val()==null||providerName.val()==""){
 				 if(!$('#providerInfo').hasClass("white")){
 					provider.showOpenView();
				  }
        		 successToolTipShow('请填写供应商');
        		 providerName.focus();
        		 return;
        	 }
 			 
 			 if(providerContact.val()==null||providerContact.val()==""){
 				if(!$('#providerInfo').hasClass("white")){
 					provider.showOpenView();
				  }
        		 successToolTipShow('请填写供应商联系人');
        		 providerContact.focus();
        		 return;
        	 }
 			 
 			 if(providerTel.val()==null||providerTel.val()==""){
 				if(!$('#providerInfo').hasClass("white")){
 					provider.showOpenView();
				  }
        		 successToolTipShow('请填写供应商电话');
        		 providerTel.focus();
        		 return;
        	 }
 			if(!price.priceVerifyInputNotNull())
 				return;
 			if(!price.checkFinishPrice())
 				return;
 			time.VerifyTime();
         }
	}



//成功信息 提示框弹出方法
function successToolTipShow(word){
	window.clearInterval(successIntervalObj);
	$('#errorDiv').text(word);
	$('#errorDiv').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideSuccessTooltip(){
	$('#errorDiv').hide('normal');
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


//本页作为更新页面时，填充页面数据方法
function updateProject_ViewInit() {
	var currentProject = getCurrentProject();
	loadData(function(msg) {
		$("#projectId").val("");
		$("#projectName").val("");
		$("#userName").val("");
		$("#userContact").val("");
		$("#userPhone").val("");
		$("#teamName").val("");
		$("#teamContact").val("");
		$("#teamPhone").val("");
		$("#firstinput").val("");
		$("#lastinput").val("");
		$("#description").val("");
		$("#gtstarttime").val("");
		$("#fastarttime").val("");
		$("#swstarttime").val("");
		$("#zzstarttime").val("");
		$("#jfstarttime").val("");
		$("#teamId").val("");
		$("#userId").val("");
		$("#firstinput").val("");
		$("#lastinput").val("");
		$("#finishInput").val("");
		$("#userinput").val("");
		$("#providerInput").val("");
		// put data
		$("#projectId").val(msg.serial);
		$("#projectName").val(msg.projectName);
		$("#userName").val(msg.userName);
		$("#userContact").val(msg.userContact);
		$("#userPhone").val(msg.userPhone);
		$("#teamName").val(msg.teamName);
		$("#teamContact").val(msg.teamContact);
		$("#teamPhone").val(msg.teamPhone);
		$("#projectSource").val(msg.source);
		//add wangliming 2016.5.10 11:28 begin
		//-->添加推荐人
	
			if($("#projectSource").val().trim()=='个人信息下单'){
			$("#div-friendship").removeClass('hide');
			$("#referrer-Id-hidden").val(msg.referrerId);
			$("#input-referrer").val(msg.referrerName);
			}
		
		//add wangliming 2016.5.10 11:29 end
		$("#teamId").val(msg.teamId);
		$("#userId").val(msg.customerId);
		
		$("#firstinput").val(msg.priceFirst);
		$("#lastinput").val(msg.priceLast);
		$("#finishInput").val(msg.priceFinish);
		////////////
		$("#description").val(msg.description);
		$("#gtstarttime").val(msg.time.gt);
		$("#fastarttime").val(msg.time.fa);
		$("#swstarttime").val(msg.time.sw);
		$("#zzstarttime").val(msg.time.zz);
		$("#jfstarttime").val(msg.time.jf);
		$("#page-title-title").text("项目信息修改");
			enableSubmitBtnEnent();
			
		// 初始化协同人
		var synergys = msg.synergys;
		$("#Synergy-root").html("");
		if(synergys != null && synergys.length > 0){
			$.each(synergys,function(i,item){
				$('.cooperative').css('visibility','visible');
				$('#helpLabel').hide();
				//addSynergy(item.userName,(item.radio * 100),item.userId,item.synergyId);
				addSynergy(item.userName,item.ratio,item.userId,item.synergyId);
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
//更新
function updateProjectajax() {
	//解绑事件防止多次点击
	disableSubmitBtnEnent(0);
	if(!verifyFrom()){
		//验证错误，恢复事件
		enableSubmitBtnEnent();
		return;
	}

	var projectSerial = $("#projectId").val().trim();
	var currentProject = getCurrentProject();
	var projectSerial = $("#projectId").val().trim();
	var projectName = $("#projectName").val().trim();
	var userName = $("#userName").val().trim();
	var userContact = $("#userContact").val().trim();
	var userPhone = $("#userPhone").val().trim();
	var teamName = $("#teamName").val().trim();
	var teamContact = $("#teamContact").val().trim();
	var teamPhone = $("#teamPhone").val().trim();
	var source=$("#projectSource").val().trim();
	var priceFirst=$("#firstinput").val().trim();
	var priceLast=$("#lastinput").val().trim();
	var priceFinish=$("#finishInput").val().trim();
	var teamId= $("#teamId").val();
	var customerId= $("#userId").val();
	
	var description = $("#description").val().trim();
	var gtstarttime = $("#gtstarttime").val().trim();
	var fastarttime = $("#fastarttime").val().trim();
	var swstarttime = $("#swstarttime").val().trim();
	var zzstarttime = $("#zzstarttime").val().trim();
	var jfstarttime = $("#jfstarttime").val().trim();
	
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
	//TODO:
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
		providerPayment:providerPayment,
		customerPayment:customerPayment
	}));
}
		

function submitForm(){
	var key=getCurrentProject();
	var path=getContextPath()+ "/mgr/projects/flow-index";
	var formBody = '<form action="'+path+'" method="post" oncomplete="false" id="submitkey" style="display: none;">';
	formBody += '<input type="text" name="key" value="'+ key +'" style="display: none">';
	formBody += '</form>';
	$('#save').append(formBody);
	$('#submitkey').submit().remove();
	form.submit();
}

function disableSubmitBtnEnent(check){
	$("#indent-btn").off('click');

	if(check!=undefined){
		$('.bottom-div').show();
	}
	
}







	

