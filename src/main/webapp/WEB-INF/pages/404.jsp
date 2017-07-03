<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/error404.css" var="errorCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/common.js" var="commonJs"/>
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
	<title>错误页－拍片网</title>
	<link rel="stylesheet" href="${errorCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
	var _vds = _vds || [];
	window._vds = _vds;
	(function() {
		_vds.push([ 'setAccountId', '9f2e33a3d43b5d78' ]);
		(function() {
			var vds = document.createElement('script');
			vds.type = 'text/javascript';
			vds.async = true;
			vds.src = ('https:' == document.location.protocol ? 'https://'
					: 'http://')
					+ 'dn-growing.qbox.me/vds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(vds, s);
		})();
	})();
</script>

	<script type="text/javascript" src="${jqueryJs}"></script>
	<script type="text/javascript" src="${commonJs}"></script>
	
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<jsp:include flush="true" page="header.jsp"></jsp:include>  
	
	<div class="page">
	   <div class="errorDiv">
	       <div class="centerDiv">
	        <div><a href="/"><img src="${imgPath }/icons/error404.png"></a></img></div>
	        <div class="en">Oops. The page you were looking for doesn’t exist</div>
	        <div class="centerWord">诶呀!您要找的页面不存在...</div>
	         <a href="/"><div class="backIndex btn-c-r">返回主页</div></a>
	       </div>
	   </div>
	</div>
	<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
	
</body>
</html>