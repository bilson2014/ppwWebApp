<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/threeLogin.css" var="bindCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/threeLogin.js" var="loginJs"/>
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
	<title>登录页面-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bindCss }">
	
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
    <script type="text/javascript">
	var _vds = _vds || [];
	window._vds = _vds;
	(function() {
		_vds.push([ 'setAccountId', '9f2e33a3d43b5d78' ]);
		(function() {
			var vds = document.createElement('script');
			vds.type = 'text/javascript';
			vds.async = true;
			vds.src = ('https:' == document.location.protocol ? 'https://'
					: 'http://')
					+ 'dn-growing.qbox.me/vds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(vds, s);
		})();
	})();
</script>
</head>
<body >

	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${isLogin}" id="loginAllRigster"/>
    
    <jsp:include flush="true" page="header.jsp"></jsp:include>
	
	 <div class="outSideDiv">
		         <div class="loginDiv">
		          	<img class="loginImg" src="${imgUrl}">
		            <h1><span>Hi,</span>&nbsp${userName}</h1>
		            <!-- 第三方用户状态 不存在or存在却无手机号 -->
		            <input type="hidden" id="code" value="${code}"></input>
		            <input type="hidden" id="userId" value="${userId}"></input>
		             <input type="hidden" id="unique" value="${unique}"></input>
		            <input type="hidden" id="userName" value="${userName}"></input>
		            <input type="hidden" id="imgUrl" value="${imgUrl}"></input>
		            <!-- qq or wechat or wb -->
		            <input type="hidden" id="type" value="${type}"></input>
		            <input type="hidden" id="qq"></input>
		            <input type="hidden" id="wechat"></input>
		            <input type="hidden" id="wb"></input>
		            <h2>请绑定拍片网账号</h2>
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  placeholder="手机号" id="user_phoneNumber"></input>
		                 <div class="otherDiv"></div>
		                 <div class="errorDiv hide" id="user_phoneNumberId"">*手机号错误</div>
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
		            </div>
		            <div class="redBtn" id="bindBtn">立即绑定</div> 
		            <div class="Ihave">已有账号?&nbsp&nbsp&nbsp请<span onclick="window.location.href='/login'">登录</span></div> 
		         </div>
		   </div>
	
</body>
</html>