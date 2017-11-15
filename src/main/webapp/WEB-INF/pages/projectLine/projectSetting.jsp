<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %><%-- import CSS --%>
<%-- import CSS --%>
<spring:url value="/resources/css/projectLine/projectSetting.css" var="pSetCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
<spring:url value="/resources/js/projectLine/projectSetting.js" var="pSet" />
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/jquery/jquery.flexslider-min.js" var="flexsliderJS"/>
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
<title>${product.chanpinName}_拍片网标准化产品线-拍片网</title>

<script type="text/javascript"
	src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
	
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
<link rel="stylesheet"  href="${pSetCss }" >
<link rel="stylesheet" href="/resources/lib/swiper/swiper.min.css">
<script type="text/javascript" src="/resources/lib/swiper/swiper.js"></script>
</head>

	<jsp:include flush="true" page="../header.jsp"></jsp:include> 
    
<%--        <div class="projectType">
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
       </div> --%>
       <div class="projectType">
			 <div class="pTContent">
				<div class="swiper-container swiper-title-container">
			        	<div class="swiper-wrapper">
							<c:if test="${! empty productList}">
								<c:forEach items="${productList }" var="tag">
										<c:if test="${product.chanpinName == tag.chanpinName }">
										   <div class="swiper-slide swiper-title-slide">
												<a><div class="active">${tag.chanpinName}</div></a>
										   </div>	
										</c:if>
										<c:if test="${product.chanpinName != tag.chanpinName }">
										  <div class="swiper-slide swiper-title-slide">
											<a href="/product/${tag.englishName }/main"><div>${tag.chanpinName}</div></a>
										  </div>
										</c:if>		
								</c:forEach>
							</c:if>
					  </div>	
					    <!-- Add Pagination -->
			    </div> 
				    <div class="swiper-button-next swiper-button-title-next"></div>
					<div class="swiper-button-prev swiper-button-title-prev"></div>	   	
	        </div>
    </div>

<body>
	<!-- 返回修改信息 begin -->
	<input type="hidden" id="CacheconfigId" value="${configId }">
	<input type="hidden" id="CachetimeId" value="${timeId }">
	<input type="hidden" id="CachesubJoin" value="${subJoin }">
	<input type="hidden" id="Cacheprice" value="${price }">
	<!-- 返回修改信息 end -->
	<input type="hidden" id="storage_node"
		value="${file_locate_storage_path }" />
	<input type="hidden" id="englishName" value="${product.englishName }">
	<div class="page">
	<input type="hidden" id="productId" value="${product.chanpinId }">

       
       <div class="motionTitles">
          <div class="motionContent">
	          <div class="motionIcon">
		           <div>${product.chanpinName}</div>
	               <div id="english">${product.englishTitle}</div>
	          </div>
	           <div class="motionType">
	               <a href="/product/${product.englishName }/main"><div>产品概述</div></a>
	               <a href="/product/${product.englishName }/case"><div>全部案例</div></a>
	               <a><div class="active">套餐配置</div></a>
	           </div>
          </div>
       </div>
       
       <div class="setMargin"></div>
		<!-- 配置卡片 -->
		<div class="setCard">
			   <input type="hidden" id="CConfigId">
		       <div class="cardTitle">寻找适合你的${product.chanpinName}</div>
		</div>
		<!-- 服务套餐--> 	
		<div class="serviceContent">
		    <div class="closeContent"></div>
		    <div class="sContent">
		        <div class="sTitle">服务套餐<span>Service Packages</span></div>
		        <div class="setPack">
		           		   <div class="container-fluid" style="overflow: hidden">
		            <div class="row">
		                <div class="container second_sort" style="padding: 20px 0;">
		                    <div class="row">
		                        <div id="showItemCard" class="col-xs-10 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-0 col-md-offset-0 f_slider_rap">
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		        </div>
		    </div>
		</div>
		
		<!-- 时长 --> 
		  <div class="timeContent">
		      <input type="hidden" id="CTimeID">
		      <div class="timeTitle">时长<span>Length</span></div>
		      <div class="timeSet">
		      </div>
		  </div>
		  
		  	<!-- 附加服务 --> 
		  <div class="addContent">
		 	  <input type="hidden" id="CSubjoinID">
		      <div class="addTitle">附加服务<span>Additional Services</span></div>
		      <div class="addSet">
		     
		      </div>
		  </div>
		  
		<!-- 确认下单 -->
		      	
      	<div class="checkOrder">
	      	<div id="checkOrder"></div>
	      	<div><span>总价格 </span><span>¥</span><label id="setTotalPrice"></label></div>
	      	<div></div>
	      	<div id="setError"></div>
	      	<div id="confirm" class="btn-c-r">确认</div>
      	</div> 
		
		 <!-- foot -->   
		   <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
         <!--新版底部-->
	</div>
	<!-- video-->
	<script type="text/javascript" src="/resources/js/common.js"></script>
	<script type="text/javascript" src="${waypointsJs}"></script>
	<script type="text/javascript" src="${bootstrapJs}"></script>
	<script type="text/javascript" src="${flexsliderJS}"></script>
	<script type="text/javascript" src="${pSet}"></script>
</body>

</html>
