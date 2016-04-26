<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ page import="java.lang.Integer"%>
<%@ page import="java.util.List"%>
<%@ page import="com.panfeng.film.resource.model.Solr"%>

<%-- import CSS --%>
<spring:url value="/resources/css/search.css" var="searchCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/search.js" var="searchJs"/>
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
	<meta name="keywords" content="拍片网下单,视频营销,购买广告,导演,拍片下单">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_搜索页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${searchCss }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<input type="hidden" value="${q }" id="q"/>
	<input type="hidden" value="${price }" id="price"/>
	<input type="hidden" value="${item}" id="item"/>
	<input type="hidden" value="${length}" id="length"/>
	<input type="hidden" value="${total }" id="total"/>
	<div class="header">
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理</a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				<r:identity role="manager">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				
				<r:noLogin>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:noLogin>
			</div>
			
			<div class="middle-part">
				<div class="search-box" id="header-search">
					<form method="get" action="/search" id="s-form">
						<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
						<a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
						<ul id="shelper" class="shelper-lucency"></ul>
					</form>
				</div>
			</div>
			
			<div class="right-part">
				<r:noLogin>
					<a href="<spring:url value="/provider/login" />" class="header-item login-item" target="_self">供应商登录</a>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">客户登录</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="manager">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>

	<div class="page">
		<!-- 搜索条件模块 start -->
		<div class="classify-section">
			<div class="classify-wrap ">
				<div class="classify-type ">
					<dt>行业：<a class="active itemAll" href="javascript:void(0);" id="item-all">全部</a></dt>
					<dd id="classify-item">
						<ul class="list-inline" id="item-list">
							<!-- 行业分类 -->
						</ul>
					</dd>

					<div class="more-link" id="more-link">
						<span>更多</span>
					</div>
				</div>
				
				
				<div class="classify-price ">
					<dt>价格：<a href="javascript:void(0)" data-price="[0 TO *]" class="priceAll active" id="price-all">全部</a></dt>
					<dd id="price-item">
						<ul class="list-inline" id="price-list">
							<li><a href="javascript:void(0)" data-price="[0 TO 30000]" class="priceAll">0~3万</a></li>
							<li><a href="javascript:void(0)" data-price="[30000 TO 60000]" class="priceAll">3~6万</a></li>
							<li><a href="javascript:void(0)" data-price="[60000 TO 100000]" class="priceAll">6~10万</a></li>
							<li><a href="javascript:void(0)" data-price="[100000 TO *]" class="priceAll">10万以上</a></li>
							<li><div class="price-section"><input type="text" id="start-price" />万 ~ <input type="text" id="end-price" />万<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="price-btn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
				
				<div class="classify-length">
					<dt>时长：<a class="active lengthAll" href="javascript:void(0);" data-length="[0 TO *]" id="length-all">全部</a></dt>
					<dd id="length-item">
						<ul class="list-inline" id="length-list">
							<li><a href="javascript:void(0)" data-length="[0 TO 60]" class="lengthAll">0~60秒</a></li>
							<li><a href="javascript:void(0)" data-length="[60 TO 90]" class="lengthAll">60~90秒</a></li>
							<li><a href="javascript:void(0)" data-length="[90 TO 180]" class="lengthAll">90~180秒</a></li>
							<li><a href="javascript:void(0)" data-length="[180 TO *]" class="lengthAll">180秒以上</a></li>
							<li><div class="length-section"><input type="text" id="start-length" />秒 ~ <input type="text" id="end-length" />秒<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="length-btn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
			</div>
		</div>
		<!-- 搜索条件模块 end -->
		
		<!-- video list start -->
		<div class="video-section">
			<div class="video-content" id="video-content">
				<!-- video-content -->
				
				<c:if test="${!empty list}">
					<!-- not empty -->
					<c:forEach items="${list }" var="solr" varStatus="status">
						<c:if test="${status.count % 4 == 1 }">
							<div class="video-row">
						</c:if>
						<div class="video-card video-col-4">
							<a href="<spring:url value='/play/${solr.teamId }_${solr.productId }.html'/>">
								<img class="img-card-4" src="/product/img/${solr.picLDUrl }" />
							</a>
							<div class="video-desc-section">
								<h3>${solr.productName }</h3>
								<h4>${solr.teamName }</h4>
								<div class="video-desc">
									${solr.pDescription }
								</div>
							</div>
							<div class="video-price-section">
								<div class="video-price">
									<h2>￥<fmt:formatNumber value="${solr.price }" pattern="#,#00"/></h2>&nbsp;&nbsp;
									<c:if test="${solr.price < solr.orignalPrice }">
										<h3><fmt:formatNumber value="${solr.orignalPrice }" pattern="#,#00"/></h3>
									</c:if>
								</div>
								<a href="<spring:url value='/play/${solr.teamId }_${solr.productId }.html'/>">了解详情</a>
							</div>
						</div>
						
						
							<c:if test="${status.count % 4 == 0 }">
								</div>
							</c:if>
						
					</c:forEach>
				</c:if>
				<c:if test="${empty list}">
					<div class="prompt-word">对不起，没有查询到您想要的数据!</div>
				</c:if>
			</div>
		</div>
		<!-- video list end -->

		<!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
	</div>

	<div class="footer">
		<!-- 拍片网介绍区域 start -->
		<div class="footer-desc-wrap">
			<div class="footer-desc">
				<h2>中国领先的视频内容制作平台</h2>
				<!-- <p>平台汇聚导演、工作室、创作机构100余家，影视行业人才20000余名</p>
				<p>为客户提供创意、制作、传播一站式服务</p> -->
				<p>汇聚30000+编剧、摄影师、演员等行业人才</p>
				<p>覆盖北京、上海、广州</p>
				<a href="<spring:url value="/about-us.html"/>"><div class="btn btn-primary known-btn">了解拍片网</div></a>
			</div>
		</div>
		<!-- 拍片网介绍区域 end -->
		
		<!-- 底栏 start -->
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/mgr/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:4006609728" class="qqClient"><label class="tel-icon"></label><h3>4006609728</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>2640178216</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>3299894058</h3></a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >服务</a>
					<a href="<spring:url value='/order-flow.html' />">服务流程</a>
					
					<a href="javascript:void(0);" class="top-margin">工作时间</a>
					<a href="javascript:void(0);">工作日9:00 - 18:00</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >授权 / 条款</a>
					<a href="<spring:url value='/company-service.html' />">使用协议</a>
					<a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >了解拍片网</a>
					<a href="<spring:url value='/about-us.html' />">了解我们</a>
					<a href="<spring:url value='/member.html#join-us' />">加入我们</a>
					<a href="<spring:url value='/company-activity.html' />">公司活动</a>
					<a href="<spring:url value='/member.html#activityPart' />">团队简介</a>
				</div>

				<div class="footer-column">
					<div class="mark-icon"></div>
					<h4>关注官方微信</h4>
				</div>

				<div class="footer-notice">
					<h2>版权信息</h2>
					<p>本站视频作品采用知识共享署名-非商业性使用。本站不提供任何视听上传</p>
					<p>服务，所有内容均来自视频分享站点所提供的公开引用资源。</p>
				</div>
			</div>
			<div class="footer-box">
				&copy; 2014 攀峰文化 京ICP备 14036662号-1 | <a>百度统计</a>  <a href='<spring:url value="/sitemap.html" />' target="_blank" title="站长统计">站长统计</a>
			</div>
		</div>
		<!-- 底栏 end -->
	</div>
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${jqueryPageJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${searchJs }"></script>
</body>
</html>