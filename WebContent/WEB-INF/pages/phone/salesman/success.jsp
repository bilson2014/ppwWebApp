<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/salesman/success.css" var="successCss"/>

<!-- imgPath -->
<spring:url value="/resources/img" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<!-- iphone 手机默认全屏 -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- 取消数字被识别为电话号码 -->
	<meta name="format-detection" content="telephone=no" />
	<title>拍片网-移动端_订单成功提示页面</title>
	
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${successCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<div class="wrap">
		<div class="status-section">
			<div class="status-wrap">
				<dl>
					<dt class="right-icon"></dt>
					<dd>您已成功下单</dd>
					<!-- <dd>让我们开启一段愉快的拍片之旅</dd> -->
					<dd>专属视频管家会在2小时内与您沟通</dd>
				</dl>
			</div>
		</div>

		<div class="wechat-section">
			<div class="wechat-wrap">
			
		 <div class="info-wrap">
			<div class="info-section">
				<dl>
					<dt class="first-desc"></dt>
					<dd>免费创意策划</dd>
					<dd>专属视频管家-站式服务</dd>
				</dl>
				
				<dl>
					<dt class="second-desc"></dt>
					<dd>低预算拍大片</dd>
					<dd>低于行业价30%</dd>
				</dl>
				
				<dl>
					<dt class="third-desc"></dt>
					<dd>72小时极速出片</dd>
					<dd>不满意全额退款</dd>
				</dl>
			
			</div>
		</div>
			</div>
		</div>
	</div>
</body>
</html>