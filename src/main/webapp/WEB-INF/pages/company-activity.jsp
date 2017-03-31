<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/company-activity.css" var="companyActivityCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>

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
	<meta name="keywords" content="团队活动,公司活动,拍片网">
	<meta name="description" content="拍片网团队线上线下的活动简介">
	<title>拍片网团队活动_拍片网公司活动-拍片网</title>
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<link rel="stylesheet" href="${companyActivityCss }">
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
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
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
				</r:identity>
            </div>
        </div>
    </div>
    
    <div class="titleTag">
            <div class="titleWord">
                <a href="/about-us.html">
                    <div>了解我们</div>
                </a>
                <a href="/order-flow.html">
                    <div >服务流程</div>
                </a>
                <a href="/company-service.html">
                    <div>服务协议</div>
                </a>
                <a>
                    <div class="checkActive">公司活动</div>
                </a>
                <a href="/member.html">
                    <div>加入我们</div>
                </a>
            </div>
        </div>

	<div class="page">
		 

		<div class="nav-shadow"></div>
		
		<div class="page">
		    <div class="activeTitle">
		        <div>公司活动</div>
		        <div>Corporate Events</div>
		    </div>
		    
		    
		    <div class="infoTitle">
		        <div>共享未来－中国视频行业领袖峰会</div>
		        <div>2017年2月27日 北京海淀新世纪日航</div>
		        <div>由拍片网主办，千位视频行业龙头聚首在北京，一场有关“共享未来”的视频行业争锋一触即发。多位顶级创投圈、影视行业名人和全国各地的视频行业领袖，聚首“共享未来”的高峰交流，
共同讨论互联网时代下的影视行业资源共享及连接资源等于连接未来的观点。</div>
                <img  class="active1" src="${imgPath }/introduce/activity/activity1-1.jpg">
                <img  class="active1-2" src="${imgPath }/introduce/activity/activity1-2.jpg">
		    </div>
		     <div class="infoTitle">
		        <div>视频营销大会</div>
		        <div>2016年10月10日 北京日坛宾馆</div>
		        <div>由拍片网联合镖狮网主办的“2016年新媒体视频营销大会”，大家聚集一堂与投资大咖们来感受“视频营销的力量”！
这是一次企业互联网营销方式的变革大会，视频时代的到来彻底点燃万千企业营销创意的新思想，新媒体与视频的结合成为互联网营销新风口。
				</div>
                <div class="active2Top">
	                 <img src="${imgPath }/introduce/activity/activity2-1.jpg">
	                 <img src="${imgPath }/introduce/activity/activity2-2.jpg">
	                 <img src="${imgPath }/introduce/activity/activity2-3.jpg">
                </div>
                <img class="active2Bottom" src="${imgPath }/introduce/activity/activity2-4.jpg">
	
		    </div>
		    <div class="infoTitle">
		        <div>拍片网movie 2.0论坛</div>
		        <div>2016年5月至今</div>
		        <div>《MOVIE2.0论坛》是每周举办的线下影视人聚集的社群论坛，以主创见面会，创作分享会，项目推介会等为内容，打造影视行业纯净的资源生态圈；先后有黄国宾、邢健、冷小张、上官凌月、冯悦、郑来志等影视人到场参与《MOVIE2.0论坛》中国影视人沙龙。至今已经成功举办29期。
				</div>
				 <div class="active3Top">
	                 <img src="${imgPath }/introduce/activity/activity3-1.jpg">
	                 <img src="${imgPath }/introduce/activity/activity3-2.jpg">
                </div>
                <img class="active3Bottom" src="${imgPath }/introduce/activity/activity3-3.jpg">
		    </div>
		     <div class="infoTitle">
		        <div>创业邦－创新中国</div>
		        <div>2016年9月21日 杭州洲际酒店</div>
		        <div>2016 创新中国秋季峰会主题为“科技改变生活”，将通过八大现场路演及展览活动等多种形式为业内人士搭建对话平台，为企业顶层人士、行业专家提供社交和沟通互联，分享与交流经验的机会。</br>孙彬代表拍片网参加Bang Camp毕业秀和企业服务专场的两场路演，就行业痛点、拍片网的运营模式、标准化进程和团队情况等内容与在场的创业者和投资人进行了深度交流。 
				</div>
               <div class="active4Top">
	                 <img src="${imgPath }/introduce/activity/activity4-1.jpg">
	                 <img src="${imgPath }/introduce/activity/activity4-2.jpg">
	                 <img src="${imgPath }/introduce/activity/activity4-3.jpg">
                </div>
		    </div>
		    <div class="infoTitle">
		        <div>一块投吧</div>
		        <div>2016年10月9日</div>
		        <div>深圳卫视《一块投吧》栏目是一档大型创投类电视节。节目讲求专业化、商业化的特点。参加节目的明星投资人有俞敏洪、张泉灵、邓锋、林依轮。</br>
夏攀代表拍片网参加了《一块投吧》节目的录制，面对4位明星投资人的问题，从容介绍了拍片网的运营模式，竞争优势等核心问题。</div>
                 <div class="active5Top">
	                 <img src="${imgPath }/introduce/activity/activity5-1.jpg">
	                 <img src="${imgPath }/introduce/activity/activity5-2.jpg">
                </div>
		    </div>
		    <div class="infoTitle">
		        <div>团队建设</div>
		        <div>2015年至今</div>
		        <div>我们是一个充满正能量的团队，热爱电影，热爱网络，热爱户外活动。公司成立以来，组织了多次外出郊游，踏青采风，感受自然赋予我们的无穷能量。</div>
                <div class="active6Top">
	                 <img class="leftImg" src="${imgPath }/introduce/activity/activity6-1.jpg">
	                 <div class="rightImg">
	                   <img  src="${imgPath }/introduce/activity/activity6-2.jpg">
	                   <img  src="${imgPath }/introduce/activity/activity6-3.jpg">
	                 </div>
                </div>
		    </div>
		    <div class="infoTitle">
		        <div>公司年会/生日会</div>
		        <div>2015年~2017年</div>
		        <div>我们又是一群年轻，热情，才华横溢的文艺青年。每逢公司组织的聚餐，联欢会，年会等活动，大家拿出看家本领，当然各种奖项也是人人有份啦。</div>
                <div class="active7Top">
	                   <img  src="${imgPath }/introduce/activity/activity7-1.jpg">
	                   <img  src="${imgPath }/introduce/activity/activity7-2.jpg">
                </div>
		    </div>
		</div>		
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
                                            <div class="tel"><a href="tel:4006609728">400-660-9728</a></div>
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
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
</body>
</html>