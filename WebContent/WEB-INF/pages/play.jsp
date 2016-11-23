<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.util.Constants"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<spring:url value="/resources/css/block/block.css" var="playCss"/>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
<spring:url value="/resources/js/block/block.js" var="blockJS"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/common3.js" var="common3Js"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/jquery/jquery.base64.js" var="jquerybase64Js" />
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片网,团队制作,拍片团队,导演介绍,广告制作">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>${product.productName }_拍片网</title>
    <link rel="stylesheet" href="${playCss }">
    <link rel="stylesheet" href="${bootstrapCss }">
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
	<input type="hidden" id="picPath" value="<spring:url value="${product.picLDUrl }"/>" />
	<input type="hidden" id="yk-play" value="<spring:url value="${product.hret}"/>" />
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="vPrice" value="${product.serviceRealPrice }"/>
	<input type="hidden" id="yk-play" value="<spring:url value="${product.hret}"/>" />
	<input type="hidden" id="tags" value="${product.tags }">
 <div class="header headerMove" id="header">
 <input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
                <a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
                <r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目</a>
				</r:identity>
				<r:identity role="employee">
				<a href="<spring:url value='/mgr/index'/>"  class="header-item" target="_parent">我的项目<span></span></a>
				</r:identity>
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
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
				<a href="<spring:url value="/login" />"><div class="header-item login-item">客户登录</div></a>
                <a href="<spring:url value="/provider/login" />"><div class="header-item login-item">导演登录</div></a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><div class="header-item login-item"><r:outName /></div></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self"><div class="header-item login-item">登出</div></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self" title="<r:outName />"><div class="header-item login-item"><r:outName /></div></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self"><div class="header-item login-item">登出</div></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><div class="header-item login-item"><r:outName /></div></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self"><div class="header-item login-item">登出</div></a>
				</r:identity>
            </div>
        </div>
    </div>
    <div class="page">
    <!-- <div class="showSuccess">
       <div class="successModal">
          <div class="show-zero2 zeromodal-icon zeromodal-success"><span class="line tip"></span><span class="line long"></span><div class="placeholder"></div></div>
          <div class="successWord">绑定成功</div>
          <div class="successInfo">欢迎加入拍片网!  自动跳转至<span id="toPortal">首页</span><span id="last3">3</span>秒</div>
       </div>   
    </div> -->
        <div class="videoArea">
            <div class="videoContent">
                <div class="player-wrap">
                    <div class="videoTop">
                        <div id="pName">${product.productName }</div>
                        <div><span><img src="/resources/images/block/tag.png">标签 :</span>
                       		<span>
								<c:if test="${! empty product.tags}">
									<c:forEach items="${fn:split(product.tags,' ') }" var="tag">
										<label>${tag }</label>
									</c:forEach>
								</c:if>
							</span>
						</div>
                        <div>
                            <ul>
                                <li></li>
                                <li>分享到 : </li>
                                <li class="-mob-share-qq share"></li>
                                <li class="-mob-share-qzone share"></li>
                                <li class="-mob-share-weibo share"></li>
                                <li class="-mob-share-weixin share"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="controlVideo">
                        <div class="player-wrap" id="player-wrap">
							<video controls src='<spring:url value="${file_locate_storage_path}${product.videoUrl }"/>' preload="auto" poster='<spring:url value="${file_locate_storage_path}${product.picLDUrl}"/>'></video>
							<%-- <video controls src='<spring:url value="${fn:substringAfter(product.videoUrl,'/portal') }"/>' preload="auto" poster='<spring:url value="${fn:replace(fn:substringAfter(product.picLDUrl,'/portal'),'image','img') }"/>'></video> --%>
						</div>
                    </div>
                    <c:if test="${teamFlag !=null && teamFlag == 1 }">
	                    <div class="videoBottom">
	                    	<a href="/provider/info_${teamId }.html">
	                        <div>
	                        	<c:if test="${empty product.teamPhotoUrl }">
									<img src='${imgPath }/play/default_team_photo.svg' alt="公司照片_拍片网" class="img-rounded" >
								</c:if>
								<c:if test="${!empty product.teamPhotoUrl }">
									<img src='<spring:url value="${file_locate_storage_path}${product.teamPhotoUrl}"/>' alt="${product.teamName }照片_拍片网" class="img-rounded">
								</c:if>
	                            <span>${product.teamName }</span>
	                        </div>
	                         </a>
	                        <div>
	                        	${product.teamDescription }
	                        </div>
	                    </div>
                    </c:if>
                </div>
                <div class="videoPrice" id="info-wrap">
                    <div class="wordContent">
                        <div class="title">影片故事简述</div>
                        <div class="content">
                            	${product.pDescription }
                        </div>
                    </div>
                     
                    <div class="price delPrice">
	                     
                    </div> 
                    
                    <div class="price showPrice" id="price">
                     	<c:if test="${product.servicePrice != 0 || product.serviceRealPrice != 0}">
	                     	<c:if test="${product.servicePrice > product.serviceRealPrice}">
		                      <div class="orPrice" ><span>￥</span><span>${product.servicePrice }</span></div>
			                    <div class="orPriceTitle" >原价</div>
		                    </c:if>
		                    <div class="afterPrice" ><span>￥</span><span><fmt:formatNumber value="${product.serviceRealPrice }" pattern="#,#00"/></span></div>
	                    </c:if>
	                    <c:if test="${product.servicePrice == 0 && product.serviceRealPrice == 0}">
	                    	 <div class="afterPrice" ><span>￥</span><span>暂无报价</span></div>
	                    </c:if>
	                    <div class="afterPriceTitle">影片价格</div>
                        <div id="needOrder">我要下单</div>
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
	                            <div id="verification_code_recover_btn">获取验证码</div>
	                        </div>
	                         <a href="javascript:void(0);" id="order-btn" ><div class="order-btn">确认提交</div></a>
	                     	  <!--  <div class="orderBtn" id="confirmBtn">确认下单</div>  -->
	                        <div class="orderBotTitle">立即下单,对接制作团队</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
		<c:if test="${!empty productModules}">
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
		</c:if>
<c:if test="${product.videoDescription != null && product.videoDescription!= ''}">
        <div class="bottomContent hide" id="videoDescription">
            <div class="contentWidth">
                <div class="leftContent">
                      <div class="title">影片故事简述</div>
                      <div class="setPro" id="videoValue">
                      		${product.videoDescription}
                      </div>
                </div>
                <div class="rightContent">
                      <div class="title" id="moreTeamProductTitle" >本片导演更多影片推荐</div>
                      <div class="setVideo" id="moreTeamProductDiv">
                          <div class="videoModel">
                              <img src="/resources/images/block/test.png">
                              <label>宣传片</label>
                          </div>
                      </div>
                      
                      <div class="title" id="recommendProductTitle">更多相关影片推荐</div>
                      <div class="setVideo" id="recommendProductTitleDiv">
                          <div class="videoModel">
                              <img src="/resources/images/block/test.png">
                              <label>宣传片</label>
                          </div>
                      </div>
                </div>
            </div>
        </div>
</c:if>

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
                                            <div class="proLogin iconItem"><a href="<spring:url value="/provider/login" />">导演登录</a></div>
                                            <div class="manLogin iconItem"><a href="<spring:url value="/mgr/login" />">管家登录</a></div>
                                            <div class="reg iconItem"><a>注册</a></div>
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
                                            <div class="noiconItem"><a>服务流程</a></div>
                                            <div class="noiconItem"><a href="<spring:url value='/company-service.html#servicePart' />">服务协议</a></div>
                                            <div class="noiconItem"><a href="<spring:url value="/login" />">找拍摄团队</a></div>
                                            <div class="noiconItem"><a href="<spring:url value="/provider/login" />">我要发作品</a></div>
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
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${flexsliderJS }"></script>
    <script type="text/javascript" src="${jsonJs }"></script>
    <script type="text/javascript" src="${jquerybase64Js }"></script>
    <script type="text/javascript" src="${ykJs }"></script>
    <script type="text/javascript" src="${blockJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <script type="text/javascript" defer async="true" src="${common3Js }"></script>
    
    <!-- 加载Mob share 控件 -->
	<script id="-mob-share" src="http://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
	<script type="text/javascript" src="http://player.youku.com/jsapi"></script>
</body>

</html>
