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
<spring:url value="/resources/js/rePwdCus.js" var="rePwdCusJs" />
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="拍片网登录">
    <meta name="description" content="">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>拍片网－密码找回</title>
    <link rel="stylesheet" href="/resources/css/rePwdCus.css">
    <script src="${jqueryJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${rePwdCusJs }"></script>
</head>

<body>
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
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">登录</a>
					<a href="<spring:url value="/register" />" class="header-item login-item" target="_self">注册</a>
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
        <div class="loginLeftArea">
            <div id="showCus">
                <div class="setImageCus"></div>
                <div class="setInfo">
                    <div class="infoTop">
                        <label>让所有企业都能够</label>
                        <label>享受高品质的视频服务!</label>
                    </div>
                    <div class="infoItem">
                        <label>600+脑洞超大的创意人员</label>
                        <label>为您提供服务</label>
                        <div class="cIcon1"></div>
                    </div>
                    <div class="infoItem">
                        <label>5000+导演随时抢单,</label>
                        <label>甄选出最适合您的一位</label>
                        <div class="cIcon2"></div>
                    </div>
                    <div class="infoItem">
                        <label>视频管家一对一服务,</label>
                        <label>性价比高,质量保障</label>
                        <div class="cIcon3"></div>
                    </div>
                    <div class="infoItem">
                        <label>全新的线上管理系统,</label>
                        <label>随时随地了解状态</label>
                        <div class="cIcon4"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="loginModel">
            <div class="showArea">
                <div class="getBack">密码找回</div>
                <div class="title">
                    <div class="red" id="topStep1">
                        <center>
                            <div>1</div>
                            <span>手机验证</span>
                        </center>
                    </div>
                    <div class="gray" id="topStep2">
                        <center>
                            <div>2</div>
                            <span>修改密码</span>
                        </center>
                    </div>
                    <div class="gray finish" id="topStep3">
                        <center>
                            <div>3</div>
                            <span>完成</span>
                        </center>
                    </div>
                </div>
                <div id="step1">
                    <div class="loginDiv right" id="cusPhoneLogin">
                        <div class="loginContent input-group">
                            <input class="fontSizeBaseLight" placeholder="手机号" id="user_phoneNumber"></input>
                            <div class="otherDiv"></div>
                            <div class="errorDiv hide" id="phone_error_user">*手机号错误</div>
                              </div>
                              <div class="loginContent input-group">
                                   <input class="fontSizeBaseLight"  placeholder="图片验证码 " id="kaptcha_code_user"></input>
                                   <div class="otherDiv "><img alt="图片验证码 " src="/login/kaptcha.png?41" id="kaptcha_pic_user" class="btn-validation"></div>
                                   <div class="errorDiv hide " id="kapt_error_info_user" >*验证码错误</div>
                              </div>  
                              <div class="loginContent input-group ">
                                   <input class="fontSizeBaseLight "  placeholder="短信验证码 " id="verification_code_user"></input>
                                   <div class="otherDiv "><button type="button " id="get_code_user" class="btn-get-validation fontSizeBaseLight " >点击获取</button></div>
                                   <div class="errorDiv hide " id="code_error_info_user">*验证码错误</div>
                              </div>
                              <div class="redBtn btn-c-r " id="stepBtn">下一步</div>
                    </div>
               </div>

               <div id="step2" style="display:none">
                    <div class="loginDiv right" id="cusPhoneLogin">
                        <div class="loginContent input-group">
                        	<input class="fontSizeBaseLight" placeholder="用户名" id="loginName"></input>
                            <div class="otherDiv"></div>
                            <div class="errorDiv hide" id="loginName-info">*用户名</div>
                              </div>
                              <div class="loginContent input-group ">
                                   <input class="fontSizeBaseLight "  placeholder="新密码" id="pwd"></input>
                                   <div class="errorDiv hide " id="pwd-info" >*密码错误</div>
                                   <img class="newImg" id="myPwd" src="/resources/images/login/true.png">
                              </div>  
                              <div class="loginContent input-group ">
                                   <input class="fontSizeBaseLight "  placeholder="确认新密码" id="newpwd"></input>
                                   <div class="errorDiv hide " id="newpwd-info">*密码错误</div>
                                   <img class="newImg" id="myPwdTrue" src="/resources/images/login/true.png">
                                   <img class="newImg" id="myPwdFalse" src="/resources/images/login/false.png">
                              </div>
                              <div class="redBtn btn-c-r " id="stepFinishBtn">下一步</div>
                    </div>
               </div>
        </div>
    </div>
</body>

</html>
