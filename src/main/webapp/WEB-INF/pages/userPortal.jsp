<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/userPortal.css" var="userInfoCss"/>
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/ajaxfileupload.js" var="ajaxfileuploadJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/userPortal.js" var="userPortalJs"/>
<spring:url value="/resources/lib/webuploader/webuploader.js" var="webuploaderJs" />
<spring:url value="/resources/js/juicer.js" var="juicerJs" />
<spring:url value="/resources/images/user" var="imgPath"/>
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
	<title>供应商页面-拍片网</title>
	<link rel="stylesheet" href="${normalizeCss}">
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${commonCss}">
	<link rel="stylesheet" href="${userInfoCss}">
	<link rel="stylesheet" type="text/css" href="${webuploaderCss}">
	<link rel="shortcut icon" href="${imgPath }/../favicon.ico" >

	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${ajaxfileuploadJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${webuploaderJs }"></script>
	<script src="${juicerJs }"></script>
	<script src="${userPortalJs}"></script>
	
</head>
<body style="overflow:hidden">

    <div class="modTop"></div>

	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<div class="header-content">

    <jsp:include flush="true" page="header.jsp"></jsp:include>

	</div>
	<div class="tooltip-check" id="tooltip-check" >
	     <div class="checkCard">
	          <div class="closeCheck" id='closeCheck'></div>
	          <div class="checkInfo" id="checkInfo">error</div>
	          <div class="checkBottom">
	                 <div class="sureCheck" id="sureCheck">确认</div>
	                 <div class="falseCheck" id="falseCheck">取消</div>
	          </div>
	     </div>
	</div>
	<div class="tooltip-wati" >
		     <div class="watiCard">
		         <img src="/resources/images/icons/wait.gif">
		         <div>进度处理中...</div>
		     </div>
   </div>
   
   	<div class="tooltip-success-show" style="display: none;">
		<label class="tooltip-success-message" id="tooltip-success-messageSSSS">信息更新成功</label>
	</div>
	
	<div class="tooltip-error-show" style="display: none;">
		<label class="tooltip-success-message" id="tooltip-success-messageEEEE">信息更新失败</label>
	</div>

	 <div class="page" style="height:100%">
       <div class="user-wrap">
                <div class="left-wrap">
                    <div class="left-header">
                          <img class="proLogo" id="proLogo" data-value="${user.imgUrl }" src="/resources/images/provider/default-user.jpg"/>
                    </div>
                    <div class="userName">${user.userName }</div>
                    <div class="left-content">
                          <div class="infoItem activeThis">
                                <div class="info" data-action="infoCommon">个人信息</div>
                         </div>
                          <div class="infoItem" id="clickSafe">
                                 <div class="safeInfo" data-action="safeInfo">安全设置</div>
                         </div> 
                    </div>
                </div>
                <div class="right-wrap">
                       <div class="titleTop" id="titleTop">个人信息</div>
                       <iframe class="frame" id="content-frame" class="iframe" src="<spring:url value='/user/infoCommon'/>"></iframe>
                </div>
       </div>
    </div>
</body>
</html>