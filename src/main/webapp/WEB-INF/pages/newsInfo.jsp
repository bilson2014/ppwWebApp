 <%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.NewsSolr"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/css/news/newsInfo.css" var="newsInfoCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="json" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/newsInfo.js" var="newsJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />

<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="新闻,拍片网">
    <meta name="description" content="新闻资讯频道将提供拍片网的案例分享、企业活动、人物专访以及影视行业资讯信息">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>新闻资讯_行业资讯_人物专访-拍片网</title>
    <link rel="stylesheet" href="${newsInfoCss }">
    <link rel="stylesheet" href="${bootstrapCss }">
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
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" value="${total }" id="total"/>
	<input type="hidden" id="q" value="${q}" />
    <div class="header headerMove" id="header">
 		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
                 <a href="/news-list.html" class="header-item" target="_parent">新闻资讯<span></span></a>
            </div>
            
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
                <a href="<spring:url value='/news-list.html' />" alt="全部">
                	<div class="category checkActive" data-value="">全部</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=最热资讯' />" alt="最热资讯">
                	<div class="category" data-value="最热资讯">最热资讯</div>
                </a>
<<<<<<< HEAD
                <a href="<spring:url value='/news-list.html?q=案例分享' />" alt="案例分享">
                	<div class="category" data-value="案例分享">案例分享</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=企业活动' />" alt="企业活动">
                	<div class="category" data-value="企业活动">企业活动</div>
=======
                <a href="<spring:url value='/news-list.html?q=案例花絮' />" alt="案例花絮">
                	<div class="category" data-value="案例花絮">案例花絮</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=企业动态' />" alt="企业动态">
                	<div class="category" data-value="企业动态">企业动态</div>
>>>>>>> web3.0
                </a>
                <a href="<spring:url value='/news-list.html?q=行业资讯' />" alt="行业资讯">
                	<div class="category" data-value="行业资讯">行业资讯</div>
                </a>
<<<<<<< HEAD
                <a href="<spring:url value='/news-list.html?q=人物专访' />" alt="人物专访">
                	<div class="category" data-value="人物专访">人物专访</div>
=======
                <a href="<spring:url value='/news-list.html?q=佳片赏析' />" alt="佳片赏析">
                	<div class="category" data-value="佳片赏析">佳片赏析</div>
>>>>>>> web3.0
                </a>
            </div>
        </div>
                 <c:if test="${empty list}">
						<div class="prompt-background">
							<img alt="未找到相关作品_拍片网" src="${imgPath}/search/airship.png">
						</div>
						<div class="prompt-word">您找的新闻遗落在外星球了！</div>
	</c:if>
          <div class="newsList">
                  <ul id="pageInfo">
                  	<c:if test="${!empty list}">
	                    <c:forEach items="${list }" var="newsSolr">
	                    	<li class="videoModel">
<<<<<<< HEAD
	                    		<a href="<spring:url value='/news/article-${newsSolr.id}.html' />" >
=======
	                    		<a class="toNewsUrl" href="<spring:url value='/news/article-${newsSolr.id}.html' />" >
>>>>>>> web3.0
	                    			<c:if test="${!empty  newsSolr.picLDUrl}">
		                    			<img src="${file_locate_storage_path}${newsSolr.picLDUrl}" alt="${newsSolr.title}_拍片网" />
	                    			</c:if>
	                    			<c:if test="${empty  newsSolr.picLDUrl}">
		                    			<img src="${imgPath}/index/noImg.jpg" alt="${newsSolr.title}_拍片网" />
	                    			</c:if>
<<<<<<< HEAD
	                    			<div class="tagDiv">
=======
	                    			
	                   				<div class="title" alt="${newsSolr.title }">${newsSolr.title }</div>
	                   				<div class="tagDiv">
	                   				    <img class="tagImg" src="${imgPath}/provder/videoTag.png">
>>>>>>> web3.0
	                    				<div class="tags" alt="${newsSolr.tags}">
	                    					<c:if test="${not empty fn:trim(newsSolr.tags) }">
												<c:forEach items="${fn:split(fn:trim(newsSolr.tags),' ') }" var="tag" end="2" varStatus="stat">
													${tag} <c:if test="${!stat.last }">/</c:if>
												</c:forEach>
											</c:if>
	                    				</div>
	                    			</div>
<<<<<<< HEAD
	                   				<div class="title" alt="${newsSolr.title }">${newsSolr.title }</div>
=======
>>>>>>> web3.0
	                   				<div class="content" alt="${newsSolr.discription }">${newsSolr.discription }</div>
	                   				<div class="time" >发表于 
	                   					<fmt:parseDate value="${newsSolr.creationTime}" var="yearMonth" pattern="yyyy-MM-dd"/>
	                   					<fmt:formatDate value="${yearMonth}" pattern="yyyy年MM月dd日" />
	                   				</div>
	                    		</a>
	                    	</li>
	                    </c:forEach>
                    </c:if>
                    
                   
                  </ul>
                  
                  <div class="page-section" id="pagination">
					<div class="page-wrap">
						<div class="pagination">
							
						</div>
					</div>
		          </div>
          </div>
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
<<<<<<< HEAD
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no">客户客服</a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">导演客服</a></div>
=======
                                            <div class="cusSer iconItem"><a href="">客户客服</a>
                                                  <div class="showCodeToPro">
	                                               <img src="/resources/images/cusCode.jpg">
	                                               <span>客户客服</span>
	                                            </div>
                                            </div>
                                            <div class="proSer iconItem"><a href="">导演客服</a>    
	                                            <div class="showCodeToPro">
	                                               <img src="/resources/images/indexCode.jpg">
	                                               <span>导演客服</span>
	                                            </div>
	                                        </div>
>>>>>>> web3.0
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
                                        <div>© 2016 北京拍片乐科技有限公司 京ICP备16066831号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div>
                            <!--新版底部-->
	
    <script type="text/javascript" src="${clampJs }"></script>
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${jquerybase64Js }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${flexsliderJS }"></script>
    <script type="text/javascript" src="${json }" ></script>
	<script type="text/javascript" src="${jqueryPageJs }"></script>	
    <script type="text/javascript" src="${newsJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>

</body>

</html>
