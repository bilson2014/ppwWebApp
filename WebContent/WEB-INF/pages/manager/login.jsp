<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/manager/login.css" var="loginCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/manager/login.js" var="loginJs"/>
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
	<link rel="stylesheet" href="${loginCss }">
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
		            <h1>视频管家登录</h1>
		              <form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="login-form">
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="管家名" id="loginName"></input>
		                 <div class="otherDiv"></div>
		                 <div class="errorDiv hide" id="loginNameId">*管家名错误</div>
		            </div>
		                <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight" type="password"  placeholder="密码" id="pwd"></input>
		                 <div class="errorDiv hide" id="pwdId">*用户名或密码错误</div>
		                 <div class="errorMidDiv hide" id="login_error_info">登录错误</div>
		            </div>
		                </form>
		            
		            <div class="redBtn" id="loginbtn">登录</div> 
		              <a href="/mgr/recover"><h2 id="forget">忘记密码？</h2></a>
		            <div class="infoWord fontSizeBaseLight">第三方登录</div>
		            <div class="footer-content-three">
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
		
		
	
	<%-- <div class="page page-width">
		<div class="login-div" >
       
          <h1>视频管家登录</h1>
          <form role="form" method="POST" autocomplete="off" accept-charset="UTF-8" id="login-form">
          	<!-- 提示框 -->
			<div class="tooltip-show-recover" style="display: none;">
				<label class="tooltip-message-recover"></label>
			</div>
	          <input class="use-name" placeholder=" 请输入用户名" id="loginName" />
	          <input class="use-password" type="password" placeholder=" 请输入密码" id="pwd" />
          </form>
          
          <button  class="loginbtn" id="loginbtn">登录</button>

          <a href="/mgr/recover"><h2 id="forget">忘记密码？</h2></a>

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

    </div> --%>
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${loginJs }"></script>
</body>
</html>