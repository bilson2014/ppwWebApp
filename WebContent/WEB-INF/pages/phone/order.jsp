<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-alert.min.css" var="bootstrapAlertCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-button.min.css" var="bootstrapButtonCss"/>
<spring:url value="/resources/css/phone/order.css" var="orderCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/order.js" var="orderJs"/>

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
	<link rel="stylesheet" href="${bootstrapAlertCss }">
	<link rel="stylesheet" href="${bootstrapButtonCss }">
	<link rel="stylesheet" href="${orderCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${orderJs }"></script>
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
			<form id="order-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">
				<%-- <input type="hidden" id="teamId" name="teamId" value="${teamId}"/>
				<input type="hidden" id="productId" name="productId" value="${productId}"/>
				<input type="hidden" id="serviceId" name="serviceId" value="${serviceId}"/>
				<input type="hidden" id="indentPrice" name="indentPrice" value="${indentPrice}"/>
				<input type="hidden" id="second" name="second" value="${second}"/>
				<input type="hidden" id="product_name" name="product_name" value="${product_name}"/>
				<input type="hidden" id="salesmanUniqueId" name="salesmanUniqueId" value="${uniqueId}"/> --%>
				
				<input type="hidden" id="indentName" name="indentName" value="新订单"/>
				<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
				<input type="hidden" id="token" name="token" value="${token}"/>
				<div class="order-section">
					<div class="order-input-wrap">
						<input type="text" placeholder="您的手机号码" id="indent_tele" name="indent_tele"/><button type="button" id="order-btn" class="btn btn-primary" style="position: relative;background-color: #fe5453;border-color: #fe5453;padding:0 2px;">拍片预约</button>
						<label id="label-message" class="label-message alert alert-danger" style="display: none;padding:0;position: relative;top: 5px;">请输入正确的手机格式</label>
					</div>
					<div class="order-phone-wrap">
						<span><a href="tel:010-59005941" >创意咨询 010-59005941</a></span>
					</div>
				</div>
			</form>
			
			<div class="first-section-wrap">
				<div class="left-part">
					<dl>
						<dt ><span>1</span>第一步</dt>
						<dd>视频管家沟通需求</dd>
						<dd>对接导演创意策划</dd>
					</dl>
				</div>
				<div class="right-part">
					<img alt="" src="${imgPath }/phone/order/first-img.png">
				</div>
				
			</div>
			
			<div class="second-section-wrap">
				<div class="right-part">
					<dl >
						<dt ><span>2</span>第二步</dt>
						<dd>托管制作费到平台</dd>
						<dd>导演开始影片制作</dd>
					</dl>
				</div>
				<div class="left-part">
					<img alt="" src="${imgPath }/phone/order/second-img.png">
				</div>
			</div>
			
			<div class="third-section-wrap">
				<div class="left-part">
					<dl>
						<dt ><span>3</span>第三步</dt>
						<dd>收到满意影片后付款</dd>
						<dd>不满意可免单或重拍</dd>
					</dl>
				</div>
				<div class="right-part">
					<img alt="" src="${imgPath }/phone/order/third-img.png">
				</div>
			</div>
			
			<!-- <a href="/phone/redirect/order" target="_self"><button class="btn btn-primary" style="position: relative;width: 90%;left: 5%;height: 46px;background-color: #fe5453;border-color: #fe5453;margin-bottom: 10px;">我要下单</button></a> -->
		</div>
	</div>
</body>
</html>