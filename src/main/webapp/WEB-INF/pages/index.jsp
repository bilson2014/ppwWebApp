<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
<%-- import Css --%>
<spring:url value="/resources/css/index.css" var="indexCss" />
<spring:url value="/resources/images" var="imgPath" />
<!--js  -->
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/index.js" var="indexJs" />
<%-- <spring:url value="/resources/js/figlet.js" var="figletJs" /> --%>

<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/js/youku-player.js" var="ykJs" />
<spring:url value="/resources/lib/map/echarts-all-3.js" var="e1" />
<spring:url value="/resources/lib/map/ecStat.min.js" var="e2" />
<spring:url value="/resources/lib/map/dataTool.min.js" var="e3" />
<spring:url value="/resources/lib/map/china.js" var="e4" />
<!--map  -->
<!--       <script type="text/javascript" src="/resources/lib/map/echarts-all-3.js"></script>
       <script type="text/javascript" src="/resources/lib/map/ecStat.min.js"></script>
       <script type="text/javascript" src="/resources/lib/map/dataTool.min.js"></script>
       <script type="text/javascript" src="/resources/lib/map/china.js"></script> -->
<!--  <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script> -->
<!--  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script> -->
<!--   <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script> -->
<!DOCTYPE html>
<html class="no-js">
<link rel="shortcut icon" href="${imgPath}/favicon.ico">
<script type="text/javascript" src="${e1}"></script>
<script type="text/javascript" src="${e2}"></script>
<script type="text/javascript" src="${e3}"></script>
<script type="text/javascript" src="${e4}"></script>



<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords"
	content="宣传片,企业宣传片,宣传片制作,tvc广告,宣传片拍摄,产品宣传片,产品广告片,广告片拍摄,mg动画,拍片网">
<meta name="description"
	content="拍片网专业提供企业宣传片制作、产品tvc广告片拍摄、mg动画制作等商业视频服务。宣传片、广告片、TVC、mg动画等价格劲省30%。企业宣传片导演及tvc广告拍摄团队遍布北京、上海、杭州等全国75个主要城市。">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>企业宣传片-宣传片制作-tvc广告-产品广告片拍摄-MG动画-拍片网</title>
<link rel="stylesheet" href="/resources/lib/swiper/swiper4.css">
<link rel="stylesheet" href="${indexCss}">
</head>


<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<r:identity role="provider">
		<input type="hidden" id="rolephone" value="1314520ppw" />
		<input type="hidden" id="roletype" value="provider">
		<input type="hidden" id="role" value="创作团队" />
	</r:identity>
	<r:identity role="customer">
		<input type="hidden" id="rolephone" value="1314520ppw" />
		<input type="hidden" id="roletype" value="customer">
		<input type="hidden" id="role" value="客户" />
	</r:identity>
	<r:identity role="employee">
		<input type="hidden" id="role" value="内部员工" />
		<input type="hidden" id="rolephone" value="1314520ppw" />
		<input type="hidden" id="rolephoneImg" value="1314520ppw" />
		<input type="hidden" id="roletype" value="employee">
	</r:identity>

	<jsp:include flush="true" page="header.jsp"></jsp:include>
	<div class="pagev">
		<!--第一屏 -->
		<div class="setVideoContent">
			<div
				style="width: 100%; height: 100%; background: gray; opacity: 0; position: absolute;"></div>
			<video autoplay class="video" loop id="setTopVideo"
				src="https://www.apaipian.com/product/video/flexvideo-v2.mp4"
				poster="${imgPath}/index2/videoBanner.jpg"></video>
			<div class="indexContent" style="z-index: 10">
				<div class="swiper-container swiper-banner flexslider">
					<div class="swiper-wrapper swiper-banner-slide">
						<div class="swiper-slide">
							<ul>
								<li class="title" id="bannerTitleAn1">商业视频出品量遥遥领先</li>
								<li class="desc" id="DescAn1">服务超过1500家客户 制作超过3000条商业视频</li>
							</ul>
						</div>
						<div class="swiper-slide">
							<ul>
								<li class="title" id="bannerTitleAn2">汇聚海内外优秀视频创作者</li>
								<li class="desc" id="DescAn2">导演 / 编剧 / 策划 / 制片 / 摄影 /
									55800+行业专家为您服务</li>
							</ul>
						</div>
						<div class="swiper-slide">
							<ul>
								<li class="title" id="bannerLast">高品质 低成本 极速出片</li>
								<li class="desc" id="DescLast">全流程高质量监管 低于行业价30% 72小时极速出片</li>
							</ul>
						</div>
					</div>
					<div class="swiper-pagination swiper-pagination-banner"></div>
				</div>
				<div class="btn-c-r btn-left">拍片多少钱</div>
				<div class="btn-c-r btn-right">如何拍好片</div>
			</div>
		</div>
		<div class="otherDiv" style="overflow: auto">

			<div class="searchDiv">
				<div class="titleClass">
					<div>一站式商业视频解决方案</div>
					<div></div>
				</div>
				<div class="setProdct">
				  <a href="list-qyxcp/">
					<div class="pItem home-search bb bbox " data-text="企业宣传">
						<img src="${imgPath}/index2/p1.png" />
						<div class="cn">企业宣传</div>
						<div class="en">ENTERPRISE PROMOTIONAL VIDEO</div>
					</div>
				 </a>
				  <a href="list-cpgg/">	
					<div class="pItem home-search bb  bbox " data-text="广告TVC">
						<img src="${imgPath}/index2/p2.png" />
						<div class="cn">广告TVC</div>
						<div class="en">TV COMMERCIALS</div>
						<div class="bl"></div>
					</div>
				 </a>
				  <a href="list-wdy/">	
					<div class="pItem home-search bb  bbox" data-text="微电影">
						<img src="${imgPath}/index2/p3.png" />
						<div class="cn">微电影</div>
						<div class="en">MICRO FILMS</div>
						<div class="bl"></div>
					</div>
				 </a>
				  <a href="list-mg/">	
					<div class="pItem home-search bb  bbox" data-text="MG动画">
						<img src="${imgPath}/index2/p4.png" />
						<div class="cn">MG动画</div>
						<div class="en">MOTION GRAPHICS</div>
						<div class="bl"></div>
					</div>
				 </a>
				  <a href="list-3d/">	
					<div class="pItem home-search btbox" data-text="三维展示">
						<img src="${imgPath}/index2/p5.png" />
						<div class="cn">三维展示</div>
						<div class="en">3D PRODUCT ANIMATION</div>
					</div>
				 </a>
				  <a href="list-ds/">	
					<div class="pItem home-search btbox" data-text="电商视频">
						<img src="${imgPath}/index2/p6.png" />
						<div class="cn">电商视频</div>
						<div class="en">E-COMMERCE PRODUCT VIDEO</div>
						<div class="bt"></div>
					</div>
				 </a>	
				  <a href="activity/Pbusinesscard">
					<div class="pItem home-search  btbox" data-text="视频名片">
						<img src="${imgPath}/index2/p7.png" />
						<div class="cn">视频名片</div>
						<div class="en">VIDEO CARD</div>
						<div class="bt"></div>
					</div>
				 </a>
				  <a href="list-lysp/">	
					<div class="pItem home-search  btbox" data-text="路演视频">
						<img src="${imgPath}/index2/p8.png" />
						<div class="cn">路演视频</div>
						<div class="en">ROADSHOW VIDEO</div>
						<div class="bt"></div>
					</div>
				  </a>	
				</div>
			</div>
			<!-- 结束 -->
			<!-- 案例 -->
			<div class="videoProduct" id="product">
				<div class="orderPlay">预定拍摄</div>
				<a href="/list.html"><div class="orderMore">查看更多案例</div></a>
				<div class="titleClass">
					<div>部分合作案例</div>
					<div></div>
				</div>
				<img class="videoBack" src="${imgPath}/index2/product.png">
				<div class="swiper-container swiperProductSet" >
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="productItem">
								<div class="productLeft">
									<img src="${imgPath}/index2/maotai1.png">
									<div class="leftTitle">茅台100周年纪念电影</div>
									<div class="leftSTitle">向世界传播中国品牌</div>
									<div class="leftContent">
										拍片网为茅台提供了影片创意策划，剧本撰写，并组建了600余人的创作团队创作者，包括《奥林匹克美术大会影片》的导演、《中国国家形象宣传片》的摄影指导、电影《建国大业》的美术指导、《奥运福娃漫游记》的动画导演等知名创作人。</div>
									<a href="/play/9_389.html">了解更多</a>
								</div>
								<div class="productVideo maotai">
									<img src="${imgPath}/index2/maotai.png">
								</div>
								<div class="productPeople">
									<img class="productIndex" src="${imgPath}/index2/one.png">
									<div class="peopleTitle">
										<img src="${imgPath}/index2/product.png">
										<div>
											夏攀说<br>拍片网公司总裁
										</div>
									</div>
									<div class="peopleContent">
										<span>茅台集团文化部负责人：</span><br>"
										《1915金奖之旅》作为中国酒文化城的镇馆影片，成功再现了茅台酒成为世界三大蒸馏酒的辉煌历程。我们对影片整体品质非常满意。”
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="productItem">
								<div class="productLeft">
									<img src="${imgPath}/index2/product2.png">
									<div class="leftTitle">网易考拉海购TVC</div>
									<div class="leftSTitle">互联网的第一定律 唯快不破</div>
									<div class="leftContent">接到网易考拉海购的创意简报后，拍片网在24小时内完成了影片的团队组建和筹备工作，
										在仅有的4小时拍摄时间里，圆满的完成了佟大为的镜头拍摄任务。</div>
									<a href="/play/9_3577.html">了解更多</a>
								</div>
								<div class="productVideo kaola">
									<img src="${imgPath}/index2/kaola.png">
								</div>
								<div class="productPeople">
									<img class="productIndex" src="${imgPath}/index2/two.png">
									<div class="peopleTitle">
										<img src="${imgPath}/index2/product.png">
										<div>客户说</div>
									</div>
									<div class="peopleContent">
										<span>网易考拉品牌总监：</span><br> " 拍片网非常专业，标准的制片管理流程，
										节省了大量沟通成本，视频管家的服务也非常贴心，总之非常满意。"
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="productItem">
								<div class="productLeft">
									<img src="${imgPath}/index2/product3.png">
									<div class="leftTitle">万达招采平台宣传片</div>
									<div class="leftSTitle">更多的创作团队 更好的服务质量</div>
									<div class="leftContent">万达招采平台宣传片承担着向5万多名供应商介绍阳光合作模式的重任。
										从项目启动到交付，时间非常紧急，创作团队度过了数十个不眠之夜，如期交付。
										所有的中大型企业都在自建供应商管理平台，拍片网5万名创作者可以无缝对接到企业的管理系统中， 满足客户一切视频的需求。</div>
									<a href="/play/18_17154.html">了解更多</a>
								</div>
								<div class="productVideo wanda">
									<img src="${imgPath}/index2/wanda.png">
								</div>
								<div class="productPeople">
									<img class="productIndex" src="${imgPath}/index2/three.png">
									<div class="peopleTitle">
										<img src="${imgPath}/index2/product.png">
										<div>
											夏攀说<br>拍片网公司总裁
										</div>
									</div>
									<div class="peopleContent">
										<span>招采平台项目负责人:</span><br>"拍片网的制片管理系统非常科学，很好的协助我们管理项目进度，在反复的修改中，很细心，有耐心，很满意。"
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Add Pagination -->
					<div class="swiper-pagination swiperProduct"></div>
				</div>
			</div>
			<!-- 案例结束 -->
			<!-- 合作-->
			<div class="ourFriends">
				<div class="titleClass">
					<div>部分合作品牌</div>
					<div></div>
				</div>
				<div class="content">全面覆盖互联网、科技、金融、电商、制造、教育、医药等行业</div>
				<div class="swiper-container swiper-friends ClientsSli">
					<div class="swiper-wrapper">
						<div class="swiper-slide ">
							<ul class="Clients">
								<li class="oneLi"><img src="${imgPath}/index2/f1.png"></li>
								<li class="oneLi"><img src="${imgPath}/index2/f2.png"></li>
								<li class="oneLi"><img src="${imgPath}/index2/f3.png"></li>
								<li class="oneLi"><img src="${imgPath}/index2/f4.png"></li>
								<li class="oneLi"><img src="${imgPath}/index2/f5.png"></li>
								<li class="oneLi"><img src="${imgPath}/index2/f6.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f7.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f8.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f9.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f10.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f11.png"></li>
								<li class="twoLi"><img src="${imgPath}/index2/f12.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f13.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f14.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f15.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f16.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f17.png"></li>
								<li class="threeLi"><img src="${imgPath}/index2/f18.png"></li>
							</ul>
						</div>
						<div class="swiper-slide">
							<ul class="Clients">
								<li class="setClients"><img src="${imgPath}/index2/f21.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f22.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f23.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f24.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f25.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f26.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f27.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f28.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f29.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f210.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f211.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f212.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f213.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f214.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f215.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f216.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f217.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f218.png"></li>
							</ul>
						</div>
						<div class="swiper-slide">
							<ul class="Clients">
								<li class="setClients"><img src="${imgPath}/index2/f31.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f32.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f33.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f34.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f35.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f36.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f37.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f38.png"></li>
								<li class="setClients"><img src="${imgPath}/index2/f39.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f310.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f311.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f312.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f313.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f314.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f315.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f316.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f317.png"></li>
								<li class="setClients"><img
									src="${imgPath}/index2/f318.png"></li>
							</ul>
						</div>

					</div>
					<div class="swiper-button-next nextFriend"></div>
					<div class="swiper-button-prev prevFriend"></div>
				</div>
			</div>

			<!-- 合作结束 -->
			<div class="mapDiv">
				<div class="mapTitle">
					<div class="top">
						55800<span>+影视创作人</span>
					</div>
					<div class="bot1">
						75<span>个主要城市</span>
					</div>
					<div class="bot2" style="color:#0C053A;">专业的影视团队为您服务</div>
				</div>
				<div id="container" style="height: 1000px"></div>
			</div>
			<!-- 数据-->
			<div class="data">
				<div class="dataContent">
					<img class='setContentImg' src="${imgPath}/index2/data.png">
					<div class="setContent">
						<div class="firstDiv">
							<div>数据</div>
							<div></div>
							<div>智能管理</div>
							</br>
							<div>让影视项目更高效</div>
						</div>
						<div class="redLine"></div>
						<div class="lastDiv">
							丰富的影视人才数据，云端全流程管理系统，</br>让项目执行效率提高200%。
						</div>
					</div>
				</div>
			</div>
			<!-- plant-->
			<div class="plant">
				<img style="width: 100%; min-width: 960px"
					src="${imgPath}/index2/bannerbot.png">
				<div class="setPlant">
					<div class="titleClass">
						<div style="color: white">拍片星球</div>
						<div></div>
					</div>
					<div class="content" style="color:white;font-size:16px;text-align:center;margin-top:30px">在浩瀚的宇宙中，连接一切视频生命体，只为创造最伟大的作品</div>
					<div class="plantContent">
						<a href="https://www.apaipian.com/special" target="_blank">
							<div class="plantItem">
								<img src='${imgPath}/index2/plant1.png'>
								<div>特色专题<br><span style="">视频创意研究实验室</span></div>
							</div>
						</a> <a href="news-list.html" target="_blank">
							<div class="plantItem">
								<img src='${imgPath}/index2/plant2.png'>
								<div>新闻资讯<br><span style="">行业技术探索空间站</span></div>
							</div>
						</a> <a href="http://factory.apaipian.com/" target="_blank">
							<div class="plantItem">
								<img src='${imgPath}/index2/plant3.png'>
								<div>拍片工厂<br><span style="">视频制造加工中子星</span></div>
							</div>
						</a>
					</div>
				</div>
			</div>
			<!-- 链接-->
			<div class="touzi">
				<div class="titleClass">
					<div>投资方</div>
					<div></div>
				</div>
				<div class="touDiv">
					<img class="logo1" src="${imgPath}/index2/tou1.png"> <img
						class="logo2" src="${imgPath}/index2/tou2.png"> <img
						class="logo3" src="${imgPath}/index2/tou3.png"> <img
						class="logo4" src="${imgPath}/index2/tou4.png">
				</div>

				<div class="titleClass">
					<div>友情链接</div>
					<div></div>
				</div>

				<div class="ourFriendsLink">
					<img class="logo5" alt="图片直播"
						src="/resources/images/index/friend1.png"> <img
						class="logo6" alt="特创易LOGO设计"
						src="/resources/images/index/friend2.png"> <img
						class="logo7" alt="大数据整合营销"
						src="/resources/images/index/friend3.png"> <img
						class="logo8" alt="北京网站制作"
						src="/resources/images/index/friend4.png"> <img
						class="logo9" alt="企鹊桥" src="/resources/images/index/friend5.png">
					<img class="logo10" alt="大德通众包平台"
						src="/resources/images/index/friend6.png"> <img
						class="logo11" alt="专利申请"
						src="/resources/images/index/friend7.jpg">
				</div>

			</div>

			<!-- end-->
			<jsp:include flush="true" page="foot.jsp"></jsp:include>
		</div>

	</div>
</body>


<input id ='inputText' value="dasdada">
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${ykJs}"></script>
<script type="text/javascript" src="https://player.youku.com/jsapi"></script>
<script type="text/javascript" src="resources/lib/swiper/swiper4.js"></script>
<script type="text/javascript" src="${indexJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<%-- <script type="text/javascript" src="${figletJs}"></script> --%>


</html>
