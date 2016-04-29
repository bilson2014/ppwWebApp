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
	<meta name="title" content="视频管家登陆页面">
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销</title>
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${recoverCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>
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
					<r:identity role="manager">
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
					<r:identity role="manager">
						<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
						<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
					</r:identity>
				</div>
			</div>
		</div>
	
	<div class="page-container">
		<div class="recover-container">
				<div class="well">
					<h2>视频管家密码找回</h2>
					<form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="recover-form">
						<fieldset>
							<!-- 提示框 -->
							<div class="tooltip-show-recover" style="display: none;">
								<label class="tooltip-message-recover" ></label>
							</div>
							<div class="form-group">
								<input type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="11" size="11" class="form-control" id="recover_phone" placeholder="请输入您的手机号码">
							</div>
							<div class="form-group">
								<input type="password" autofocus="autofocus" autocomplete="off" tabindex="2" maxlength="16" size="16" class="form-control" id="recover_password" placeholder="请输入新密码">
							</div>
							<div class="form-group">
								<input type="text" id="kaptcha_code_recover" class="form-control verfication" tabindex="3" placeholder="图片验证码" autocomplete="off" maxlength="4">
								<label class="control-label">
									<img alt="图片验证码" src='' id="kaptcha_pic_recover" class="btn-validation">
								</label>
							</div>
							<div class="form-group">
								<input type="text" id="verification_code_recover" class="form-control verfication" tabindex="4" placeholder="短信验证码" autocomplete="off" maxlength="6">
								<button type="button" id="verification_code_recover_btn" class=" btn-default btn-get-validation">点击获取</button>
							</div>
							
						</fieldset>
						<div class="actions">
							<input class="btn btn-danger btn-login" id="recoverBt" type="button" value="密码找回">
						</div>
					</form>
				</div>
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