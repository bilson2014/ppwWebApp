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
<spring:url value="/resources/js/common3.js" var="common3Js"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>

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
</head>

<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<input type="hidden" id="company-unique" value="${teamId }"/>
	<input type="hidden" id="play-unique" value="${productId }"/>
	<input type="hidden" id="service-unique" value="${product.serviceId }"/>
	<input type="hidden" id="vPrice" value="${product.serviceRealPrice }"/>
	<input type="hidden" id="picPath" value="<spring:url value="${product.picLDUrl }"/>" />
	<input type="hidden" id="yk-play" value="<spring:url value="${product.hret}"/>" />

 <div class="header headerMove" id="header">
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
                <a href="<spring:url value='/mgr/index'/>" class="header-item">首页<span></span></a>
                <a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
                <a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="<spring:url value='/direct/order'/>" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo">
                    </div>
                    	拍片网介绍
                    <span></span>
                </a>
            </div>
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
                <a class="header-item login-item" target="_self">登录</a>
                <a class="header-item login-item" target="_self">注册</a>
            </div>
        </div>
    </div>
    <div class="page">
        <div class="videoArea">
            <div class="videoContent">
                <div class="player-wrap" id="player-wrap">
                    <div class="videoTop">
                        <div>${product.productName }</div>
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
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div class="controlVideo">
                        <video controls>
                        </video>
                    </div>
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
                </div>
                <div class="videoPrice">
                    <div class="wordContent">
                        <div class="title">影片描述</div>
                        <div class="content">
                            	${product.pDescription }
                        </div>
                    </div>
                    <div class="price showPrice" id="price">
                        <div><span>￥</span><span><fmt:formatNumber value="${product.serviceRealPrice }" pattern="#,#00"/></span></div>
                        <div>影片时长</div>
                        <div id="needOrder">我要下单</div>
                    </div>
                    <div class="order" id="order">
                    	<form id="order-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">
                    		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
							<input type="hidden" id="token" name="token" value="${token}"/>
							<input type="hidden" name="indentName" id="indentName" value="">
	                        <div class="closeBtn" id="closeBtn"></div>
	                        <div class="orderTitle">立即下单,对接制作团队</div>
	                        <div class="orderItem">
	                            <input placeholder="您的电话号" name="indent_tele" id="phoneNumber">
	                        </div>
	                        <div class="orderItem">
	                            <input placeholder="输入手机验证码"  id="verificationCodeValue">
	                            <div id="verification_code_recover_btn">获取验证码</div>
	                        </div>
	                         <a href="javascript:void(0);" id="order-btn" class="order-btn">确认提交</a>
	                     	  <!--  <div class="orderBtn" id="confirmBtn">确认下单</div>  -->
	                        <div class="orderBotTitle">立即下单,对接制作团队</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="videoStar">
            <div>本片制作服务星 指数</div>
        </div>
        <div class="container-fluid" style="overflow: hidden">
            <div class="row">
                <div class="container second_sort" style="padding: 20px 0;">
                    <div class="row">
                        <div class="col-xs-10 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-0 col-md-offset-0 f_slider_rap">
                            <div class="f_slider">
                                <div class="flex-viewport" style="overflow: visible; position: relative;">
                                    <ul class="slides">
                                        <li>
                                            <div class="s_item s_item_cur" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="cursor: pointer;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="cursor: pointer;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="cursor: pointer;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="cursor: pointer;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="cursor: pointer;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="display: block; cursor: auto;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="display: block; cursor: auto;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="display: block; cursor: auto;"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="s_item" style="display: block;">
                                                <div class="con">
                                                    <div class="conTop">
                                                        <div>入门级拍摄</div>
                                                        <div>
                                                            <center>
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                                <img src="/resources/images/block/star.png">
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <div class="conBottom">
                                                        大叔大叔大所打算打打 打算打打大大
                                                    </div>
                                                </div>
                                                <div class="layer" style="display: block; cursor: auto;"></div>
                                            </div>
                                        </li>
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
        <div class="bottomContent">
            <div class="contentWidth">
                <div class="leftContent">
                      <div class="title">影片故事简述</div>
                      <div class="setPro">
                        <img src="/resources/images/block/test.png">
                        <img src="/resources/images/block/test.png">
                        <img src="/resources/images/block/test.png">
                      </div>
                </div>
                <div class="rightContent">
                      <div class="title">本片导演更多影片推荐</div>
                      <div class="setVideo">
                             <div class="videoModel">
                                 <img src="/resources/images/block/test.png">
                                 <label>宣传片</label>
                             </div>
                               <div class="videoModel">
                                 <img src="/resources/images/block/test.png">
                                 <label>宣传片</label>
                             </div>
                               <div class="videoModel">
                                 <img src="/resources/images/block/test.png">
                                 <label>宣传片</label>
                             </div>
                               <div class="videoModel">
                                 <img src="/resources/images/block/test.png">
                                 <label>宣传片</label>
                             </div>
                               <div class="videoModel">
                                 <img src="/resources/images/block/test.png">
                                 <label>宣传片</label>
                             </div>
                      </div>
                </div>
            </div>
        </div>

         <div class="foot3">
                                <div class="footContent">
                                    <div class="contentTop">
                                        <div class="topItem codeWidth">
                                            <div class="Twocode"></div>
                                            <div class="smWord">扫一扫 关注官方微信</div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>登录</a></div>
                                            <div class="cusLogin iconItem"><a>客户登录</a></div>
                                            <div class="proLogin iconItem"><a>供应商登录</a></div>
                                            <div class="manLogin iconItem"><a>管家登录</a></div>
                                            <div class="reg iconItem"><a>注册</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>关于拍片网</a></div>
                                            <div class="noiconItem"><a>了解我们</a></div>
                                            <div class="noiconItem"><a>加入我们</a></div>
                                            <div class="noiconItem"><a>公司活动</a></div>
                                            <div class="noiconItem"><a>团队介绍</a></div>
                                        </div>
                                        <div class="topItem commonWidth">
                                            <div class="title"><a>服务</a></div>
                                            <div class="noiconItem"><a>服务流程</a></div>
                                            <div class="noiconItem"><a>服务协议</a></div>
                                            <div class="noiconItem"><a>找拍摄团队</a></div>
                                            <div class="noiconItem"><a>我要发作品</a></div>
                                        </div>
                                        <div class="topItem onLineWidth">
                                            <div class="title"><a>在线联系我们</a></div>
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"></a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">供应商客服</a></div>
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
    <script type="text/javascript" src="${blockJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <script type="text/javascript" defer async="true" src="${common3Js }"></script>
</body>

</html>
