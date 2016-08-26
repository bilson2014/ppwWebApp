<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.lang.Integer"%>
<%@ page import="java.util.List"%>
<%@ page import="com.panfeng.film.resource.model.Solr"%>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/mMenu/jquery.mmenu.all.css" var="mmenuCss"/>
<spring:url value="/resources/css/phone/search.css" var="searchCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/mMenu/jquery.mmenu.min.js" var="mmenuJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/search.js" var="searchJs"/>

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
	<link rel="stylesheet" href="${mmenuCss }">
	<link rel="stylesheet" href="${searchCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${mmenuJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${searchJs }"></script>
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
			<input type="hidden" id="q" value="${q }" />
			<input type="hidden" id="sequence" value="${sequence }" />
			<input type="hidden" id="sortord" value="${sortord }" />
			<input type="hidden" id="item" value="${item }" />
			<div class="search-section">
				<div class="header-search-wrap">
					<form method="get" action="/phone/search" id="s-form" accept-charset="utf-8">
						<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="搜索" value="${q }"/>
						<input type="hidden" id="search-sortord" name="sortord" value="0"/>
						<input type="hidden" id="search-sequence" name="sequence" value=""/>
						<a href="javascript:void(0);" class="go bk_gray" onclick="return false;" id="s-btn"></a>
					</form>
				</div>
			</div>
			<div class="condition-section">
				<a href="#menu"><label id="filtrate">筛选 <img src="<spring:url value='/resources/img/icons/filtrate-icon.png' />"></label></a><label id="price-lb" data-sortord="${sortord }" data-sequence="price">价格 <img id="price-img" src="<spring:url value='/resources/img/icons/unchange-icon.png' />"/></label><label id="length-lb" data-sortord="${sortord }" data-sequence="length">时长 <img id="length-img" src="<spring:url value='/resources/img/icons/unchange-icon.png' />"/></label><%-- <label data-sortord="${sortord }" style="color:#fe5453;">综合</label> --%>
			</div>
			
			<div class="video-content">
				<c:if test="${!empty list}">
					<!-- not empty -->
					<c:forEach items="${list }" var="solr" varStatus="status">
						<div class="contain-row">
							<a href="<spring:url value='/phone/play/${solr.productId }'/>">
								<div class="video-col">
									<div class="video-post">
										<img src="<spring:url value='/product/img/${solr.picLDUrl }'/>" alt="搜索影片_拍片网">
									</div>
									<div class="video-desc">
										<dl>
											<dt><h2>${solr.productName }</h2></dt>
											<dd>${solr.pDescription }</dd>
											<dt>
												<c:if test="${solr.price < solr.orignalPrice}">
													<label>￥</label><fmt:formatNumber value="${solr.price }" pattern="#,#00"/>元<label class="doraction"><fmt:formatNumber value="${solr.orignalPrice }" pattern="#,#00"/></label>
												</c:if>
												<c:if test="${solr.price >= solr.orignalPrice}">
													<label>￥</label><fmt:formatNumber value="${solr.price }" pattern="#,#00"/>元
												</c:if>
											</dt>
											<dd><a href="<spring:url value='/phone/play/${solr.productId }'/>"><div class="detail-btn">查看详情</div></a></dd>
										</dl>
									</div>
								</div>
							</a>
						</div>
					</c:forEach>
				</c:if>
				<c:if test="${empty list}">
					<div class="empty-content">
						<img alt="未搜索到想要的结果_拍片网" src="${imgPath }/icons/not-found.png">
						<p>抱歉未搜索到您想要的结果</p>
					</div>
				</c:if>
			</div>
		</div>
	</div>
	
	<nav id="menu">
		<ul id="menu-ul"></ul>
	</nav>
</body>
</html>