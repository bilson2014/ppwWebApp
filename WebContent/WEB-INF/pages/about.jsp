<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
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
	<title>拍片网－广告－宣传片－微电影－视频营销_登录须知</title>
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
							<a href="<spring:url value="/login"/>" target="_self" class="header-back__btn">帮助</a>
						</div>
						
						<div class="header-logo">
							<a href='<spring:url value="/" />' >
								<h1>拍片网</h1>
							</a>
							<p>最大的视频交易网站</p>
						</div>
					</header>
					<section>
						<div class="content-wrap">
							<ul>
								<li><p>建议绑定您最常用邮箱和手机号，防止多个社交网络重复创建独立账号;</p></li>
								<li><p>拍片网账号登录无需密码注册，直接使用常用社交网络账号可直接登录，支持短信、邮件动态验证登录;</p></li>
								<li><p>我们不会向您的社交网络发布任何信息，授权登录信息仅用于快速完善个人资料，不会对外泄露授权码。</p></li>
							</ul>
						</div>
					</section>
					<footer class="footer">
						<p>
							<strong>您对账号的疑问，请联系：</strong>
							<a class="alert-link" href="mailto:paipianwang@qq.com?">paipianwang@qq.com</a>
						</p>
					</footer>
				</div>
			</div>
		</div>
	</div>
</body>
</html>