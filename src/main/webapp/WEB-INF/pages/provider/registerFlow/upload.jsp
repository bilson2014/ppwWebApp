<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/flow/upload.css"
	var="providerUploadCss" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<spring:url value="/resources/lib/kindeditor/themes/default/default.css"
	var="defaultCss" />
<spring:url value="/resources/lib/kindeditor/plugins/code/prettify.css"
	var="prettifyCss" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css"
	var="datepickerCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url value="/resources/js/provider/registerFlow/upload.js"
	var="providerUploadJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js"
	var="datepickerJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js"
	var="datepickerZHJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap-switch.min.js"
	var="bootstrapSwitchJs" />
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
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
<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>上传页面-拍片网</title>
<link rel="shortcut icon" href="${imgPath }/favicon.ico">
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${bootstrapCss }">
<link rel="stylesheet" href="${defaultCss }">
<link rel="stylesheet" href="${prettifyCss }">
<link rel="stylesheet" href="${providerUploadCss }">
<link rel="stylesheet" href="${datepickerCss }">
<link rel="stylesheet" href="${webuploaderCss }">

<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<jsp:include flush="true" page="../../header.jsp"></jsp:include> 
	
	<div class="tooltip-warn-banner" id="tooltip-warn-banner">
		<div class="card">
		<div class="top">
			<div class="topBanner" id="closeBanner"></div>
		</div>
			<div class="imgContent">
				<img src="/resources/images/provider/default-cover.jpg"
					id="previewImg" class="previewImg"
					style="width: 650px; height: 358px;">
			</div>
		</div>
	</div>
	<div class="page">
		<div class="upVideoCard">
			<div class="titleInfo">作品上传</div>
			<c:if test="${productId == 0}">
				<div class="step1">
					<div class="upImg" id="upBtnImg">
						<img src="/resources/images/provider/upLoadNew.png" />
					</div>
					<div class="upBtn btn-c-r" id="upBtn">上传视频</div>
					<div class="error_upload"></div>
					<div class="infoCard">
						<div class="title">拍片网郑重提醒您：</div>
						<div class="redWord">上传作品必须为贵公司或贵工作室及个人的原创作品;</div>
						<div class="redWord">不得上传有贵公司或贵工作室及个人二维码/电话/手机/微信等联系方式的作品;</div>
						<div class="redWord">作品必须填写创作完成日期。</div>
						<div class="midWord">为响应国家九部委联合开展深入整治互联网和手机媒体淫秽色情及低俗信息专项行动的号召，营造一个
							健康文明的网络环境，给大家一个和谐积极的家园。</div>
						<div class="grayWord">不得上传任何有违国家法律法规的视频。</div>
						<div class="grayWord">不得上传具有色情内容的视频</div>
						<div class="grayWord">不得上传内容低俗，格调不高的视频。</div>
						<div class="grayWord">不得上传具有色情诱导性内容的视频。</div>
						<div class="grayWord">不得在标题、简介和标签中出现任何具有低俗色情含义的字眼。</div>
						<div class="grayWord">不含有涉及版权问题的影视片段。</div>
						<div class="midWord">如果有违上述内容，我们将一律予以删除，我们希望我们最珍贵的客户及供应商，理解并监督我们。</div>
					</div>
					<div class="infoCard">
						   <div class="title">上传视频要求：</div>
			               <div class="redWord">视频格式 : MP4格式</div>
						   <div class="redWord">视频编码 : H264编码</div>
						   <div class="redWord">音频编码 : MP3编码</div>
						   <div class="redWord">文件大小 : 200Mb以下</div>
						   <div class="redWord">分辨率 : 1920x1080、1280x720、960x540</div>
						   <div class="redWord">比特率 : 3000kb/s(1920x1080)、1400kb/s(1280x720)、900kb/s(960x540)</div>
						   <div class="redWord">帧速率 : 24fps</div>
						   <div class="redWord">色彩空间 : yuv420p</div>
						   <div class="midWord">我们建议您使用以下转码软件</div>
						   <div class="grayWord">Windows系统 : 格式工厂</div>
			               <div class="grayWord">Mac系统：Any Video Converter</div>
			               <div class="midWord">如果您对此有疑问,您可以拨打(010-59005319)与我们联系。</div>
					</div>
					<div class="setMid"> 
					    <input type="submit" class="gy-btn btn-c-r " id="checkbtn" name="_eventId_backspace" value="上一步" />
					</div>	
				</div>
			</c:if>
			<div class="step2 <c:if test='${productId == 0}'>hide</c:if>">
				<c:if test="${product.productId == 0}">
					<div class="upProgress">
						<div class="proTitle">上传进度</div>
						<div class="progress progress-striped active">
							<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
								aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
								style="width: 0;"></div>
						</div>
						<div class="upIng">上传中...</div>
						<div class="upSuccess hide">
							<img src="/resources/images/provider/sure.png">上传成功
						</div>
						<div class="upError hide">
							<img src="/resources/images/provider/error.png">上传失败请重新上传
						</div>
					</div>
				</c:if>
				
				<sf:form commandName="product" method="post">
					<sf:input type="hidden" name="productId" path="productId" id="productId" />
					<input type="hidden" name="teamId" value="${teamId }" id="teamId" />
				<div class="proItem" id="video-name-error">
					<div class="itemTitle">作品名称</div>
					<sf:input type="text" class="" id="video-name" path="productName"
						maxlength="30" placeholder="视频标题为必填字段" />
				</div>
				<div class="proItem" id="creationTime-error">
					<div class="itemTitle">创作时间</div>
					<sf:input type="text" id="creationTime" path="creationTime"
						placeholder="请选择作品创作时间" readonly="readonly" />
				</div>
				<div class="proItem noItem">
					<div class="itemTitle">视频封面</div>
					<ul>
						<li>
							<div class="upBanner" id='upBtn-pic'>上传封面</div>
							<div class="findEx" id="findEx">查看示例</div>
						</li>
						<li>
							<c:if test="${not empty product.picLDUrl}">
								<img id="LDimg" src="http://resource.apaipian.com/resource/${product.picLDUrl}">
								<sf:input type="hidden" path="picLDUrl" id='pic-LD-url' data-change="0" />
							</c:if>
							<c:if test="${empty product.picLDUrl}">
								<img id="LDimg" src="/resources/images/index/noImg.jpg">
								<input type="hidden" id='pic-LD-url' data-change="0">
							</c:if>
						</li>
						<li>
							<span>仅支持小于10M的png/jpg格式,推荐1280*720(16:9)分辨率</span>
							<label>*</label>
						</li>
					</ul>
					<div id="img-error"></div>
				</div>
				<div class="bottomUp">
					<c:if test='${product.productId == 0}'>
						<div class="stateInfo">视频上传中 请勿刷新页面或者提交审核</div>
					</c:if>
		   		 	<input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}" id="flowExecutionKey"/>
		   		 	<input type="hidden" value="${flowExecutionUrl}" id="flowExecutionUrl" />
		   		 	
		   		 	<div class="btn-c-g cancle" onclick="window.location.href='${flowExecutionUrl}&_eventId=save'">取消</div>
		   		 	<div class="btn-c-r submit" id="infoBt">保存</div>
				</div>
		   		 </sf:form>
			</div>
			<div class="step3 hide">
				<div class="show-zero2 zeromodal-icon zeromodal-success">
					<span class="line tip"></span> <span class="line long"></span>
					<div class="placeholder"></div>
				</div>
				<div class="title">作品上传成功!</div>
				<div class="info">您的作品已成功上传,正在审核中...</div>
				<div class="autoJoin">
					自动跳转进入<a><span id="toPortal">作品列表页</span></a><span id="lasttime">3</span>秒
				</div>
			</div>
		</div>
	</div>
	<script src="${jqueryJs }"></script>
	<script src="${jquerybase64Js }"></script>
	<script src="${pluginJs }"></script>
	<script src="${blockUIJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${bootstrapSwitchJs }"></script>
	<script src="${webuploaderJs }"></script>
	<script src="${ajaxfileuploadJs }"></script>
	<script src="${kindeditorJs }"></script>
	<script src="${prettifyJs }"></script>
	<script src="${kindeditorzhJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerUploadJs }"></script>
	<script src="${datepickerJs }"></script>
	<script src="${datepickerZHJs }"></script>
</body>
</html>