<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/index.css" var="indexCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss" />
<spring:url value="/resources/lib/swiper/swiper.min.css" var="swiperCss" />
<%-- import JS --%>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs" />
<spring:url value="/resources/lib/swiper/swiper.min.js" var="swiperJs" />
<spring:url value="/resources/js/grally/grally.js" var="grallyJs" />
<spring:url value="/resources/js/grally/prefixfree.min.js" var="prefixfreeJs" />
<spring:url value="/resources/js/homePage.js" var="homePageJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
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
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<meta name="baidu-site-verification" content="dMz6jZpIwd" />
	 <title>拍片网－成本计算器</title>
    <link rel="stylesheet" href="/resources/css/costCalculator.css">
    <link rel="stylesheet" href="/resources/lib/swiper/swiper.min.css">
    <link rel="stylesheet" href="/resources/lib/Bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>
<body>

  <div class="header headerMove" id="header">
 		<input type="hidden" id="csrftoken" name="csrftoken" value="${csrftoken}"/>
        <div class="menu-bar nav">
            <div class="left-part">
                <a href="<spring:url value='/'/>" class="logo" id="logo"><h1>拍片网</h1></a>
				<r:identity role="customer">
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >我的项目<span></span></a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value='/provider/portal'/>" class="header-item" >信息管理<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a href="<spring:url value='/mgr/index'/>" class="header-item" >所有项目<span></span></a>
				</r:identity>
				
				<r:noLogin>
					<a href="<spring:url value='/'/>" class="header-item">首页<span></span></a>
					<a class="header-item" target="_parent" id="wantOrder">我要拍片<span></span></a>
				</r:noLogin>
                <a href="<spring:url value='/list.html'/>" class="header-item" target="_parent">精品案例<span></span></a>
                <a href="/order-flow.html" class="header-item" target="_parent">服务流程<span></span></a>
                <a class="header-item header-item-last" id="showVideo" target="_parent">
                    <div class="showVideo"></div>
                    	拍片网介绍
                    <span></span>
                </a>
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
					<a href="<spring:url value="/provider/login" />" class="header-item login-item" target="_self">供应商登录</a>
					<a href="<spring:url value="/login" />" class="header-item login-item" target="_self">客户登录</a>
				</r:noLogin>
				<r:identity role="customer">
					<a href="<spring:url value="/user/info" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="provider">
					<a href="<spring:url value="/provider/portal" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
				<r:identity role="employee">
					<a href="<spring:url value="/mgr/index" />" class="header-item login-item" target="_self" title="<r:outName />"><r:outName /></a>
					<a href="<spring:url value="/login/loginout" />" class="header-item login-item" target="_self">登出</a>
				</r:identity>
            </div>
        </div>
    </div>
    <div class="page">
        <div class="costBackguound">
            <div class="costContent">
                <div class="info">
                    <div>拍片价格计算器</div>
                    <div>COST EVALUATOR</div>
                    <div>
                        <label></label>此价格仅限参考</div>
                    <div>
                        <label></label>最终价格以视频管家报价为准</div>
                </div>
                <div class="calculator">
                    <div class="bg"></div>
                    <div class="price">
                        <label>￥</label>
                        <label id="price">- -&nbsp&nbsp&nbsp- -</label>
                    </div>
                    <div class="controlWidth">
                        <div class="youNeed"> 填写您的拍摄需求，计算您的拍片价格</div>
                            <div class="calItem">
                                <div class="title" >视频类别</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="videoType">活动视频</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">活动视频</li>
                                        <li data-content="1">产品广告(TVC)</li>
                                        <li data-content="2">企业宣传</li>
                                        <li data-content="3">微电影</li>
                                        <li data-content="4">融资路演</li>
                                        <li data-content="5">众筹视频</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="calItem">
                                <div class="title" >时长</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="time">1 ~ 3 分钟</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">1 ~ 3 分钟</li>
                                        <li data-content="1">3 ~ 5 分钟</li>
                                        <li data-content="2">5 ~ 10 分钟</li>
                                    </ul>
                                </div>
                            </div>

                              <div class="calItem">
                                <div class="title" >导演团队</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="team">专业级导演团队</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0" data-info="0">专业级导演团队</li>
                                        <li data-content="1" data-info="1">广告级导演团队</li>
                                        <li data-content="2" data-info="2">电影级导演团队</li>
                                    </ul>
                                </div>
                                <div class="infoContent" id="teamInfo">等哈看对方机会卡机的很快发货的罚款的饭卡减</div>
                            </div>

                              <div class="calItem">
                                <div class="title" >拍摄设备</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="equipment">专业级拍摄设备 2K</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0" data-info="3">专业级拍摄设备 2K</li>
                                        <li data-content="1" data-info="4">广告级拍摄设备 4K</li>
                                        <li data-content="2" data-info="5">电影级拍摄设备 4K</li>
                                    </ul>
                                </div>
                                  <div class="infoContent" id="equipmentInfo">等哈看对方机会卡机的很快发货的罚款的饭卡减</div>
                            </div>

                             <div class="calItem">
                                <div class="title" >演员</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id='actor'>无演员</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">无演员</li>
                                        <li data-content="1">自有演员</li>
                                        <li data-content="2">普通演员</li>
                                        <li data-content="3">一线演员</li>
                                    </ul>
                                </div>
                            </div>

                             <div class="calItem">
                                <div class="title"  >动画</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span id="animation" data-content="0">无动画</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">无动画</li>
                                        <li data-content="1">三维动画</li>
                                        <li data-content="2">二维动画</li>
                                        <li data-content="3">MG动画</li>
                                    </ul>
                                </div>
                            </div>

                             <div class="calItem inputWidthPhone">
                                <div class="title" data-content=""  id="errorPhone">您的联系方式</div>
                                <div>
                                <input data-content="0" placeholder="您的手机号" id="phone">
                                </div>
                            </div>

                            <div class="calItem inputWidth">
                                <button id="start">开始计算</button>
                                <button id="clear">重置</button>
                            </div>

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
                                            <div class="cusLogin iconItem"><a href="<spring:url value="/login" />">客户登录</a></div>
                                            <div class="proLogin iconItem"><a href="<spring:url value="/provider/login" />">供应商登录</a></div>
                                            <div class="manLogin iconItem"><a href="<spring:url value="/mgr/login" />">管家登录</a></div>
                                            <div class="reg iconItem"><a>注册</a></div>
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
                                            <div class="cusSer iconItem"><a href="tencent://message/?uin=2640178216&Site=qq&Menu=no">客户客服</a></div>
                                            <div class="proSer iconItem"><a href="tencent://message/?uin=3299894058&Site=qq&Menu=no">导演客服</a></div>
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
    <script type="text/javascript"  src="/resources/lib/Bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"  src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
    <script type="text/javascript"  src="/resources/lib/jquery/waypoints.min.js"></script>
    <script type="text/javascript"  src="/resources/js/cost.js"></script>
    <script type="text/javascript"  src="/resources/js/common.js"></script>
    <script type="text/javascript"   src="/resources/js/common3.js"></script>
    
    
    
</body>
</html>