<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/index.css" var="indexCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
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
<meta name="keywords" content="企业形象宣传片,宣传片制作,产品宣传片制作,北京宣传片拍摄,tvc广告片,品牌微电影,mg动画制作公司">
<meta name="description" content="拍片网是专业的商业视频服务平台,主要为中小企业提供:企业形象宣传片,宣传片制作,产品tvc广告片拍摄,品牌微电影制作,mg动画制作等视频内容。拍片就上拍片网！">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>拍片网-商业视频制作服务平台,宣传片,tvc广告,短视频制作</title>
<link rel="stylesheet" href="/resources/css/index.css">
<link rel="stylesheet" href="/resources/lib/swiper/swiper.min.css">
<link rel="stylesheet"
	href="resources/lib/Bootstrap/css/bootstrap.min.css">
<script type="text/javascript"
	src="resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
<script type="text/javascript"
	src="resources/lib/jquery/waypoints.min.js"></script>
<script type="text/javascript" src="resources/lib/swiper/swiper.js"></script>
<script type="text/javascript" src="resources/lib/Clamp/clamp.js"></script>
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
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
     <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	 </r:identity>
	<div class="page">
		<div class="advanBack"></div>

	     <jsp:include flush="true" page="header.jsp"></jsp:include> 
	     
		<!-- 轮播 start -->
		<div class="flex-wrap">
		<div class="changeHideHeader"></div>
			<div class="flexVideo">
			    <div class="oVideo"></div>
				<video preload="auto" loop="" autoplay
					poster="/resources/images/banner/host.JPG" class="video-bg">
					<source src="http://www.apaipian.com/product/video/flexvideo.mp4" type="video/mp4">
				</video>
			</div>
			<div class="swiper-container swiper-banner flexslider">
				<div class="swiper-wrapper swiper-banner-slide">
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerTitleAn1">专业的商业视频服务平台</li>
							<li class="desc" id="DescAn1">35800+ 导演 / 编剧 / 摄影师 /影视专家为您服务</li>
						</ul>
					</div>
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerTitleAn2">免费创意策划 72小时极速出片</li>
							<li class="desc" id="DescAn2">专业视频管家 一站式视频服务 全流程质量监管</li>
						</ul>
					</div>
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerLast">低预算拍大片 不满意全额退款</li>
							<li class="desc" id="DescLast">低于行业均价30%以上 平台托管制作费</li>
						</ul>
					</div>
				</div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
			<div class="new-banner">
				<div class="search-box" id="banner-search">
					<form method="" action="" id="s-form" class="bannerOut">
					
					<div class="isShowItem">
					    <div class="itemInput">
						 <input id="csrftoken" type="hidden"
							value="${sessionScope.csrftoken }"> <input
							id="help-phone" name="indent_tele" placeholder="您的联系方式">
							<div class="errorSendCode" id="sendPhoneError">error</div>
						</div>
						<div class="itemInput">
						  <input id="getCheckCodes"  placeholder="输入验证码">
						  <div class="sendCode" id="sendCode">发送验证码</div>
						  <div class="errorSendCode" id="sendCodeError">error</div>
						</div>
					</div>
							
						<div class="dropdown" id="selectType">
							<button class="btn btn-default dropdown-toggle" type="button"
								id="dropdownMenu1" data-toggle="dropdown">
								<span id='indent_recomment'>宣传片</span>
								<div class="carets"></div>
							</button>
							<ul class="dropdown-menu dropdown-menuHost" id="selectUl" role="menu"
								aria-labelledby="dropdownMenu1">
								<li>宣传片</li>
								<li>广告片</li>
								<li>动画片</li>
								<li>病毒视频</li>
								<li>微电影</li>
								<li>证言影片</li>
								<li>公益片</li>
								<li>MV</li>
								<li>预告片</li>
								<li>纪录片</li>
							</ul>
						</div>
						
						<button class="helpYou btn-c-r" type="button">帮我推荐</button>
				
						<div class="wordPosition">
						<a href="/cost/cal" target="_blank">
							<div class="bannerWord" id="toCalculate">
									<img src="/resources/images/index/bannerOnline.png">拍片需要多少钱？点我计算真实成本！<span>>></span>
							</div>
					    </a>		
							<!-- <div class="bannerWord" id="showVideoS">
								<img src="/resources/images/index/bannerPai.png">拍片网介绍<span>>></span>
							</div> -->
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- 轮播 end -->
		<div class="tel">
			<a href="tel:${OFFICAL_PHONE }"> <span>服务热线 </span><span>${OFFICAL_PHONE }</span></a>
		</div>
		<!-- 宣传片 start -->
		<div class="FourModelColor">
			<div class="FourModel">
				<div class="FourBorder">
					<div class="fb1"></div>
					<div class="fb1b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four1"></div>
							<div class="home-search" data-text="宣传片">宣传片</div>
							<div class="home-search" data-text="宣传片">ADVERTISEMENTS</div>
						</div>
						<div class="typeBottom">
							<span class="home-search" data-text="宣传片">通过案例找创意>></span>
							 <span class="home-order" data-text="宣传片">立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb2"></div>
					<div class="fb2b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four2"></div>
							<div class="home-search" data-text="微电影">微电影</div>
							<div class="home-search" data-text="微电影">MICRO FILMS</div>
						</div>
						<div class="typeBottom">
							<span class="home-search" data-text="微电影">通过案例找创意>></span>
							<span class="home-order" data-text="微电影">立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb3"></div>
					<div class="fb3b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four3"></div>
							<div class="home-search" data-text="广告片">广告片</div>
							<div class="home-search" data-text="广告片">TV COMMERCIALS</div>
						</div>
						<div class="typeBottom">
							<span class="home-search" data-text="广告片">通过案例找创意>></span> 
							<span class="home-order" data-text="广告片">立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb4"></div>
					<div class="fb4b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four4"></div>
							<div class="home-search" data-text="病毒视频">病毒视频</div>
							<div class="home-search" data-text="病毒视频">VIRAL VIDEOS</div>
						</div>
						<div class="typeBottom">
							<span class="home-search" data-text="病毒视频">通过案例找创意>></span>
							 <span class="home-order" data-text="病毒视频">立即下单</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  宣传片 end -->
		<div class="backgroundCover">
			<div class="swiper-container swiperCover">
				<div class="hotLogo"></div>
				
			 <div class="leftClick "></div>
				<div class="rightClick"></div>
				<div id='product-container' class="swiper-wrapper"></div>
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
		<!-- 经典-->
		<div class="classical" id="classical">
				<div class="classicalArea">
					<div class="classicalLogo"></div>
					<a href="<spring:url value='/list.html'/>">
						<div class="directorWants">更多案例</div>
					</a>
					<div class="cardUl">
					</ul>
				</div>
			</div>
		</div>	
		<!-- 导演工作室-->
		<div class="director">
			<div class="swiper-container  swiper-director">
				<div class="directorLogo"></div>
				<a href="/register?role=director">
					<div class="directorWant">我要入驻</div>
				</a>
				<div class="swiper-wrapper" id="directorContent"></div>
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
		<!-- 导演工作室end-->
		<!-- 经典End-->
		<!-- 合作伙伴区域 start -->
		<div class="ourClients">
			<div class="hereClients">
				<div class="ClientsLogo"></div>
				<ul id="Clients">
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo r b down">
						<div></div>
					</li>
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo r b down">
						<div></div>
					</li>
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo b down">
						<div></div>
					</li>
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo r b down">
						<div></div>
					</li>
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo r b down">
						<div></div>
					</li>
					<li class="logo r b up">
						<div></div>
					</li>
					<li class="logo b down">
						<div></div>
					</li>
					<li class="logo r up">
						<div></div>
					</li>
					<li class="logo r down">
						<div></div>
					</li>
					<li class="logo r up">
						<div></div>
					</li>
					<li class="logo r down">
						<div></div>
					</li>
					<li class="logo r up">
						<div></div>
					</li>
					<li class="logo down">
						<div></div>
					</li>
					<li class="noLi">
						<div></div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 合作伙伴区域 end -->
		<!-- 平台优势-->
		<div class="advan" id="advan">
			<div class="bgBlack"></div>
			<div class="advanContent">
				<div class="bgLogo"></div>
				<div class="ca">
					<ul>
						<li>
							<center>
								<div class="caLogo" id="caLogo1"></div>
								<div>免费创意策划</div>
								<div class="oro" id="caLogo1w">专属视频管家一站式服务</div>
							</center>
						</li>
						<li>
							<center>
								<div class="caLogo" id="caLogo2"></div>
								<div>低预算拍大片</div>
								<div class="oro" id="caLogo2w">低于行业价30%</div>
							</center>
						</li>
						<li>
							<center>
								<div class="caLogo" id="caLogo3"></div>
								<div>72小时急速拍片</div>
								<div class="oro" id="caLogo3w">不满意全额退款</div>
							</center>
						</li>
					</ul>
				</div>
				<div class="service">
					<div class="bgLogo"></div>
					<ul>
						<li>
							<div>
								<img src="/resources/images/index/service1.png" alt="宣传片制作">
								1.需求沟通
							</div>
							<div>1对1沟通详细了解您的拍片需求</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service2.png" alt="宣传片制作">
								2.创意策划
							</div>
							<div>为您提供免费的创意策划提出合理建议</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service3.png" alt="宣传片制作">
								3.商务流程
							</div>
							<div>签订合作协议，制作费托管到平台</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service4.png" alt="宣传片制作">
								4.执行方案
							</div>
							<div>制定详细脚本，为您甄选最佳执行导演</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service5.png" alt="宣传片制作">
								5.拍摄制作
							</div>
							<div>前期拍摄和后期制作，视频管家全程监管</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service6.png" alt="宣传片制作">
								6.影片交付
							</div>
							<div>验收影片，不满意全额退款或重拍</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 平台优势end-->
		<!-- 新闻-->
		<div class="news">
			<div class="newsContent">
				<div class="newsLogo"></div>
				<ul id='news-container'>
				</ul>
			</div>
		</div>
		<!-- 新闻end-->
		<!-- 入驻-->
		<div class="join">
			<div class="joinContent">
				<ul>
					<li>
						<div>
							500<span>+</span><span>家</span>
						</div>
						<div>合作客户</div>
					</li>
					<li>
						<div>
							5960<span></span><span>部</span>
						</div>
						<div>累计制作影片</div>
					</li>
					<li>
						<div>
							35800<span>+</span><span>位</span>
						</div>
						<div>专业创作者加盟</div>
					</li>
				</ul>
				<div class="joinBtn">
					<div onclick="showOrder('宣传片');">我要拍片</div>
					<div onclick="window.location.href='/register'">入驻拍片网</div>
				</div>
			</div>
		</div>
		<!-- 入驻end-->
<!-- foot -->
          
         <jsp:include flush="true" page="foot.jsp"></jsp:include> 
         					<%-- <div class="foot3">
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
                                            <div class="noiconItem"><a href="<spring:url value="/login" />">找拍摄团队</a></div>
                                            <div class="noiconItem"><a href="<spring:url value="/provider/login" />">我要发作品</a></div>
                                        </div>
                                        <div class="topItem onLineWidth">
                                            <div class="title"><a>在线联系我们</a></div>
                                           <!--  <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no">客户客服</a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">导演客服</a></div> -->
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
                                        <div>本站视频作品采用知识共享署名-非商业性使用.本站不提供任何视听上传服务,</div>
                                        <div>所有内容均来自视频分享站点所提供的公开引用资源.</div>
                                        <div>© 2016 北京拍片乐科技有限公司 京ICP备16066831号-1 | 百度统计 站长统计</div>
                                    </div>
                                </div>
                            </div> --%>
                            <!--新版底部-->
	</div>
	<!-- video-->
	<script type="text/javascript" src="/resources/js/common.js"></script>
	<script type="text/javascript" src="/resources/js/juicer.js"></script>
	<script type="text/javascript" src="/resources/lib/jquery/jquery.flexslider-min.js"></script>
	<script type="text/javascript" src="/resources/js/index.js"></script>
</body>

</html>
