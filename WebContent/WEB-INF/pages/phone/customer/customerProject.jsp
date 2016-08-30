<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/phone/customer/customerProject.css" var="customerInfoCss"/>


<%-- import JS --%>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/customer/customerProject.js" var="customerInfoJs"/>



<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta content="telephone=no" name="format-detection" />
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>移动端登录&&注册</title>
	<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${commonCss}">
	<link rel="stylesheet" href="${customerInfoCss}">
	<link rel="stylesheet" href="${providerInfoPhoneCss}">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->

	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${commonJs }"></script>
    <script src="${customerInfoJs }"></script>


</head>
<body>

			<div class="headerNew">
			         <a href="javascript:history.back(-1);">
			              <div class="leftHeader">
							 <div class="back"></div>
						  </div>
					 </a>
					 
					 <a href="/phone/portal" target="_self">	  	
				   	     <div class="midHeader">
							 <div class="logo"></div>
						  </div>
					</a>	  
			</div>

   		<!--banner 区  -->
   		<a href="<spring:url value="/phone/customer/customerInfo"/>">
		<div class="topHeader">
                        <div class="topContent"> 
			                  <div class="infoHeadSide sameLine ">
				                 <img class="infoHead" id="infoHead" src="${imgPath}/provder/providerHead.jpg">
				              </div> 
				              <ul class="topInfo sameLine ">
				                 <li>
				                   <div>昵称</div>
				                   <img class="male" src="${imgPath}/phone/customer/male.png"></img>
				                 </li>
				                 <li>公司名称</li>
				              </ul>
				              <div class="toInfo">
				              	<img  src="${imgPath}/phone/customer/noOpen.png">
				              </div>
			            </div>
		</div>
		</a>
		
		<!--选项卡 区  -->
		<div class="row">
		  <div class="optionCard col-xs-12">
		   		<div class="col-xs-6 doProject">
		   		    <div class="doing">进行项目</div>
		   		</div>
		   		<div class="col-xs-6 historyProject">
		   		    <div class="noDoing">历史项目</div>
		   		</div>
		  </div> 
		</div>
		
		<!--卡片区-->
		<div id="preojectArea">
		         <div class="projectCard hide" >
			             <div class="cardTitle">
				               <div class="cardTitleWord">
				                                                     项目名称
				               </div>
				               <div class="cardStatues">
				                 80%
				               </div>
			             </div>
			             <div class="step">
			                <div class="content">
			                 <div class="stepName"> 
			                    <div class="firstTitle">沟通</div>
			                    <div>方案</div>
			                    <div>商务</div>
			                    <div>制作</div>
			                    <div class="lastTitle">交付</div>
			                 </div>
			                 <div class="stepLine">
			                     <div class="borderDiv"></div>
				                 <div class="firstStep"></div>
				                 <div></div>
				                 <div></div>
				                 <div></div>
				                 <div class="lastStep"></div>
			                 </div>
			          
			                   <img class="deg0" src="${imgPath}/phone/customer/noClean.png">
			                 <div class="stepTime"> 
			                    
			                    <div class="cleanTime">2016-5-1</div>
			                    <div>2016-5-2</div>
			                    <div>2016-5-3</div>
			                    <div>2016-5-4</div>
			                    <div>2016-5-5</div>
			                 </div>
			                 
			                </div> 
			             </div>
			             
			             <div class="getMoreInfo">
			                 <div class="autoDiv">
			                    <div class="openDiv open" id="openProject">
			                          <img class="sameLine" src="${imgPath}/phone/customer/projectInfo.png">
			                          <div class="sameLine infoTitle">项目信息</div>
			                          <img class="sameLine imgright" src="${imgPath}/phone/customer/noOpen.png" id="openIcon">
			                          <img class="sameLine imgright hide" src="${imgPath}/phone/customer/open.png" id="closeIcon">
			                    </div>
			                    <div class="openContent hide" id="projectContent">
			                         <div class="openArea">
			                              <div class="openInfo">
			                                   <div >
			                                                                                                     项目编号
			                                  </div>
			                                  <div class="projectWidth">
			                                   dasdadasdadads131231
			                                  </div>
			                              </div>
			                               <div class="openInfo">
			                                   <div >
			                                                                                                     项目价格
			                                  </div>
			                                  <div class="projectWidth">
			                                   dasdadasdadads131231
			                                  </div>
			                              </div>
			                         </div>
			                    </div>
			                 </div>
			                 
			                 <div class="autoDiv">
			                    <div class="openDiv open" id="openFile">
			                          <img class="sameLine" src="${imgPath}/phone/customer/projectFlie.png">
			                          <div class="sameLine infoTitle">项目文件</div>
			                          <img class="sameLine imgright" src="${imgPath}/phone/customer/noOpen.png" id="openIcon">
			                          <img class="sameLine imgright hide" src="${imgPath}/phone/customer/open.png" id="closeIcon">
			                    </div>
			                    <div class="proJectDiv hide" id="projectFile">
			                           <div class="proJectArea">
				                              <div class="png" style="display:inline-block"></div>
				                              <ul style="display:inline-block">
					                                <li>项目文件</li>
					                                <li>上传于2016012313</li>
				                              </ul>
				                              <div class="icon">
				                                <div class="find"></div>
				                                 <div class="share"></div>
				                              </div>
			                           </div>
			                           <div class="line"></div>
			                            <div class="proJectArea">
				                              <div class="png" style="display:inline-block"></div>
				                              <ul style="display:inline-block">
					                                <li>项目文件</li>
					                                <li>上传于2016012313</li>
				                              </ul>
				                              <div class="icon">
				                                <div class="find"></div>
				                                 <div class="share"></div>
				                              </div>
			                           </div>
			                    </div>
			                 </div>   
			                 
			                 <div class="autoDiv">
			                    <div class="openLastDiv open" id="openBoard">
			                          <img class="sameLine" src="${imgPath}/phone/customer/note.png">
			                          <div class="sameLine infoTitle">留言板</div>
			                          <img class="sameLine imgright" src="${imgPath}/phone/customer/noOpen.png" id="openIcon">
			                          <img class="sameLine imgright hide" src="${imgPath}/phone/customer/open.png" id="closeIcon">
			                    </div>
			                    <div class="board hide" id="projectBoard">
			                           <div class="boardArea">
			                              <div style="width:90%;margin:0 auto"><textarea></textarea></div>
			                              <div class="btn-red-common">提交</div>
			                              <div class="historyNote">
				                                <div class="noteArea">
				                                      <div> 
						                                <img>
						                              </div> 
						                              <ul style="display:inline-block">
							                                <li>项目文件</li>
							                                <li>上传于2016012313</li>
						                              </ul>
				                           		</div>
				                           		<div class="noteArea">
				                                      <div> 
						                                <img>
						                              </div> 
						                              <ul style="display:inline-block">
							                                <li>项目文件</li>
							                                <li>上传于2016012313</li>
						                              </ul>
				                           		</div>
			                              </div>
			                           </div>
			                    </div>
			                 </div>    
			             </div>
		         </div>
		      
		</div>
		
		
		
</body>
</html>