<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/css/play.css" var="playCss"/>
<spring:url value="/resources/lib/swiper/swiper.min.css" var="swiperCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Clamp/clamp.js" var="clampJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/play.js" var="blockJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/lib/swiper/swiper.js" var="swiperJs" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="${fn:replace(product.tags, '  ', ',') }">
	<meta name="description" content="拍片网平台上覆盖企业形象宣传片、产品tvc广告片、品牌微电影、病毒视频、mg动画、专题片等各种视频。${product.pDescription }">
	<title>${product.productName }-拍片网</title>
    <link rel="stylesheet" href="${playCss }">
    <link rel="stylesheet" href="${bootstrapCss }">
    <link rel="stylesheet" href="${swiperCss }">
    <script type="text/javascript" src="http://player.youku.com/jsapi"></script>
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>

<body>
     
	 <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="role" value="创作团队" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="role" value="客户" />         
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="role" value="内部员工" />
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	 </r:identity>
	 
	<r:identity role="employee">
		     <c:if test="${product.indentProjectId < 0 }">
		           <input type="hidden" id="roleNum" value="-1" />
			 </c:if>
			 <c:if test="${product.indentProjectId > 0 }">
			       <input type="hidden" id="roleNum" value="1" />
			 </c:if>
			 <c:if test="${product.indentProjectId == 0 }">
			       <input type="hidden" id="roleNum" value="0" />
			 </c:if>
	</r:identity>	
	 
	<input type="hidden" id="picPath" value="<spring:url value="${product.picLDUrl }"/>" />
	<input type="hidden" id="yk-play" value="<spring:url value="${product.hret}"/>" />
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="vPrice" value="${product.serviceRealPrice }"/>
	<input type="hidden" id="tags" value="${product.tags }" />

 	<jsp:include flush="true" page="header.jsp"></jsp:include> 
    <div class="page">
        <div class="videoArea">
            <div class="videoContent">
                <div class="videoTop">
                        <div id="pName">${product.productName }</div>
                        <div><span><img src="/resources/images/block/tag.png"></span>
                       		<span>
								<c:if test="${! empty product.tags}">
									<c:forEach items="${fn:split(product.tags,' ') }" var="tag">
										<label style="cursor:pointer;" onclick='window.open("/search?q=${tag}")'>${tag }</label>
									</c:forEach>
								</c:if>
							</span>
						</div>
                        <div>
                            <ul>
                            <r:identity role="employee">
                                <li class="save" id="managerCollect"><div id="showSave">已收藏</div></li>
                             </r:identity>
                              <r:identity role="customer">
                                <li class="save hide" id="managerCollect"><div id="showSave">已收藏</div></li>
                             </r:identity>  
                              <r:identity role="provider">
                                <li class="save hide" id="managerCollect"><div id="showSave">已收藏</div></li>
                             </r:identity>
                             <r:noLogin>
                                <li class="save hide" id="managerCollect"><div id="showSave">已收藏</div></li>
                             </r:noLogin>      
                                <li></li>
                                <li>分享到 : </li>
                                <li class="-mob-share-qq share"></li>
                                <li class="-mob-share-qzone share"></li>
                                <li class="-mob-share-weibo share"></li>
                                <li class="-mob-share-weixin share"></li>
                            </ul>
                        </div>
                    </div>
            
                <div class="player-wrap">
                   
                    <div class="controlVideo">
                        <div class="player-wrap" id="player-wrap">
                        	<c:if test="${empty product.picLDUrl }">
                        		<video id="playId" controls src='<spring:url value="${file_locate_storage_path}${product.videoUrl }"/>' preload="auto" poster='<spring:url value="/resources/images/index/noImg.jpg"/>' ></video>
                        	</c:if>
                        	<c:if test="${not empty product.picLDUrl }">
								<video id="playId" controls src='<spring:url value="${file_locate_storage_path}${product.videoUrl }"/>' preload="auto" poster='<spring:url value="${file_locate_storage_path}${product.picLDUrl}"/>' ></video>
							</c:if>
						</div>
                    </div>
                    <c:if test="${teamFlag !=null && teamFlag == 1 }">
	                    <div class="videoBottom">
	                    	<a href="/provider/info_${teamId }.html">
	                        <div>
	                        	<c:if test="${empty product.teamPhotoUrl }">
									<img src='/resources/images/play/default_team_photo.svg' class="img-rounded" >
								</c:if>
								<c:if test="${not empty product.teamPhotoUrl }">
									<img src='<spring:url value="${file_locate_storage_path}${product.teamPhotoUrl}"/>' alt="${product.teamName }照片_拍片网" class="img-rounded">
								</c:if>
	                            <span>${product.teamName }</span>
	                            <div class="toHover">作品集</div>
	                        </div>
	                         </a>
	                        <div class="teamDescription">
	                        	${product.teamDescription}
	                        </div>
	                    </div>
                    </c:if>
                </div>
                <div class="videoPrice" id="info-wrap">
                    <div class="wordContent">
                        <div class="title">影片简介 <span>Project summary</span></div>
                        <div class="content playContent">
                            	${product.pDescription }
                        </div>
                    </div>
                     
                    <div class="price delPrice">
	                     
                    </div> 
                    
                    <div class="price showPrice" id="price">
                     	<c:if test="${product.servicePrice != 0 || product.serviceRealPrice != 0}">
	                     	<c:if test="${product.servicePrice > product.serviceRealPrice}">
		                      <div class="orPrice" ><span>￥</span><span id="servicePrice">${product.servicePrice }</span></div>
			                    <div class="orPriceTitle" >原价</div>
		                    </c:if>
		                    <div class="afterPrice" ><span>￥</span><span><fmt:formatNumber value="${product.serviceRealPrice }" pattern="#,#00"/></span></div>
	                    </c:if>
	                    <c:if test="${product.servicePrice == 0 && product.serviceRealPrice == 0}">
	                    	 <div class="afterPrice" ><span>￥</span><span>欢迎询价</span></div>
	                    </c:if>
	                    <div class="afterPriceTitle">影片价格</div>
                        <div class="btn-c-r" id="needOrder">我要下单</div>
                     </div>
                    <div class="order" id="order">
                    	<form id="order-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">
							<input type="hidden" id="indentName" name="indentName" value="${product.productName }">
							<input type="hidden" id="company-unique" name="teamId" value="${teamId }"/>
							<input type="hidden" id="play-unique" name="productId" value="${productId }"/>
							<input type="hidden" id="service-unique" name="serviceId" value="${product.serviceId }"/>
												
	                        <div class="closeBtn" id="closeBtn"></div>
	                        <div class="orderTitle">立即下单,对接制作团队</div>
	                        <div class="orderItem" id="phoneError">
	                            <input placeholder="您的电话号" name="indent_tele" id="phoneNumber">
	                        </div>
	                        <div class="orderItem" id="phoneCodeError">
	                            <input placeholder="输入手机验证码"  id="verificationCodeValue" name="phoneCode">
	                            <div class="btn-c-r" id="verification_code_recover_btn">获取验证码</div>
	                        </div>
	                         <a href="javascript:void(0);" id="order-btn1" ><div class="order-btn btn-c-r">确认提交</div></a>
	                     	  <!--  <div class="orderBtn" id="confirmBtn">确认下单</div>  -->
	                        <div class="orderBotTitle">立即下单,对接制作团队</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
	<%-- 	<c:if test="${!empty productModules}">
		        <div class="videoStar">
		            <div>本片导演更多影片推荐</div>
		        </div>
		        <div class="container-fluid" style="overflow: hidden">
		            <div class="row">
		                <div class="container second_sort" style="padding: 20px 0;">
		                    <div class="row">
		                        <div class="col-xs-10 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-0 col-md-offset-0 f_slider_rap">
		                            <div class="f_slider">
		                                <div class="flex-viewport" style="overflow: visible; position: relative;">
		                                    <ul class="slides">
		                                       <c:forEach items="${productModules }" var="source" varStatus="status">
													<li>
												        <div class="s_item s_item_cur" style="display: block;">
												            <div class="con">
												                <div class="conTop" data-id="${source.pid }">
												                    <div>${source.moduleName }</div>
												                    <div>
												                        <center>
												                        	<c:forEach var="i" begin="1" end="${source.moduleLevel }" step="1">   
													                        	<img src="/resources/images/block/star.png">
																			</c:forEach>  
												                        </center>
												                    </div>
												                </div>
												                <div class="conBottom">
												                   ${source.description }
												                </div>
												            </div>
												            <div class="layer" style="cursor: pointer;"></div>
												        </div>
												    </li>
												</c:forEach> 
		                                    </ul>
		                                </div>
		                                <ul class="flex-direction-nav">
		                                    <li>
		                                        <a class="flex-prev" href="#" style="display: none;"></a>
		                                    </li>
		                                    <li>
		                                        <a class="flex-next" href="#"></a>
		                                    </li>
		                                </ul>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		        <div class="bottomTab"></div>
		</c:if> --%>
		
<c:if test="${product.videoDescription != null && product.videoDescription!= '' && product.showType == 1}">
        <div class="bottomContent hide" id="videoDescription">
            <div class="contentWidth">
                <div class="leftContent">
                      <div class="title">影片介绍  <span>About this project</span></div>
                      <div class="setPro" id="videoValue">
                      		${product.videoDescription}
                      </div>
                </div>
                <div class="rightContent" id="rightContent">
                      <div class="title" id="moreTeamProductTitle" >相关影片推荐 <span>Recommended for you</span></div>
                      <div class="setVideo" id="moreTeamProductDiv">
                      <div class="swiper-container  swiper-more">
                            <div class="swiper-wrapper  rightContentSwiper" id="newMoreTeamProductDiv">
                            </div>
                        </div>
	                        <a id="moreProductInfo" class="hide">
		                      <div class="get-new-detail newsMore ">
			                      	<span>更多影片</span>
			                      	<div></div>
		                      </div>
	                       </a>    
	                        <div class="swiper-button-next rightNext"></div>
				            <div class="swiper-button-prev rightPrev"></div>
                      </div>
                      <div class="noMore hide" id="noMore">暂无作品</div>
                </div>
            </div>
        </div>
</c:if>

		<div class="noInfo hide" id="noInfo">
			<div class="swiper-container  swiper-noInfo">
			    <div class="title" id="moreTeamProductTitle" >相关影片推荐 <span class="colorDark">Recommended for you</span></div>
			    <a class="hide" id="moreNoInfo">
				    <div class="searchMore">
		                      	<span>更多影片</span>
		                      	<div></div>
		            </div>
	            </a>
				<div class="swiper-wrapper paddingBottom" id="swiper-noInfoId"></div>
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
</div>

<!-- foot -->
				 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
    <script type="text/javascript" src="${clampJs }"></script>
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${swiperJs }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${flexsliderJS }"></script>
    <script type="text/javascript" src="${jsonJs }"></script>
    <script type="text/javascript" src="${jquerybase64Js }"></script>
    <script type="text/javascript" src="${ykJs }"></script>
    <script type="text/javascript" src="${blockJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <!-- 加载Mob share 控件 -->
	<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
	<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
		<jsp:include flush="true" page="modelTool.jsp"></jsp:include> 
</body>

</html>