<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/providerFlow/infoStepEnd.css"
	var="providerLeaderCss" />
<spring:url value="/resources/css/provider/step-dc-style2.css"
	var="providerStepCss2" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/images" var="path" />


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
<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>供应商引导页-拍片网</title>
<link rel="stylesheet" type="text/css" href="${bootstrapCss}">
<link rel="stylesheet" type="text/css" href="${providerLeaderCss}">
<link rel="stylesheet" type="text/css" href="${providerStepCss2}">

<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs}"></script>
<spring:url value="/resources/images" var="imgPath" />
</head>
<body>
	<jsp:include flush="true" page="../header.jsp"></jsp:include>
	<div class="page">
	
	
		<div class="step">
			<div class="step-bar" id="step-bar">
				<div class="first" id="step-1" data-content="填写基本信息">1</div>
				<div class="line"></div>
				<div class="first" id="step-2" data-content="填写详细信息">2</div>
				<div class="line"></div>
				<div class="first " id="step-3" data-content="上传作品">3</div>
				<div class="line"></div>
			</div>	
	<div class="step-four-div" id="step4" data-step="4">
		<div class="success" id="success">
			<ul class="ul-step-three">
				<li>
					<div class="show-zero2 zeromodal-icon zeromodal-success">
						<span class="line tip"></span> <span class="line long"></span>
						<div class="placeholder"></div>
					</div>
				</li>
				<li class="title">恭喜您注册成功，已进入审核阶段</li>
				<li class="info">公司信息审核需要5个工作日，作品审核需要10个工作日。<br>审核结果将以邮件和短信的形式告知，请耐心等待。
				</li>
				<li class="stepThreeLi"><a href="/"><div class="btn-c-r">返回首页</div></a>
				</li>
			</ul>
		</div>
	</div>	
	</div>	
	</div>
	<!-- foot -->
	<jsp:include flush="true" page="../foot.jsp"></jsp:include>
	<!--新版底部-->





</body>

</html>