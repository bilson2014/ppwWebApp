
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="r" uri="/mytaglib"%>
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
<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>拍片网－首页</title>
<link rel="stylesheet" href="resources/css/homePage.css">
<link rel="stylesheet" href="resources/lib/swiper/swiper.min.css">
<link rel="stylesheet"
	href="resources/lib/Bootstrap/css/bootstrap.min.css">
<script type="text/javascript"
	src="resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="resources/lib/jquery/waypoints.min.js"></script>
<script type="text/javascript" src="resources/lib/swiper/swiper.js"></script>
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
	<div class="header" id="header">
		<div class="menu-bar nav">
			<div class="left-part">
				<a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<a href="<spring:url value='/mgr/index'/>" class="header-item">首页<span></span></a>
				<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
				<a href="<spring:url value='/direct/order'/>" class="header-item"
					target="_parent">精品案例<span></span></a> <a
					href="<spring:url value='/direct/order'/>" class="header-item"
					target="_parent">服务流程<span></span></a> <a
					class="header-item header-item-last" id="showVideo"
					target="_parent">
					<div class="showVideo"></div> 拍片网介绍 <span></span>
				</a>
			</div>
			<div class="middle-part">
				<div class="search-box">
					<form method="get" action="/search" id="s-form">
						<div class="bannerSearchFind"></div>
						<input type="text" size="16" autocomplete="off" id="search-q"
							name="q" placeholder="作品名称，类型，风格，公司信息" class="i-lucency" /> <a
							href="javascript:void(0);" class="go bk_white"
							onclick="return false;" id="s-btn"></a>
						<ul id="shelper" class="shelper-lucency"></ul>
					</form>
				</div>
			</div>
			<div class="right-part">
				<a class="header-item login-item" target="_self">登录</a> <a
					class="header-item login-item" target="_self">注册</a>
			</div>
		</div>
	</div>
	<div class="page">
		<div class="advanBack"></div>
		<!-- 轮播 start -->
		<div class="flex-wrap">
			<div class="flexVideo">
				<video preload="auto" loop="" autoplay
					poster="../resources/images/banner/flex2.jpg" class="video-bg">
					<source src="http://www.apaipian.com/product/video/flexvideo.mp4"
						type="video/mp4">
				</video>
			</div>
			<div class="swiper-container swiper-banner flexslider">
				<div class="swiper-wrapper swiper-banner-slide">
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerTitleAn1">专业的商业视频服务平台</li>
							<li class="desc" id="DescAn1">35800+ 导演 / 编剧 / 摄影师 /
								影视专家为您服务</li>
						</ul>
					</div>
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerTitleAn2">免费创意策划 72小时极速出片</li>
							<li class="desc" id="DescAn2">免费创意策划 72小时极速出片</li>
						</ul>
					</div>
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerLast">低预算拍大片 不满意全额退款</li>
							<li class="desc" id="DescLast">低预算拍大片 不满意全额退款</li>
						</ul>
					</div>
				</div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
			<div class="new-banner">
				<div class="search-box" id="banner-search">
					<form method="" action="" id="s-form" class="bannerOut">
						<div class="dropdown" id="selectType">
							<button class="btn btn-default dropdown-toggle" type="button"
								id="dropdownMenu1" data-toggle="dropdown">
								<span id='indent_recomment'>宣传片</span>
								<div class="carets"></div>
							</button>
							<ul class="dropdown-menu" id="selectUl" role="menu"
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
						<input id="csrftoken" type="hidden"
							value="${sessionScope.csrftoken }"> <input
							id="help-phone" name="indent_tele" placeholder="您的联系方式">
						<button class="helpYou" type="button">帮我推荐</button>
						<div class="wordPosition">
							<div class="bannerWord" id="toCalculate">
								<img
									src=" /resources/images/index/bannerOnline.png">在线估价<span>>></span>
							</div>
							<div class="bannerWord" id="showVideoS">
								<img src=" /resources/images/index/bannerPai.png">拍片网介绍<span>>></span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- 轮播 end -->
		<div class="tel">
			<a href="tel:4406609728"> <span>服务热线 </span><span>440-660-9728</span></a>
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
							<div>宣传片</div>
							<div>ADVERTISEMENTS</div>
						</div>
						<div class="typeBottom">
							<span>通过案例找创意>></span> <span>立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb2"></div>
					<div class="fb2b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four2"></div>
							<div>微电影</div>
							<div>MICRO FILMS</div>
						</div>
						<div class="typeBottom">
							<span>通过案例找创意>></span> <span>立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb3"></div>
					<div class="fb3b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four3"></div>
							<div>广告片</div>
							<div>TV COMMERCIALS</div>
						</div>
						<div class="typeBottom">
							<span>通过案例找创意>></span> <span>立即下单</span>
						</div>
					</div>
				</div>
				<div class="FourBorder">
					<div class="fb4"></div>
					<div class="fb4b"></div>
					<div class="FourContent">
						<div class="typeHover">
							<div class="four4"></div>
							<div>病毒视频</div>
							<div>VIRAL VIDEOS</div>
						</div>
						<div class="typeBottom">
							<span>通过案例找创意>></span> <span>立即下单</span>
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
				<div id='product-container' class="swiper-wrapper">
					<!-- <div class="swiper-slide coverSlide">
                        <div class="scaleDiv">
                            <img src=" /resources/images/index/test1.png">
                            <div class="coverContent">
                                <div class="">宣传片1</div>
                                <div>￥598,00</div>
                            </div>
                        </div>
                    </div>
                     -->
				</div>
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
		<!-- 经典-->
		<div class="classical" id="classical">
			<div class="classicalArea">
				<div class="classicalLogo"></div>
				<ul class="cardUl">
					<!-- <li>
                        <div class="videoCard">
                            <img src=" /resources/images/index/test2.png">
                            <div class="videoContet">
                                <div class="title">标题</div>
                                <div class="type">类型</div>
                                <div class="price">￥500</div>
                                <div class="realPrice">原价￥400</div>
                            </div>
                        </div>
                    </li> -->
				</ul>
			</div>
		</div>
		<!-- 导演工作室-->
		<div class="director">
			<div class="swiper-container  swiper-director">
				<div class="directorLogo"></div>
				<div class="directorWant">我要入驻</div>
				<div class="swiper-wrapper" id="directorContent">
					<!-- <div class="swiper-slide">
						<div class="m"></div>
						<div class="b"></div>
						<div class="directorContent">
							<img src=" /resources/images/index/test2.png">
							<div class="title">标题</div>
							<div class="line"></div>
							<div class="content">我就是内容啊啊啊啊打算大厦大打算大苏打大苏打撒旦大厦大啊打算大厦大打算大啊打算大厦大打算大打算大啊打算大厦大打算大
								打算大啊打算大厦大打算大</div>
							<div class="toProduct">作品集</div>
						</div>
					</div> -->
				</div>
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
								<img src="/resources/images/index/service1.png">
								1.需求沟通
							</div>
							<div>1对1沟通详细了解您的拍片需求</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service2.png">
								2.创意策划
							</div>
							<div>为您提供免费的创意策划提出合理建议</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service3.png">
								3.商务流程
							</div>
							<div>签订合作协议，制作费托管到平台</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service4.png">
								4.执行方案
							</div>
							<div>制定详细脚本，为您甄选最佳执行导演</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service5.png">
								5.拍摄制作
							</div>
							<div>前期拍摄和后期制作，视频管家全程监管</div>
						</li>
						<li>
							<div>
								<img src="/resources/images/index/service6.png">
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
					<!-- <li>
						<div class="newsTitle">新闻标题</div>
						<div class="newsLine"></div>
						<div class="Content">这就是内容这就是内容这就是内容这就是内容这就是内容这就是内容</div>
						<div class="newsMore">
							<span>了解更多</span><img
								src="/resources/images/index/newsMore.png">
						</div>
					</li> -->
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
					<div>我要拍片</div>
					<div>入驻拍片网</div>
				</div>
			</div>
		</div>
		<!-- 入驻end-->
		<!--新版底部-->
		<div class="foot3">
			<div class="footContent">
				<div class="contentTop">
					<div class="topItem codeWidth">
						<div class="Twocode"></div>
						<div class="smWord">扫一扫 关注官方微信</div>
					</div>
					<div class="topItem commonWidth">
						<div class="title">
							<a>登录</a>
						</div>
						<div class="cusLogin iconItem">
							<a>客户登录</a>
						</div>
						<div class="proLogin iconItem">
							<a>供应商登录</a>
						</div>
						<div class="manLogin iconItem">
							<a>管家登录</a>
						</div>
						<div class="reg iconItem">
							<a>注册</a>
						</div>
					</div>
					<div class="topItem commonWidth">
						<div class="title">
							<a>关于拍片网</a>
						</div>
						<div class="noiconItem">
							<a>了解我们</a>
						</div>
						<div class="noiconItem">
							<a>加入我们</a>
						</div>
						<div class="noiconItem">
							<a>公司活动</a>
						</div>
						<div class="noiconItem">
							<a>团队介绍</a>
						</div>
					</div>
					<div class="topItem commonWidth">
						<div class="title">
							<a>服务</a>
						</div>
						<div class="noiconItem">
							<a>服务流程</a>
						</div>
						<div class="noiconItem">
							<a>服务协议</a>
						</div>
						<div class="noiconItem">
							<a>找拍摄团队</a>
						</div>
						<div class="noiconItem">
							<a>我要发作品</a>
						</div>
					</div>
					<div class="topItem onLineWidth">
						<div class="title">
							<a>在线联系我们</a>
						</div>
						<div class="cusSer iconItem">
							<a href="tencent://message/?uin=2640178216&Site=qq&Menu=no"></a>
						</div>
						<div class="proSer iconItem">
							<a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">供应商客服</a>
						</div>
						<div class="email iconItem">
							<a href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a>
						</div>
					</div>
					<div class="topItem">
						<div class="title">
							<a>咨询电话</a>
						</div>
						<div class="tel">
							<a href="tel:4006609728">400-660-9728</a>
						</div>
						<div class="workTime">
							<a>工作时间 9:00-18:00 (周一至周五)</a>
						</div>
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
	<!-- video-->
	<script type="text/javascript" src="/resources/js/common.js"></script>
	<script type="text/javascript" src="/resources/js/juicer.js"></script>
	<script type="text/javascript"
		src="/resources/lib/jquery/jquery.flexslider-min.js"></script>
	<script type="text/javascript" src="/resources/js/homePage.js"></script>
	<script type="text/javascript" src="/resources/js/common3.js"></script>


</body>

</html>
