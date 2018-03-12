<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/about-us.css" var="aboutUsCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/aboutUs.js" var="aboutJs"/>
<spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypointsJs"/>

<!-- import img path -->
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
	<meta name="keywords" content="宣传片制作公司,宣传片拍摄公司,tvc广告片制作,短视频制作平台">
	<meta name="description" content="拍片网是综合性PGC广告短视频制作服务平台，独创“制作费托管”模式，立足北京，服务全国。企业宣传片制作，产品宣传片拍摄，tvc广告片制作，一站式服务，上拍片网。">
	<title>宣传片制作公司_tvc广告片拍摄公司_短视频制作平台-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${aboutUsCss }">
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
	
	<jsp:include flush="true" page="header.jsp"></jsp:include> 
	<div class="page">
		       <div class="titleTag">
            <div class="titleWord">
                <a >
                    <div class="checkActive">了解我们</div>
                </a>
                <a href="/order-flow.html">
                    <div>服务流程</div>
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

		<div class="nav-shadow"></div>
		<img id="icon" class="bannerAni" src="/resources/images/about/icon.png">

		<!-- 内容区域 start -->
		<div class="banner">
		  <div class="bannerLogo" >
		     <img  src="${imgPath }/introduce/about-us/test.svg" style="width: 242px;">
		  </div>
		 <img id="orImg"  src="${imgPath }/about/back.jpg">
		 <img id="smallImg"  src="${imgPath }/about/backS.jpg">        
		<div class="video-div" id="video">
			<video id="playVideos" src="${file_locate_storage_path }group1/M00/00/60/CgpmTlib2EaAbOOdAQ1EMav8_P0022.mp4" preload="auto" controls="controls" poster="${imgPath }/about/2017.png" ></video>
	    </div>
		</div>
		
		<div class="location">
		
		   <div class="locationTop">
		          <!-- <div class="leftCircle"></div>
		          <div class="rightCircle"></div> -->
		          <img src="${imgPath }/introduce/about-us/pos.svg" />
		   </div>
		    <div class="locationTitle">
		            <div>我们服务的每一个客户在我们眼里，都是未来的世界500强</div>
		            <div>所以我们致力于为每一个客户</div>
		            <div>提供世界500强同等品质的服务</div>
		     </div>
		   <div class="locationImg">
			   <img src="/resources/images/about/rightImg.png">
			   <img src="/resources/images/about/midImg.png">
			   <img src="/resources/images/about/leftImg.png">
		   </div>	   
	   </div>
	    <!-- 内容区域 end -->
	    <!-- 历史start -->
	         <div class="history">
	              <div class="historyTitle">
	                 <img src="${imgPath }/introduce/about-us/histroy.svg">
	              </div>

	              <div class="historyContent">
	                  <div class="contentLeft">
	                     <img class="no960" src="/resources/images/about/aboutusHis.png">
	                     <img class="is960" src="/resources/images/about/aboutusHis2.png">
	                     <div class="contentItem">
	                          <div class="contentTitle leftMargin">2018</div>
	                          <div class="contentWord"><div></div>1月拍片网获评"第七届中国公益节2017年度公益映像奖"</div>
	                     </div>
	                     <div class="contentItem">
	                          <div class="contentTitle">2017</div>
	                          <div class="contentWord"><div></div>12月拍片网荣获全球青年大创浙江总决赛"总冠军"</div>
	                          <div class="contentWord"><div></div>12月拍片网获得金触点TopTouch</div>
	                          <div class="contentWord"><div style="opacity:0"></div>2017年度最佳广告主植入短视频铜奖</div>
	                          <div class="contentWord"><div></div>11月中国铁塔再度与拍片网成功合作</div>
	                          <div class="contentWord"><div></div>10月拍片网在杭州主办“视频无界”第二届中国商业视频大会</div>
	                          <div class="contentWord"><div></div>9月拍片网杭州分公司正式成立</div>
	                          <div class="contentWord"><div></div>7月拍片网荣膺第六届中国财经峰会"2017最具成长价值奖"</div>
	                          <div class="contentWord"><div style="opacity:0"></div>拍片网CEO夏攀荣获"2017最佳青年榜样"</div>
	                          <div class="contentWord"><div></div>3月拍片网、葡萄创投和36氪联合举办人工智能产业峰会</div>
	                          <div class="contentWord"><div></div>2月拍片网主办北京“共享未来”首届中国视频行业领袖峰会</div>
	                     </div>
	                  </div>
	                  <div class="contentRight">
	                  
	                      <div class="contentItem rightMargin">
	                          <div class="contentTitle rightMargin">2014</div>
	                          <div class="contentWord"><div></div>10月成立获得PreAngel王利杰、顾浩天使轮投资</div>
	                     </div>
	                     <div class="contentItem">
	                          <div class="contentTitle rightMargin2">2015</div>
	                          <div class="contentWord"><div></div>12月获得老鹰基金Pre-A轮投资，投资人刘小鹰</div>
	                          <div class="contentWord"><div></div>11月拍片网微信客户端上线</div>
	                          <div class="contentWord"><div></div>10月签约用友集团</div>
	                          <div class="contentWord"><div></div>9月承接中国铁塔2015国际通信展览视频展示全案</div>
	                          <div class="contentWord"><div></div>7月拍片网正式版上线，入驻导演团队三百多家</div>
	                          <div class="contentWord"><div></div>5月拍片网Demo版上线测试</div>
	                          <div class="contentWord"><div></div>2月获得洪泰基金投资人俞敏洪、盛希泰天使轮追加投资</div>
	                     </div>
	                     <div class="contentItem">
	                          <div class="contentTitle">2016</div>
	                          <div class="contentWord"><div></div>11月获得国泰君安力鼎投资A轮投资</div>
	                          <div class="contentWord"><div></div>10月举办中国首届视频营销大会</div>
	                          <div class="contentWord"><div></div>3月拍片网2.0迭代上线，签约客户超过100家</div>
	                     </div>
	                       <!--  
	                        <div class="modalTitle">
	                             <img src="/resources/images/about/aboutusHis.png">
	                             <div>2016</div>
	                        </div>
	                        <div class="modalLine">
	                              <ul>
	                                 <li><div></div>11月获得国泰君安力鼎投资A轮投资</li>
	                                 <li><div></div>10月举办中国首届视频营销大会</li>
	                                 <li><div></div>3月拍片网2.0迭代上线，签约客户超过100家</li>
	                              </ul>
	                        </div>
	                         <div class="modalTree">
	                             <img src="/resources/images/about/lineM.png">
	                             <div>2015</div>
	                        </div> -->
	                 
	                  </div>
	              </div>
	         </div>
	      <!-- 历史end -->
	      <!-- 价值观start -->
	          <div class="value">
	                  <ul>
	                     <li><img src="${imgPath }/introduce/about-us/value.svg"></li>
	                     <li>作品如人品</li>
	                     <li>我们认识一个人往往从他的作品开始 </li>
	                     <li>在自然科学和文学艺术领域 </li>
	                     <li>作品深刻的反映了创作者的灵魂质地</li>
	                     <li>拍片网用作品说话</li>
	                  </ul>
	                 <img style="width:100%" src="/resources/images/about/info.png">
	          </div>
	      <!-- 价值观end -->
	      <!-- 使命start -->
	          <div class="Mission">
	                  <ul>
	                     <li><img src="${imgPath }/introduce/about-us/test.svg"></li>
	                     <li>通过互联网的方式连接影视创作者，让影视行业变得开放、共享、高效</li>
	                     <li>创造伟大的作品，让世界变得更好</li>
	                  </ul>
	                  <img style="width:100%" src="/resources/images/about/bottomBg.jpg">
	          </div>
	      <!-- 使命end -->
	</div>
	<!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
	</div>
	
	<!-- 代码部分begin -->
	<div class="toolbar " id="toolbar-section" >
		<a href="javascript:void(0);" class="toolbar-item toolbar-item-weixin common-icons-tele-client" id="toolbar-item-weixin"></a>
		<a href="tencent://message/?uin=2640178216&Site=qq&Menu=yes" class="toolbar-item toolbar-item-qq common-icons-qq-client"></a>
		<a href="javascript:scroll(0,0)" id="top" class="toolbar-item toolbar-item-top common-icons-top-client"></a>
	</div>
	<!-- 代码部分end -->
	
	<!-- toolbar modal begin -->
	<div class="modal fade" id="toolbar-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="common-icons-know-us-close-icon modal-icon" data-dismiss="modal" aria-label="Close"></div>
					<dl>
						<dt>
							<h3 id="modal-h3-first">马上接通视频营销管家</h3>
						</dt>
						
						<dd id="modal-dd-second">
							<input placeholder="输入电话，我们即刻回电!" type="text" id="phoneCall"/>
							<a href="javascript:void(0);" id="modal-call">
								<div class="call-btn">
									<label class="call-icon common-icons-telephone"></label> 闪电接通
								</div>
							</a>
							<label class="modal-message" style="display: none;"></label>
						</dd>
						
						<dt >
							<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"><div class="model-qq-icon common-icons-qq-icon"></div></a>
						</dt>
						
						<dd>
							<h4>和QQ客服聊会</h4>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<!-- toolbar modal end -->
	
	<script type="text/javascript" src="${jqueryJs }"></script>
	<script type="text/javascript" src="${pluginJs }"></script>
	<script type="text/javascript" src="${modelJs }"></script>
	<script type="text/javascript" src="${commonJs }"></script>
	<script type="text/javascript" src="${aboutJs }"></script>
	<script type="text/javascript" src="${waypointsJs }"></script>
	
</body>
</html>