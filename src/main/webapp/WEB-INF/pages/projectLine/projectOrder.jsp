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
<title>${product.chanpinName}_拍片网标准化产品线-拍片网</title>

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
		<input type="hidden" id="productId" value="${product.chanpinId }">
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
	               <a href="/product/index?chanpinId=${product.chanpinId }"><div>产品概述</div></a>
	               <a href="/product/${product.englishName }/case"><div>全部案例</div></a>
	               <a href="/product/${tag.englishName }/set"><div class="active">产品配置</div></a>
	          </div>
          </div>
       </div>
       
       <div class="setMargin"></div>
       <div class="orderContent ">
            <img id="productImg" src="${file_locate_storage_path }${config.chanpinconfigurationPicLDUrl}">
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
                        <input type="hidden" name="configId" id="configId" value="${config.chanpinconfigurationId}">
                        <ul class="mealCard">
                              <li>${config.chanpinconfigurationName }</li>
                        </ul>
                   </div>
                    <div class="optionItem">
                        <div class="title">时长</div>
                        <input type="hidden" name="timeId" id="timeId" value="${time.dimensionId}">
                        <ul class="timeCard">
                              <li>${time.rowName }</li>
                        </ul>
                   </div>
                   <c:if test="${! empty  subjoin}">
                    <div class="optionItem">
                        <div class="title">附加包类型</div>
                        <input type="hidden" name="subJoin" id="subJoin" value="${subjoinId}">
                        <ul class="moreCard">
                        	  
	                        	<c:forEach items="${subjoin }" var="tag">
									 <li>${tag.moduleName }</li>
								</c:forEach>
                       
                        </ul>
                   </div>
                   </c:if>
                    <div class="optionItem">
                        <div class="title"></div>
                        <input type="button" class="checkOrder" value="确认下单" />
                        <a href="/product/${product.englishName }/set"><div class="renturnEdit">返回修改</div></a>
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
		        <div class="title">下单成功</div>
		        <div class="desc">已生成订单并发送邮件到您的邮箱</div>
		        <div class="desc">页面将自动跳转进入<a href="<spring:url value='/mgr/index'/>">您的项目</a>页面</div>
		        <div class="desc"><span id="last3">3</span>秒</div>
		        <div class="descBot"><a href="/product/${product.englishName }/main">返回产品概述</a>请点击这里</div>
		   </div>
       </div>
     </div>  
         <!-- foot -->
         					 <jsp:include flush="true" page="../foot.jsp"></jsp:include> 
                            <!--新版底部-->
	</div>
	<!-- video-->
	<script type="text/javascript" src="/resources/js/common.js"></script>
	<script type="text/javascript" src="${projectOrderJs}"></script>
	
</body>

</html>
