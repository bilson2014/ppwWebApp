<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/phone/searchView.css" var="searchViewCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/searchView.js" var="searchViewJs"/>

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
	<meta name="keywords" content="拍片网下单,视频交易,广告购买,导演制作费,拍片下单">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_订单页</title>

	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${searchViewCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${searchViewJs }"></script>
</head>
<body>
	<div class="wrap">
		<div class="header">
			<!-- logo -->
			<dl class="header-ul">
				<dd>
					<a href="javascript:history.back(-1);">
						<div class="back"></div>
					</a>
				</dd>
				<dd>
					<a href="/phone/portal" target="_self">
						<div class="logo"></div>
					</a>
				</dd>
			</dl>
		</div>
		
		<div class="content-wrap">
			<div class="search-section">
				<div class="header-search-wrap">
					<form method="get" action="/phone/search" id="s-form" accept-charset="utf-8">
						<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="搜索" />
						<input type="hidden" id="search-sortord" name="sortord" value="0" />
						<a href="javascript:void(0);" class="go bk_gray" onclick="return false;" id="s-btn"></a>
					</form>
				</div>
			</div>
			<div class="recomment-section">
				<div class="recomment-section-wrap">
					<div class="row">
						<label>电子商务</label><label>社交</label><label>广告营销</label>
					</div>
					<div class="row">
						<label>智能硬件</label><label>消费生活</label><label>旅游户外</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>