<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/author.css" var="authorCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/author.js" var="authorJs"/>

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
	<meta name="keywords" content="拍片网,导演团队,营销团队,拍片团队,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_作者页</title>
	
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${authorCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${authorJs }"></script>
	
	<!-- 加载Mob share 控件 -->
	<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
</head>
<body>
	<input type="hidden" id="cId" value="${team.teamId }"/>
	<input type="hidden" id="cName" value="${team.teamName }"/>
	<input type="hidden" id="cLogo" value="${team.teamPhotoUrl }"/>
	<div class="wrap">
		<div class="header">
			<!-- logo -->
			<dl>
				<dd>
					<a href="javascript:history.back(-1);">
						<div class="back"></div>
					</a>
				</dd>
				<dd>
					<a href="<spring:url value="/phone/portal"/>" target="_self">
						<div class="logo"></div>
					</a>
				</dd>
				<dd>
					<a href="javascript:void(0);">
						<div class="share -mob-share-ui-button -mob-share-open"></div>
						<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none">
							<ul class="-mob-share-list">
						        <li class="-mob-share-weixin"><p>微信</p></li>
						        <li class="-mob-share-qzone"><p>QQ空间</p></li>
						        <li class="-mob-share-qq"><p>QQ好友</p></li>
							    <li class="-mob-share-weibo"><p>新浪微博</p></li>
					       	</ul>
						    <div class="-mob-share-close">取消</div>
						</div>
						<div class="-mob-share-ui-bg"></div>
					</a>
				</dd>
			</dl>
		</div>
		
		<div class="team-desc-section">
			<!-- 团队介绍 -->
			<dl>
				<dt>
					<div class="team-img">
						<img id="team-logo" src="" alt="${team.teamName }_拍片网">
					</div>
				</dt>
				<dd><h1>${team.teamName }</h1></dd>
				<dd><h3 id="company-description">${team.teamDescription }</h3></dd>
			</dl>

			<div class="team-detail-wrap">
				<div class="detail-left">北京</div>
				<div class="detail-right" id="detail-right">12个产品</div>
			</div>
		</div>

		<div class="video-section">
			<!-- 视频列表 -->
			<div class="video-guide">
				<h3>作品案例</h3>
				<div class="spilt-line"></div>
			</div>

			<div class="video-content" id="video-content">
				<!-- video list -->
			</div>
		</div>

	</div>
</body>
</html>