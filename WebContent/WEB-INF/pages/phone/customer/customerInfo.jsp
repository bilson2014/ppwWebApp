<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/phone/customer/customerInfo.css" var="customerInfoCss"/>


<%-- import JS --%>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/customer/customerInfo.js" var="customerInfoJs"/>



<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
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
		<div class="topHeader">
		     <ul>
		           <li>
		                  <div class="infoHeadSide">
			                 <img class="infoHead" id="infoHead" src="${imgPath}/provder/providerHead.jpg">
			              </div>  
		           </li>
		           <li class="providerName">昵称</li>
		           <li class="providerPlace"><img class="place" src="${imgPath}/phone/customer/femaleWhite.png"></li>
		           <li class="provinceCity">公司名称</li>
		        </ul>
		 
		</div>
		
		<!--信息区 -->
		
		<div class="infomation">
		 
		             <div class="cusInfo">
			                 <div class="infoTitle">
			                   <div class="baseImg"></div>
			                   <div class="baseTitle">基本信息</div>
			                 </div>
			                 <div class="infoContent">
			                      <ul>
			                         <li>
				                           <div class="titleWord">真实姓名</div>
				                           <div>dsdass</div>
			                         </li>
			                         <li>
					                       <div class="titleWord">电子邮件</div>
					                       <div>dasda</div>
			                         </li>
			                         <li>
					                       <div class="titleWord">QQ</div>
					                       <div>dasda</div>
			                         </li>
			                         <li>
					                       <div class="titleWord">客户来源</div>
					                       <div>dasda</div>
			                         </li>
			                      </ul>
			                 </div>
			                 <div class="line"></div>
			                  <div class="infoSet">
			                   <div class="baseImg"></div>
			                   <div class="baseTitle">安全设置</div>
			                 </div>
			                 <div class="infoContent">
			                      <ul>
			                         <li>
				                           <div class="titleWord">用户名</div>
				                           <div>dsdass</div>
			                         </li>
			                         <li>
					                       <div class="titleWord">手机号码</div>
					                       <div>dasda</div>
			                         </li>
			                      </ul>
			                 </div>
		             </div>
		</div>
		
		
		<div class="btn-gray-common">登出</div>

</body>
</html>