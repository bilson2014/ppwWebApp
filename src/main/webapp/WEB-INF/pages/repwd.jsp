<%@ page contentType="text/html;charset=UTF-8"%>
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
	<title>忘记密码-拍片网</title>
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
	<jsp:include flush="true" page="header.jsp"></jsp:include>
	
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