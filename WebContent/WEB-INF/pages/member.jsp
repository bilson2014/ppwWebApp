<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
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
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="宣传片，广告片，微电影，病毒视频，纪录片，动画片，MV，预告片，证言影片">
	<meta name="description" content="拍片网团队简介以及团队建设">
	<title>加入我们-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${memberCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
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
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
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

		       <div class="titleTag">
            <div class="titleWord">
                <a href="/about-us.html">
                    <div>了解我们</div>
                </a>
                <a href="/order-flow.html">
                    <div>服务流程</div>
                </a>
                <a href="/company-service.html">
                    <div>服务协议</div>
                </a>
                <a href="/company-activity.html">
                    <div>公司活动</div>
                </a>
                <a >
                    <div class="checkActive">加入我们</div>
                </a>
            </div>
        </div>
	
		<div class="nav-shadow"></div>
	
		<div class="video-div" id="activityPart">
			<video src="${file_locate_storage_path }group1/M00/00/27/Cgpw7FgiySOACsjIARHf7MfQdak085.mp4" preload="auto" controls="controls" poster="${imgPath }/introduce/about-us/about-us-3.jpg" ></video>
	    </div>
	        
	    <div class="introduce" >
			<h2 >团队简介</h2>
			<p>北京攀峰文化传播有限公司成立了拍片网。我们拍片网是一个年轻的团队。年轻的人，年轻的事，也成长在一个年轻而富有热情的领域。我们期待简单、高效的沟通方式，喜欢平等、愉快的工
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
							<img class="member-img" alt="${staff.staffName}_拍片网" src="<spring:url value="${file_locate_storage_path }${staff.staffImageUrl }"/>">
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
	        <p style="color: #000;">公司地址：北京朝阳区建外SOHO东区6号楼2505</p>
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