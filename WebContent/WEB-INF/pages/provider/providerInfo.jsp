<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
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
	<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>${provider.teamName }_拍片网</title>
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
	
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="action" value="${action }"/>
	<input type="hidden" id="thirdLoginType" value="${thirdLoginType }"/>
	<input type="hidden" id="uniqueId" value="${uniqueId }"/>
	
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
			<input type="hidden" id="teamId" value="${product.teamId }">
			<input type="hidden" id="teamName" value="${provider.teamName }">
			<input type="hidden" id="masterWorkProductId" value="${product.productId }">	
		     <div class="infoTop">
		        <div  class="image-video"></div>
		        <div  class="image-video-model"></div>
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
		     
		     <div class="providerIntroduction">
		         <div class="content">
		             <div class="name">
		                <div><img src="${imgPath}/provder/providerIcon.png" ></div><div class="cn">导演简介</div><div class="en">Director profile</div>
		             </div>
		             <div class="textTxt">
		             	${provider.teamDescription }
		             </div>
		         </div>
		         
		         <div class="tag" id="tagId">
		         	
		         
		           <div class="leftLine" id="leftLineId">
			            <div class="line"></div>
			            <div class="circleTag"></div>
		           </div>
		           <div class="midLine" id="provderTagId">
		           		<div class="hide" id="provderTags" >${providerTags}</div>
		            <!--      <div class="card">
		                     <div class="controlCard"> 
		                     		<div class="pencil"></div>
		                     		<div class="cardWord">电影</div>
		                     </div>
		                 </div> -->
		        
		         </div>
		            <div class="rightLine" id="rightLineId">
			            <div class="circleTag"></div>
			            <div class="line"></div>
		           </div>
		         </div>
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
			             <div class="NameContent" title="${product.pDescription }">
			             	${product.pDescription }
			             </div>
			              <div class="videoTag"><div><img src='${imgPath}/provder/videoTag.png'>
			              </div>
			              	<c:if test="${!empty tags}">
								<c:forEach items="${tags }" var="source" varStatus="status">
								<div>
									<c:if test="${status.index >0 }">
									/
									</c:if>
									${source }
								</div>
								</c:forEach>
							</c:if>
			              </div>
			             <a href="/play/${product.teamId }_${product.productId }.html">
			             	<div class="specialVideoInfo btn-red-common">了解详情</div>
			             </a>
			         </div>
			    </div>     
		     </div>
		     
		     <div class="triangle">
		         <img src="${imgPath}/provder/blackJiao.png">
		     </div>
		     
		     <div class="videoSpace">
	          <div class="productOutSide">
	             <div class="productInSide">影视作品</div>
	          </div>
	          <div class="timeLine" id ="timeLine">
	     		<!-- 时间树  -->
	     		           
	   		  </div>
		</div>
		
		<div class="infoBottom ">
		  <div class="buChong"></div>
		   <div class="bottomWord ">
                                              来自全球56个城市,1562名导演已加入,汇聚世界作品100000+
                 <br/>2000+客户在这里发布拍片需求
		   </div>
		   <a href="<spring:url value="/provider/login" />"><div class="bottomBtn btn-red-common ">立即加入</div>
		</div>
		
		</div>
		
			<div class="footer">
		
		
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
                                            <div class="cusLogin iconItem"><a href="<spring:url value="/login" />">客户登录</a></div>
                                            <div class="proLogin iconItem"><a href="<spring:url value="/login" />">导演登录</a></div>
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
	
	</div>
		 
</body>
</html>