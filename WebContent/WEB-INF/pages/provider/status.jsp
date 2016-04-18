<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/provider/status.css" var="providerStatusCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/status.js" var="providerStatusJs"/>

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
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网 | 供应商状态页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${providerStatusCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerStatusJs }"></script>
</head>
<body>
	<input type="hidden" value="${status }" id="company-status"/>
	<input type="hidden" value="${cKey }" id="company-key"/>
	<div class="content-wrap">
		<!-- 进度条 -->
		<div id="process-0" class="section4 process hide">
			<div class="node fore ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">提交审核</li></ul></div>
			<div class="proce ready"><ul><li class="tx1">&nbsp;</li></ul></div>
			<div class="node ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">系统审核中</li></ul></div>
			<div class="proce doing"><ul></ul></div>
			<div class="node wait"><ul><li class="tx1" id="promise_time_1"></li><li class="tx2">审核通过</li><li class="tx3">&nbsp;</li></ul></div>		
		</div>
		
		<!-- 审核通过 -->
		<div id="process-1" class="section4 process hide">
			<div class="node fore ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">提交审核</li></ul></div>
			<div class="proce ready"><ul><li class="tx1">&nbsp;</li></ul></div>
			<div class="node ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">系统审核中</li></ul></div>
			<div class="proce ready"><ul></ul></div>
			<div class="node success"><ul><li class="tx1" id="promise_time_0"></li><li class="tx2"><span style="color: green;">审核成功</span></li><li class="tx3">&nbsp;</li></ul></div>
		</div>
		
		<!-- 未审核通过 -->
		<div id="process-2" class="hide">
			<div >
				<div class="alert alert-danger" role="alert" id="company-recomment">${recomment }</div>
			</div>
			<div class="section4 process">
				<div class="node fore ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">提交审核</li></ul></div>
				<div class="proce ready"><ul><li class="tx1">&nbsp;</li></ul></div>
				<div class="node ready"><ul><li class="tx1">&nbsp;</li><li class="tx2">系统审核中</li></ul></div>
				<div class="proce ready"><ul></ul></div>
				<div class="node failure"><ul><li class="tx1" id="promise_time_0"></li><li class="tx2"><span style="color: red;">审核失败</span></li><li class="tx3">&nbsp;</li></ul></div>
			</div>
			<div class="btn-pos">
				<button type="button" class="btn btn-primary">提交审核</button>
			</div>
		</div>
		<!-- 未提交 -->
		<div id="process-3" class="hide">
			<div class="section4 process">
				<div class="node fore wait"><ul><li class="tx1">&nbsp;</li><li class="tx2">提交审核</li></ul></div>
				<div class="proce wait"><ul><li class="tx1">&nbsp;</li></ul></div>
				<div class="node wait"><ul><li class="tx1">&nbsp;</li><li class="tx2">系统审核中</li></ul></div>
				<div class="proce wait"><ul></ul></div>
				<div class="node wait"><ul><li class="tx1" id="promise_time_0"></li><li class="tx2">审核通过</li><li class="tx3">&nbsp;</li></ul></div>
			</div>
			<div class="btn-pos">
				<button type="button" class="btn btn-primary">提交审核</button>
			</div>
		</div>
		
		<div id="mainPage" class="successLabel">
			<div class="alert alert-success" role="alert" id="alert-success">
				恭喜您验证通过，<a href="#" class="alert-link" id="myPage" target="_blank">点击跳转主页</a>
			</div>
		</div>
	</div>
</body>
</html>