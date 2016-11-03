<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<spring:url value="<%=Constants.DFS_PATH %>" var="DFSurl" />
<%-- import CSS --%>
<spring:url value="/resources/css/list.css" var="listCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/list.js" var="listJs"/>
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
	<link rel="stylesheet" href="${listCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>
<body>
	<input id="Fastdfs_path" type="hidden" value="${DFSurl}"/>
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
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
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
		<!-- 搜索条件模块 start -->
		<div class="classify-section">
			<div class="classify-wrap ">
				<div class="classify-type ">
					<dt>行业：<a class="active itemAll" href="javascript:void(0);">全部</a></dt>
					<dd id="classify-item ">
						<ul class="list-inline" id="item-list">
							<!-- 行业分类 -->
						</ul>
					</dd>

					<div class="more-link" id="more-link">
						<span>更多</span>
					</div>
				</div>
				
				
				<div class="classify-price ">
					<dt>价格：<a class="active priceAll" href="javascript:void(0);" data-begin="0" data-end="1000000000">全部</a></dt>
					<dd id="price-item">
						<ul class="list-inline">
							<li><a href="javascript:void(0);" data-begin="0" data-end="30000" class="priceAll">0~3万</a></li>
							<li><a href="javascript:void(0);" data-begin="30000" data-end="100000" class="priceAll">3~10万</a></li>
							<li><a href="javascript:void(0);" data-begin="100000" data-end="600000" class="priceAll">10~60万</a></li>
							<li><a href="javascript:void(0);" data-begin="600000" data-end="1000000000" class="priceAll">60万以上</a></li>
							<li><div class="price-section"><input type="text" id="start-price" />万 ~ <input type="text" id="end-price" />万<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="priceBtn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
				
				<div class="classify-length">
					<dt>时长：<a class="active lengthAll" href="javascript:void(0);" data-begin="0" data-end="36000">全部</a></dt>
					<dd id="length-item">
						<ul class="list-inline">
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="0" data-end="60">0~60秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="60" data-end="90">60~90秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="90" data-end="180">90~180秒</a></li>
							<li><a href="javascript:void(0);" class="lengthAll" data-begin="180" data-end="36000">180秒以上</a></li>
							<li><div class="length-section"><input type="text" id="start-length" />秒 ~ <input type="text" id="end-length" />秒<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="lengthBtn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
			</div>
		</div>
		<!-- 搜索条件模块 end -->
		
		<!-- video list start -->
		<div class="video-section">
		<div>ooooooooo</div>
			<div class="video-content" id="video-content">
				<!--	视频内容 example 
				<div class="video-row">
					<div class="video-card video-col-4">
						<a href="javascript:void(0);">
							<img class="img-card-4" src="http://www.apaipian.com/product/img/product139-201510281719479522.jpg" />
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
		</div>
		<!-- video list end -->

		<!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
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
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${jqueryPageJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${listJs }"></script>
</body>
</html>