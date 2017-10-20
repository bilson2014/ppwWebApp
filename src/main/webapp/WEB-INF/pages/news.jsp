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
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >

<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" id="keywords" content="<c:if test="${not empty fn:trim(news.seoKeywords) }"><c:forEach items="${fn:split(fn:trim(news.seoKeywords),' ') }" var="tag" end="2" varStatus="stat">${tag} <c:if test="${!stat.last }"></c:if></c:forEach></c:if>">
    <meta name="description" content="${news.seoDescription}">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>${news.seoTitle}-拍片网</title>
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
    <jsp:include flush="true" page="header.jsp"></jsp:include> 
    <div class="page">
        <div class="bottomContent">
		         <div class="titleTag">
		            <div class="titleTagContent">
		                <a href="/"><div>首页</div></a>
		                <div>></div>
		                <a href="/news-list.html"><div>新闻资讯</div></a>
		                <div>></div>
		              
		            </div>
		        </div>
            <div class="contentWidth">
                <div class="leftContent">
                     <h1 class="title" id="newsTitle">${news.title}</h1>
                       <div class="tags">
                            <img class="tagImg" src="${imgPath}/provder/videoTag.png">
	                        <div class="tagsContent" id="tagsContent">	                               
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
