<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/manager/recover.css" var="recoverCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/manager/recover.js" var="recoverJs"/>
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
	<meta name="title" content="内部员工密码找回页面">
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>内部员工密码找回页面-拍片网</title>
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${recoverCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<jsp:include flush="true" page="../header.jsp"></jsp:include> 
		
		 <div class="outSideDiv">
		         <div class="loginDiv">
		            <h1>内部员工密码找回</h1>
		            <form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="recover-form">
				            <div class="loginContent input-group">
				                 <input class="fontSizeBaseLight" type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="11"  placeholder="手机号" id="recover_phone"></input>
				                 <div class="otherDiv"></div>
				                 <div class="errorDiv hide" id="recover_phoneId">*手机号错误</div>
				            </div>
				             <div class="loginContent input-group">
				                 <input class="fontSizeBaseLight"  placeholder="新密码" id="recover_password" type="password" autofocus="autofocus" autocomplete="off" tabindex="2" maxlength="16" size="16"></input>
				                 <div class="errorDiv hide" id="recover_passwordId" >*验证码错误</div>
				            </div> 
				            <div class="loginContent input-group">
				                 <input class="fontSizeBaseLight"  placeholder="图片验证码" id="kaptcha_code_recover"></input>
				                 <div class="otherDiv"><img alt="图片验证码" src="/login/kaptcha.png?41" id="kaptcha_pic_recover" class="btn-validation"></div>
				                 <div class="errorDiv hide" id="kaptcha_pic_recoverId" >*验证码错误</div>
				            </div>  
				                <div class="loginContent input-group">
				                 <input class="fontSizeBaseLight"  placeholder="短信验证码" id="verification_code_recover"></input>
				                 <div class="otherDiv"><button type="button" id="verification_code_recover_btn" class="btn-get-validation fontSizeBaseLight" >点击获取</button></div>
				                 <div class="errorDiv hide" id="verification_code_recoverId">*验证码错误</div>
				            </div>
				            <div class="redBtn" id="recoverBt">密码找回</div> 
		            </form>
		         </div>
		   </div>
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${recoverJs }"></script>
</body>
</html>