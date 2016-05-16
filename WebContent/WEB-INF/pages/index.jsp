<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/index.css" var="indexCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>

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
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<meta name="baidu-site-verification" content="dMz6jZpIwd" />
	<title>拍片网－广告－宣传片－微电影－视频营销</title>
	<link rel="stylesheet" href="${indexCss }">
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
				<r:identity role="manager">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
				</r:identity>
				
				<r:noLogin>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">我要拍片</a>
				</r:noLogin>
			</div>
			
			<div class="middle-part">
				<div class="search-box" style="display:none;" id="header-search">
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
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="manager">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
			</div>
		</div>
	</div>
	
	<div class="page">
		<!-- 轮播 start -->
		<div class="flex-wrap">
				<div class="flexslider">
					<ul class="slides">
						<li style="background:url(${imgPath}/banner/flex1.jpg) no-repeat; background-size: cover;background-position: center 0;"></li>
						<li style="background:url(${imgPath }/banner/flex2.jpg) no-repeat; background-size: cover;background-position: center 0;"></li>
						<li style="background:url(${imgPath }/banner/flex3.jpg) no-repeat; background-size: cover;background-position: center 0;"></li>
					</ul>
				</div>
				
				<div class="new-banner" >
					<div class="title">低预算拍大片 不满意全额退款</div>
					<div class="search-box" id="banner-search">
						<form method="get" action="/search" id="s-form">
							<input type="text" size="16" autocomplete="off" id="search-q" name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" />
							<a href="javascript:void(0);" class="go bk_white" onclick="return false;" id="s-btn"></a>
							<ul id="shelper" class="shelper-lucency"></ul>
						</form>
					</div>
					<div class="desc">35800+ 导演 / 编剧 / 摄影师 / 影视专家为您服务</div>
					<a href="<spring:url value="/about-us.html"/>"><div class="btn btn-primary known-btn" id="know-bg-btn">了解拍片网</div></a>
				</div>
			</div>
		<!-- 轮播 end -->
		
		<!-- 服务热线 start -->
		<div class="tele-wrap">
			<div class="tele-section">
				<div class="tele-svg"></div>
			</div>
		</div>
		<!-- 服务热线 end -->
		
		<!-- 首推区域 start -->
		<div class="info-wrap">
			<div class="info-section">
				<dl>
					<dt class="first-desc"></dt>
					<dd>免费创意策划</dd>
					<dd>专属视频管家-站式服务</dd>
				</dl>
				
				<dl>
					<dt class="second-desc"></dt>
					<dd>低预算拍大片</dd>
					<dd>低于行业价30%</dd>
				</dl>
				
				<dl>
					<dt class="third-desc"></dt>
					<dd>72小时极速出片</dd>
					<dd>不满意全额退款</dd>
				</dl>
				<!-- <dl>
					<dt class="first-desc"></dt>
					<dd>价格低选择更多</dd>
					<dd>供应商选择多多</dd>
					<dd>透明报价一价全包</dd>
				</dl>
				
				<dl>
					<dt class="second-desc"></dt>
					<dd>创意策划全免费</dd>
					<dd>专属视频管家</dd>
					<dd>一对一全程服务</dd>
				</dl>
				
				<dl>
					<dt class="third-desc"></dt>
					<dd>效果满意再付款</dd>
					<dd>制作费托管</dd>
					<dd>不满意可退款或重拍</dd>
				</dl> -->
			</div>
		</div>
		<!-- 首推区域 end -->

		<!-- 视频案例区域 start -->
		<div class="video-wrap">
			<div class="text-desc-wrap">
				<h2 class="text-desc">视频案例</h2>
				<div class="more-video">
					<a href="<spring:url value='/list.html'/>" target="_blank">更多视频</a>
				</div>
			</div>

			<!-- video content start -->
			<div class="video-content" id="video-content">
				<!-- example 
					<div class="video-row">
					<div class="video-card video-col-3">
						<a href="javascript:void(0);">
							<img class="img-card-3" src="http://www.apaipian.com/product/img/product139-201510281719479522.jpg" style="width: 100%;"/>
						</a>
						<div class="video-desc-section">
							<h3>凌宇智控证言与特效结合的宣传片</h3>
							<h4>北京攀峰友文科技有限公司</h4>
							<div class="video-desc">
								精美、酷炫的短片，为我们呈现了一部高端产品，实拍三维后期包装的结合，简洁精致的画面语言，仿佛让整个短片都充满了生命力。
							</div>
						</div>
						<div class="video-price-section">
							<div class="video-price">
								<h2>￥103,734</h2>&nbsp;&nbsp;
								<h3>201,112</h3>
							</div>
							<a href="javascript:void(0);">了解详情</a>
						</div>
					</div>
				</div> -->

			</div>
			<!-- video content end -->
		</div>
		<!-- 视频案例区域 end -->
		
		<!-- 合作伙伴区域 start -->
		<div class="partner-wrap">
			<div class="text-desc-wrap">
				<h2 class="text-desc">合作客户</h2>
				<div class="more-video">
					<a href="javascript:void(0);">更多客户</a>
				</div>
			</div>
			<div class="partent-list">
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
		<!-- 合作伙伴区域 end -->
	</div>
	<div class="footer">
		<!-- 拍片网介绍区域 start -->
		<div class="footer-desc-wrap">
			<div class="footer-desc">
				<h2>中国领先的视频内容制作平台</h2>
				<!-- <p>平台汇聚导演、工作室、创作机构100余家，影视行业人才20000余名</p>
				<p>为客户提供创意、制作、传播一站式服务</p> -->
				<p>汇聚30000+编剧、摄影师、演员等行业人才</p>
				<p>覆盖北京、上海、广州</p>
				<a href="<spring:url value="/about-us.html"/>"><div class="btn btn-primary known-btn">了解拍片网</div></a>
			</div>
		</div>
		<!-- 拍片网介绍区域 end -->
		
		<!-- 底栏 start -->
		<div class="footer-wrap">
			<div class="footer-content">
			
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >登录</a>
					<a href="<spring:url value="/mgr/login" />" target="_self">视频管家登录</a>
					<a href="<spring:url value="/provider/login" />" target="_self">供应商登录</a>
				</div>
				
				<div class="footer-column">
					<a href="javascript:void(0);" class="title" >联系我们</a>
					<a href="tel:4006609728" class="qqClient"><label class="tel-icon"></label><h3>4006609728</h3></a>
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>2640178216</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>3299894058</h3></a>
					<a href="mailto:bd@paipianwang.cn" class="mailClient"><label class="mail-icon"></label><h3>bd@paipianwang.cn</h3></a>
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
	
	<!-- 代码部分begin -->
	<div class="toolbar " id="toolbar-section" style="visibility: hidden;">
		<a href="javascript:void(0);" class="toolbar-item toolbar-item-weixin common-icons-tele-client" id="toolbar-item-weixin"></a>
		<a href="tencent://message/?uin=2640178216&Site=qq&Menu=yes" class="toolbar-item toolbar-item-qq common-icons-qq-client"></a>
		<a href="javascript:scroll(0,0)" id="top" class="toolbar-item toolbar-item-top common-icons-top-client"></a>
	</div>
	<!-- 代码部分end -->
	
	<!-- toolbar modal begin -->
	<div class="modal fade" id="toolbar-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="common-icons-know-us-close-icon modal-icon" data-dismiss="modal" aria-label="Close"></div>
					<dl>
						<dt>
							<h3 id="modal-h3-first">马上接通视频营销管家</h3>
						</dt>
						
						<dd id="modal-dd-second">
							<input placeholder="输入电话，我们即刻回电!" type="text" id="phoneCall"/>
							<a href="javascript:void(0);" id="modal-call">
								<div class="call-btn">
									<label class="call-icon common-icons-telephone"></label> 闪电接通
								</div>
							</a>
							<label class="modal-message" style="display: none;"></label>
						</dd>
						
						<dt >
							<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"><div class="model-qq-icon common-icons-qq-icon"></div></a>
						</dt>
						
						<dd>
							<h4>和QQ客服聊会</h4>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->
	<script type="text/javascript" defer async="true" src="${requireJs }" data-main="resources/js/index"></script>
</body>
</html>