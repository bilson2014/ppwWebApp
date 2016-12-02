<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/play.css" var="playCss"/>

<%-- import JS --%>
<%-- <spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/> --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/play.js" var="playJs"/>

<!-- import img path -->
<spring:url value="/resources/images" var="imgPath" />

<!-- import resource path -->
<spring:url value="/resources" var="baseResource" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,团队制作,拍片团队,导演介绍,广告制作">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>${product.productName }_拍片网</title>
	<link rel="stylesheet" href="${playCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
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
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="company-unique" value="${teamId }"/>
	<input type="hidden" id="play-unique" value="${productId }"/>
	<input type="hidden" id="service-unique" value="${product.serviceId }"/>
	<input type="hidden" id="vPrice" value="${product.serviceRealPrice }"/>
	<%-- <input type="hidden" id="picPath" value="<spring:url value="${fn:replace(fn:substringAfter(product.picLDUrl,'/portal'),'image','img') }"/>" /> --%>
	<input type="hidden" id="picPath" value="<spring:url value="${product.picLDUrl }"/>" />
	<input type="hidden" id="yk-play" value="<spring:url value="${product.hret}"/>" />
	<div class="header">
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目</a>
					<a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">作品分类</a>
					<<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
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
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
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
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">登录</a>
					<a href="<spring:url value="/register" />" class="header-item login-item" target="_self">注册</a>
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

	<div class="page" >
		<!-- 标题区域 start -->
		<div class="title-section">
			<div class="title-wrap">
				<h1 id="pName">${product.productName }</h1>
				<p>${product.teamName }</p>
			</div>
		</div>
		<!-- 标题区域 end -->

		<!-- 视频播放区域 start -->
		<div class="video-play-section">
			<div class=" video-play-wrap">
				<!-- media player start -->
				<div class="player-wrap" id="player-wrap">
					<video controls src='<spring:url value="${file_locate_storage_path}${product.videoUrl }"/>' preload="auto" poster='<spring:url value="${file_locate_storage_path}${product.picLDUrl}"/>'></video>
					<%-- <video controls src='<spring:url value="${fn:substringAfter(product.videoUrl,'/portal') }"/>' preload="auto" poster='<spring:url value="${fn:replace(fn:substringAfter(product.picLDUrl,'/portal'),'image','img') }"/>'></video> --%>
				</div>
				<!-- media player end -->

				<!-- video info start -->
				<div class="info-wrap">
					<dl>
						<dt id="vLength">${product.videoLength } 秒</dt>
						<dd>影片时长</dd>
					</dl>
					<dl>
						<dt>￥<fmt:formatNumber value="${product.serviceRealPrice }" pattern="#,#00"/></dt>
						<dd>影片价格</dd>
					</dl>
					<a href="javascript:void(0);">
						<button class="btn btn-primary" id="order-btn">我要拍片</button>
					</a>
				</div>
				<!-- video info end -->
			</div>
		</div>
		<!-- 视频播放区域 end -->
		
		<!-- 视频信息区域 start -->
		<div class="video-info-section">
			<div class="video-info-wrap ">
				<div class="video-info ">
					
					<div class="video-tags-wrap">
						<img src="${imgPath }/icons/tag.png" alt="标签_拍片网">
						<ul>
							<c:if test="${! empty product.tags}">
								<c:forEach items="${fn:split(product.tags,' ') }" var="tag">
									<li>${tag }</li>
								</c:forEach>
							</c:if>
						</ul>
					</div>

					<div class="video-desc-wrap">
						${product.pDescription }
					</div>

					<div class="video-share-wrap">
						<dl>
							<dt>分享:</dt>
							<a href="javascript:void(0);"><dd class="-mob-share-weixin share">微信</dd></a>
							<a href="javascript:void(0);"><dd class="-mob-share-qq share">QQ</dd></a>
							<a href="javascript:void(0);"><dd class="-mob-share-weibo share">新浪微博</dd></a>
							<a href="javascript:void(0);"><dd class="-mob-share-qzone share">QQ空间</dd></a>
						</dl>
					</div>
				</div>
				
				<div class="team-info" id="toDirector">
					<a href="/provider/info_${teamId }.html">
					<dl>
						<dt>
							<c:if test="${empty product.teamPhotoUrl }">
								<img src='${imgPath }/play/default_team_photo.svg' alt="公司照片_拍片网" class="img-rounded" >
							</c:if>
							<c:if test="${!empty product.teamPhotoUrl }">
								<%-- <img src='<spring:url value="${fn:replace(fn:substringAfter(product.teamPhotoUrl,'/portal'),'image','img') }"/>' alt="${product.teamName }照片_拍片网" class="img-rounded"> --%>
								<img src='<spring:url value="${file_locate_storage_path}${product.teamPhotoUrl}"/>' alt="${product.teamName }照片_拍片网" class="img-rounded">
							</c:if>
						</dt>
						<dd  class="teamName"  title="${product.teamName }">${product.teamName }</dd>
						<dd  class="teamTitle" title="${product.teamDescription }">${product.teamDescription }</dd>
					</dl>
					</a>
				</div>
			</div>
		</div>
		<!-- 视频信息区域 end -->
		
		<c:if test="${product.showType == 1 }">
			<c:if test="${!empty product.videoDescription }">
				<!-- 视频介绍区域 start -->
				<div class="video-intro-section">
					<div class="text-desc-wrap">
						<p class="text-desc">作品简介</p>
					</div>
					<div class="video-intro-wrap" id="video-intro-wrap" style="position: relative;">
						<!-- 项目介绍 start -->
							${product.videoDescription}
						<!-- 项目介绍 end -->
					</div>
				</div>
			</c:if>
		
			<c:if test="${!empty product.picHDUrl }">
				<div class="video-pic-section">
					<div class="text-desc-wrap">
						<p class="text-desc">视频截图</p>
					</div>
					<div class="video-pic-wrap" id="video-pico-wrap">
						<!-- 项目介绍 start -->
							<%-- <img alt="${product.productName }_拍片网-官网" src='<spring:url value="${fn:replace(fn:substringAfter(product.picHDUrl,'/portal'),'image','img') }"/>' /> --%>
						<img alt="${product.productName }_拍片网-官网" src='<spring:url value="${file_locate_storage_path}${product.picHDUrl}"/>' />
						<!-- 项目介绍 end -->
					</div>
				</div>
			</c:if>
			<!-- 视频介绍区域 end -->
		</c:if>
		<div class="video-content-section">
			<div class="text-desc-wrap">
				<p class="text-desc">更多作品</p>
			</div>
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

			<div class="more-product" id="show-more-btn">
				<a href="javascript:void(0);" >更多视频</a>
			</div>
		</div>

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
	<script src="${jquerybase64Js }"></script>
	<script src="${jsonJs }"></script>
	<script src="${ykJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${playJs }"></script>
	
	<!-- 加载Mob share 控件 -->
	<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
	<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
</body>
</html>