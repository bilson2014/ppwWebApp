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
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="json" />
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/newsInfo.js" var="newsJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypoints" />
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />

<!DOCTYPE html>
<html class="no-js">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="宣传片制作报价,宣传片制作成本,宣传片脚本,宣传片策划,宣传片创意">
    <meta name="description" content="宣传片创意策划免费分享平台，正在找企业宣传片制作公司？想了解产品宣传片制作成本及报价？上拍片网，彻底解决您的烦恼！品牌商业宣传片等更多有价值的信息等你来发现。">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>宣传片制作报价_宣传片制作成本_宣传片脚本_宣传片创意策划-拍片网</title>
    <link rel="stylesheet" href="${newsInfoCss}">
    <link rel="stylesheet" href="${bootstrapCss}">
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
	<jsp:include flush="true" page="header.jsp"></jsp:include> 
    <div class="page">
    	 <div class="titleTag">
            <div class="titleWord">
                <a href="<spring:url value='/news-list.html' />" alt="全部">
                	<div class="category checkActive" data-value="">全部</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=最热资讯' />" alt="最热资讯">
                	<div class="category" data-value="最热资讯">最热资讯</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=案例花絮' />" alt="案例花絮">
                	<div class="category" data-value="案例花絮">案例花絮</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=企业动态' />" alt="企业动态">
                	<div class="category" data-value="企业动态">企业动态</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=行业资讯' />" alt="行业资讯">
                	<div class="category" data-value="行业资讯">行业资讯</div>
                </a>
                <a href="<spring:url value='/news-list.html?q=佳片赏析' />" alt="佳片赏析">
                	<div class="category" data-value="佳片赏析">佳片赏析</div>
                </a>
            </div>
        </div>
                 <c:if test="${empty list}">
						<div class="prompt-background">
							<img alt="未找到相关作品_拍片网" style="margin-top:200px" src="${imgPath}/search/airship.png">
						</div>
						<div class="prompt-word">您找的新闻遗落在外星球了！</div>
	             </c:if>
	             
          <div class="newsList">
                  <ul id="pageInfo">
                  	<c:if test="${!empty list}">
	                    <c:forEach items="${list }" var="newsSolr">
	                    	<li class="videoModel">
	                    		<a class="toNewsUrl" href="<spring:url value='/news/article-${newsSolr.id}.html?q=${q }' />" >
	                    			<c:if test="${!empty  newsSolr.picLDUrl}">
		                    			<img src="${file_locate_storage_path}${newsSolr.picLDUrl}" alt="${newsSolr.title}_拍片网" />
	                    			</c:if>
	                    			<c:if test="${empty  newsSolr.picLDUrl}">
		                    			<img src="${imgPath}/index/noImg.jpg" alt="${newsSolr.title}_拍片网" />
	                    			</c:if>
	                   				<div class="title" alt="${newsSolr.title }">${newsSolr.title }</div>
	                   				<div class="tagDiv">
	                    				<div class="tags" alt="${newsSolr.tags}">
	                    					<c:if test="${not empty fn:trim(newsSolr.tags) }">
												<c:forEach items="${fn:split(fn:trim(newsSolr.tags),' ') }" var="tag" end="2" varStatus="stat">
													${tag} <c:if test="${!stat.last }">/</c:if>
												</c:forEach>
											</c:if>
	                    				</div>
	                    			</div>
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
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
    <script type="text/javascript" src="${clampJs }"></script>
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${jquerybase64Js }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${flexsliderJS }"></script>
    <script type="text/javascript" src="${json }" ></script>
	<script type="text/javascript" src="${jqueryPageJs }"></script>
	<script type="text/javascript" src="${waypoints }"></script>	
    <script type="text/javascript" src="${newsJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
</body>

</html>
