<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import="java.lang.annotation.Target"%>
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
<spring:url value="/resources/js/provider/video-list.js"
	var="productListJs" />
<spring:url value="/resources/images" var="path" />
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />
<spring:url value="/resources/js/juicer.js" var="juicerJs" />
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>

	
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
<title>用户信息页-拍片网</title>
<link rel="stylesheet" type="text/css" href="${productListCss}">
<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
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
</head>

<body>

	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
	<input type="hidden" value="${cKey}" id="company-key" />
	<input type="hidden" value="${cType}" id="company-type" />
	<input type="hidden" value="${total}" id="total"/>
	<div class="proInfo">
		<c:if test="${empty list }">
			<div class="noProduct">
				<div>暂无作品</div>
			</div>
		</c:if>
		<div class="ProductContent" id='ProductContent'></div>
<%-- 		<c:if test="${!empty list}">
			<div class="ProductContent" id='ProductContent'>
				<c:forEach items="${list }" var="product" varStatus="status">
					<div class="productCard">
						<c:if test="${empty product.picLDUrl}">
							<img class='media-object playCBtn' src="/resources/images/index/noImg.jpg" />
						</c:if>
						<c:if test="${not empty product.picLDUrl}">
							<img class='media-object playCBtn' src='${file_locate_storage_path }${product.picLDUrl }' />
						</c:if>
						    <img class="playIcon playCBtn" src="/resources/images/index/play-icon.png"/>
						<input type="hidden" id="media-video" value='${product.videoUrl }' />
						<div class="mid nC">
							<div class="title">
								<span>标题：</span> 
								<span><c:out value="${product.productName }" /></span>
								<c:if test="${product.flag==0}">
									<div class="state yellow"><img src="/resources/images/provider/toWait.png">审核中</div>
								</c:if>
								<c:if test="${product.flag==1}">
									<div class="state green"><img src="/resources/images/provider/toPass.png">审核通过</div>
								</c:if>
								<c:if test="${product.flag==2}">
									<div class="state red"><img src="/resources/images/provider/toError.png">未通过</div>
								</c:if>
								<c:if test="${product.flag==3}">
									<div class="state blue"><img src="/resources/images/provider/toEdit.png">编辑中</div>
								</c:if>
							</div>
						
							
							<c:if test="${cType == 4 }">
								<div class="shareVideo">
								    <div>分享：</div>
								    <div class="wechat -mob-share-weixin share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
								    <div class="qq -mob-share-qq share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
								    <div class="wb -mob-share-weibo share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
								    <div class="zone -mob-share-qzone share" data-name='<c:out value="${product.productName }" />' data-no='<c:out value="${product.productId }" />'></div>
								</div>
							</c:if>
						</div>
						
							<div class="content <c:if test="${empty product.checkDetails || product.flag != 2}">hide</c:if>">
								<div class="cTitle">建议：</div>
								<div class="cContent">
								<c:if test="${not empty product.checkDetails and product.flag == 2}">
									${product.checkDetails }
								</c:if>
								</div>
							</div>
						
						<div class="lastContent">
						
						   <c:if test="${product.flag==1}">
						       <div data-id="<c:out value="${product.productId }"/>" data-visible="<c:out value="${product.visible }"/>" class="visible visibleProduct <c:if test="${product.visible==1}">noneUse</c:if>">
						          <div>作品可见</div>
						       </div>
						   </c:if>
						
							<c:if test="${product.flag==1}">
								<c:if test="${product.masterWork==1}">
									<div class="master-flag setMaster <c:if test="${cType==4}">gStar</c:if>">
										<div class="master-title">取消代表作</div>
										<div class="star"
										 data-id='<c:out value="${product.productId }"/>'
										 data-master='<c:out value="${product.masterWork }" />'></div>
									</div>
								</c:if>
							<c:if test="${product.masterWork==0}">
									<div class="master-flag noMaster <c:if test="${cType==4}">gStar</c:if>">
										<div class="master-title">设为代表作</div>
										<div class="star" 
										data-id='<c:out value="${product.productId }" />'
										data-master='<c:out value="${product.masterWork }" />'></div>
									</div>
								</c:if>
							</c:if>
							<c:if test="${product.flag==3 || cType == 4}">
								<div class="edit product-edit"  data-id='<c:out value="${product.productId }" />'>
								     <div>编辑作品</div>
								</div>
							</c:if>
							    <div class="del" data-id='<c:out value="${product.productId }"/>'>
							        <div>删除作品</div>
							    </div>
						</div>
					</div>
				</c:forEach>
			</div>
		</c:if> --%>
		
				<!-- pagination start -->
		<c:if test="${!empty list }">
			<div class="page-section">
				<div class="page-wrap">
					<div class="pagination"></div>
				</div>
			</div>
		</c:if>
		
		<!-- pagination end -->
		
	</div>

</body>
<!-- script here -->
<script src="${jqueryJs }"></script>
<script src="${jqueryPageJs }"></script>
<script src="${pluginJs }"></script>
<script src="${webuploaderJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${productListJs }"></script>
<script src="${juicerJs }"></script>

<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<!-- script here -->
</html>
