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
<title>注册-拍片网</title>
<link rel="stylesheet" href="/resources/css/register.css">

<script src="${jqueryJs }"></script>
<script src="${jsonJs }"></script>
<script src="${aesJs }"></script>
<script src="${commonJs }"></script>
<script src="${registerJs }"></script>
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

<body>
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
	<input type="hidden" value="${isLogin}" id="loginAllRigster" />
	
    <jsp:include flush="true" page="header.jsp"></jsp:include>

	<div class="page">
	
		<div class="loginModel">
			<div class="showArea">
				<div class="controlWidth" id="controlWidth"
					style="position: relative">
					<div class="loginDiv right borderRight">
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
						
						<div class="bindLogin ">
							<div>第三方登录</div>
							<ul>
								 <li id="wechat"></li>
                                 <li id="qqBt"></li>
                                 <li id="weiboBt"></li>
							</ul>
						</div>
					</div>

					<div class="loginDiv right borderRight">
						<h1>客户</h1>
						<h2>成为拍片网客户，遇见好作品</h2>
						<div class="hoverAll">
						 	<div class="setImg cusImg"></div>
							<div class="toIwant" id="toCusRe">我要拍片</div>
						</div>	
						<label class="returnInit rightLabel" id="cusToInit">不是客户？</label>
					</div>
					<div class="loginDiv right">
						   <h1>创作团队</h1>
                           <h2>成为拍片网创作团队，接单更容易</h2>
                           <div class="hoverAll">
	                           <div class="setImgPro proImg"></div>
	                           <div class="toIwant" id="toProRe">入驻拍片网</div>
	                       </div>    
                           <label class="returnInit leftLabel" id="proToInit">不是创作团队？</label>
					</div>

					<div class="loginDiv right borderLeft">
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
					</div>
				</div>
			</div>
		</div>
		 <div class="ourUser">已有账号?&nbsp&nbsp&nbsp&nbsp请<a href="<spring:url value="/login" />"><span>登录</span></a></div>
	</div>
	<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
</body>

</html>
