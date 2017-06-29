<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/projectLine/projectList.css" var="projectListCss"/>
<%-- import JS --%>
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/projectLine/projectList.js" var="projectListJs"/>
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
<script type="text/javascript"
	src="/resources/lib/jquery/waypoints.min.js"></script>
<script type="text/javascript" src="/resources/lib/swiper/swiper.js"></script>
<script type="text/javascript" src="/resources/lib/Clamp/clamp.js"></script>

<script type="text/javascript" src="/resources/js/projectLine/projectList.js"></script>

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
<link rel="stylesheet"  href="${projectListCss}" >
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${commonJs}"></script>
<script type="text/javascript" src="${projectListJs}"></script>
<script type="text/javascript" src="${waypointsJs}"></script>
</head>

<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
	<jsp:include flush="true" page="../header.jsp"></jsp:include> 	
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
	               <div id="english">${product.englishTitle}</div>
	          </div>
	           <div class="motionType">
	               <a href="/product/${product.englishName }/main"><div>产品概述</div></a>
	               <a href="/product/${product.englishName }/case"><div>全部案例</div></a>
	               <a href="/product/${product.englishName }/set"><div class="active">套餐配置</div></a>
	          </div>
          </div>
       </div>
    
    <div class="setMargin"></div>
		<!-- 配置卡片 -->
	      <div class="listContent">
             <c:if test="${! empty caseList.rows}">
				<c:forEach items="${caseList.rows }" var="tag">
					<a href='/play/${tag.product.teamId }_${tag.productId }.html'>
						<div class="listCard">
				             <div class="imgContent">
				               	  <img src="${file_locate_storage_path }${tag.product.picLDUrl}" />
				             </div>
				             <div class="cardContent">
				                    <div class="contentTitle">${tag.pName}</div>
							        <div class="contentContent">
							                <%--  <div>客户   :  <span>${tag.user.userName}</span></div> --%>
							                 <div>时长   :  <span>${tag.mcoms}秒</span></div>
							                 <div>周期   :  <span>${tag.pProductionCycle}天</span></div>
							                 <div>应用场景   :  <span>${tag.pScene}</span></div>
							                 <div class="contentDes">${tag.customerRestimonial}</div>
							                 <div class="priceContent">总价格   <span>￥</span><span>${tag.product.servicePrice}</span></div>
							        </div>
				              </div>
						</div>
					</a>
				</c:forEach>
			  </c:if>
	      </div>
		</div>
		 <!-- foot -->       
		 	<jsp:include flush="true" page="../foot.jsp"></jsp:include> 
		 <!--新版底部-->
</body>

</html>
