<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-alert.min.css" var="bootstrapAlertCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap-button.min.css" var="bootstrapButtonCss"/>
<spring:url value="/resources/css/phone/provider/providerInfoPhone.css" var="providerInfoPhoneCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/phone/provider/providerInfoPhone.js" var="providerInfoPhoneJs"/>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/js/phone/play.js" var="playJs"/>


<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<!-- iphone 手机默认全屏 -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="keywords" content="拍片网下单,视频交易,广告购买,导演制作费,拍片下单">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>拍片网－广告－宣传片－微电影－视频营销_移动端_订单页</title>

	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapAlertCss }">
	<link rel="stylesheet" href="${bootstrapButtonCss }">
	<link rel="stylesheet" href="${providerInfoPhoneCss}">

	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${providerInfoPhoneJs }"></script>
	
	<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${ykJs }"></script>
<script src="${playJs }"></script>
<!-- 加载Mob share 控件 -->
<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<script type="text/javascript" src="http://player.youku.com/jsapi"></script>


</head>
<body>
	<input type="hidden" id="action" value="${action}"/>
	<input type="hidden" id="thirdLoginType" value="${thirdLoginType}"/>
	<input type="hidden" id="uniqueId" value="${uniqueId}"/>
	
		<div class="headerNew">
		              <div class="leftHeader">
						 <div class="back"></div>
					  </div>	
					  <div class="rightHeader">
						 <a href="javascript:void(0);">
						<div class="share -mob-share-ui-button -mob-share-open"></div>
						<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none">
							<ul class="-mob-share-list">
						        <li class="-mob-share-weixin" id="weixin"><p>微信</p></li>
						        <li class="-mob-share-qzone"><p>QQ空间</p></li>
						        <li class="-mob-share-qq" id="qq"><p>QQ好友</p></li>
							    <li class="-mob-share-weibo"><p>新浪微博</p></li>
					       	</ul>
						    <div class="-mob-share-close">取消</div>
						</div>
						<div class="-mob-share-ui-bg"></div>
					</a>
					  </div>
			   	     <div class="midHeader">
						 <div class="logo"></div>
					  </div>
		</div>
		
	
		<!--banner 区  -->
		<input type="hidden" id="teamId" value="${product.teamId }">
		<input type="hidden" id="masterWorkProductId" value="${product.productId }">	
		<div class="topHeader">
		     <ul>
		           <li>
		                  <div class="infoHeadSide">
			                 <img class="infoHead" id="infoHead" src="${provider.teamPhotoUrl }">
			              </div>  
		           </li>
		           <li class="providerName">${provider.teamName }</li>
		           <li class="providerPlace"><img class="place" src="${imgPath}/provder/place.png"></li>
		           <li class="provinceCity"><div id="province">${provider.teamProvinceName }</div><div class="circle"></div><div id="city">${provider.teamCityName }</div></li>
		        </ul>
		 
		</div>
		
		<!--说明区  -->
		
		<div class="introduce">
		    <div class="introduceTitle">导演简介</div>
		    <div class="introduceLine"></div>
		</div>
		
		<!-- 介绍区 -->
		
		<div class="providerInfo">
		${provider.teamDescription }
		</div>
		
		
		<!--标签区  -->
		<div class="tagBody">
	 	    <div class="card">
                    <div class="controlCard"> 
                    		<div class="pencil"></div>
                    		<div class="cardWord">电影</div>
                    </div>
		    </div>
		     <div class="card">
                    <div class="controlCard"> 
                    		<div class="pencil"></div>
                    		<div class="cardWord">电影</div>
                    </div>
		    </div>
		     <div class="card">
                    <div class="controlCard"> 
                    		<div class="pencil"></div>
                    		<div class="cardWord">电影好看</div>
                    </div>
		    </div>
		</div>
		
		
			<!--代表说明  -->
		
		<div class="introduce">
		    <div class="introduceTitle">代表作</div>
		    <div class="introduceLine"></div>
		</div>
		
		
		
		
		<div class="specialVideo">
			<input type="hidden" id="teamId" value="${product.teamId }">
		     <div class="videoCrad">
					   <div class="videoContent">
							<a><img src="${imgPath}/phone/provider/videoImg.jpg"></a>
							<div class="title" title="${product.pDescription }">${product.pDescription }</div>
							<div class="videoContentInfo">了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情</div>
							<div class="videoTag">
								<div><img src="/resources/images/provder/videoTag.png"></div>
								     <div class="tagsZoom" >
								           <c:if test="${!empty tags}">
											<c:forEach items="${tags }" var="source" varStatus="status">
														<c:if test="${status.index >0 }">
														/
														</c:if>
														${source }
													</c:forEach>
												</c:if> 
								      </div>
							 </div>
							  <a href="/play/${product.teamId }_${product.productId }.html">
						          <div class="videoBtn btn-red-common">了解详情</div> 
						      </a>   
					   </div> 
			</div>
		</div>
		
		
				<!--代表说明  -->
		
		<div class="introduce">
		    <div class="introduceTitle">更多作品</div>
		    <div class="introduceLine"></div>
		</div>
		
		
		<div class="timeLine" id="timeLine">
		     
		       <div class="videoCardArea">
		            
		              <div class="year">
			               <div>
			                	 <div class="color1">2016</div>
			                </div> 
		              </div>  
	           
		        </div>
		
		     <div class="videoCardArea">
		      		<div class="timeTitle">2016-9-10</div>
		      		<div class="timeLineImg"><div class="dianImg"></div><div class="rightJiaoImg"></div></div>
		      		<div class="videoCrad">
					   <div class="videoContent">
							<a><img src="${imgPath}/phone/provider/videoImg.jpg"></a>
							<div class="title">asdasdasd</div>
							<div class="videoContentInfo">了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情了解详情</div>
							<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div><div>dsdsa/dasd/dasa</div></div>
						    <div class="videoBtn btn-red-common">了解详情</div> 
					   </div> 
					</div>
		     </div>
		     
		     <div class="videoCardArea">
		      		<div class="timeTitle">2016-9-10</div>
		      		<div class="timeLineImg"><div class="dianImg"></div><div class="rightJiaoImg"></div></div>
		      		<div class="videoCrad">
					   <div class="videoContent">
							<a><img src="${imgPath}/phone/provider/videoImg.jpg"></a>
							<div class="title">asdasdasd</div>
							<div class="videoContentInfo">1981年，执导首部电影《食人鱼2:繁殖》1984年， 因自编自导科幻电影《终结者》成名。1986年，自编 自导电影《异形2》。 1991年，凭借电影《终结者2》 获得第18届土星奖最佳导演奖以及最佳编剧奖。1994年， 指导电影《真实的谎言》</div>
							<div class="videoTag"><div><img src="/resources/images/provder/videoTag.png"></div><div>dsdsa/dasd/dasa</div></div>
						    <div class="videoBtn btn-red-common">了解详情</div> 
					   </div> 
					</div>
		     </div>
		     
		     
		          <div class="videoCardMore" id="redadMore">
		               <div class="readMore">Read More</div>
		        </div>

		</div>
		
		         
				
				
			
				
				
				
			
		
	
	
	
	
	
</body>
</html>