<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css"
	var="bootstrapCss" />
<spring:url value="/resources/css/provider/login.css"
	var="providerLoginCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs" />
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/provider/login.js"
	var="providerLoginJs" />

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
<title>拍片网 | ${pageName }_供应商登录页面</title>
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${bootstrapCss }">
<link rel="stylesheet" href="${providerLoginCss }">
<link rel="shortcut icon" href="${imgPath }/favicon.ico">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${bootstrapJs }"></script>
<script src="${aesJs }"></script>
<script src="${padJs }"></script>
<script src="${commonJs }"></script>
<script src="${providerLoginJs }"></script>

<!-- sina weibo -->
<script
	src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951"
	type="text/javascript" charset="utf-8"></script>
<!-- webcat -->
<script
	src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<!-- qq -->
<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
	data-appid="101236962" data-callback="true"
	data-redirecturi="http://www.apaipian.com/login" charset="utf-8"
	type="text/javascript"></script>

</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="action" value="${action }" />
	<input type="hidden" id="thirdLoginType" value="${thirdLoginType }" />
	<input type="hidden" id="uniqueId" value="${uniqueId }" />
	<div class="index-content-wrap">
		<div class="header">
			<div class="menu-bar nav">
				<div class="left-part">
					<a href="<spring:url value='/'/>" class="logo"><h1>拍片网</h1></a>
					<r:identity role="customer">
						<a href="<spring:url value='/mgr/index'/>" class="header-item">我的项目</a>
						<a href="<spring:url value='/list.html'/>" class="header-item"
							target="_parent">作品分类</a>
						<a href="<spring:url value='/direct/order'/>" class="header-item"
							target="_parent">我要拍片</a>
					</r:identity>
					<r:identity role="provider">
						<a href="<spring:url value='/provider/portal'/>"
							class="header-item">信息管理</a>
						<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目</a>
						<a href="<spring:url value='/list.html'/>" class="header-item"
							target="_parent">作品分类</a>
					</r:identity>
					<r:identity role="employee">
						<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目</a>
						<a href="<spring:url value='/list.html'/>" class="header-item"
							target="_parent">作品分类</a>
					</r:identity>

					<r:noLogin>
						<a href="<spring:url value='/list.html'/>" class="header-item"
							target="_parent">作品分类</a>
						<a href="<spring:url value='/direct/order'/>" class="header-item"
							target="_parent">我要拍片</a>
					</r:noLogin>
				</div>

				<div class="right-part">
					<r:noLogin>
						<a href="<spring:url value="/provider/login" />"
							class="header-item login-item" target="_self" id="providerLogin">供应商登录</a>
						<a href="<spring:url value="/login" />"
							class="header-item login-item" target="_self" id="userLogin">客户登录</a>
					</r:noLogin>
					<r:identity role="customer">
						<a href="<spring:url value="/user/info" />"
							class="header-item login-item" target="_self"
							title="<r:outName />"><r:outName /></a>
						<a href="<spring:url value="/login/loginout" />"
							class="header-item login-item" target="_self">登出</a>
					</r:identity>
					<r:identity role="provider">
						<a href="<spring:url value="/provider/portal" />"
							class="header-item login-item" target="_self"
							title="<r:outName />"><r:outName /></a>
						<a href="<spring:url value="/login/loginout" />"
							class="header-item login-item" target="_self">登出</a>
					</r:identity>
					<r:identity role="employee">
						<a href="<spring:url value="/mgr/index" />"
							class="header-item login-item" target="_self"
							title="<r:outName />"><r:outName /></a>
						<a href="<spring:url value="/login/loginout" />"
							class="header-item login-item" target="_self">登出</a>
					</r:identity>
				</div>
			</div>
		</div>
		<div class="outSideDiv phoneHeight" id="outSideId">
			<div class="loginDiv">
				<h1 style="display: inline-block" id="title">供应商登录</h1>
				<div id="changeAttr" data-event="login"
					style="cursor: pointer; display: inline-block; position: relative; width: 170px; text-align: right; left: 10px; top: 5px; color: #fe5453;">新用户注册</div>
				<input type="hidden" id="login_type" value="phone">
				<div class="" id="showLogin">
					<div class="loginContent input-group">
						<input class="fontSizeBaseLight" placeholder="手机号"
							id="user_phoneNumber"></input>
						<div class="otherDiv"></div>
						<div class="errorDiv hide" id="user_phoneNumberId"">手机号错误</div>
					</div>

					<div class="loginContent input-group">
						<input class="fontSizeBaseLight" placeholder="图片验证码"
							id="kaptcha_code"></input>
						<div class="otherDiv">
							<img alt="图片验证码" src="/login/kaptcha.png?41" id="kaptcha_pic"
								class="btn-validation">
						</div>
						<div class="errorDiv hide" id="kapt_error_info">验证码错误</div>
					</div>
					<div class="loginContent input-group">
						<input class="fontSizeBaseLight" placeholder="短信验证码"
							id="verification_code"></input>
						<div class="otherDiv">
							<button type="button" id="verification_code_recover_btn"
								class="btn-get-validation">点击获取</button>
						</div>
						<div class="errorDiv hide" id="code_error_info">验证码错误</div>
						<div class="errorMidDiv hide" id="login_error_info">登录错误</div>
					</div>
				</div>

				<div class="hide" id="nameLogin">
					<div class="loginContent input-group">
						<input class="fontSizeBaseLight" placeholder="用户名" id="loginName"></input>
						<div class="otherDiv"></div>
						<div class="errorDiv hide" id="loginName_error"></div>
					</div>
					<div class="loginContent input-group" id="pwdId">
						<input class="fontSizeBaseLight" type="password" placeholder="密码"
							id="pwd"></input>
						<div class="otherDiv"></div>
						<div class="errorDiv hide" id="pwd_error">用户名或密码错误</div>
						<div class="errorMidDiv hide" id="name_login_error_info">登录错误</div>
						<a href="<spring:url value='/provider/repwd'/>"><div
								class="forget">忘记密码</div></a>
					</div>
				</div>
				<!--   <div id="welcomeId" class="welcome fontSizeSmLight">欢迎回到拍片网</div>    -->

				<div id="submitBtn" class="redBtn">登录</div>
				<div class="changeDiv" id="changeLoginId">
					<div class="changeImg hide" id="changeId"></div>
					<div class="changeLogin" id="loginWord">使用账户登录</div>
				</div>


				<div class="infoWord fontSizeBaseLight hide">第三方登录</div>
				<div class="footer-content-three hide">
					<ul>
						<li><a href="javascript:void(0);" id="webcat"> <img
								alt="微信" title="使用微信账号登录" src="${imgPath}/login/webcat.png">
						</a> <span></span></li>
						<li>
							<div id="qqBt">
								<a href="javascript:void(0);"> <img alt="QQ"
									title="使用QQ账号登录" src="${imgPath}/login/qq.png">
								</a> <span></span>
							</div>
						</li>
						<li>
							<!-- <span>微博</span> -->
							<div id="weiboBt">
								<a href="javascript:void(0);"> <img alt="微博"
									title="使用微博账号登录" src="${imgPath}/login/weibo.png">
								</a> <span></span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
</body>
</html>