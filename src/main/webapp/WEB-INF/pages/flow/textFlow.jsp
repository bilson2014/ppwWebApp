<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/css/flow/textFlow.css" var="textCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/flow/textFlow.js" var="textFlowJs"/>
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="">
<meta name="description" content="">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>我的项目Beta</title>
<link rel="stylesheet" href="${textCss}">
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${textFlowJs}"></script>

<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->

</head>

<body>

     <a href="/project/start/project"><div id="toCreate"></div></a>
     
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="realName" value="${realName}" />
	<input type="hidden" id="photo" value="${photo}" />
	
	<div class="page">
	    <jsp:include flush="true" page="../header.jsp"></jsp:include>
	    <jsp:include flush="true" page="flowMenu.jsp"></jsp:include>  
	    
	     	<c:if test="${!empty gTasks}">
							<c:forEach items="${gTasks }" var="staff" varStatus="status">
                                     <div class="cardNum hide"></div>
							</c:forEach>
			</c:if> 
	
			<div class="productListArea">
		 <iframe class="frame" id="content-frame" class="iframe" src="mgr/favourites"></iframe>
		     </div>	  
   </div>   

	<!-- video-->
</body>

</html>
