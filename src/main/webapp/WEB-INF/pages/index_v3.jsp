<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/index_v3.css" var="indexCss"/>
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
<meta name="keywords" content="宣传片,企业宣传片,宣传片制作,宣传片拍摄,tvc广告,产品广告片,广告片拍摄,广告片制作,mg动画,品牌微电影">
<meta name="description" content="拍片网专业提供企业宣传片制作、产品tvc广告片拍摄、mg动画制作、品牌微电影等商业视频服务。企业宣传片创意策划免费，价格直降30%。宣传片制作、广告片拍摄团队遍布北京、上海、杭州等全国75个大中城市。">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>企业宣传片-宣传片制作-产品广告片拍摄-tvc-mg动画-品牌微电影-拍片网</title>
<link rel="stylesheet" href="/resources/css/index_v3.css">
<link rel="stylesheet" href="/resources/lib/swiper/swiper.min.css">
<link rel="stylesheet" href="resources/lib/Bootstrap/css/bootstrap.min.css">
<script type="text/javascript" src="resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
<script type="text/javascript" src="resources/lib/jquery/waypoints.min.js"></script>
<script type="text/javascript" src="resources/lib/swiper/swiper.js"></script>
<script type="text/javascript" src="resources/lib/Clamp/clamp.js"></script>
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
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
					<source src="https://www.apaipian.com/product/video/flexvideo.mp4" type="video/mp4">
				</video>
			</div>
			<div class="swiper-container swiper-banner flexslider">
				<div class="swiper-wrapper swiper-banner-slide">
					<div class="swiper-slide">
						<ul>
							<li class="title" id="bannerTitleAn1">专业的商业视频服务平台</li>
							<li class="desc" id="DescAn1">55800+ 导演 / 编剧 / 摄影师 /影视专家为您服务</li>
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
							
						<div class="dropdown" id="">
							<button class="btn btn-default dropdown-toggle" type="button"
								id="dropdownMenu1" data-toggle="dropdown">
								<span id='indent_recomment'>宣传片</span>
								<div class="carets"></div>
							</button>
							<ul class="dropdown-menu dropdown-menuHost" id="selectUl" role="menu"
								aria-labelledby="dropdownMenu1">
								<li>宣传片</li>
								<li>广告片</li>
								<li>MG动画</li>
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
		<!-- 跳转 end -->
			<%-- <a href="/" ><img class='beta' src="${imgPath}/index/artboard.png"> </a> --%>		
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
							<div class="home-search" data-text="MG动画">MG动画</div>
							<div class="home-search" data-text="MG动画">MOTION GRAPHICS</div>
						</div>
						<div class="typeBottom">
							<span class="home-search" data-text="MG动画">通过案例找创意>></span>
							 <span class="home-order" data-text="MG动画">立即下单</span>
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
				    <c:if test="${not empty hot_section}">
                        <c:forEach items="${hot_section}" var="item" varStatus="itemIndex">
                          <div class="swiper-slide coverSlide">
							<div class="scaleDiv">
								<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">
			            			<div class="bg"></div>
			            			<c:choose>
										   		<c:when test="${not empty item.picLDUrl}">   
										   		  <img src="${file_locate_storage_path }${item.picLDUrl}" alt="拍片网">
										   		</c:when>
										   		<c:otherwise>  
										   		  <img src="/resources/images/index/noImg.jpg" alt="拍片网">
										   		</c:otherwise>
								    </c:choose>		   		
									  <div class="coverContent">
										    <div class="">${item.productName}</div>
										    <c:choose>
												   <c:when test="${item.price == 0}">   
											   		  <div>￥欢迎询价</div>
											   		</c:when>
											   		<c:otherwise>  
											   		   <div>￥<fmt:formatNumber value="${item.price }" pattern="#,#00"/></div>
											   		</c:otherwise>
											</c:choose>
									    </div>
									 </a>
								</div>
				              </div>
                        </c:forEach>
	               </c:if>
				</div>
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</div>
		<!-- 经典-->
		<div class="classical" id="classical">
				<div class="classicalArea">
					<div class="classicalLogo"></div>
					<a href="<spring:url value='/list.html'/>">
					     <span class="directorWants">更多案例</span>
					</a>
					<div class="cardUl">
					 	<c:if test="${not empty classical_section}">
	                         <c:forEach items="${classical_section}" var="item" varStatus="itemIndex">
	                             <c:if test="${ itemIndex.index % 4 == 0 }">
	                                <span class="flow-div">
	                             </c:if>
							     <div class="topAnimaltion oneFlow">
									<div class="videoCard ${item.picLDUrl}">
										<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">
								           <c:choose>
										   		<c:when test="${not empty item.picLDUrl}">   
										   		  <img src="${file_locate_storage_path }${item.picLDUrl}" alt="拍片网">
										   		</c:when>
										   		<c:otherwise>  
										   		  <img src="/resources/images/index/noImg.jpg" alt="拍片网">
										   		</c:otherwise>
											</c:choose>
											 <r:identity role="employee">
												 <c:if test="${item.teamFlag == 1 && item.indentProjectId != 0}">
					                                <img class="roleImg" src="/resources/images/play/roleOur.png">
					                             </c:if>
					                             <c:if test="${item.teamFlag == 4}">
					                                <img class="roleImg" src="/resources/images/play/rolePlay.png">
					                             </c:if>
					                             <c:if test="${item.teamFlag == 1 && item.indentProjectId == 0}">
					                                <img class="roleImg" src="/resources/images/play/rolePro.png">
					                             </c:if>
				                             </r:identity>
				                          </a>   
									       <div class="cardShadow">
									        <a href="/play/${item.teamId}_${item.productId}.html" target="_blank"> 
												<div class="videoContet">
													<div class="title">${item.productName}</div>
													<div class="type">${item.tags}</div>
													<c:choose>
											   			<c:when test="${item.price == 0}">   
												   		  <div  class="price">￥欢迎询价</div>
												   		</c:when>
												   		<c:otherwise>  
												   		 <div  class="price">￥<fmt:formatNumber value="${item.price }" pattern="#,#00"/></div>
												   		</c:otherwise>
													</c:choose>
													
													<%--  <c:if test="${ !empty item.orignalPrice }">
						                               <div class="realPrice">原价￥<fmt:formatNumber value="${item.orignalPrice}" pattern="#,#00"/></div>
						                            </c:if> --%>
						                             
								                	 <div class="videoCardLine"></div>
								             	</div>
								              </a>  
								              <a href="/provider/info_${item.teamId}.html">              
												<span class="videoProvider">
												   <img src="${file_locate_storage_path }${item.teamPhotoUrl}" alt="拍片网">
												   <div>${item.teamName}</div>
												</span>
										      </a>
										   </div>
									    </div>
									  </div> 
									   <c:if test="${itemIndex.index % 4 == 3}">
									       </span>
									   </c:if>   
								     </c:forEach>
								   </c:if>    
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
				<div class="swiper-wrapper" id="directorContent">
				<c:if test="${not empty teamList}">
	                         <c:forEach items="${teamList}" var="item" varStatus="itemIndex">
							        <div class="swiper-slide">
										<div class="m"></div>
										<div class="b"></div>
										<div class="directorContent">
											<a href="/provider/info_${item.teamId}.html" target="_blank">
												<img src="${file_locate_storage_path }${item.teamPhotoUrl}" alt="${item.teamName}">
												<div class="title">${item.teamName}</div>
												<div class="line"></div>
												<div class="content dContent"><div class="scrollDiv">${item.business}</div></div>
												<div class="toProduct">作品集</div>
										    </a>
										</div>
									</div>
	                         </c:forEach>
	             </c:if>            

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
				 	<c:if test="${not empty newsList}">
	                         <c:forEach items="${newsList}" var="item" varStatus="itemIndex">
	                           <li data-id="${item.id}">
									<div class="get-new-detail newsTitle">${item.title}</div>
									<div class="newsLine"></div>
										<div class="Content getNewsContent" >${item.discription}</div>
										<div class="get-new-detail newsMore"><span>了解更多</span>
											<div class="moreIcon"></div>
										</div>
								</li>
	                         </c:forEach>
	                 </c:if> 
			
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
							1500<span>+</span><span>家</span>
						</div>
						<div>合作客户</div>
					</li>
					<li>
						<div>
							3000<span></span><span>部</span>
						</div>
						<div>累计制作影片</div>
					</li>
					<li>
						<div>
							55800<span>+</span><span>位</span>
						</div>
						<div>专业创作者加盟</div>
					</li>
				</ul>
				<div class="joinBtn">
					 <r:identity role="customer">
                        <div onclick="showOrder('宣传片');">我要拍片</div>
	                 </r:identity>
	                 <r:noLogin>
                        <div onclick="showOrder('宣传片');">我要拍片</div>
                        <div onclick="window.location.href='/register'">入驻拍片网</div>
	                 </r:noLogin>
				</div>
			</div>
		</div>
		<div class="ourFriendsColor">
		  <div class="logo" ><img src="/resources/images/index/friendTitile.svg"></div>
			<div class="ourFriends">
			   <a  href="http://www.plusx.cn/" target="_blank"><img alt="图片直播" src="/resources/images/index/friend1.png"></a>
			   <a  href="http://www.techuangyi.com" target="_blank"><img alt="特创易LOGO设计" src="/resources/images/index/friend2.png"></a>
			   <a  href="http://www.cubead.com/" target="_blank"><img alt="大数据整合营销" src="/resources/images/index/friend3.png"></a>
			   <a  href="http://www.bjjfsd.com/" target="_blank"><img alt="北京网站制作" src="/resources/images/index/friend4.png"></a>
			   <a  href="http://www.qiqueqiao.com/" target="_blank"><img alt="企鹊桥" src="/resources/images/index/friend5.png"></a>
			   <a  href="http://www.dadetong.com/" target="_blank"><img alt="大德通众包平台" src="/resources/images/index/friend6.png"></a>
			   <a  href="http://www.ciprun.com/" target="_blank"><img alt="专利申请" src="/resources/images/index/friend7.jpg"></a>
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
	<script type="text/javascript" src="/resources/js/index_v3.js"></script>
	<jsp:include flush="true" page="modelTool.jsp"></jsp:include> 
</body>

</html>
