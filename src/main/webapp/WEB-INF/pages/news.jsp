<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %> 

<spring:url value="/resources/css/news/news.css" var="newsCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="json" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/news.js" var="newsJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypoints" />

<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="宣传片，广告片，微电影，病毒视频，纪录片，动画片，MV，预告片，证言影片">
    <meta name="description" content="${news.discription}">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>${news.title}-拍片网</title>
    <link rel="stylesheet" href="${newsCss }">
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
	<input type="hidden" id="q" value="${q}" />
	<input type="hidden" id="tags" value="${news.tags}" />
	<input type="hidden" id="paths" value="${path}" />
	
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
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >项目<span></span></a>
					<a href="<spring:url value='/product/EnterprisePromotionalVideo/main'/>" class="header-item" >产品<span></span></a>
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
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/mgr/favourites" />"><li class="toCollect">收藏列表</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
            </div>
        </div>
    </div>
    <div class="page">
        <div class="bottomContent">
		         <div class="titleTag">
		            <div class="titleTagContent">
		                <a href="/"><div>首页</div></a>
		                <div>></div>
		                <a href="/news-list.html"><div>新闻资讯</div></a>
		                <div>></div>
		                <div class="newsTitle">${news.title}</div>
		            </div>
		        </div>
            <div class="contentWidth">
                <div class="leftContent">
                    <div class="title">${news.title}</div>
                       <div class="tags">
                            <img class="tagImg" src="${imgPath}/provder/videoTag.png">
	                        <div class="tagsContent">	                               
				                    <c:if test="${not empty fn:trim(news.tags) }">
										<c:forEach items="${fn:split(fn:trim(news.tags),' ') }" var="tag" end="2" varStatus="stat">
											${tag} <c:if test="${!stat.last }">/</c:if>
										</c:forEach>
									</c:if>
							</div>
		                    <div class="time" >发表于 
		                   					<fmt:parseDate value="${news.createTime}" var="yearMonth" pattern="yyyy-MM-dd"/>
		                   					<fmt:formatDate value="${yearMonth}" pattern="yyyy年MM月dd日" />
		                   	</div>
	                   </div> 
                    <div class="setPro" id="newsValue">
                        ${news.content}
                    </div>
                    <input type="hidden" id="newsId" value="${news.id}">
                     <div class="goToOther">
                       <c:if test="${not empty preNews and preNews.id != 0  }">
				            <a id="next" href="<spring:url value='/news/article-${preNews.id }.html?q=' />" ><div>上一篇</div></a>
			           </c:if>
                       <c:if test="${not empty nextNews and nextNews.id != 0  }">
			           		<a id="prev" href="<spring:url value='/news/article-${nextNews.id }.html?q=' />" ><div>下一篇</div></a>
			           </c:if>
			        </div>
                </div>
                <div class="rightContent" style="top:145px">
                    <div class="title">最热资讯<span>Hot~</span></div>
                    <a href="/news-list.html?q=最热资讯"><div class="moreNews">更多活动</div></a>
                    <div class="setVideo" id="moreNews">
                    </div>
                </div>
            </div>
        </div> 
        <div class="youLike">
             <div class="title">您可能感兴趣的文章  <span>Recommendation</span></div>
             <div class="atrContent"> 
             </div>
        </div>
       <!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include>
                            <!--新版底部-->
    </div>
    
     <script type="text/javascript" src="${clampJs }"></script>
     <script type="text/javascript" src="${jqueryJs }"></script>
     <script type="text/javascript" src="${jquerybase64Js }"></script>
     <script type="text/javascript" src="${json }"></script>
	 <script type="text/javascript" src="${bootstrapJs }"></script>
	 <script type="text/javascript" src="${flexsliderJS }"></script>
	 <script type="text/javascript" src="${newsJS }"></script>
	 <script type="text/javascript" src="${commonJs }"></script>
     <script type="text/javascript" src="${waypoints }"></script>
    
</body>

</html>
