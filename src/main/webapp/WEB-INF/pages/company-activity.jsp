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
	<meta name="keywords" content="团队活动,公司活动,拍片网">
	<meta name="description" content="拍片网团队线上线下的活动简介">
	<title>拍片网团队活动_拍片网公司活动－拍片网</title>
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
	<jsp:include flush="true" page="header.jsp"></jsp:include>   
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

		    <div class="logoImg">
		    	<img src="${imgPath}/introduce/member/company.svg">
		      </div>
		    <div class="infoTitle">
		        <div>共享未来－中国视频行业领袖峰会</div>
		        <div>2017年2月27日 北京海淀新世纪日航</div>
		        <div>由拍片网主办，千位视频行业龙头聚首在北京，一场有关“共享未来”的视频行业争锋一触即发。多位顶级创投圈、影视行业名人和全国各地的视频行业领袖，聚首“共享未来”的高峰交流，
共同讨论互联网时代下的影视行业资源共享及连接资源等于连接未来的观点。</div>
                <img  class="active1" src="${imgPath }/introduce/activity/activity1-1.jpg" alt="拍片网合伙人">
                <img  class="active1-2" src="${imgPath }/introduce/activity/activity1-2.jpg" alt="视频行业领袖峰会">
		    </div>
		     <div class="infoTitle">
		        <div>视频营销大会</div>
		        <div>2016年10月10日 北京日坛宾馆</div>
		        <div>由拍片网联合镖狮网主办的“2016年新媒体视频营销大会”，大家聚集一堂与投资大咖们来感受“视频营销的力量”！
这是一次企业互联网营销方式的变革大会，视频时代的到来彻底点燃万千企业营销创意的新思想，新媒体与视频的结合成为互联网营销新风口。
				</div>
                <div class="active2Top">
	                 <img src="${imgPath }/introduce/activity/activity2-1.jpg" alt="拍片网夏攀">
	                 <img src="${imgPath }/introduce/activity/activity2-2.jpg" alt="视频营销大会">
	                 <img src="${imgPath }/introduce/activity/activity2-3.jpg" alt="拍片网张立虎">
                </div>
                <img class="active2Bottom" src="${imgPath }/introduce/activity/activity2-4.jpg" alt="拍片网投资人">
	
		    </div>
		    <div class="infoTitle">
		        <div>拍片网movie 2.0论坛</div>
		        <div>2016年5月至今</div>
		        <div>《MOVIE2.0论坛》是每周举办的线下影视人聚集的社群论坛，以主创见面会，创作分享会，项目推介会等为内容，打造影视行业纯净的资源生态圈；先后有黄国宾、邢健、冷小张、上官凌月、冯悦、郑来志等影视人到场参与《MOVIE2.0论坛》中国影视人沙龙。至今已经成功举办29期。
				</div>
				 <div class="active3Top">
	                 <img src="${imgPath }/introduce/activity/activity3-1.jpg" alt="拍片网孙彬">
	                 <img src="${imgPath }/introduce/activity/activity3-2.jpg" alt="拍片网movie2.0论坛">
                </div>
                <img class="active3Bottom" src="${imgPath }/introduce/activity/activity3-3.jpg" alt="movie2.0论坛活动视频">
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
	                 <img class="leftImg" src="${imgPath }/introduce/activity/activity6-1.jpg" alt="公司活动宣传片">
	                 <div class="rightImg">
	                   <img  src="${imgPath }/introduce/activity/activity6-2.jpg" alt="团队建设宣传片">
	                   <img  src="${imgPath }/introduce/activity/activity6-3.jpg" alt="公司活动视频">
	                 </div>
                </div>
		    </div>
		    <div class="infoTitle">
		        <div>公司年会/生日会</div>
		        <div>2015年~2017年</div>
		        <div>我们又是一群年轻，热情，才华横溢的文艺青年。每逢公司组织的聚餐，联欢会，年会等活动，大家拿出看家本领，当然各种奖项也是人人有份啦。</div>
                <div class="active7Top">
	                   <img  src="${imgPath }/introduce/activity/activity7-1.jpg" alt="公司年会宣传片">
	                   <img  src="${imgPath }/introduce/activity/activity7-2.jpg" alt="生日会视频">
                </div>
		    </div>
		</div>		
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
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${suggestJs }"></script>
	<script src="${waypointsJs }"></script>
</body>
</html>