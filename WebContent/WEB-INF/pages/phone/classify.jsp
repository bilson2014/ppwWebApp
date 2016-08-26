<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/css/phone/classify.css" var="classifyCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/iscroll.js" var="isScrollJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/pull.js" var="pullJs"/>
<spring:url value="/resources/js/phone/classify.js" var="classifyJs"/>

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
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_作品页</title>
	
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${classifyCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${isScrollJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${pullJs }"></script>
	<script src="${classifyJs }"></script>
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>

<body>
	<input type="hidden" id="itemNo" value="${itemNo }"/>
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
			</dl>
		</div>
		<div id="list" >
			<div class="listDiv" >
			<div id="pullDown">
					<span class="pullDownIcon"></span>
					<span class="pullDownLabel">下拉刷新...</span>
				</div>
				<ul class="video-section" id="video-section" >
					<!-- video list -->
				</ul>
				<div id="pullUp">
					<span class="pullUpIcon"></span>
					<span class="pullUpLabel">上拉加载更多...</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>