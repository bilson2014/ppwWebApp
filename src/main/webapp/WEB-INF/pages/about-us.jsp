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
	<meta name="keywords" content="拍片网融资,拍片网简介,拍片网愿景,拍片网社区,拍片网团队">
	<meta name="description" content="拍片网平台简介，拍片网是一个开放、共享、透明、公正的一个视频制作服务平台，了解更多拍片网平台服务和拍片网平台愿景">
	<title>拍片网融资_拍片网简介_了解拍片网平台－拍片网</title>
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
	 <div class="header headerMove" id="header">
 		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >项目<span></span></a>
					<a href="<spring:url value='/product/MotionGraphicsforPublicPresentation/main'/>" class="header-item" >产品<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:identity>
				
				<r:noLogin>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
					<a href="<spring:url value='/cost/cal'/>" class="header-item">估算成本<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
                 <a href="/news-list.html" class="header-item" target="_parent">新闻资讯<span></span></a>
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
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/default-user.jpg"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/user/info" />"><li class="toSet">个人信息</li></a>
					         <a href="<spring:url value="/user/info?safeInfo" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self"><img id="getImgUrl" data-value="<r:outImg />" src="/resources/images/provider/initLogo.png"></a>
					<a class="header-item login-item widthHear" target="_self"><r:outName /></a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/provider/portal?company-info" />"><li class="toSet">公司信息</li></a>
					         <a href="<spring:url value="/provider/portal?safe-info" />"><li class="toSafe">安全设置</li></a>
					         <a href="<spring:url value="/provider/portal" />"><li class="toList">作品列表</li></a>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
					<div class="showInfo">
				       <div class="showInfoList">
					         <li class="showName"><r:outName /></li>
					         <a href="<spring:url value="/mgr/index" />"><li class="toMy">我的项目</li></a>
					         <a href="<spring:url value="/mgr/favourites" />"><li class="toCollect">收藏列表</li></a>
					         <a href="<spring:url value="/login/loginout" />"><li class="loginOut">退出登录</li></a>
					       </div>
					</div>
				</r:identity>
            </div>
        </div>
    </div>

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
		  <div class="bannerLogo">
		     <img src="${imgPath }/introduce/about-us/test.svg">
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
	                     <img src="/resources/images/about/usInfo.png">
	                  </div>
	                  <div class="contentRight">
	                        <div class="modalTitle">
	                             <img src="/resources/images/about/lineS.png">
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
	                        </div>
	                        <div class="modalLine">
	                              <ul>
	                                 <li><div></div>12月获得老鹰基金Pre-A轮投资，投资人刘小鹰</li>
	                                 <li><div></div>11月拍片网微信客户端上线</li>
	                                 <li><div></div>10月签约用友集团 </li>
	                                 <li><div></div>9月承接中国铁塔2015国际通信展览视频展示全案</li>
	                                 <li><div></div>7月拍片网正式版上线，入驻导演团队三百多家 </li>
	                                 <li><div></div>5月拍片网Demo版上线测试 </li>
	                                 <li><div></div>2月获得洪泰基金投资人俞敏洪、盛希泰天使轮追加投资</li>
	                              </ul>
	                        </div>
	                         <div class="modalTree">
	                             <img src="/resources/images/about/lineM.png">
	                             <div>2014</div>
	                        </div>
	                        <div class="modalLine">
	                              <ul>
	                                 <li><div></div>10月成立获得PreAngel王利杰、顾浩天使轮投资</li>
	                              </ul>
	                        </div>
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
                                            <div class="tel"><a href="tel:${OFFICAL_PHONE }">${OFFICAL_PHONE }</a></div>
                                            <div class="workTime"><a>工作时间 9:00-18:00  (周一至周五)</a></div>
                                        </div>
                                    </div>
                                    <div class="contentBottom">
                                        <div>版权信息</div>
                                        <div>本站视频作品采用知识共享署名-非商业性使用.本站不提供任何视听上传服务，</div>
                                        <div>所有内容均来自视频分享站点所提供的公开引用资源.</div>
                                        <div>© 2016 北京拍片乐科技有限公司 京ICP备16066831号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div>
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