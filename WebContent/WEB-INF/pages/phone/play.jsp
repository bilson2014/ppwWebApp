<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/play.css" var="playCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/js/phone/play.js" var="playJs"/>
<!-- img path -->
<spring:url value="/resources/img" var="imgPath" />
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
	<meta name="keywords" content="拍片网,视频播放,视频详情,影片播放,影片介绍">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_${product.productName }视频播放页</title>
	
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${playCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<input type="hidden" id="videoId" value="${product.productId }"/>
	<input type="hidden" id="videoName" value="${product.productName }"/>
	<input type="hidden" id="videoUrl" value="${product.videoUrl }"/>
	<input type="hidden" id="videoPoster" value="${product.picLDUrl }"/>
	<input type="hidden" id="videoDesc" value="${product.pDescription }"/>
	<input type="hidden" id="videoHret" value="${product.hret }"/>
	<input type="hidden" id="teamId" value="${product.teamId }"/>
	<input type="hidden" id="teamPhotoUrl" value="${product.teamPhotoUrl }"/>
	<input type="hidden" id="serviceId" value="${product.serviceId }"/>
	<input type="hidden" id="realPrice" value="${product.servicePrice }"/>
	<input type="hidden" id="originalPrice" value="${product.serviceRealPrice }"/>
	<input type="hidden" id="second" value="${product.mcoms }"/>
	
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
						        <li class="-mob-share-weixin" id="weixin"><p>微信</p></li>
						        <li class="-mob-share-qzone"><p>QQ空间</p></li>
						        <li class="-mob-share-qq" id="qq"><p>QQ好友</p></li>
							    <li class="-mob-share-weibo"><p>新浪微博</p></li>
					       	</ul>
						    <div class="-mob-share-close">取消</div>
						</div>
						<div class="-mob-share-ui-bg"></div>
					</a>
				</dd>
			</dl>
		</div>
		
		<div class="video-play-section">
			<video controls id="recomment-video" src="" poster="" preload="auto" style="display: none;"></video>
			<div id="video-play" class="video-play">
				<!-- video play -->
			</div>
		</div>

		<div class="video-content-section">
			<div class="video-title-col">
				<h1>${product.productName }</h1>
			</div>

			<div class="video-price-col">
				<dl>
					<dt><h3 id="price-col"></h3></dt>
					<dd><p>标准时长:  <span>${product.mcoms }秒</span></p></dd>
				</dl>
			</div>
			
			<a href="javascript:void(0);"><div class="order-col" id="order-btn">我要拍片</div></a>
			
			<div class="video-detail-content">
				<dl>
					<dt>产品详情：</dt>
					<dd>${product.pDescription }</dd>
				</dl>
			</div>
			
			<div class="split-content"></div>
			
			<div class="film-flow">
				<dl>
					<dt><a href="<spring:url value='/phone/author/${product.teamId }'/>"><img id="teamPhoto" src="" alt="${product.teamName }_拍片网 " /></a></dt>
					<dd>${product.teamName }</dd>
				</dl>
				
				<a href="<spring:url value='/phone/author/${product.teamId }'/>"><div class="team-Btn">更多作品</div></a>
			</div>
		</div>

	</div>
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${ykJs }"></script>
<script src="${playJs }"></script>
<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
</body>
</html>