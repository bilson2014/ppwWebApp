<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- import CSS --%>
<spring:url value="/resources/css/payment/paylist.css" var="paylistCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/model.js" var="modelJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/search-suggest.js" var="suggestJs"/>
<spring:url value="/resources/js/payment/paylist.js" var="paylistJs"/>

<!-- import img path -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<title>订单页</title>
	<link rel="stylesheet" href="${paylistCss }">
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	
</head>
<body>
	<div class="page">
     <div class="orderDiv">
         <img class="imgTitle leftMargin" src="${imgPath }/icons/logo_red.png"/>
         <div class="titleWord">项目支付</div>
         <div class="topLine leftMargin"></div>
         <div class="orderContent">
	           <div class="topContent leftMargin">

	              <div class="contentLeft">支付单号：
		              <span > ${dealLog.billNo}</span>
	              </div>
	              <div class="contentRight">截止时间：<span>${dealLog.orderTimeOut }</span></div>

	           </div>
	           
	           <div class="midContent leftMargin">
	                 <div class="midContentDiv">
			              <div class="contentLeft grayColor">项目名称：<span class="grayDarkColor">${dealLog.projectName}</span></div>
			              <div class="contentRight grayColor">支付状态：
			              	<span class="payStatue">
			              		<c:if test="${dealLog.dealStatus == 0}">
			              			等待支付中
			              		</c:if>
			              		<c:if test="${dealLog.dealStatus == 1}">
			              			交易成功
			              		</c:if>
			              		<c:if test="${dealLog.dealStatus == 2}">
			              			支付已关闭
			              		</c:if>
			              	</span>
			              </div>
		             </div> 
		             
		             <div class="midContentDiv">
			              <div class="contentLeft grayColor">收款方：<span class="contentSpan grayDarkColor">${dealLog.proceedsSide}</span></div>
			              <div class="contentRight grayColor">支付方：<span class="contentSpan grayDarkColor">${dealLog.userName}</span></div>
		             </div> 
		             
		             <div class="midContentDiv ">
			              <div class="contentPayLeft imgWord grayColor">付款方式：</div>
			              <div class="contentRight"><img class="imgPad" src="${imgPath }/icons/bankIcon.png"/></div>
		             </div>
		             
		             <div class="solidLine">----------------------------------------------------------------------------------------------------------------------------------------</div>


			              <div class="contentLeft"><span class="contentTitleSpan grayColor" style="font-weight:400">付款金额：
			              </span><span class="contentSpan contentSpanBig">${dealLog.payPrice}</span>
			              <span class="contentSpanSmall">元</span></div>
			              <c:if test="${dealLog.dealStatus == 0 && dealLog.urlEffective }">
			             	 <div class="contentRight">
			             	 	<a href="?token=${dealLog.token}" id ="submit"><button class="btn-red">确认</button></a>
			             	 </div>
			              </c:if>

		             </div> 
	           </div>
	           
         </div>
     
     </div>
     
     <div class="cue">请仔细核对项目支付信息</div>
     
      <c:if test="${! dealLog.urlEffective}">
		<div>
            <ul class="timeOut">
              <li><img src="${imgPath }/icons/linkTimeOut.png"/></li>
              <li>这个链接失效 </li>
              <li>可以重新向视频管家申请</li>
            </ul>
       </div>
	  </c:if>
       
    </div>
	<script src="${jqueryJs }"></script>
	<script src="${modelJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${paylistJs}"></script>
</body>
</html>