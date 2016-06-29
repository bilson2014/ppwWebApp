<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/member.css" var="memberCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/member.js" var="memberJs"/>

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
	<link rel="stylesheet" href="${memberCss }">
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

		<div class="contain nav-title-wrap" >
			<ul class="ul-wrap" id="selects">
				<a href="<spring:url value='/about-us.html' />" class ="nav-title"><li >了解我们</li></a>
				<a href="<spring:url value='/order-flow.html' />" class ="nav-title"><li >服务流程</li></a>
				<a href="<spring:url value='/member.html' />" class ="nav-title"><li id="first-title">加入我们</li></a>
				<a href="<spring:url value='/company-activity.html' />" class ="nav-title"><li >公司活动</li></a>
				<a href="<spring:url value='/company-service.html' />" class ="nav-title"><li >服务协议</li></a>
			</ul>
		</div>
	
		<div class="nav-shadow"></div>
	
		<div class="video-div" id="activityPart">
			<video src="http://www.apaipian.com/product/video/movie.mp4" preload="auto" controls="controls" poster="${imgPath }/introduce/member/video-poster.jpg" ></video>
	    </div>
	        
	    <div class="introduce" >
			<h2 >团队简介</h2>
			<p>我们拍片网是一个年轻的团队。年轻的人，年轻的事，也成长在一个年轻而富有热情的领域。我们期待简单、高效的沟通方式，喜欢平等、愉快的工
		             	作环境，为了这些我们可以「不择手段」。这里是个不错的地方，我们都这样认为！</p>
		</div>
		
		<div class="contain member">
			<h2>团队介绍</h2>
			
			<c:if test="${!empty list}">
				<c:forEach items="${list }" var="staff" varStatus="status">
					<c:if test="${status.count % 5 == 1 }">
						<ul class="ul-member">
					</c:if>
					<li class="nav-member">
						<div>
							<img class="member-img" alt="${staff.staffName}_拍片网" src="<spring:url value="/staff/img${staff.staffImageUrl }"/>">
							<p title="${staff.staffName }">${staff.staffName }</p>
							<p class="small-p">${staff.staffPosition}</p>
						</div>
					</li>
					<c:if test="${status.count % 5 == 0 }">
						</ul>
					</c:if>
				</c:forEach>
			</c:if>
		</div>

		<div class="join-us" id="join-us">
	     	<h2>加入我们</h2>
	     	<h3>我们是一个年轻的团队。年轻的人，年轻的事，也成长在一个年轻而富有热情的领域。我们期待简单、高效的沟通方式，喜欢平
	           	等、愉快的工作环境，为了这些我们可以「不择手段」。这里是个不错的地方，我们都这样认为：</h3>
	           
	        <p><strong>请将简历投递至</strong><a href="mailto:hr@paipianwang.cn">hr@paipianwang.cn</a></p>
	    </div>

	     <c:if test="${!empty jobList}">
	     	<div class="hold-work">
	     		<h2>职位列表</h2>
	     		<div class="work-list">
					<ul id="job-list">
					  <c:forEach items="${jobList }" var="job" varStatus="status">
					  		<c:if test="${status.count == 1 }">
						  		<li class="work active" data-id="${job.jobId }" title="${job.jobName }">${job.jobName }</li>
							</c:if>
							<c:if test="${status.count != 1 }">
						  		<li class="work" data-id="${job.jobId }" title="${job.jobName }">${job.jobName }</li>
							</c:if>
					  </c:forEach>
					</ul>
				</div>
				
				<div class="work-message">
	              <h3 id="title">工作职责：</h3>
	              <p  id="job-demand" class="job-demand">
	              	1、负责拍片网平台影视及广告类项目的执行管理；<br> 2、时时管理把控项目制作进展，保证项目顺利交付。<br> 3、负责网站平台客服在线解答等工作。<br> 4、有关网站发展的相关其他工作。 
	              <br></p>
	              
	              <h3 id="title">工作描述：</h3>
	              <p  id="job-desc">
	              	1、负责拍片网平台影视及广告类项目的执行管理； <br>2、时时管理把控项目制作进展，保证项目顺利交付。 <br>3、负责网站平台客服在线解答等工作。 <br>4、有关网站发展的相关其他工作。 
	              <br></p>	
	             </div>
	     	</div>
	     </c:if> 
	     
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
					<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>拍片网客服发发</h3></a>
					<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no" class="qqClient"><label class="qq-icon"></label><h3>拍片网客服美美</h3></a>
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
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${memberJs }"></script>
</body>
</html>