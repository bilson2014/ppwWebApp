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
<title>拍片网－注册</title>
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
	 <div class="header headerMove" id="header">
 		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">在线估价<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">在线估价<span></span></a>
				</r:identity>
				
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">在线估价<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
            </div>
            <input type="hidden" id="commonToken" name="token" value="${token}"/>
            <div class="middle-part">
                <div class="search-box">
                    <form method="get" action="/search" id="s-form">
                        <div class="bannerSearchFind"></div>
                        <input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
                        <a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
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
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/default-user.jpg"></a>
					<a  class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/user/info" />"><li class="toSet">个人信息</li></a>
					         <a href="<spring:url value="/user/info?safeInfo" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/initLogo.png"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/provider/portal?company-info" />"><li class="toSet">公司信息</li></a>
					         <a href="<spring:url value="/provider/portal?safe-info" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/provider/portal" />"><li class="toList">作品列表</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>

				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
            </div>
        </div>
    </div>




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
						   <h1>导演</h1>
                           <h2>成为拍片网导演，接单更容易</h2>
                           <div class="hoverAll">
	                           <div class="setImgPro proImg"></div>
	                           <div class="toIwant" id="toProRe">入驻拍片网</div>
	                       </div>    
                           <label class="returnInit leftLabel" id="proToInit">不是导演？</label>
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
						
						<!-- <div class="bindLogin ">
							<div>第三方登录</div>
							<ul>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div> -->
					</div>
                             
				</div>
			</div>
		</div>
		 <div class="ourUser">已有账号?&nbsp&nbsp&nbsp&nbsp请<a href="<spring:url value="/login" />"><span>登录</span></a></div>
	</div>
	
	<!-- foot -->
         					<div class="foot3">
                                <div class="footContent">
                                    <div class="contentTop">
                                        <div class="topItem codeWidth">
                                            <div class="Twocode"></div>
                                            <div class="smWord">扫一扫 关注官方微信</div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>登录</a></div>
                                             <div class="cusLogin iconItem"><a href="<spring:url value="/login?role=user" />">客户登录</a></div>
                                            <div class="proLogin iconItem"><a href="<spring:url value="/login?role=director" />">导演登录</a></div>
                                            <div class="manLogin iconItem"><a href="<spring:url value="/mgr/login" />">管家登录</a></div>
                                            <div class="reg iconItem"><a href="<spring:url value="/register" />">注册</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>关于拍片网</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/about-us.html' />">了解我们</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/member.html#join-us' />">加入我们</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/company-activity.html' />">公司活动</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/member.html#activityPart' />">团队介绍</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>服务</a></div>
                                            <div class="noiconItem" ><a href="<spring:url value='/order-flow.html' />">服务流程</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a></div>
<%--                                             <div class="noiconItem"><a href="<spring:url value="/login" />">找拍摄团队</a></div>
                                            <div class="noiconItem"><a href="<spring:url value="/provider/login" />">我要发作品</a></div> --%>
                                        </div>
                                        <div class="topItem onLineWidth">
                                            <div class="title"><a>在线联系我们</a></div>
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no">客户客服</a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">导演客服</a></div>
                                            <div class="email iconItem"><a href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a></div>
                                        </div>
                                        <div class="topItem">
                                            <div class="title"><a>咨询电话</a></div>
                                            <div class="tel"><a href="tel:4006609728">400-660-9728</a></div>
                                            <div class="workTime"><a>工作时间 9:00-18:00  (周一至周五)</a></div>
                                        </div>
                                    </div>
                                    <div class="contentBottom">
                                        <div>版权信息</div>
                                        <div>本站视频作品采用知识共享署名-非商业性使用.本站不提供任何视听上传服务,</div>
                                        <div>所有内容均来自视频分享站点所提供的公开引用资源.</div>
                                        <div>© 2014 攀峰文化 京ICP备 14036662号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div>
                            <!--新版底部-->
	

    
</body>

</html>
