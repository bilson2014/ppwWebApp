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
    <meta name="keywords" content="宣传片，广告片，微电影，病毒视频，纪录片，动画片，MV，预告片，证言影片">
    <meta name="description" content="拍片网跟客户对接的整个服务流程简介">
    <meta name="baidu-site-verification" content="dMz6jZpIwd" />
    <title>服务流程-拍片网</title>
    <spring:url value="/resources/css/order-flow.css" var="serviceToCss"/>
    <spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
    <spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
    <spring:url value="/resources/js/common.js" var="commonJs"/>
    <spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>


<link rel="stylesheet" href="${serviceToCss }">
<link rel="stylesheet" href="${bootstrapCss }">
   
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
        <div class="tagsWidth">
            <div class="bgLogo"></div>
            <div class="icon icon1 RightIcon">
                <div>
                    <label>需求沟通</label>
                    <label>您只需要填写电话号码,点击下单.
                            <br>视频管家就会上门,一对一服务,了解您的需求.</label>
                    <label>You only need a phone number to make order. 
                          <br>A video specialist will then collect your requirements. 
                    </label>
                </div>
                <div></div>
            </div>
            <div class="icon icon2 LeftIcon">
                <div>
                    <label>创意策划</label>
                    <label>606名脑洞超大的创意人员随时抢单,创意策划完全免费!
<br>根据预算,视频管家会从世界各地5208名导演中,挑出最适合您的一位. </label>
                    <label>606 creative writers are ready to draft ideas. And it is all free! 
Within your budget, <br>the specialist will find the best match from 5208 experienced directors all over the world. 
                    </label>
                </div>
                <div></div>
            </div>
            <div class="icon icon3 RightIcon">
                <div>
                    <label>商务流程</label>
                    <label>您将制作费托管到拍片网平台,导演团队就开始干活了!</label>
                    <label>Once the deposit is settled, the project is on! 
                    </label>
                </div>
                <div></div>
            </div>
            <div class="icon icon4 LeftIcon">
                <div>
                    <label>执行方案</label>
                    <label>选演员、选场地、前期拍摄、后期制作、配音配乐,视频管家会替您全程监管.</label>
                    <label>Casting,locations,shooting,production,dubbing... The specialist cares all of them. 
                    </label>
                </div>
                <div></div>
            </div>
            <div class="icon icon5 RightIcon">
                <div>
                    <label>影片制作</label>
                    <label>您只需要耐心等候,最快24小时一条影片就出炉了!
<br>我们视“作品如人品”,认真创作每一条影片!</label>
                    <label>Just a little patience, a fastest video production can be done within 24 hours! 
<br>We always believe in "great work talks"! 
                    </label>
                </div>
                <div></div>
            </div>
            <div class="icon6 LeftIcon">
                <div>
                    <label>影片交付</label>
                    <label>如果您非常满意,确认收片，我们会将托管的制作费支付给导演团队.
                    <br>不满意,可全额退款或重新拍摄制作.</label>
                    <label>If you satisfy the video, the fee will  be transferred to the directors. <br>
                          Otherwise, you will be fully refunded or your video will be reproduced. 
                    </label>
                </div>
                <div></div>
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
<!--     <div class="comOrder">
        <div class="cOrder" id="cOrder">
            <div class="cCloseBtn" id="closeBtn">
                <div></div>
            </div>
            <div class="cOrderTitle">立即下单,对接制作团队</div>
            <div class="cOrderItem">
                <div class="dropdown dropdowns" id="selectType">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                        <span>宣传片</span>
                        <div class="carets"></div>
                    </button>
                    <ul class="dropdown-menu" id="selectUl" role="menu" aria-labelledby="dropdownMenu1">
                        <li>宣传片</li>
                        <li>微电影</li>
                        <li>广告片</li>
                        <li>病毒视频</li>
                    </ul>
                </div>
            </div>
            <div class="cOrderItem" data-content="">
                <input placeholder="您的电话号">
            </div>
            <div class="cOrderItem" data-content>
                <input placeholder="输入手机验证码">
                <div>获取验证码</div>
            </div>
            <div class="cOrderBtn">确认下单</div>
            <div class="cOrderBotTitle">下单后,专业顾问将在2小时之内与您致电确认具体需求</div>
        </div>
    </div> -->
</body>
    <script type="text/javascript" src="${jqueryJs }"></script>
    <script type="text/javascript" src="${commonJs }"></script>
    <script type="text/javascript" src="${bootstrapJs }"></script>
</html>
