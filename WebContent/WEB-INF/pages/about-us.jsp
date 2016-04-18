<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/about-us.css" var="aboutUsCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>

<!-- import img path -->
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
	<meta name="keywords" content="拍片网作品,私人定制服务,导演团队,创意拍片,视频展示">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_作品页面</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${aboutUsCss }">
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
		<div class="contain nav-title-wrap" >
			<ul class="ul-wrap" id="selects">
				<a href="<spring:url value='/about-us.html' />" class ="nav-title"><li id="first-title">了解我们</li></a>
				<a href="<spring:url value='/order-flow.html' />" class ="nav-title"><li >服务流程</li></a>
				<a href="<spring:url value='/member.html' />" class ="nav-title"><li>加入我们</li></a>
				<a href="<spring:url value='/company-activity.html' />" class ="nav-title"><li >公司活动</li></a>
				<a href="<spring:url value='/company-service.html' />" class ="nav-title"><li >服务协议</li></a>
			</ul>
		</div>

		<div class="nav-shadow"></div>
		
		<div class="model-first">
			<img class="image-1"/>
	
			<div class="info background-1">
				<p>拍片网汇聚了中国顶尖的影视创作者，无论是导演、制片、策划、<br>还是摄影师、编剧、演员，都能过在這里找到创作机会和合作伙伴，每天<br>都有崭新的创意在产生，每天都有不同的影片在拍摄，每天都有新鲜的作品在诞生。</p>
				<h1>——— 拍片网 ———</h1>
			</div>
		</div>
		
		<div class="info-bot">
          	<div class="fr"><h3 class="h3-word">愿景</h3></div>
            <div class="fb"><p>拍片网致力于汇聚影视行业的从业者，为他们提供有价值的服务，帮助他们互相链接建立合作，创作出的 优质  影视作品。</p></div>              
        </div>
        
        <div class="model">
			<img class="image-2"/>
			<div class="info background-2">
				<p>一句话来讲，我们拍片网就是“滴滴导演”，可以找到为您拍片的导<br>演，也可以理解为视频制作领域的京东或淘宝，是一个视频内<br>容制作平台。我们的优势是：选择多、价格低、速度快。</p>
				<h1>——— 拍片网 ———</h1>
			</div>
		</div>
		
		<div class="info-bot">
          	<div class="fr"><h2 class="h3-word">社区</h2></div>
            <div class="fb"><p>拍片网汇聚了中国顶尖的影视创作者，无论是导演、制片、策划、还是摄影师、编剧、演员都能过在這里找到创作机会和伙伴，每天都有影片在這里诞生。</p></div>              
         </div>
         
         <div class="model">
			<img class="image-3"/>
	
			<div class="info background-3">
				<p>低预算 拍大片／保证行业最低价 不满意随时退款<br>免费创意策划／资深视频营销专家 全程1对1服务到位<br> 100+导演／工作室／制作公司为您服务／5年以上行业经验</p>
				<h2>——— 拍片网 ———</h2>
			</div>
		</div>
		
		<div class="info-bot">
          	<div class="fr"><h3 class="h3-word">团队</h3></div>
            <div class="fb"><p>我们是一群来自影视和互联网行业的人，通过互联网的方式创建一个共享平台，使影视行业变得更开放、更高效。</p></div>              
        </div>
        
        <div class="model">
			<img class="image-4"/>
			<div class="info background-4">
				<p>拍片网的产品包括企业宣传片、融资路演影片、产品众筹影片、发布会影<br>片、病毒视频、动画影片、微电影、网络节目、网络剧等。影片适合在客户销<br>售、融资路演、产品发布、重大活动、产品众筹、自媒体传播、广告投放等场景使用。</p>
				<h2>——— 拍片网 ———</h2>
			</div>
		</div>
		
		<div class="info-bot-foot">

          	<div class="fr-foot"><h3 class="h3-word">历史</h3></div>
	            <div class="fb-foot">
		            <ul>
				    	<li >2014年10月成立获得PreAngel王利杰、顾浩天使轮投资</li>
				    	<li >2015年2月获得洪泰基金投资人俞敏洪、盛希泰天使轮追加投资</li>
				    	<li >2015年5月demo版上线测试</li>
				    	<li >2015年7月正式版上线，入驻导演团队三百多家</li>
				    	<li >2015年9月承接中国铁塔2015北展视频展示全案</li>
				    	<li >2015年11月拍片网微信客户端上线</li>
				    	<li >2015年12月获得老鹰基金preA轮投资，投资人刘小鹰</li>
				    </ul>
				</div>              
          </div>
	</div>
	
	<div class="footer">
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
					<h4>关注送好礼</h4>
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
	<div class="toolbar " id="toolbar-section" >
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
	
	<script type="text/javascript" src="${jqueryJs }"></script>
	<script type="text/javascript" src="${pluginJs }"></script>
	<script type="text/javascript" src="${modelJs }"></script>
	<script type="text/javascript" src="${commonJs }"></script>
</body>
</html>