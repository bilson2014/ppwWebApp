<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/active/d12.css" var="d12Css"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/active/d12.js" var="d12Js"/>

<!-- imgPath -->
<spring:url value="/resources/img" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网下单,视频营销,购买广告,导演,拍片下单">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_订单成功提示页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${d12Css }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${d12Js }"></script>
</head>
<body>
	<div class="wrap">
		<div id="header" class="header">
			<div class="header-content">
				<div class="header-logo">
					<a href='<spring:url value="/"/>'>
						<img id="paipianwang_logo" src="${imgPath }/icons/logo_red.png" alt="拍片网_logo">
					</a>	
				</div>
				<div class="navigation-operation">
					<ul class="nav nav-horizontal">
						<li><a href="<spring:url value="/" />" target="_parent">首页</a></li>
						<li class="padding16"><a href="<spring:url value="/product/more" />" target="_parent" >作品案例</a></li>
						<li><a href="<spring:url value="/direct/order"/>" target="_parent">我要拍片</a></li>
					</ul>
				</div>
				<div class="header-button-wrap">
					<ul class="nav nav-horizontal nav-ul">
						<% User user = (User)session.getAttribute("username"); %>
						<%if(user != null) {%>
							<li>
								<a href="<spring:url value="/user/info" />" target="_top">
									<%if(user.getUserName() != null || !"".equals(user.getUserName()) ) {%>
										<%=user.getUserName() %>
									<%} else { %>
										<%=user.getTelephone().substring(0, 6) %> ...
									<%} %>
								</a>
							</li>
							<li class="logout-bt"><a href="<spring:url value="/login/loginout" />" target="_top">退出</a></li>
						<%} else {%>
							<li><a href="<spring:url value="/login" />" target="_top">客户登录</a></li>
							<li class="provider-bt"><a href="<spring:url value="/provider/login" />" target="_top">供应商登陆</a></li>
						<%} %>
					</ul>
				</div>
			</div>
		</div>
	
		<!-- banner部分 start -->
		<div class="banner-section">
			<img alt="" src="${imgPath }/active/d12/d12-pc.jpg">
		</div>
		<!-- banner部分 end -->
		
		<!-- video content start -->
		<div class="video-section">
			<div class="video-section-wrap">
				<!-- video content here -->
			</div>
		</div>
		<!-- video content end -->

		<div class="footer">
			<div class="footer-wrap">
				<div class="footer-left">
					<div class="footer-column">
						<a href="javascript:void(0);" class="title" >了解拍片网</a>
						<a href="javascript:void(0);">常见问题</a>
						<a href="javascript:void(0);">支付问题</a>
					</div>
					<div class="footer-column">
						<a href="javascript:void(0);" class="title" >联络与支援</a>
						<a href='<spring:url value="/contactUs" />' target="_blank" style="cursor:pointer;">联系我们</a>
						<a href='<spring:url value="/provider/login"/>' target="_blank" style="cursor:pointer;">商家合作</a>
					</div>
					<div class="footer-column">
						<a href="javascript:void(0);" class="title" >授权 / 条款</a>
						<a href="javascript:void(0);">用户协议</a>
						<a href="javascript:void(0);">隐私政策</a>
					</div>

					<div class="footer-notice">
						<h3>版权信息</h3>
						<!-- <p>拍片网会员所上传展示的 "原创作品" 版权原作者所有，任何商业用途均需联系作者。若未经授权已作他用，作者将保留追究侵权者法律责任的权利。</p> -->
						<p>本站视频作品采用知识共享署名-非商业性使用。本站不提供任何视听上传服务，所有内容均来自视频分享站点所提供的公开引用资源。</p>
					</div>
				</div>
				<div class="footer-right">
					<div class="footer-column">
						<label class="phone-icon common-icons-tele_red"></label>
						<h3>+86 010 58612562</h3>
						<span>工作时间</span>
						<p class="phone-notice">周一至周五 9:00 - 18:00</p>
					</div>
					<div class="footer-column">
						<label class="qq-icon common-icons-qq_red"></label>
						<a href="tencent://message/?uin=422551410&Site=qq&Menu=no" class="qqClient"><h3>422551410</h3></a>
						<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><h3>2640178216</h3></a>
						<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><h3>3299894058</h3></a>
					</div>
					<div class="footer-column">
						<%-- <img src="${imgPath }/icons/quickmark.jpg" alt="拍片网_二维码" /> --%>
						<div class="quickmark-icon common-icons-quickmark"></div>
						<h4 class="webcat-notice">关注送好礼</h4>
					</div>
				</div>
			</div>

			<div class="footer-split-line"></div>

			<div class="footer-box">
				&copy; 2014 攀峰文化 京ICP备 14036662号-1 | <a>百度统计</a>  <a href='<spring:url value="/sitemap.html" />' target="_blank" title="站长统计">站长统计</a>
			</div>
		</div>
	</div>
</body>
</html>