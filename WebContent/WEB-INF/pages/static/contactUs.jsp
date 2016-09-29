<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/about.css" var="aboutCss"/>
<spring:url value="/resources/css/login.css" var="loginCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>

<spring:url value="/resources/js/canvas.js" var="canvasJs"/>
<spring:url value="/resources/lib/disk/EasePack.min.js" var="EasePackJs"/>
<spring:url value="/resources/lib/disk/TweenLite.min.js" var="TweenLiteJs"/>
<spring:url value="/resources/lib/disk/rAF.js" var="rAFJs"/>
<spring:url value="/resources/lib/disk/demo-1.js" var="demoJs"/>

<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
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
	<title>拍片网－广告－宣传片－微电影－视频营销_联系我们</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${loginCss }">
	<link rel="stylesheet" href="${aboutCss }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${canvasJs }"></script>
	<script src="${EasePackJs }"></script>
	<script src="${TweenLiteJs }"></script>
	<script src="${rAFJs }"></script>
	<script src="${demoJs }"></script>
</head>
<body>
	<div class="wrap">
		<div class="card">
			<div class="front">
				<div class="login-content">
					<header class="header">
						<div class="header-help">
							<a href="<spring:url value="/"/>" target="_self" class="header-back__btn">关闭</a>
						</div>
						
						<div class="header-logo">
							<a href='<spring:url value="/" />' >
								<h1>拍片网</h1>
							</a>
							<p>联系我们</p>
						</div>
					</header>
					<section>
						<div class="content-wrap" style="top:0;">
							<label style="color:#999;font-weight: normal;padding-bottom: 10px;text-align: left;">拍片网是中国领先的视频营销服务平台，为企业客户提供视频创意、制作、传播一站式服务。客户只需在线上提交订单，拍片网视频专家将会提供一对一的服务。创意咨询免费，低预算拍大片，不满意可免单。</label>
							<h3 style="font-size:18px;font-weight: 600;color:#666;text-align: center;">联系电话</h3>
							<label style="color:#999;padding-top:18px;">010-58612562 (国内)</label>
							<label style="color:#999;padding-bottom:18px;">+8610-58612562 (海外)</label>
							<h3 style="font-size:18px;font-weight: 600;color:#666;text-align: center;">联系地址</h3>
							<label style="color:#999;padding-top:18px;">北京市朝阳区广渠门外大街优士阁A座2306室</label>
						</div>
					</section>
					<footer class="footer" style="top:25px;">
						<p>
							<strong>拍片网由北京攀峰友文科技有限公司负责研发运营</strong>
						</p>
					</footer>
				</div>
			</div>
		</div>
	</div>
</body>
</html>