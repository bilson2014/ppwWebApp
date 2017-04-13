<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<spring:url value="/resources/css/commons.css" var="commonCss" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css"
	var="datepickerCss" />
<spring:url value="/resources/css/provider/safeInfo.css"
	var="safeInfoCss" />
<spring:url value="/resources/lib/webuploader/webuploader.css"
	var="webuploaderCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.blockui/jquery.blockUI.js"
	var="blockUIJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js"
	var="bootstrapJs" />
<spring:url value="/resources/lib/webuploader/webuploader.js"
	var="webuploaderJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js"
	var="datepickerJs" />
<spring:url
	value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js"
	var="datepickerZHJs" />
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs" />
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/provider/safeInfo.js" var="safeInfoJs" />

<spring:url value="/resources/images" var="path" />

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
<title>拍片网 | 供应商信息页面</title>
<link rel="shortcut icon" href="${path }/favicon.ico">
<link rel="stylesheet" href="${normalizeCss }">
<link rel="stylesheet" href="${commonCss }">
<link rel="stylesheet" href="${datepickerCss }">
<link rel="stylesheet" href="${webuploaderCss }">
<link rel="stylesheet" href="${safeInfoCss}">

<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${blockUIJs }"></script>
<script src="${jsonJs }"></script>
<script src="${bootstrapJs }"></script>
<script src="${webuploaderJs }"></script>
<script src="${datepickerJs }"></script>
<script src="${datepickerZHJs }"></script>
<script src="${aesJs }"></script>
<script src="${padJs }"></script>
<script src="${commonJs }"></script>
<script src="${safeInfoJs }"></script>
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
<spring:url value="/resources/images/provder" var="imgPath" />
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
<body>
	<input type="hidden" value="${team.phoneNumber }" id="phoneNumber">
	<input type="hidden" value="${team.teamId }" id="teamId">
	<div class="proInfo">
		<div class="safeInfo" id="normal">
			<div class="safeItem">
				<div class="leftItem">
					<div class="content">
						<div class="loginTitle">登录密码</div>
						<div>使用账号登录时需要输入的密码</div>
					</div>
					<div class="content">
						<div class="infoName">登录名</div>
						<c:if test="${empty team.loginName }">
							<div>未设置</div>
						</c:if>
						<c:if test="${not empty team.loginName }">
							<div>${team.loginName}</div>
						</c:if>
					</div>
					<div class="setInfo btn-c-r" id="toUserName">设置</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="safeItem">
				<div class="leftItem">
					<div class="content">
						<div class="loginTitle">手机绑定</div>
						<div>确保账号登录时的安全性，同时作为密码找回身份验证使用</div>
					</div>
					<div class="content">
						<div class="infoName">原手机号</div>
						<c:if test="${not empty team.phoneNumber }">
							<div>${fn:replace(team.phoneNumber,fn:substring(team.phoneNumber,3,7), '****')}</div>
						</c:if>
					</div>
					<div class="setInfo btn-c-r" id="toUserPassWord">设置</div>
				</div>
			</div>
		</div>


		<div class="setUserContent" id="userName">
			<div class="top">
				<div>手机绑定</div>
				<div>确保账号登录时的安全性，同时作为密码更改，密码找回，支付时验证身份用</div>
			</div>
			<div class="old-phone">
				<div class="setItem change">
					<div class="title">原手机号</div>
					<div class="title">${team.phoneNumber}</div>
				</div>
				<div class="setItem" id='old-code-error'>
					<div class="title">验证码</div>
					<input class="setInput" id='old-code'>
					<button class="setCode" id='code-foroldphone'>发送验证码</button>
				</div>
				<div class="btn-c-r infoSubmit" id="validate-oldPhonecode">验证</div>
			</div>


			<div class="new-phone hide">
				<div class="setItem" id='new-phoneNumber-error'>
					<div class="title">新手机号</div>
					<input id='new-phoneNumber'>
				</div>
				<div class="setItem" id='new-code-error'>
					<div class="title">验证码</div>
					<input class="setInput" id='new-code'>
					<button class="setCode" id='code-fornewphone'>发送验证码</button>
				</div>
				<div class="bottom">
					<div class="btn-c-r infoSubmit" id="bindNewPhone">保存</div>
					<div class="btn-c-g infoReSet" id="nameReturn">取消</div>
				</div>
			</div>
		</div>


		<div class="setUserContent" id="userPassWord">
			<div class="top">
				<div>登录密码</div>
				<div>使用账号登录时需要输入密码</div>
			</div>
			<div class="setItem" id="loginName-error">
				<div class="title">登录名</div>
				<c:if test="${not empty team.loginName }">
					<div class="loginDivName">${team.loginName }</div>
					<input id="loginName" type="hidden" value='${team.loginName }'>
				</c:if>
				<c:if test="${empty team.loginName }">
					<input id="loginName">
				</c:if>
			</div>
			<div class="setItem" id="newpwd-error">
				<div class="title">新密码</div>
				<input type="password" id='newpwd'>
			</div>
			<div class="setItem" id='repwd-error'>
				<div class="title">确认密码</div>
				<input type="password" id='repwd'>
			</div>
			<div class="setItem" id='veritifyCode-error'>
				<div class="title">验证码</div>
				<input class="setInput" id='veritifyCode'>
				<button class="setCode" id="code-forpwd">发送验证码</button>
			</div>
			<div class="bottom">
				<c:if test="${not empty team.loginName }">
					<div class="infoSubmit btn-c-r pwdupdate">保存</div>
				</c:if>
				<c:if test="${empty team.loginName }">
					<div class="infoSubmit btn-c-r pwdadd">保存</div>
				</c:if>
				<div class="btn-c-g infoReSet" id="pwdReturn">取消</div>
			</div>

		</div>


	</div>
</body>
</html>