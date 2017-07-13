<%@page import="java.lang.annotation.Target"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/providerFlow/infoStepOne.css" var="providerLeaderCss"/>
<spring:url value="/resources/css/provider/step-dc-style2.css" var="providerStepCss2"/>
<spring:url value="/resources/lib/webuploader/webuploader.css" var="webuploaderCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/providerFlow/infoStepTwo.js" var="leaderJs"/>
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs"/>
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>供应商引导页-拍片网</title>
	<link rel="stylesheet" type="text/css" href="${bootstrapCss}">
	<link rel="stylesheet" type="text/css" href="${providerLeaderCss}">
	<link rel="stylesheet" type="text/css" href="${providerStepCss2}">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<link rel="stylesheet" type="text/css" href="${datepickerCss}">
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs}"></script>
	<script src="${datepickerJs}"></script>
	<script src="${datepickerZhJs}"></script>
	<script src="${leaderJs}"></script>
	<script src="${webuploaderJs}"></script>


</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
  	<input id="unqiueId" value="${unqiueId}" />
    <jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" >
	  	       
	      <div class="step">
			  <div class="step-bar" id="step-bar">
			      <div class="first " id="step-1" data-content="填写基本信息">1</div>
			      <div class="line"></div>
			      <div class="first step-1" id="step-2" data-content="填写详细信息">2</div>
			      <div class="line"></div>
			      <div class="first" id="step-3" data-content="上传作品">3</div>
			      <div class="line"></div>
			      <div class="first" id="step-3" data-content="资质审核">4</div>
			  </div>
			  	      		  
	            <div class="step-two-div" id="step2" style="display:block" data-step="2">
	            <form:form  method="post" commandName="leader" id="toLeaderForm">    
  	      	               <div class="input-group-div" id="company-linkman-error">
  	      		       	 	  <span class="title-word">联系人姓名</span>	
  	      		       	 	  <form:input path="linkman" class="form-control step-one-input" id="company-linkman" placeholder="请填写联系人姓名"/>
  	      				  </div>
  	      				   <div class="input-group-div" id="company-email-error">
  	      		       	 	  <span class="title-word">邮箱</span>
  	      		       	 	  <form:input path="email" class="form-control step-one-input" id="company-email" placeholder="请填写邮箱"/>	
  	      				  </div>
  	      				   <div class="input-group-div noStar" id="company-webchat-error">
  	      		       	 	  <span class="title-word">微信</span>
  	      		       	 	  <form:input path="webchat" class="form-control step-one-input" id="company-webchat" placeholder="请填写微信"/>	
  	      				  </div>
  	      				   <div class="input-group-div noStar" id="company-qq-error">
  	      		       	 	  <span class="title-word">QQ</span>
  	      		       	 	  <form:input path="qq" class="form-control step-one-input" id="company-qq" placeholder="请填写QQ"/>		
  	      				  </div>
  	      				   <div class="input-group-div noStar" id="company-phone-errors">
  	      		       	 	  <span class="title-word">座机</span>
  	      		       	 	  <form:input path="telNumber" class="form-control step-one-input" id="company-phone" placeholder="请填写座机"/>			
  	      				  </div>
                  </form:form>
                           <div class="bottom-div">
                           	 <Button class="gy-btn"  id="step2Pre">上一步</Button>  
                           	 <Button class="red-btn btn-c-r" id="step2Next">下一步</Button>    
                           </div>
               
	             </div>			  
            </div>
	<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
</body>

</html>