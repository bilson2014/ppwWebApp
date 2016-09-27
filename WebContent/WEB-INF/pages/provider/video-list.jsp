<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%@ page import="java.lang.Integer"%>
<%@ page import="java.util.List"%>
<%@ page import="com.panfeng.film.resource.model.Product"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/uploadify/uploadify.css" var="uploadifyCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/provider/video-list.css" var="providerVideoListCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/uploadify/jquery.uploadify.min.js" var="uploadifyJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/video-list.js" var="providerVideoListJs"/>
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
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网 | 供应商视频列表页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${uploadifyCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${providerVideoListCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<input type="hidden" value="${cKey }" id="company-key"/>
	<input type="hidden" value="${cType }" id="company-type"/>
	<div class="content-wrap">
		<div class="multip-button-wrap">
			<button type="button" class="btn btn-primary" id="multip-button" data-toggle="modal" data-target="#multipModal">
				视频批量上传
			</button>
		</div>
		<div class="table-wrap">
			<table class="table " id="video-list-table">
				<colgroup>
					<col class="col-sm-9">
					<col class="col-sm-1">
				</colgroup>
				<tr id="table-header" >
					<td class="th" >作品内容</td>
					<td class="th" >操作</td>
				</tr>
				<!-- video-list content -->
				<c:if test="${!empty list}">
					<c:forEach items="${list }" var="product" varStatus="status">
						<c:if test="${status.count % 2 == 0 }">
							<tr class="secondCol">
						</c:if>
						<c:if test="${status.count %2 != 0}">
							<tr class="firstCol">
						</c:if>
								<td class="td1 td-content t-left">
									<div class="media">
										<a class="pull-left" href="javascript:void(0);">
											<c:if test="${product.picLDUrl == null}">
												<img class="media-object" src="/resources/images/provider/upload-icon.png" />
											</c:if>
											<c:if test="${product.picLDUrl != null}">
												<img class="media-object" src='/product/img<c:out value="${product.picLDUrl }"/>' />
											</c:if>
											<input type="hidden" id="media-video" value='<c:out value="${product.videoUrl }"/>'/>
										</a>
										<div class="media-body">
											<h4 class="media-heading"><label>标题：</label><c:out value="${product.productName }"/></h4>
											<div class="media-description"><label>简介：</label><c:out value="${product.pDescription }"/></div>
											<c:if test="${product.visible == 0}">
												<label class="label label-success">可见</label>
											</c:if>
											<c:if test="${product.visible == 1}">
												<label class="label label-danger">关闭</label>
											</c:if>
											<c:if test="${product.masterWork == 1 }">
												<label class="label label-danger">代表作</label>
											</c:if>
											<c:if test="${cType == 4 }">
												<dl class="share-list">
													<dt >分享:</dt>
													<dd><img alt="分享至微信" class="-mob-share-weixin share" title="分享至微信" src="/resources/images/icons/webcat.png" data-no='<c:out value="${product.productId }" />'></dd>
													<dd><img alt="分享至qq空间" class="-mob-share-qzone share" title="分享至qq空间" src="/resources/images/icons/qqzone.png" data-no='<c:out value="${product.productId }" />'></dd>
													<dd><img alt="分享至qq" class="-mob-share-qq share" title="分享至qq" src="/resources/images/icons/qq.png" data-no='<c:out value="${product.productId }" />'></dd>
													<dd><img alt="分享至新浪微博" class="-mob-share-weibo share" title="分享至新浪微博" src="/resources/images/icons/weibo.png" data-no='<c:out value="${product.productId }" />'></dd>
												</dl>
											</c:if>
										</div>
									</div>
								</td>
								<td class="td1 td-content t-center">
									<button class="btn btn-info btn-update" data-id='<c:out value="${product.productId }" />'>修改</button>
									<button class="btn btn-danger" data-id='<c:out value="${product.productId }" />'>删除</button>
									<c:if test="${product.masterWork == 0 && product.visible == 0}">
										<button class="btn btn-info btn-setMaster" data-id='<c:out value="${product.productId }" />'>设为代表作</button>
									</c:if>
								</td>
							</tr>
					</c:forEach>
					<c:if test="${fn:length(list) % 2 != 0}">
						<tr class="secondCol-btn">
					</c:if>
					<c:if test="${fn:length(list) % 2 == 0}">
						<tr class="firstCol-btn">
					</c:if>
						<td colspan=2 class="td1 td-content t-center">
							<div id="uploadBt">
								<img alt="添加作品" src="/resources/images/icons/plus.png" class="plusImg" />
							</div>
						</td>
					</tr>
				</c:if>
				<c:if test="${empty list }">
					<tr class="firstCol-btn">
						<td colspan=2 class="td1 td-content t-center">
							<div id="uploadBt" >
								<img alt="添加作品" src="/resources/images/icons/plus.png" class="plusImg" />
							</div>
						</td>
					</tr>
				</c:if>
			</table>
		</div>
	</div>
	
	<!-- Multip Modal start -->
	<div class="modal fade" id="multipModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h3 class="modal-title" id="myModalLabel">视频批量上传</h3>
				</div>
				<div class="modal-body">
					<div id="queue"></div>
					<input id="file_upload" name="file" type="file" multiple="true" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="javascript:$('#file_upload').uploadify('upload','*');">开始上传</button>
					<button type="button" class="btn btn-danger" onclick="javascript:$('#file_upload').uploadify('cancel','*');">取消上传</button>
					<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:$('.nav-stacked li:nth-child(2)', parent.document).click();">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Multip Modal end -->
	
	<!-- Video Modal start -->
		<div class="modal" id="videoModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<video src="" controls poster="" style="width: 570px;"></video>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" id="video-close">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Video Modal end -->
	
</body>
<!-- script here -->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${bootstrapJs }"></script>
<script src="${uploadifyJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${providerVideoListJs }"></script>

<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<!-- script here -->
</html>