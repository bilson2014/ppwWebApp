<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/repwd.css" var="loginCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/repwd.js" var="loginJs"/>

<spring:url value="/resources/lib/disk/EasePack.min.js" var="EasePackJs"/>
<spring:url value="/resources/lib/disk/TweenLite.min.js" var="TweenLiteJs"/>
<spring:url value="/resources/lib/disk/rAF.js" var="rAFJs"/>

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
	<title>拍片网－广告－宣传片－微电影－视频营销_忘记密码</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${loginCss }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${loginJs }"></script>
	<script src="${EasePackJs }"></script>
	<script src="${TweenLiteJs }"></script>
	<script src="${rAFJs }"></script>

</head>
<body >
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${userType}" id="userType"/>
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
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				
				<r:noLogin>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:noLogin>
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
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>
	
	 <div class="outSideDiv phoneHeight" id = "verify">
		         <div class="loginDiv">
		         <input id="login_type" value="phone" type="hidden"></input>
		            <h1>找回密码</h1>
		            <div class="" id="showLogin">
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="手机号" id="user_phoneNumber"></input>
		                 <div class="otherDiv"></div>
		                 <div class="errorDiv hide" id="user_phoneNumberId">*手机号错误</div>
		            </div>
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="图片验证码" id="kaptcha_code"></input>
		                 <div class="otherDiv"><img alt="图片验证码" src="/login/kaptcha.png?41" id="kaptcha_pic" class="btn-validation"></div>
		                 <div class="errorDiv hide" id="kapt_error_info" >*验证码错误</div>
		            </div>  
		                <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="短信验证码" id="verification_code"></input>
		                 <div class="otherDiv"><button type="button" id="verification_code_recover_btn" class="btn-get-validation fontSizeBaseLight" >点击获取</button></div>
		                 <div class="errorDiv hide" id="code_error_info">*验证码错误</div>
		                 <div class="errorMidDiv hide" id="login_error_info">登录错误</div>
		            </div>
		           </div>
		            <div class="redBtn" id="submitbtn">去修改</div> 
		            <div class="loadmore-div hide" id="listLoad">
										<div class="spinner">
										  <div class="bounce1">加</div>
										  <div class="bounce2">载</div>
										  <div class="bounce3">中</div>
										</div>
					</div>
		         </div>
		   </div>
</body>
</html>