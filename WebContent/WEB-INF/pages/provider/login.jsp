<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/provider/login.css" var="providerLoginCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/provider/login.js" var="providerLoginJs"/>

<spring:url value="/resources/images" var="imgPath"/>
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
	<title>拍片网 | ${pageName }_供应商登录页面</title>
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${providerLoginCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
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
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
	
</head>
<body>
	<input type="hidden" id="action" value="${action }"/>
	<input type="hidden" id="thirdLoginType" value="${thirdLoginType }"/>
	<input type="hidden" id="uniqueId" value="${uniqueId }"/>
	<div class="index-content-wrap">
	
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
		
		
		   <div class="outSideDiv">
		         <div class="loginDiv">
		          	<input id="login_type" value="phone" type="hidden"></input>
		            <h1>供应商登录</h1>
		            
		             <div class="" id="showLogin">
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="手机号" id="user_phoneNumber" ></input>
		                 <div class="otherDiv"></div>
		                 <div class="errorDiv hide" id="user_phoneNumberId"">手机号错误</div>
		            </div>
		       
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="图片验证码" id="kaptcha_code"></input>
		                 <div class="otherDiv"><img alt="图片验证码" src="/login/kaptcha.png?41" id="kaptcha_pic" class="btn-validation"></div>
		                 <div class="errorDiv hide" id="kapt_error_info" >验证码错误</div>
		            </div>  
		             <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="短信验证码" id="verification_code"></input>
		                 <div class="otherDiv"><button type="button" id="verification_code_recover_btn" class="btn-get-validation">点击获取</button></div>
		                 <div class="errorDiv hide" id="code_error_info">验证码错误</div>
		                 <div class="errorMidDiv hide" id="login_error_info">登录错误</div>
		            </div>
		            </div>
		            
		         <div class="hide" id="nameLogin">
			            <div class="loginContent input-group">
			                 <input class="fontSizeBaseLight"  placeholder="用户名" id="loginName" ></input>
			                 <div class="otherDiv"></div>
			                 <div class="errorDiv hide" id="loginName_error"></div>
			            </div>
			            <div class="loginContent input-group" id="pwdId" >
			                 <input class="fontSizeBaseLight" type="password"  placeholder="密码" id="pwd"></input>
			                 <div class="otherDiv"></div>
			                 <div class="errorDiv hide" id="pwd_error" >用户名或密码错误</div>
			            </div>  
		         </div>  
		          <!--   <div id="welcomeId" class="welcome fontSizeSmLight">欢迎回到拍片网</div>    -->
		            <div id="submitBtn"  class="redBtn">登录</div> 
		             <div class="changeLogin" id="changeLoginId">账号登入在这里</div> 
		            <div class="infoWord fontSizeBaseLight hide">第三方登录</div>
		            <div class="footer-content-three hide">
							<ul>
								<li >
									<a href="javascript:void(0);" id="webcat">
										<img alt="微信" title="使用微信账号登录" src="${imgPath}/login/webcat.png">
									</a>
									<span></span>
								</li>
								<li>
								<div id="qqBt">
										<a href="javascript:void(0);">
											<img alt="QQ" title="使用QQ账号登录" src="${imgPath}/login/qq.png">
										</a>
										<span></span>
									</div>
								</li>
								<li>
										<!-- <span>微博</span> -->
									<div id="weiboBt">
										<a href="javascript:void(0);" >
											<img alt="微博" title="使用微博账号登录" src="${imgPath}/login/weibo.png" >
										</a>
										<span></span>
									</div>
								</li>
							</ul>
						</div>
		            
		         </div>
		   
		   </div>
	
		<%-- <div class="index-content">
			
			<div class="login-container ">
				<div class="well">
					<h2 class="loginh2">供应商登录</h2>
					<form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="login-form">
						<fieldset>
							<!-- 提示框 -->
							<div class="tooltip-show" style="display: none;">
								<label class="tooltip-message"></label>
							</div>
							<div class="form-group">
								<input type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="255" size="255" class="form-control input-lg" id="admin_name" placeholder="请输入用户名">
							</div>
							<div class="form-group">
								<input type="password" autocomplete="off" tabindex="2" maxlength="15" size="15" class="form-control input-lg" id="admin_password" placeholder="请输入密码">
							</div>
						</fieldset>
						<div class="actions">
							<input class="btn btn-danger btn-login" id="loginBt" type="button" value="登录">
						</div>
					</form>
					<div class="links">
						<div class="pull-right">
							<a href='<spring:url value="/provider/register" />' id="register" class="btn btn-link">注册</a>
						</div>
						<a href='<spring:url value="/provider/recover"/>' id="forget" class="btn btn-link">忘记密码?</a>
					</div>
					
					<footer class="footer-three">
						<div class="footer-title-three">
							<h3>第三方账号登录</h3>
						</div>
						<div class="footer-content-three">
							<ul>
								<li >
									<!-- <span>微博</span> -->
									<div id="weiboBt">
										<a href="javascript:void(0);" >
											<img alt="微博" title="使用微博账号登录" src="${imgPath}/login/weibo.png" >
										</a>
										<span>微博</span>
									</div>
								</li>
								<li>
									<a href="javascript:void(0);" id="webcat">
										<img alt="微信" title="使用微信账号登录" src="${imgPath}/login/webcat.png">
									</a>
									<span>微信</span>
								</li>
								<li>
									<div id="qqBt">
										<a href="javascript:void(0);">
											<img alt="QQ" title="使用QQ账号登录" src="${imgPath}/login/qq.png">
										</a>
										<span>QQ</span>
									</div>
								</li>
							</ul>
						</div>
					</footer>
				</div>
			</div>
			
			<div class="register-container hide">
				<div class="well">
					<h2 >供应商注册</h2>
					<form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="register-form">
						<fieldset>
							<div class="form-group" id="userGroup">
								<input type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="255" size="255" class="form-control" id="user_name" placeholder="请输入用户名">
								<span class="help-block hide" id="userSpan">该用户名已存在</span>
							</div>
							<div class="form-group">
								<input type="password" autocomplete="off" tabindex="2" maxlength="18" size="18" class="form-control" id="user_password" placeholder="请输入密码">
							</div>
							<div class="form-group" id="phoneGroup">
								<input type="text" autocomplete="off" tabindex="3" maxlength="11" size="11" class="form-control" id="user_phoneNumber" placeholder="请输入手机号码">
								<span class="help-block hide" id="phoneSpan">该手机号已注册</span>
							</div>
							<div class="form-group">
								<input type="text" id="kaptcha_code" class="form-control verfication" tabindex="4" placeholder="图片验证码" autocomplete="off" maxlength="4">
								<label class="control-label">
									<img alt="图片验证码" src='' id="kaptcha_pic" class="btn-validation">
								</label>
							</div>
							<div class="form-group" id="kaptchaGroup">
								<input type="text" id="verification_code" class="form-control verfication" tabindex="5" placeholder="短信验证码" autocomplete="off" maxlength="6">
								<button type="button" id="verification_code_btn" class="btn btn-default btn-get-validation">点击获取</button>
								<span class="help-block hide" id="kaptchaSpan"></span>
							</div>
						</fieldset>
						<div class="actions">
							<input class="btn btn-danger btn-login" id="registerBt" type="button" value="注册">
						</div>
					</form>
				</div>
			</div>
			
			<div class="recover-container hide">
				<div class="well">
					<h2 >供应商密码找回</h2>
					<form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="recover-form">
						<fieldset>
							<!-- 提示框 -->
							<div class="tooltip-show-recover" style="display: none;">
								<label class="tooltip-message-recover"></label>
							</div>
							<div class="form-group">
								<input type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="11" size="11" class="form-control" id="recover_phone" placeholder="请输入注册手机号码">
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
								<button type="button" id="verification_code_recover_btn" class="btn btn-default btn-get-validation">点击获取</button>
							</div>
							
						</fieldset>
						<div class="actions">
							<input class="btn btn-danger btn-login" id="recoverBt" type="button" value="密码找回">
						</div>
					</form>
				</div>
			</div>
			
			<!-- 账号绑定 start -->
			<div class="bind-container hide">
				<div class="well">
					<h2 >供应商账号绑定</h2>
					<form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="bind-form">
						<fieldset>
							<!-- 提示框 -->
							<div class="tooltip-show-bind" style="display: none;">
								<label class="tooltip-message-bind"></label>
							</div>
							<div class="form-group">
								<input type="text" autofocus="autofocus" autocomplete="off" tabindex="1" maxlength="255" size="255" class="form-control" id="bind_loginName" placeholder="请输入用户名">
							</div>
							<div class="form-group">
								<input type="password" autofocus="autofocus" autocomplete="off" tabindex="2" maxlength="16" size="16" class="form-control" id="bind_password" placeholder="请输入新密码">
							</div>
							<div class="form-group">
								<input type="text" id="kaptcha_code_bind" class="form-control verfication" tabindex="3" placeholder="图片验证码" autocomplete="off" maxlength="4">
								<label class="control-label">
									<img alt="图片验证码" src='' id="kaptcha_pic_bind" class="btn-validation">
								</label>
							</div>
							
						</fieldset>
						<div class="actions">
							<input class="btn btn-danger btn-login" id="bindBt" type="button" value="立即绑定">
						</div>
					</form>
				</div>
			</div>
			<!-- 账号绑定 end -->
			
		</div>
	</div> --%>
</body>
</html>