<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/factory/factory.css" var="factoryCss"/>
<%-- import JS --%>
<%-- <spring:url value="/resources/js/common.js" var="commonJs"/> --%>
<%-- <spring:url value="/resources/js/activity/pch5card.js" var="pch5cardJS"/> --%>

<spring:url value="/resources/js/factory/factory.js" var="factoryJS"/>
<spring:url value="/resources/js/factory/jquery-1.8.3.min.js" var="factorymJS"/>
<spring:url value="/resources/js/factory/jquery.SuperSlide.2.1.1.js" var="factoryssJS"/>
<spring:url value="/resources/js/factory/leftTime.js" var="factoryltJS"/>
<spring:url value="/resources/js/factory/bplayer.js" var="factorybpJS"/>
<spring:url value="/resources/js/factory/index.js" var="factoryindexJS"/>

<spring:url value="/resources/images" var="imgPath" />
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
<meta name="description" content="找宣传片拍摄公司，来拍片工厂，中国首个一站式影视创作基地。搭建影视产业与金融行业之间的合作桥梁，影视界行业大咖皆汇聚于此，让B端客户快速找到符合营销需求的宣传片类型和拍片导演。">
<meta name="keywords" content="拍片工厂,宣传片拍摄公司,影视创作基地,影视大咖">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>拍片工厂-宣传片拍摄公司-影视创作基地-影视大咖-拍片网</title>
<link rel="stylesheet" href="${factoryCss}">
<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
<script type="text/javascript" src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->
</head>
<body>
	
	
	<input type='hidden' id='csrftoken'>
 <!-- top -->
 <div class="top">
		<div class="container">
    		<a href="https://www.apaipian.com" target="_blank">
    		<img class="logo fl" src="${imgPath}/factory/bannerLogoR.png" alt="拍片网" /></a>
            <ul class="nav fl">
            	<!-- <li><a href="#">工场首页</a></li> -->
            	<li><a href="https://www.apaipian.com/cost/cal" target="_blank">估算成本</a></li>
            	<li><a href="https://www.apaipian.com/list.html" target="_blank">精品案例</a></li>
            	<li><a href="https://www.apaipian.com/order-flow.html" target="_blank">服务流程</a></li>
				<li><a href="http://zhuanti.apaipian.com" target="_blank">特色专题</a></li>
            	<li><a href="https://www.apaipian.com/news-list.html" target="_blank">新闻资讯</a></li>
            </ul>
			<div class="search fl">
				<input placeholder="作品名称，类型，风格，公司信息" id="search-q">
				<i onclick="SearchVideo()"></i>
			</div>
			<!-- <p class="login fr"><a href="https://www.apaipian.com/login">登录</a> &emsp; <a href="https://www.apaipian.com/register">注册</a></p> -->
            <div class="clear"></div>
		</div>
	</div>
	<div class="main_5">
    <div class="banner slideBox" id="slideBox" style="height: 524px;">
			<div class="bd">
				<ul>
					<li>
						<img src="${imgPath}/factory/banner3.jpg" />
						<h1>一站式影视制作中心</h1>
						<h3>工作室/摄影棚/化妆间/设备租赁/后期制作等 支持线下影视生产全流程</h3>
					
					</li>
					<li>
						<img src="${imgPath}/factory/banner2.jpg" />
						<h1>影视创业联盟孵化器</h1>
						<h3>项目路演/项目对接/投融资洽谈/人脉拓展/合作共赢/众创空间</h3>
					</li>
					<li>
						<img src="${imgPath}/factory/banner1.jpg" />
						<h1>影视项目投融资平台</h1>
						<h3>融资路演/项目咨询/项目对接/撮合交易/投融资服务</h3>
					</li>
				</ul>
			</div>
			<a class="prev" href="javascript:void(0)"></a>
			<a class="next" href="javascript:void(0)"></a>
    </div>
   </div>
   <!-- 影视创作基地 -->
    <div class="main_1">
    	<div class="container">
    		<h2>中国首个一站式影视创作基地</h2>
    		<h4>做影视的有趣人类都群居在这里</h4>
    		<div class='boxs' style="background: url(/resources/images/factory/base1.png) no-repeat;background-size: 100%;">
    			<ul class='left'>
    				<li content='a'  class='flower'>导演工作室<span class='flowes'></span></li>
    				<li content='b'>后期工作站<span></span></li>
    				<li content='c'>剧组筹备区<span></span></li>
    				<li content='d'>化妆间<span></span></li>
    				<li content='e'>设备租赁<span></span></li>
    				<li content='f'>模块化摄影棚<span></span></li>
    				
    			</ul>
    			<ul class='right' style="position: absolute;">
    				<li content='g'>星光电影院<span></span></li>
    				<li content='h'>星光咖啡厅<span></span></li>
    				<li content='i'>遵义会议<span></span></li>
    				<li content='j'>胶囊公寓<span></span></li>
    				<li content='k'>拍片工厂活动区<span></span></li>
    				<li content='l'>拍片工厂办公区<span></span></li>
    			</ul>
    		</div>
    		
    	</div>
    	
    </div>
    <!--行业大咖  -->
    <div class="main_2">
    	<div class="container">
    		<h2>行业大咖</h2>
    		<h4>搭建影视产业与金融行业之间的合作桥梁，2017年提供52场项目投资路演见面会</h4>    		
    		<div class="banner slideBox" id="slideBox" style="height: 640px;">
				<div class="bd" style="height:630px;">
					<ul>
						<li>
							<div class='bigbox'>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>刘纲</div>
										<div class='descript' style="width: 158px;">创新投资集团京津及华北地区总经理</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>庞洪</div>
										<div class='descript' style="width: 95px;">麒麟影业CEO   《画皮2》出品人</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>朱辉龙</div>
										<div class='descript' style="width: 143px;">优酷土豆集团高级副总裁合一影业CEO</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>夏锐</div>
										<div class='descript' style="width: 147px;">UMG联播传媒董事长总裁北电五度基金董事长</div>
									</div>	
								</div>	
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>柯回</div>
										<div class='descript' style="width: 125px;">北京首印传媒有限公司董事长</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>高天羿</div>
										<div class='descript' style="width: 75px;">天鹅盛世影业</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>吴毅</div>
										<div class='descript' style="width: 110px;">鹿港科技影视掌门人</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>陆远贵</div>
										<div class='descript' style="width: 155px;">广州耀辰影视传媒公司董事长</div>
									</div>	
								</div>
							</div>
						</li>  
			
						<li>
							<div class='bigbox'>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>高育新</div>
										<div class='descript' style="width: 183px;">北京泰格尔影视文化传媒有限公司董事长</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>董向丹</div>
										<div class='descript' style="width: 155px;">北京掌取科技股份有限公司副总经理</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>马全利</div>
										<div class='descript' style="width: 145px;">北京昊海金桥广告有限公司</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>许诗敏</div>
										<div class='descript' style="width: 133px;">澳门联盟影娱集团创始人</div>
									</div>	
								</div>	
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>杨百年</div>
										<div class='descript' style="width: 155px;">融通中外文化产业集团联合创始人</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>高天羿</div>
										<div class='descript' style="width: 107px;">北京世万影视基金创始合伙人</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>杨文辉</div>
										<div class='descript' style="width: 158px;">中国文化书院影视文化研究院秘书长</div>
									</div>	
								</div>
								<div class='smallbox'>
									<div class='hides'>
										<div class='name'>胡敏</div>
										<div class='descript' style="width: 154px;">北京电影学院电影故事餐吧创始人</div>
									</div>	
								</div>
	
							</div>
						</li> 
					
					</ul>
				</div>
				<a class="prev" style="background: url(/resources/images/factory/slider-arrow.png) -173px 5px no-repeat;" href="javascript:void(0)"></a>
				<a class="next" style="background: url(/resources/images/factory/slider-arrow.png) -55px 5px no-repeat;" href="javascript:void(0)"></a>
    		</div>
    	
    	</div>
    </div>
   
   
   
    <div class="main_3">
   <!--  <div class='mask'> -->
    	<div class="container">
    		<h2>合作伙伴</h2>
    		<h4>做影视的有趣人类都群居在这</h4>
    		<ul>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			<li>	
    				<div class='bai'></div>
    			</li>
    			 
    		</ul>
    	</div>
   <!--  </div> -->
    </div>
   <!--底部  -->
       <div class="foot">
        <div class="container">
            <ul class="foot_nav">
                <li class="gzh"><img src="${imgPath}/factory/code_pai.png" width="111" height="110"><br>扫一扫 关注官方微信</li>
                <li class="f_nav">
                    <h2>登录</h2>
                    <a class="sml cusLogin" href="https://www.apaipian.com/login?role=user" target="_blank">客户登录</a><br>
                    <a class="sml proLogin" href="https://www.apaipian.com/login?role=director" target="_blank">导演登陆</a><br><br>
                    <a class="sml reg" href="https://www.apaipian.com/register" target="_blank">注册</a>
                </li>
                <li class="f_nav">
                    <h2>关于拍片网</h2>
                    <a href="https://www.apaipian.com/about-us.html" target="_blank">了解我们</a><br>
                    <a href="https://www.apaipian.com/member.html#join-us" target="_blank">加入我们</a><br>
                    <a href="https://www.apaipian.com/company-activity.html" target="_blank">公司活动</a><br>
                    <a href="https://www.apaipian.com/member.html#activityPart" target="_blank">团队介绍</a>
                </li>
                <li class="f_nav">
                    <h2>服务</h2>
                    <a href="https://www.apaipian.com/order-flow.html" target="_blank">服务流程</a><br>
                    <a href="https://www.apaipian.com/company-service.html#servicePart" target="_blank">服务协议</a>
                </li>
                <li class="f_nav">
                    <h2>在线联系我们</h2>
                    <a class="sml cusSer codeshow" href="Javascript:void(0)">客户客服
						<div class="code hide"><img src="${imgPath}/factory/code_ke.jpg"><br>客户客服</div>
					</a><br>
                    <a class="sml proSer codeshow" href="Javascript:void(0)">导演客服
						<div class="code hide"><img src="${imgPath}/factory/code_dao.jpg"><br>导演客服</div>
					</a><br>
                    <a class="sml email" href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a>
                </li>
                <li class="f_nav">
                    <h2>咨询电话</h2>
                    <p>
                        <font>400-660-9728</font><br>工作时间 9:00-18:00 (周一至周五)</p>
                </li>
            </ul>
            <div class="bot">
                <span style="color: #9a9da2;">版权信息</span><br>本站视频作品采用知识共享署名-非商业性使用 本站不提供任何视听上传服务<br>所有内容均来自视频分享站点所提供的公开引用资源<br>© 2018 北京拍片乐科技有限公司 京ICP备16066831号-1
            </div>
        </div>
    </div>
    
		
	<!-- video-->
    <script type="text/javascript" src="${factoryJS}"></script>
    <script type="text/javascript" src="${factorymJS}"></script>
    <script type="text/javascript" src="${factoryssJS}"></script>
    <script type="text/javascript" src="${factoryltJS}"></script>
    <script type="text/javascript" src="${factorybpJS}"></script>
    <script type="text/javascript" src="${factoryindexJS}"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    
</body>
</html>
