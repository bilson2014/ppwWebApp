<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/register.js" var="registerJs" />
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="拍片网登陆,视频制作登陆,拍片登陆,拍广告登陆,找导演登陆">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>拍片网－广告－宣传片－微电影－视频营销_登录页面</title>
<link rel="stylesheet" href="/resources/css/register.css">

<script src="${jqueryJs }"></script>
<script src="${jsonJs }"></script>
<script src="${aesJs }"></script>
<script src="${commonJs }"></script>
<script src="${registerJs }"></script>
</head>

<body>
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
	<input type="hidden" value="${isLogin}" id="loginAllRigster" />
	<div class="header headerMove" id="header">
		<input type="hidden" id="csrftoken" name="csrftoken"
			value="${csrftoken}" />
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item">我的项目<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>"
						class="header-item">信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item">所有项目<span></span></a>
				</r:identity>

				<r:noLogin>
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
				</r:noLogin>
				<a href="<spring:url value='/list.html'/>" class="header-item"
					target="_parent">精品案例<span></span></a> <a href="/order-flow.html"
					class="header-item" target="_parent">服务流程<span></span></a> <a
					class="header-item header-item-last" id="showVideo"
					target="_parent">
					<div class="showVideo"></div> 拍片网介绍 <span></span>
				</a>
			</div>
			<input type="hidden" id="commonToken" name="token" value="${token}" />
			<div class="middle-part">
				<div class="search-box">
					<form method="get" action="/search" id="s-form">
						<div class="bannerSearchFind"></div>
						<input type="text" size="16" autocomplete="off" id="search-q"
							name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" /> <a
							href="javascript:void(0);" class="go bk_white"
							onclick="return false;" id="s-btn"></a>
						<ul id="shelper" class="shelper-lucency"></ul>
					</form>
				</div>
			</div>
			<div class="right-part">
				<r:noLogin>
					<a href="<spring:url value="/provider/login" />"
						class="header-item login-item" target="_self">供应商登录</a>
					<a href="<spring:url value="/login" />"
						class="header-item login-item" target="_self">客户登录</a>
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



	<div class="page">
		<div class="loginModel">
			<div class="showArea">
				<div class="controlWidth" id="controlWidth"
					style="position: relative">
					<div class="loginDiv right">
						<div class="loginContent input-group">
							<input class="fontSizeBaseLight" placeholder="手机号"
								id="user_phoneNumber"></input>
							<div class="otherDiv"></div>
							<div class="errorDiv hide" id="phone_error_user">*手机号错误</div>
						</div>
						<div class="loginContent input-group">
							<input class="fontSizeBaseLight" placeholder="图片验证码 "
								id="kaptcha_code_user"></input>
							<div class="otherDiv">
								<img alt="图片验证码 " src="/login/kaptcha.png?41" id='kaptcha_pic_user'
									class="btn-validation">
							</div>
							<div class="errorDiv hide" id="kapt_error_info_user">*验证码错误</div>
						</div>
						<div class="loginContent input-group ">
							<input class="fontSizeBaseLight " placeholder="短信验证码 "
								id="verification_code_user"></input>
							<div class="otherDiv ">
								<button type="button" id="get_code_user"
									class="btn-get-validation fontSizeBaseLight ">点击获取</button>
							</div>
							<div class="errorDiv hide " id="code_error_info_user">*验证码错误</div>
						</div>
						<div class="redBtn btn-c-r" id="submitBtn-user">注册</div>
						<div class="Ihave ">
							还没有账号?&nbsp&nbsp&nbsp请<a><span>注册</span></a>
						</div>
						<div class="bindLogin ">
							<div>第三方登录</div>
							<ul>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>

					<div class="loginDiv right borderLeft">
						<h1>客户</h1>
						<h2>作品如人品,享受的不止是低价</h2>
						<div class="setImg cusImg"></div>
						<div class="toIwant" id="toCusRe">我要拍片</div>
						<label class="returnInit rightLabel" id="cusToInit">不是客户？</label>
					</div>
					<div class="loginDiv right borderRight">
						<h1>客户</h1>
						<h2>作品如人品,享受的不止是低价</h2>
						<div class="setImgPro proImg"></div>
						<div class="toIwant" id="toProRe">我要拍片</div>
						<label class="returnInit leftLabel" id="proToInit">不是客户？</label>
					</div>

					<div class="loginDiv right">
						<div class="loginContent input-group">
							<input class="fontSizeBaseLight" placeholder="手机号"
								id="team_phoneNumber"></input>
							<div class="otherDiv"></div>
							<div class="errorDiv hide" id="phone_error_team">*手机号错误</div>
						</div>
						<div class="loginContent input-group ">
							<input class="fontSizeBaseLight " placeholder="图片验证码 "
								id="kaptcha_code_team"></input>
							<div class="otherDiv ">
								<img alt="图片验证码 " src="/login/kaptcha.png?41" id="kaptcha_pic_team"
									class="btn-validation ">
							</div>
							<div class="errorDiv hide" id="kapt_error_info_team">*验证码错误</div>
						</div>
						<div class="loginContent input-group ">
							<input class="fontSizeBaseLight " placeholder="短信验证码 "
								id="verification_code_team"></input>
							<div class="otherDiv ">
								<button type="button " id="get_code_team"
									class="btn-get-validation fontSizeBaseLight ">点击获取</button>
							</div>
							<div class="errorDiv hide " id="code_error_info_team">*验证码错误</div>
						</div>
						<div class="redBtn btn-c-r" id="submitBtn-team">注册</div>
						<div class="Ihave">
							还没有账号?&nbsp&nbsp&nbsp请<a><span>注册</span></a>
						</div>
						<div class="bindLogin ">
							<div>第三方登录</div>
							<ul>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</body>

</html>
