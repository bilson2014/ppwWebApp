<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.css" var="jcropCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/userInfo.css" var="userInfoCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/html5shiv/html5shiv.js" var="html5shivJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/ajaxfileupload_userInfo.js" var="ajaxfileuploadJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jcrop/jquery.Jcrop.min.js" var="jcropJs"/>
<spring:url value="/resources/lib/jcrop/jquery.color.js" var="jcropColorJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/juicer.js" var="juicerJs"/>
<spring:url value="/resources/js/userInfo.js" var="userInfoJs"/>
<spring:url value="/resources/img" var="imgPath"/>
<spring:url value="/resources/images" var="imgPaths"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,用户信息,用户资料,拍片网资料,导演信息">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_个人信息修改页面</title>
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${jcropCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${userInfoCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${ajaxfileuploadJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${jcropJs }"></script>
	<script src="${jcropColorJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${juicerJs }"></script>
	<script src="${userInfoJs }"></script>
	
	
<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>
<body>
	<input type="hidden" id="user_sex" value="${user.sex }"/>
	<input type="hidden" id="user_unique" value="${user.id }"/>
	<input type="hidden" id="user_img" value="${user.imgUrl }"/>
	
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
			
			<div class="middle-part">
				<div class="search-box" id="header-search">
					<form method="get" action="/search" id="s-form">
						<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
						<a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
						<ul id="shelper" class="shelper-lucency"></ul>
					</form>
				</div>
			</div>
			
			<div class="right-part">
				<r:noLogin>
					<a href="<spring:url value="/provider/login" />" class="header-item login-item" target="_self">供应商登录</a>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">客户登录</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item header-name" target="_self" title="<r:outName />"><r:outName /></a>
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
	
	<div class="page">
		<div class="user-content">
				<section class="user-img-section-wrap">
					<div class="user-img">
						<img alt="用户头像" src="${imgPath }/icons/default.png" class="img-circle" id="user-circle-img"/>
					</div>
					<div class="user-info">
						<h1 id="user-name">${user.userName }</h1>
						<p id="user-telephone">${user.telephone }</p>
					</div>
				</section>
				<section class="user-info-section-wrap">
					<div class="user-info-wrap">
						<div class="navigation">
							<ul class="nav nav-tabs">
								<li><a href="javascript:void(0);" data-url="self-info-content">个人资料</a></li>
								<li><a href="javascript:void(0);" data-url="password-info-content">安全设置</a></li>
								<li><a href="javascript:void(0);" data-url="userpic-info-content">头像修改</a></li>
								<li><a href="javascript:void(0);" data-url="phone-info-content">更换手机</a></li>
								<li><a href="javascript:void(0);" data-url="three-band">三方绑定</a></li>
							</ul>
						</div>
						<div class="self-info-content information">
							<form class="form-horizontal" role="form" method="post" autocomplete="off" accept-charset="UTF-8" >
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">昵称</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="nickName" value="${user.userName }" tabindex="1" placeholder="请输入昵称" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label id="label-nickName" class="label-message hide" >请输入用户昵称</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">性别</label>
									<div class="col-sm-5">
										<label class="radio-inline">
											<input type="radio"  value="0" name="sex">男性
										</label>
										<label class="radio-inline">
											<input type="radio"  value="1" name="sex">女性
										</label>
										<label class="radio-inline">
											<input type="radio"  value="2" name="sex">保密
										</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">真实姓名</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="trueName" value="${user.realName }" tabindex="2" placeholder="请输入真实姓名" autocomplete="off" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">公司名称</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="company" value="${user.userCompany }" tabindex="3" placeholder="请输入公司名称" autocomplete="off" />
										<label id="label-company" class="label-message hide" >请输入正确的邮箱地址</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">电子邮件</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="contact-email" value="${user.email }" tabindex="4" placeholder="请输入电子邮件" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label id="label-email" class="label-message hide" >请输入正确的邮箱地址</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">QQ</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="contact-qq" value="${user.qq }" tabindex="5" placeholder="请输入QQ号" autocomplete="off" />
									</div>
								</div>
									<div class="form-group">
									<label class="col-sm-2 control-label">客户来源</label>
									<div class="col-sm-5">
										<select class="tableinput-baseinfo form-control selectdiv" id="customerSource" >
										<c:if test="${!empty userSource}">
											<c:forEach items="${userSource }" var="source" varStatus="status">
											  <option value ="${source.key }" 
											  	<c:if test="${user.customerSource == source.key }">
											  		selected="selected"
											  	</c:if> >${source.value }</option>
											</c:forEach>
										</c:if>
										</select>
									</div>
									<div class="col-sm-5">
										<label id="" class="label-message hide" >请输入来源</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"></label>
									<div class="col-sm-5">
										<a class="btn btn-primary" href="javascript:void(0);" id="self-info-contentBt" >修改</a>
									</div>
								</div>
							</form>
						</div>
						
						<!-- 密码修改 -->
						<div class="password-info-content information">
						
						   <div  id="ins">
							<form class="form-horizontal" role="form" method="post" autocomplete="off" accept-charset="UTF-8" >
							<div class="form-group">
									<label class="col-sm-2 control-label item-height">用户名</label>
									<div class="col-sm-5">
										<input type="text" class="form-control" id="insuserName" tabindex="1" placeholder="请输入用户名" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label id="insuserName-error" class="label-message hide" ></label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">新密码</label>
									<div class="col-sm-5">
										<input type="password" class="form-control" id="insPassword" tabindex="1" placeholder="请输入6位以上密码" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label id="insPassword-error" class="label-message hide" >请输入6位以上密码</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">密码确认</label>
									<div class="col-sm-5">
										<input type="password" class="form-control" id="insTwoPassword" tabindex="1" placeholder="请输入6位以上确认密码" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label id="insTwoPassword-error" class="label-message hide" >两次输入的密码不一致</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">验证码</label>
									<div class="col-sm-3">
										<input type="text" class="form-control" id="veritifyCode-pwd" tabindex="2" placeholder="请输入验证码" autocomplete="off" />
									</div>
									<div class="col-sm-3">
										<button type="button" data-flag="new-bind" class="btn btn-default codeBt" id="pwd-codeBt">获取验证码</button>
									</div>
									<div class="col-sm-4">
										<label id="label-code" class="label-message hide" >请输入验证码</label>
										<label id="label-code-error" class="label-message hide" >验证码错误</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"> </label>
									<div class="col-sm-5">
										<a class="btn btn-primary" href="javascript:void(0);" id="password-info-contentBt" >修改</a>
									</div>
								</div>
							</form>
							</div>
							
							<div  class="hide" id="upd">
							<form class="form-horizontal" role="form" method="post" autocomplete="off" accept-charset="UTF-8" >
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">用户名</label>
									<div class="col-sm-5">
										<div class="col-sm-2 control-label item-height" id = "userLoginName" style="width:100px">${user.loginName }</div>
									</div>
									<div class="col-sm-5">
										<label id="label-passw0rd" class="label-message hide" >请输入6位以上密码</label>
									</div>
								</div>
								
								<!--  
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">原密码</label>
									<div class="col-sm-5">
										<input type="password" class="form-control" id="upd-passwords"  placeholder="请输入原密码" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label  class="label-message hide" id ="upd-password-error">请输入6位以上密码</label>
									</div>
								</div>
								 -->
								
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">新密码</label>
									<div class="col-sm-5">
										<input type="password" class="form-control" id="upd-newpassword" tabindex="1" placeholder="请输入6位以上密码" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label  class="label-message hide" id = "upd-newpassword-error" >请输入6位以上密码</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label item-height">密码确认</label>
									<div class="col-sm-5">
										<input type="password" class="form-control" id="upd-towpassword" tabindex="1" placeholder="请输入6位以上确认密码" autocomplete="off" />
									</div>
									<div class="col-sm-5">
										<label  class="label-message hide" id = "upd-towpassword-error">两次输入的密码不一致</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">验证码</label>
									<div class="col-sm-3">
										<input type="text" class="form-control" id="upd-veritifyCode" tabindex="2" placeholder="请输入验证码" autocomplete="off" />
									</div>
									<div class="col-sm-3">
										<button type="button" class="btn btn-default codeBt" id="upd-codeBt">获取验证码</button>
									</div>
									<div class="col-sm-4">
										<label id="upd-label-code" class="label-message hide" >请输入验证码</label>
										<label id="upd-label-code-error" class="label-message hide" >验证码错误</label>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"> </label>
									<div class="col-sm-5">
										<a class="btn btn-primary" href="javascript:void(0);" id="upd-btn" >修改</a>
									</div>
								</div>
							</form>
							</div>
						</div>
						
						<!-- 头像修改 -->
						<div class="userpic-info-content information">
							<div class="userpic-wrap">
								<div class="user-img-content">
									<div class="user-icon">
										<img alt="用户头像" src="${imgPath }/icons/default.png" class="img-circle" id="user-img"/>
									</div>
									<div class="upload-btn">
										<button class="btn btn-primary" id="uploadBt" type="button">上传头像</button>
										<input type="file" name="file" id="file" style="display: none;"/> 
									</div>
									<div class="upload-info">
										<label>仅支持JPG、	PNG格式，文件小于2M</label>
									</div>
								</div>
								<div class="alternative-img-content">
									<div class="alternative-img-wrap">
										<ul>
											<li><img alt="" src="${imgPath}/user/icon1.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon2.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon3.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon4.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon5.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon6.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon7.jpg"></li>
											<li><img alt="" src="${imgPath}/user/icon8.jpg"></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						
						<!-- 更换手机 -->
						<div class="phone-info-content information">
							<form class="form-horizontal" role="form" method="post" autocomplete="off" accept-charset="UTF-8" >
								<div class="form-group form-margin-5">
									<label class="col-sm-2 control-label label-height" >原手机号码</label>
									<div class="col-sm-5">
										<label id="concat_tele_old">${user.telephone }</label>
									</div>
								</div>
								<div class="phone-bind">
								</div>
							</form>
						</div>
						<div class="three-band information">
						<!-- 提示框 -->
						<div class="tooltip-showBand">
							<label class="tooltip-message">修改成功!</label>
						</div>
						  <div class="noBand" id="wechat">
						       <div class="inLine"><img src="${imgPaths}/icons/webcat.png"></div>
						       <div class="inLine vertical">
						            <ul>
						               <li>微信登录</li>
						               <li class="bandWord" id="wechatWord"></li>
						            </ul>
						       </div>
						       <div class="bandBtn" data-status="0" id="wechatBtn"></div>
						  </div>
								  
						 <div class="line"></div>
								  
					    <div class="noBand" id="qq">
						   <div class="inLine"><img src="${imgPaths}/icons/qq.png"></div>
						       <div class="inLine vertical">
						            <ul>
						               <li>QQ账号</li>
						               <li class="bandWord" id="qqWord"></li>
						            </ul>
						       </div>
						       <div class="bandBtn" data-status="0" id="qqBtn"></div>
						  </div>
						  
						  <div class="line"></div>
										  
					    <div class="noBand" id="wb">
						   <div class="inLine"><img src="${imgPaths}/icons/weibo.png"></div>
						       <div class="inLine vertical">
						            <ul>
						               <li>微博账号</li>
						               <li class="bandWord" id="wbWord"></li>
						            </ul>
						       </div>
						       <div class="bandBtn" data-status="0" id="wbBtn"></div>
						  </div>
						</div>
								
							
								
						
						<!-- 提示框 -->
						<div class="tooltip-show">
							<label class="tooltip-message">信息修改成功!</label>
						</div>
					</div>
				</section>
			</div>
	</div>
	
	
	<div class="footer">
	
		
		<!-- 底栏 start -->
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/manager/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:4006609728" class="qqClient"><label class="tel-icon"></label><h3>4006609728</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>客户客服发发</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>供应商客服美美</h3></a>
					<a href="mailto:bdmarket@paipianwang.cn" class="mailClient"><label class="mail-icon"></label><h3>bdmarket@paipianwang.cn</h3></a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >服务</a>
					<a href="<spring:url value='/order-flow.html' />">服务流程</a>
					
					<a href="javascript:void(0);" class="top-margin">工作时间</a>
					<a href="javascript:void(0);">工作日9:00 - 18:00</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >授权 / 条款</a>
					<a href="<spring:url value='/company-service.html' />">使用协议</a>
					<a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >了解拍片网</a>
					<a href="<spring:url value='/about-us.html' />">了解我们</a>
					<a href="<spring:url value='/member.html#join-us' />">加入我们</a>
					<a href="<spring:url value='/company-activity.html' />">公司活动</a>
					<a href="<spring:url value='/member.html#activityPart' />">团队简介</a>
				</div>

				<div class="footer-column">
					<div class="mark-icon"></div>
					<h4>关注官方微信</h4>
				</div>

				<div class="footer-notice">
					<h2>版权信息</h2>
					<p>本站视频作品采用知识共享署名-非商业性使用。本站不提供任何视听上传</p>
					<p>服务，所有内容均来自视频分享站点所提供的公开引用资源。</p>
				</div>
			</div>
			<div class="footer-box">
				&copy; 2014 攀峰文化 京ICP备 14036662号-1 | <a>百度统计</a>  <a href='<spring:url value="/sitemap.html" />' target="_blank" title="站长统计">站长统计</a>
			</div>
		</div>
		<!-- 底栏 end -->
	</div>
	
	<!-- photo Modal start -->
	<div class="modal" id="mymodal">
		<div class="modal-dialog">
			<div class="modal-content model-distance">
				<div class="modal-header model-no-border">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</div>
				<div class="modal-body">
					<div class="modal-left">
						<div class="modal-original">
							<img alt="" src="" id="modal-original-img">
						</div>
					</div>
					<div class="modal-right">
						<div class="modal-preview-container">
							<img alt="" src="" id="modal-preview">
						</div>
						<button class="btn btn-primary" type="button" id="uploadConfirmBt">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- photo Modal start -->
	
	<!-- photo Modal start -->
	<div class="modal" id="errorModal">
		<div class="modal-dialog">
			<div class="modal-content model-distance">
				<div class="modal-body">
					<label id="error-message"></label>
					<button type="button" class="btn btn-warning" id="iKnow">知道了</button>
				</div>
			</div>
		</div>
	</div>
	<!-- photo Modal start -->
</body>
</html>