
$().ready(function(){
	
	controlCard.init();
	createCard.init();
});


var controlCard = {
		
		init:function(){
			this.controlProject();
			this.controlFile();
			this.controlBoard();
		},
		//项目信息
		controlProject:function(){
			$('#openProject').on('click',function(){
				 
				if($('#openProject').hasClass('open')){
					controlCard.openProject();
				}else{
					controlCard.closeProject();
				}
			});
		},
		openProject:function(){
			$('#openProject').removeClass('open');
			$('#openIcon').addClass('hide');
			$('#closeIcon').removeClass('hide');
			$('#projectContent').removeClass('hide');
		},
		closeProject:function(){
			$('#openProject').addClass('open');
			$('#openIcon').removeClass('hide');
			$('#closeIcon').addClass('hide');
			$('#projectContent').addClass('hide');
		},
		//项目文件
		controlFile:function(){
			$('#openFile').on('click',function(){
				 
				if($('#openFile').hasClass('open')){
					controlCard.openFile();
				}else{
					controlCard.closeFile();
				}
			});
		},
		openFile:function(){
			$('#openFile').removeClass('open');
			$('#openIcon').addClass('hide');
			$('#closeIcon').removeClass('hide');
			$('#projectFile').removeClass('hide');
		},
		closeFile:function(){
			$('#openFile').addClass('open');
			$('#openIcon').removeClass('hide');
			$('#closeIcon').addClass('hide');
			$('#projectFile').addClass('hide');
		},
		//留言板
		controlBoard:function(){
			$('#openBoard').on('click',function(){
				 
				if($('#openBoard').hasClass('open')){
					controlCard.openBoard();
				}else{
					controlCard.closeBoard();
				}
			});
		},
		openBoard:function(){
			$('#openBoard').removeClass('open');
			$('#openIcon').addClass('hide');
			$('#closeIcon').removeClass('hide');
			$('#projectBoard').removeClass('hide');
		},
		closeBoard:function(){
			$('#openBoard').addClass('open');
			$('#openIcon').removeClass('hide');
			$('#closeIcon').addClass('hide');
			$('#projectBoard').addClass('hide');
		}
	
}


var createCard = 
 {
		  init:function(){
				var $body = this.createCustomerCard();
				var projectCard = $('#preojectArea');
				projectCard.append($body);
		  },
		  createCustomerCard:function(){
			  var body ='<div class="projectCard" >'
				              +'<div class="cardTitle">'
					              +' <div class="cardTitleWord"> '+"项目名称"+' </div>'
				                  +' <div class="cardStatues"> '+"80%"+' </div>'
				              +'</div>'
				              +'<div class="step">'
					              	+'<div class="content">'
					              	  +'<div class="stepName">'
						              	  	+'<div class="firstTitle">'+"沟通"+'</div>'
						              	  	+'<div>'+"方案"+'</div>'
						              	  	+'<div>'+"商务"+'</div>'
						              	  	+'<div>'+"制作"+'</div>'
						              	    +'<div class="lastStep">'+"交付"+'</div>'
					              	  +'</div>'
						              +'<div class="stepLine">'
					              	  +'</div>'
					              	  +'<div class="stepTime">'
					              	  	+'<div class="cleanTime">'+"2016-5-1"+'</div>'
					              	  	+'<div>'+"2016-5-1"+'</div>'
					              	  	+'<div>'+"2016-5-1"+'</div>'
					              	  	+'<div>'+"2016-5-1"+'</div>'
					              	    +'<div>'+"2016-5-1"+'</div>'
				              	      +'</div>'
				              	    +'</div>'
				              +'</div>'
				             +'<div class="getMoreInfo">'
				                  +'<div class="autoDiv">'
							           +'<div class="openDiv open" id="openProject">'
						                       +'<img class="sameLine" src="/resources/images/phone/customer/projectInfo.png">'
						                       +'<div class="sameLine infoTitle">'+"项目信息"+'</div>'
						                       +'<img class="sameLine imgright" src="/resources/images/phone/customer/noOpen.png" id="openIcon">'
						                       +'<img class="sameLine imgright hide" src="/resources/images/phone/customer/open.png" id="closeIcon">'
						               +'</div>'
						               +'<div class="openContent hide" id="projectContent">'
						                  +'<div class="openArea">'
						                      +'<div class="openInfo">'
							                      +'<div>'+"项目编号"+'</div>'
							                      +'<div class="projectWidth">'+"dsada"+'</div>'
						                      +'</div>'
						                      +'<div class="openInfo">'
							                      +'<div>'+"项目价格"+'</div>'
							                      +'<div class="projectWidth">'+"dsada"+'</div>'
							                  +'</div>'
						                  +'</div>'
						               +'</div>'
				                  +'</div>'
				                 
				             
				                  +'<div class="autoDiv">'
				                       +'<div class="openDiv open" id="openFile">'
						                       +'<img class="sameLine" src="/resources/images/phone/customer/projectFlie.png">'
						                       +'<div class="sameLine infoTitle">'+"项目文件"+'</div>'
						                       +'<img class="sameLine imgright" src="/resources/images/phone/customer/noOpen.png" id="openIcon">'
						                       +'<img class="sameLine imgright hide" src="/resources/images/phone/customer/open.png" id="closeIcon">'
						               +'</div>'
						               +'<div class="proJectDiv hide" id="projectFile">'
						                  	   +'<div class="proJectArea">'
							                  	   	 +'<div class="png" style="display:inline-block"></div>'
							                  	   	 +'<ul style="display:inline-block">'
							                  	       +'<li>项目文件</li>'
							                  	       +'<li>'+"上传于2016012313"+'</li>'
							                  	     +'</ul>'
							                  	     +'<div class="icon">'
							                  	       +'<div class="find"></div>'
							                  	       +'<div class="share"></div>'
							                  	     +'</div>'  
						                  	   +'</div>'
						                  	   		+'<div class="line"></div>'
						                  	 +'<div class="proJectArea">'
						                  	   	 +'<div class="png" style="display:inline-block"></div>'
						                  	   	 +'<ul style="display:inline-block">'
							                  	       +'<li>项目文件</li>'
							                  	       +'<li>'+"上传于2016012313"+'</li>'
							                  	 +'</ul>'
						                  	     +'<div class="icon">'
							                  	       +'<div class="find"></div>'
							                  	       +'<div class="share"></div>'
						                  	     +'</div>'  
				                  	   +'</div>'
						               +'</div>'
				                  +'</div>'
				                  
				               +'<div class="autoDiv">'
				                  +'<div class="openLastDiv open" id="openBoard">'
				                  +'<img class="sameLine" src="/resources/images/phone/customer/note.png">'
				                  +'<div class="sameLine infoTitle">留言板</div>'
				                  +'<img class="sameLine imgright" src="/resources/images/phone/customer/noOpen.png" id="openIcon">'
				                  +'<img class="sameLine imgright hide" src="/resources/images/phone/customer/open.png" id="closeIcon">'
				               +'</div>'
				               
				               +'<div class="board hide" id="projectBoard">'
				                   +'<div class="boardArea">'
				                      +'<div style="width:90%;margin:0 auto"><textarea></textarea></div>'
				                      +'<div class="btn-red-common">提交</div>'
				                      +'<div class="historyNote">'
				                          +'<div class="noteArea">'
				                             +'<div><img></div>'
				                             +'<ul style="display:inline-block">'
				                             	+'<li>'+"项目文件"+'</li>'
				                             	+'<li>'+"上传于2016012313"+'</li>'
				                             +'</ul>'
				                          +'</div>'
				                          +'<div class="noteArea">'
				                             +'<div><img></div>'
				                             +'<ul style="display:inline-block">'
				                             	+'<li>'+"项目文件"+'</li>'
				                             	+'<li>'+"上传于2016012313"+'</li>'
				                             +'</ul>'
				                          +'</div>'
				                      +'</div>'
				                   +'</div>'
				               +'</div>'
				                  
				             +'</div>'
				       +'</div>';      
			    return body;
			  
		  },
	
	
	
}

	

