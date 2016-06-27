<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/error.css" var="errorCss"/>

<!-- import img path -->
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
	<title>订单失败</title>
	<link rel="stylesheet" href="${errorCss}">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>

		 <div class="header">
					<!-- logo -->
					<dl>
						<dd>
							<a >
								<div class=""></div>
							</a>
						</dd>
						<dd>
		
							<div class="logo"></div>
						</dd>
						<dd>
						</dd>
					</dl>
				</div>
				
			<div class="outSideDiv">	
				<div class="centerDiv">
				       <ul>
				          
				          <li><img src="${imgPath }/icons/error.png"></li>
				          <li><div class="centerWord">服务器去拍电影啦~请重新打开链接!</div></li>
				       </ul>
				</div>
            </div>
</body>
</html>