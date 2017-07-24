<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs" />
<spring:url value="/resources/css/modelTool.css" var="modelTool"/>
<spring:url value="/resources/js/modelTool.js" var="modelToolJs"/>
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
<link rel="stylesheet" href="${modelTool}">
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${modelToolJs}"></script>
</head>
<body> 
	 <div class="tooltip-check" id="tooltip-check" >
	     <div class="checkCard">
	          <div class="closeCheck" id='closeCheck'></div>
	          <div class="checkInfo" id="checkInfo">error</div>
	          <div class="checkBottom">
	                 <div class="sureCheck" id="sureCheck">确认</div>
	          </div>
	     </div>
	</div>
</body>
</html>