<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/payment/paylistSuccess.css" var="paylistSuccessCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/phone/payment/paylist.js" var="paylistJs"/>

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
	<title>手机订单页成功</title>
	<link rel="stylesheet" href="${paylistSuccessCss }">
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
		
							<a href="<spring:url value="/phone/salesman/${uniqueId }"/>" target="_self">
								<div class="logo"></div>
							</a>
						</dd>
						<dd>
						</dd>
					</dl>
				</div>
				
			<div class="outSideDiv">	
				<div class="centerFailDiv">
				       <ul>
				          <li><img src="${imgPath }/icons/failSmile.png"></li>
				          <li class="word">支付失败</li>
				          <li><div class="failWaring">
				                 <ul>
				                     <li><img src="${imgPath }/icons/warning.png">温馨提示:</li>
				                     <li>请确认您的银行卡开通了网上银行功能</li>
				                     <li>如果您的银行卡没有扣款,支付没有成功,可以返回重新选择支付方式</li> 
				                     <li>如果您的银行卡已经扣款,但是支付没有成功,可能是由于网络传输问题造成,请不要担心,我们会尽快处理</li> 
				                     <li>如有其他问题请联系客服</li>
				                     <li>客服电话:182xxxxxxxxx</li>
				                 </ul>
				              </div>
				          <li/>
				       </ul>
				</div>
            </div>
	
    
     
		
	<script src="${jqueryJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${paylistSuccessCss}"></script>
</body>
</html>