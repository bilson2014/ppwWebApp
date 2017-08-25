<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/manager/collect.css" var="collectCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/manager/collect.js" var="collectJs"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="内部员工登录页面">
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>作品收藏夹-拍片网</title>
	<link rel="stylesheet" href="${collectCss}">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />

		
		 <div class="page">
		         <div class="managerPgae">
		           <div class="lineHead"></div>
		              <div class="managerCard">
		                   <div class="title">收藏列表</div>
		                   <div class="setCard">
		                      <c:if test="${!empty productList}">
		                         <c:forEach items="${productList }" var="solr" varStatus="status">
					                      <div class="cardItem cardBig">
							                         <div class="modCheck">
						                                  <div class="delItem" id="${solr.productId}"></div>
						                                  <div class="cancle"></div>
					                                 </div>
								<c:if test="${solr.teamFlag == 1 && solr.indentProjectId != 0 }">
									<img class="roleImg" src="/resources/images/play/roleOur.png">
								</c:if>
								<c:if test="${solr.teamFlag == 4 }">
									<img class="roleImg" src="/resources/images/play/rolePlay.png">
								</c:if>
								<c:if test="${solr.teamFlag == 1 && solr.indentProjectId == 0 }">
									<img class="roleImg" src="/resources/images/play/rolePro.png">
								</c:if>
								<a href="<spring:url value='/play/${solr.teamId }_${solr.productId }.html'/>" target="_blank">		 
						                         <img class="cardImg" src="${file_locate_storage_path }${solr.picLDUrl }" />
						                         <div class="cardContent">
						                              <div class="title">${solr.productName }</div>
						                              <div class="tags">
												             <c:if test="${not empty fn:trim(solr.tags) }">
																<c:forEach items="${fn:split(fn:trim(solr.tags),' ') }" var="tag" end="2" varStatus="stat">
																	${tag} <c:if test="${!stat.last }">/</c:if>
																</c:forEach>
															</c:if>
													 </div>
						                              <div class="price">
									                       <div>
									                             <c:choose>
																	<c:when test="${solr.servicePrice > 0}">
																		￥&nbsp;<fmt:formatNumber value="${solr.servicePrice }" pattern="#,#00"/>
																	</c:when>
																	<c:when test="${solr.servicePrice == 0}">
																		欢迎询价
																	</c:when>
																</c:choose>
						                                  </div>
						                                  <div>
												            <c:if test="${solr.servicePrice < solr.serviceRealPrice }">
																<h3>原价&nbsp;￥&nbsp;<fmt:formatNumber value="${solr.serviceRealPrice }" pattern="#,#00"/></h3>
															</c:if>
						                                  </div>
						                              </div>
						                         </a>     
						                              <div class="line"><div></div></div>
									                       <div class="videoProvider">
									                        <c:if test="${solr.teamFlag != 4 }"> 
										                         <a href="<spring:url value='/provider/info_${solr.teamId }.html'/>">
														              <img src="${file_locate_storage_path }${solr.teamPhotoUrl }">
														              <div>${solr.teamName}</div>
													             </a> 
												            </c:if> 
												              <div class="delBtn"></div>
												           </div>
						                         </div>
					                      </div>
				                    </c:forEach>  
				               </c:if>       
		                   </div>
		              </div>
		         </div>
	
		 </div>
		   
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${collectJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${loginJs }"></script>
</body>
</html>