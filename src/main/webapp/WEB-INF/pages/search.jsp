<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ page import="java.lang.Integer"%>
<%@ page import="java.util.List"%>
<%@ page import="com.paipianwang.pat.facade.information.entity.PmsProductSolr"%>
<%-- import CSS --%>
<spring:url value="/resources/css/search.css" var="searchCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.page.js" var="jqueryPageJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/search.js" var="searchJs"/>
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="企业宣传片,产品宣传片,形象宣传片,招商宣传片,品牌宣传片,tvc广告片,微电影">
	<meta name="description" content="拍片网精品案例覆盖企业形象宣传片、产品tvc广告片、品牌微电影、病毒视频、mg动画、专题片等各种视频。创意免费，价格透明，不满意可退款！">
	<title>企业产品宣传片_tvc广告片_企业微电影视频案例-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${searchCss }">
	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
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
	<input type="hidden" value='${q }' id="q"/>
	<input type="hidden" value="${industry }" id="industry"/>
	<input type="hidden" value="${genre }" id="genre"/>
	<input type="hidden" value="${price }" id="price"/>
	<input type="hidden" value="${production}" id="production"/>
	<input type="hidden" value="${total }" id="total"/>
	<input type="hidden" value="${isMore }" id="isMore"/>
	
	<jsp:include flush="true" page="header.jsp"></jsp:include>
    
     <r:identity role="employee">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	 </r:identity>

	<div class="page">
		<!-- 面包屑导航start -->
		<div class="videoTag" >
           <div>所有分类    ></div>
            <!-- </div><div class="tag"><span  name="tagName">战争</span><span>x</span></div> -->
            <div id="videoTag"></div>
		</div>
		<!-- 面包屑导航end -->
		
		<!-- 搜索条件模块 start -->
		<div class="classify-section">
			<div class="classify-wrap ">
				<div class="classify-type ">
					<dt>类型：</dt>
					<dd id="classify-item">
						<ul class="list-inline" id="item-list">
							<!-- 类型分类 -->
						</ul>
					</dd>
					<!-- <div class="more-link" id="more-link">
						<span>更多</span>
					</div> -->
				</div>
				
				<div class="classify-business ">
					<dt>行业：</dt>
					<dd id="classify-item">
						<ul class="list-inline" id="bus-item-list">
							<!-- 行业分类 -->
						</ul>
					</dd>
					<!-- <div class="more-link" id="more-link">
						<span>更多</span>
					</div> -->
				</div>
				
				<div class="classify-business">
					<dt>制作：</dt>
					<dd id="classify-item">
						<ul class="list-inline" id="production-item-list">
							<!-- 制作分类 -->
						</ul>
					</dd>
					<!-- <div class="more-link" id="more-link">
						<span>更多</span>
					</div> -->
				</div>
				
				<div class="classify-price ">
					<dt>价格：</dt>
					<dd id="price-item">
						<ul class="list-inline" id="price-list">
							<li><a href="javascript:void(0)" data-price="[0 TO 30000]" class="priceAll">0~3万</a></li>
							<li><a href="javascript:void(0)" data-price="[30000 TO 60000]" class="priceAll">3~6万</a></li>
							<li><a href="javascript:void(0)" data-price="[60000 TO 100000]" class="priceAll">6~10万</a></li>
							<li><a href="javascript:void(0)" data-price="[100000 TO *]" class="priceAll">10万以上</a></li>
							<li><div class="price-section"><input type="text" id="start-price" />万 ~ <input type="text" id="end-price" />万<a href="javascript:void(0);"><button class="btn btn-primary disabled" id="price-btn">确定</button></a></div></li>
						</ul>
					</dd>
				</div>
			</div>
		</div>
		<!-- 搜索条件模块 end -->
		<!-- video list start -->
		<div class="video-section">
			<div class="video-content" id="video-content">
			
			<!-- video-content -->
				<c:if test="${!empty list}">
					<!-- not empty -->
					<c:forEach items="${list }" var="solr" varStatus="status">
						<c:if test="${status.count % 4 == 1 }">
							<div class="video-row">
						</c:if>
						<div class="video-card video-col-4">
							<a href="<spring:url value='/play/${solr.teamId }_${solr.productId }.html'/>" target="_blank">
								<c:if test="${not empty solr.picLDUrl }">
									<img class="img-card-4" src="${file_locate_storage_path }${solr.picLDUrl }" alt="拍片网" />
								</c:if>
								<c:if test="${empty solr.picLDUrl }">
									<img class="img-card-4" src="${imgPath}/index/noImg.jpg" alt="拍片网" />
								</c:if>
						
							<div class="video-desc-section">
								<h3>${solr.productName }</h3>
								<div class="video-tags">
									<c:if test="${not empty fn:trim(solr.tags) }">
										<c:forEach items="${fn:split(fn:trim(solr.tags),' ') }" var="tag" end="2" varStatus="stat">
											${tag} <c:if test="${!stat.last }">/</c:if>
										</c:forEach>
									</c:if>
								</div>
							</div>
							<div class="video-price-section">
								<div class="video-price">
									<h2>￥
										<c:choose>
											<c:when test="${solr.price > 0}">
												<fmt:formatNumber value="${solr.price }" pattern="#,#00"/>
											</c:when>
											<c:when test="${solr.price <= 0}">
												暂无报价
											</c:when>
										</c:choose>
									</h2>&nbsp;&nbsp;
									<c:if test="${solr.price < solr.orignalPrice }">
										<h3>原价&nbsp;￥&nbsp;<fmt:formatNumber value="${solr.orignalPrice }" pattern="#,#00"/></h3>
									</c:if>
								</div>
							</div>
						 </a>
							<div class="line">
							     <div class="videoCardLine"></div>
							</div>
							<r:identity role="employee">
							     <c:if test="${solr.teamFlag == 1 && solr.indentProjectId != 0 }">
							          <img class="roleImg" src="/resources/images/play/roleOur.png">
								 </c:if>
								 <c:if test="${solr.teamFlag == 4 }">
								      <img class="roleImg" src="/resources/images/play/rolePlay.png">
								 </c:if>
								 <c:if test="${solr.teamFlag == 1 && solr.indentProjectId == 0 }">
								      <img class="roleImg" src="/resources/images/play/rolePro.png">
								 </c:if>
							</r:identity>								   					
								<div class="videoProvider">
									<c:if test="${solr.teamFlag != 4 }">
									   <a href="<spring:url value='/provider/info_${solr.teamId }.html'/>">			
									    <img src="${file_locate_storage_path }${solr.teamPhotoUrl }">
									    <div>${solr.teamName}</div>
									   </a>
							        </c:if>
								</div>
						</div>
							<c:if test="${status.count % 4 == 0 }">
								</div>
							</c:if>
					</c:forEach>
				</c:if>
				<c:if test="${empty list}">
					<div class="prompt-background">
						<img alt="未找到相关作品_拍片网" src="${imgPath}/search/airship.png">
					</div>
					<!-- <div class="prompt-word">对不起，没有找到您想要的作品!</div> -->
					<div class="prompt-word">您找的影片遗落在外星球了！</div>
				</c:if>
				
			</div>
			<r:noLogin>
				<div class="prompt-level-word">请<a href="<spring:url value='/login' />" > 登录 </a>拍片网，观看更多作品!</div>
			</r:noLogin>
			
			<r:noLevel>
				<div class="prompt-level-word">如需观看更多案例，请拨打 400 660 9728！</div>
			</r:noLevel>
			
			<r:noIdentification>
				<div class="prompt-level-word">待您成为认证供应商，可免费观看更多样片!</div>
			</r:noIdentification>
		</div>
		<!-- video list end -->
		
		<!-- pagination start -->
		<div class="page-section">
			<div class="page-wrap">
				<div class="pagination">
					
				</div>
			</div>
		</div>
		<!-- pagination end -->
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
                                            <div class="manLogin iconItem"><a href="<spring:url value="/mgr/login" />">内部员工登录</a></div>
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
                                            <div class="email iconItem"><a href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a></div>
                                        </div>
                                        <div class="topItem">
                                            <div class="title"><a>咨询电话</a></div>
                                            <div class="tel"><a href="tel:${OFFICAL_PHONE}">${OFFICAL_PHONE}</a></div>
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
	</div>
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${jqueryPageJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${searchJs }"></script>
</body>
</html>