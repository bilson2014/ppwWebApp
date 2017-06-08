<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/css/updatePwd.css" var="loginCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/updatePwd.js" var="updatePwdJs"/>
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
	<title>广告－宣传片－微电影－视频营销_忘记密码-拍片网</title>
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
	<script src="${updatePwdJs }"></script>
	<script src="${EasePackJs }"></script>
	<script src="${TweenLiteJs }"></script>
	<script src="${rAFJs }"></script>
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
	<input type="hidden" value="${userType}" id="userType"/>
	<input type="hidden" value="${userId}" id="userId"/>
	
	<jsp:include flush="true" page="header.jsp"></jsp:include>
	
		    <div class="outSideDiv phoneHeight" id="outSideId">
		         <div class="loginDiv">
		         <input id="login_type" value="phone" type="hidden"></input>
		            <h1>修改密码</h1>
		            <div class="" id="showLogin">
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight" id = "loginName"  placeholder="用户名" value="${userLoginName }"></input>
		                 <div class="otherDiv"></div>
		                 <div class="errorDiv hide" id="errorloginName">*用户名错误</div>
		            </div>
		            <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight" type="password"  placeholder="新密码" id="password"></input>
		                 <div class="otherDiv hide"><img alt="图片验证码" class="btn-validation"></div>
		                 <div class="errorDiv hide" id="errorpassword" >*密码错误</div>
		            </div>  
		                <div class="loginContent input-group">
		                 <input class="fontSizeBaseLight"  type="password" placeholder="确认密码" id="comfrimPassword"></input>
		                 <div class="errorDiv hide" id="errorcomfrimPassword">*密码错误</div>
		                 <div class="errorMidDiv hide" id="updateerror">修改失败</div>
		            </div>
		           </div>
		            <div class="redBtn" id="executeBtn">修改密码</div> 
		         </div>
		   </div>
	
</body>
</html>