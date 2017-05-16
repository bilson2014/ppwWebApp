<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/projectLine/projectOrder.css" var="projectOrderCss"/>
<%-- import JS --%>
<spring:url value="/resources/js/projectLine/projectOrder.js" var="projectOrderJs"/>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/jquery/waypoints.min.js" var="waypointsJs"/>
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
<meta name="keywords" content="宣传片制作,广告片制作,企业微电影,产品宣传片制作,路演视频制作">
<meta name="description" content="拍片网是中国最大的企业视频内容制作服务平台，汇聚了影视行业数万顶尖创作人才，致力于为中小企业提供一站式商业视频制作服务。主营业务包括：宣传片制作、产品广告片拍摄、企业微电影以及病毒视频制作等。拍片就上拍片网">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>${product.chanpinName}_拍片网标准化产品线</title>

<script type="text/javascript"
	src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="/resources/lib/jquery.form/jquery.form.js"></script>
<script type="text/javascript"
	src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
<script type="text/javascript" src="${waypointsJs}"></script>	
<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->
<link rel="stylesheet"  href="${projectOrderCss }" >

</head>

<body>
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
		
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
    
       <div class="projectType">
                 <div class="pTContent">
						<c:if test="${! empty productList}">
							<c:forEach items="${productList }" var="tag">
								 <c:if test="${product.chanpinName == tag.chanpinName }">
										<a><div class="active">${tag.chanpinName}</div></a>
								 </c:if>
								 <c:if test="${product.chanpinName != tag.chanpinName }">
										<a href="/product/${tag.englishName }/main"><div>${tag.chanpinName}</div></a>
								 </c:if>
							</c:forEach>
						</c:if>
                 </div>
       </div>
	
	<div class="page">       
       <div class="motionTitles">
          <div class="motionContent">
	          <div class="motionIcon">
	               <div>${product.chanpinName}</div>
	               <div id="english">${product.englishName}</div>
	          </div>
	          <div class="motionType">
	               <a href="/std/product/index?chanpinId=${product.chanpinId }"><div>产品概述</div></a>
	               <a href="/product/${product.englishName }/case"><div>全部案例</div></a>
	               <a href="/product/${tag.englishName }/set"><div class="active">产品配置</div></a>
	          </div>
          </div>
       </div>
       
       <div class="setMargin"></div>
       <div class="orderContent ">
            <img src="${imgPath}/index/advanBack.png">
            <div class="contentArea">
            	   <form id="fm" action="/product/confirm/indent" method="post">
                   <div class="title">您购买MG动画详细包如下</div>
                   <div class="priceitem">
                       <div>
                            <span>总价格</span><span>¥</span> ${price}                                           
                       </div>
                   </div>
                   <div class="optionItem">
                        <div class="title">基础套餐</div>
                        <input type="hidden" name="configId" value="${config.chanpinconfigurationId}">
                        <ul class="mealCard">
                              <li>${config.chanpinconfigurationName }</li>
                        </ul>
                   </div>
                    <div class="optionItem">
                        <div class="title">时长</div>
                        <input type="hidden" name="timeId" value="${time.dimensionId}">
                        <ul class="timeCard">
                              <li>${time.rowName }</li>
                        </ul>
                   </div>
                    <div class="optionItem">
                        <div class="title">附加包类型</div>
                        <input type="hidden" name="subJoin" value="${subjoinId}">
                        <ul class="moreCard">
                        	  <c:if test="${! empty  subjoin}">
	                        	<c:forEach items="${subjoin }" var="tag">
									 <li>${tag.moduleName }</li>
								</c:forEach>
                        	  </c:if>
                        </ul>
                   </div>
                    <div class="optionItem">
                        <div class="title"></div>
                        <input type="button" class="checkOrder" value="确认下单" />
                        <div class="renturnEdit">返回修改</div>
                   </div>
                   </form>
            </div>
       </div>
       
       <div class="orderSuccess hide">
           <div class="show-zero2 zeromodal-icon zeromodal-success">'
				<span class="line tip"></span>
				<span class="line long"></span>
		   </div>
		   <div class="oSContent">
		        <div class="title">下单成功并生成项目</div>
		        <div class="desc">已经自动生产项目!进入我的项目查看</div>
		        <div class="desc">页面将自动跳转进入<a>您的项目</a>页面</div>
		        <div class="desc"><span id="last3">3</span>秒</div>
		        <div class="descBot"><a href="/std/product/index?chanpinId=${product.chanpinId}">返回产品概述</a>请点击这里</div>
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
                            </div>
                            <!--新版底部-->
	</div>
	<!-- video-->
	<script type="text/javascript" src="/resources/js/common.js"></script>
	<script type="text/javascript" src="${projectOrderJs}"></script>
	
</body>

</html>
