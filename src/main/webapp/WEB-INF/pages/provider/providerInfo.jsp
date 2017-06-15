<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css" var="normalizeCss"/>
<spring:url value="/resources/css/commons.css" var="commonCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/provider/providerInfo.css" var="providerInfoCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/js/provider/providerInfo.js" var="providerInfo" />
<spring:url value="/resources/images" var="imgPath"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="宣传片制作公司,tvc广告拍摄公司,企业微电影制作公司,mg动画制作公司">
	<meta name="description" content="拍片网平台直签行业内宣传片制作，tvc广告拍摄，企业微电影制作，mg动画制作等资深团队。${provider.teamDescription }">
	<title>${provider.teamName }-拍片网</title>
	<link rel="stylesheet" href="${normalizeCss }">
	<link rel="stylesheet" href="${commonCss }">
	<link rel="stylesheet" href="${bootstrapCss }">
	<link rel="stylesheet" href="${providerInfoCss }">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
	<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${ykJs }"></script>
	<script src="${providerInfo }"></script>
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
	<input type="hidden" id="action" value="${action }"/>
	<input type="hidden" id="thirdLoginType" value="${thirdLoginType }"/>
	<input type="hidden" id="uniqueId" value="${uniqueId }"/>
	<jsp:include flush="true" page="../header.jsp"></jsp:include> 

		<div class="page">
			<input type="hidden" id="teamId" value="${product.teamId }">
			<input type="hidden" id="teamName" value="${provider.teamName }">
			<input type="hidden" id="masterWorkProductId" value="${product.productId }">	
		     <div class="infoTop">
		        <div  class="image-video"></div>
		        <ul>
		           <li>
		                  <div class="infoHeadSide">
			                 <img class="infoHead" id="infoHead" src="${provider.teamPhotoUrl }">
			                 <div class="isPass">
			                     <c:if test="${provider.flag == 2}">
										<img src="/resources/images/provder/noPass.png"><div class="noPass">未审核</div>
								 </c:if> 
								 <c:if test="${provider.flag == 0}">
										<img src="/resources/images/provder/wPass.png"><div class="wPass">审核中</div>
								 </c:if> 
								 <c:if test="${provider.flag == 1}">
										<img src="/resources/images/provder/pass.png"><div class="pass">已认证</div>
								 </c:if>
			                 </div>
			              </div>  
		           </li>
		           <li class="providerName">${provider.teamName }</li>
		           <li class="providerPlace"><img class="place" src="${imgPath}/provder/place.png"></li>
		           <li class="provinceCity"><div id="province">${provider.teamProvinceName }</div><div class="circle"></div><div id="city">${provider.teamCityName }</div></li>
		           <li><div class="withIt btn-c-r" id="withIt">与TA沟通</div></li>
		        </ul>
		     </div>
		     
		     <div class="providerIntroduction">
		         <div class="content">
		             <div class="name">
		                <div><img src="${imgPath}/provder/providerIcon.png" ></div><div class="cn">导演简介</div><div class="en">Director profile</div>
		             </div>
		             <div class="textTxt">
		             	${provider.teamDescription }
		             </div>
		         </div>
		        <c:if test="${!empty providerTags}">
			         <div class="tag" id="tagId">
			          <div class="name">
			                <div><img src="${imgPath}/provder/gWork.png" ></div><div class="cn">擅长类型</div><div class="en">Capabilities</div>
			             </div>
			           <div class="midLine" id="provderTagId">
			           		<div class="hide" id="provderTags" >${providerTags}</div>
			           </div>
			         </div>
		         </c:if>
		     </div>
		     
		     <div class="videoContent">
		     	<input type="hidden" id="teamId" value="${product.teamId }">
		        <div class="contentWidth">
			         <div style="display:inline-block" >
			         	<input type="hidden" id="ykVideoUrl" value="${product.hret }">
			         	<input type="hidden" id="localVideoUrl" value="${file_locate_storage_path}${product.videoUrl}">
			         	<input type="hidden" id="localVideoImgUrl" value="${file_locate_storage_path}${product.picLDUrl}">
			         	<div class="showVideo" id="showVideos" >
						<!-- <video class="showVideo" controls src='' preload="auto" poster=''></video> -->
						</div>
			         </div>
			         <div class="videoInfo">
			             <div class="NameInfo">${product.productName }</div>
			             <div class="InfoLine"></div>
			             <div class="title">影片简介<span> Porject summary</span></div>
			             <div class="NameContent" title="${product.pDescription }">
			             	${product.pDescription }
			             </div>
			             
			             <div class="bottom">
				              <div class="videoTag"><div><img src='${imgPath}/provder/videoTag.png'>
				              </div>
				              	<c:if test="${!empty tags}">
									<c:forEach items="${tags }" var="source" varStatus="status">
									<div>
										<c:if test="${status.index >0 }">
										 &nbsp&nbsp
										</c:if>
										${source }
									</div>
									</c:forEach>
								</c:if>
				              </div>
				             <a href="/play/${product.teamId }_${product.productId }.html">
				             	<div class="specialVideoInfo btn-red-common btn-c-r">了解更多</div>
				             </a>
			             </div>
			         </div>
			    </div>     
		     </div>
		     
	  <div class="videoSpace">
	          <div class="productOutSide">
	                                     更多作品
	               <span>Other works</span>
	          </div>
	          <div class="prodectLine"></div>
	          <div class="timeLine" id ="timeLine">
	     		<!-- 时间树  -->
	   		  </div>
	   		  <div id="end" class="end hide">
	   		      <ul>
	   		           <li></li>
	   		           <li></li>
	   		           <li></li>
	   		      </ul>
	   		  </div>
		</div>
		
		<div class="noWorkDemo">
		   <img src="/resources/images/provder/noWorkDemo.png"/>
		   <div>很抱歉!导演还未上传更多作品</div>
		</div>
		
		<div class="infoBottom ">
		  <div class="buChong"></div>
		   <div class="bottomWord ">	   
                                             35800+导演/编剧/摄影师/影视服务专家为您服务,
                 <br/>专业一站式视频服务/全流程质量监管
		   </div>
		   <a href="<spring:url value="/login?role=director" />"><div class="bottomBtn btn-red-common btn-c-r">立即加入</div></a>
		</div>
		
		</div>
		
			<div class="footer">
		<!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	</div>
</body>
</html>