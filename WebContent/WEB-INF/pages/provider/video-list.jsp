
<%@page import="java.lang.annotation.Target"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>

<spring:url value="/resources/css/provider/video-list.css"
	var="productListCss" />
<spring:url value="/resources/css/provider/step-dc-style2.css"
	var="providerStepCss2" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/provider/productList.js"
	var="productListJs" />
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->



<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>拍片网－用户信息页</title>
<link rel="stylesheet" type="text/css" href="${productListCss}">
</head>

<body>
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
	<input type="hidden" value="${cKey }" id="company-key" />
	<input type="hidden" value="${cType }" id="company-type" />
	<div class="proInfo">
		<div class="control">
			<div class="newProduct">
				<div></div>
				<span>新建作品</span>
			</div>
			<div class="moreUp">
				<div></div>
				<span>批量上传作品</span>
			</div>
		</div>



		<c:if test="${empty list }">
			<div class="noProduct">
				<div>暂无作品</div>
			</div>
		</c:if>

		<c:if test="${!empty list}">
			<c:forEach items="${list }" var="product" varStatus="status">
				<div class="ProductContent">
					<div class="productCard">
						<c:if test="${product.picLDUrl == null}">
							<img src="/resources/images/index/noImg.jpg" />
						</c:if>
						<c:if test="${product.picLDUrl != null}">
							<img src='${file_locate_storage_path }${product.picLDUrl }' />
						</c:if>
						<input type="hidden" id="media-video" value='${product.videoUrl }' />
						<div
							class="mid <c:if test="${not empty product.check_details}"> nc</c:if>">
							<div class="title">
								<span>标题：</span> <span><c:out value="${product.productName }" /></span>
							</div>
							<c:if test="${empty product.check_details}">
								<div class="content">
									<div class="cTitle">建议：</div>
									<div class="cContent">
										<c:out value="${product.check_details }" />
									</div>
								</div>
							</c:if>
							<ul class="<c:if test="${product.visible==0}"> nc</c:if>">
								<li>可见</li>
								<li></li>
								<li>不可见</li>
							</ul>
						</div>

						<c:if test="${product.flag==0}">
							<div class="state yellow">审核中</div>
						</c:if>
						<c:if test="${product.flag==1}">
							<div class="state green">审核通过</div>
						</c:if>
						<c:if test="${product.flag==2}">
							<div class="state red">未通过</div>
						</c:if>
						<c:if test="${product.flag==3}">
							<div class="state blue">编辑中</div>
						</c:if>

						<div class="lastContent">
						
							<div class="setDef">
								<div>设为代表作</div>
								<div class="star"></div>
							</div>
							
							<c:if test="${product.flag==3 || product.flag==2}">
								<div class="edit btn-c-r" data-id='<c:out value="${product.productId }" />'>
									<div></div>
									<div>编辑</div>
								</div>
							</c:if>
							<div class="del btn-c-g" data-id='<c:out value="${product.productId }" />'>
								<div></div>
								<div>删除</div>
							</div>
						</div>
					</div>
				</div>
			</c:forEach>
		</c:if>

	</div>

</body>
<!-- script here -->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${webuploaderJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${productListJs }"></script>
</html>
