<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/autoweb/autoWeb.css" var="errorCss"/>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<meta name="baidu-site-verification" content="dMz6jZpIwd" />
	<title>拍片网－响应式</title>
	<link rel="stylesheet" href="${errorCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->	
</head>
<body>
	<ul>
	<li>选项1</li>
	<li>选项2</li>
	<li>选项3</li>
	<li>选项4</li>
	</ul>
	<img style="width:100%" src="/resources/images/banner/host.JPG">
	<div class="autoControl">
		<img src="/resources/images/about/leftImg.png">
		<img src="/resources/images/about/midImg.png">
		<img src="/resources/images/about/rightImg.png">
		<img src="/resources/images/about/leftImg.png">
	</div>

</body>
</html>