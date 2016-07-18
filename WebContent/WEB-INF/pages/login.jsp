<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/login.css" var="loginCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/login.js" var="loginJs"/>

<spring:url value="/resources/lib/disk/EasePack.min.js" var="EasePackJs"/>
<spring:url value="/resources/lib/disk/TweenLite.min.js" var="TweenLiteJs"/>
<spring:url value="/resources/lib/disk/rAF.js" var="rAFJs"/>
<spring:url value="/resources/lib/disk/demo-1.js" var="demoJs"/>

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
	<meta name="keywords" content="拍片网登陆,视频制作登陆,拍片登陆,拍广告登陆,找导演登陆">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_登录页面</title>
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
	<script src="${demoJs }"></script>
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>
<body >
	<input type="hidden" value="${isLogin}" id="loginAllRigster"/>
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
	
	
	 <div class="outSideDiv phoneHeight" id="outSideId">
		         <div class="loginDiv">
		         <input id="login_type" value="phone" type="hidden"></input>
		            <h1>客户登录</h1>
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
		            
		            <div class="redBtn" id="submitBtn">登录</div> 
		            
		      
		             <div id="threeId">
		            <div class="infoWord fontSizeBaseLight" >第三方登录</div>
		            <div class="footer-content-three ">
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
					<div class="changeDiv" id="changeLoginId">
		                  <div class="changeImg hide" id="changeId"></div>
		                  <div class="changeLogin" id="loginWord">账户登入在这里</div> 
		             </div> 
		            
		         </div>
		   
		   </div>
	
	
	<%-- <div class="wrap">
		<div class="card">
			<div class="front">
				<div class="login-content">
					<header >
						<div class="header-logo">
							<a href='<spring:url value="/" />' >
								<h1>拍片网</h1>
							</a>
							<p>客户登录</p>
						</div>
					</header>
					<section>
						<h2 class="login-title">客户登录</h2>
						<div class="form-wrap">
							<form id="form-login" role="form" method="post" autocomplete="off" accept-charset="UTF-8">
								<div class="form-group">
									<input id="userName" type="text" class="form-control form-height" tabindex="1" placeholder="手机登录" autocomplete="off" >
								</div>
								<div id="kaptcha_code_wrap" class="form-group form-item hide">
									<input type="text" id="kaptcha_code" class="form-control verfication form-height" tabindex="2" placeholder="图片验证码" autocomplete="off" maxlength="4">
									<label class="control-label">
										<img alt="图片验证码" src='' id="kaptcha_pic" class="kaptcha_pic_image">
									</label>
								</div>
								<div id="verification_code_wrap" class="form-group form-item hide">
									<input type="text" id="verification_code" class="form-control verfication form-height" tabindex="2" placeholder="短信验证码" autocomplete="off" maxlength="6">
									<button type="button" id="verification_code_btn" class="btn btn-default line_height form-height button94">点击获取</button>
								</div>
								<div id="uPassw0rd_wrap" class="form-group form-item hide">
									<input type="password" id="uPassw0rd" class="form-control form-height" tabindex="3" placeholder="请输入密码" autocomplete="off" >
									<span class="help-block label-left color-red font12 hide" id="label-info"></span>
								</div>
								<div id="message-wrap" class="form-group form-item hide">
									<span class="help-block label-left color-red font12" id="message-info"></span>
								</div>
								<div class="form-group">
									<button id="loginBt" data-id="login" type="button" class="btn btn-primary btn-wrap" >登录/注册</button>
								</div>
								<div class="form-group" id="forget-group">
									<div class="forget">
										<a target="_self" href='<spring:url value="/recover"/>' class="btn btn-link">忘记密码</a>
									</div>
								</div>
							</form>
						</div>
					</section>
					<footer class="footer">
						<div class="footer-title">
							<h3>第三方账号登录</h3>
						</div>
						<div class="footer-content">
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
		</div>
	</div> --%>
</body>
</html>