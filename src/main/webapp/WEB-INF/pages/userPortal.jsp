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
	<title>拍片网 | 供应商页面</title>
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
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<div class="header-content">
<div class="header headerMove" id="header">
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >项目<span></span></a>
					<a href="<spring:url value='/product/MotionGraphicsforPublicPresentation/main'/>" class="header-item" >产品<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
                 <a href="/news-list.html" class="header-item" target="_parent">新闻资讯<span></span></a>
            </div>
            <input type="hidden" id="commonToken" name="token" value="${token}"/>
            <div class="middle-part">
                <div class="search-box">
                    <form method="get" action="/search" id="s-form">
                        <div class="bannerSearchFind"></div>
                        <input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
                        <a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
                        <ul id="shelper" class="shelper-lucency"></ul>
                    </form>
                </div>
            </div>
            <div class="right-part">
            	<r:noLogin>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">登录</a>
					<a href="<spring:url value="/register" />" class="header-item login-item" target="_self">注册</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/default-user.jpg"></a>
					<a  class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/user/info" />"><li class="toSet">个人信息</li></a>
					         <a href="<spring:url value="/user/info?safeInfo" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/initLogo.png"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/provider/portal?company-info" />"><li class="toSet">公司信息</li></a>
					         <a href="<spring:url value="/provider/portal?safe-info" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/provider/portal" />"><li class="toList">作品列表</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>

				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
            </div>
        </div>
    </div>
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