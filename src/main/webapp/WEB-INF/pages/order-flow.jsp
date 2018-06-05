<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="宣传片策划,宣传片制作流程, tvc广告片创意策划, 微电影拍摄方案">
    <meta name="description" content="PGC商业视频制作平台，视频管家一对一接洽，创意策划完全免费，72小时极速出片。宣传片、tvc广告片、品牌微电影，上拍片网。作品如人品，我们认证创作每一条影片！">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>宣传片制作流程_tvc广告片创意策划_微电影拍摄执行方案-拍片网</title>
    <spring:url value="/resources/css/order-flow.css" var="serviceToCss"/>
    <spring:url value="/resources/css/about-us.css" var="aboutUsCss"/>
    
    <spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
    <spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
    <spring:url value="/resources/js/common.js" var="commonJs"/>
    <spring:url value="/resources/js/orderFlow.js" var="orderFlowJs"/>
    <spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
    <spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypointsJs"/> 
<spring:url value="/resources/images" var="imgPath" />
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
<link rel="stylesheet" href="${serviceToCss }">
<link rel="stylesheet" href="${bootstrapCss }">

	<link rel="stylesheet" href="${aboutUsCss }">

   
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
    <jsp:include flush="true" page="header.jsp"></jsp:include> 
    <div class="page">
        <div class="titleTag">
            <div class="titleWord">
                <a href="/about-us.html">
                    <div>了解我们</div>
                </a>
                <a>
                    <div class="checkActive">服务流程</div>
                </a>
                <a href="/company-service.html">
                    <div>服务协议</div>
                </a>
                <a href="/company-activity.html">
                    <div>公司活动</div>
                </a>
                <a href="/member.html">
                    <div>加入我们</div>
                </a>
            </div>
        </div>
<!-- 内容区域 start -->
		<div class="banner">
		  <div class="bannerLogo">
		     <img src="${imgPath }/introduce/order-flow/introduce.svg" style="height: 26px;width: 170px;">
		  </div>
		 <img id="orImg"  src="${imgPath }/about/back.jpg">
		 <img id="smallImg"  src="${imgPath }/about/backS.jpg">        
		<div class="video-div" id="video">
			<video id="playVideos" src="http://www.apaipian.com/product/video/paipianwangMovie.mp4" preload="auto" controls="controls" poster="${imgPath }/banner/moreInfo.JPG" ></video>
	    </div>
		</div> 
   <!--拍片网介绍 -->
		<%-- <div class="banner" style="background: no-repeat;height:700px;">
		  <div class="bannerLogo">
		     <img src="${imgPath }/introduce/order-flow/introduce.svg" style="margin-left: 120px; height: 25px;">
		  </div>
	 	<img id="orImg"  src="${imgPath }/about/back.jpg">
		<img id="smallImg"  src="${imgPath }/about/backS.jpg">        
		<div class="video-div" id="video" style="width: 1000px;">
			<video id="playVideos" style="margin-top: 120px;" src="http://www.apaipian.com/product/video/paipianwangMovie.mp4" preload="auto" controls="controls" poster="${imgPath }/banner/moreInfo.JPG" ></video>
	    </div>
		</div>
	 --%>
	 
	 
        <div class="tagsWidth">
            <div class="bgLogo" style="margin-left: -150px;"></div>
            <div class="icon icon1 RightIcon">
                <div>
                    <label>需求沟通</label>
                    <label>您只需要填写电话号码，点击下单。
                            <br>视频管家就会上门，一对一服务，了解您的需求。</label>
                    <label>You only need a phone number to make order. 
                          <br>A video specialist will then collect your requirements. 
                    </label>
                </div>
                <div alt="宣传片制作流程之需求沟通"></div>
            </div>
            <div class="icon icon2 LeftIcon">
                <div>
                    <label>创意策划</label>
                    <label>606名脑洞超大的创意人员随时抢单，创意策划完全免费!
<br>根据预算，视频管家会从世界各地5208名导演中，挑出最适合您的一位。 </label>
                    <label>606 creative writers are ready to draft ideas. And it is all free! 
Within your budget, <br>the specialist will find the best match from 5208 experienced directors all over the world.
                    </label>
                </div>
                <div alt="宣传片制作流程之创意策划"></div>
            </div>
            <div class="icon icon3 RightIcon">
                <div>
                    <label>商务流程</label>
                    <label>您将制作费托管到拍片网平台，导演团队就开始干活了!</label>
                    <label>Once the deposit is settled, the project is on! 
                    </label>
                </div>
                <div alt="宣传片制作流程之商务流程"></div>
            </div>
            <div class="icon icon4 LeftIcon">
                <div>
                    <label>执行方案</label>
                    <label>选演员，选场地，前期拍摄，后期制作，配音配乐，视频管家会替您全程监管。</label>
                    <label>Casting,locations,shooting,production,dubbing... The specialist cares all of them. 
                    </label>
                </div>
                <div alt="宣传片制作流程之执行方案"></div>
            </div>
            <div class="icon icon5 RightIcon">
                <div>
                    <label>影片制作</label>
                    <label>您只需要耐心等候，最快24小时一条影片就出炉了！
<br>我们视“作品如人品”，认真创作每一条影片!</label>
                    <label>Just a little patience,a fastest video production can be done within 24 hours！ 
<br>We always believe in "great work talks"! 
                    </label>
                </div>
                <div alt="宣传片制作流程之影片制作"></div>
            </div>
            <div class="icon6 LeftIcon">
                <div>
                    <label>影片交付</label>
                    <label>如果您非常满意，确认收片，我们会将托管的制作费支付给导演团队。
                    <br>不满意，可全额退款或重新拍摄制作。</label>
                    <label>If you satisfy the video, the fee will  be transferred to the directors. <br>
                          Otherwise, you will be fully refunded or your video will be reproduced. 
                    </label>
                </div>
                <div alt="宣传片制作流程之影片交付"></div>
            </div>
        </div>
<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
    </div>
</body>
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${waypointsJs }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
    <script type="text/javascript" src="${orderFlowJs}"></script>
    
</html>
