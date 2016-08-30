<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/mMenu/jquery.mmenu.all.css" var="mmenuCss"/>
<spring:url value="/resources/css/phone/portal.css" var="portalCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJs"/>
<spring:url value="/resources/lib/mMenu/jquery.mmenu.min.js" var="mmenuJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/portal.js" var="portalJs"/>
<!-- imgPath -->
<spring:url value="/resources/img" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<!-- iphone 手机默认全屏 -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- 取消数字被识别为电话号码 -->
	<meta content="telephone=no" name="format-detection">
	<meta name="keywords" content="拍片网,视频制作,手机拍片,手机视频,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_首页</title>

	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${mmenuCss }">
	<link rel="stylesheet" href="${portalCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
</head>
<body>

				
						<div class="footerBar">
						 	      <div class="commonDiv">
						 	        <a href="<spring:url value="/phone/portal"/>" target="_self"> 
							 	        <ul>
							 	           <li><div class="portal"></div></li>
							 	           <li class="wordLeftRight">首页</li>
							 	        </ul>
						 	         </a> 
						 	      </div>
						 	       <div class="commonDiv">
						 	        <a href="<spring:url value="/phone/order"/>" target="_self"> 
							 	         <ul>
							 	           <li><div class="order"></div></li>
							 	           <li class="wordMid">我要拍片</li>
							 	         </ul>
							 	     </a>    
						 	      </div>
						 	       <div class="commonDiv">
						 	        	<r:noLogin>
								 	        <a href="<spring:url value="/phone/login/phoneLogin"/>" target="_self"> 
									 	        <ul>
									 	           <li>
									 	              <div class="mySelf"></div>
									 	           </li>
									 	           <li class="wordLeftRight">登入</li>
									 	        </ul>
								 	        </a> 
						 	        	</r:noLogin>
						 	        	<r:identity role="provider">
								 	        <a href="<spring:url value="/phone/login/phoneLogin"/>" target="_self"> 
									 	        <ul>
									 	           <li>
									 	              <div class="mySelf"></div>
									 	           </li>
									 	           <li class="wordLeftRight">我的</li>
									 	        </ul>
								 	        </a> 
						 	        	</r:identity>
						 	        	<r:identity role="customer">
								 	        <a href="<spring:url value="/phone/customer/customerProject"/>" target="_self"> 
									 	        <ul>
									 	           <li>
									 	              <div class="mySelf"></div>
									 	           </li>
									 	           <li class="wordLeftRight">我的</li>
									 	        </ul>
								 	        </a> 
						 	        	</r:identity>
						 	        	<r:identity role="employee">
								 	        <a href="<spring:url value="/phone/login/phoneLogin"/>" target="_self"> 
									 	        <ul>
									 	           <li>
									 	              <div class="mySelf"></div>
									 	           </li>
									 	           <li class="wordLeftRight">我的</li>
									 	        </ul>
								 	        </a> 
						 	        	</r:identity>
						 	      </div>
							</div>
			

	<div class="wrap">

		<div class="header">
			<!-- logo -->
			<dl class="header-ul">
				<dd>
					<a href="#menu">
						<div class="classify"></div>
					</a>
				</dd>
				<dd>
					<a href="<spring:url value="/phone/portal"/>" target="_self">
						<div class="logo"></div>
					</a>
				</dd>
				<dd>
					<a href="<spring:url value="/phone/searchview"/>" target="_self">
						<div class="search"></div>
					</a>
				</dd>
				<!-- <dd>
					<a href="javascript:void(0);">
						<div class="share -mob-share-ui-button -mob-share-open"></div>
						<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none">
							<ul class="-mob-share-list">
								<li class="-mob-share-weixin"><p>微信</p></li>
								<li class="-mob-share-qzone"><p>QQ空间</p></li>
								<li class="-mob-share-qq"><p>QQ好友</p></li>
								<li class="-mob-share-weibo"><p>新浪微博</p></li>
							</ul>
							<div class="-mob-share-close">取消</div>
						</div>
						<div class="-mob-share-ui-bg"></div>
					</a>
				</dd> -->
			</dl>
		</div>
		
		<nav id="menu">
			<ul id="menu-ul">
				<!-- <li><a href="javascript:void(0);">Home</a></li>
				<li><a href="#contact">Contact</a></li> -->
			</ul>
		</nav>
		
		<div class="flexslider-section">
			<div class="flexslider-wrap">
				<!-- 轮播图 -->
				<div class="flexslider">
					<a href='<spring:url value="/phone/redirect/order"/>' >
						<ul class="slides">
							<li ></li>
							<li ></li>
							<li ></li>
						</ul>
					</a>
				</div>
			</div>
		</div>
		
		<!-- 活动会场 -->
		<%-- <div class="activity-section">
			<div class="activity-guide">
				<h3>热门活动</h3>
				<div class="spilt-line"></div>
			</div>

			<div class="activity-content">
				<!-- 活动页面 -->
				<img src="${imgPath }/phone/portal/activity.png" alt="活动专场_拍片网">
				<a href='<spring:url value="/phone/active/12" />' target="_self">
					<img src="${imgPath }/active/d12/active-phone-12-entry.png" alt="双12专场_拍片网">
				</a>
			</div>
		</div> --%>
		
		<div class="video-section">
			<!-- 视频列表 -->
			<div class="recomment-line">
				<a href="javascript: void(0);">经济适用型</a>
			</div>
			
			<!-- 第一块视频区域 -->
			<div class="video-content" id="first-video-section">
				<%-- <div class="contain-row">
					<a href="<spring:url value='/phone/play/7'/>">
						<div class="video-col">
							<div class="video-post">
								<img src="http://www.apaipian.com/product/img/product7-201510281611495342.jpg" alt="智能硬件专场_拍片网">
							</div>
							
							<div class="video-desc">
								<dl>
									<dt><h2>精致的智能硬件宣传影片</h2></dt>
									<dd>逼真的工业级渲染，家庭的使用场景展示，通过高科技的视觉元素渲染产品特点，完美呈现产品精致的一面，国际市场取得了惊人的销量。</dd>
									<dt><label>￥</label>56,880元<label class="doraction">113,760</label></dt>
									<dd><a href="<spring:url value='/phone/play/7'/>"><div class="detail-btn">查看详情</div></a></dd>
								</dl>
							</div>
						</div>
					</a>
				</div> --%>
			</div>
			
			<div class="recomment-line">
				<a href="javascript: void(0);">性价比之王</a>
			</div>
			
			<!-- 第二块视频 -->
			<div class="video-content" id="second-video-section"></div>
			
			<div class="recomment-line">
				<a href="javascript: void(0);">高大上定制</a>
			</div>
			
			<!-- 第三块视频区域 -->
			<div class="video-content" id="third-video-section"></div>
			
		</div>
		
	
		
		<div class="footer ">
			<div class="footer-content">
				<div class="content-header">
					<ul>
						<li><a href="javascript:void(0);">关于我们</a></li>
						<li><a href="javascript:void(0);">合作联系</a></li>
						<li><a href="javascript:void(0);">服务协议</a></li>
					</ul>
				</div>
				<div class="content-footer">
					<label>&copy; 2014 攀峰文化 京ICP备 14036662号-1</label>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${flexsliderJs }"></script>
<script src="${commonJs }"></script>
<script src="${portalJs }"></script>
<script src="${mmenuJs }"></script>
<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
</html>